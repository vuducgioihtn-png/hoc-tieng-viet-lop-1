import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory cache for generated Vietnamese TTS audio
const audioBufferCache = new Map<string, Buffer>();

/**
 * Standard Vietnamese primary school consonant phonetics map
 * In Grade 1, consonants are pronounced by their sound (cờ, bờ, dờ...) not French letter names (xê, bê, dê...)
 */
const VIETNAMESE_CONSONANT_SOUNDS: Record<string, string> = {
  'b': 'bờ',
  'c': 'cờ',
  'd': 'dờ',
  'đ': 'đờ',
  'g': 'gờ',
  'h': 'hờ',
  'k': 'cờ',
  'l': 'lờ',
  'm': 'mờ',
  'n': 'nờ',
  'p': 'pờ',
  'q': 'quờ',
  'r': 'rờ',
  's': 'sờ',
  't': 'tờ',
  'v': 'vờ',
  'x': 'xờ',
};

/**
 * Normalizes text for elementary Vietnamese pronunciation
 * Replaces standalone isolated consonants with their authentic primary phonics (e.g. "c" -> "cờ", "b" -> "bờ")
 */
function normalizePhonicsText(text: string): string {
  // If the entire text is just a single consonant letter
  const lower = text.trim().toLowerCase();
  if (VIETNAMESE_CONSONANT_SOUNDS[lower]) {
    return VIETNAMESE_CONSONANT_SOUNDS[lower];
  }

  // Replace standalone consonants in spelling sequences (e.g. "c - a - ca", "c, a, ca")
  // Using unicode word boundaries
  return text.replace(/(^|[\s,.\-—–/\\+])([bcdđghklmnpqrstvx])(?=[\s,.\-—–/\\+]|$)/gi, (match, before, letter) => {
    const sound = VIETNAMESE_CONSONANT_SOUNDS[letter.toLowerCase()];
    return sound ? `${before}${sound}` : match;
  });
}

/**
 * Splits text into natural sentence or punctuation chunks <= maxLength
 * Google translate_tts strictly rejects inputs longer than ~200 characters with HTTP 400.
 */
function splitTextIntoTTSChunks(text: string, maxLength = 140): string[] {
  if (text.length <= maxLength) return [text];

  const chunks: string[] = [];
  // Split on sentence/clause boundaries (.,;:!? or newlines)
  const segments = text.match(/[^.,;!?:]+[.,;!?:]*/g) || [text];

  let currentChunk = '';
  for (const seg of segments) {
    const trimmed = seg.trim();
    if (!trimmed) continue;

    if (currentChunk.length + trimmed.length + 1 <= maxLength) {
      currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = '';
      }
      // If a single segment is still longer than maxLength, split by spaces
      if (trimmed.length > maxLength) {
        const words = trimmed.split(/\s+/);
        for (const word of words) {
          if (currentChunk.length + word.length + 1 <= maxLength) {
            currentChunk = currentChunk ? `${currentChunk} ${word}` : word;
          } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = word;
          }
        }
      } else {
        currentChunk = trimmed;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks.length > 0 ? chunks : [text.slice(0, maxLength)];
}

/**
 * Fetch a single audio chunk from Google Translate TTS (<= 140 chars)
 */
async function fetchTTSChunk(chunk: string): Promise<Buffer> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=vi&client=tw-ob`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://translate.google.com/',
    },
  });

  if (!response.ok) {
    throw new Error(`TTS provider returned HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Standard Vietnamese Female Voice TTS Streaming Endpoint
 * Uses Google Vietnamese TTS (tl=vi - standard female voice)
 * Guarantees 100% native Vietnamese pronunciation, zero English accent!
 */
app.get('/api/tts', async (req, res) => {
  try {
    const text = req.query.text as string;
    if (!text || typeof text !== 'string') {
      return res.status(400).send('Text is required');
    }

    const trimmedText = text.trim();
    if (!trimmedText) {
      return res.status(400).send('Text cannot be empty');
    }

    // Convert isolated consonants and spelling patterns to Vietnamese elementary phonics (c -> cờ, b -> bờ)
    const normalizedText = normalizePhonicsText(trimmedText);
    const cacheKey = normalizedText.toLowerCase();

    // Check RAM cache for complete text
    if (audioBufferCache.has(cacheKey)) {
      const buffer = audioBufferCache.get(cacheKey)!;
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=86400',
        'Accept-Ranges': 'bytes',
      });
      return res.send(buffer);
    }

    // Split text into safe chunks (<= 140 characters) to prevent HTTP 400 from Google translate_tts
    const chunks = splitTextIntoTTSChunks(normalizedText, 140);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const chunkKey = chunk.toLowerCase();
      if (audioBufferCache.has(chunkKey)) {
        audioBuffers.push(audioBufferCache.get(chunkKey)!);
      } else {
        const chunkBuf = await fetchTTSChunk(chunk);
        if (audioBufferCache.size < 2000) {
          audioBufferCache.set(chunkKey, chunkBuf);
        }
        audioBuffers.push(chunkBuf);
      }
    }

    // Concatenate all MP3 audio buffers into a single seamless track
    const finalBuffer = Buffer.concat(audioBuffers);

    // Save final concatenated track to cache
    if (audioBufferCache.size < 2000) {
      audioBufferCache.set(cacheKey, finalBuffer);
    }

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': finalBuffer.length.toString(),
      'Cache-Control': 'public, max-age=86400',
      'Accept-Ranges': 'bytes',
    });
    return res.send(finalBuffer);
  } catch (error: any) {
    console.error('TTS endpoint error:', error);
    return res.status(500).send('Failed to stream audio');
  }
});

app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });
  const trimmed = text.trim();
  res.json({
    audioUrl: `/api/tts?text=${encodeURIComponent(trimmed)}`,
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Mount Vite in dev mode or serve built assets in production
const port = 3000;
async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

start();

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  HelpCircle,
  Trophy
} from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface GamesHubProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
}

type GameMode = 'balloon' | 'train' | 'memory' | 'fishing';

export const GamesHub: React.FC<GamesHubProps> = ({ onEarnStar, soundEnabled }) => {
  const [activeGame, setActiveGame] = useState<GameMode>('balloon');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Game Selector Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-kid font-bold text-xl shadow-xs">
            🎮
          </div>
          <div>
            <h1 className="text-xl font-bold font-kid text-slate-900 leading-tight">
              Khu Trò Chơi Tiếng Việt Vui Nhộn
            </h1>
            <p className="text-xs text-slate-500">
              Vừa chơi vừa học, nhận biết chữ cái, ghép vần qua các thử thách sinh động
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-xl border border-amber-200 overflow-x-auto">
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveGame('balloon');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeGame === 'balloon' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            🎈 Bắn Bóng Chữ Cái
          </button>
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveGame('train');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeGame === 'train' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            🚂 Đoàn Tàu Ghép Vần
          </button>
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveGame('memory');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeGame === 'memory' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            🃏 Lật Thẻ Trí Nhớ
          </button>
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveGame('fishing');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeGame === 'fishing' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            🎣 Hồ Cá Ghép Tiếng
          </button>
        </div>
      </div>

      {/* Render Active Game */}
      {activeGame === 'balloon' && <BalloonGame onEarnStar={onEarnStar} soundEnabled={soundEnabled} />}
      {activeGame === 'train' && <PhonicsTrainGame onEarnStar={onEarnStar} soundEnabled={soundEnabled} />}
      {activeGame === 'memory' && <MemoryGame onEarnStar={onEarnStar} soundEnabled={soundEnabled} />}
      {activeGame === 'fishing' && <FishingGame onEarnStar={onEarnStar} soundEnabled={soundEnabled} />}
    </div>
  );
};

/* ==========================================
   GAME 1: BALLOON POPPING GAME
   ========================================== */
interface GameProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
}

const BalloonGame: React.FC<GameProps> = ({ onEarnStar, soundEnabled }) => {
  const lettersPool = ['a', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'o', 'ô', 'ơ', 'm', 'n'];
  const balloonColors = [
    'from-rose-400 to-rose-600',
    'from-amber-400 to-amber-600',
    'from-emerald-400 to-emerald-600',
    'from-sky-400 to-sky-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
  ];

  const [targetLetter, setTargetLetter] = useState<string>('c');
  const [balloons, setBalloons] = useState<{ id: number; letter: string; color: string; popped: boolean }[]>([]);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('Bé hãy bấm vào quả bóng đúng nhé!');

  const startNewRound = () => {
    const target = lettersPool[Math.floor(Math.random() * lettersPool.length)];
    setTargetLetter(target);

    // Pick 5 other distinct letters
    const others = lettersPool.filter(l => l !== target).sort(() => 0.5 - Math.random()).slice(0, 5);
    const roundLetters = [target, ...others].sort(() => 0.5 - Math.random());

    const newBalloons = roundLetters.map((letter, idx) => ({
      id: idx + 1,
      letter,
      color: balloonColors[idx % balloonColors.length],
      popped: false,
    }));

    setBalloons(newBalloons);
    setMessage(`Bé ơi! Tìm quả bóng có chữ: ${target.toUpperCase()}`);

    if (soundEnabled) {
      speakVietnamese(`Bé ơi! Hãy tìm và bấm nổ quả bóng có chữ ${target}!`);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handlePop = (balloonId: number, letter: string) => {
    if (letter === targetLetter) {
      playSoundEffect.pop();
      playSoundEffect.star();

      setBalloons(prev => prev.map(b => b.id === balloonId ? { ...b, popped: true } : b));
      setScore(s => s + 10);
      setMessage(`Hoan hô! Bé đã tìm đúng chữ ${letter.toUpperCase()}! 🌟`);

      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
      } catch {}

      onEarnStar();

      if (soundEnabled) {
        speakVietnamese(`Đúng rồi! Chữ ${letter}! Bé giỏi lắm!`);
      }

      setTimeout(() => {
        startNewRound();
      }, 1500);
    } else {
      playSoundEffect.wrong();
      setMessage(`Chưa đúng rồi! Đây là chữ ${letter.toUpperCase()}, bé tìm chữ ${targetLetter.toUpperCase()} nhé!`);
      if (soundEnabled) {
        speakVietnamese(`Đây là chữ ${letter}. Bé hãy tìm lại chữ ${targetLetter} nhé!`);
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 rounded-3xl p-6 border-2 border-sky-300 shadow-md relative overflow-hidden">
      {/* Sky backdrop clouds */}
      <div className="absolute top-4 left-6 text-4xl opacity-70">☁️</div>
      <div className="absolute top-10 right-12 text-5xl opacity-80">☁️</div>
      <div className="absolute top-2 right-1/3 text-3xl opacity-60">☁️</div>

      {/* Game Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => speakVietnamese(`Tìm quả bóng có chữ ${targetLetter}`)}
            className="w-12 h-12 rounded-2xl bg-white text-sky-600 border border-sky-300 shadow-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            title="Nghe lại câu hỏi"
          >
            <Volume2 className="w-6 h-6" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase text-sky-700">Yêu cầu:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-800">Tìm quả bóng có chữ:</span>
              <span className="px-3 py-0.5 rounded-xl bg-amber-400 text-amber-950 font-black font-kid text-2xl shadow-xs animate-bounce">
                {targetLetter}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 rounded-xl bg-white/90 border border-amber-300 text-amber-900 font-bold font-kid text-sm shadow-xs flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Điểm: {score}</span>
          </div>

          <button
            onClick={startNewRound}
            className="p-2 rounded-xl bg-white/90 border border-slate-200 hover:bg-white text-slate-700 shadow-xs transition-colors"
            title="Đổi chữ cái mới"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prompt Banner */}
      <div className="relative z-10 mb-6 p-2.5 rounded-xl bg-white/80 border border-sky-200 text-center text-sm font-semibold text-sky-900 shadow-2xs">
        {message}
      </div>

      {/* Balloons Grid / Flying Area */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 min-h-[260px] py-4">
        {balloons.map((b) => (
          <div key={b.id} className="flex flex-col items-center justify-center">
            {!b.popped ? (
              <button
                onClick={() => handlePop(b.id, b.letter)}
                className={`w-24 h-32 rounded-[50%] bg-gradient-to-b ${b.color} text-white font-black font-kid text-4xl shadow-lg flex flex-col items-center justify-center relative cursor-pointer hover:scale-108 active:scale-95 transition-transform animate-float`}
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 90% 85%, 55% 100%, 45% 100%, 10% 85%)',
                }}
              >
                <span className="drop-shadow-md">{b.letter}</span>
                {/* String under balloon */}
                <div className="absolute -bottom-6 w-0.5 h-6 bg-amber-800/40" />
              </button>
            ) : (
              <div className="w-24 h-32 flex items-center justify-center text-3xl animate-ping">
                💥
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================
   GAME 2: PHONICS TRAIN BUILDER (Đoàn tàu ghép chữ)
   ========================================== */
const PhonicsTrainGame: React.FC<GameProps> = ({ onEarnStar, soundEnabled }) => {
  const initials = ['b', 'c', 'd', 'đ', 'm', 'n', 'th', 'ch', 'r', 'g'];
  const rhymes = ['a', 'e', 'ê', 'o', 'ô', 'u', 'i', 'an', 'on'];
  const tones = [
    { label: 'Không dấu', symbol: '', value: '' },
    { label: 'Huyền ( ` )', symbol: '`', value: 'huyền' },
    { label: 'Sắc ( ´ )', symbol: '´', value: 'sắc' },
    { label: 'Hỏi ( ? )', symbol: '?', value: 'hỏi' },
    { label: 'Nặng ( . )', symbol: '.', value: 'nặng' },
  ];

  const [curInitial, setCurInitial] = useState<string>('b');
  const [curRhyme, setCurRhyme] = useState<string>('a');
  const [curTone, setCurTone] = useState<string>('');

  // Calculate compound
  const getCombinedWord = (init: string, rhm: string, tone: string) => {
    // Basic standard phonics lookup
    const base = init + rhm;
    if (!tone) return base;

    const toneMap: Record<string, Record<string, string>> = {
      'ba': { huyền: 'bà', sắc: 'bá', hỏi: 'bả', nặng: 'bạ' },
      'bo': { huyền: 'bò', sắc: 'bó', hỏi: 'bỏ', nặng: 'bọ' },
      'bô': { huyền: 'bồ', sắc: 'bố', hỏi: 'bổ', nặng: 'bộ' },
      'be': { huyền: 'bè', sắc: 'bé', hỏi: 'bẻ', nặng: 'bẹ' },
      'bê': { huyền: 'bề', sắc: 'bế', hỏi: 'bể', nặng: 'bệ' },
      'ca': { huyền: 'cà', sắc: 'cá', hỏi: 'cả', nặng: 'cạ' },
      'co': { huyền: 'cò', sắc: 'có', hỏi: 'cỏ', nặng: 'cọ' },
      'cô': { huyền: 'cồ', sắc: 'cố', hỏi: 'cổ', nặng: 'cộ' },
      'cu': { huyền: 'cù', sắc: 'cú', hỏi: 'củ', nặng: 'cụ' },
      'da': { huyền: 'dà', sắc: 'dá', hỏi: 'dả', nặng: 'dạ' },
      'đa': { huyền: 'đà', sắc: 'đá', hỏi: 'đả', nặng: 'đạ' },
      'đo': { huyền: 'đò', sắc: 'đó', hỏi: 'đỏ', nặng: 'đọ' },
      'đu': { huyền: 'đù', sắc: 'đú', hỏi: 'đủ', nặng: 'đụ' },
      'me': { huyền: 'mè', sắc: 'mé', hỏi: 'mẻ', nặng: 'mẹ' },
      'nơ': { huyền: 'nờ', sắc: 'nớ', hỏi: 'nở', nặng: 'nợ' },
      'ra': { huyền: 'rà', sắc: 'rá', hỏi: 'rả', nặng: 'rạ' },
      'ro': { huyền: 'rò', sắc: 'ró', hỏi: 'rỏ', nặng: 'rọ' },
      'rô': { huyền: 'rồ', sắc: 'rố', hỏi: 'rổ', nặng: 'rộ' },
      'se': { huyền: 'sè', sắc: 'sé', hỏi: 'sẻ', nặng: 'sẹ' },
      'su': { huyền: 'sù', sắc: 'sú', hỏi: 'sủ', nặng: 'sụ' },
      'tha': { huyền: 'thà', sắc: 'thá', hỏi: 'thả', nặng: 'thạ' },
      'thu': { huyền: 'thù', sắc: 'thú', hỏi: 'thủ', nặng: 'thụ' },
      'cha': { huyền: 'chà', sắc: 'chá', hỏi: 'chả', nặng: 'chạ' },
      'chu': { huyền: 'chù', sắc: 'chú', hỏi: 'chủ', nặng: 'chụ' },
      'ga': { huyền: 'gà', sắc: 'gá', hỏi: 'gả', nặng: 'gạ' },
      'gô': { huyền: 'gồ', sắc: 'gố', hỏi: 'gổ', nặng: 'gộ' },
      'ban': { huyền: 'bàn', sắc: 'bán', hỏi: 'bản', nặng: 'bạn' },
      'con': { huyền: 'còn', sắc: 'cón', hỏi: 'cỏn', nặng: 'cọn' },
    };

    if (toneMap[base] && toneMap[base][tone]) {
      return toneMap[base][tone];
    }
    return base;
  };

  const combinedWord = getCombinedWord(curInitial, curRhyme, curTone);

  const handlePronounce = () => {
    playSoundEffect.click();
    playSoundEffect.star();
    onEarnStar();
    if (soundEnabled) {
      if (curTone) {
        speakVietnamese(`${curInitial}, ${curRhyme}, ${curInitial}${curRhyme}, ${curTone}, ${combinedWord}!`, { rate: 0.8 });
      } else {
        speakVietnamese(`${curInitial}, ${curRhyme}, ${combinedWord}!`, { rate: 0.8 });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-3xl p-6 border-2 border-emerald-300 shadow-md space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🚂</span>
          <div>
            <h2 className="font-kid font-bold text-lg text-emerald-950">
              Đoàn Tàu Ghép Tiếng (Mô hình Bài 5 & Bài 10)
            </h2>
            <p className="text-xs text-emerald-800">
              Chọn âm đầu, âm chính và dấu thanh để cùng đoàn tàu ghép thành tiếng có nghĩa!
            </p>
          </div>
        </div>

        <button
          onClick={handlePronounce}
          className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-kid font-bold text-sm shadow-md flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          <span>Nghe Tàu Đọc</span>
        </button>
      </div>

      {/* The Train Visualization */}
      <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-center gap-3 min-w-[500px] py-4">
          {/* Engine Car */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex flex-col items-center justify-center p-2 shadow-md relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-100">Âm đầu</span>
            <span className="font-kid font-black text-3xl">{curInitial}</span>
            <span className="text-xs text-amber-200">Đầu tàu</span>
            {/* Wheels */}
            <div className="absolute -bottom-2 flex gap-3">
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
            </div>
          </div>

          <span className="text-2xl font-bold text-emerald-600">+</span>

          {/* Rhyme Wagon */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-500 text-white flex flex-col items-center justify-center p-2 shadow-md relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-100">Âm chính</span>
            <span className="font-kid font-black text-3xl">{curRhyme}</span>
            <span className="text-xs text-sky-200">Toa 1</span>
            {/* Wheels */}
            <div className="absolute -bottom-2 flex gap-3">
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
            </div>
          </div>

          <span className="text-2xl font-bold text-emerald-600">+</span>

          {/* Tone Mark Wagon */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-500 text-white flex flex-col items-center justify-center p-2 shadow-md relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-100">Dấu thanh</span>
            <span className="font-kid font-black text-xl">
              {curTone ? curTone : '—'}
            </span>
            <span className="text-xs text-purple-200">Toa 2</span>
            {/* Wheels */}
            <div className="absolute -bottom-2 flex gap-3">
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
            </div>
          </div>

          <span className="text-3xl font-bold text-emerald-600">➔</span>

          {/* Result Wagon */}
          <div className="w-28 h-24 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white flex flex-col items-center justify-center p-2 shadow-lg relative ring-4 ring-rose-200 animate-pulse">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-100">Tiếng ghép</span>
            <span className="font-kid font-black text-4xl">{combinedWord}</span>
            <span className="text-[11px] text-rose-200 font-semibold">Xuất xưởng!</span>
            {/* Wheels */}
            <div className="absolute -bottom-2 flex gap-3">
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Control Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Initials Picker */}
        <div className="p-3 bg-white rounded-2xl border border-emerald-200 space-y-2">
          <span className="text-xs font-bold text-amber-800 block">1. Chọn Âm Đầu:</span>
          <div className="grid grid-cols-5 gap-1.5">
            {initials.map((init) => (
              <button
                key={init}
                onClick={() => {
                  setCurInitial(init);
                  playSoundEffect.click();
                }}
                className={`h-9 rounded-xl font-kid font-bold text-base transition-all ${
                  curInitial === init
                    ? 'bg-amber-500 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-amber-100'
                }`}
              >
                {init}
              </button>
            ))}
          </div>
        </div>

        {/* Rhyme Picker */}
        <div className="p-3 bg-white rounded-2xl border border-emerald-200 space-y-2">
          <span className="text-xs font-bold text-sky-800 block">2. Chọn Âm Chính / Vần:</span>
          <div className="grid grid-cols-5 gap-1.5">
            {rhymes.map((rhm) => (
              <button
                key={rhm}
                onClick={() => {
                  setCurRhyme(rhm);
                  playSoundEffect.click();
                }}
                className={`h-9 rounded-xl font-kid font-bold text-base transition-all ${
                  curRhyme === rhm
                    ? 'bg-sky-500 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-sky-100'
                }`}
              >
                {rhm}
              </button>
            ))}
          </div>
        </div>

        {/* Tone Picker */}
        <div className="p-3 bg-white rounded-2xl border border-emerald-200 space-y-2">
          <span className="text-xs font-bold text-purple-800 block">3. Chọn Dấu Thanh:</span>
          <div className="grid grid-cols-2 gap-1.5">
            {tones.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setCurTone(t.value);
                  playSoundEffect.click();
                }}
                className={`h-9 px-2 rounded-xl text-xs font-semibold transition-all ${
                  curTone === t.value
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-purple-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   GAME 3: MEMORY MATCHING CARDS
   ========================================== */
interface MemoryCard {
  id: number;
  pairKey: string;
  type: 'letter' | 'picture';
  content: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<GameProps> = ({ onEarnStar, soundEnabled }) => {
  const cardPairs = [
    { key: 'c', letter: 'C c', icon: '🐟', label: 'Con cá' },
    { key: 'b', letter: 'B b', icon: '🪆', label: 'Búp bê' },
    { key: 'g', letter: 'G g', icon: '🐓', label: 'Con gà' },
    { key: 'd', letter: 'Đ đ', icon: '☂️', label: 'Ô đỏ' },
  ];

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState<number>(0);

  const initGame = () => {
    const deck: MemoryCard[] = [];
    let idCounter = 1;

    cardPairs.forEach((pair) => {
      // Letter card
      deck.push({
        id: idCounter++,
        pairKey: pair.key,
        type: 'letter',
        content: pair.letter,
        label: `Chữ ${pair.letter}`,
        isFlipped: false,
        isMatched: false,
      });
      // Picture card
      deck.push({
        id: idCounter++,
        pairKey: pair.key,
        type: 'picture',
        content: pair.icon,
        label: pair.label,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(deck.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedCount(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    playSoundEffect.click();
    if (soundEnabled) {
      speakVietnamese(clickedCard.label, { rate: 0.9 });
    }

    const updated = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(updated);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = updated.find(c => c.id === newFlipped[0])!;
      const card2 = updated.find(c => c.id === newFlipped[1])!;

      if (card1.pairKey === card2.pairKey) {
        // Matched!
        setTimeout(() => {
          playSoundEffect.success();
          playSoundEffect.star();
          setCards(prev => prev.map(c => 
            c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setMatchedCount(m => {
            const next = m + 1;
            if (next === cardPairs.length) {
              onEarnStar();
              try { confetti({ particleCount: 50, spread: 70 }); } catch {}
              if (soundEnabled) {
                speakVietnamese('Chúc mừng bé đã tìm được tất cả các cặp thẻ! Bé nhận được một ngôi sao!');
              }
            }
            return next;
          });
        }, 600);
      } else {
        // Not matched
        setTimeout(() => {
          playSoundEffect.wrong();
          setCards(prev => prev.map(c => 
            c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-6 border-2 border-purple-300 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-kid font-bold text-lg text-purple-950">
            Lật Thẻ Tìm Cặp Chữ Cái & Hình Ảnh
          </h2>
          <p className="text-xs text-purple-800">
            Lật 2 thẻ giống nhau: Chữ cái tương ứng với hình ảnh minh họa bài học!
          </p>
        </div>

        <button
          onClick={initGame}
          className="p-2 rounded-xl bg-white border border-purple-200 text-purple-700 hover:bg-purple-100 flex items-center gap-1 text-xs font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Chơi lại</span>
        </button>
      </div>

      {matchedCount === cardPairs.length && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-center font-kid font-bold text-lg animate-bounce">
          🎉 Hoan hô bé đã thắng trò chơi lật thẻ! Bé thật tinh mắt!
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched || card.isFlipped}
            className={`h-36 rounded-2xl border-2 p-2 flex flex-col items-center justify-center transition-all duration-300 ${
              card.isMatched
                ? 'bg-emerald-100 border-emerald-400 opacity-90 scale-98'
                : card.isFlipped
                ? 'bg-white border-purple-400 shadow-md rotate-y-180 scale-102'
                : 'bg-gradient-to-tr from-purple-500 to-indigo-600 border-purple-600 text-white shadow-sm hover:scale-102 cursor-pointer'
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <div className="flex flex-col items-center justify-center">
                <span className={card.type === 'picture' ? 'text-4xl' : 'font-kid font-black text-3xl text-purple-950'}>
                  {card.content}
                </span>
                <span className="text-xs font-semibold text-slate-600 mt-2 text-center">
                  {card.label}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl mb-1">⭐</span>
                <span className="text-xs font-kid font-bold uppercase tracking-wider text-purple-200">
                  Lật thẻ
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ==========================================
   GAME 4: FISHING WORD GAME (Hồ cá ghép tiếng)
   ========================================== */
const FishingGame: React.FC<GameProps> = ({ onEarnStar, soundEnabled }) => {
  const fishes = [
    { id: 1, word: 'cá rô', rhyme: 'o', icon: '🐟' },
    { id: 2, word: 'củ nghệ', rhyme: 'e', icon: '🐠' },
    { id: 3, word: 'bạn thân', rhyme: 'an', icon: '🐡' },
    { id: 4, word: 'rổ rá', rhyme: 'a', icon: '🐟' },
    { id: 5, word: 'búp bê', rhyme: 'ê', icon: '🐠' },
    { id: 6, word: 'chú khỉ', rhyme: 'i', icon: '🐡' },
  ];

  const [targetRhyme, setTargetRhyme] = useState<{ rhyme: string; label: string }>({ rhyme: 'a', label: 'chữ A' });
  const [caughtFish, setCaughtFish] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string>('Bé hãy chọn đúng chú cá mang tiếng có âm cần tìm nhé!');

  const handleCatch = (fish: typeof fishes[0]) => {
    if (fish.word.includes('a') && targetRhyme.rhyme === 'a') {
      playSoundEffect.success();
      playSoundEffect.star();
      setCaughtFish(prev => [...prev, fish.id]);
      setFeedback(`Giỏi quá! Bé đã câu được chú cá « ${fish.word} » có âm a!`);
      onEarnStar();
      if (soundEnabled) {
        speakVietnamese(`Đúng rồi! ${fish.word}! Bé nhận được một ngôi sao!`);
      }
    } else {
      playSoundEffect.wrong();
      setFeedback(`Chưa đúng rồi! « ${fish.word} » không chứa ${targetRhyme.label}. Bé thử chọn chú cá khác nhé!`);
      if (soundEnabled) {
        speakVietnamese(`${fish.word} chưa đúng rồi. Bé thử lại nhé!`);
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 via-blue-100 to-emerald-100 rounded-3xl p-6 border-2 border-sky-400 shadow-md space-y-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-kid font-bold text-lg text-sky-950">
            Hồ Cá Ghép Tiếng (Lấy cảm hứng từ Bài 35 SGK)
          </h2>
          <p className="text-xs text-sky-900">
            Yêu cầu: Hãy câu chú cá mang từ có chứa <span className="font-bold text-rose-700">{targetRhyme.label}</span>!
          </p>
        </div>

        <button
          onClick={() => {
            setCaughtFish([]);
            setFeedback('Bé hãy chọn đúng chú cá mang tiếng có âm cần tìm nhé!');
          }}
          className="p-2 rounded-xl bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 text-xs font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Thả cá lại</span>
        </button>
      </div>

      <div className="p-2.5 rounded-xl bg-white/80 border border-sky-200 text-center text-xs font-semibold text-sky-900">
        {feedback}
      </div>

      {/* Pond Area */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 min-h-[200px]">
        {fishes.map((fish) => {
          const isCaught = caughtFish.includes(fish.id);
          return (
            <button
              key={fish.id}
              onClick={() => handleCatch(fish)}
              disabled={isCaught}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                isCaught
                  ? 'bg-emerald-100 border-emerald-400 opacity-60 scale-95'
                  : 'bg-white/90 border-sky-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md cursor-pointer'
              }`}
            >
              <span className="text-4xl mb-1">{fish.icon}</span>
              <span className="font-kid font-bold text-lg text-sky-950">{fish.word}</span>
              {isCaught && (
                <span className="text-[10px] font-bold text-emerald-700 mt-1">✓ Đã câu được</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

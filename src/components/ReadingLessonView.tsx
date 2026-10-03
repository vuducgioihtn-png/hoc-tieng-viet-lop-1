import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Sparkles, BookOpen, PenTool, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';
import { TEXTBOOK_LESSONS } from '../data/textbookData';
import { speakVietnamese, speakPhonics, playSoundEffect } from '../utils/soundEffects';
import { Lesson1Detail } from './Lesson1Detail';
import { Lesson2Detail } from './Lesson2Detail';
import { Lesson3Detail } from './Lesson3Detail';
import { Lesson4Detail } from './Lesson4Detail';
import { Lesson5Detail } from './Lesson5Detail';
import { Lesson6Detail } from './Lesson6Detail';
import { Lesson7Detail } from './Lesson7Detail';
import { Lesson8Detail } from './Lesson8Detail';
import { Lesson9Detail } from './Lesson9Detail';
import { Lesson10Detail } from './Lesson10Detail';
import { Lesson11Detail } from './Lesson11Detail';
import { Lesson12Detail } from './Lesson12Detail';
import { Lesson13Detail } from './Lesson13Detail';
import { Lesson14Detail } from './Lesson14Detail';
import { Lesson15Detail } from './Lesson15Detail';
import { Lesson16Detail } from './Lesson16Detail';
import { Lesson17Detail } from './Lesson17Detail';
import { Lesson18Detail } from './Lesson18Detail';
import { Lesson19Detail } from './Lesson19Detail';
import { Lesson20Detail } from './Lesson20Detail';
import { Lesson21Detail } from './Lesson21Detail';
import { Lesson22Detail } from './Lesson22Detail';
import { Lesson23Detail } from './Lesson23Detail';
import { Lesson24Detail } from './Lesson24Detail';

interface ReadingLessonViewProps {
  currentLessonId: number;
  onSelectLesson: (id: number) => void;
  onGoToWriting: (letter: string) => void;
  onEarnStar: () => void;
  soundEnabled: boolean;
}

export const ReadingLessonView: React.FC<ReadingLessonViewProps> = ({
  currentLessonId,
  onSelectLesson,
  onGoToWriting,
  onEarnStar,
  soundEnabled,
}) => {
  const lesson = TEXTBOOK_LESSONS.find((l) => l.id === currentLessonId) || TEXTBOOK_LESSONS[0];
  const currentIndex = TEXTBOOK_LESSONS.findIndex((l) => l.id === lesson.id);

  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [selectedPhonicsIdx, setSelectedPhonicsIdx] = useState<number>(0);
  const [hasFinishedLesson, setHasFinishedLesson] = useState<boolean>(false);

  const handleSpeak = (text: string, customPitch = 1.1) => {
    if (!soundEnabled) return;
    playSoundEffect.click();
    speakVietnamese(text, { pitch: customPitch, rate: 0.82 });
  };

  const handleNextLesson = () => {
    if (currentIndex < TEXTBOOK_LESSONS.length - 1) {
      playSoundEffect.click();
      onSelectLesson(TEXTBOOK_LESSONS[currentIndex + 1].id);
      setHasFinishedLesson(false);
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      playSoundEffect.click();
      onSelectLesson(TEXTBOOK_LESSONS[currentIndex - 1].id);
      setHasFinishedLesson(false);
    }
  };

  const handleFinishLesson = () => {
    if (!hasFinishedLesson) {
      setHasFinishedLesson(true);
      playSoundEffect.success();
      onEarnStar();
      handleSpeak('Hoan hô! Bé đã hoàn thành bài học và nhận được một ngôi sao!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Lesson Selector Header */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevLesson}
            disabled={currentIndex === 0}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-amber-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Bài trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Trang {lesson.pageNumber} · Sách Giáo Khoa
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-kid text-slate-900 leading-tight">
              {lesson.title}
            </h1>
          </div>

          <button
            onClick={handleNextLesson}
            disabled={currentIndex === TEXTBOOK_LESSONS.length - 1}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-amber-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Bài tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick jump pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          {TEXTBOOK_LESSONS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                playSoundEffect.click();
                onSelectLesson(l.id);
                setHasFinishedLesson(false);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                l.id === lesson.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
              }`}
            >
              Bài {l.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lesson Content */}
      {lesson.id === 1 ? (
        <Lesson1Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('a')}
        />
      ) : lesson.id === 2 ? (
        <Lesson2Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('b')}
        />
      ) : lesson.id === 3 ? (
        <Lesson3Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('c')}
        />
      ) : lesson.id === 4 ? (
        <Lesson4Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('e')}
        />
      ) : lesson.id === 5 ? (
        <Lesson5Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('6')}
        />
      ) : lesson.id === 6 ? (
        <Lesson6Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('o')}
        />
      ) : lesson.id === 7 ? (
        <Lesson7Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('ô')}
        />
      ) : lesson.id === 8 ? (
        <Lesson8Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('d')}
        />
      ) : lesson.id === 9 ? (
        <Lesson9Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('ơ')}
        />
      ) : lesson.id === 10 ? (
        <Lesson10Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('đ')}
        />
      ) : lesson.id === 11 ? (
        <Lesson11Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('i')}
        />
      ) : lesson.id === 12 ? (
        <Lesson12Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('h')}
        />
      ) : lesson.id === 13 ? (
        <Lesson13Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('u')}
        />
      ) : lesson.id === 14 ? (
        <Lesson14Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('c')}
        />
      ) : lesson.id === 15 ? (
        <Lesson15Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('c')}
        />
      ) : lesson.id === 16 ? (
        <Lesson16Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('m')}
        />
      ) : lesson.id === 17 ? (
        <Lesson17Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('g')}
        />
      ) : lesson.id === 18 ? (
        <Lesson18Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('g')}
        />
      ) : lesson.id === 19 ? (
        <Lesson19Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('n')}
        />
      ) : lesson.id === 20 ? (
        <Lesson20Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('n')}
        />
      ) : lesson.id === 21 ? (
        <Lesson21Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('r')}
        />
      ) : lesson.id === 22 ? (
        <Lesson22Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('t')}
        />
      ) : lesson.id === 23 ? (
        <Lesson23Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('t')}
        />
      ) : lesson.id === 24 ? (
        <Lesson24Detail
          onEarnStar={onEarnStar}
          soundEnabled={soundEnabled}
          onGoToWritingCanvas={() => onGoToWriting('u')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Sections 1 & 2 */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Nhận biết (Recognition) */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-5 border border-amber-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold font-kid flex items-center justify-center text-sm shadow-xs">
                    1
                  </span>
                  <span className="font-kid font-bold text-lg text-amber-950">Nhận biết</span>
                </div>
                <button
                  onClick={() => handleSpeak(lesson.recognition.sentence)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100/60 shadow-2xs transition-all active:scale-95"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Nghe đọc câu</span>
                </button>
              </div>

              {/* Visual Scene Illustration Container */}
              <div className="relative rounded-2xl bg-white/90 p-4 border border-amber-100 shadow-2xs mb-4">
                <div className="h-40 sm:h-48 rounded-xl bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                  {/* Visual backdrop decorations */}
                  <div className="absolute top-2 right-4 text-3xl animate-bounce-slow">☀️</div>
                  <div className="absolute bottom-1 left-3 text-2xl">🌱</div>
                  <div className="absolute bottom-1 right-6 text-2xl">🌸</div>

                  {/* Central themed illustration */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="text-6xl mb-2 filter drop-shadow-sm">
                      {lesson.id === 1 && '🎤 👧 👦'}
                      {lesson.id === 2 && '👵 🪆 👶'}
                      {lesson.id === 3 && '🎣 🐟 👨‍👦'}
                      {lesson.id === 4 && '👩‍👦 💬 🏫'}
                      {lesson.id === 6 && '🐂 🌱 🦩'}
                      {lesson.id === 7 && '🚶‍♂️ 👧 🏢'}
                      {lesson.id === 8 && '🌳 👫 ☂️'}
                      {lesson.id === 9 && '🚢 📦 🌊'}
                      {lesson.id === 11 && '🎨 🦎 👦'}
                      {lesson.id === 14 && '🐒 🍌 🌴'}
                      {lesson.id === 17 && '🧺 🥚 👧'}
                      {lesson.id === 19 && '🐃 🌾 🏡'}
                      {lesson.id === 21 && '🐦 🌿 🐣'}
                      {lesson.id === 29 && '⭐ 📖 ✏️'}
                      {lesson.id === 31 && '🦓 🦒 🤝'}
                    </div>
                    <p className="text-xs text-slate-600 max-w-sm italic">
                      {lesson.recognition.description}
                    </p>
                  </div>
                </div>

                {/* Recognition Sentence with clickable words */}
                <div className="mt-4 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-center">
                  <p className="text-xs text-amber-800 font-medium mb-1">
                    Bé hãy chạm vào từng chữ để nghe phát âm:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {lesson.recognition.sentence.split(' ').map((word, wIdx) => {
                      const cleanWord = word.replace(/[.,]/g, '');
                      const isTarget = lesson.recognition.targetWords.some(t => 
                        t.toLowerCase().includes(cleanWord.toLowerCase())
                      );
                      return (
                        <button
                          key={wIdx}
                          onClick={() => {
                            setActiveWord(cleanWord);
                            handleSpeak(cleanWord);
                          }}
                          className={`text-xl sm:text-2xl font-bold font-kid px-2 py-0.5 rounded-lg transition-transform active:scale-95 ${
                            isTarget
                              ? 'text-rose-600 bg-rose-100/70 border border-rose-300'
                              : 'text-slate-800 hover:bg-amber-200/50'
                          } ${activeWord === cleanWord ? 'ring-2 ring-amber-500 scale-105' : ''}`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Đọc & Mô hình ghép vần (Phonics Model) */}
            <div className="bg-white rounded-3xl p-5 border border-sky-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-sky-500 text-white font-bold font-kid flex items-center justify-center text-sm shadow-xs">
                    2
                  </span>
                  <span className="font-kid font-bold text-lg text-sky-950">
                    Đọc & Mô hình ghép tiếng
                  </span>
                </div>
                <span className="text-xs text-sky-700 font-medium">Bấm vào mô hình để đánh vần</span>
              </div>

              {/* Phonics Model Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lesson.phonics.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedPhonicsIdx(idx);
                      speakPhonics(p.initial, p.rhyme, p.tone, p.result);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPhonicsIdx === idx
                        ? 'border-sky-500 bg-sky-50/80 shadow-sm scale-102'
                        : 'border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase text-sky-700">
                        Mô hình {idx + 1}
                      </span>
                      <Volume2 className="w-4 h-4 text-sky-600" />
                    </div>

                    {/* Phonics Diagram */}
                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="w-12 h-12 rounded-xl bg-white border border-sky-300 flex items-center justify-center font-kid font-bold text-2xl text-sky-800 shadow-2xs">
                        {p.initial}
                      </div>
                      <span className="text-xl font-bold text-slate-400">+</span>
                      <div className="w-12 h-12 rounded-xl bg-white border border-sky-300 flex items-center justify-center font-kid font-bold text-2xl text-emerald-700 shadow-2xs">
                        {p.rhyme || '—'}
                      </div>
                      {p.tone && (
                        <>
                          <span className="text-xl font-bold text-slate-400">+</span>
                          <div className="px-2 h-12 rounded-xl bg-white border border-sky-300 flex items-center justify-center font-kid font-bold text-xs text-rose-600 shadow-2xs">
                            {p.tone}
                          </div>
                        </>
                      )}
                      <span className="text-xl font-bold text-sky-500">➔</span>
                      <div className="w-14 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-kid font-black text-2xl shadow-sm">
                        {p.result}
                      </div>
                    </div>

                    <p className="text-center text-xs font-semibold text-sky-900 mt-2 font-mono">
                      « {p.spellingStep} »
                    </p>
                  </div>
                ))}
              </div>

              {/* Target Letter Large Display */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-around">
                <span className="text-xs font-bold text-amber-900">Chữ cái của bài:</span>
                <div className="flex items-center gap-4">
                  {lesson.letters.map((char, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSpeak(char, 1.2)}
                      className="w-12 h-12 rounded-xl bg-white border-2 border-amber-400 font-kid font-black text-3xl text-amber-800 shadow-2xs flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sections 3, 4, 5 */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section 3: Từ ngữ ứng dụng (Sample Words) */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-bold font-kid flex items-center justify-center text-sm shadow-xs">
                    3
                  </span>
                  <span className="font-kid font-bold text-lg text-emerald-950">
                    Từ ngữ & Hình ảnh
                  </span>
                </div>
                <span className="text-xs text-emerald-700">Chạm để nghe từ</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {lesson.sampleWords.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSpeak(item.word)}
                    className="p-3 rounded-2xl bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-200/80 flex flex-col items-center text-center transition-all group active:scale-95"
                  >
                    <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                      {item.icon || '📌'}
                    </span>
                    <span className="text-lg font-bold font-kid text-slate-800 group-hover:text-emerald-800">
                      {item.word}
                    </span>
                    {item.meaning && (
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {item.meaning}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Đoạn văn đọc (Reading Passage) */}
            <div className="bg-white rounded-3xl p-5 border border-purple-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-purple-500 text-white font-bold font-kid flex items-center justify-center text-sm shadow-xs">
                    4
                  </span>
                  <span className="font-kid font-bold text-lg text-purple-950">
                    Đoạn văn đọc
                  </span>
                </div>
                <button
                  onClick={() => handleSpeak(lesson.readingPassage.sentences.join(' '))}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Đọc cả bài</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-2">
                {lesson.readingPassage.sentences.map((sentence, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => handleSpeak(sentence)}
                    className="cursor-pointer p-2 rounded-xl hover:bg-white transition-colors group flex items-start gap-2"
                  >
                    <span className="text-xs font-bold text-purple-400 mt-1">●</span>
                    <p className="text-base font-medium text-slate-800 group-hover:text-purple-900 leading-relaxed">
                      {sentence}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Nói & Kể chuyện */}
            {lesson.speakingTopic && (
              <div className="bg-white rounded-3xl p-5 border border-rose-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-rose-500 text-white font-bold font-kid flex items-center justify-center text-sm shadow-xs">
                    5
                  </span>
                  <span className="font-kid font-bold text-lg text-rose-950">
                    Nói: {lesson.speakingTopic.topic}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs text-rose-900 leading-relaxed flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <span>{lesson.speakingTopic.prompt}</span>
                </div>
              </div>
            )}

            {/* Complete Lesson Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleFinishLesson}
                className={`w-full py-3 px-4 rounded-2xl font-bold font-kid text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 ${
                  hasFinishedLesson
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                }`}
              >
                {hasFinishedLesson ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span>Đã Hoàn Thành Bài Học (+1 Sao ⭐)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Bé Đã Đọc Xong - Nhận Sao Thưởng</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  playSoundEffect.click();
                  onGoToWriting(lesson.writingTargets[0] || lesson.letters[0] || 'a');
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 font-semibold text-sky-800 text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PenTool className="w-4 h-4 text-sky-600" />
                <span>Chuyển sang Vở Luyện Viết chữ « {lesson.writingTargets.join(', ')} »</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

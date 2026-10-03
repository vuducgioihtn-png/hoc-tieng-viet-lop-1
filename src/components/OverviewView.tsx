import React, { useState } from 'react';
import { Volume2, BookOpen, PenTool, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { TEXTBOOK_LESSONS, BASIC_STROKES, TONE_MARKS, SCHOOL_SUPPLIES } from '../data/textbookData';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface OverviewViewProps {
  onSelectLesson: (id: number) => void;
  onGoToWriting: (target: string) => void;
  completedLessons: number[];
  soundEnabled: boolean;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectLesson,
  onGoToWriting,
  completedLessons,
  soundEnabled,
}) => {
  const [activeSection, setActiveSection] = useState<'lessons' | 'supplies' | 'strokes' | 'tones'>('lessons');

  const handleSpeak = (text: string) => {
    if (!soundEnabled) return;
    playSoundEffect.click();
    speakVietnamese(text);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Welcome Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-6 sm:p-8 text-white shadow-lg overflow-hidden">
        {/* Soft decorative elements */}
        <div className="absolute top-2 right-4 text-6xl opacity-20 select-none">🏫</div>
        <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-white/10 blur-xl" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Sách Giáo Khoa Lớp 1 · Kết Nối Tri Thức
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-kid leading-tight drop-shadow-xs">
            Chào Em Vào Lớp 1 Cùng Bạn Nam & Bạn Hà!
          </h1>

          <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
            Ứng dụng tương tác sinh động giúp các bé lớp 1 học phát âm chuẩn, đánh vần từng tiếng, rèn chữ trên vở 4 ô ly và hào hứng vượt qua các trò chơi tiếng Việt vui nhộn.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playSoundEffect.click();
                onSelectLesson(1);
              }}
              className="px-5 py-2.5 rounded-2xl bg-white text-amber-900 font-bold font-kid text-sm shadow-md hover:bg-amber-50 active:scale-95 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Bắt Đầu Với Bài 1: A a</span>
            </button>

            <button
              onClick={() => {
                playSoundEffect.click();
                onGoToWriting('net-ngang');
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-950/20 hover:bg-amber-950/30 text-white border border-white/30 font-bold font-kid text-sm backdrop-blur-xs transition-all flex items-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              <span>Tập Viết Nét Cơ Bản</span>
            </button>
          </div>
        </div>
      </div>

      {/* Nav Section Switcher */}
      <div className="flex items-center justify-center gap-2 bg-white p-1.5 rounded-2xl border border-amber-200 shadow-xs max-w-xl mx-auto overflow-x-auto">
        <button
          onClick={() => setActiveSection('lessons')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'lessons'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50'
          }`}
        >
          📚 Mục Lục Bài Học
        </button>
        <button
          onClick={() => setActiveSection('strokes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'strokes'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50'
          }`}
        >
          ✍️ 14 Nét Viết Cơ Bản
        </button>
        <button
          onClick={() => setActiveSection('tones')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'tones'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50'
          }`}
        >
          🎵 5 Dấu Thanh
        </button>
        <button
          onClick={() => setActiveSection('supplies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'supplies'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50'
          }`}
        >
          🎒 Đồ Dùng Học Tập
        </button>
      </div>

      {/* SECTION 1: MỤC LỤC BÀI HỌC */}
      {activeSection === 'lessons' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-kid text-slate-900">
              Mục Lục Các Bài Học (Tiếng Việt 1 - Tập Một)
            </h2>
            <span className="text-xs text-slate-500">
              Đã hoàn thành {completedLessons.length} / {TEXTBOOK_LESSONS.length} bài
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TEXTBOOK_LESSONS.map((l) => {
              const isCompleted = completedLessons.includes(l.id);
              return (
                <div
                  key={l.id}
                  className="bg-white rounded-3xl p-5 border border-amber-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
                        Trang {l.pageNumber}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đã học</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-kid font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                      {l.title}
                    </h3>

                    {/* Display target letters */}
                    <div className="flex items-center gap-2">
                      {l.letters.map((char, cIdx) => (
                        <span
                          key={cIdx}
                          className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 font-kid font-bold text-amber-900 text-base flex items-center justify-center"
                        >
                          {char}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 italic">
                      "{l.recognition.sentence}"
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleSpeak(l.recognition.sentence)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-amber-50"
                      title="Nghe câu nhận biết"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        playSoundEffect.click();
                        onSelectLesson(l.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-kid font-bold text-xs shadow-2xs flex items-center gap-1 transition-transform active:scale-95"
                    >
                      <span>Vào học</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: 14 NÉT VIẾT CƠ BẢN */}
      {activeSection === 'strokes' && (
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900">
            💡 <span className="font-bold">Lời dặn của cô giáo:</span> Trước khi viết chữ cái, bé cần nhận biết và luyện viết thành thạo 14 nét cơ bản để nét chữ tròn đều, ngay ngắn!
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BASIC_STROKES.map((stroke) => (
              <div
                key={stroke.id}
                className="bg-white rounded-3xl p-5 border border-purple-200 shadow-xs space-y-3 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-kid font-bold text-lg text-purple-950">
                    {stroke.name}
                  </span>
                  <button
                    onClick={() => handleSpeak(stroke.instruction)}
                    className="p-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100"
                    title="Nghe hướng dẫn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* SVG Visual of stroke */}
                <div className="h-28 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex items-center justify-center p-2 relative overflow-hidden">
                  <svg className="w-24 h-24 text-indigo-700" viewBox="0 0 200 200" fill="none">
                    <path
                      d={stroke.svgPath}
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute bottom-2 right-3 font-kid font-bold text-2xl text-indigo-400 opacity-60">
                    {stroke.symbol}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {stroke.description}
                </p>

                <button
                  onClick={() => {
                    playSoundEffect.click();
                    onGoToWriting(stroke.id);
                  }}
                  className="w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Tập viết nét này</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: 5 DẤU THANH */}
      {activeSection === 'tones' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-6">
            <div>
              <h3 className="font-kid font-bold text-xl text-slate-900">
                5 Dấu Thanh Trong Tiếng Việt
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tiếng Việt có 6 thanh: Thanh ngang (không dấu), Dấu huyền, Dấu sắc, Dấu hỏi, Dấu ngã, Dấu nặng.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {TONE_MARKS.map((tone) => (
                <div
                  key={tone.id}
                  className="p-5 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-kid font-bold text-lg text-amber-950">
                      {tone.name}
                    </span>
                    <button
                      onClick={() => handleSpeak(`${tone.name}. Ví dụ: ${tone.sample}. ${tone.explanation}`)}
                      className="p-1.5 rounded-xl bg-white text-amber-800 shadow-2xs hover:bg-amber-100"
                    >
                      <Volume2 className="w-4 h-4 text-amber-600" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-4 py-2">
                    <span className="w-14 h-14 rounded-2xl bg-white border-2 border-amber-400 font-kid font-black text-3xl text-amber-800 flex items-center justify-center shadow-xs">
                      {tone.symbol}
                    </span>
                    <span className="font-kid font-bold text-2xl text-slate-700">➔</span>
                    <span className="px-4 py-2 rounded-2xl bg-amber-500 text-white font-kid font-bold text-xl shadow-xs">
                      {tone.sample}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tone.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ĐỒ DÙNG HỌC TẬP */}
      {activeSection === 'supplies' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-kid font-bold text-xl text-slate-900">
                Làm Quen Với Đồ Dùng Học Tập Lớp 1 (Trang 8 SGK)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Bé chạm vào từng món đồ để nghe tên và tìm hiểu công dụng hữu ích nhé!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SCHOOL_SUPPLIES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSpeak(`${item.name}. ${item.purpose}.`)}
                  className="p-5 rounded-3xl bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-200 flex flex-col items-center text-center transition-all group active:scale-95"
                >
                  <span className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-kid font-bold text-lg text-emerald-950">
                    {item.name}
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    {item.purpose}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

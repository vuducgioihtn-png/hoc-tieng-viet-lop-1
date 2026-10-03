import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, HeartHandshake } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson21DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson21Detail: React.FC<Lesson21DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page54' | 'page55'>('page54');
  const [hasPracticedSpeaking, setHasPracticedSpeaking] = useState<boolean>(false);
  const [canvasStrokeColor, setCanvasStrokeColor] = useState<string>('#0f172a');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const miniCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio helper
  const handleSpeak = (text: string, pitch = 1.15, rate = 0.82) => {
    if (!soundEnabled) return;
    playSoundEffect.click();
    speakVietnamese(text, { pitch, rate });
  };

  // Canvas drawing handlers
  const handleMiniDrawStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = canvasStrokeColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const handleMiniDrawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMiniDrawEnd = () => {
    setIsDrawing(false);
  };

  const clearMiniCanvas = () => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSoundEffect.click();
  };

  return (
    <div className="space-y-6">
      {/* Page Tabs Header: Trang 54 & Trang 55 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page54')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page54'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 54: Nhận biết, Đọc & Viết R r, S s</span>
          </button>
          <button
            onClick={() => setActiveTab('page55')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page55'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🏪 Trang 55: Đọc "Chợ có gà ri..." & Nói "Cảm ơn"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 21! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page54' ? (
        /* =========================================================================
           TRANG 54: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 21: R r   S s */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">21</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>R r</span>
                  <span className="text-emerald-200">S s</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài hai mươi mốt: R in hoa, r in thường, S in hoa, s in thường. Âm rờ, âm sờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm R r, S s</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Bầy sẻ non ríu ra ríu rít bên mẹ.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bầy sẻ non ríu ra ríu rít bên mẹ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Sparrows in lush green tree */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🐦🪺</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Chim sẻ mẹ hiền từ
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🐥🐥🎶</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Bầy sẻ non ríu rít
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🌳🍃</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Cành cây xanh râm mát
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🌿 Bầy sẻ con chuyền cành ríu ra ríu rít</span>
                  <span>🐥 Những chú chim non ngây thơ đáng yêu</span>
                  <span>❤️ Tình mẹ con ấm áp giữa thiên nhiên</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Bầy sẻ non ríu ra ríu rít bên mẹ." with red s, r */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-xl mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">s, r</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button onClick={() => handleSpeak('Bầy')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">Bầy</button>
                  <button onClick={() => handleSpeak('sờ - e - se - hỏi - sẻ. sẻ.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">s</span>ẻ
                  </button>
                  <button onClick={() => handleSpeak('non')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">non</button>
                  <button onClick={() => handleSpeak('ríu')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">r</span>íu
                  </button>
                  <button onClick={() => handleSpeak('rờ - a - ra. ra.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">r</span>a
                  </button>
                  <button onClick={() => handleSpeak('ríu')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">r</span>íu
                  </button>
                  <button onClick={() => handleSpeak('rít')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">r</span>ít
                  </button>
                  <button onClick={() => handleSpeak('bên')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">bên</button>
                  <button onClick={() => handleSpeak('mẹ')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">mẹ.</button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 54) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm rờ và âm sờ. Âm rờ: rờ - a - ra. ra. Âm sờ: sờ - e - se - hỏi - sẻ. sẻ. rạ, rế, rổ, sả, sẽ, sò. rổ rá, cá rô, su su, chữ số.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'r' and 's' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'r' & TIẾNG 'ra' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'r' in red */}
                <button
                  onClick={() => handleSpeak('rờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm rờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    r
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm rờ
                  </span>
                </button>

                {/* Ô trên: [ r | a ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('rờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm rờ"
                  >
                    r
                  </button>
                  <button
                    onClick={() => handleSpeak('a')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm a"
                  >
                    a
                  </button>
                </div>

                {/* Ô dưới: [ ra ] */}
                <button
                  onClick={() => handleSpeak('rờ - a - ra. ra.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: rờ - a - ra. ra."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">r</span>
                    <span className="text-slate-900">a</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('rờ - a - ra.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  rờ - a - ra
                </button>
              </div>

              {/* CỘT 2: ÂM 's' & TIẾNG 'sẻ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 's' in red */}
                <button
                  onClick={() => handleSpeak('sờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm sờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    s
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm sờ (uốn lưỡi)
                  </span>
                </button>

                {/* Ô trên: [ s | e ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('sờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm sờ"
                  >
                    s
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ sẻ ] */}
                <button
                  onClick={() => handleSpeak('sờ - e - se - hỏi - sẻ. sẻ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: sờ - e - se - hỏi - sẻ. sẻ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">s</span>
                    <span className="text-slate-900">ẻ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('sờ - e - se - hỏi - sẻ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  sờ - e - se - hỏi - sẻ
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 54: rạ rế rổ - sả sẽ sò */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('rạ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">rạ</button>
                  <button onClick={() => handleSpeak('rế')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">rế</button>
                  <button onClick={() => handleSpeak('rổ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">rổ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('sả')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">sả</button>
                  <button onClick={() => handleSpeak('sẽ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">sẽ</button>
                  <button onClick={() => handleSpeak('sò')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">sò</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 54: "rổ rá", "cá rô", "su su", "chữ số" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Rổ rá -> 'rổ rá' */}
              <button
                onClick={() => handleSpeak('rổ rá')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🧺💙
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">rổ rá</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Rổ tre và rổ nhựa</span>
              </button>

              {/* Image 2: Con cá rô -> 'cá rô' */}
              <button
                onClick={() => handleSpeak('cá rô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🐟✨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">cá rô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cá rô đồng bơi khỏe</span>
              </button>

              {/* Image 3: Quả su su -> 'su su' */}
              <button
                onClick={() => handleSpeak('su su')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-green-50 border-2 border-slate-200 hover:border-green-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🍈🌿
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">su su</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Quả su su tươi non</span>
              </button>

              {/* Image 4: Chữ số -> 'chữ số' */}
              <button
                onClick={() => handleSpeak('chữ số')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🔢🎨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">chữ số</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Các con số nhiều màu</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 54)
              Dải kẻ 5 ô ly chuẩn: r (chấm), r (liền), s (chấm), s (liền), rổ rá, su su
              ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center bg-[#58be3b] rounded-full pl-1.5 pr-4 py-1 text-white shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#fbb03b] text-slate-900 font-black flex items-center justify-center text-xs mr-2 shadow-xs">
                  3
                </span>
                <span className="font-kid font-bold text-base tracking-wide">
                  Tô và viết
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak('Cách viết chữ r: Bắt đầu từ đường kẻ 1, viết nét xiên lên vượt qua đường kẻ 3 một chút, tạo vòng xoắn nhỏ ở đỉnh, đưa nét ngang hơi võng rồi chuyển hướng viết nét móc ngược, dừng bút ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ r"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ r</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ s: Bắt đầu từ đường kẻ 1, viết nét xiên lên vượt qua đường kẻ 3 một chút, tạo vòng xoắn nhỏ ở đỉnh, sau đó lượn nét cong sang phải rồi uốn lượn vào trong, dừng bút ở độ cao khoảng 1 ô ly.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ s"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ s</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ rổ rá và su su: Cụm từ rổ rá: chữ r nối sang ô có dấu hỏi, cách 1 ô ly viết chữ r nối sang a có dấu sắc. Cụm từ su su: chữ s nối sang u, cách 1 ô ly viết chữ s nối sang u.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết rổ rá, su su"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết rổ rá, su su</span>
                </button>

                <button
                  onClick={clearMiniCanvas}
                  className="p-1 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs"
                  title="Xóa nét vẽ"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quy trình chi tiết các nét chữ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">r s</span>
                  <span>Chữ r và Chữ s (Nét thắt trên đường kẻ 3)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ r:</strong> Từ ĐK 1 xiên lên vượt ĐK 3 một chút, tạo vòng xoắn nhỏ, đưa ngang hơi võng rồi viết nét móc ngược dừng ở ĐK 2.<br />
                  <strong>Chữ s:</strong> Từ ĐK 1 xiên lên vượt ĐK 3 một chút, tạo vòng xoắn nhỏ, uốn cong sang phải rồi cuộn vào trong.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">rổ rá su su</span>
                  <span>Cụm từ "rổ rá" và "su su"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>rổ rá:</strong> Tiếng rổ (r nối ô + dấu hỏi), cách 1 ô ly viết tiếng rá (r nối a + dấu sắc).<br />
                  <strong>su su:</strong> Tiếng su (s nối u), cách 1 ô ly viết tiếp tiếng su (s nối u).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 54 OF TEXTBOOK */}
            <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                <defs>
                  <pattern id="oli-grid-page54" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                  </pattern>
                </defs>

                {/* Fill background with 22px dotted grid */}
                <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page54)" />

                {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                {/* Đường kẻ 5: y = 24 */}
                <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 3 (đỉnh chữ a, ô, u cao 2 ô ly): y = 68 */}
                <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                {/* Đường kẻ 2 (độ cao 1 ô ly - điểm dừng bút): y = 90 */}
                <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                {/* Viền trái phải */}
                <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                {/* ==============================================================
                    1. CHỮ 'r' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                    Từ y=112 xiên lên y=62, thắt nút nhỏ, đưa ngang rồi móc xuống y=112 uốn lên y=90
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 12 112 C 16 96, 22 72, 25 63 C 27 58, 32 58, 30 65 L 43 65 L 43 104 C 43 112, 47 112, 53 112 C 57 112, 60 104, 62 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    2. CHỮ 'r' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 72 112 C 76 96, 82 72, 85 63 C 87 58, 92 58, 90 65 L 103 65 L 103 104 C 103 112, 107 112, 113 112 C 117 112, 120 104, 122 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    3. CHỮ 's' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                    Từ y=112 xiên lên y=62, thắt nút nhỏ, lượn cong sang phải cuộn vào trong
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 132 112 C 137 96, 144 72, 147 63 C 149 58, 154 58, 152 65 C 162 67, 166 78, 164 92 C 162 104, 154 112, 144 112 C 140 112, 137 108, 137 102 C 137 96, 142 94, 145 96"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    4. CHỮ 's' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 180 112 C 185 96, 192 72, 195 63 C 197 58, 202 58, 200 65 C 210 67, 214 78, 212 92 C 210 104, 202 112, 192 112 C 188 112, 185 108, 185 102 C 185 96, 190 94, 193 96"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    5. CỤM TỪ 'rổ rá' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng rổ: r nối ô + dấu hỏi ?
                    Tiếng rá: r nối a + dấu sắc /
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG RỔ */}
                  <path
                    d="M 226 112 C 230 96, 236 72, 239 63 C 241 58, 246 58, 244 65 L 257 65 L 257 104 C 257 112, 261 112, 267 112 C 271 112, 274 104, 276 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ ô */}
                  <path
                    d="M 302 74 C 296 68, 286 68, 280 76 C 274 84, 274 96, 280 104 C 286 112, 296 112, 302 104 C 306 96, 306 82, 302 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 288 64 L 292 56 L 296 64"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 297 50 C 297 47, 299 46, 301 46 C 303 46, 304 47, 304 49 C 304 51, 301 52, 300 53 L 300 54"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG RÁ: r nối a + dấu sắc */}
                  <path
                    d="M 326 112 C 330 96, 336 72, 339 63 C 341 58, 346 58, 344 65 L 357 65 L 357 104 C 357 112, 361 112, 367 112 C 371 112, 374 104, 376 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ a */}
                  <path
                    d="M 402 74 C 396 68, 386 68, 380 76 C 374 84, 374 96, 380 104 C 386 112, 396 112, 402 104 C 406 96, 406 82, 402 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 402 68 L 402 104 C 402 112, 406 112, 413 112 C 418 112, 422 104, 424 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 396 54 L 390 60"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* ==============================================================
                    6. CỤM TỪ 'su su' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng su: s nối u
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG SU THỨ 1 */}
                  <path
                    d="M 444 112 C 449 96, 456 72, 459 63 C 461 58, 466 58, 464 65 C 474 67, 478 78, 476 92 C 474 104, 466 112, 456 112 C 452 112, 449 108, 449 102 C 449 96, 454 94, 457 96 L 476 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ u nối từ s */}
                  <path
                    d="M 476 90 L 480 68 L 480 102 C 480 112, 485 112, 492 112 C 499 112, 504 102, 504 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 504 68 L 504 104 C 504 112, 508 112, 512 112 C 514 112, 516 104, 517 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG SU THỨ 2 */}
                  <path
                    d="M 536 112 C 541 96, 548 72, 551 63 C 553 58, 558 58, 556 65 C 566 67, 570 78, 568 92 C 566 104, 558 112, 548 112 C 544 112, 541 108, 541 102 C 541 96, 546 94, 549 96 L 568 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ u */}
                  <path
                    d="M 568 90 L 572 68 L 572 102 C 572 112, 577 112, 584 112 C 591 112, 596 102, 596 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 596 68 L 596 104 C 596 112, 600 112, 604 112 C 606 112, 608 104, 609 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>

              {/* Touch/Mouse Tracing Interactive Drawing Canvas */}
              <canvas
                ref={miniCanvasRef}
                onMouseDown={handleMiniDrawStart}
                onMouseMove={handleMiniDrawMove}
                onMouseUp={handleMiniDrawEnd}
                onMouseLeave={handleMiniDrawEnd}
                onTouchStart={handleMiniDrawStart}
                onTouchMove={handleMiniDrawMove}
                onTouchEnd={handleMiniDrawEnd}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10"
              />
            </div>

            {/* Minimal, clean control bar below the strip */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium">Bút viết:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { color: '#0f172a', name: 'Mực đen' },
                    { color: '#1d4ed8', name: 'Mực xanh tím' },
                    { color: '#e11d48', name: 'Mực đỏ' },
                  ].map((pen) => (
                    <button
                      key={pen.color}
                      onClick={() => setCanvasStrokeColor(pen.color)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        canvasStrokeColor === pen.color ? 'scale-125 border-amber-400 shadow-xs' : 'border-white'
                      }`}
                      style={{ backgroundColor: pen.color }}
                      title={pen.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">
                  Bé dùng chuột hoặc ngón tay chạm vào khung để tập tô và viết tiếp!
                </span>
                {onGoToWritingCanvas && (
                  <button
                    onClick={onGoToWritingCanvas}
                    className="px-3 py-1 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors shadow-2xs"
                  >
                    Mở vở lớn 4 ô ly
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           TRANG 55: MỤC 4 (ĐỌC CÂU "Chợ có gà ri...") VÀ MỤC 5 (NÓI CHỦ ĐỀ "CẢM ƠN")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Chợ có gà ri, cá rô, su su. Chợ có cả rổ rá.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Chợ có gà ri, cá rô, su su. Chợ có cả rổ rá.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc toàn bộ câu</span>
              </button>
            </div>

            {/* Bustling village market matching textbook Page 55 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-amber-50 to-orange-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Village market scene */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🏪🧺</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Chợ quê nhộn nhịp
                    </span>
                  </div>

                  {/* Fish vendor and chicken cages */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🐟🐔🍈</span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[11px] font-bold mt-1 shadow-xs">
                      Cá rô, gà ri và su su
                    </span>
                  </div>

                  {/* Basket stalls */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🧺🪹</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Rổ rá đan lát
                    </span>
                  </div>
                </div>

                {/* The Reading Sentences: "Chợ có gà ri, cá rô, su su. Chợ có cả rổ rá." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2 space-y-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button onClick={() => handleSpeak('Chợ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Chợ</button>
                    <button onClick={() => handleSpeak('có')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">có</button>
                    <button onClick={() => handleSpeak('gà')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">gà</button>
                    <button onClick={() => handleSpeak('ri')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">ri,</button>
                    <button onClick={() => handleSpeak('cá')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cá</button>
                    <button onClick={() => handleSpeak('rô')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">rô,</button>
                    <button onClick={() => handleSpeak('su')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">su</button>
                    <button onClick={() => handleSpeak('su')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">su.</button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900 pt-1 border-t border-slate-100">
                    <button onClick={() => handleSpeak('Chợ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Chợ</button>
                    <button onClick={() => handleSpeak('có')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">có</button>
                    <button onClick={() => handleSpeak('cả')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cả</button>
                    <button onClick={() => handleSpeak('rổ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">rổ</button>
                    <button onClick={() => handleSpeak('rá')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">rá.</button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Chợ quê bày bán biết bao thức quà tươi ngon và đồ dùng quen thuộc của cuộc sống hằng ngày!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: CẢM ƠN) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Cảm ơn (Lễ phép nói lời cảm ơn trong cuộc sống)
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Cảm ơn. Tranh một: Sinh nhật bà, bạn nhỏ hai tay nâng niu hộp quà tặng bà, bà âu yếm cảm ơn cháu. Tranh hai: Bố đi công tác về mang quà cho bé gái, bạn nhỏ hai tay đón nhận và vòng tay cảm ơn bố. Khi được người lớn tặng quà hoặc giúp đỡ, chúng mình hãy luôn lễ phép nói lời cảm ơn nhé!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý tình huống</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Bài học ứng xử:</strong> Khi được người khác tặng quà, khen ngợi hoặc giúp đỡ một việc gì đó, bé cần làm gì và nói lời cảm ơn như thế nào cho thật chân thành, lễ phép?
            </p>

            {/* 2 TÌNH HUỐNG NÓI LỜI CẢM ƠN CHUẨN XÁC THEO SGK TRANG 55 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {/* TÌNH HUỐNG 1: SINH NHẬT BÀ */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Bé chúc mừng sinh nhật bà
                  </h4>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-rose-100 via-amber-50 to-pink-50 flex flex-col items-center justify-center p-3 text-center border border-rose-200/60 shadow-inner">
                  <span className="text-7xl mb-1 drop-shadow-sm">👵🎂🎁👦</span>
                  <span className="text-[11px] font-bold text-slate-700 bg-white/90 px-3 py-0.5 rounded-full shadow-2xs">
                    "Cháu chúc mừng sinh nhật bà ạ!"
                  </span>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => handleSpeak('Bé tặng quà: Cháu chúc bà luôn mạnh khỏe và sống lâu ạ! Bà xoa đầu cháu: Bà cảm ơn cháu yêu của bà nhiều lắm!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-xs font-bold text-rose-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Lời chúc và lời cảm ơn của bà</span>
                    <Volume2 className="w-4 h-4 text-rose-600" />
                  </button>
                </div>
              </div>

              {/* TÌNH HUỐNG 2: BỐ ĐI CÔNG TÁC VỀ TẶNG QUÀ */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Bố đi công tác về tặng quà cho bé
                  </h4>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 via-teal-50 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-7xl mb-1 drop-shadow-sm">👨🧳🎁👧</span>
                  <span className="text-[11px] font-bold text-slate-700 bg-white/90 px-3 py-0.5 rounded-full shadow-2xs">
                    "Con cảm ơn bố nhiều lắm ạ!"
                  </span>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => handleSpeak('Bé hai tay đón nhận túi quà đồ chơi và vòng tay lễ phép: Dạ, con cảm ơn bố nhiều lắm ạ! Con thích món quà này lắm!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Lời cảm ơn lễ phép của bé gái</span>
                    <Volume2 className="w-4 h-4 text-sky-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💖</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy thực hành nói lời cảm ơn:
                  </h5>
                  <p className="text-emerald-800">
                    Khi nhận quà: bé đứng ngay ngắn, nhận quà bằng hai tay, mắt nhìn vào người tặng và nói lời cảm ơn lễ phép!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé nói lời cảm ơn rất lễ phép, ngoan ngoãn và đáng yêu! Cô khen ngợi bé!');
                  playSoundEffect.success();
                  onEarnStar();
                }}
                className={`px-4 py-2 rounded-xl font-kid font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
                  hasPracticedSpeaking
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-900'
                }`}
              >
                {hasPracticedSpeaking ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã hoàn thành phần Nói 🌟</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>Luyện nói lời cảm ơn</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

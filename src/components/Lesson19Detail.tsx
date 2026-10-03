import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson19DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson19Detail: React.FC<Lesson19DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page50' | 'page51'>('page50');
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
      {/* Page Tabs Header: Trang 50 & Trang 51 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page50')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page50'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 50: Nhận biết, Đọc & Viết Ng ng, Ngh ngh</span>
          </button>
          <button
            onClick={() => setActiveTab('page51')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page51'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🐃 Trang 51: Đọc "Nghé ngủ ở bờ đê." & Nói "Vườn bách thú"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 19! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page50' ? (
        /* =========================================================================
           TRANG 50: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 19: Ng ng   Ngh ngh */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">19</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ ghép và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>Ng ng</span>
                  <span className="text-emerald-200">Ngh ngh</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười chín: Ngờ đơn in hoa, ngờ đơn in thường, Ngờ kép in hoa, ngờ kép in thường. Âm ngờ đơn, âm ngờ kép.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm Ng ng, Ngh ngh</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Nghé theo mẹ ra ngõ.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Nghé theo mẹ ra ngõ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Buffalo calf following mother out to the village alley */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👨‍🌾🐃</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-stone-300">
                      Bác nông dân dắt trâu mẹ
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🐂✨</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-amber-300">
                      Chú nghé con nối gót mẹ
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🏡🌳</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Ngõ làng râm mát
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🐃 Chú nghé con lông nâu vàng ngoan ngoãn</span>
                  <span>🌾 Cảnh làng quê thanh bình, tươi đẹp</span>
                  <span>🛤️ Con ngõ làng rợp bóng cây xanh</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Nghé theo mẹ ra ngõ." with red Ngh, ng */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">Ngh, ng</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('ngờ - e - nghe - sắc - nghé. nghé.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">Ngh</span>é
                  </button>
                  <button
                    onClick={() => handleSpeak('theo')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    theo
                  </button>
                  <button
                    onClick={() => handleSpeak('mẹ')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    mẹ
                  </button>
                  <button
                    onClick={() => handleSpeak('ra')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    ra
                  </button>
                  <button
                    onClick={() => handleSpeak('ngờ - o - ngo - ngã - ngõ. ngõ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">ng</span>õ.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 50) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm ngờ đơn và âm ngờ kép. Âm ngờ đơn: ngờ - o - ngo - ngã - ngõ. ngõ. Âm ngờ kép: ngờ - e - nghe - sắc - nghé. nghé. ngã, ngủ, ngự, nghe, nghé, nghĩ. ngã ba, ngõ nhỏ, củ nghệ, nghỉ hè.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'ng' and 'ngh' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'ng' & TIẾNG 'ngõ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'ng' in red */}
                <button
                  onClick={() => handleSpeak('ngờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm ngờ đơn"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ng
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm ngờ (đơn)
                  </span>
                </button>

                {/* Ô trên: [ ng | o ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('ngờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ngờ"
                  >
                    ng
                  </button>
                  <button
                    onClick={() => handleSpeak('o')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm o"
                  >
                    o
                  </button>
                </div>

                {/* Ô dưới: [ ngõ ] */}
                <button
                  onClick={() => handleSpeak('ngờ - o - ngo - ngã - ngõ. ngõ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: ngờ - o - ngo - ngã - ngõ. ngõ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">ng</span>
                    <span className="text-slate-900">õ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('ngờ - o - ngo - ngã - ngõ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  ngờ - o - ngo - ngã - ngõ
                </button>
              </div>

              {/* CỘT 2: ÂM 'ngh' & TIẾNG 'nghé' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'ngh' in red */}
                <button
                  onClick={() => handleSpeak('ngờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm ngờ kép"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ngh
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm ngờ (kép)
                  </span>
                </button>

                {/* Ô trên: [ ngh | e ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('ngờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ngờ"
                  >
                    ngh
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ nghé ] */}
                <button
                  onClick={() => handleSpeak('ngờ - e - nghe - sắc - nghé. nghé.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: ngờ - e - nghe - sắc - nghé. nghé."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">ngh</span>
                    <span className="text-slate-900">é</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('ngờ - e - nghe - sắc - nghé.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  ngờ - e - nghe - sắc - nghé
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 50: ngã ngủ ngự - nghe nghé nghĩ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('ngã')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ngã</button>
                  <button onClick={() => handleSpeak('ngủ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ngủ</button>
                  <button onClick={() => handleSpeak('ngự')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ngự</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('nghe')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nghe</button>
                  <button onClick={() => handleSpeak('nghé')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nghé</button>
                  <button onClick={() => handleSpeak('nghĩ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nghĩ</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 50: "ngã ba", "ngõ nhỏ", "củ nghệ", "nghỉ hè" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Ngã ba đường -> 'ngã ba' */}
              <button
                onClick={() => handleSpeak('ngã ba')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🛣️🚸
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">ngã ba</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Ngã ba đường phố</span>
              </button>

              {/* Image 2: Ngõ nhỏ -> 'ngõ nhỏ' */}
              <button
                onClick={() => handleSpeak('ngõ nhỏ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🏡🛤️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">ngõ nhỏ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Con ngõ nhỏ làng quê</span>
              </button>

              {/* Image 3: Củ nghệ -> 'củ nghệ' */}
              <button
                onClick={() => handleSpeak('củ nghệ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-orange-50 border-2 border-slate-200 hover:border-orange-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🫚✨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">củ nghệ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-orange-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Củ nghệ vàng thơm</span>
              </button>

              {/* Image 4: Nghỉ hè -> 'nghỉ hè' */}
              <button
                onClick={() => handleSpeak('nghỉ hè')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🪁🏃‍♂️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">nghỉ hè</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Vui chơi thả diều</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 50)
              Dải kẻ 5 ô ly chuẩn: ng (chấm), ng (liền), ngh (chấm), ngh (liền), ngõ, củ nghệ
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
                  onClick={() => handleSpeak('Cách viết chữ ng: Viết chữ n cao 2 ô ly dừng ở đường kẻ 2, sau đó lia bút nối liền nét sang chữ g cao 5 ô ly (2 ô ly trên và 3 ô ly dưới), dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ ng"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ ng</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ ngh: Viết chữ n cao 2 ô ly nối liền sang chữ g cao 5 ô ly (2 trên, 3 dưới), sau đó lượn lên đường kẻ 2 nối liền sang nét khuyết trên của chữ h cao 5 ô ly vươn lên đường kẻ 6 rồi kéo xuống baseline, viết nét móc hai đầu dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ ngh"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ ngh</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết tiếng ngõ và cụm từ củ nghệ: Tiếng ngõ: viết chữ ng nối sang o có dấu ngã. Cụm từ củ nghệ: viết chữ c nối sang u có dấu hỏi, cách 1 ô ly viết chữ ngh nối sang ê có dấu nặng ở dưới.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết ngõ, củ nghệ"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết ngõ, củ nghệ</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">ng ngh</span>
                  <span>Chữ ghép ng và Chữ ghép ngh</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ ng:</strong> Chữ n (cao 2 ô ly) nối liền nét sang chữ g (cao 5 ô ly: 2 trên, 3 dưới).<br />
                  <strong>Chữ ngh:</strong> Chữ n nối sang chữ g rồi nối tiếp sang chữ h (cao 5 ô ly trên baseline).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">ngõ củ nghệ</span>
                  <span>Tiếng "ngõ" và cụm từ "củ nghệ"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>ngõ:</strong> Chữ ng nối sang o cao 2 ô ly + dấu ngã ~ trên đầu o.<br />
                  <strong>củ nghệ:</strong> Tiếng củ (c nối u + dấu hỏi), cách 1 ô ly viết tiếng nghệ (ngh nối ê + dấu nặng .).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 50 OF TEXTBOOK */}
            <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                <defs>
                  <pattern id="oli-grid-page50" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                  </pattern>
                </defs>

                {/* Fill background with 22px dotted grid */}
                <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page50)" />

                {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                {/* Đường kẻ 6 (đỉnh chữ h cao 5 ô ly so với baseline y=46): y = 2 */}
                <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 3 (đỉnh thân chữ n, nét cong kín chữ g, o, u, ê - cao 2 ô ly): y = 24 */}
                <line x1="0" y1="24" x2="100%" y2="24" stroke="#0284c7" strokeWidth="1.4" />

                {/* Đường kẻ 1 (Baseline ở độ cao y=46): y = 46 */}
                <line x1="0" y1="46" x2="100%" y2="46" stroke="#0284c7" strokeWidth="2.2" />

                {/* Đường kẻ dưới 3 (đáy nét khuyết dưới chữ g - sâu 3 ô ly): y = 112 */}
                <line x1="0" y1="112" x2="100%" y2="112" stroke="#0284c7" strokeWidth="1.4" />

                {/* Viền trái phải */}
                <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                {/* ==============================================================
                    1. CHỮ GHÉP 'ng' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                    Chữ n (cao 2 ô ly) nối liền sang chữ g (cao 5 ô ly: 2 trên, 3 dưới)
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ n */}
                  <path
                    d="M 10 36 C 13 26, 18 24, 22 24 L 22 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 22 38 C 26 26, 34 24, 39 24 L 39 42 C 39 46, 42 46, 46 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Nối sang chữ g */}
                  <path
                    d="M 68 30 C 64 24, 54 24, 48 32 C 42 40, 42 52, 48 60 C 54 68, 64 68, 68 60 C 71 54, 71 38, 68 30 Z"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 68 24 L 68 100 C 68 112, 59 112, 54 112 C 49 112, 46 104, 50 94 L 78 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    2. CHỮ GHÉP 'ng' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 96 36 C 99 26, 104 24, 108 24 L 108 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 108 38 C 112 26, 120 24, 125 24 L 125 42 C 125 46, 128 46, 132 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 154 30 C 150 24, 140 24, 134 32 C 128 40, 128 52, 134 60 C 140 68, 150 68, 154 60 C 157 54, 157 38, 154 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 154 24 L 154 100 C 154 112, 145 112, 140 112 C 135 112, 132 104, 136 94 L 164 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    3. CHỮ GHÉP 'ngh' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                    Chữ n nối sang g nối tiếp sang chữ h cao 5 ô ly
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ n */}
                  <path
                    d="M 180 36 C 183 26, 188 24, 192 24 L 192 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 192 38 C 196 26, 204 24, 209 24 L 209 42 C 209 46, 212 46, 216 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ g */}
                  <path
                    d="M 238 30 C 234 24, 224 24, 218 32 C 212 40, 212 52, 218 60 C 224 68, 234 68, 238 60 C 241 54, 241 38, 238 30 Z"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 238 24 L 238 100 C 238 112, 229 112, 224 112 C 219 112, 216 104, 220 94 L 248 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Nối sang chữ h cao 5 ô ly */}
                  <path
                    d="M 248 46 L 256 24 C 262 10, 268 2, 263 2 C 259 2, 257 5, 257 12 L 257 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 257 38 C 261 26, 267 24, 273 24 C 278 24, 280 30, 280 38 L 280 42 C 280 46, 283 46, 286 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    4. CHỮ GHÉP 'ngh' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ n */}
                  <path
                    d="M 302 36 C 305 26, 310 24, 314 24 L 314 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 314 38 C 318 26, 326 24, 331 24 L 331 42 C 331 46, 334 46, 338 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ g */}
                  <path
                    d="M 360 30 C 356 24, 346 24, 340 32 C 334 40, 334 52, 340 60 C 346 68, 356 68, 360 60 C 363 54, 363 38, 360 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 360 24 L 360 100 C 360 112, 351 112, 346 112 C 341 112, 338 104, 342 94 L 370 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 370 46 L 378 24 C 384 10, 390 2, 385 2 C 381 2, 379 5, 379 12 L 379 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 379 38 C 383 26, 389 24, 395 24 C 400 24, 402 30, 402 38 L 402 42 C 402 46, 405 46, 408 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    5. TIẾNG 'ngõ' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                    Chữ ng nối o + dấu ngã ~
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ n */}
                  <path
                    d="M 426 36 C 429 26, 434 24, 438 24 L 438 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 438 38 C 442 26, 450 24, 455 24 L 455 42 C 455 46, 458 46, 462 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ g */}
                  <path
                    d="M 484 30 C 480 24, 470 24, 464 32 C 458 40, 458 52, 464 60 C 470 68, 480 68, 484 60 C 487 54, 487 38, 484 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 484 24 L 484 100 C 484 112, 475 112, 470 112 C 465 112, 462 104, 466 94 L 494 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ o nối từ g */}
                  <path
                    d="M 520 30 C 514 24, 504 24, 498 32 C 492 40, 492 52, 498 60 C 504 68, 514 68, 520 60 C 524 52, 524 38, 520 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dấu ngã ~ trên đầu o */}
                  <path
                    d="M 506 14 C 508 12, 510 12, 512 14 C 514 16, 516 16, 518 14"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* ==============================================================
                    6. CỤM TỪ 'củ nghệ' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng củ: c nối u + dấu hỏi ?
                    Tiếng nghệ: ngh nối ê + dấu nặng .
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG CỦ */}
                  <path
                    d="M 552 30 C 548 24, 539 24, 534 32 C 529 40, 529 52, 534 60 C 539 68, 548 68, 553 60 C 555 57, 557 52, 557 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ u nối từ c */}
                  <path
                    d="M 557 46 L 561 24 L 561 58 C 561 68, 566 68, 573 68 C 580 68, 585 58, 585 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 585 24 L 585 60 C 585 68, 589 68, 593 68 C 595 68, 597 60, 598 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dấu hỏi trên đầu u */}
                  <path
                    d="M 577 14 C 577 11, 579 10, 581 10 C 583 10, 584 11, 584 13 C 584 15, 581 16, 580 17 L 580 18"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG NGHỆ: chữ ngh nối ê + dấu nặng */}
                  {/* Chữ n */}
                  <path
                    d="M 622 36 C 625 26, 630 24, 634 24 L 634 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 634 38 C 638 26, 646 24, 651 24 L 651 42 C 651 46, 654 46, 658 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ g */}
                  <path
                    d="M 680 30 C 676 24, 666 24, 660 32 C 654 40, 654 52, 660 60 C 666 68, 676 68, 680 60 C 683 54, 683 38, 680 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 680 24 L 680 100 C 680 112, 671 112, 666 112 C 661 112, 658 104, 662 94 L 690 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 690 46 L 698 24 C 704 10, 710 2, 705 2 C 701 2, 699 5, 699 12 L 699 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 699 38 C 703 26, 709 24, 715 24 C 720 24, 722 30, 722 38 L 722 42 C 722 46, 725 46, 728 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ ê nối từ h */}
                  <path
                    d="M 728 46 C 732 38, 737 36, 741 36 C 745 36, 747 40, 741 43 C 734 46, 736 52, 741 52 C 745 52, 748 48, 750 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Mũ ê */}
                  <path
                    d="M 737 26 L 741 20 L 745 26"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dấu nặng dưới ê */}
                  <circle cx="740" cy="56" r="1.5" fill="#000000" />
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
           TRANG 51: MỤC 4 (ĐỌC CÂU "Nghé đã no cỏ. Nghé ngủ ở bờ đê.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "THĂM VƯỜN BÁCH THÚ")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Nghé đã no cỏ. Nghé ngủ ở bờ đê.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Nghé đã no cỏ. Nghé ngủ ở bờ đê.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Buffalo calf sleeping peacefully on the green dike matching textbook Page 51 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Calf sleeping peacefully on grassy dike */}
                  <div className="flex flex-col items-center">
                    <span className="text-8xl drop-shadow-md">🐂💤</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Nghé con no cỏ ngủ say
                    </span>
                  </div>

                  {/* Buffaloes grazing in the distance */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🐃🌾🏞️</span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[11px] font-bold mt-1 shadow-xs">
                      Đàn trâu gặm cỏ xa xa
                    </span>
                  </div>

                  {/* Gentle breeze over river dike */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🍃⛅</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Bờ đê gió mát rượi
                    </span>
                  </div>
                </div>

                {/* The Reading Passages: "Nghé đã no cỏ. Nghé ngủ ở bờ đê." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2 space-y-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button onClick={() => handleSpeak('ngờ - e - nghe - sắc - Nghé. Nghé.')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">Nghé</button>
                    <button onClick={() => handleSpeak('đã')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">đã</button>
                    <button onClick={() => handleSpeak('no')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">no</button>
                    <button onClick={() => handleSpeak('cỏ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cỏ.</button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900 pt-1 border-t border-slate-100">
                    <button onClick={() => handleSpeak('ngờ - e - nghe - sắc - Nghé. Nghé.')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">Nghé</button>
                    <button onClick={() => handleSpeak('ngủ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">ngủ</button>
                    <button onClick={() => handleSpeak('ở')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">ở</button>
                    <button onClick={() => handleSpeak('bờ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">bờ</button>
                    <button onClick={() => handleSpeak('đê')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">đê.</button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Đồng quê êm ả thanh bình, chú nghé con no nê nằm ngủ ngoan dưới bóng mây trời lộng gió!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: THĂM VƯỜN BÁCH THÚ) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Nói</h3>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                    Chủ đề: Thăm vườn bách thú
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Thăm vườn bách thú. Bức tranh vẽ cảnh vườn bách thú đông vui, các bạn nhỏ thích thú ngắm nhìn các loài động vật: hươu cao cổ vươn cổ ăn lá cây bên hàng rào, hai mẹ con chú voi to lớn đang tắm suối phun nước mát lành, bầy hươu sao hiền lành uống nước bên bờ suối. Một chuyến đi thật vui và bổ ích!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh vườn bách thú: Trong vườn bách thú có những loài động vật nào? Chú voi, chú hươu cao cổ đang làm gì? Bé đã từng được đi sở thú chưa và bé thích con vật nào nhất?
            </p>

            {/* Zoo Animals Grid matching Textbook Page 51 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
              {/* ĐỘNG VẬT 1: HƯƠU CAO CỔ */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Hươu cao cổ
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-amber-100 to-orange-50 flex flex-col items-center justify-center p-3 text-center border border-amber-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🦒🌿</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Chiếc cổ cao vút ăn lá
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Hươu cao cổ có chiếc cổ rất dài và bộ lông hoa đốm vàng nâu tuyệt đẹp, thích ăn lá cây xanh trên ngọn cao!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu hươu cao cổ</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>

              {/* ĐỘNG VẬT 2: ĐÀN VOI TẮM SUỐI */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Mẹ con chú voi
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-sky-100 to-teal-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🐘💦🌊</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Dùng vòi hút nước tắm mát
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Chú voi to lớn có đôi tai như hai cái quạt nan, chiếc vòi dài khéo léo dùng để hút nước tắm mát và phun nước thật vui nhộn!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu mẹ con chú voi</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>

              {/* ĐỘNG VẬT 3: HƯƠU SAO BÊN HỒ */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Bầy hươu sao hiền lành
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-emerald-100 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-emerald-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🦌💧🏞️</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Hiền hòa uống nước bên hồ
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Bầy hươu sao có đôi mắt to tròn long lanh, bộ lông điểm hoa sao trắng tinh, bước đi nhẹ nhàng thanh thoát!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu bầy hươu sao</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🦁</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy kể về một con vật trong vườn bách thú mà bé yêu thích nhất!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bé mô tả hình dáng, bộ lông, tiếng kêu và cử chỉ đáng yêu của con vật đó nhé!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé kể về chuyến tham quan vườn bách thú rất sinh động và hào hứng! Cô khen ngợi bé!');
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
                    <span>Luyện nói về sở thú</span>
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

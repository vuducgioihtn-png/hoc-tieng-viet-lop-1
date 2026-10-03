import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson4DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson4Detail: React.FC<Lesson4DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page20' | 'page21'>('page20');
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
      {/* Page Tabs Header: Trang 20 & Trang 21 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page20')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page20'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 20: Nhận biết, Đọc & Viết E e, Ê ê</span>
          </button>
          <button
            onClick={() => setActiveTab('page21')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page21'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🌳 Trang 21: Đọc "Bà bế bé." & Nói "Trên sân trường"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã học rất chăm chỉ Bài 4! Bé nhận được 1 ngôi sao!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page20' ? (
        /* =========================================================================
           TRANG 20: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 4: E e   Ê ê */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">4</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và dấu thanh
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span>E</span>
                    <span className="text-emerald-200">e</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Ê</span>
                    <span className="text-amber-300">ê</span>
                  </div>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài bốn: E in hoa, e in thường. Ê in hoa, ê in thường.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm E e, Ê ê</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Bé kể mẹ nghe về bạn bè.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bé kể mẹ nghe về bạn bè.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Mom listening to kid talking about school friends */}
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50 p-6 border border-amber-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Mom and child conversation at table */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-rose-300">
                      Mẹ mặc áo chấm bi đỏ
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/90 border border-amber-200 shadow-xs">
                    <span className="text-2xl">☕🍓</span>
                    <span className="text-xs font-bold text-slate-700">Tách trà và đĩa quả</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👦</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Bé kể chuyện ở lớp
                    </span>
                  </div>
                </div>

                {/* 3 Thought Bubbles showing school friends as in textbook */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mt-1">
                  <div className="p-2.5 rounded-2xl bg-white/90 border border-sky-200 shadow-2xs flex items-center gap-2">
                    <span className="text-3xl">🚴‍♂️</span>
                    <div className="text-left">
                      <span className="text-[11px] font-bold text-sky-950 block">Bạn đạp xe</span>
                      <span className="text-[10px] text-slate-500">Đội mũ bảo hiểm an toàn</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-white/90 border border-purple-200 shadow-2xs flex items-center gap-2">
                    <span className="text-3xl">👧📝</span>
                    <div className="text-left">
                      <span className="text-[11px] font-bold text-purple-950 block">Bạn nữ viết bài</span>
                      <span className="text-[10px] text-slate-500">Ngồi học nắn nót</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-white/90 border border-emerald-200 shadow-2xs flex items-center gap-2">
                    <span className="text-3xl">🪑🤝</span>
                    <div className="text-left">
                      <span className="text-[11px] font-bold text-emerald-950 block">Các bạn xếp ghế</span>
                      <span className="text-[10px] text-slate-500">Giúp đỡ nhau trong lớp</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Recognition Sentence: "Bé kể mẹ nghe về bạn bè." with red 'e' and 'ê' */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">e, ê</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Bé')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    B<span className="text-rose-600 font-black">é</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('kể')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    k<span className="text-rose-600 font-black">ể</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('mẹ')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    m<span className="text-rose-600 font-black">ẹ</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('nghe')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    ngh<span className="text-rose-600 font-black">e</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('về')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    v<span className="text-rose-600 font-black">ề</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('bạn')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    bạn
                  </button>
                  <button
                    onClick={() => handleSpeak('bè')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    b<span className="text-rose-600 font-black">è</span>.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 20) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm e và âm ê. Âm e: bờ - e - be - sắc - bé. bé. Âm ê: bờ - ê - bê - sắc - bế. bế. bè, bé, bế.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree: 2 Columns for 'e' and 'ê' matching textbook layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* MÔ HÌNH 1: ÂM 'e' VÀ TIẾNG 'bé' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Đỉnh trên: chữ e màu đỏ */}
                <button
                  onClick={() => handleSpeak('e')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm e"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    e
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    e
                  </span>
                </button>

                {/* Connecting Line */}
                <div className="w-0.5 h-3 bg-sky-300" />

                {/* Ô trên: [ b | e ] */}
                <div className="w-full max-w-[200px] flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('bờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm bờ"
                  >
                    b
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ bé ] */}
                <button
                  onClick={() => handleSpeak('bờ - e - be - sắc - bé. bé.')}
                  className="w-full max-w-[200px] py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: bờ - e - be - sắc - bé. bé."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">b</span>
                    <span className="text-rose-600">é</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('bờ - e - be - sắc - bé.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  bờ - e - be - sắc - bé
                </button>
              </div>

              {/* MÔ HÌNH 2: ÂM 'ê' VÀ TIẾNG 'bế' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Đỉnh trên: chữ ê màu đỏ */}
                <button
                  onClick={() => handleSpeak('ê')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm ê"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ê
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    ê
                  </span>
                </button>

                {/* Connecting Line */}
                <div className="w-0.5 h-3 bg-sky-300" />

                {/* Ô trên: [ b | ê ] */}
                <div className="w-full max-w-[200px] flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('bờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm bờ"
                  >
                    b
                  </button>
                  <button
                    onClick={() => handleSpeak('ê')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ê"
                  >
                    ê
                  </button>
                </div>

                {/* Ô dưới: [ bế ] */}
                <button
                  onClick={() => handleSpeak('bờ - ê - bê - sắc - bế. bế.')}
                  className="w-full max-w-[200px] py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: bờ - ê - bê - sắc - bế. bế."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">b</span>
                    <span className="text-rose-600">ế</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('bờ - ê - bê - sắc - bế.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  bờ - ê - bê - sắc - bế
                </button>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 20: "bè", "bé", "bế" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Bè tre trên sông -> 'bè' */}
              <button
                onClick={() => handleSpeak('bờ - e - be - huyền - bè. cái bè.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🛶
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">bè</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chiếc bè tre trên sông</span>
              </button>

              {/* Image 2: Em bé sơ sinh -> 'bé' */}
              <button
                onClick={() => handleSpeak('bờ - e - be - sắc - bé. em bé.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    👶
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">bé</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Em bé bụ bẫm</span>
              </button>

              {/* Image 3: Mẹ bế bé -> 'bế' */}
              <button
                onClick={() => handleSpeak('bờ - ê - bê - sắc - bế. mẹ bế bé.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🤱
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">bế</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Mẹ ẵm bế bé</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 20)
              Dải kẻ 5 ô ly chuẩn: e (chấm), e (liền), ê (chấm), ê (liền), bé (liền), bế (liền)
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
                  onClick={() => handleSpeak('Cách viết chữ e: Đặt bút trên đường kẻ 1 một chút, viết nét xiên lượn sang phải lên đường kẻ 3, lượn cong tròn sang trái xuống chạm đáy đường kẻ 1, lượn lên dừng bút ở giữa đường kẻ 1 và đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ e"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ e</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ ê: Viết chữ e cao 2 ô ly, sau đó lia bút lên trên đầu chữ e viết dấu mũ gồm hai nét xiên ngắn chụm ở đỉnh cân đối giữa đường kẻ 3 và đường kẻ 4.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ ê"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ ê</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">e</span>
                  <span>Chữ e (cao 2 ô ly, rộng 1.75 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Đặt bút trên ĐK ngang 1 một chút, viết nét xiên lượn cong sang phải lên chạm ĐK 3, cong sang trái đè lưng chạm dòng kẻ dọc, xuống chạm ĐK đáy rồi hất lên dừng bút ở giữa ĐK 1 và 2.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">ê</span>
                  <span>Chữ ê (Chữ e + Dấu mũ ^)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ e cao 2 ô ly. Lia bút lên giữa ĐK 3 và ĐK 4 viết dấu mũ gồm 2 nét xiên ngắn: xiên lên từ trái sang phải, xiên xuống từ trái sang phải, chụm ở đỉnh cân đối.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">bé</span>
                  <span>Tiếng bé, bế (Chữ b nối sang e, ê)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ b cao 5 ô ly, từ nét thắt của b nối êm sang viết chữ e cao 2 ô ly. Đặt dấu sắc trên đầu e (với tiếng bế: dấu sắc đặt chếch bên phải dấu mũ).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 20 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 20: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    {/* Uniform 22px dotted square grid pattern */}
                    <pattern id="oli-grid-page20" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill entire background with the uniform 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page20)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH CHUẨN MỰC */}
                  {/* Đường kẻ ngang 6 (đỉnh nét khuyết chữ b - cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ ngang 3 (ĐƯỜNG KẺ XANH Ở ĐỈNH CHỮ e, ê - CAO 2 Ô LY): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ ngang 2 (ở độ cao 1 ô ly): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ ngang 1 (ĐƯỜNG KẺ XANH ĐẬM Ở ĐÁY - BASELINE): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Outer Left & Right blue borders */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'e' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Đặt bút trên ĐK1 một chút (y=104), xiên lên ĐK3 (y=68), lượn cong xuống ĐK1 (y=112), dừng tại y=98
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 28 104 C 36 94, 46 76, 38 69 C 32 64, 22 72, 20 86 C 18 100, 24 112, 34 112 C 40 112, 45 106, 48 98"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'e' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      Cách chữ 1 đúng 4 ô ly
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 94 104 C 102 94, 112 76, 104 69 C 98 64, 88 72, 86 86 C 84 100, 90 112, 100 112 C 106 112, 111 106, 114 98"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CHỮ 'ê' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Chữ e + dấu mũ ^ chấm mờ cân đối
                      ============================================================== */}
                  <g fill="none">
                    {/* Thân chữ e */}
                    <path
                      d="M 160 104 C 168 94, 178 76, 170 69 C 164 64, 154 72, 152 86 C 150 100, 156 112, 166 112 C 172 112, 177 106, 180 98"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ */}
                    <path
                      d="M 158 64 L 163 56 L 168 64"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. CHỮ 'ê' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      Chữ e + dấu mũ ^ nét mực đen liền
                      ============================================================== */}
                  <g fill="none">
                    {/* Thân chữ e */}
                    <path
                      d="M 226 104 C 234 94, 244 76, 236 69 C 230 64, 220 72, 218 86 C 216 100, 222 112, 232 112 C 238 112, 243 106, 246 98"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ */}
                    <path
                      d="M 224 64 L 229 56 L 234 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      5. TIẾNG 'bé' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      Chữ b cao 5 ô ly (thân sổ thẳng đè x=286), nối sang chữ e và dấu sắc
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ b: nét khuyết trên đỉnh tròn mượt, thân x=286, thắt tại y=68 nối sang e */}
                    <path
                      d="M 275 90 L 286 68 C 292 54, 301 32, 301 18 C 301 7, 297 3, 292 3 C 288 3, 286 6, 286 12 L 286 98 C 286 107, 291 112, 297 112 C 304 112, 308 104, 308 86 C 308 76, 304 68, 299 68 C 295 68, 294 72, 298 72 C 302 72, 307 72, 314 80"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ e nối từ nét thắt của b */}
                    <path
                      d="M 314 80 C 319 72, 326 68, 331 69 C 337 70, 336 82, 327 92 C 318 102, 320 112, 330 112 C 336 112, 341 106, 344 98"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / trên đầu chữ e */}
                    <path
                      d="M 333 52 L 327 60"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      6. TIẾNG 'bế' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                      Chữ b cao 5 ô ly (thân sổ x=374), nối sang ê, dấu mũ ^ và dấu sắc chếch phải
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ b */}
                    <path
                      d="M 363 90 L 374 68 C 380 54, 389 32, 389 18 C 389 7, 385 3, 380 3 C 376 3, 374 6, 374 12 L 374 98 C 374 107, 379 112, 385 112 C 392 112, 396 104, 396 86 C 396 76, 392 68, 387 68 C 383 68, 382 72, 386 72 C 390 72, 395 72, 402 80"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ê nối từ b */}
                    <path
                      d="M 402 80 C 407 72, 414 68, 419 69 C 425 70, 424 82, 415 92 C 406 102, 408 112, 418 112 C 424 112, 429 106, 432 98"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ trên đầu ê */}
                    <path
                      d="M 414 64 L 419 56 L 424 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / đặt nghiêng bên phải dấu mũ ^ đúng quy tắc chính tả */}
                    <path
                      d="M 428 50 L 423 58"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>

                {/* Touch/Mouse Tracing Interactive Drawing Canvas overlaying the strip */}
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
        </div>
      ) : (
        /* =========================================================================
           TRANG 21: MỤC 4 (ĐỌC CÂU "Bà bế bé.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "TRÊN SÂN TRƯỜNG")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bà bế bé.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bà bế bé.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bà bế bé."</span>
              </button>
            </div>

            {/* Cozy Grandma and Baby in Rocking Chair Scene Illustration matching textbook Page 21 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50 p-6 border border-amber-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-8 mb-4">
                  {/* Grandma holding baby */}
                  <div className="flex flex-col items-center">
                    <span className="text-8xl drop-shadow-md">👵👶</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-2 shadow-xs border border-amber-300">
                      Bà ngồi ghế tựa êm ái bế bé
                    </span>
                  </div>

                  {/* Room cozy decorations */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">🪟🪴🌼</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold shadow-xs">
                      Cửa sổ và chậu hoa cúc vàng
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Bà bế bé." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-md mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bà')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bà
                    </button>
                    <button
                      onClick={() => handleSpeak('bế')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      bế
                    </button>
                    <button
                      onClick={() => handleSpeak('bé')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      bé.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bà hiền hậu âu yếm bế em bé trong vòng tay yêu thương!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: TRÊN SÂN TRƯỜNG) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Trên sân trường
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Trên sân trường. Giờ ra chơi, sân trường em thật nhộn nhịp. Các bạn chơi nhảy dây, đuổi bắt quanh gốc cây to, và ngồi đọc sách dưới bóng râm mát.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh sân trường giờ ra chơi: Các bạn đang chơi những trò chơi gì? Cây xanh trên sân trường thế nào? Bé thích chơi trò gì nhất cùng các bạn?
            </p>

            {/* School Yard Scene Activities matching Textbook Page 21 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Activity 1: Nhảy dây */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Trò chơi nhảy dây
                  </h4>
                </div>

                <div className="h-32 rounded-2xl bg-gradient-to-b from-sky-100 to-emerald-50 flex items-center justify-center text-center p-3">
                  <span className="text-5xl animate-bounce-slow">🏃‍♀️🪢🏃</span>
                </div>

                <button
                  onClick={() => handleSpeak('Các bạn đang chơi nhảy dây thật vui! Hai bạn quay dây nhịp nhàng, các bạn lần lượt nhảy vào.')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Xem chi tiết trò nhảy dây</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* Activity 2: Đuổi bắt quanh gốc cây */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Đuổi bắt quanh cây bàng
                  </h4>
                </div>

                <div className="h-32 rounded-2xl bg-gradient-to-b from-emerald-100 to-amber-50 flex items-center justify-center text-center p-3">
                  <span className="text-5xl">🌳🏃‍♂️🏃‍♀️</span>
                </div>

                <button
                  onClick={() => handleSpeak('Cây bàng to tỏa bóng râm mát rượi, các bạn chơi trò đuổi bắt ríu rít tiếng cười reo.')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Xem trò đuổi bắt</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>

              {/* Activity 3: Ngồi ghế đá đọc sách */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-500 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Ngồi ghế đá đọc truyện
                  </h4>
                </div>

                <div className="h-32 rounded-2xl bg-gradient-to-b from-purple-100 to-rose-50 flex items-center justify-center text-center p-3">
                  <span className="text-5xl">🪑👧📖👧</span>
                </div>

                <button
                  onClick={() => handleSpeak('Dưới bóng cây xanh, hai bạn ngồi trên ghế đá mở cuốn truyện tranh nhiều màu sắc cùng nhau đọc.')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-xs font-bold text-purple-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Xem góc đọc sách</span>
                  <Volume2 className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy kể về giờ ra chơi ở trường của bé!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bé thích chơi trò nhảy dây, đá cầu hay đọc sách cùng các bạn?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé giỏi lắm! Giờ ra chơi giúp chúng mình vận động khỏe mạnh và gắn bó tình bạn bè thật vui!');
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
                    <span>Luyện nói cùng cô giáo</span>
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

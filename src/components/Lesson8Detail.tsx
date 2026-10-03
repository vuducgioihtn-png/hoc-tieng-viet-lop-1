import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson8DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson8Detail: React.FC<Lesson8DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page28' | 'page29'>('page28');
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
      {/* Page Tabs Header: Trang 28 & Trang 29 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page28')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page28'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 28: Nhận biết, Đọc & Viết D d, Đ đ</span>
          </button>
          <button
            onClick={() => setActiveTab('page29')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page29'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>☂️ Trang 29: Đọc "Bé có ô đỏ." & Nói "Chào hỏi"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 8! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page28' ? (
        /* =========================================================================
           TRANG 28: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 8: D d   Đ đ */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">8</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>D d</span>
                  <span className="text-emerald-200">Đ đ</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài tám: D in hoa, d in thường, Đ in hoa, đ in thường. Âm dờ, âm đờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm D d, Đ đ</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Dưới gốc đa, các bạn chơi dung dăng dung dẻ.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Dưới gốc đa, các bạn chơi dung dăng dung dẻ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Moonlight under big banyan tree, kids holding hands playing folk game */}
            <div className="relative rounded-3xl bg-gradient-to-b from-indigo-900 via-sky-800 to-emerald-700 p-6 border border-emerald-300 overflow-hidden text-center text-white shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Full Moon & Tree Canopy */}
                <div className="flex items-center justify-between w-full max-w-lg mb-2">
                  <span className="text-6xl drop-shadow-lg animate-pulse-slow">🌕</span>
                  <span className="text-6xl drop-shadow-md">🌳</span>
                </div>

                {/* 5 Kids holding hands playing "Dung dăng dung dẻ" */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👧👗</span>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">Bé váy bi</span>
                  </div>
                  <span className="text-2xl text-amber-300">🤝</span>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👦👕</span>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">Bạn áo vàng</span>
                  </div>
                  <span className="text-2xl text-amber-300">🤝</span>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👦🏮</span>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">Bạn áo đỏ</span>
                  </div>
                  <span className="text-2xl text-amber-300">🤝</span>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👧🌸</span>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">Bạn áo trắng</span>
                  </div>
                  <span className="text-2xl text-amber-300">🤝</span>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👦🌿</span>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">Bạn áo sọc</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-sky-200 pt-2 border-t border-sky-400/40">
                  <span>🌕 Đêm trăng rằm tròn vành vạnh</span>
                  <span>🌳 Gốc cây đa cổ thụ rợp bóng</span>
                  <span>🎶 Trò chơi dân gian "Dung dăng dung dẻ"</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Dưới gốc đa, các bạn chơi dung dăng dung dẻ." with red D, đ, d */}
              <div className="mt-4 p-4 rounded-2xl bg-white text-slate-900 border-2 border-amber-300 shadow-md max-w-2xl mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">D, đ, d</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-2xl sm:text-3xl font-kid font-bold">
                  <button
                    onClick={() => handleSpeak('Dưới')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">D</span>ưới
                  </button>
                  <button
                    onClick={() => handleSpeak('gốc')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    gốc
                  </button>
                  <button
                    onClick={() => handleSpeak('đa')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">đ</span>a,
                  </button>
                  <button
                    onClick={() => handleSpeak('các')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    các
                  </button>
                  <button
                    onClick={() => handleSpeak('bạn')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    bạn
                  </button>
                  <button
                    onClick={() => handleSpeak('chơi')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    chơi
                  </button>
                  <button
                    onClick={() => handleSpeak('dung')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">d</span>ung
                  </button>
                  <button
                    onClick={() => handleSpeak('dăng')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">d</span>ăng
                  </button>
                  <button
                    onClick={() => handleSpeak('dung')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">d</span>ung
                  </button>
                  <button
                    onClick={() => handleSpeak('dẻ')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">d</span>ẻ.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 28) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm dờ và âm đờ. Âm dờ: dờ - e - de - hỏi - dẻ. dẻ. Âm đờ: đờ - a - đa. đa. da, dẻ, dế, đá, đò, đổ. đá dế, đa đa, ô đỏ.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'd' and 'đ' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'd' & TIẾNG 'dẻ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'd' in red */}
                <button
                  onClick={() => handleSpeak('dờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm dờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    d
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    dờ
                  </span>
                </button>

                {/* Ô trên: [ d | e ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('dờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm dờ"
                  >
                    d
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ dẻ ] */}
                <button
                  onClick={() => handleSpeak('dờ - e - de - hỏi - dẻ. dẻ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: dờ - e - de - hỏi - dẻ. dẻ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">d</span>
                    <span className="text-slate-900">ẻ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('dờ - e - de - hỏi - dẻ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  dờ - e - de - hỏi - dẻ
                </button>
              </div>

              {/* CỘT 2: ÂM 'đ' & TIẾNG 'đa' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'đ' in red */}
                <button
                  onClick={() => handleSpeak('đờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm đờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    đ
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    đờ
                  </span>
                </button>

                {/* Ô trên: [ đ | a ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('đờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm đờ"
                  >
                    đ
                  </button>
                  <button
                    onClick={() => handleSpeak('a')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm a"
                  >
                    a
                  </button>
                </div>

                {/* Ô dưới: [ đa ] */}
                <button
                  onClick={() => handleSpeak('đờ - a - đa. đa.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: đờ - a - đa. đa."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">đ</span>
                    <span className="text-slate-900">a</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('đờ - a - đa.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  đờ - a - đa
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 28: da dẻ dế - đá đò đổ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('da')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">da</button>
                  <button onClick={() => handleSpeak('dẻ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">dẻ</button>
                  <button onClick={() => handleSpeak('dế')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">dế</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('đá')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">đá</button>
                  <button onClick={() => handleSpeak('đò')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">đò</button>
                  <button onClick={() => handleSpeak('đổ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">đổ</button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 28: "đá dế", "đa đa", "ô đỏ" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Hai chú dế chọi -> 'đá dế' */}
              <button
                onClick={() => handleSpeak('đá dế. trò chơi chọi dế.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🦗⚔️🦗
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">đá dế</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Trò chơi đá dế</span>
              </button>

              {/* Image 2: Chim đa đa -> 'đa đa' */}
              <button
                onClick={() => handleSpeak('đa đa. chim đa đa.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🦃🌾
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">đa đa</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chú chim đa đa</span>
              </button>

              {/* Image 3: Ô đỏ -> 'ô đỏ' */}
              <button
                onClick={() => handleSpeak('ô đỏ. chiếc ô màu đỏ.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    ☂️🔴
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">ô đỏ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chiếc ô đỏ chấm bi</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 28)
              Dải kẻ 5 ô ly chuẩn: d (chấm), d (liền), đ (chấm), đ (liền), đá dế (liền)
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
                  onClick={() => handleSpeak('Cách viết chữ d và đ: Chữ d gồm nét cong kín cao 2 ô ly và nét móc ngược phải cao 4 ô ly từ đường kẻ 5 kéo xuống chạm đường kẻ 1 rồi móc lên đường kẻ 2. Chữ đ thêm nét gạch ngang ngắn ở đường kẻ 4.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ d, đ"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ d, đ</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ đá dế: Tiếng đá: Viết chữ đ cao 4 ô ly dừng bút ở đường kẻ 2, chạm liền sang mép trái chữ a cao 2 ô ly, dấu sắc trên đầu chữ a. Cách một khoảng 1 ô ly, viết tiếp tiếng dế: chữ d cao 4 ô ly nối sang chữ ê, dấu mũ và dấu sắc.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết đá dế"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết cụm từ đá dế</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">d đ</span>
                  <span>Chữ d và Chữ đ (Cao đúng 4 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ d:</strong> Nét cong kín cao 2 ô ly + Nét móc ngược phải cao 4 ô ly (từ ĐK 5 kéo thẳng xuống chạm ĐK 1 rồi móc lên ĐK 2).<br />
                  <strong>Chữ đ:</strong> Chữ d + Nét gạch ngang ngắn ở ĐK 4 (dài 1 ô ly, đối xứng 2 bên thân chữ).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">đá dế</span>
                  <span>Cụm từ "đá dế"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Tiếng đá:</strong> Chữ đ cao 4 ô ly nối liền chạm mép trái chữ a cao 2 ô ly + dấu sắc trên đầu a.<br />
                  <strong>Tiếng dế:</strong> Cách 1 khoảng 1 ô ly, chữ d cao 4 ô ly nối sang ê cao 2 ô ly + dấu mũ ^ và dấu sắc.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 28 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 28: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page28" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page28)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 5 (đỉnh chữ d, đ - cao 4 ô ly): y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 4 (vị trí nét gạch ngang ngắn của chữ đ): y = 46 */}
                  <line x1="0" y1="46" x2="100%" y2="46" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh nét cong kín và chữ a, e - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'd' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét cong kín cao 2 ô ly + nét móc ngược phải cao 4 ô ly
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét cong kín cao 2 ô ly */}
                    <path
                      d="M 33 74 C 27 68, 17 68, 11 76 C 5 84, 5 96, 11 104 C 17 112, 27 112, 33 104 C 37 96, 37 82, 33 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc ngược phải cao 4 ô ly (từ y=24 xuống y=112 rồi móc lên y=90) */}
                    <path
                      d="M 33 24 L 33 104 C 33 112, 37 112, 44 112 C 49 112, 53 104, 55 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'd' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      Cách chữ 1 đúng 3 ô ly (tại x=88)
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét cong kín cao 2 ô ly */}
                    <path
                      d="M 88 74 C 82 68, 72 68, 66 76 C 60 84, 60 96, 66 104 C 72 112, 82 112, 88 104 C 92 96, 92 82, 88 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc ngược phải cao 4 ô ly */}
                    <path
                      d="M 88 24 L 88 104 C 88 112, 92 112, 99 112 C 104 112, 108 104, 110 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CHỮ 'đ' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Chữ d cao 4 ô ly + Nét gạch ngang ngắn ở y=46
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét cong kín */}
                    <path
                      d="M 143 74 C 137 68, 127 68, 121 76 C 115 84, 115 96, 121 104 C 127 112, 137 112, 143 104 C 147 96, 147 82, 143 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc ngược phải cao 4 ô ly */}
                    <path
                      d="M 143 24 L 143 104 C 143 112, 147 112, 154 112 C 159 112, 163 104, 165 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét gạch ngang ngắn ở y=46 */}
                    <path
                      d="M 132 46 L 154 46"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. CHỮ 'đ' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      Chữ d cao 4 ô ly + Nét gạch ngang ngắn ở y=46
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét cong kín */}
                    <path
                      d="M 198 74 C 192 68, 182 68, 176 76 C 170 84, 170 96, 176 104 C 182 112, 192 112, 198 104 C 202 96, 202 82, 198 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc ngược phải cao 4 ô ly */}
                    <path
                      d="M 198 24 L 198 104 C 198 112, 202 112, 209 112 C 214 112, 218 104, 220 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét gạch ngang ngắn ở y=46 */}
                    <path
                      d="M 187 46 L 209 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      5. CỤM TỪ 'đá dế' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng 'đá': chữ đ cao 4 ô ly nối a + dấu sắc
                      Tiếng 'dế': chữ d cao 4 ô ly nối ê + dấu mũ + dấu sắc
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG ĐÁ: Chữ đ cao 4 ô ly */}
                    <path
                      d="M 253 74 C 247 68, 237 68, 231 76 C 225 84, 225 96, 231 104 C 237 112, 247 112, 253 104 C 257 96, 257 82, 253 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 253 24 L 253 104 C 253 112, 257 112, 264 112 C 269 112, 273 104, 275 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 242 46 L 264 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* Chữ a nối từ đ */}
                    <path
                      d="M 297 74 C 291 68, 281 68, 275 76 C 269 84, 269 96, 275 104 C 281 112, 291 112, 297 104 C 301 96, 301 82, 297 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 297 68 L 297 104 C 297 112, 301 112, 308 112 C 313 112, 317 104, 319 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc trên chữ a */}
                    <path
                      d="M 290 56 L 282 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG DẾ: Chữ d cao 4 ô ly */}
                    <path
                      d="M 352 74 C 346 68, 336 68, 330 76 C 324 84, 324 96, 330 104 C 336 112, 346 112, 352 104 C 356 96, 356 82, 352 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 352 24 L 352 104 C 352 112, 356 112, 363 112 C 368 112, 372 104, 374 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ê nối từ d */}
                    <path
                      d="M 374 90 C 379 82, 386 78, 391 79 C 397 80, 396 92, 387 102 C 378 112, 380 122, 390 122 C 396 122, 401 116, 404 108"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ trên đầu ê */}
                    <path
                      d="M 386 74 L 391 66 L 396 74"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / nghiêng phải trên đầu ê */}
                    <path
                      d="M 400 60 L 395 68"
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
           TRANG 29: MỤC 4 (ĐỌC CÂU "Bé có ô đỏ.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "CHÀO HỎI")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bé có ô đỏ.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bé có ô đỏ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bé có ô đỏ."</span>
              </button>
            </div>

            {/* Little girl holding red umbrella with polka dots matching textbook Page 29 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Little girl with umbrella */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👧🎒</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bé gái váy xanh ngọc
                    </span>
                  </div>

                  {/* Red umbrella */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">☂️🔴</span>
                    <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[11px] font-bold mt-1 shadow-xs">
                      Chiếc ô đỏ chấm bi
                    </span>
                  </div>

                  {/* Country road and trees */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🌾🌳</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Đường làng râm mát
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Bé có ô đỏ." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-md mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bé')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bé
                    </button>
                    <button
                      onClick={() => handleSpeak('có')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      có
                    </button>
                    <button
                      onClick={() => handleSpeak('ô')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      ô
                    </button>
                    <button
                      onClick={() => handleSpeak('đỏ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      đỏ.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bé vui vẻ che chiếc ô đỏ chấm bi xinh xắn tung tăng bước đi trên con đường làng!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: CHÀO HỎI) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Chào hỏi
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Chào hỏi lễ phép. Tranh một: Khi khách đến nhà chơi, bé đứng khoanh tay lễ phép cúi đầu chào: Cháu chào bác ạ! Tranh hai: Khi đi học về đến cổng nhà, bé khoanh tay chào bố: Con chào bố con mới đi học về ạ!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát hai bức tranh dưới đây: Khi có bác khách đến nhà chơi, bạn nhỏ làm gì và nói lời chào như thế nào? Khi được mẹ đón từ trường về đến cổng nhà gặp bố, bạn nhỏ chào bố ra sao?
            </p>

            {/* 2 Greeting Scenes matching Textbook Page 29: Greeting a guest at home & Greeting dad when returning home */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              {/* TRANH 1: BÉ CHÀO KHÁCH ĐẾN NHÀ CHƠI */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <h4 className="font-kid font-bold text-sm text-slate-900">
                      Bé chào khách đến nhà chơi
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Trước cửa nhà
                  </span>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-amber-100 via-rose-50 to-orange-50 flex flex-col items-center justify-center p-4 text-center border border-amber-200/60 shadow-inner">
                  <div className="flex items-center justify-center gap-6 mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👧🌸</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Bé khoanh tay</span>
                    </div>
                    <span className="text-3xl">🙇‍♀️</span>
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👨‍🦳🛍️</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Bác khách đến chơi</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-amber-950 bg-white/90 px-3 py-1 rounded-full shadow-2xs">
                    "Cháu chào bác ạ! Cháu mời bác vào nhà chơi ạ!"
                  </p>
                </div>

                <button
                  onClick={() => handleSpeak('Tranh một: Khi có bác khách đến nhà chơi, bé gái đứng nghiêm trang, khoanh hai tay trước ngực lễ phép cúi đầu thưa: Cháu chào bác ạ! Bác khách vui vẻ khen bé ngoan.')}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nghe lời chào khách đến chơi</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* TRANH 2: BÉ ĐI HỌC VỀ CHÀO BỐ Ở CỔNG NHÀ */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <h4 className="font-kid font-bold text-sm text-slate-900">
                      Bé đi học về chào bố
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                    Cổng nhà ấm áp
                  </span>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 via-indigo-50 to-emerald-50 flex flex-col items-center justify-center p-4 text-center border border-sky-200/60 shadow-inner">
                  <div className="flex items-center justify-center gap-6 mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👦🛵👩</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Mẹ chở bé về</span>
                    </div>
                    <span className="text-3xl">👋</span>
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👨‍🦰🚪</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Bố ra mở cổng</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-sky-950 bg-white/90 px-3 py-1 rounded-full shadow-2xs">
                    "Con chào bố, con mới đi học về ạ!"
                  </p>
                </div>

                <button
                  onClick={() => handleSpeak('Tranh hai: Khi được mẹ chở đi học về tới cổng nhà, bạn nhỏ bước xuống xe, khoanh hai tay lễ phép chào bố: Con chào bố, con mới đi học về ạ! Bố tươi cười mở cổng đón con.')}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nghe lời chào bố khi đi học về</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy thực hành lời chào hỏi lễ phép!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    "Lời chào cao hơn mâm cỗ" - Luôn lễ phép chào hỏi người lớn sẽ được mọi người yêu quý!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé thật là một em bé ngoan và lễ phép! Biết chào hỏi khách đến nhà và chào người thân khi đi học về!');
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
                    <span>Luyện chào hỏi cùng cô giáo</span>
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

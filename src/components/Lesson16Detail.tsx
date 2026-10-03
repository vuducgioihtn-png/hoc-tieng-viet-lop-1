import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson16DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson16Detail: React.FC<Lesson16DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page44' | 'page45'>('page44');
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
      {/* Page Tabs Header: Trang 44 & Trang 45 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page44')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page44'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 44: Nhận biết, Đọc & Viết M m, N n</span>
          </button>
          <button
            onClick={() => setActiveTab('page45')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page45'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🚤 Trang 45: Đọc "Bố mẹ cho Hà đi ca nô." & Nói "Giới thiệu"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 16! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page44' ? (
        /* =========================================================================
           TRANG 44: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 16: M m   N n */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">16</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>M m</span>
                  <span className="text-emerald-200">N n</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười sáu: M in hoa, m in thường, N in hoa, n in thường. Âm mờ, âm nờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm M m, N n</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Mẹ mua nơ cho Hà.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Mẹ mua nơ cho Hà.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Mother buying pretty red ribbon for Ha in boutique shop */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩‍👧🎀</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-rose-300">
                      Mẹ cài nơ đỏ cho Hà
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🪞✨</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-amber-300">
                      Hà vui tươi soi gương
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🏬🛍️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Cửa hàng phụ kiện
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🎀 Chiếc nơ đỏ thắm cài tóc xinh xắn</span>
                  <span>👩 Mẹ âu yếm chăm sóc con gái</span>
                  <span>👧 Bé Hà ngoan ngoãn và rạng rỡ</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Mẹ mua nơ cho Hà." with red M, m, n */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">M, m, n</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('mờ - e - me - nặng - mẹ. mẹ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">M</span>ẹ
                  </button>
                  <button
                    onClick={() => handleSpeak('mua')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">m</span>ua
                  </button>
                  <button
                    onClick={() => handleSpeak('nờ - ơ - nơ. nơ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">n</span>ơ
                  </button>
                  <button
                    onClick={() => handleSpeak('cho')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    cho
                  </button>
                  <button
                    onClick={() => handleSpeak('Hà')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Hà.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 44) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm mờ và âm nờ. Âm mờ: mờ - e - me - nặng - mẹ. mẹ. Âm nờ: nờ - ơ - nơ. nơ. má, mẹ, mỡ, na, nề, nở. cá mè, lá me, nơ đỏ, ca nô.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'm' and 'n' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'm' & TIẾNG 'mẹ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'm' in red */}
                <button
                  onClick={() => handleSpeak('mờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm mờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    m
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm mờ
                  </span>
                </button>

                {/* Ô trên: [ m | e ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('mờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm mờ"
                  >
                    m
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ mẹ ] */}
                <button
                  onClick={() => handleSpeak('mờ - e - me - nặng - mẹ. mẹ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: mờ - e - me - nặng - mẹ. mẹ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">m</span>
                    <span className="text-slate-900">ẹ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('mờ - e - me - nặng - mẹ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  mờ - e - me - nặng - mẹ
                </button>
              </div>

              {/* CỘT 2: ÂM 'n' & TIẾNG 'nơ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'n' in red */}
                <button
                  onClick={() => handleSpeak('nờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm nờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    n
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm nờ
                  </span>
                </button>

                {/* Ô trên: [ n | ơ ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('nờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm nờ"
                  >
                    n
                  </button>
                  <button
                    onClick={() => handleSpeak('ơ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ơ"
                  >
                    ơ
                  </button>
                </div>

                {/* Ô dưới: [ nơ ] */}
                <button
                  onClick={() => handleSpeak('nờ - ơ - nơ. nơ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: nờ - ơ - nơ. nơ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">n</span>
                    <span className="text-slate-900">ơ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('nờ - ơ - nơ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  nờ - ơ - nơ
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 44: má mẹ mỡ - na nề nở */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('má')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">má</button>
                  <button onClick={() => handleSpeak('mẹ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">mẹ</button>
                  <button onClick={() => handleSpeak('mỡ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">mỡ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('na')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">na</button>
                  <button onClick={() => handleSpeak('nề')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nề</button>
                  <button onClick={() => handleSpeak('nở')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nở</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 44: "cá mè", "lá me", "nơ đỏ", "ca nô" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Con cá mè -> 'cá mè' */}
              <button
                onClick={() => handleSpeak('cá mè')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🐟✨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">cá mè</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cá mè vảy ánh bạc</span>
              </button>

              {/* Image 2: Cành lá me -> 'lá me' */}
              <button
                onClick={() => handleSpeak('lá me')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🌿🍃
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">lá me</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cành lá me chua thanh</span>
              </button>

              {/* Image 3: Chiếc nơ đỏ -> 'nơ đỏ' */}
              <button
                onClick={() => handleSpeak('nơ đỏ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🎀❤️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">nơ đỏ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Nơ đỏ cài tóc xinh</span>
              </button>

              {/* Image 4: Chiếc ca nô -> 'ca nô' */}
              <button
                onClick={() => handleSpeak('ca nô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🚤🌊
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">ca nô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Ca nô rẽ sóng lướt nhanh</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 44)
              Dải kẻ 5 ô ly chuẩn: m (chấm), m (liền), n (chấm), n (liền), cá mè, nơ đỏ
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
                  onClick={() => handleSpeak('Cách viết chữ m: Viết nét móc xuôi thứ nhất rộng 1 ô ly, cao 2 ô ly từ đường kẻ 2 lên đường kẻ 3 rồi kéo xuống đường kẻ 1. Viết tiếp nét móc xuôi thứ hai rộng 1.5 ô ly, cao 2 ô ly. Cuối cùng viết nét móc hai đầu rộng 1.5 ô ly, dừng bút ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ m"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ m</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ n: Viết nét móc xuôi thứ nhất rộng 1 ô ly, cao 2 ô ly từ đường kẻ 2 lên đường kẻ 3 rồi kéo xuống đường kẻ 1. Sau đó viết tiếp nét móc hai đầu rộng 1.5 ô ly, dừng bút ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ n"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ n</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ cá mè và nơ đỏ: Cụm từ cá mè: chữ c nối sang a có dấu sắc, cách 1 ô ly viết chữ m nối sang e có dấu huyền. Cụm từ nơ đỏ: chữ n nối sang ơ có râu, cách 1 ô ly viết chữ đ cao 4 ô ly nối sang o có dấu hỏi.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết cá mè, nơ đỏ"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết cá mè, nơ đỏ</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">m n</span>
                  <span>Chữ m và Chữ n (Cả hai đều cao 2 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ m:</strong> Gồm 2 nét móc xuôi + 1 nét móc hai đầu dừng ở ĐK 2 (rộng 5 ô ly nhỏ).<br />
                  <strong>Chữ n:</strong> Gồm 1 nét móc xuôi + 1 nét móc hai đầu dừng ở ĐK 2 (rộng 3.5 ô ly nhỏ).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">cá mè nơ đỏ</span>
                  <span>Cụm từ "cá mè" và "nơ đỏ"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>cá mè:</strong> Tiếng cá (c nối a + dấu sắc), cách 1 ô ly viết tiếng mè (m nối e + dấu huyền).<br />
                  <strong>nơ đỏ:</strong> Tiếng nơ (n nối ơ), cách 1 ô ly viết tiếng đỏ (đ cao 4 ô ly nối o + dấu hỏi).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 44 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 44: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page44" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page44)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 5 (đỉnh chữ đ cao 4 ô ly): y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ m, n, c, a, e, ơ, o - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm bắt đầu nét hất và điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'm' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét móc xuôi 1 + nét móc xuôi 2 + nét móc hai đầu cao 2 ô ly
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét móc xuôi 1 */}
                    <path
                      d="M 12 78 C 15 70, 20 68, 24 68 L 24 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Nét móc xuôi 2 */}
                    <path
                      d="M 24 88 C 28 72, 36 68, 41 68 L 41 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Nét móc hai đầu */}
                    <path
                      d="M 41 88 C 45 72, 53 68, 58 68 L 58 104 C 58 112, 62 112, 66 112 C 69 112, 71 104, 72 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'm' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 80 78 C 83 70, 88 68, 92 68 L 92 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 92 88 C 96 72, 104 68, 109 68 L 109 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 109 88 C 113 72, 121 68, 126 68 L 126 104 C 126 112, 130 112, 134 112 C 137 112, 139 104, 140 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CHỮ 'n' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Nét móc xuôi 1 + nét móc hai đầu cao 2 ô ly
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 148 78 C 151 70, 156 68, 160 68 L 160 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 160 88 C 164 72, 172 68, 177 68 L 177 104 C 177 112, 181 112, 185 112 C 188 112, 190 104, 191 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. CHỮ 'n' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 200 78 C 203 70, 208 68, 212 68 L 212 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 212 88 C 216 72, 224 68, 229 68 L 229 104 C 229 112, 233 112, 237 112 C 240 112, 242 104, 243 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      5. CỤM TỪ 'cá mè' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng cá: c nối a + dấu sắc /
                      Tiếng mè: m nối e + dấu huyền \
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG CÁ */}
                    <path
                      d="M 268 76 C 264 70, 255 70, 250 77 C 245 84, 245 96, 250 103 C 255 110, 264 110, 269 104 C 271 101, 273 96, 273 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 294 74 C 288 68, 278 68, 272 76 C 266 84, 266 96, 272 104 C 278 112, 288 112, 294 104 C 298 96, 298 82, 294 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 294 68 L 294 104 C 294 112, 298 112, 305 112 C 310 112, 314 104, 316 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 288 54 L 282 60"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG MÈ: chữ m nối e + dấu huyền */}
                    <path
                      d="M 334 78 C 337 70, 342 68, 346 68 L 346 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 346 88 C 350 72, 358 68, 363 68 L 363 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 363 88 C 367 72, 375 68, 380 68 L 380 104 C 380 112, 384 112, 388 112 C 391 112, 393 104, 394 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ e nối từ m */}
                    <path
                      d="M 394 90 C 399 82, 406 78, 411 79 C 417 80, 416 92, 407 102 C 398 112, 400 122, 410 122 C 416 122, 421 116, 424 108"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 403 60 L 411 66"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      6. CỤM TỪ 'nơ đỏ' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng nơ: n nối ơ (có râu)
                      Tiếng đỏ: đ (cao 4 ô ly) nối o + dấu hỏi ?
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG NƠ */}
                    <path
                      d="M 444 78 C 447 70, 452 68, 456 68 L 456 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 456 88 C 460 72, 468 68, 473 68 L 473 104 C 473 112, 477 112, 481 112 C 484 112, 486 104, 487 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ơ nối từ n */}
                    <path
                      d="M 508 74 C 502 68, 492 68, 486 76 C 480 84, 480 96, 486 104 C 492 112, 502 112, 508 104 C 512 96, 512 82, 508 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét râu chữ ơ */}
                    <path
                      d="M 508 74 C 510 71, 513 72, 513 75 C 513 78, 510 80, 509 80"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG ĐỎ: chữ đ cao 4 ô ly nối o + dấu hỏi */}
                    {/* Nét cong kín chữ đ */}
                    <path
                      d="M 538 74 C 532 68, 522 68, 516 76 C 510 84, 510 96, 516 104 C 522 112, 532 112, 538 104 C 542 96, 542 82, 538 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc ngược chữ đ cao 4 ô ly (từ y=24) */}
                    <path
                      d="M 538 24 L 538 104 C 538 112, 542 112, 549 112 C 554 112, 558 104, 560 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét ngang chữ đ ở đường kẻ 4 (y=46) */}
                    <path
                      d="M 531 46 L 545 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Chữ o nối từ đ */}
                    <path
                      d="M 580 74 C 574 68, 564 68, 558 76 C 552 84, 552 96, 558 104 C 564 112, 574 112, 580 104 C 584 96, 584 82, 580 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu hỏi ? trên đầu o */}
                    <path
                      d="M 567 52 C 567 49, 570 48, 572 48 C 574 48, 576 49, 576 52 C 576 55, 572 57, 571 59 L 571 60"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
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
        </div>
      ) : (
        /* =========================================================================
           TRANG 45: MỤC 4 (ĐỌC CÂU "Bố mẹ cho Hà đi ca nô.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "GIỚI THIỆU")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bố mẹ cho Hà đi ca nô.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bố mẹ cho Hà đi ca nô.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bố mẹ cho Hà đi ca nô."</span>
              </button>
            </div>

            {/* Speedboat scene on cool lake matching textbook Page 45 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-teal-50 to-blue-100 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Family on speedboat */}
                  <div className="flex flex-col items-center">
                    <span className="text-8xl drop-shadow-md animate-bounce-slow">🚤🌊</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Ca nô lướt sóng trắng xóa
                    </span>
                  </div>

                  {/* Family members wearing life jackets */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👨‍👩‍👧‍👦🦺</span>
                    <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[11px] font-bold mt-1 shadow-xs">
                      Cả nhà mặc áo phao an toàn
                    </span>
                  </div>

                  {/* Clear sky and splashing water */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🌤️💦</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-teal-300">
                      Biển hồ gió mát trong lành
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Bố mẹ cho Hà đi ca nô." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bố')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bố
                    </button>
                    <button
                      onClick={() => handleSpeak('mẹ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      mẹ
                    </button>
                    <button
                      onClick={() => handleSpeak('cho')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      cho
                    </button>
                    <button
                      onClick={() => handleSpeak('Hà')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Hà
                    </button>
                    <button
                      onClick={() => handleSpeak('đi')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      đi
                    </button>
                    <button
                      onClick={() => handleSpeak('ca')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      ca
                    </button>
                    <button
                      onClick={() => handleSpeak('nô')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      nô.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Được đi ca nô lướt sóng cùng bố mẹ, bé Hà vô cùng thích thú và hào hứng ngắm cảnh đẹp quê hương!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: GIỚI THIỆU - KHI BỊ LẠC NHỜ CHÚ CÔNG AN GIÚP ĐỠ) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Giới thiệu (Tự bảo vệ bản thân khi bị lạc)
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Giới thiệu. Trong khu vui chơi công viên, một bạn nhỏ bị lạc người thân đã bình tĩnh tìm đến nhờ chú công an giúp đỡ. Chú công an ân cần hỏi: Cháu tên là gì? Cháu mấy tuổi? Nhà cháu ở đâu và số điện thoại của bố mẹ là gì? Bạn nhỏ đã tự tin, lễ phép giới thiệu rõ ràng thông tin của mình để chú công an liên hệ với gia đình.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý tình huống</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Kỹ năng sống thiết yếu:</strong> Khi chẳng may bị lạc ở nơi đông người (công viên, siêu thị, bến xe), bé hãy đứng yên hoặc tìm đến các chú công an, bảo vệ. Bé cần ghi nhớ những thông tin nào để giới thiệu bản thân giúp tìm lại người thân?
            </p>

            {/* Police and Lost Child Dialogue Scene matching Textbook Page 45 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kỹ năng giới thiệu bản thân khi bị lạc</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Khu vui chơi công viên có đu quay, cầu trượt</span>
              </div>

              {/* Park Visualization */}
              <div className="h-48 rounded-2xl bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 flex flex-col items-center justify-center p-4 text-center border border-amber-200/60 shadow-inner">
                <div className="flex items-center justify-center gap-8 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👮‍♂️🤝</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Chú công an ân cần hỏi han</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👦🎒</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Bé bình tĩnh, lễ phép</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">🎡🎠</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Vòng đu quay công viên</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-slate-900 bg-white/90 px-4 py-1 rounded-full shadow-2xs">
                  "Cháu chào chú công an ạ! Cháu tên là Nguyễn Văn An, năm nay 6 tuổi. Mẹ cháu tên là Lan, số điện thoại của mẹ cháu là..."
                </p>
              </div>

              {/* Practice dialogues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleSpeak('Chú công an hỏi: Cháu ngoan, cháu tên là gì? Cháu đi cùng ai và có nhớ số điện thoại của bố mẹ không? Đừng sợ, chú sẽ giúp cháu tìm lại gia đình!')}
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Lời hỏi han của chú công an</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  onClick={() => handleSpeak('Bé trả lời: Dạ thưa chú, cháu tên là An, sáu tuổi ạ. Cháu đi chơi cùng mẹ nhưng bị lạc. Mẹ cháu mặc áo xanh, số điện thoại của mẹ cháu là không chín một hai... ạ!')}
                  className="p-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Lời giới thiệu lễ phép của bé</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy thực hành giới thiệu đầy đủ thông tin của bản thân nhé!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bé đọc to: Họ và tên của bé, tuổi, tên của bố/mẹ và số điện thoại liên lạc của gia đình!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé trả lời rất to, rõ ràng và lễ phép! Bé đã ghi nhớ thông tin bản thân rất giỏi!');
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
                    <span>Thực hành kỹ năng nói</span>
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

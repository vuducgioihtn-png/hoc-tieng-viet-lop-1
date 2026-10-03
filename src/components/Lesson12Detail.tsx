import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson12DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson12Detail: React.FC<Lesson12DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page36' | 'page37'>('page36');
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
      {/* Page Tabs Header: Trang 36 & Trang 37 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page36')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page36'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 36: Nhận biết, Đọc & Viết H h, L l</span>
          </button>
          <button
            onClick={() => setActiveTab('page37')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page37'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🌿 Trang 37: Đọc "Bé bị ho. Bà đã có lá hẹ." & Nói "Cây cối"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 12! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page36' ? (
        /* =========================================================================
           TRANG 36: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 12: H h   L l */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">12</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>H h</span>
                  <span className="text-emerald-200">L l</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười hai: H in hoa, h in thường, L in hoa, l in thường. Âm hờ, âm lờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm H h, L l</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Le le bơi trên hồ.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Le le bơi trên hồ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Lake with teal water, brown le le birds swimming, blossoming white tree */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-teal-50 to-emerald-100 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md animate-bounce-slow">🦆🦆</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Đàn chim le le bơi lội
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🏞️💧</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Mặt hồ nước trong xanh
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🌸🌳</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Cây hoa trắng rợp bóng
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🏞️ Hồ nước chân núi thanh bình</span>
                  <span>🦆 Chim le le lặn ngụp kiếm mồi</span>
                  <span>🌸 Cây nở hoa trắng muốt ven bờ</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Le le bơi trên hồ." with red L, l, h */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">L, l, h</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Le')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">L</span>e
                  </button>
                  <button
                    onClick={() => handleSpeak('le')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">l</span>e
                  </button>
                  <button
                    onClick={() => handleSpeak('bơi')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    bơi
                  </button>
                  <button
                    onClick={() => handleSpeak('trên')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    trên
                  </button>
                  <button
                    onClick={() => handleSpeak('hờ - ô - hô - huyền - hồ. hồ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">h</span>ồ.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 36) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm hờ và âm lờ. Âm hờ: hờ - ô - hô - huyền - hồ. hồ. Âm lờ: lờ - e - le. le. hé, ho, hổ, li, lọ, lỡ. lá đỏ, bờ hồ, cá hố, le le.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'h' and 'l' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'h' & TIẾNG 'hồ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'h' in red */}
                <button
                  onClick={() => handleSpeak('hờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm hờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    h
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm hờ
                  </span>
                </button>

                {/* Ô trên: [ h | ô ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('hờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm hờ"
                  >
                    h
                  </button>
                  <button
                    onClick={() => handleSpeak('ô')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ô"
                  >
                    ô
                  </button>
                </div>

                {/* Ô dưới: [ hồ ] */}
                <button
                  onClick={() => handleSpeak('hờ - ô - hô - huyền - hồ. hồ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: hờ - ô - hô - huyền - hồ. hồ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">h</span>
                    <span className="text-slate-900">ồ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('hờ - ô - hô - huyền - hồ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  hờ - ô - hô - huyền - hồ
                </button>
              </div>

              {/* CỘT 2: ÂM 'l' & TIẾNG 'le' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'l' in red */}
                <button
                  onClick={() => handleSpeak('lờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm lờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    l
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm lờ
                  </span>
                </button>

                {/* Ô trên: [ l | e ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('lờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm lờ"
                  >
                    l
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ le ] */}
                <button
                  onClick={() => handleSpeak('lờ - e - le. le.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: lờ - e - le. le."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">l</span>
                    <span className="text-slate-900">e</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('lờ - e - le.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  lờ - e - le
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 36: hé ho hổ - li lọ lỡ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('hé')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">hé</button>
                  <button onClick={() => handleSpeak('ho')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ho</button>
                  <button onClick={() => handleSpeak('hổ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">hổ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('li')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">li</button>
                  <button onClick={() => handleSpeak('lọ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">lọ</button>
                  <button onClick={() => handleSpeak('lỡ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">lỡ</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 36: "lá đỏ", "bờ hồ", "cá hố", "le le" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Chiếc lá đỏ -> 'lá đỏ' */}
              <button
                onClick={() => handleSpeak('lá đỏ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🍁🍂
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">lá đỏ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Chiếc lá đỏ mùa thu</span>
              </button>

              {/* Image 2: Bờ hồ công viên -> 'bờ hồ' */}
              <button
                onClick={() => handleSpeak('bờ hồ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🏞️🌳
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">bờ hồ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Bờ hồ râm mát</span>
              </button>

              {/* Image 3: Con cá hố -> 'cá hố' */}
              <button
                onClick={() => handleSpeak('cá hố')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🐟✨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">cá hố</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cá hố lấp lánh bạc</span>
              </button>

              {/* Image 4: Con chim le le -> 'le le' */}
              <button
                onClick={() => handleSpeak('le le')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🦆🌊
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">le le</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Chim le le bơi lội</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 36)
              Dải kẻ 5 ô ly chuẩn: h (chấm), h (liền), l (chấm), l (liền), hồ, le le
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
                  onClick={() => handleSpeak('Cách viết chữ h: Viết nét khuyết trên cao 5 ô ly từ đường kẻ 2 lên đường kẻ 6 rồi kéo thẳng xuống đường kẻ 1. Sau đó lia bút lên viết nét móc hai đầu cao 2 ô ly từ đường kẻ 2 uốn lên đường kẻ 3 rồi móc xuống dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ h"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ h</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ l: Viết nét khuyết trên kết hợp nét móc ngược phải cao 5 ô ly từ đường kẻ 2 uốn lên đường kẻ 6 rồi kéo thẳng xuống đường kẻ 1, lượn cong móc lên dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ l"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ l</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết tiếng hồ và từ le le: Tiếng hồ: chữ h cao 5 ô ly nối sang ô cao 2 ô ly, dấu huyền trên đầu ô. Từ le le: chữ l cao 5 ô ly nối sang e cao 2 ô ly, cách một ô ly viết tiếp tiếng le.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết hồ, le le"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết hồ, le le</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">h l</span>
                  <span>Chữ h và Chữ l (Cả hai đều cao 5 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ h:</strong> Nét khuyết trên cao 5 ô ly (ĐK 2 lên ĐK 6 rồi kéo xuống ĐK 1) + Nét móc hai đầu cao 2 ô ly dừng ở ĐK 2.<br />
                  <strong>Chữ l:</strong> Nét khuyết trên kết hợp nét móc ngược phải cao 5 ô ly dừng ở ĐK 2.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">hồ le le</span>
                  <span>Tiếng "hồ" và từ "le le"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Tiếng hồ:</strong> Chữ h cao 5 ô ly nối liền chạm mép trái chữ ô cao 2 ô ly + dấu mũ ^ và dấu huyền \ trên đầu ô.<br />
                  <strong>Từ le le:</strong> Chữ l cao 5 ô ly nối liền sang chữ e cao 2 ô ly. Cách 1 ô ly, viết tiếp tiếng le.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 36 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 36: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page36" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page36)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ h, l cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh nét móc hai đầu chữ h, chữ ô, chữ e - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm bắt đầu nét hất và điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'h' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét khuyết trên cao 5 ô ly + nét móc hai đầu cao 2 ô ly
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét khuyết trên */}
                    <path
                      d="M 12 90 L 22 68 C 28 54, 37 32, 37 18 C 37 7, 33 3, 28 3 C 24 3, 22 6, 22 12 L 22 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc hai đầu cao 2 ô ly */}
                    <path
                      d="M 22 92 C 26 76, 32 68, 39 68 C 45 68, 47 76, 47 88 L 47 104 C 47 112, 51 112, 55 112 C 58 112, 60 104, 61 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'h' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét khuyết trên */}
                    <path
                      d="M 72 90 L 82 68 C 88 54, 97 32, 97 18 C 97 7, 93 3, 88 3 C 84 3, 82 6, 82 12 L 82 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc hai đầu cao 2 ô ly */}
                    <path
                      d="M 82 92 C 86 76, 92 68, 99 68 C 105 68, 107 76, 107 88 L 107 104 C 107 112, 111 112, 115 112 C 118 112, 120 104, 121 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CHỮ 'l' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Nét khuyết trên kết hợp nét móc ngược phải cao 5 ô ly
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 132 90 L 143 68 C 149 54, 158 32, 158 18 C 158 7, 154 3, 149 3 C 145 3, 143 6, 143 12 L 143 104 C 143 112, 147 112, 151 112 C 154 112, 156 104, 157 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. CHỮ 'l' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 178 90 L 189 68 C 195 54, 204 32, 204 18 C 204 7, 200 3, 195 3 C 191 3, 189 6, 189 12 L 189 104 C 189 112, 193 112, 197 112 C 200 112, 202 104, 203 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      5. TIẾNG 'hồ' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ h */}
                    <path
                      d="M 224 90 L 235 68 C 241 54, 250 32, 250 18 C 250 7, 246 3, 241 3 C 237 3, 235 6, 235 12 L 235 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 235 92 C 239 76, 245 68, 252 68 C 258 68, 260 76, 260 88 L 260 104 C 260 112, 264 112, 268 112 C 271 112, 273 104, 274 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ô */}
                    <path
                      d="M 296 74 C 290 68, 280 68, 274 76 C 268 84, 268 96, 274 104 C 280 112, 290 112, 296 104 C 300 96, 300 82, 296 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ */}
                    <path
                      d="M 280 64 L 285 56 L 290 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu huyền \ */}
                    <path
                      d="M 276 50 L 283 56"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      6. CỤM TỪ 'le le' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG LE THỨ 1: Chữ l cao 5 ô ly */}
                    <path
                      d="M 320 90 L 331 68 C 337 54, 346 32, 346 18 C 346 7, 342 3, 337 3 C 333 3, 331 6, 331 12 L 331 104 C 331 112, 335 112, 339 112 C 342 112, 344 104, 345 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ e nối từ l */}
                    <path
                      d="M 345 90 C 350 82, 357 78, 362 79 C 368 80, 367 92, 358 102 C 349 112, 351 122, 361 122 C 367 122, 372 116, 375 108"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG LE THỨ 2: Chữ l cao 5 ô ly */}
                    <path
                      d="M 390 90 L 401 68 C 407 54, 416 32, 416 18 C 416 7, 412 3, 407 3 C 403 3, 401 6, 401 12 L 401 104 C 401 112, 405 112, 409 112 C 412 112, 414 104, 415 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ e nối từ l */}
                    <path
                      d="M 415 90 C 420 82, 427 78, 432 79 C 438 80, 437 92, 428 102 C 419 112, 421 122, 431 122 C 437 122, 442 116, 445 108"
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
        </div>
      ) : (
        /* =========================================================================
           TRANG 37: MỤC 4 (ĐỌC CÂU "Bé bị ho. Bà đã có lá hẹ.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "CÂY CỐI")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bé bị ho. Bà đã có lá hẹ.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bé bị ho. Bà đã có lá hẹ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bé bị ho. Bà đã có lá hẹ."</span>
              </button>
            </div>

            {/* Mother holding coughing baby in cozy wooden house, grandma preparing chive leaves matching textbook Page 37 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Mother holding coughing baby */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩‍👧👶</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-rose-300">
                      Mẹ âu yếm bế bé bị ho
                    </span>
                  </div>

                  {/* Green hammock */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🪴🧺</span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold mt-1 shadow-xs">
                      Rổ lá hẹ xanh tươi
                    </span>
                  </div>

                  {/* Grandma preparing chives */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👵🌿</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bà chuẩn bị lá hẹ chữa ho
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Bé bị ho. Bà đã có lá hẹ." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bé')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bé
                    </button>
                    <button
                      onClick={() => handleSpeak('bị')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      bị
                    </button>
                    <button
                      onClick={() => handleSpeak('ho')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      ho.
                    </button>
                    <button
                      onClick={() => handleSpeak('Bà')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bà
                    </button>
                    <button
                      onClick={() => handleSpeak('đã')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      đã
                    </button>
                    <button
                      onClick={() => handleSpeak('có')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      có
                    </button>
                    <button
                      onClick={() => handleSpeak('lá')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      lá
                    </button>
                    <button
                      onClick={() => handleSpeak('hẹ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      hẹ.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bà rất yêu thương cháu, khi bé bị ho húng hắng, bà liền hái lá hẹ tươi hấp đường phèn cho bé uống khỏi ho!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: CÂY CỐI) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Nói</h3>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                    Chủ đề: Cây cối
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Cây cối. Trong khu vườn quê có cây ớt chín đỏ trĩu cành, cây bưởi sum suê quả vàng, giàn bầu xanh mát lúc lỉu quả, và dưới gốc gỗ mục mọc những cây nấm xinh xắn. Cây cối cho ta bóng mát, hoa thơm, quả ngọt và rau sạch!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh khu vườn thôn quê: Bức tranh vẽ những loại cây nào? Cây nào cho quả chín đỏ? Cây nào cho quả vàng ngọt mát? Giàn leo có những quả gì?
            </p>

            {/* Garden Flora Grid matching Textbook Page 37 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
              {/* CÂY 1: CÂY ỚT VÀ CÂY ĂN QUẢ */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Cây ớt đỏ cạnh bờ tường
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-rose-100 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-rose-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🌶️🌿</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Cây ớt trĩu quả chín đỏ rực
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Cây ớt là cây gia vị. Ớt khi chín có màu đỏ tươi rất đẹp, quả có vị cay nồng dùng để làm gia vị trong các bữa ăn hàng ngày!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-xs font-bold text-rose-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu cây ớt</span>
                  <Volume2 className="w-4 h-4 text-rose-600" />
                </button>
              </div>

              {/* CÂY 2: CÂY BƯỞI QUẢ VÀNG */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Cây bưởi trĩu quả
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-amber-100 to-emerald-50 flex flex-col items-center justify-center p-3 text-center border border-amber-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🍈🌳</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Cây bưởi lúc lỉu quả vàng ngọt
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Cây bưởi là cây ăn quả thân gỗ. Quả bưởi tròn to mọng nước, ăn ngọt mát và cung cấp rất nhiều vitamin C tốt cho sức khỏe!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu cây bưởi</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>

              {/* CÂY 3: GIÀN BẦU MƯỚP */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Giàn bầu xanh mát
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-emerald-100 to-teal-50 flex flex-col items-center justify-center p-3 text-center border border-emerald-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🥒🎋</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Giàn tre sai trĩu quả bầu non
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Giàn bầu, giàn mướp là cây thân leo. Quả bầu non nấu canh với tôm tép rất ngọt và mát trong những ngày hè oi ả!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu giàn bầu mướp</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy kể về loài cây bé yêu thích nhất!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Vườn nhà bé hay trường học trồng những loại cây nào? Bé chăm sóc và tưới cây như thế nào?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé kể về cây cối rất hay! Cây cối mang lại không khí trong lành, chúng mình hãy luôn yêu quý và chăm sóc cây xanh nhé!');
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
                    <span>Luyện nói về cây cối</span>
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

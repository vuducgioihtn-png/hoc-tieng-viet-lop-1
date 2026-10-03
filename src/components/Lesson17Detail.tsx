import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, Heart } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson17DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson17Detail: React.FC<Lesson17DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page46' | 'page47'>('page46');
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
      {/* Page Tabs Header: Trang 46 & Trang 47 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page46')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page46'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 46: Nhận biết, Đọc & Viết G g, Gi gi</span>
          </button>
          <button
            onClick={() => setActiveTab('page47')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page47'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🐔 Trang 47: Đọc "Bà che gió cho ba chú gà." & Nói "Vật nuôi"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 17! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page46' ? (
        /* =========================================================================
           TRANG 46: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 17: G g   Gi gi */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">17</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và chữ ghép
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>G g</span>
                  <span className="text-emerald-200">Gi gi</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười bảy: G in hoa, g in thường, Gi in hoa, gi in thường. Âm gờ, âm giờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm G g, Gi gi</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Hà có giỏ trứng gà.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Hà có giỏ trứng gà.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Ha placing basket of fresh eggs in clean modern kitchen */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-teal-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👧🧺</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bé Hà bưng giỏ trứng
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🥚✨</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Những quả trứng gà tươi
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🍳🍽️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Gian bếp sạch sẽ
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🧺 Giỏ mây đầy ắp trứng gà trắng tròn</span>
                  <span>👧 Bé Hà ngoan ngoãn giúp đỡ mẹ</span>
                  <span>🍳 Gian bếp gia đình ấm áp, tiện nghi</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Hà có giỏ trứng gà." with red gi, g */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">gi, g</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Hà')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Hà
                  </button>
                  <button
                    onClick={() => handleSpeak('có')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    có
                  </button>
                  <button
                    onClick={() => handleSpeak('giờ - o - gio - hỏi - giỏ. giỏ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">gi</span>ỏ
                  </button>
                  <button
                    onClick={() => handleSpeak('trứng')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    trứng
                  </button>
                  <button
                    onClick={() => handleSpeak('gờ - a - ga - huyền - gà. gà.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">g</span>à.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 46) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm gờ và âm giờ. Âm gờ: gờ - a - ga - huyền - gà. gà. Âm giờ: giờ - o - gio - hỏi - giỏ. giỏ. ga, gỗ, gụ, giá, giò, giỗ. gà gô, đồ gỗ, giá đỗ, cụ già.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'g' and 'gi' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'g' & TIẾNG 'gà' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'g' in red */}
                <button
                  onClick={() => handleSpeak('gờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm gờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    g
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm gờ
                  </span>
                </button>

                {/* Ô trên: [ g | a ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('gờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm gờ"
                  >
                    g
                  </button>
                  <button
                    onClick={() => handleSpeak('a')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm a"
                  >
                    a
                  </button>
                </div>

                {/* Ô dưới: [ gà ] */}
                <button
                  onClick={() => handleSpeak('gờ - a - ga - huyền - gà. gà.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: gờ - a - ga - huyền - gà. gà."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">g</span>
                    <span className="text-slate-900">à</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('gờ - a - ga - huyền - gà.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  gờ - a - ga - huyền - gà
                </button>
              </div>

              {/* CỘT 2: ÂM 'gi' & TIẾNG 'giỏ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'gi' in red */}
                <button
                  onClick={() => handleSpeak('giờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm giờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    gi
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm giờ
                  </span>
                </button>

                {/* Ô trên: [ gi | o ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('giờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm giờ"
                  >
                    gi
                  </button>
                  <button
                    onClick={() => handleSpeak('o')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm o"
                  >
                    o
                  </button>
                </div>

                {/* Ô dưới: [ giỏ ] */}
                <button
                  onClick={() => handleSpeak('giờ - o - gio - hỏi - giỏ. giỏ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: giờ - o - gio - hỏi - giỏ. giỏ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">gi</span>
                    <span className="text-slate-900">ỏ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('giờ - o - gio - hỏi - giỏ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  giờ - o - gio - hỏi - giỏ
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 46: ga gỗ gụ - giá giò giỗ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('ga')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ga</button>
                  <button onClick={() => handleSpeak('gỗ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">gỗ</button>
                  <button onClick={() => handleSpeak('gụ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">gụ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('giá')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">giá</button>
                  <button onClick={() => handleSpeak('giò')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">giò</button>
                  <button onClick={() => handleSpeak('giỗ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">giỗ</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 46: "gà gô", "đồ gỗ", "giá đỗ", "cụ già" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Con gà gô -> 'gà gô' */}
              <button
                onClick={() => handleSpeak('gà gô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🦃🪶
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">gà gô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Gà gô lông hoa đẹp</span>
              </button>

              {/* Image 2: Bàn ghế đồ gỗ -> 'đồ gỗ' */}
              <button
                onClick={() => handleSpeak('đồ gỗ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-orange-50 border-2 border-slate-200 hover:border-orange-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🪵🪑
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">đồ gỗ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-orange-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Bàn ghế gỗ thơm</span>
              </button>

              {/* Image 3: Đĩa giá đỗ -> 'giá đỗ' */}
              <button
                onClick={() => handleSpeak('giá đỗ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🌱🥣
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">giá đỗ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Giá đỗ giòn thanh mát</span>
              </button>

              {/* Image 4: Cụ già phúc hậu -> 'cụ già' */}
              <button
                onClick={() => handleSpeak('cụ già')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    👴🦯
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">cụ già</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cụ già tóc bạc hiền từ</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 46)
              Dải kẻ 5 ô ly chuẩn: g (chấm), g (liền), gi (chấm), gi (liền), gà gô, giá đỗ
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
                  onClick={() => handleSpeak('Cách viết chữ g: Viết nét cong kín cao 2 ô ly từ đường kẻ 3 xuống đường kẻ 1. Sau đó lia bút lên đường kẻ 3 viết nét khuyết dưới kéo thẳng qua đường kẻ 1 xuống dưới 3 ô ly, uốn cong sang trái rồi hất chéo lên cắt đường kẻ 1, dừng ở đường kẻ 2. Toàn bộ chữ g cao 5 ô ly (2 ô ly trên và 3 ô ly dưới).')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ g"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ g</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ gi: Viết chữ g dừng ở đường kẻ 2, sau đó nối liền sang nét hất của chữ i cao 2 ô ly, dừng ở đường kẻ 2 và thêm dấu chấm trên đầu chữ i.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ gi"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ gi</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ gà gô và giá đỗ: Cụm từ gà gô: viết chữ g nối sang a có dấu huyền, cách 1 ô ly viết chữ g nối sang ô có dấu mũ. Cụm từ giá đỗ: viết chữ gi nối sang a có dấu sắc, cách 1 ô ly viết chữ đ cao 4 ô ly nối sang ô có dấu ngã.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết gà gô, giá đỗ"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết gà gô, giá đỗ</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">g gi</span>
                  <span>Chữ g và Chữ gi (Chữ g cao 5 ô ly: 2 trên, 3 dưới)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ g:</strong> Nét cong kín (cao 2 ô ly) + Nét khuyết dưới kéo sâu dưới baseline 3 ô ly dừng ở ĐK 2.<br />
                  <strong>Chữ gi:</strong> Chữ g dừng ở ĐK 2 nối liền sang chữ i cao 2 ô ly.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">gà gô giá đỗ</span>
                  <span>Cụm từ "gà gô" và "giá đỗ"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>gà gô:</strong> Tiếng gà (g nối a + dấu huyền), cách 1 ô ly viết tiếng gô (g nối ô + dấu mũ).<br />
                  <strong>giá đỗ:</strong> Tiếng giá (gi nối a + dấu sắc), cách 1 ô ly viết tiếng đỗ (đ cao 4 ô ly nối ô + dấu ngã).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 46 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 46: 5 ô ly (2 ô ly trên baseline, 3 ô ly dưới baseline cho nét khuyết dưới của g) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page46" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page46)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 5 (đỉnh chữ đ cao 4 ô ly so với baseline y=46): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh nét cong kín chữ g, a, ô, đỗ - cao 2 ô ly): y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 1 (Baseline - đường kẻ đậm ở giữa): y = 46 */}
                  <line x1="0" y1="46" x2="100%" y2="46" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Đường kẻ dưới 3 (đáy nét khuyết dưới của chữ g - sâu 3 ô ly dưới baseline): y = 112 */}
                  <line x1="0" y1="112" x2="100%" y2="112" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'g' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét cong kín (y=24 đến y=46) + nét khuyết dưới (y=24 kéo xuống y=112)
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét cong kín cao 2 ô ly */}
                    <path
                      d="M 28 30 C 24 24, 14 24, 8 32 C 2 40, 2 52, 8 60 C 14 68, 24 68, 28 60 C 31 54, 31 38, 28 30 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét khuyết dưới kéo xuống y=112 */}
                    <path
                      d="M 28 24 L 28 100 C 28 112, 19 112, 14 112 C 9 112, 6 104, 10 94 L 38 46"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'g' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 68 30 C 64 24, 54 24, 48 32 C 42 40, 42 52, 48 60 C 54 68, 64 68, 68 60 C 71 54, 71 38, 68 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 68 24 L 68 100 C 68 112, 59 112, 54 112 C 49 112, 46 104, 50 94 L 78 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CHỮ GHÉP 'gi' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Chữ g nối sang chữ i cao 2 ô ly
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ g */}
                    <path
                      d="M 112 30 C 108 24, 98 24, 92 32 C 86 40, 86 52, 92 60 C 98 68, 108 68, 112 60 C 115 54, 115 38, 112 30 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 112 24 L 112 100 C 112 112, 103 112, 98 112 C 93 112, 90 104, 94 94 L 122 46"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ i nối từ g */}
                    <path
                      d="M 122 46 L 126 24 L 126 60 C 126 68, 130 68, 134 68 C 137 68, 139 60, 140 46"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="126" cy="14" r="1.5" fill="#1e293b" />
                  </g>

                  {/* ==============================================================
                      4. CHỮ GHÉP 'gi' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 166 30 C 162 24, 152 24, 146 32 C 140 40, 140 52, 146 60 C 152 68, 162 68, 166 60 C 169 54, 169 38, 166 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 166 24 L 166 100 C 166 112, 157 112, 152 112 C 147 112, 144 104, 148 94 L 176 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 176 46 L 180 24 L 180 60 C 180 68, 184 68, 188 68 C 191 68, 193 60, 194 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="180" cy="14" r="1.5" fill="#000000" />
                  </g>

                  {/* ==============================================================
                      5. CỤM TỪ 'gà gô' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng gà: g nối a + dấu huyền \
                      Tiếng gô: g nối ô + dấu mũ ^
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG GÀ */}
                    <path
                      d="M 230 30 C 226 24, 216 24, 210 32 C 204 40, 204 52, 210 60 C 216 68, 226 68, 230 60 C 233 54, 233 38, 230 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 230 24 L 230 100 C 230 112, 221 112, 216 112 C 211 112, 208 104, 212 94 L 240 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ a nối từ g */}
                    <path
                      d="M 264 30 C 258 24, 248 24, 242 32 C 236 40, 236 52, 242 60 C 248 68, 258 68, 264 60 C 268 52, 268 38, 264 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 264 24 L 264 60 C 264 68, 268 68, 275 68 C 280 68, 284 60, 286 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 248 10 L 256 16"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG GÔ */}
                    <path
                      d="M 314 30 C 310 24, 300 24, 294 32 C 288 40, 288 52, 294 60 C 300 68, 310 68, 314 60 C 317 54, 317 38, 314 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 314 24 L 314 100 C 314 112, 305 112, 300 112 C 295 112, 292 104, 296 94 L 324 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ô */}
                    <path
                      d="M 348 30 C 342 24, 332 24, 326 32 C 320 40, 320 52, 326 60 C 332 68, 342 68, 348 60 C 352 52, 352 38, 348 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 333 20 L 338 12 L 343 20"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      6. CỤM TỪ 'giá đỗ' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng giá: gi nối a + dấu sắc /
                      Tiếng đỗ: đ (cao 4 ô ly) nối ô + dấu ngã ~
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG GIÁ */}
                    <path
                      d="M 384 30 C 380 24, 370 24, 364 32 C 358 40, 358 52, 364 60 C 370 68, 380 68, 384 60 C 387 54, 387 38, 384 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 384 24 L 384 100 C 384 112, 375 112, 370 112 C 365 112, 362 104, 366 94 L 394 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 394 46 L 398 24 L 398 60 C 398 68, 402 68, 406 68 C 409 68, 411 60, 412 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="398" cy="14" r="1.5" fill="#000000" />
                    {/* Chữ a nối từ i */}
                    <path
                      d="M 432 30 C 426 24, 416 24, 410 32 C 404 40, 404 52, 410 60 C 416 68, 426 68, 432 60 C 436 52, 436 38, 432 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 432 24 L 432 60 C 432 68, 436 68, 443 68 C 448 68, 452 60, 454 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 426 10 L 420 16"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG ĐỖ: chữ đ cao 4 ô ly nối ô + dấu ngã */}
                    <path
                      d="M 480 30 C 474 24, 464 24, 458 32 C 452 40, 452 52, 458 60 C 464 68, 474 68, 480 60 C 484 52, 484 38, 480 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 480 2 L 480 60 C 480 68, 484 68, 491 68 C 496 68, 500 60, 502 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 473 16 L 487 16"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Chữ ô */}
                    <path
                      d="M 524 30 C 518 24, 508 24, 502 32 C 496 40, 496 52, 502 60 C 508 68, 518 68, 524 60 C 528 52, 528 38, 524 30 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 509 20 L 514 12 L 519 20"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu ngã ~ trên đầu ô */}
                    <path
                      d="M 510 6 C 512 4, 514 4, 516 6 C 518 8, 520 8, 522 6"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
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
           TRANG 47: MỤC 4 (ĐỌC CÂU "Bà che gió cho ba chú gà.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "VẬT NUÔI")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bà che gió cho ba chú gà.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bà che gió cho ba chú gà.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bà che gió cho ba chú gà."</span>
              </button>
            </div>

            {/* Grandma covering windy chicken coop in the yard matching textbook Page 47 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-amber-50 to-orange-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Grandma covering the coop */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👵🪵</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bà cẩn thận che chắn gió
                    </span>
                  </div>

                  {/* Wind and blowing leaves */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🍃💨</span>
                    <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-950 text-[11px] font-bold mt-1 shadow-xs">
                      Gió đông lạnh về
                    </span>
                  </div>

                  {/* Three little chickens in coop */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🐔🐓🐣</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-rose-300">
                      Ba chú gà trong chuồng
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Bà che gió cho ba chú gà." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bà')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bà
                    </button>
                    <button
                      onClick={() => handleSpeak('che')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      che
                    </button>
                    <button
                      onClick={() => handleSpeak('gió')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      gió
                    </button>
                    <button
                      onClick={() => handleSpeak('cho')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      cho
                    </button>
                    <button
                      onClick={() => handleSpeak('ba')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      ba
                    </button>
                    <button
                      onClick={() => handleSpeak('chú')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      chú
                    </button>
                    <button
                      onClick={() => handleSpeak('gà')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      gà.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Mùa đông gió bấc lạnh lùng, bà thương đàn gà nên lấy phên che chắn chuồng cẩn thận để giữ ấm!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: VẬT NUÔI) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Nói</h3>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                    Chủ đề: Vật nuôi
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Vật nuôi. Bức tranh vẽ cảnh sân nhà nông thôn ấm áp: mẹ đang rải thóc cho đàn gà mổ hạt, bạn nhỏ âu yếm vuốt ve chú chó con và mèo con, phía xa có chuồng bò vàng, chuồng lợn hồng và đàn vịt trắng bơi dưới ao. Các con vật nuôi vừa có ích vừa rất thân thiết với con người!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh làng quê: Bức tranh có những con vật nuôi nào? Mẹ và bạn nhỏ đang làm gì? Gia đình em nuôi những con vật nào và em chăm sóc chúng ra sao?
            </p>

            {/* Farmyard Animals Grid matching Textbook Page 47 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
              {/* VẬT NUÔI 1: CHÓ VÀ MÈO */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Chó con và Mèo vàng
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-amber-100 to-orange-50 flex flex-col items-center justify-center p-3 text-center border border-amber-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🐶🐱❤️</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Bạn thân thiết của bé
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Chó con trông nhà rất giỏi và trung thành, mèo con bắt chuột giúp bảo vệ thóc gạo cho gia đình!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu chó và mèo</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>

              {/* VẬT NUÔI 2: ĐÀN GÀ VÀ ĐÀN VỊT */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Đàn gà và Đàn vịt
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-emerald-100 to-teal-50 flex flex-col items-center justify-center p-3 text-center border border-emerald-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🐔🐣🦆</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Kiếm ăn trên sân và ao
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Đàn gà gáy báo thức mỗi sớm mai, cho trứng ngon và thịt bổ dưỡng. Đàn vịt bơi lội dưới ao tắm mát!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu đàn gà vịt</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* VẬT NUÔI 3: TRÂU BÒ VÀ HEO */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Bò vàng và Lợn hồng
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-sky-100 to-blue-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🐮🌾🐷</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Gia súc nuôi trong chuồng
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Bò vàng kéo cày chăm chỉ, giúp đỡ bác nông dân làm đồng; lợn hồng lớn nhanh mang lại niềm vui cho gia đình!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu bò và lợn</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐾</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy kể về con vật nuôi mà bé yêu thích nhất!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Con vật đó tên là gì? Bộ lông có màu gì? Bé cho nó ăn và vuốt ve nó như thế nào?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé kể về con vật nuôi rất tình cảm và ấm áp! Chúng mình hãy luôn yêu thương và chăm sóc các con vật nuôi nhé!');
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
                    <span>Luyện nói về vật nuôi</span>
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

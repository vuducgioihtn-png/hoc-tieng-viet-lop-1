import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, UserCheck } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson18DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson18Detail: React.FC<Lesson18DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page48' | 'page49'>('page48');
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
      {/* Page Tabs Header: Trang 48 & Trang 49 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page48')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page48'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 48: Nhận biết, Đọc & Viết Gh gh, Nh nh</span>
          </button>
          <button
            onClick={() => setActiveTab('page49')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page49'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🏡 Trang 49: Đọc "Mẹ nhờ Hà bê ghế nhỏ." & Nói "Giới thiệu"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 18! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page48' ? (
        /* =========================================================================
           TRANG 48: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 18: Gh gh   Nh nh */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">18</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ ghép và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>Gh gh</span>
                  <span className="text-emerald-200">Nh nh</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười tám: Ghờ in hoa, ghờ in thường, Nhờ in hoa, nhờ in thường. Âm ghờ, âm nhờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm Gh gh, Nh nh</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Hà ghé nhà bà. Nhà bà ở ngõ nhỏ.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Hà ghé nhà bà. Nhà bà ở ngõ nhỏ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Ha visiting grandma in a small alley */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🛵👩</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Mẹ chở bé Hà về thăm bà
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">👧🏃‍♀️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-amber-300">
                      Hà hớn hở chạy vào ôm bà
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👵🏡</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-rose-300">
                      Bà tươi cười đón cháu
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🏡 Ngõ nhỏ yên bình rợp bóng cây</span>
                  <span>👧 Bé Hà ngoan ngoãn mừng rỡ khi gặp bà</span>
                  <span>👵 Tình bà cháu ấm áp, thân thương</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Hà ghé nhà bà. Nhà bà ở ngõ nhỏ." with red gh, nh, Nh, nh */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-xl mx-auto space-y-2">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">gh, nh</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button onClick={() => handleSpeak('Hà')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">Hà</button>
                  <button onClick={() => handleSpeak('gờ - e - ghe - sắc - ghé. ghé.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">gh</span>é
                  </button>
                  <button onClick={() => handleSpeak('nhờ - a - nha - huyền - nhà. nhà.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">nh</span>à
                  </button>
                  <button onClick={() => handleSpeak('bà')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">bà.</button>
                  <span className="text-slate-300">|</span>
                  <button onClick={() => handleSpeak('Nhờ - a - nha - huyền - Nhà. Nhà.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">Nh</span>à
                  </button>
                  <button onClick={() => handleSpeak('bà')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">bà</button>
                  <button onClick={() => handleSpeak('ở')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">ở</button>
                  <button onClick={() => handleSpeak('ngõ')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">ngõ</button>
                  <button onClick={() => handleSpeak('nhờ - o - nho - hỏi - nhỏ. nhỏ.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">nh</span>ỏ.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 48) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm ghờ và âm nhờ. Âm ghờ: gờ - e - ghe - sắc - ghé. ghé. Âm nhờ: nhờ - a - nha - huyền - nhà. nhà. ghẹ, ghế, ghi, nhà, nhẹ, nhỏ. ghế đá, ghẹ đỏ, nhà gỗ, lá nho.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'gh' and 'nh' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'gh' & TIẾNG 'ghé' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'gh' in red */}
                <button
                  onClick={() => handleSpeak('gờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm ghờ kép"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    gh
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm ghờ (ghép)
                  </span>
                </button>

                {/* Ô trên: [ gh | e ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('gờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ghờ"
                  >
                    gh
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ ghé ] */}
                <button
                  onClick={() => handleSpeak('gờ - e - ghe - sắc - ghé. ghé.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: gờ - e - ghe - sắc - ghé. ghé."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">gh</span>
                    <span className="text-slate-900">é</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('gờ - e - ghe - sắc - ghé.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  gờ - e - ghe - sắc - ghé
                </button>
              </div>

              {/* CỘT 2: ÂM 'nh' & TIẾNG 'nhà' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'nh' in red */}
                <button
                  onClick={() => handleSpeak('nhờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm nhờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    nh
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm nhờ
                  </span>
                </button>

                {/* Ô trên: [ nh | a ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('nhờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm nhờ"
                  >
                    nh
                  </button>
                  <button
                    onClick={() => handleSpeak('a')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm a"
                  >
                    a
                  </button>
                </div>

                {/* Ô dưới: [ nhà ] */}
                <button
                  onClick={() => handleSpeak('nhờ - a - nha - huyền - nhà. nhà.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: nhờ - a - nha - huyền - nhà. nhà."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">nh</span>
                    <span className="text-slate-900">à</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('nhờ - a - nha - huyền - nhà.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  nhờ - a - nha - huyền - nhà
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 48: ghẹ ghế ghi - nhà nhẹ nhỏ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('ghẹ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ghẹ</button>
                  <button onClick={() => handleSpeak('ghế')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ghế</button>
                  <button onClick={() => handleSpeak('ghi')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">ghi</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('nhà')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nhà</button>
                  <button onClick={() => handleSpeak('nhẹ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nhẹ</button>
                  <button onClick={() => handleSpeak('nhỏ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nhỏ</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 48: "ghế đá", "ghẹ đỏ", "nhà gỗ", "lá nho" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Chiếc ghế đá -> 'ghế đá' */}
              <button
                onClick={() => handleSpeak('ghế đá')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🪑🏛️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">ghế đá</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Ghế đá công viên</span>
              </button>

              {/* Image 2: Con ghẹ đỏ -> 'ghẹ đỏ' */}
              <button
                onClick={() => handleSpeak('ghẹ đỏ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🦀🌊
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">ghẹ đỏ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Con ghẹ biển đỏ au</span>
              </button>

              {/* Image 3: Ngôi nhà gỗ -> 'nhà gỗ' */}
              <button
                onClick={() => handleSpeak('nhà gỗ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🏡🪵
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">nhà gỗ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Ngôi nhà gỗ ấm áp</span>
              </button>

              {/* Image 4: Chiếc lá nho -> 'lá nho' */}
              <button
                onClick={() => handleSpeak('lá nho')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🍇🍃
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">lá nho</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Lá nho xanh mát</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 48)
              Dải kẻ 5 ô ly chuẩn: gh (chấm), gh (liền), nh (chấm), nh (liền), ghẹ, lá nho
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
                  onClick={() => handleSpeak('Cách viết chữ gh: Viết chữ g cao 5 ô ly (2 ô ly trên và 3 ô ly dưới) dừng ở đường kẻ 2, sau đó lia bút nối liền sang nét khuyết trên của chữ h cao 5 ô ly vươn lên đường kẻ 6 rồi kéo thẳng xuống đường kẻ 1, viết nét móc hai đầu dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ gh"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ gh</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ nh: Viết chữ n cao 2 ô ly dừng ở đường kẻ 2, sau đó lia bút nối liền sang nét khuyết trên của chữ h cao 5 ô ly vươn lên đường kẻ 6 rồi kéo thẳng xuống đường kẻ 1, viết nét móc hai đầu dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ nh"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ nh</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết tiếng ghẹ và cụm từ lá nho: Tiếng ghẹ: viết chữ gh nối sang e có dấu nặng ở dưới. Cụm từ lá nho: chữ l cao 5 ô ly nối sang a có dấu sắc, cách 1 ô ly viết chữ nh nối sang o.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết ghẹ, lá nho"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết ghẹ, lá nho</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">gh nh</span>
                  <span>Chữ ghép gh và Chữ ghép nh</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ gh:</strong> Chữ g (cao 5 ô ly: 2 trên, 3 dưới) nối liền sang chữ h (cao 5 ô ly trên baseline).<br />
                  <strong>Chữ nh:</strong> Chữ n (cao 2 ô ly) nối liền sang chữ h (cao 5 ô ly trên baseline).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">ghẹ lá nho</span>
                  <span>Tiếng "ghẹ" và cụm từ "lá nho"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>ghẹ:</strong> Chữ gh nối sang e cao 2 ô ly + dấu nặng . ở dưới e.<br />
                  <strong>lá nho:</strong> Tiếng lá (l cao 5 ô ly nối a + dấu sắc), cách 1 ô ly viết tiếng nho (nh nối o).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 48 OF TEXTBOOK */}
            <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                <defs>
                  <pattern id="oli-grid-page48" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                  </pattern>
                </defs>

                {/* Fill background with 22px dotted grid */}
                <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page48)" />

                {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                {/* Đường kẻ 6 (đỉnh chữ h, l cao 5 ô ly so với baseline y=46): y = 2 */}
                <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 3 (đỉnh nét cong kín chữ g, thân chữ n, e, a, o - cao 2 ô ly): y = 24 */}
                <line x1="0" y1="24" x2="100%" y2="24" stroke="#0284c7" strokeWidth="1.4" />

                {/* Đường kẻ 1 (Baseline ở độ cao y=46): y = 46 */}
                <line x1="0" y1="46" x2="100%" y2="46" stroke="#0284c7" strokeWidth="2.2" />

                {/* Đường kẻ dưới 3 (đáy nét khuyết dưới chữ g - sâu 3 ô ly): y = 112 */}
                <line x1="0" y1="112" x2="100%" y2="112" stroke="#0284c7" strokeWidth="1.4" />

                {/* Viền trái phải */}
                <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                {/* ==============================================================
                    1. CHỮ GHÉP 'gh' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                    Chữ g (cao 5 ô ly) nối liền sang chữ h cao 5 ô ly
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ g */}
                  <path
                    d="M 28 30 C 24 24, 14 24, 8 32 C 2 40, 2 52, 8 60 C 14 68, 24 68, 28 60 C 31 54, 31 38, 28 30 Z"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 28 24 L 28 100 C 28 112, 19 112, 14 112 C 9 112, 6 104, 10 94 L 38 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Nối sang chữ h cao 5 ô ly */}
                  <path
                    d="M 38 46 L 46 24 C 52 10, 58 2, 53 2 C 49 2, 47 5, 47 12 L 47 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 47 38 C 51 26, 57 24, 63 24 C 68 24, 70 30, 70 38 L 70 42 C 70 46, 73 46, 76 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    2. CHỮ GHÉP 'gh' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 102 30 C 98 24, 88 24, 82 32 C 76 40, 76 52, 82 60 C 88 68, 98 68, 102 60 C 105 54, 105 38, 102 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 102 24 L 102 100 C 102 112, 93 112, 88 112 C 83 112, 80 104, 84 94 L 112 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 112 46 L 120 24 C 126 10, 132 2, 127 2 C 123 2, 121 5, 121 12 L 121 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 121 38 C 125 26, 131 24, 137 24 C 142 24, 144 30, 144 38 L 144 42 C 144 46, 147 46, 150 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    3. CHỮ GHÉP 'nh' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                    Chữ n (cao 2 ô ly) nối liền sang chữ h cao 5 ô ly
                    ============================================================== */}
                  <g fill="none">
                  {/* Chữ n */}
                  <path
                    d="M 160 36 C 163 26, 168 24, 172 24 L 172 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 172 38 C 176 26, 184 24, 189 24 L 189 42 C 189 46, 192 46, 196 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Nối sang chữ h cao 5 ô ly */}
                  <path
                    d="M 196 46 L 204 24 C 210 10, 216 2, 211 2 C 207 2, 205 5, 205 12 L 205 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 205 38 C 209 26, 215 24, 221 24 C 226 24, 228 30, 228 38 L 228 42 C 228 46, 231 46, 234 46"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    4. CHỮ GHÉP 'nh' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 244 36 C 247 26, 252 24, 256 24 L 256 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 256 38 C 260 26, 268 24, 273 24 L 273 42 C 273 46, 276 46, 280 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 280 46 L 288 24 C 294 10, 300 2, 295 2 C 291 2, 289 5, 289 12 L 289 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 289 38 C 293 26, 299 24, 305 24 C 310 24, 312 30, 312 38 L 312 42 C 312 46, 315 46, 318 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    5. TIẾNG 'ghẹ' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                    Chữ gh nối e + dấu nặng . dưới e
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ g */}
                  <path
                    d="M 346 30 C 342 24, 332 24, 326 32 C 320 40, 320 52, 326 60 C 332 68, 342 68, 346 60 C 349 54, 349 38, 346 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 346 24 L 346 100 C 346 112, 337 112, 332 112 C 327 112, 324 104, 328 94 L 356 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 356 46 L 364 24 C 370 10, 376 2, 371 2 C 367 2, 365 5, 365 12 L 365 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 365 38 C 369 26, 375 24, 381 24 C 386 24, 388 30, 388 38 L 388 42 C 388 46, 391 46, 394 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ e nối từ h */}
                  <path
                    d="M 394 46 C 398 38, 403 36, 407 36 C 411 36, 413 40, 407 43 C 400 46, 402 52, 407 52 C 411 52, 414 48, 416 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="406" cy="56" r="1.5" fill="#000000" />
                </g>

                {/* ==============================================================
                    6. CỤM TỪ 'lá nho' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng lá: l cao 5 ô ly nối a + dấu sắc /
                    Tiếng nho: nh nối o
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG LÁ: Chữ l cao 5 ô ly */}
                  <path
                    d="M 436 46 L 444 24 C 450 10, 456 2, 451 2 C 447 2, 445 5, 445 12 L 445 42 C 445 46, 448 46, 452 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ a nối từ l */}
                  <path
                    d="M 474 30 C 468 24, 458 24, 452 32 C 446 40, 446 52, 452 60 C 458 68, 468 68, 474 60 C 478 52, 478 38, 474 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 474 24 L 474 60 C 474 68, 478 68, 485 68 C 490 68, 494 60, 496 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 468 10 L 462 16"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG NHO: chữ nh nối o */}
                  {/* Chữ n */}
                  <path
                    d="M 514 36 C 517 26, 522 24, 526 24 L 526 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 526 38 C 530 26, 538 24, 543 24 L 543 42 C 543 46, 546 46, 550 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 550 46 L 558 24 C 564 10, 570 2, 565 2 C 561 2, 559 5, 559 12 L 559 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 559 38 C 563 26, 569 24, 575 24 C 580 24, 582 30, 582 38 L 582 42 C 582 46, 585 46, 588 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ o nối từ h */}
                  <path
                    d="M 610 30 C 604 24, 594 24, 588 32 C 582 40, 582 52, 588 60 C 594 68, 604 68, 610 60 C 614 52, 614 38, 610 30 Z"
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
           TRANG 49: MỤC 4 (ĐỌC CÂU "Mẹ nhờ Hà bê ghế nhỏ.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "GIỚI THIỆU")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Mẹ nhờ Hà bê ghế nhỏ.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Mẹ nhờ Hà bê ghế nhỏ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Mẹ nhờ Hà bê ghế nhỏ."</span>
              </button>
            </div>

            {/* Mother cleaning room and Ha carrying a little wooden chair matching textbook Page 49 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Mother cleaning table */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩🪑🧹</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-rose-300">
                      Mẹ dọn dẹp bàn ghế
                    </span>
                  </div>

                  {/* Ha carrying small chair */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">👧🪵✨</span>
                    <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[11px] font-bold mt-1 shadow-xs">
                      Hà nhanh nhẹn bê ghế nhỏ
                    </span>
                  </div>

                  {/* Clean dining room */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🏠🪟</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Căn phòng sạch sẽ, ngăn nắp
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Mẹ nhờ Hà bê ghế nhỏ." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button onClick={() => handleSpeak('Mẹ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Mẹ</button>
                    <button onClick={() => handleSpeak('nhờ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">nhờ</button>
                    <button onClick={() => handleSpeak('Hà')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Hà</button>
                    <button onClick={() => handleSpeak('bê')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">bê</button>
                    <button onClick={() => handleSpeak('ghế')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">ghế</button>
                    <button onClick={() => handleSpeak('nhỏ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">nhỏ.</button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bé Hà rất ngoan ngoãn, biết vâng lời và giúp mẹ làm những công việc nhà vừa sức!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: GIỚI THIỆU - KHI ĐẾN THĂM NHÀ NGƯỜI LỚN) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Giới thiệu (Lễ phép khi đến thăm nhà người quen)
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Giới thiệu. Bức tranh vẽ cảnh bố mẹ dẫn bạn nhỏ đến thăm nhà cô giáo. Cô giáo tươi cười niềm nở bước ra chào đón. Bạn nhỏ vòng tay trước ngực, lễ phép cúi đầu chào cô và tự tin giới thiệu bản thân: Cháu chào cô ạ! Cháu tên là Nam, năm nay cháu học lớp một A ạ!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Gợi ý thảo luận:</strong> Khi cùng bố mẹ đến thăm nhà người quen hay thầy cô giáo, bé cần chào hỏi và giới thiệu bản thân như thế nào cho thật lễ phép, lịch sự?
            </p>

            {/* Visit scene matching Textbook Page 49 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>Văn hóa chào hỏi và giới thiệu khi đến thăm nhà</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Trước hiên nhà người quen/thầy cô</span>
              </div>

              {/* Scene Visualization */}
              <div className="h-48 rounded-2xl bg-gradient-to-b from-rose-50 via-amber-50 to-emerald-50 flex flex-col items-center justify-center p-4 text-center border border-amber-200/60 shadow-inner">
                <div className="flex items-center justify-center gap-8 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👨‍👩‍👧</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Bố mẹ dắt bé đến thăm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👦🙇‍♂️</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Bé khoanh tay lễ phép chào</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👩‍🏫🌹</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Cô giáo niềm nở đón khách</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-slate-900 bg-white/90 px-4 py-1 rounded-full shadow-2xs">
                  "Cháu chào cô ạ! Cháu tên là Nam, năm nay cháu 6 tuổi, học lớp 1A ạ!"
                </p>
              </div>

              {/* Practice dialogues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleSpeak('Bố mẹ giới thiệu: Chào cô giáo, hôm nay gia đình đưa cháu Nam đến thăm và chúc sức khỏe cô ạ!')}
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Lời giới thiệu của bố mẹ</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  onClick={() => handleSpeak('Bé Nam lễ phép chào: Dạ cháu chào cô giáo ạ! Cháu rất vui được đến thăm nhà cô hôm nay ạ!')}
                  className="p-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Lời chào lễ phép của bé</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤝</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy thực hành chào hỏi và tự giới thiệu khi đến nhà người quen nhé!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bé đứng ngay ngắn, khoanh tay trước ngực và nói lời chào kèm họ tên, lớp học của mình!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé chào hỏi và giới thiệu rất lễ phép, ngoan ngoãn! Cô khen ngợi bé!');
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
                    <span>Thực hành kỹ năng chào hỏi</span>
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

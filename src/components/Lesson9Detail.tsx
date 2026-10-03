import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson9DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson9Detail: React.FC<Lesson9DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page30' | 'page31'>('page30');
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
      {/* Page Tabs Header: Trang 30 & Trang 31 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page30')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page30'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 30: Nhận biết, Đọc & Viết Ơ ơ, Dấu ngã ( ~ )</span>
          </button>
          <button
            onClick={() => setActiveTab('page31')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page31'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>✈️ Trang 31: Đọc "Bố đỡ bé." & Nói "Phương tiện giao thông"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 9! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page30' ? (
        /* =========================================================================
           TRANG 30: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 9: Ơ ơ   ~ */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">9</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và dấu thanh
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-4">
                  <span>Ơ</span>
                  <span className="text-emerald-200">ơ</span>
                  <span className="text-amber-300 text-5xl font-mono leading-none">~</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài chín: Ơ in hoa, ơ in thường, dấu ngã. Âm ơ, dấu ngã.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm Ơ ơ, dấu ngã</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Tàu dỡ hàng ở cảng.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Tàu dỡ hàng ở cảng.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Big cargo ship at port, cranes unloading containers */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Port Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🚢📦</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Tàu chở hàng cập cảng
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-pulse-slow">
                    <span className="text-6xl drop-shadow-md">🏗️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-amber-300">
                      Cần cẩu dỡ container
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🚛🚚</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Xe tải chở hàng hóa
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🌊 Bến cảng biển tấp nập</span>
                  <span>🚢 Tàu hàng to lớn</span>
                  <span>📦 Từng kiện hàng được dỡ xuống bến</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Tàu dỡ hàng ở cảng." with red 'ỡ' and 'ở' */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">dỡ, ở</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Tàu')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Tàu
                  </button>
                  <button
                    onClick={() => handleSpeak('dờ - ơ - dơ - ngã - dỡ. dỡ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer text-rose-600"
                  >
                    dỡ
                  </button>
                  <button
                    onClick={() => handleSpeak('hàng')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    hàng
                  </button>
                  <button
                    onClick={() => handleSpeak('ở')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer text-rose-600"
                  >
                    ở
                  </button>
                  <button
                    onClick={() => handleSpeak('cảng')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    cảng.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 30) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm ơ và dấu ngã. Âm ơ. bờ - ơ - bơ - huyền - bờ. bờ. dờ - ơ - dơ - ngã - dỡ. dỡ. bờ, bở, cờ, cỡ, dỡ, đỡ. bờ đê, cá cờ, đỡ bé.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Top letter 'Ơ' branching to 'bờ' and 'dỡ' */}
            <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-200/80 max-w-lg mx-auto flex flex-col items-center space-y-3">
              {/* Top sound 'Ơ' in red */}
              <button
                onClick={() => handleSpeak('ơ')}
                className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title="Bấm để nghe âm ơ"
              >
                <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                  Ơ
                </span>
                <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                  ơ
                </span>
              </button>

              {/* Connecting Branching Tree Lines */}
              <div className="w-56 h-5 relative flex items-center justify-center">
                <div className="absolute top-0 w-44 h-4 border-t-2 border-l-2 border-r-2 border-sky-300 rounded-t-xs" />
                <div className="w-0.5 h-2 bg-sky-300 -mt-3" />
              </div>

              {/* Two Column Phonics Models: 'bờ' and 'dỡ' */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-md pt-1">
                {/* CỘT 1: TIẾNG 'bờ' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ b | ơ ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('bờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm bờ"
                    >
                      b
                    </button>
                    <button
                      onClick={() => handleSpeak('ơ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm ơ"
                    >
                      ơ
                    </button>
                  </div>

                  {/* Ô dưới: [ bờ ] */}
                  <button
                    onClick={() => handleSpeak('bờ - ơ - bơ - huyền - bờ. bờ.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: bờ - ơ - bơ - huyền - bờ. bờ."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal">
                      <span className="text-slate-900">b</span>
                      <span className="text-rose-600">ờ</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('bờ - ơ - bơ - huyền - bờ.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    bờ - ơ - bơ - huyền - bờ
                  </button>
                </div>

                {/* CỘT 2: TIẾNG 'dỡ' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ d | ơ ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('dờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm dờ"
                    >
                      d
                    </button>
                    <button
                      onClick={() => handleSpeak('ơ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm ơ"
                    >
                      ơ
                    </button>
                  </div>

                  {/* Ô dưới: [ dỡ ] */}
                  <button
                    onClick={() => handleSpeak('dờ - ơ - dơ - ngã - dỡ. dỡ.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: dờ - ơ - dơ - ngã - dỡ. dỡ."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal flex items-center justify-center">
                      <span className="text-slate-900">d</span>
                      <span className="text-rose-600 font-sans">ỡ</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('dờ - ơ - dơ - ngã - dỡ.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    dờ - ơ - dơ - ngã - dỡ
                  </button>
                </div>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 30: bờ bở - cờ cỡ - dỡ đỡ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('bờ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bờ</button>
                  <button onClick={() => handleSpeak('bở')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bở</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('cờ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cờ</button>
                  <button onClick={() => handleSpeak('cỡ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cỡ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('dỡ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">dỡ</button>
                  <button onClick={() => handleSpeak('đỡ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">đỡ</button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 30: "bờ đê", "cá cờ", "đỡ bé" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Bờ đê cỏ xanh -> 'bờ đê' */}
              <button
                onClick={() => handleSpeak('bờ đê. con đường bờ đê cỏ xanh.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🏞️🌾
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">bờ đê</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Bờ đê uốn lượn</span>
              </button>

              {/* Image 2: Chú cá cờ -> 'cá cờ' */}
              <button
                onClick={() => handleSpeak('cá cờ. chú cá cờ nhiều màu sắc.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🐠🌈
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">cá cờ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chú cá cờ sặc sỡ</span>
              </button>

              {/* Image 3: Mẹ đỡ bé tập đi -> 'đỡ bé' */}
              <button
                onClick={() => handleSpeak('đỡ bé. mẹ đỡ bé tập đi chập chững.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    👩‍👧💕
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">đỡ bé</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Âu yếm đỡ bé tập đi</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 30)
              Dải kẻ 5 ô ly chuẩn: ơ (chấm), ơ (liền), đỡ bé (liền)
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
                  onClick={() => handleSpeak('Cách viết chữ ơ: Viết chữ o là nét cong kín cao 2 ô ly, sau đó lia bút lên đỉnh chữ o phía bên phải viết một nét râu nhỏ uốn cong ra ngoài chạm đường kẻ 3.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ ơ"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ ơ</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ đỡ bé: Tiếng đỡ: Viết chữ đ cao 4 ô ly dừng bút ở đường kẻ 2, nối liền sang chữ ơ cao 2 ô ly có nét râu, dấu ngã trên đầu chữ ơ. Cách một khoảng 1 ô ly, viết tiếp tiếng bé: chữ b cao 5 ô ly nối sang e cao 2 ô ly, dấu sắc trên đầu chữ e.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết đỡ bé"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết cụm từ đỡ bé</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">ơ</span>
                  <span>Chữ ơ (Chữ o + Nét râu nhỏ)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ o nét cong kín cao 2 ô ly, rộng 1.5 ô ly. Lia bút lên đỉnh phía bên phải viết một nét râu nhỏ (nét móc nhỏ uốn cong ra ngoài) chạm đường kẻ 3.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">đỡ bé</span>
                  <span>Cụm từ "đỡ bé"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Tiếng đỡ:</strong> Chữ đ cao 4 ô ly nối liền chạm mép trái chữ ơ cao 2 ô ly + dấu ngã ~ lượn sóng trên đầu ơ.<br />
                  <strong>Tiếng bé:</strong> Cách 1 khoảng 1 ô ly, chữ b cao 5 ô ly nối sang e cao 2 ô ly + dấu sắc trên đầu e.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 30 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 30: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page30" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page30)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ b cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 5 (đỉnh chữ đ cao 4 ô ly): y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 4 (vị trí nét gạch ngang ngắn của chữ đ): y = 46 */}
                  <line x1="0" y1="46" x2="100%" y2="46" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ ơ, e - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'ơ' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét cong kín cao 2 ô ly + nét râu nhỏ ở bên phải đỉnh
                      ============================================================== */}
                  <g fill="none">
                    {/* Thân chữ o chấm mờ */}
                    <path
                      d="M 33 74 C 27 68, 17 68, 11 76 C 5 84, 5 96, 11 104 C 17 112, 27 112, 33 104 C 37 96, 37 82, 33 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét râu nhỏ chấm mờ */}
                    <path
                      d="M 32 68 C 34 66, 36 67, 36 71 C 36 74, 34 76, 33 76"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'ơ' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      Cách chữ 1 đúng 3 ô ly (tại x=88)
                      ============================================================== */}
                  <g fill="none">
                    {/* Thân chữ o nét liền */}
                    <path
                      d="M 88 74 C 82 68, 72 68, 66 76 C 60 84, 60 96, 66 104 C 72 112, 82 112, 88 104 C 92 96, 92 82, 88 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét râu nhỏ nét liền */}
                    <path
                      d="M 87 68 C 89 66, 91 67, 91 71 C 91 74, 89 76, 88 76"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CỤM TỪ 'đỡ bé' THỨ BA: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng 'đỡ': chữ đ cao 4 ô ly nối ơ + nét râu + dấu ngã ~
                      Tiếng 'bé': cách 1 ô ly, chữ b cao 5 ô ly nối e + dấu sắc /
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG ĐỠ: Chữ đ cao 4 ô ly */}
                    <path
                      d="M 143 74 C 137 68, 127 68, 121 76 C 115 84, 115 96, 121 104 C 127 112, 137 112, 143 104 C 147 96, 147 82, 143 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 143 24 L 143 104 C 143 112, 147 112, 154 112 C 159 112, 163 104, 165 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 132 46 L 154 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* Chữ ơ nối từ đ */}
                    <path
                      d="M 187 74 C 181 68, 171 68, 165 76 C 159 84, 159 96, 165 104 C 171 112, 181 112, 187 104 C 191 96, 191 82, 187 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét râu của chữ ơ */}
                    <path
                      d="M 186 68 C 188 66, 190 67, 190 71 C 190 74, 188 76, 187 76"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Dấu ngã ~ mềm mại trên đầu chữ ơ */}
                    <path
                      d="M 172 58 C 174 56, 176 56, 178 58 C 180 60, 182 60, 184 58"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG BÉ: Chữ b cao 5 ô ly */}
                    <path
                      d="M 215 90 L 226 68 C 232 54, 241 32, 241 18 C 241 7, 237 3, 232 3 C 228 3, 226 6, 226 12 L 226 98 C 226 107, 231 112, 237 112 C 244 112, 248 104, 248 86 C 248 76, 244 68, 239 68 C 235 68, 234 72, 238 72 C 242 72, 247 72, 254 80"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ e nối từ nét thắt của b */}
                    <path
                      d="M 254 80 C 259 72, 266 68, 271 69 C 277 70, 276 82, 267 92 C 258 102, 260 112, 270 112 C 276 112, 281 106, 284 98"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / trên đầu chữ e */}
                    <path
                      d="M 273 52 L 267 60"
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
           TRANG 31: MỤC 4 (ĐỌC CÂU "Bố đỡ bé.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "PHƯƠNG TIỆN GIAO THÔNG")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bố đỡ bé.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bố đỡ bé.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bố đỡ bé."</span>
              </button>
            </div>

            {/* Dad gently supporting baby walking towards mom matching textbook Page 31 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Dad and baby */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👨‍👧👶</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bố khom lưng dắt bé
                    </span>
                  </div>

                  {/* Baby walker */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🚼🔴</span>
                    <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[11px] font-bold mt-1 shadow-xs">
                      Xe tập đi màu đỏ
                    </span>
                  </div>

                  {/* Mom waiting */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩👗</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Mẹ dang tay đón bé
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Bố đỡ bé." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-md mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex items-center justify-center gap-5 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bố')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bố
                    </button>
                    <button
                      onClick={() => handleSpeak('đỡ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      đỡ
                    </button>
                    <button
                      onClick={() => handleSpeak('bé')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      bé.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bố yêu thương đỡ từng bước chân chập chững đầu đời của bé về vòng tay ấm áp của mẹ!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: PHƯƠNG TIỆN GIAO THÔNG) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-sky-950">Nói</h3>
                  <span className="text-xs text-sky-800 font-bold uppercase tracking-wider">
                    Chủ đề: Phương tiện giao thông
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Phương tiện giao thông. Trong bức tranh có xe ô tô chạy trên đường bộ, thuyền cá và tàu thủy chạy trên mặt biển, máy bay bay lượn trên bầu trời. Đó là các loại phương tiện giao thông đường bộ, đường thủy và đường hàng không!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-900 text-xs font-bold hover:bg-sky-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-sky-50/60 p-3 rounded-2xl border border-sky-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh phong cảnh biển: Bức tranh vẽ những phương tiện giao thông nào? Phương tiện nào di chuyển trên đường bộ? Phương tiện nào di chuyển trên mặt nước? Phương tiện nào bay trên bầu trời?
            </p>

            {/* 3 Categories of Transportation matching Textbook Page 31 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
              {/* PHƯƠNG TIỆN 1: Ô TÔ ĐƯỜNG BỘ */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Xe ô tô con (Đường bộ)
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-sky-100 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🚙🛣️</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Xe ô tô xanh chạy trên đường ven biển
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Xe ô tô là phương tiện giao thông đường bộ. Xe chạy êm ru trên con đường nhựa ven biển đưa mọi người đi làm, đi du lịch!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Giao thông đường bộ</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>

              {/* PHƯƠNG TIỆN 2: THUYỀN VÀ TÀU THỦY ĐƯỜNG THỦY */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-teal-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Tàu thuyền (Đường thủy)
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-teal-100 to-sky-50 flex flex-col items-center justify-center p-3 text-center border border-teal-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🚢⛵🌊</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Thuyền đánh cá và tàu viễn dương
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Thuyền và tàu thủy là phương tiện giao thông đường thủy. Thuyền đánh cá giúp các bác ngư dân đánh bắt cá, tàu thủy du lịch chở hành khách đi khắp các miền biển!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-xs font-bold text-teal-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Giao thông đường thủy</span>
                  <Volume2 className="w-4 h-4 text-teal-600" />
                </button>
              </div>

              {/* PHƯƠNG TIỆN 3: MÁY BAY ĐƯỜNG HÀNG KHÔNG */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Máy bay (Đường hàng không)
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-indigo-100 to-sky-50 flex flex-col items-center justify-center p-3 text-center border border-indigo-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">✈️☁️</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Máy bay sải cánh trên bầu trời cao
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Máy bay là phương tiện giao thông đường hàng không hiện đại nhất. Máy bay bay lượn trên bầu trời xanh, giúp con người đi lại giữa các thành phố và quốc gia rất nhanh chóng!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Giao thông đường hàng không</span>
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-sky-950">
                    Bé hãy kể về phương tiện giao thông bé yêu thích!
                  </h5>
                  <p className="text-xs text-sky-800">
                    Bé thích ngồi ô tô ngắm phố phường, đi tàu thủy ngắm biển khơi hay bay trên mây cùng máy bay?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé trả lời rất giỏi! Biết phân biệt phương tiện giao thông đường bộ, đường thủy và đường hàng không!');
                  playSoundEffect.success();
                  onEarnStar();
                }}
                className={`px-4 py-2 rounded-xl font-kid font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
                  hasPracticedSpeaking
                    ? 'bg-sky-600 text-white'
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

import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson6DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson6Detail: React.FC<Lesson6DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page24' | 'page25'>('page24');
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
      {/* Page Tabs Header: Trang 24 & Trang 25 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page24')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page24'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 24: Nhận biết, Đọc & Viết O o, Dấu hỏi ( ? )</span>
          </button>
          <button
            onClick={() => setActiveTab('page25')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page25'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🐮 Trang 25: Đọc "Bê có cỏ." & Nói "Chào hỏi"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 6! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page24' ? (
        /* =========================================================================
           TRANG 24: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 6: O o   ? */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">6</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và dấu thanh
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-4">
                  <span>O</span>
                  <span className="text-emerald-200">o</span>
                  <span className="text-amber-300 text-5xl">?</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài sáu: O in hoa, o in thường, dấu hỏi. Âm o, dấu hỏi.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm O o, dấu hỏi</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Đàn bò gặm cỏ.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Đàn bò gặm cỏ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Herd of cows grazing peacefully on meadow by golden field */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Birds in the sky */}
                <div className="flex items-center justify-center gap-6 mb-2 text-2xl animate-float">
                  <span>🕊️</span>
                  <span>🕊️</span>
                  <span>🌾</span>
                </div>

                {/* Herd of cows grazing */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center animate-pulse-slow">
                    <span className="text-7xl drop-shadow-md">🐂</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bò mẹ gặm cỏ
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-5xl drop-shadow-md">🦮</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Bê con chạy nhảy
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🐂</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bò vàng thong thả
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🌾 Cánh đồng lúa chín vàng</span>
                  <span>🌱 Vạt cỏ non xanh mát</span>
                  <span>🌳 Con đường làng uốn lượn</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Đàn bò gặm cỏ." with red 'bò' and 'cỏ' */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">bò, cỏ</span> được tô đỏ:
                </p>
                <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Đàn')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Đàn
                  </button>
                  <button
                    onClick={() => handleSpeak('bờ - o - bo - huyền - bò. bò.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer text-rose-600"
                  >
                    bò
                  </button>
                  <button
                    onClick={() => handleSpeak('gặm')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    gặm
                  </button>
                  <button
                    onClick={() => handleSpeak('cờ - o - co - hỏi - cỏ. cỏ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer text-rose-600"
                  >
                    cỏ.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 24) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm o và dấu hỏi. Âm o. bờ - o - bo - huyền - bò. bò. cờ - o - co - hỏi - cỏ. cỏ. bò, bó, bỏ, cò, có, cỏ.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Top letter 'o' branching to 'bò' and 'cỏ' */}
            <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-200/80 max-w-lg mx-auto flex flex-col items-center space-y-3">
              {/* Top sound 'o' in red */}
              <button
                onClick={() => handleSpeak('o')}
                className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title="Bấm để nghe âm o"
              >
                <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                  o
                </span>
                <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                  o
                </span>
              </button>

              {/* Connecting Branching Tree Lines */}
              <div className="w-56 h-5 relative flex items-center justify-center">
                <div className="absolute top-0 w-44 h-4 border-t-2 border-l-2 border-r-2 border-sky-300 rounded-t-xs" />
                <div className="w-0.5 h-2 bg-sky-300 -mt-3" />
              </div>

              {/* Two Column Phonics Models: 'bò' and 'cỏ' */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-md pt-1">
                {/* CỘT 1: TIẾNG 'bò' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ b | o ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('bờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm bờ"
                    >
                      b
                    </button>
                    <button
                      onClick={() => handleSpeak('o')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm o"
                    >
                      o
                    </button>
                  </div>

                  {/* Ô dưới: [ bò ] */}
                  <button
                    onClick={() => handleSpeak('bờ - o - bo - huyền - bò. bò.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: bờ - o - bo - huyền - bò. bò."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal">
                      <span className="text-slate-900">b</span>
                      <span className="text-rose-600">ò</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('bờ - o - bo - huyền - bò.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    bờ - o - bo - huyền - bò
                  </button>
                </div>

                {/* CỘT 2: TIẾNG 'cỏ' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ c | o ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('cờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm cờ"
                    >
                      c
                    </button>
                    <button
                      onClick={() => handleSpeak('o')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm o"
                    >
                      o
                    </button>
                  </div>

                  {/* Ô dưới: [ cỏ ] */}
                  <button
                    onClick={() => handleSpeak('cờ - o - co - hỏi - cỏ. cỏ.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: cờ - o - co - hỏi - cỏ. cỏ."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal flex items-center justify-center">
                      <span className="text-slate-900">c</span>
                      <span className="text-rose-600 font-sans">ỏ</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('cờ - o - co - hỏi - cỏ.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    cờ - o - co - hỏi - cỏ
                  </button>
                </div>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 24: bò bó bỏ - cò có cỏ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('bò')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bò</button>
                  <button onClick={() => handleSpeak('bó')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bó</button>
                  <button onClick={() => handleSpeak('bỏ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bỏ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('cò')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cò</button>
                  <button onClick={() => handleSpeak('có')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">có</button>
                  <button onClick={() => handleSpeak('cỏ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cỏ</button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 24: "bò", "cò", "cỏ" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Con bò -> 'bò' */}
              <button
                onClick={() => handleSpeak('bờ - o - bo - huyền - bò. con bò.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🐂
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">bò</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chú bò vàng</span>
              </button>

              {/* Image 2: Con cò -> 'cò' */}
              <button
                onClick={() => handleSpeak('cờ - o - co - huyền - cò. con cò.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🦩
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">cò</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Con cò trắng</span>
              </button>

              {/* Image 3: Bụi cỏ -> 'cỏ' */}
              <button
                onClick={() => handleSpeak('cờ - o - co - hỏi - cỏ. bụi cỏ.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🌱
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">cỏ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Bụi cỏ xanh</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 24)
              Dải kẻ 5 ô ly chuẩn: o (chấm), o (liền), bò (liền), cỏ (liền)
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
                  onClick={() => handleSpeak('Cách viết chữ o: Chữ o là nét cong kín cao 2 ô ly, rộng 1 ô ly rưỡi. Đặt bút dưới đường kẻ 3 một chút, lia bút sang trái lượn cong xuống chạm đường kẻ 1, lượn lên chạm đường kẻ 3 rồi nối vào điểm đặt bút.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ o"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ o</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết tiếng bò và cỏ: Tiếng bò: Viết chữ b cao 5 ô ly, từ nét thắt nối sang chữ o cao 2 ô ly, dấu huyền trên đầu chữ o. Tiếng cỏ: Viết chữ c cao 2 ô ly dừng bút ở đường kẻ 2, mép trái chữ o chạm liền với điểm dừng của c, dấu hỏi trên đầu chữ o.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết bò, cỏ"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết tiếng bò, cỏ</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">o</span>
                  <span>Chữ o (cao 2 ô ly, rộng 1.5 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Nét cong kín tròn đều. Đặt bút dưới ĐK 3 một chút, lia bút sang trái lượn cong tròn chạm ĐK 1, lượn lên chạm ĐK 3 rồi khép kín tại điểm đặt bút.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">bò</span>
                  <span>Tiếng bò (Chữ b nối sang o)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ b cao 5 ô ly (thân sổ thẳng đè dòng kẻ dọc, thắt nút tại ĐK 3). Nét thắt lượn nối êm sang viết chữ o cao 2 ô ly. Dấu huyền đặt ngắn gọn trên đầu o.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">cỏ</span>
                  <span>Tiếng cỏ (Chữ c liền với o)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ c cao 2 ô ly dừng bút ở ĐK 2. Mép trái của nét cong kín chữ o chạm liền khít với điểm dừng bút của c. Dấu hỏi đặt cân đối trên đầu chữ o.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 24 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 24: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page24" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page24)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ b cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ o, c - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'o' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét cong kín cao 2 ô ly (từ y=68 đến y=112), rộng 1.5 ô ly
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 33 74 C 27 68, 17 68, 11 76 C 5 84, 5 96, 11 104 C 17 112, 27 112, 33 104 C 37 96, 37 82, 33 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'o' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      Cách chữ 1 đúng 3 ô ly (tại x=88)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 88 74 C 82 68, 72 68, 66 76 C 60 84, 60 96, 66 104 C 72 112, 82 112, 88 104 C 92 96, 92 82, 88 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. TIẾNG 'bò' THỨ BA: NÉT MỰC ĐEN LIỀN (SOLID)
                      Chữ b cao 5 ô ly (thân sổ x=143), nối sang o cao 2 ô ly + dấu huyền \
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ b cao 5 ô ly */}
                    <path
                      d="M 132 90 L 143 68 C 149 54, 158 32, 158 18 C 158 7, 154 3, 149 3 C 145 3, 143 6, 143 12 L 143 98 C 143 107, 148 112, 154 112 C 161 112, 165 104, 165 86 C 165 76, 161 68, 156 68 C 152 68, 151 72, 155 72 C 159 72, 164 72, 171 80"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ o nối từ nét thắt của b */}
                    <path
                      d="M 193 74 C 187 68, 177 68, 171 76 C 165 84, 165 96, 171 104 C 177 112, 187 112, 193 104 C 197 96, 197 82, 193 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu huyền \ trên đầu chữ o */}
                    <path
                      d="M 177 56 L 185 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. TIẾNG 'cỏ' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      Chữ c cao 2 ô ly, dừng tại x=220, y=90 nối liền mép trái của chữ o
                      Dấu hỏi ? trên đầu chữ o
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ c: cao 2 ô ly, dừng bút ở ĐK 2 tại x=220, y=90 */}
                    <path
                      d="M 215 74 C 210 68, 196 68, 190 76 C 183 84, 183 96, 190 104 C 196 112, 210 112, 217 104 C 219 101, 220 95, 220 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ o: chạm liền mép trái với điểm dừng của c */}
                    <path
                      d="M 242 74 C 236 68, 226 68, 220 76 C 214 84, 214 96, 220 104 C 226 112, 236 112, 242 104 C 246 96, 246 82, 242 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu hỏi ? trên đầu chữ o: nét móc nhỏ và chấm */}
                    <path
                      d="M 229 55 C 229 52, 232 50, 234 50 C 237 50, 239 52, 239 55 C 239 58, 235 60, 234 62 L 234 64"
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
           TRANG 25: MỤC 4 (ĐỌC CÂU "Bê có cỏ.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "CHÀO HỎI")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bê có cỏ.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bê có cỏ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bê có cỏ."</span>
              </button>
            </div>

            {/* Three cute calves eating fresh grass in wooden pen matching textbook Page 25 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Calves in wooden pen */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-7xl drop-shadow-md">🐂</span>
                      <span className="text-[11px] font-bold text-emerald-900 mt-1">Bê nâu</span>
                    </div>
                    <div className="flex flex-col items-center animate-bounce-slow">
                      <span className="text-6xl drop-shadow-md">🌾🌱</span>
                      <span className="text-[11px] font-bold text-emerald-800 mt-1">Bó cỏ non</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-7xl drop-shadow-md">🦮</span>
                      <span className="text-[11px] font-bold text-emerald-900 mt-1">Bê vàng</span>
                    </div>
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold shadow-xs border border-emerald-300">
                    Chuồng gỗ rào thưa đầy ắp cỏ xanh
                  </span>
                </div>

                {/* The Reading Sentence: "Bê có cỏ." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-md mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex items-center justify-center gap-5 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bê')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Bê
                    </button>
                    <button
                      onClick={() => handleSpeak('có')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      có
                    </button>
                    <button
                      onClick={() => handleSpeak('cỏ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      cỏ.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Những chú bê con ngoan ngoãn được ăn cỏ non xanh mát!
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
                onClick={() => handleSpeak('Chủ đề nói: Chào hỏi lễ phép. Khi đến trường, bé tươi cười chào mẹ: Con chào mẹ con vào lớp ạ! Khi đi học về, bé khoanh tay chào ông bà: Cháu chào ông bà, cháu mới đi học về ạ!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát hai bức tranh dưới đây: Bạn nhỏ chào mẹ như thế nào khi đến cổng trường? Khi đi học về nhà, bạn nhỏ khoanh tay chào ông bà ra sao? Bé chào hỏi bố mẹ, ông bà mỗi ngày thế nào?
            </p>

            {/* 2 Scenes matching Textbook Page 25: School gate greeting & Home family greeting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              {/* TRANH 1: BÉ ĐẾN TRƯỜNG TIỂU HỌC LÊ QUÝ ĐÔN CHÀO MẸ */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <h4 className="font-kid font-bold text-sm text-slate-900">
                      Bé chào mẹ ở cổng trường
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                    Trường Tiểu học Lê Quý Đôn
                  </span>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 via-rose-50 to-emerald-50 flex flex-col items-center justify-center p-4 text-center border border-sky-200/60 shadow-inner">
                  <div className="flex items-center justify-center gap-6 mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👦🎒</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Bé vẫy tay chào</span>
                    </div>
                    <span className="text-3xl">👋</span>
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👩🌸</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Mẹ vẫy tay tạm biệt</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-950 bg-white/90 px-3 py-1 rounded-full shadow-2xs">
                    "Con chào mẹ, con vào lớp học ạ!"
                  </p>
                </div>

                <button
                  onClick={() => handleSpeak('Tranh một: Khi đến cổng trường, bé tươi cười giơ hai tay chào mẹ: Con chào mẹ con vào lớp ạ! Mẹ mỉm cười dặn dò bé chăm ngoan học giỏi.')}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nghe lời chào ở cổng trường</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* TRANH 2: BÉ ĐI HỌC VỀ KHOANH TAY CHÀO ÔNG BÀ */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <h4 className="font-kid font-bold text-sm text-slate-900">
                      Bé đi học về chào ông bà
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    Phòng khách ấm cúng
                  </span>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-amber-100 via-rose-50 to-orange-50 flex flex-col items-center justify-center p-4 text-center border border-amber-200/60 shadow-inner">
                  <div className="flex items-center justify-center gap-6 mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👦🎒</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Bé khoanh tay</span>
                    </div>
                    <span className="text-3xl">🙇‍♂️</span>
                    <div className="flex flex-col items-center">
                      <span className="text-6xl drop-shadow-sm">👴👵</span>
                      <span className="text-[10px] font-bold text-slate-700 mt-1">Ông bà vui mừng</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-amber-950 bg-white/90 px-3 py-1 rounded-full shadow-2xs">
                    "Cháu chào ông bà, cháu mới đi học về ạ!"
                  </p>
                </div>

                <button
                  onClick={() => handleSpeak('Tranh hai: Khi đi học về nhà, bé đứng nghiêm trang, khoanh hai tay trước ngực lễ phép thưa: Cháu chào ông bà, cháu mới đi học về ạ! Ông bà vui vẻ khen bé ngoan.')}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nghe lời chào ông bà khi về nhà</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
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
                    "Đi thưa về gửi" là nét đẹp của người con ngoan, trò giỏi!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé thật là một em bé ngoan và lễ phép! Biết chào hỏi người lớn sẽ được tất cả mọi người yêu quý!');
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

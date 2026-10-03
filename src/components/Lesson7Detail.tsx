import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson7DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson7Detail: React.FC<Lesson7DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page26' | 'page27'>('page26');
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
      {/* Page Tabs Header: Trang 26 & Trang 27 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page26')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page26'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 26: Nhận biết, Đọc & Viết Ô ô, Dấu nặng ( . )</span>
          </button>
          <button
            onClick={() => setActiveTab('page27')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page27'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🚗 Trang 27: Đọc "Bố bê bể cá." & Nói "Xe cộ"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 7! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page26' ? (
        /* =========================================================================
           TRANG 26: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 7: Ô ô   . */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">7</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và dấu thanh
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-4">
                  <span>Ô</span>
                  <span className="text-emerald-200">ô</span>
                  <span className="text-amber-300 text-5xl leading-none">.</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài bảy: Ô in hoa, ô in thường, dấu nặng. Âm ô, dấu nặng.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm Ô ô, dấu nặng</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Bố và Hà đi bộ trên hè phố.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bố và Hà đi bộ trên hè phố.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Dad and Ha walking on sidewalk of peaceful Hanoi street */}
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50 p-6 border border-amber-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Street scene elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👨‍👧</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bố dắt tay bé Hà đi dạo
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-5xl drop-shadow-md">📷🏛️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-rose-300">
                      Phố cổ ngói vàng
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-5xl drop-shadow-md">🚶‍♂️🌳</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Hè phố râm mát
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-amber-200/80">
                  <span>🏪 Cửa hàng tạp hóa</span>
                  <span>📷 Nhiếp ảnh gia chụp ảnh</span>
                  <span>🌳 Tán cây xanh rợp bóng hè phố</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Bố và Hà đi bộ trên hè phố." with red 'ố' and 'ộ' */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">ố, ộ</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Bố')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    B<span className="text-rose-600 font-black">ố</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('và')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    và
                  </button>
                  <button
                    onClick={() => handleSpeak('Hà')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Hà
                  </button>
                  <button
                    onClick={() => handleSpeak('đi')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    đi
                  </button>
                  <button
                    onClick={() => handleSpeak('bộ')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    b<span className="text-rose-600 font-black">ộ</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('trên')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    trên
                  </button>
                  <button
                    onClick={() => handleSpeak('hè')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    hè
                  </button>
                  <button
                    onClick={() => handleSpeak('phố')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    ph<span className="text-rose-600 font-black">ố</span>.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 26) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm ô và dấu nặng. Âm ô. bờ - ô - bô - sắc - bố. bố. bờ - ô - bô - nặng - bộ. bộ. bố, bổ, bộ, cô, cổ, cộ. bố, cô bé, cổ cò.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Top letter 'Ô' branching to 'bố' and 'bộ' */}
            <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-200/80 max-w-lg mx-auto flex flex-col items-center space-y-3">
              {/* Top sound 'Ô' in red */}
              <button
                onClick={() => handleSpeak('ô')}
                className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title="Bấm để nghe âm ô"
              >
                <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                  Ô
                </span>
                <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                  ô
                </span>
              </button>

              {/* Connecting Branching Tree Lines */}
              <div className="w-56 h-5 relative flex items-center justify-center">
                <div className="absolute top-0 w-44 h-4 border-t-2 border-l-2 border-r-2 border-sky-300 rounded-t-xs" />
                <div className="w-0.5 h-2 bg-sky-300 -mt-3" />
              </div>

              {/* Two Column Phonics Models: 'bố' and 'bộ' */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-md pt-1">
                {/* CỘT 1: TIẾNG 'bố' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ b | ô ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('bờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm bờ"
                    >
                      b
                    </button>
                    <button
                      onClick={() => handleSpeak('ô')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm ô"
                    >
                      ô
                    </button>
                  </div>

                  {/* Ô dưới: [ bố ] */}
                  <button
                    onClick={() => handleSpeak('bờ - ô - bô - sắc - bố. bố.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: bờ - ô - bô - sắc - bố. bố."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal">
                      <span className="text-slate-900">b</span>
                      <span className="text-rose-600">ố</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('bờ - ô - bô - sắc - bố.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    bờ - ô - bô - sắc - bố
                  </button>
                </div>

                {/* CỘT 2: TIẾNG 'bộ' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ b | ô ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('bờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm bờ"
                    >
                      b
                    </button>
                    <button
                      onClick={() => handleSpeak('ô')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm ô"
                    >
                      ô
                    </button>
                  </div>

                  {/* Ô dưới: [ bộ ] */}
                  <button
                    onClick={() => handleSpeak('bờ - ô - bô - nặng - bộ. bộ.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: bờ - ô - bô - nặng - bộ. bộ."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal flex items-center justify-center">
                      <span className="text-slate-900">b</span>
                      <span className="text-rose-600 font-sans">ộ</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('bờ - ô - bô - nặng - bộ.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    bờ - ô - bô - nặng - bộ
                  </button>
                </div>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 26: bố bổ bộ - cô cổ cộ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('bố')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bố</button>
                  <button onClick={() => handleSpeak('bổ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bổ</button>
                  <button onClick={() => handleSpeak('bộ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">bộ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('cô')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cô</button>
                  <button onClick={() => handleSpeak('cổ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cổ</button>
                  <button onClick={() => handleSpeak('cộ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cộ</button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 26: "bố", "cô bé", "cổ cò" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Bố dắt bé -> 'bố' */}
              <button
                onClick={() => handleSpeak('bờ - ô - bô - sắc - bố. bố.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    👨‍👦
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">bố</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Bố dắt tay bé</span>
              </button>

              {/* Image 2: Cô bé xinh xắn -> 'cô bé' */}
              <button
                onClick={() => handleSpeak('cô bé')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    👧🎀
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">cô bé</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Cô bé váy xanh</span>
              </button>

              {/* Image 3: Cổ con cò -> 'cổ cò' */}
              <button
                onClick={() => handleSpeak('cổ cò')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🦢🔍
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">cổ cò</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chiếc cổ thon dài của chú cò</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 26)
              Dải kẻ 5 ô ly chuẩn: ô (chấm), ô (liền), cổ cò (liền)
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
                  onClick={() => handleSpeak('Cách viết chữ ô: Viết chữ o là nét cong kín cao 2 ô ly, sau đó lia bút lên trên đầu chữ o viết dấu mũ gồm hai nét xiên ngắn chụm ở đỉnh cân đối giữa đường kẻ 3 và đường kẻ 4.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ ô"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ ô</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ cổ cò: Viết chữ c cao 2 ô ly nối liền chạm sang chữ ô cao 2 ô ly, dấu hỏi đặt trên đỉnh dấu mũ. Cách một khoảng 1 ô ly, viết tiếp chữ c nối sang chữ o, dấu huyền trên đầu chữ o.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết cổ cò"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết cụm từ cổ cò</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">ô</span>
                  <span>Chữ ô (Chữ o + Dấu mũ ^)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ o nét cong kín cao 2 ô ly, rộng 1.5 ô ly. Lia bút lên giữa ĐK 3 và ĐK 4 viết dấu mũ gồm hai nét xiên ngắn: xiên lên từ trái sang phải, xiên xuống từ trái sang phải, chụm ở đỉnh cân đối.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">cổ cò</span>
                  <span>Cụm từ "cổ cò"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Tiếng cổ:</strong> Chữ c cao 2 ô ly nối liền sang chữ ô, dấu mũ ^ và dấu hỏi trên đỉnh mũ.<br />
                  <strong>Tiếng cò:</strong> Cách 1 khoảng 1 ô ly, viết chữ c nối sang chữ o, dấu huyền trên đầu chữ o.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 26 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 26: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page26" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page26)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ ô, c, o - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'ô' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét cong kín cao 2 ô ly + dấu mũ ^ nét chấm mờ
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
                    {/* Dấu mũ ^ chấm mờ */}
                    <path
                      d="M 17 64 L 22 56 L 27 64"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'ô' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
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
                    {/* Dấu mũ ^ nét liền */}
                    <path
                      d="M 72 64 L 77 56 L 82 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CỤM TỪ 'cổ cò' THỨ BA: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng 'cổ': chữ c nối ô + dấu mũ ^ + dấu hỏi ?
                      Tiếng 'cò': cách 1 ô ly, chữ c nối o + dấu huyền \
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG CỔ: Chữ c cao 2 ô ly, dừng ở ĐK 2 tại x=143, y=90 */}
                    <path
                      d="M 138 74 C 133 68, 119 68, 113 76 C 106 84, 106 96, 113 104 C 119 112, 133 112, 140 104 C 142 101, 143 95, 143 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ô của tiếng cổ: chạm liền mép trái với c */}
                    <path
                      d="M 165 74 C 159 68, 149 68, 143 76 C 137 84, 137 96, 143 104 C 149 112, 159 112, 165 104 C 169 96, 169 82, 165 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ trên đầu ô */}
                    <path
                      d="M 149 64 L 154 56 L 159 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu hỏi ? đặt ngay ngắn trên đỉnh dấu mũ ^ */}
                    <path
                      d="M 152 49 C 152 46, 154 44, 156 44 C 158 44, 160 46, 160 49 C 160 52, 156 53, 155 55 L 155 56"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG CÒ: Chữ c cao 2 ô ly, dừng ở x=197, y=90 */}
                    <path
                      d="M 192 74 C 187 68, 173 68, 167 76 C 160 84, 160 96, 167 104 C 173 112, 187 112, 194 104 C 196 101, 197 95, 197 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ o của tiếng cò: chạm liền mép trái với c */}
                    <path
                      d="M 219 74 C 213 68, 203 68, 197 76 C 191 84, 191 96, 197 104 C 203 112, 213 112, 219 104 C 223 96, 223 82, 219 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu huyền \ trên đầu chữ o */}
                    <path
                      d="M 203 56 L 211 64"
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
           TRANG 27: MỤC 4 (ĐỌC CÂU "Bố bê bể cá.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "XE CỘ")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bố bê bể cá.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bố bê bể cá.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Bố bê bể cá."</span>
              </button>
            </div>

            {/* Dad carrying aquarium with goldfish, kid cheering joyfully matching textbook Page 27 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-amber-50 to-orange-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Dad carrying fish tank */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👨‍🦰</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bố bê chiếc bể cá
                    </span>
                  </div>

                  {/* Fish tank with goldfish and seaweed */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🐠🫧🌿</span>
                    <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-900 text-[11px] font-bold mt-1 shadow-xs">
                      Bể cá vàng trong vắt
                    </span>
                  </div>

                  {/* Kid cheering */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👦🙌</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Bé vui mừng reo hò
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Bố bê bể cá." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-md mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Bố')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      Bố
                    </button>
                    <button
                      onClick={() => handleSpeak('bê')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      bê
                    </button>
                    <button
                      onClick={() => handleSpeak('bể')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      bể
                    </button>
                    <button
                      onClick={() => handleSpeak('cá')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      cá.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bố cẩn thận bê chiếc bể cá vàng lung linh đặt cạnh cửa sổ phòng khách!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: XE CỘ) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Xe cộ
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Xe cộ. Trong tranh có chiếc xe đạp màu đỏ có giỏ xe, chiếc xe máy màu xanh dương và chiếc xe ô tô con bốn bánh màu đỏ. Khi đi đường, chúng mình phải chú ý an toàn giao thông nhé!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh 3 loại xe dưới đây: Bức tranh vẽ những loại xe cộ nào? Mỗi loại xe có đặc điểm và màu sắc gì? Hằng ngày bố mẹ đưa bé đến trường bằng phương tiện gì?
            </p>

            {/* 3 Vehicles matching Textbook Page 27: Bicycle, Motorbike, Red Car */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
              {/* PHƯƠNG TIỆN 1: XE ĐẠP */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Chiếc xe đạp
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-sky-100 to-emerald-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🚲</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Xe đạp đỏ có giỏ xe trắng
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Xe đạp là phương tiện có hai bánh, chạy bằng sức đạp của chân. Xe đạp màu đỏ có giỏ xe mây trắng phía trước rất tiện lợi!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu về xe đạp</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* PHƯƠNG TIỆN 2: XE MÁY */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Chiếc xe máy
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-sky-100 to-indigo-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🛵</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Xe máy màu xanh dương
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Xe máy là phương tiện chạy bằng động cơ xăng hoặc điện. Khi ngồi trên xe máy, chúng mình phải nhớ đội mũ bảo hiểm an toàn nhé!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu về xe máy</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>

              {/* PHƯƠNG TIỆN 3: XE Ô TÔ */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Chiếc xe ô tô
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-rose-100 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-rose-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🚗</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Ô tô con 4 chỗ màu đỏ tươi
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Xe ô tô là phương tiện bốn bánh có mui che nắng mưa. Khi ngồi trên ô tô, bé nhớ cài dây an toàn và không thò đầu hay tay ra ngoài cửa sổ!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-xs font-bold text-rose-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu về ô tô</span>
                  <Volume2 className="w-4 h-4 text-rose-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy kể về loại xe cộ bé yêu thích!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bé thích đi xe đạp quanh công viên, đi xe máy cùng mẹ hay ngồi trên ô tô?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé trả lời rất hay! Khi tham gia giao thông trên bất kỳ loại xe nào, chúng mình luôn phải chấp hành luật an toàn giao thông nhé!');
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

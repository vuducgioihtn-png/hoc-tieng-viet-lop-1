import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson22DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson22Detail: React.FC<Lesson22DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page56' | 'page57'>('page56');
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
      {/* Page Tabs Header: Trang 56 & Trang 57 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page56')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page56'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 56: Nhận biết, Đọc & Viết T t, Tr tr</span>
          </button>
          <button
            onClick={() => setActiveTab('page57')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page57'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🐟 Trang 57: Đọc "Hà tả hồ cá." & Nói "Bảo vệ môi trường"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 22! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page56' ? (
        /* =========================================================================
           TRANG 56: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 22: T t   Tr tr */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">22</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và chữ ghép
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>T t</span>
                  <span className="text-emerald-200">Tr tr</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài hai mươi hai: T in hoa, t in thường, Tr in hoa, tr in thường. Âm tờ, âm trờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm T t, Tr tr</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Nam tô bức tranh cây tre.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Nam tô bức tranh cây tre.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Nam coloring a drawing of a bamboo tree */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👦🎨</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bạn Nam chăm chỉ tô màu
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🖼️🎋☀️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Bức tranh cây tre và mặt trời
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🪟📚✏️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Bàn học cạnh cửa sổ sáng sủa
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🎨 Bạn Nam khéo tay tô màu bức tranh sinh động</span>
                  <span>🎋 Cây tre xanh mát biểu tượng quê hương Việt Nam</span>
                  <span>🪟 Góc học tập ngăn nắp, tràn ngập ánh sáng</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Nam tô bức tranh cây tre." with red t, tr, tr */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">t, tr</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button onClick={() => handleSpeak('Nam')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">Nam</button>
                  <button onClick={() => handleSpeak('tờ - ô - tô. tô.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">t</span>ô
                  </button>
                  <button onClick={() => handleSpeak('bức')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">bức</button>
                  <button onClick={() => handleSpeak('trờ - anh - tranh. tranh.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">tr</span>anh
                  </button>
                  <button onClick={() => handleSpeak('cây')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">cây</button>
                  <button onClick={() => handleSpeak('trờ - e - tre. tre.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">tr</span>e.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 56) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm tờ và âm trờ. Âm tờ: tờ - ô - tô. tô. Âm trờ: trờ - e - tre. tre. tá, tạ, tẻ, trê, trò, trổ. ô tô, sư tử, cá trê, tre ngà.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 't' and 'tr' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 't' & TIẾNG 'tô' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 't' in red */}
                <button
                  onClick={() => handleSpeak('tờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm tờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    t
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm tờ
                  </span>
                </button>

                {/* Ô trên: [ t | ô ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('tờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm tờ"
                  >
                    t
                  </button>
                  <button
                    onClick={() => handleSpeak('ô')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ô"
                  >
                    ô
                  </button>
                </div>

                {/* Ô dưới: [ tô ] */}
                <button
                  onClick={() => handleSpeak('tờ - ô - tô. tô.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: tờ - ô - tô. tô."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">t</span>
                    <span className="text-slate-900">ô</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('tờ - ô - tô.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  tờ - ô - tô
                </button>
              </div>

              {/* CỘT 2: ÂM 'tr' & TIẾNG 'tre' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'tr' in red */}
                <button
                  onClick={() => handleSpeak('trờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm trờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    tr
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm trờ (uốn lưỡi)
                  </span>
                </button>

                {/* Ô trên: [ tr | e ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('trờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm trờ"
                  >
                    tr
                  </button>
                  <button
                    onClick={() => handleSpeak('e')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm e"
                  >
                    e
                  </button>
                </div>

                {/* Ô dưới: [ tre ] */}
                <button
                  onClick={() => handleSpeak('trờ - e - tre. tre.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: trờ - e - tre. tre."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">tr</span>
                    <span className="text-slate-900">e</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('trờ - e - tre.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  trờ - e - tre
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 56: tá tạ tẻ - trê trò trổ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('tá')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">tá</button>
                  <button onClick={() => handleSpeak('tạ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">tạ</button>
                  <button onClick={() => handleSpeak('tẻ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">tẻ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('trê')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">trê</button>
                  <button onClick={() => handleSpeak('trò')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">trò</button>
                  <button onClick={() => handleSpeak('trổ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">trổ</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 56: "ô tô", "sư tử", "cá trê", "tre ngà" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Ô tô đỏ -> 'ô tô' */}
              <button
                onClick={() => handleSpeak('ô tô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🚗❤️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">ô tô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Chiếc xe ô tô đỏ</span>
              </button>

              {/* Image 2: Sư tử -> 'sư tử' */}
              <button
                onClick={() => handleSpeak('sư tử')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🦁👑
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">sư tử</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Chúa tể sơn lâm oai vệ</span>
              </button>

              {/* Image 3: Con cá trê -> 'cá trê' */}
              <button
                onClick={() => handleSpeak('cá trê')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🐟🫧
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">cá trê</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cá trê da trơn râu dài</span>
              </button>

              {/* Image 4: Tre ngà -> 'tre ngà' */}
              <button
                onClick={() => handleSpeak('tre ngà')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🎋✨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">tre ngà</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Bụi tre ngà thân vàng</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 56)
              Dải kẻ 5 ô ly chuẩn: t (chấm), t (liền), tr (chấm), tr (liền), ô tô, cá trê
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
                  onClick={() => handleSpeak('Cách viết chữ t: Chữ t cao đúng 3 ô ly. Bắt đầu từ đường kẻ 2, viết nét hất lên đường kẻ 3. Sau đó lia bút lên đường kẻ 4, viết nét móc ngược dài 3 ô ly xuống đường kẻ 1 rồi uốn lên dừng ở đường kẻ 2. Cuối cùng lia bút viết nét gạch ngang ngắn ở đường kẻ 3.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ t"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ t</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ tr: Viết chữ t cao 3 ô ly dừng ở đường kẻ 2, sau đó lia bút lượn nét xiên lên vượt qua đường kẻ 3 một chút để viết chữ r, thắt nút nhỏ ở đỉnh rồi viết nét móc ngược dừng ở đường kẻ 2. Lia bút viết nét gạch ngang chữ t ở đường kẻ 3.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ tr"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ tr</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ ô tô và cá trê: Cụm từ ô tô: viết chữ ô cao 2 ô ly, cách 1 ô ly viết chữ t cao 3 ô ly nối sang chữ ô. Cụm từ cá trê: chữ c nối sang a có dấu sắc, cách 1 ô ly viết chữ tr nối sang chữ ê có dấu mũ.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết ô tô, cá trê"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết ô tô, cá trê</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">t tr</span>
                  <span>Chữ t (cao 3 ô ly) và Chữ ghép tr</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ t:</strong> Nét hất (từ ĐK 2 lên ĐK 3) + Nét móc ngược (từ ĐK 4 xuống ĐK 1 uốn lên ĐK 2) + Nét gạch ngang ở ĐK 3. Chiều cao đúng 3 ô ly.<br />
                  <strong>Chữ tr:</strong> Chữ t cao 3 ô ly dừng ở ĐK 2 nối liền sang nét chữ r (thắt nút vượt ĐK 3).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">ô tô cá trê</span>
                  <span>Cụm từ "ô tô" và "cá trê"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>ô tô:</strong> Tiếng ô (cao 2 ô ly), cách 1 ô ly viết tiếng tô (t cao 3 ô ly nối ô).<br />
                  <strong>cá trê:</strong> Tiếng cá (c nối a + dấu sắc), cách 1 ô ly viết tiếng trê (tr nối ê).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 56 OF TEXTBOOK */}
            <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                <defs>
                  <pattern id="oli-grid-page56" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                  </pattern>
                </defs>

                {/* Fill background with 22px dotted grid */}
                <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page56)" />

                {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                {/* Đường kẻ 5: y = 24 */}
                <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 4 (Đỉnh chữ t cao đúng 3 ô ly): y = 46 */}
                <line x1="0" y1="46" x2="100%" y2="46" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="3 3" />

                {/* Đường kẻ 3 (đỉnh chữ a, ô, e cao 2 ô ly): y = 68 */}
                <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                {/* Đường kẻ 2 (độ cao 1 ô ly - điểm bắt đầu nét hất và điểm dừng bút): y = 90 */}
                <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                {/* Viền trái phải */}
                <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                {/* ==============================================================
                    1. CHỮ 't' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                    Cao 3 ô ly: từ ĐK 2 lên ĐK 3, rồi từ ĐK 4 xuống ĐK 1 uốn lên ĐK 2 + gạch ngang
                    ============================================================== */}
                <g fill="none">
                  {/* Nét hất */}
                  <path
                    d="M 16 90 L 25 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  {/* Nét móc ngược cao 3 ô ly */}
                  <path
                    d="M 25 46 L 25 104 C 25 112, 29 112, 35 112 C 39 112, 42 104, 44 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Nét gạch ngang ở ĐK 3 */}
                  <path
                    d="M 18 68 L 32 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                </g>

                {/* ==============================================================
                    2. CHỮ 't' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 64 90 L 73 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 73 46 L 73 104 C 73 112, 77 112, 83 112 C 87 112, 90 104, 92 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 66 68 L 80 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>

                {/* ==============================================================
                    3. CHỮ GHÉP 'tr' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                    Chữ t cao 3 ô ly nối chữ r (thắt nút vượt ĐK 3)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 112 90 L 121 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 121 46 L 121 104 C 121 112, 125 112, 131 112 C 134 112, 137 106, 138 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 114 68 L 128 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  {/* Nối chữ r từ y=90 */}
                  <path
                    d="M 138 90 C 142 76, 147 68, 149 63 C 151 58, 156 58, 154 65 L 167 65 L 167 104 C 167 112, 171 112, 177 112 C 181 112, 184 104, 186 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    4. CHỮ GHÉP 'tr' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 204 90 L 213 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 213 46 L 213 104 C 213 112, 217 112, 223 112 C 226 112, 229 106, 230 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 206 68 L 220 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 230 90 C 234 76, 239 68, 241 63 C 243 58, 248 58, 246 65 L 259 65 L 259 104 C 259 112, 263 112, 269 112 C 273 112, 276 104, 278 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    5. CỤM TỪ 'ô tô' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng ô: chữ ô cao 2 ô ly + dấu mũ ^
                    Tiếng tô: t cao 3 ô ly nối ô + dấu mũ ^
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG Ô */}
                  <path
                    d="M 324 74 C 318 68, 308 68, 302 76 C 296 84, 296 96, 302 104 C 308 112, 318 112, 324 104 C 328 96, 328 82, 324 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 310 64 L 314 56 L 318 64"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG TÔ: t cao 3 ô ly nối ô */}
                  <path
                    d="M 346 90 L 355 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 355 46 L 355 104 C 355 112, 359 112, 365 112 C 369 112, 372 104, 374 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 348 68 L 362 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ ô nối từ t */}
                  <path
                    d="M 400 74 C 394 68, 384 68, 378 76 C 372 84, 372 96, 378 104 C 384 112, 394 112, 400 104 C 404 96, 404 82, 400 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 386 64 L 390 56 L 394 64"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    6. CỤM TỪ 'cá trê' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng cá: c nối a + dấu sắc /
                    Tiếng trê: tr nối ê + dấu mũ ^
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG CÁ */}
                  <path
                    d="M 444 76 C 440 70, 431 70, 426 78 C 421 86, 421 98, 426 106 C 431 112, 440 112, 445 106 C 447 103, 449 98, 449 92"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ a nối từ c */}
                  <path
                    d="M 474 74 C 468 68, 458 68, 452 76 C 446 84, 446 96, 452 104 C 458 112, 468 112, 474 104 C 478 96, 478 82, 474 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 474 68 L 474 104 C 474 112, 478 112, 485 112 C 490 112, 494 104, 496 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 468 54 L 462 60"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG TRÊ: tr nối ê */}
                  <path
                    d="M 520 90 L 529 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 529 46 L 529 104 C 529 112, 533 112, 539 112 C 542 112, 545 106, 546 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 522 68 L 536 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ r */}
                  <path
                    d="M 546 90 C 550 76, 555 68, 557 63 C 559 58, 564 58, 562 65 L 575 65 L 575 104 C 575 112, 579 112, 585 112 C 588 112, 591 106, 592 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ ê nối từ r */}
                  <path
                    d="M 592 90 C 596 82, 601 80, 605 80 C 609 80, 611 84, 605 87 C 598 90, 600 96, 605 96 C 609 96, 612 92, 614 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 602 70 L 606 64 L 610 70"
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
           TRANG 57: MỤC 4 (ĐỌC CÂU "Hà tả hồ cá...") VÀ MỤC 5 (NÓI CHỦ ĐỀ "BẢO VỆ MÔI TRƯỜNG")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Hà tả hồ cá. Hồ to, có cá mè, cá trê, cá rô.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Hà tả hồ cá. Hồ to, có cá mè, cá trê, cá rô.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc toàn bộ câu</span>
              </button>
            </div>

            {/* Ha describing the big fish pond to teacher matching textbook Page 57 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-teal-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Ha and Teacher on stone bench */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👧👩‍🏫</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Hà trò chuyện cùng cô giáo
                    </span>
                  </div>

                  {/* Fish pond bubble */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🫧🐟🐠✨</span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[11px] font-bold mt-1 shadow-xs">
                      Hồ to có cá mè, cá trê, cá rô
                    </span>
                  </div>

                  {/* Green school yard */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🏫🌳🪑</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Ghế đá sân trường râm mát
                    </span>
                  </div>
                </div>

                {/* The Reading Sentences: "Hà tả hồ cá. Hồ to, có cá mè, cá trê, cá rô." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2 space-y-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button onClick={() => handleSpeak('Hà')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Hà</button>
                    <button onClick={() => handleSpeak('tả')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">tả</button>
                    <button onClick={() => handleSpeak('hồ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">hồ</button>
                    <button onClick={() => handleSpeak('cá')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cá.</button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900 pt-1 border-t border-slate-100">
                    <button onClick={() => handleSpeak('Hồ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Hồ</button>
                    <button onClick={() => handleSpeak('to')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">to,</button>
                    <button onClick={() => handleSpeak('có')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">có</button>
                    <button onClick={() => handleSpeak('cá')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cá</button>
                    <button onClick={() => handleSpeak('mè')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">mè,</button>
                    <button onClick={() => handleSpeak('cá')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cá</button>
                    <button onClick={() => handleSpeak('trê')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">trê,</button>
                    <button onClick={() => handleSpeak('cá')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cá</button>
                    <button onClick={() => handleSpeak('rô')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">rô.</button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bé Hà say sưa kể cho cô giáo nghe về vẻ đẹp trù phú của hồ cá quê em!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: BẢO VỆ MÔI TRƯỜNG) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Nói</h3>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                    Chủ đề: Bảo vệ môi trường (Ý thức giữ gìn đại dương xanh)
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Bảo vệ môi trường. Bốn bức tranh kể về chuyến đi du lịch biển: Tranh một: Gia đình ngắm biển trên tàu. Tranh hai: Một người vứt chai nhựa xuống biển. Tranh ba: Chú cá heo thông minh ngậm chai nhựa nhảy lên. Tranh bốn: Rác thải nhựa làm cá heo bị thương và dạt vào bờ cát mắc cạn. Chúng mình hãy luôn có ý thức bỏ rác đúng nơi quy định, không xả rác xuống sông ngòi, biển cả để bảo vệ các loài sinh vật biển nhé!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe cô giáo kể 4 bức tranh</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát 4 bức tranh: Điều gì đã xảy ra khi người trên tàu vứt chai nhựa xuống biển? Chú cá heo đã làm gì và hậu quả của việc xả rác bừa bãi là gì? Em cần làm gì để bảo vệ môi trường?
            </p>

            {/* 4 TRANH LIÊN HOÀN THEO ĐÚNG SGK TRANG 57 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* TRANH 1 */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Ngắm cảnh biển trên boong tàu
                  </h4>
                </div>
                <div className="h-36 rounded-2xl bg-gradient-to-b from-sky-100 to-teal-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🚢🌊👦🔭</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Biển trời bao la xanh ngắt
                  </span>
                </div>
                <button
                  onClick={() => handleSpeak('Tranh một: Cả nhà cùng đi du lịch ngắm cảnh biển tươi đẹp trên con tàu du lịch lớn.')}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu tranh 1</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>

              {/* TRANH 2 */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Người vứt rác xuống biển
                  </h4>
                </div>
                <div className="h-36 rounded-2xl bg-gradient-to-b from-rose-50 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-rose-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🚢🚮🌊🍶</span>
                  <span className="text-[11px] font-bold text-rose-800">
                    Hành động xấu làm bẩn biển
                  </span>
                </div>
                <button
                  onClick={() => handleSpeak('Tranh hai: Một người trên tàu thiếu ý thức đã tiện tay vứt chiếc chai nhựa xuống làn nước biển.')}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-xs font-bold text-rose-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu tranh 2</span>
                  <Volume2 className="w-4 h-4 text-rose-600" />
                </button>
              </div>

              {/* TRANH 3 */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Cá heo ngậm chai nhựa
                  </h4>
                </div>
                <div className="h-36 rounded-2xl bg-gradient-to-b from-teal-100 to-sky-50 flex flex-col items-center justify-center p-3 text-center border border-emerald-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🐬🌊🍶✨</span>
                  <span className="text-[11px] font-bold text-emerald-800">
                    Chú cá heo thông minh
                  </span>
                </div>
                <button
                  onClick={() => handleSpeak('Tranh ba: Dưới biển sâu, chú cá heo thông minh ngậm chiếc chai nhựa nhảy vọt lên khỏi mặt nước.')}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu tranh 3</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* TRANH 4 */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                    4
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Cá heo bị mắc cạn
                  </h4>
                </div>
                <div className="h-36 rounded-2xl bg-gradient-to-b from-amber-100 to-orange-50 flex flex-col items-center justify-center p-3 text-center border border-amber-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🐬🏖️😢</span>
                  <span className="text-[11px] font-bold text-amber-900">
                    Hậu quả nghiêm trọng của rác thải
                  </span>
                </div>
                <button
                  onClick={() => handleSpeak('Tranh bốn: Do nuốt phải rác nhựa ô nhiễm, chú cá heo bị kiệt sức và trôi dạt vào bờ cát mắc cạn. Chúng mình hãy chung tay bảo vệ môi trường biển nhé!')}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu tranh 4</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy nêu việc làm của mình để bảo vệ môi trường:
                  </h5>
                  <p className="text-emerald-800">
                    Bỏ rác đúng nơi quy định, không vứt rác xuống sông hồ, hạn chế đồ nhựa dùng một lần và chăm sóc cây xanh!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé có ý thức bảo vệ môi trường rất đáng khen ngợi! Cùng nhau giữ gìn hành tinh xanh nhé!');
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
                    <span>Nói về bảo vệ môi trường</span>
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

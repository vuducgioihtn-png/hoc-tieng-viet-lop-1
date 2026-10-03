import React, { useState, useRef } from 'react';
import { Volume2, Play, Sparkles, RotateCcw, Check, CheckCircle2, ChevronRight, MessageSquare, Award } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson3DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson3Detail: React.FC<Lesson3DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page18' | 'page19'>('page18');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
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
      {/* Page Tabs Header: Trang 18 & Trang 19 (Sách giáo khoa Kết nối tri thức) */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page18')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page18'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 18: Nhận biết, Đọc & Viết C c /</span>
          </button>
          <button
            onClick={() => setActiveTab('page19')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page19'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🌳 Trang 19: Đọc "A, cá." & Nói "Chào hỏi"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã học rất chăm chỉ Bài 3! Bé nhận được 1 ngôi sao!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page18' ? (
        /* =========================================================================
           TRANG 18: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 3: C c / */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">3</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và dấu thanh
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-4">
                  <span>C</span>
                  <span className="text-emerald-200">c</span>
                  <span className="text-amber-300 text-5xl font-mono leading-none">/</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài ba: C in hoa, c in thường, dấu sắc. Âm cờ, dấu sắc.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm C c /</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Nam và bố câu cá.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Nam và bố câu cá.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Nam and dad fishing */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-emerald-50 to-teal-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="absolute top-2 right-6 text-3xl animate-bounce-slow">🎣</div>
              <div className="absolute top-4 left-6 text-2xl animate-float">☀️</div>

              <div className="relative z-10 py-4 flex flex-col items-center">
                <div className="flex items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👨‍👦</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Bố và bé Nam câu cá
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-pulse-slow">
                    <span className="text-5xl">🐟🌊</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-bold mt-1 shadow-xs border border-cyan-300">
                      Cá đớp mồi bên sông
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-5xl">🪣</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Xô đựng cá màu hồng
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🌿 Bờ sông êm đềm</span>
                  <span>🌸 Hoa dại nở trắng</span>
                  <span>🧡 Tình cha con ấm áp</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Nam và bố câu cá." with red 'c' */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">c</span> được tô đỏ:
                </p>
                <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Nam')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    Nam
                  </button>
                  <button
                    onClick={() => handleSpeak('và')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    và
                  </button>
                  <button
                    onClick={() => handleSpeak('bố')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    bố
                  </button>
                  <button
                    onClick={() => handleSpeak('câu')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    <span className="text-rose-600 font-black">c</span>âu
                  </button>
                  <button
                    onClick={() => handleSpeak('cá')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    <span className="text-rose-600 font-black">c</span>á.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 18) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm cờ và dấu sắc. Âm cờ. cờ... a... ca. ca. cờ... a... ca... sắc... cá. cá. ca, cà, cá.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout */}
            <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-200/80 max-w-lg mx-auto flex flex-col items-center space-y-3">
              {/* Top sound 'c' */}
              <button
                onClick={() => handleSpeak('cờ')}
                className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title="Bấm để nghe phát âm: cờ"
              >
                <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                  c
                </span>
                <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                  cờ
                </span>
              </button>

              {/* Connecting Branching Tree Lines */}
              <div className="w-56 h-5 relative flex items-center justify-center">
                <div className="absolute top-0 w-44 h-4 border-t-2 border-l-2 border-r-2 border-sky-300 rounded-t-xs" />
                <div className="w-0.5 h-2 bg-sky-300 -mt-3" />
              </div>

              {/* Two Column Phonics Models: 'ca' and 'cá' */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-md pt-1">
                {/* CỘT 1: TIẾNG 'ca' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ c | a ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('cờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm cờ"
                    >
                      c
                    </button>
                    <button
                      onClick={() => handleSpeak('a')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm a"
                    >
                      a
                    </button>
                  </div>

                  {/* Ô dưới: [ ca ] */}
                  <button
                    onClick={() => handleSpeak('cờ... a... ca. ca.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: cờ - a - ca. ca."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal">
                      <span className="text-rose-600">c</span>
                      <span className="text-slate-900">a</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('cờ... a... ca.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    cờ - a - ca
                  </button>
                </div>

                {/* CỘT 2: TIẾNG 'cá' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ c | a ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => handleSpeak('cờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm cờ"
                    >
                      c
                    </button>
                    <button
                      onClick={() => handleSpeak('a')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm a"
                    >
                      a
                    </button>
                  </div>

                  {/* Ô dưới: [ cá ] (chữ c đỏ, chữ á đen với dấu sắc đỏ) */}
                  <button
                    onClick={() => handleSpeak('cờ... a... ca... sắc... cá. cá.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần: cờ - a - ca - sắc - cá. cá."
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal flex items-center justify-center">
                      <span className="text-rose-600">c</span>
                      <span className="text-rose-600 font-sans">á</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSpeak('cờ... a... ca... sắc... cá.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    cờ - a - ca - sắc - cá
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 18: "ca", "cà", "cá" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Ca nước inox -> 'ca' */}
              <button
                onClick={() => handleSpeak('Cái ca. ca.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🥛
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">ca</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Cái ca inox uống nước</span>
              </button>

              {/* Image 2: Quả cà tím -> 'cà' */}
              <button
                onClick={() => handleSpeak('Quả cà. cà.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-purple-50 border-2 border-slate-200 hover:border-purple-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🍆
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">cà</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Quả cà tím tươi ngon</span>
              </button>

              {/* Image 3: Con cá vàng bơi -> 'cá' */}
              <button
                onClick={() => handleSpeak('Con cá. cá.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-cyan-50 border-2 border-slate-200 hover:border-cyan-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🐟
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">cá</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-cyan-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Con cá bơi lội</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 18)
              Dải kẻ cao 2 ô ly: chữ c (chấm mờ), chữ c (mực đen), tiếng cá (mực đen)
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
                  onClick={() => handleSpeak('Cách viết chữ cờ: Đặt bút dưới đường kẻ 3 một chút, viết nét cong hở phải cao 2 ô ly, rộng một ô ly rưỡi, dừng bút ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ c"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ c</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết tiếng cá: Viết chữ cờ cao 2 ô ly, lia bút viết chữ a cao 2 ô ly nối liền kề, lia bút lên trên đầu chữ a viết dấu sắc ngắn từ trên xuống.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ cá"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết tiếng cá</span>
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

            {/* Quy trình chi tiết 2 nét chuẩn chữ c và tiếng cá */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">c</span>
                  <span>Chữ c (cao 2 ô ly, rộng 1,5 ô ly): Nét cong hở phải</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Đặt bút dưới đường kẻ ngang 3 một chút, lượn tròn cong lên chạm ĐK ngang 3, cong sang trái đè lưng chạm đường kẻ dọc, xuống chạm ĐK ngang 1 (đáy) rồi móc hất nhẹ lên, dừng bút tại ĐK ngang 2.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">cá</span>
                  <span>Tiếng cá: Chữ c nối chữ a + Dấu sắc ( / )</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ c cao 2 ô ly dừng bút ở ĐK ngang 2. Lia bút sang viết chữ a cao 2 ô ly (nét cong kín chạm nét dừng của chữ c, nét móc đè đường kẻ dọc). Đặt dấu sắc ngắn xuôi từ phải sang trái trên đầu chữ a.
                </p>
              </div>
            </div>

            {/* THE EXACT 2-Ô-LY GRID STRIP AS ON PAGE 18 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly cao đúng 2 ô ly chuẩn theo SGK Trang 18 (chiều cao = 66px, mỗi ô ly = 33px) */}
              <div className="w-full h-[76px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                {/* SVG RENDERING: LƯỚI Ô LY CHUẨN VÀ CÁC NÉT CHỮ C, C, CÁ GIỐNG HỆT TRONG SÁCH */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '76px' }}>
                  <defs>
                    {/* Uniform 22px dotted square grid pattern */}
                    <pattern id="oli-grid-page18" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill entire background with the uniform 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="76" fill="url(#oli-grid-page18)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH CHUẨN MỰC */}
                  {/* Đường kẻ ngang 3 (ĐƯỜNG KẺ XANH ĐẬM Ở ĐỈNH - CAO 2 Ô LY): y = 10 */}
                  <line x1="0" y1="10" x2="100%" y2="10" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ ngang 2 (ĐƯỜNG KẺ CHẤM Ở GIỮA - CAO 1 Ô LY): y = 32 */}
                  <line x1="0" y1="32" x2="100%" y2="32" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ ngang 1 (ĐƯỜNG KẺ XANH ĐẬM Ở ĐÁY - BASELINE): y = 54 */}
                  <line x1="0" y1="54" x2="100%" y2="54" stroke="#0284c7" strokeWidth="2.0" />

                  {/* Outer Left & Right blue borders */}
                  <line x1="0.75" y1="0" x2="0.75" y2="76" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="76" stroke="#0284c7" strokeWidth="1.5" />

                  {/* --- CHỮ 'c' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED) --- */}
                  {/* Dịch sang trái 0.5 ô ly, lưng chạm x=7-14, dừng bút tại x=44, y=32 (ĐK2) */}
                  <g fill="none">
                    <path
                      d="M 39 16 C 34 10, 20 10, 14 18 C 7 26, 7 38, 14 46 C 20 54, 34 54, 41 46 C 43 43, 44 37, 44 32"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* --- CHỮ 'c' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID) --- */}
                  {/* Dịch sang trái 0.5 ô ly, chuẩn mực nét mực đen liền, dừng bút tại x=110, y=32 */}
                  <g fill="none">
                    <path
                      d="M 105 16 C 100 10, 86 10, 80 18 C 73 26, 73 38, 80 46 C 86 54, 100 54, 107 46 C 109 43, 110 37, 110 32"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* --- TIẾNG 'cá' THỨ BA: NÉT MỰC ĐEN LIỀN (SOLID) --- */}
                  {/* Chữ a dịch sang trái 0.5 ô ly, mép trái liền sát với điểm dừng bút của chữ c */}
                  <g fill="none">
                    {/* Chữ c dừng bút tại x=176, y=32 */}
                    <path
                      d="M 171 16 C 166 10, 152 10, 146 18 C 139 26, 139 38, 146 46 C 152 54, 166 54, 173 46 C 175 43, 176 37, 176 32"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Nét 1 chữ a: Nét cong kín dịch sang trái 0.5 ô ly, mép trái chạm liền với chữ c tại (176, 32) */}
                    <path
                      d="M 203 16 C 197 10, 183 10, 177 18 C 171 26, 171 38, 177 46 C 183 54, 197 54, 203 46 C 207 38, 207 22, 203 16 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Nét 2 chữ a: Nét móc ngược dịch sang trái 0.5 ô ly (x=207), dừng bút tại y=32 (ĐK2) */}
                    <path
                      d="M 207 10 L 207 42 C 207 50, 211 54, 218 54 C 224 54, 228 46, 229 32"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Dấu sắc / trên đầu chữ a: dịch trái 0.5 ô ly, cân đối trên đầu chữ a */}
                    <path
                      d="M 201 1 L 193 8"
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
           TRANG 19: MỤC 4 (ĐỌC CÂU "A, cá.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "CHÀO HỎI")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "A, cá." BÊN HỒ NƯỚC) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('A, cá.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "A, cá."</span>
              </button>
            </div>

            {/* Park Pond Scene Illustration matching textbook Page 19 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-emerald-50 to-teal-100 p-6 border border-emerald-200 overflow-hidden shadow-inner">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-8 mb-4">
                  {/* Grandma and Granddaughter walking */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👵👧</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Bà dắt bé dạo quanh bờ hồ
                    </span>
                  </div>

                  {/* Fish leaping in water */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl">🐟🌊</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-bold mt-1 shadow-xs border border-cyan-300">
                      Đàn cá tung tăng bơi lội
                    </span>
                  </div>
                </div>

                {/* Speech Bubble: "A, cá." */}
                <div className="relative inline-block my-2">
                  <button
                    onClick={() => handleSpeak('A, cá.')}
                    className="group px-8 py-3 rounded-3xl bg-white border-2 border-emerald-300 shadow-md flex items-center gap-3 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="text-3xl font-kid font-black text-slate-900 group-hover:text-emerald-700">
                      A, cá.
                    </span>
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                  </button>
                  <p className="text-xs text-slate-500 mt-2">
                    Bé gái vui mừng reo lên khi nhìn thấy đàn cá bơi dưới hồ nước trong xanh!
                  </p>
                </div>
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
                onClick={() => handleSpeak('Chủ đề nói: Chào hỏi. Khi đến trường, em lễ phép chào bác bảo vệ. Khi vào lớp học, em chào cô giáo và các bạn.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo hướng dẫn</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Lời khuyên sư phạm:</strong> Hãy dạy bé thói quen lễ phép: khoanh tay chào người lớn, tươi cười chào bạn bè khi đến trường và khi về nhà!
            </p>

            {/* Two Speaking Situations matching Textbook Page 19 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              {/* Situation 1: Chào bác bảo vệ ở cổng trường */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    Tranh 1
                  </span>
                  <h4 className="font-kid font-bold text-base text-slate-900">
                    Chào bác bảo vệ ở cổng trường
                  </h4>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 to-amber-50 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden border border-emerald-100">
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-6xl">👮‍♂️</span>
                      <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full mt-1 border border-slate-200">
                        Bác bảo vệ
                      </span>
                    </div>

                    <div className="text-2xl animate-pulse">➡️ 🤝</div>

                    <div className="flex flex-col items-center">
                      <span className="text-6xl">👦🎒</span>
                      <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full mt-1 border border-slate-200">
                        Bé khoanh tay chào
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dialogue buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleSpeak('Cháu chào bác ạ!')}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>👦 Học sinh: "Cháu chào bác ạ!"</span>
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => handleSpeak('Bác chào cháu! Chúc cháu một ngày học tập thật vui và ngoan nhé!')}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>👮‍♂️ Bác bảo vệ: "Bác chào cháu, chúc cháu học ngoan!"</span>
                    <Volume2 className="w-4 h-4 text-sky-600" />
                  </button>
                </div>
              </div>

              {/* Situation 2: Chào cô giáo và các bạn khi vào lớp */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    Tranh 2
                  </span>
                  <h4 className="font-kid font-bold text-base text-slate-900">
                    Chào cô giáo và các bạn khi vào lớp
                  </h4>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-amber-100 to-orange-50 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden border border-amber-100">
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-6xl">🙋‍♂️🎒</span>
                      <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full mt-1 border border-slate-200">
                        Bé vẫy tay chào
                      </span>
                    </div>

                    <div className="text-2xl animate-pulse">➡️ 🌸</div>

                    <div className="flex flex-col items-center">
                      <span className="text-6xl">👩‍🏫👧👦</span>
                      <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full mt-1 border border-slate-200">
                        Cô và các bạn trong lớp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dialogue buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleSpeak('Em chào cô ạ! Mình chào các bạn!')}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>🙋‍♂️ Học sinh: "Em chào cô ạ! Mình chào các bạn!"</span>
                    <Volume2 className="w-4 h-4 text-amber-600" />
                  </button>

                  <button
                    onClick={() => handleSpeak('Cô chào em! Mời em vào lớp ngồi vào bàn cùng các bạn nhé!')}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-xs font-bold text-purple-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>👩‍🏫 Cô giáo: "Cô chào em! Mời em vào lớp học!"</span>
                    <Volume2 className="w-4 h-4 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Role-Playing Speaking Practice */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé cùng đóng vai chào hỏi nào!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bấm nút bên cạnh để nghe cô giáo hướng dẫn cách chào hỏi thật lễ phép.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Rất giỏi! Em hãy khoanh tay trước ngực, nhìn thẳng vào người đối diện và nói to rõ ràng: Em chào cô ạ, Cháu chào bác ạ!');
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

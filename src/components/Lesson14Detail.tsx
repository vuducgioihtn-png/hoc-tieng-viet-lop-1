import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson14DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson14Detail: React.FC<Lesson14DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page40' | 'page41'>('page40');
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
      {/* Page Tabs Header: Trang 40 & Trang 41 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page40')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page40'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 40: Nhận biết, Đọc & Viết Ch ch, Kh kh</span>
          </button>
          <button
            onClick={() => setActiveTab('page41')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page41'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🐟 Trang 41: Đọc "Chị có cá kho khế." & Nói "Cá cảnh"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 14! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page40' ? (
        /* =========================================================================
           TRANG 40: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 14: Ch ch   Kh kh */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">14</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ ghép và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>Ch ch</span>
                  <span className="text-emerald-200">Kh kh</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười bốn: Chờ in hoa, chờ in thường, Khờ in hoa, khờ in thường. Âm chờ, âm khờ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm Ch ch, Kh kh</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Mấy chú khỉ ăn chuối.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Mấy chú khỉ ăn chuối.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Family of monkeys sitting on a flat rock at forest edge eating bananas */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-stone-100 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🐒🍌</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Khỉ mẹ bóc vỏ chuối
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🐵✨</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Khỉ con tinh nghịch
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🪨🌳</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-stone-300">
                      Tảng đá phẳng bìa rừng
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🍌 Những quả chuối chín vàng thơm ngọt</span>
                  <span>🐒 Gia đình khỉ quây quần vui vẻ</span>
                  <span>🌳 Rừng cây râm mát, thanh bình</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Mấy chú khỉ ăn chuối." with red ch, kh, ch */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">ch, kh</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Mấy')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Mấy
                  </button>
                  <button
                    onClick={() => handleSpeak('chờ - u - chu - sắc - chú. chú.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">ch</span>ú
                  </button>
                  <button
                    onClick={() => handleSpeak('khờ - i - khi - hỏi - khỉ. khỉ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">kh</span>ỉ
                  </button>
                  <button
                    onClick={() => handleSpeak('ăn')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    ăn
                  </button>
                  <button
                    onClick={() => handleSpeak('chuối')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    <span className="text-rose-600 font-black">ch</span>uối.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 40) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm chờ và âm khờ. Âm chờ: chờ - u - chu - sắc - chú. chú. Âm khờ: khờ - i - khi - hỏi - khỉ. khỉ. chè, chỉ, chợ, khế, kho, khô. lá khô, chú khỉ, chợ cá.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'ch' and 'kh' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'ch' & TIẾNG 'chú' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'ch' in red */}
                <button
                  onClick={() => handleSpeak('chờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm chờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ch
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm chờ
                  </span>
                </button>

                {/* Ô trên: [ ch | u ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('chờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm chờ"
                  >
                    ch
                  </button>
                  <button
                    onClick={() => handleSpeak('u')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm u"
                  >
                    u
                  </button>
                </div>

                {/* Ô dưới: [ chú ] */}
                <button
                  onClick={() => handleSpeak('chờ - u - chu - sắc - chú. chú.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: chờ - u - chu - sắc - chú. chú."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">ch</span>
                    <span className="text-slate-900">ú</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('chờ - u - chu - sắc - chú.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  chờ - u - chu - sắc - chú
                </button>
              </div>

              {/* CỘT 2: ÂM 'kh' & TIẾNG 'khỉ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'kh' in red */}
                <button
                  onClick={() => handleSpeak('khờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm khờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    kh
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm khờ
                  </span>
                </button>

                {/* Ô trên: [ kh | i ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('khờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm khờ"
                  >
                    kh
                  </button>
                  <button
                    onClick={() => handleSpeak('i')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm i"
                  >
                    i
                  </button>
                </div>

                {/* Ô dưới: [ khỉ ] */}
                <button
                  onClick={() => handleSpeak('khờ - i - khi - hỏi - khỉ. khỉ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: khờ - i - khi - hỏi - khỉ. khỉ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">kh</span>
                    <span className="text-slate-900">ỉ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('khờ - i - khi - hỏi - khỉ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  khờ - i - khi - hỏi - khỉ
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 40: chè chỉ chợ - khế kho khô */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('chè')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">chè</button>
                  <button onClick={() => handleSpeak('chỉ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">chỉ</button>
                  <button onClick={() => handleSpeak('chợ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">chợ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('khế')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">khế</button>
                  <button onClick={() => handleSpeak('kho')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">kho</button>
                  <button onClick={() => handleSpeak('khô')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">khô</button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 40: "lá khô", "chú khỉ", "chợ cá" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Những chiếc lá khô -> 'lá khô' */}
              <button
                onClick={() => handleSpeak('lá khô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🍂🍁
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">lá khô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Lá rụng mùa thu</span>
              </button>

              {/* Image 2: Chú khỉ con -> 'chú khỉ' */}
              <button
                onClick={() => handleSpeak('chú khỉ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🐒🌿
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">chú khỉ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chú khỉ con dễ thương</span>
              </button>

              {/* Image 3: Chợ cá tươi -> 'chợ cá' */}
              <button
                onClick={() => handleSpeak('chợ cá')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🏪🐟
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">chợ cá</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Khu chợ bán cá tươi</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 40)
              Dải kẻ 5 ô ly chuẩn: ch (chấm), ch (liền), kh (chấm), kh (liền), chú khỉ
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
                  onClick={() => handleSpeak('Cách viết chữ ch: Viết chữ c cao 2 ô ly dừng ở đường kẻ 2, sau đó lia bút nối liền nét sang nét khuyết trên của chữ h cao 5 ô ly uốn lên đường kẻ 6 rồi kéo thẳng xuống đường kẻ 1, viết nét móc hai đầu dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ ch"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ ch</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ kh: Viết chữ k cao 5 ô ly dừng ở đường kẻ 2, sau đó lia bút nối liền sang nét khuyết trên của chữ h cao 5 ô ly uốn lên đường kẻ 6 rồi kéo thẳng xuống đường kẻ 1, viết nét móc hai đầu dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ kh"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ kh</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ chú khỉ: Tiếng chú: viết chữ ch nối sang u cao 2 ô ly, dấu sắc trên đầu u. Cách một khoảng 1 ô ly, viết tiếp tiếng khỉ: chữ kh nối sang i cao 2 ô ly, dấu hỏi trên đầu i.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chú khỉ"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết chú khỉ</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">ch kh</span>
                  <span>Chữ ghép ch và kh (Chữ h và k cao 5 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ ch:</strong> Chữ c (cao 2 ô ly) nối liền nét sang chữ h (cao 5 ô ly).<br />
                  <strong>Chữ kh:</strong> Chữ k (cao 5 ô ly) nối liền nét sang chữ h (cao 5 ô ly).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">chú khỉ</span>
                  <span>Cụm từ "chú khỉ"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Tiếng chú:</strong> Chữ ch nối sang u + dấu sắc trên đầu u.<br />
                  <strong>Tiếng khỉ:</strong> Cách 1 ô ly, viết chữ kh nối sang i + dấu hỏi trên đầu i.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 40 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 40: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page40" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page40)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ h, k cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ c, u, i và nét móc chữ h - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm bắt đầu nét hất và điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ GHÉP 'ch' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Chữ c cao 2 ô ly nối liền nét sang chữ h cao 5 ô ly
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ c */}
                    <path
                      d="M 28 76 C 24 70, 15 70, 10 77 C 5 84, 5 96, 10 103 C 15 110, 24 110, 29 104 C 31 101, 33 96, 33 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Nối sang nét khuyết trên của chữ h cao 5 ô ly */}
                    <path
                      d="M 33 90 L 44 68 C 50 54, 59 32, 59 18 C 59 7, 55 3, 50 3 C 46 3, 44 6, 44 12 L 44 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc hai đầu cao 2 ô ly */}
                    <path
                      d="M 44 92 C 48 76, 54 68, 61 68 C 67 68, 69 76, 69 88 L 69 104 C 69 112, 73 112, 77 112 C 80 112, 82 104, 83 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ GHÉP 'ch' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ c */}
                    <path
                      d="M 104 76 C 100 70, 91 70, 86 77 C 81 84, 81 96, 86 103 C 91 110, 100 110, 105 104 C 107 101, 109 96, 109 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Nối sang chữ h cao 5 ô ly */}
                    <path
                      d="M 109 90 L 120 68 C 126 54, 135 32, 135 18 C 135 7, 131 3, 126 3 C 122 3, 120 6, 120 12 L 120 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 120 92 C 124 76, 130 68, 137 68 C 143 68, 145 76, 145 88 L 145 104 C 145 112, 149 112, 153 112 C 156 112, 158 104, 159 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CHỮ GHÉP 'kh' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Chữ k cao 5 ô ly nối liền nét sang chữ h cao 5 ô ly
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ k cao 5 ô ly */}
                    <path
                      d="M 175 90 L 186 68 C 192 54, 201 32, 201 18 C 201 7, 197 3, 192 3 C 188 3, 186 6, 186 12 L 186 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 186 96 C 190 78, 196 68, 203 68 C 209 68, 209 77, 203 82 C 199 85, 196 88, 200 92 L 209 112 C 211 112, 213 104, 214 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nối sang chữ h cao 5 ô ly */}
                    <path
                      d="M 214 90 L 225 68 C 231 54, 240 32, 240 18 C 240 7, 236 3, 231 3 C 227 3, 225 6, 225 12 L 225 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 225 92 C 229 76, 235 68, 242 68 C 248 68, 250 76, 250 88 L 250 104 C 250 112, 254 112, 258 112 C 261 112, 263 104, 264 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. CHỮ GHÉP 'kh' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ k cao 5 ô ly */}
                    <path
                      d="M 280 90 L 291 68 C 297 54, 306 32, 306 18 C 306 7, 302 3, 297 3 C 293 3, 291 6, 291 12 L 291 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 291 96 C 295 78, 301 68, 308 68 C 314 68, 314 77, 308 82 C 304 85, 301 88, 305 92 L 314 112 C 316 112, 318 104, 319 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nối sang chữ h cao 5 ô ly */}
                    <path
                      d="M 319 90 L 330 68 C 336 54, 345 32, 345 18 C 345 7, 341 3, 336 3 C 332 3, 330 6, 330 12 L 330 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 330 92 C 334 76, 340 68, 347 68 C 353 68, 355 76, 355 88 L 355 104 C 355 112, 359 112, 363 112 C 366 112, 368 104, 369 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      5. CỤM TỪ 'chú khỉ' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng chú: ch nối u + dấu sắc /
                      Tiếng khỉ: kh nối i + dấu hỏi ?
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG CHÚ */}
                    {/* Chữ c */}
                    <path
                      d="M 398 76 C 394 70, 385 70, 380 77 C 375 84, 375 96, 380 103 C 385 110, 394 110, 399 104 C 401 101, 403 96, 403 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Chữ h cao 5 ô ly */}
                    <path
                      d="M 403 90 L 414 68 C 420 54, 429 32, 429 18 C 429 7, 425 3, 420 3 C 416 3, 414 6, 414 12 L 414 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 414 92 C 418 76, 424 68, 431 68 C 437 68, 439 76, 439 88 L 439 104 C 439 112, 443 112, 447 112 C 450 112, 452 104, 453 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ u nối từ h */}
                    <path
                      d="M 453 90 L 457 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 457 68 L 457 102 C 457 112, 462 112, 469 112 C 476 112, 481 102, 481 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 481 68 L 481 104 C 481 112, 485 112, 489 112 C 491 112, 493 104, 494 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / */}
                    <path
                      d="M 473 54 L 467 60"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG KHỈ */}
                    {/* Chữ k cao 5 ô ly */}
                    <path
                      d="M 522 90 L 533 68 C 539 54, 548 32, 548 18 C 548 7, 544 3, 539 3 C 535 3, 533 6, 533 12 L 533 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 533 96 C 537 78, 543 68, 550 68 C 556 68, 556 77, 550 82 C 546 85, 543 88, 547 92 L 556 112 C 558 112, 560 104, 561 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ h cao 5 ô ly */}
                    <path
                      d="M 561 90 L 572 68 C 578 54, 587 32, 587 18 C 587 7, 583 3, 578 3 C 574 3, 572 6, 572 12 L 572 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 572 92 C 576 76, 582 68, 589 68 C 595 68, 597 76, 597 88 L 597 104 C 597 112, 601 112, 605 112 C 608 112, 610 104, 611 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ i nối từ h */}
                    <path
                      d="M 611 90 L 615 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 615 68 L 615 104 C 615 112, 619 112, 623 112 C 625 112, 627 104, 628 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="615" cy="56" r="1.5" fill="#000000" />
                    {/* Dấu hỏi ? trên đầu i */}
                    <path
                      d="M 622 47 C 622 44, 625 43, 627 43 C 629 43, 631 44, 631 47 C 631 50, 627 52, 626 54 L 626 55"
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
           TRANG 41: MỤC 4 (ĐỌC CÂU "Chị có cá kho khế.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "CÁ CẢNH")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Chị có cá kho khế.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Chị có cá kho khế.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Chị có cá kho khế."</span>
              </button>
            </div>

            {/* Cozy kitchen with sister serving hot fish cooked with carambola/starfruit, boy waiting eagerly */}
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Sister serving hot stewed fish */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩🍲</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-rose-300">
                      Chị múc cá kho khế nóng hổi
                    </span>
                  </div>

                  {/* Hot steaming stew plate */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🐟⭐♨️</span>
                    <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[11px] font-bold mt-1 shadow-xs">
                      Món cá kho khế thơm lừng
                    </span>
                  </div>

                  {/* Little brother excited */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👦✨</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Em trai hớn hở chờ ăn cơm
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Chị có cá kho khế." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-md mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Chị')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      Chị
                    </button>
                    <button
                      onClick={() => handleSpeak('có')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      có
                    </button>
                    <button
                      onClick={() => handleSpeak('cá')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      cá
                    </button>
                    <button
                      onClick={() => handleSpeak('kho')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      kho
                    </button>
                    <button
                      onClick={() => handleSpeak('khế')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      khế.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Món cá kho với khế chua ngọt thanh tao, bốc khói thơm nức cả gian bếp gia đình!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: CÁ CẢNH) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-sky-950">Nói</h3>
                  <span className="text-xs text-sky-800 font-bold uppercase tracking-wider">
                    Chủ đề: Cá cảnh
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Cá cảnh. Trong phòng khách có một bể cá cảnh lớn đặt trên tủ gỗ cạnh cửa sổ. Trong bể có nước trong xanh, hòn non bộ, rong rêu và những chú cá vàng, cá sọc vằn bơi lội tung tăng. Bạn nhỏ đang say mê ngắm nhìn đàn cá bơi lội!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-900 text-xs font-bold hover:bg-sky-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-sky-50/60 p-3 rounded-2xl border border-sky-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh bể cá cảnh: Bể cá được đặt ở đâu trong phòng? Bên trong bể cá có những con cá màu sắc như thế nào và có những vật trang trí gì? Bạn nhỏ đang làm gì?
            </p>

            {/* Aquarium scene matching Textbook Page 41 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-2xs">
                  Bể cá cảnh trong phòng khách
                </span>
                <span className="text-xs text-slate-500 font-medium">Bé say mê ngắm đàn cá tung tăng</span>
              </div>

              {/* Aquarium Visualization */}
              <div className="h-52 rounded-2xl bg-gradient-to-b from-sky-200 via-teal-100 to-emerald-200 flex flex-col items-center justify-center p-4 text-center border-2 border-sky-300/80 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-center gap-10 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">🐠🐡✨</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Đàn cá bơi lội</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">🪨🌿🫧</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Hòn non bộ & rong rêu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👦👀</span>
                    <span className="text-[10px] font-bold text-slate-800 mt-1">Bé thích thú ngắm cá</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-slate-900 bg-white/90 px-4 py-1 rounded-full shadow-2xs">
                  "Bể cá có nước trong veo, đàn cá vàng óng ánh và cá sọc bơi lượn quanh hòn non bộ thật đẹp!"
                </p>
              </div>

              {/* Practice dialogues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleSpeak('Bể cá cảnh có hòn non bộ màu xám, cây rong xanh tươi và đàn cá bơi lội tung tăng trong làn nước mát rượi!')}
                  className="p-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Mô tả vẻ đẹp của bể cá</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>

                <button
                  onClick={() => handleSpeak('Để cá luôn khỏe mạnh, chúng mình cần cho cá ăn lượng vừa đủ mỗi ngày và thường xuyên thay nước sạch cho bể cá nhé!')}
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Cách chăm sóc đàn cá cảnh</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐠</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-sky-950">
                    Bé hãy kể về một loài cá cảnh mà bé yêu thích!
                  </h5>
                  <p className="text-xs text-sky-800">
                    Bé thích nuôi cá vàng, cá bảy màu hay cá ông tiên? Chúng bơi lội uyển chuyển như thế nào?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé kể về cá cảnh rất sinh động và đáng yêu! Cô khen ngợi bé!');
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
                    <span>Luyện nói về cá cảnh</span>
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

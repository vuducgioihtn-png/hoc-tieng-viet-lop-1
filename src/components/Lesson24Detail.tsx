import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, Heart } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson24DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson24Detail: React.FC<Lesson24DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page60' | 'page61'>('page60');
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
      {/* Page Tabs Header: Trang 60 & Trang 61 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page60')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page60'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 60: Nhận biết, Đọc & Viết ua, ưa</span>
          </button>
          <button
            onClick={() => setActiveTab('page61')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page61'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🍲 Trang 61: Đọc "Mẹ đi chợ..." & Nói "Giúp mẹ"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 24! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page60' ? (
        /* =========================================================================
           TRANG 60: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 24: ua   ưa */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">24</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Vần đôi nguyên âm
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>ua</span>
                  <span className="text-emerald-200">ưa</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài hai mươi bốn: Vần ua, vần ưa.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm vần ua, ưa</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Mẹ đưa Hà đến lớp học múa.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Mẹ đưa Hà đến lớp học múa.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Mother walking Ha to ballet class */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-pink-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩👗</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-pink-300">
                      Mẹ mặc váy hồng dịu dàng
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">👧🩰✨</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Bé Hà váy ba-lê trắng
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🩰🚪🎶</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Lớp học múa vui tươi
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🩰 Bé Hà háo hức bước vào phòng tập múa</span>
                  <span>❤️ Mẹ ân cần đưa con đến lớp học nghệ thuật</span>
                  <span>🎶 Tiếng nhạc du dương và những điệu múa uyển chuyển</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Mẹ đưa Hà đến lớp học múa." with red ưa, ua */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các vần <span className="text-rose-600 font-bold">ưa, ua</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button onClick={() => handleSpeak('Mẹ')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">Mẹ</button>
                  <button onClick={() => handleSpeak('đờ - ưa - đưa. đưa.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    đ<span className="text-rose-600 font-black">ưa</span>
                  </button>
                  <button onClick={() => handleSpeak('Hà')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">Hà</button>
                  <button onClick={() => handleSpeak('đến')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">đến</button>
                  <button onClick={() => handleSpeak('lớp')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">lớp</button>
                  <button onClick={() => handleSpeak('học')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">học</button>
                  <button onClick={() => handleSpeak('mờ - ua - mua - sắc - múa. múa.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    m<span className="text-rose-600 font-black">úa</span>.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 60) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học vần ua và vần ưa. Vần ua: mờ - ua - mua - sắc - múa. múa. Vần ưa: đờ - ưa - đưa. đưa. cua, đũa, rùa, cửa, dứa, nhựa. cà chua, múa ô, dưa lê, cửa sổ.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'ua' and 'ưa' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: VẦN 'ua' & TIẾNG 'múa' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'ua' in red */}
                <button
                  onClick={() => handleSpeak('ua')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe vần ua"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ua
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    vần ua
                  </span>
                </button>

                {/* Ô trên: [ m | ua ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('mờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm mờ"
                  >
                    m
                  </button>
                  <button
                    onClick={() => handleSpeak('ua')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe vần ua"
                  >
                    ua
                  </button>
                </div>

                {/* Ô dưới: [ múa ] */}
                <button
                  onClick={() => handleSpeak('mờ - ua - mua - sắc - múa. múa.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: mờ - ua - mua - sắc - múa. múa."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">m</span>
                    <span className="text-rose-600">úa</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('mờ - ua - mua - sắc - múa.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  mờ - ua - mua - sắc - múa
                </button>
              </div>

              {/* CỘT 2: VẦN 'ưa' & TIẾNG 'đưa' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'ưa' in red */}
                <button
                  onClick={() => handleSpeak('ưa')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe vần ưa"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ưa
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    vần ưa
                  </span>
                </button>

                {/* Ô trên: [ đ | ưa ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('đờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm đờ"
                  >
                    đ
                  </button>
                  <button
                    onClick={() => handleSpeak('ưa')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe vần ưa"
                  >
                    ưa
                  </button>
                </div>

                {/* Ô dưới: [ đưa ] */}
                <button
                  onClick={() => handleSpeak('đờ - ưa - đưa. đưa.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: đờ - ưa - đưa. đưa."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">đ</span>
                    <span className="text-rose-600">ưa</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('đờ - ưa - đưa.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  đờ - ưa - đưa
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 60: cua đũa rùa - cửa dứa nhựa */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng vần:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('cua')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cua</button>
                  <button onClick={() => handleSpeak('đũa')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">đũa</button>
                  <button onClick={() => handleSpeak('rùa')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">rùa</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('cửa')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cửa</button>
                  <button onClick={() => handleSpeak('dứa')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">dứa</button>
                  <button onClick={() => handleSpeak('nhựa')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">nhựa</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 60: "cà chua", "múa ô", "dưa lê", "cửa sổ" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Cà chua -> 'cà chua' */}
              <button
                onClick={() => handleSpeak('cà chua')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🍅🌿
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">cà chua</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cà chua chín mọng</span>
              </button>

              {/* Image 2: Múa ô -> 'múa ô' */}
              <button
                onClick={() => handleSpeak('múa ô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    ☂️💃
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">múa ô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Điệu múa xòe ô duyên dáng</span>
              </button>

              {/* Image 3: Dưa lê -> 'dưa lê' */}
              <button
                onClick={() => handleSpeak('dưa lê')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🍈✨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">dưa lê</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Quả dưa lê ngọt mát</span>
              </button>

              {/* Image 4: Cửa sổ -> 'cửa sổ' */}
              <button
                onClick={() => handleSpeak('cửa sổ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🪟🪵
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">cửa sổ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Khung cửa sổ gỗ mở rộng</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 60)
              Dải kẻ 5 ô ly chuẩn: ua (chấm), ua (liền), ưa (chấm), ưa (liền), cà chua, dưa lê
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
                  onClick={() => handleSpeak('Cách viết vần ua: Viết chữ u cao 2 ô ly dừng ở đường kẻ 2, sau đó lia bút nối liền nét sang nét cong kín của chữ a cao 2 ô ly, viết tiếp nét móc ngược dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết vần ua"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết vần ua</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết vần ưa: Viết chữ ư cao 2 ô ly có râu nhỏ ở góc trên bên phải dừng ở đường kẻ 2, sau đó lia bút nối liền nét sang nét cong kín của chữ a cao 2 ô ly, viết nét móc ngược dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết vần ưa"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết vần ưa</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ cà chua và dưa lê: Cụm từ cà chua: chữ c nối a có dấu huyền, cách 1 ô ly viết chữ ch nối sang vần ua. Cụm từ dưa lê: chữ d cao 4 ô ly nối sang vần ưa, cách 1 ô ly viết chữ l cao 5 ô ly nối sang ê có dấu mũ.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết cà chua, dưa lê"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết cà chua, dưa lê</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">ua ưa</span>
                  <span>Vần ua và Vần ưa</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Vần ua:</strong> Chữ u (cao 2 ô ly) nối liền sang chữ a (cao 2 ô ly).<br />
                  <strong>Vần ưa:</strong> Chữ ư (u có râu) nối liền sang chữ a (cao 2 ô ly).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">cà chua dưa lê</span>
                  <span>Cụm từ "cà chua" và "dưa lê"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>cà chua:</strong> Tiếng cà (c nối a + dấu huyền), cách 1 ô ly viết tiếng chua (c nối h cao 5 ô ly nối vần ua).<br />
                  <strong>dưa lê:</strong> Tiếng dưa (d cao 4 ô ly nối vần ưa), cách 1 ô ly viết tiếng lê (l cao 5 ô ly nối ê + dấu mũ).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 60 OF TEXTBOOK */}
            <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                <defs>
                  <pattern id="oli-grid-page60" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                  </pattern>
                </defs>

                {/* Fill background with 22px dotted grid */}
                <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page60)" />

                {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                {/* Đường kẻ 6 (đỉnh chữ h, l cao 5 ô ly so với baseline y=112): y = 2 */}
                <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 5 (đỉnh chữ d cao 4 ô ly): y = 24 */}
                <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 4 (Độ cao 3 ô ly): y = 46 */}
                <line x1="0" y1="46" x2="100%" y2="46" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 3 (đỉnh chữ u, a, ư, c, ê cao 2 ô ly): y = 68 */}
                <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                {/* Đường kẻ 2 (độ cao 1 ô ly): y = 90 */}
                <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                {/* Viền trái phải */}
                <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                {/* ==============================================================
                    1. VẦN 'ua' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                    Chữ u (cao 2 ô ly) nối liền nét sang chữ a (cao 2 ô ly)
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ u */}
                  <path
                    d="M 12 90 L 20 68 L 20 102 C 20 112, 25 112, 32 112 C 39 112, 44 102, 44 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 44 68 L 44 104 C 44 112, 48 112, 54 112 C 57 112, 60 106, 62 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ a nối từ u */}
                  <path
                    d="M 88 74 C 82 68, 72 68, 66 76 C 60 84, 60 96, 66 104 C 72 112, 82 112, 88 104 C 92 96, 92 82, 88 74 Z"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 88 68 L 88 104 C 88 112, 92 112, 99 112 C 104 112, 108 104, 110 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    2. VẦN 'ua' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 126 90 L 134 68 L 134 102 C 134 112, 139 112, 146 112 C 153 112, 158 102, 158 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 158 68 L 158 104 C 158 112, 162 112, 168 112 C 171 112, 174 106, 176 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 202 74 C 196 68, 186 68, 180 76 C 174 84, 174 96, 180 104 C 186 112, 196 112, 202 104 C 206 96, 206 82, 202 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 202 68 L 202 104 C 202 112, 206 112, 213 112 C 218 112, 222 104, 224 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    3. VẦN 'ưa' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                    Chữ ư (u có râu) nối chữ a
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ ư */}
                  <path
                    d="M 240 90 L 248 68 L 248 102 C 248 112, 253 112, 260 112 C 267 112, 272 102, 272 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 272 68 L 272 104 C 272 112, 276 112, 282 112 C 285 112, 288 106, 290 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Râu chữ ư */}
                  <path
                    d="M 272 68 C 274 64, 277 64, 276 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  {/* Chữ a nối từ ư */}
                  <path
                    d="M 316 74 C 310 68, 300 68, 294 76 C 288 84, 288 96, 294 104 C 300 112, 310 112, 316 104 C 320 96, 320 82, 316 74 Z"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 316 68 L 316 104 C 316 112, 320 112, 327 112 C 332 112, 336 104, 338 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    4. VẦN 'ưa' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 354 90 L 362 68 L 362 102 C 362 112, 367 112, 374 112 C 381 112, 386 102, 386 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 386 68 L 386 104 C 386 112, 390 112, 396 112 C 399 112, 402 106, 404 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 386 68 C 388 64, 391 64, 390 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 430 74 C 424 68, 414 68, 408 76 C 402 84, 402 96, 408 104 C 414 112, 424 112, 430 104 C 434 96, 434 82, 430 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 430 68 L 430 104 C 430 112, 434 112, 441 112 C 446 112, 450 104, 452 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    5. CỤM TỪ 'cà chua' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng cà: c nối a + dấu huyền \
                    Tiếng chua: c nối h cao 5 ô ly nối vần ua (u nối a)
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG CÀ */}
                  <path
                    d="M 476 76 C 472 70, 463 70, 458 78 C 453 86, 453 98, 458 106 C 463 112, 472 112, 477 106 C 479 103, 481 98, 481 92"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ a nối từ c */}
                  <path
                    d="M 506 74 C 500 68, 490 68, 484 76 C 478 84, 478 96, 484 104 C 490 112, 500 112, 506 104 C 510 96, 510 82, 506 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 506 68 L 506 104 C 506 112, 510 112, 517 112 C 522 112, 526 104, 528 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 500 54 L 494 60"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG CHUA: c nối h cao 5 ô ly nối ua */}
                  <path
                    d="M 552 76 C 548 70, 539 70, 534 78 C 529 86, 529 98, 534 106 C 539 112, 548 112, 553 106 C 555 103, 557 98, 557 92"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 557 92 L 565 68 C 571 40, 577 2, 572 2 C 568 2, 566 10, 566 24 L 566 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 566 98 C 570 76, 576 68, 582 68 C 587 68, 589 76, 589 90 L 589 106 C 589 112, 592 112, 595 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ u nối từ h */}
                  <path
                    d="M 595 112 L 601 68 L 601 102 C 601 112, 606 112, 613 112 C 620 112, 625 102, 625 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 625 68 L 625 104 C 625 112, 629 112, 635 112 C 638 112, 641 106, 643 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ a nối từ u */}
                  <path
                    d="M 669 74 C 663 68, 653 68, 647 76 C 641 84, 641 96, 647 104 C 653 112, 663 112, 669 104 C 673 96, 673 82, 669 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 669 68 L 669 104 C 669 112, 673 112, 680 112 C 685 112, 689 104, 691 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    6. CỤM TỪ 'dưa lê' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng dưa: d cao 4 ô ly (y=24) nối vần ưa
                    Tiếng lê: l cao 5 ô ly (y=2) nối ê + dấu mũ ^
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG DƯA: d cao 4 ô ly */}
                  <path
                    d="M 726 74 C 720 68, 710 68, 704 76 C 698 84, 698 96, 704 104 C 710 112, 720 112, 726 104 C 730 96, 730 82, 726 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 726 24 L 726 104 C 726 112, 730 112, 737 112 C 742 112, 746 104, 748 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ ư nối từ d */}
                  <path
                    d="M 748 90 L 754 68 L 754 102 C 754 112, 759 112, 766 112 C 773 112, 778 102, 778 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 778 68 L 778 104 C 778 112, 782 112, 788 112 C 791 112, 794 106, 796 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 778 68 C 780 64, 783 64, 782 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ a nối từ ư */}
                  <path
                    d="M 822 74 C 816 68, 806 68, 800 76 C 794 84, 794 96, 800 104 C 806 112, 816 112, 822 104 C 826 96, 826 82, 822 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 822 68 L 822 104 C 822 112, 826 112, 833 112 C 838 112, 842 104, 844 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG LÊ: l cao 5 ô ly nối ê */}
                  <path
                    d="M 856 90 L 864 68 C 870 40, 876 2, 871 2 C 867 2, 865 10, 865 24 L 865 104 C 865 112, 869 112, 876 112 C 880 112, 884 106, 886 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ ê nối từ l */}
                  <path
                    d="M 886 90 C 890 82, 895 80, 899 80 C 903 80, 905 84, 899 87 C 892 90, 894 96, 899 96 C 903 96, 906 92, 908 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 896 70 L 900 64 L 904 70"
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
           TRANG 61: MỤC 4 (ĐỌC CÂU "Mẹ đi chợ...") VÀ MỤC 5 (NÓI CHỦ ĐỀ "GIÚP MẸ")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Mẹ đi chợ mua cá, mua cua. Mẹ mua cả sữa chua, dưa lê.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Mẹ đi chợ mua cá, mua cua. Mẹ mua cả sữa chua, dưa lê.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc toàn bộ câu</span>
              </button>
            </div>

            {/* Mother returning from market with fresh food matching textbook Page 61 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Mother returning from market */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👩🧺🛒</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Mẹ đi chợ về
                    </span>
                  </div>

                  {/* Fresh food: fish, crab, yogurt, melon */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🐟🦀🥛🍈</span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[11px] font-bold mt-1 shadow-xs">
                      Cá, cua, sữa chua và dưa lê
                    </span>
                  </div>

                  {/* Child welcoming mother */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👦🎁❤️</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Bé ngoan đón quà của mẹ
                    </span>
                  </div>
                </div>

                {/* The Reading Sentences */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2 space-y-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button onClick={() => handleSpeak('Mẹ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Mẹ</button>
                    <button onClick={() => handleSpeak('đi')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">đi</button>
                    <button onClick={() => handleSpeak('chợ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">chợ</button>
                    <button onClick={() => handleSpeak('mua')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">mua</button>
                    <button onClick={() => handleSpeak('cá')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cá,</button>
                    <button onClick={() => handleSpeak('mua')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">mua</button>
                    <button onClick={() => handleSpeak('cua')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">cua.</button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900 pt-1 border-t border-slate-100">
                    <button onClick={() => handleSpeak('Mẹ')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Mẹ</button>
                    <button onClick={() => handleSpeak('mua')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">mua</button>
                    <button onClick={() => handleSpeak('cả')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cả</button>
                    <button onClick={() => handleSpeak('sữa')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">sữa</button>
                    <button onClick={() => handleSpeak('chua')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">chua,</button>
                    <button onClick={() => handleSpeak('dưa')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">dưa</button>
                    <button onClick={() => handleSpeak('lê')} className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">lê.</button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Mẹ chăm lo bữa ăn tươi ngon cho cả nhà và không quên mua những món quà ngọt lành cho bé yêu!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: GIÚP MẸ) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Nói</h3>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                    Chủ đề: Giúp mẹ (Ý thức chăm chỉ làm việc nhà vừa sức)
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Giúp mẹ. Bức tranh vẽ cảnh trong gian bếp gia đình: Mẹ đang nấu cơm bên bếp, còn bạn nhỏ ngồi bên bàn nhặt rau giúp mẹ. Khi ở nhà, chúng mình hãy luôn chủ động giúp đỡ mẹ những công việc vừa sức như: nhặt rau, dọn bát đũa, quét nhà, gấp quần áo để mẹ đỡ vất vả nhé!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh: Mẹ đang làm gì và bạn nhỏ đang làm gì? Ở nhà, bé đã từng làm những việc gì để giúp đỡ bố mẹ? Cảm xúc của mẹ khi được bé giúp đỡ như thế nào?
            </p>

            {/* Illustration and Actions Box matching textbook Page 61 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* ACTION 1: NHẶT RAU GIÚP MẸ */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Nhặt rau giúp mẹ
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-emerald-100 via-teal-50 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-emerald-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">👦🥬🧺</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Ngồi nhặt từng ngọn rau tươi
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Bé ngồi cẩn thận ngắt bỏ cuống già, nhặt rau tươi xanh để mẹ nấu canh ngọt lành!')}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu việc nhặt rau</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* ACTION 2: DỌN BÀN ĂN & CHIA BÁT ĐŨA */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Dọn bàn ăn & chia thìa đũa
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-sky-100 via-teal-50 to-pink-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🍽️🥢🥣</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Xếp bàn ăn ngay ngắn
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Trước bữa cơm, bé lau bàn sạch sẽ, chia thìa, chia đũa ngay ngắn cho cả nhà!')}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu dọn bàn ăn</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>

              {/* ACTION 3: QUÉT NHÀ & RÓT NƯỚC */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Quét nhà & rót nước mời mẹ
                  </h4>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-b from-amber-100 to-orange-50 flex flex-col items-center justify-center p-3 text-center border border-amber-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🧹🥛❤️</span>
                  <span className="text-[11px] font-bold text-slate-700">
                    Hiếu thảo, yêu thương cha mẹ
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Khi mẹ đi làm về mệt, bé cầm chiếc chổi nhỏ quét nhà tinh tươm và hai tay bưng cốc nước mát mời mẹ uống!')}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Tìm hiểu việc quét nhà</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💖</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy kể về việc bé thường làm giúp đỡ mẹ ở nhà:
                  </h5>
                  <p className="text-emerald-800">
                    "Tuổi nhỏ làm việc nhỏ, tùy theo sức của mình" — làm việc nhà giúp bé rèn luyện tính tự lập và tình yêu thương gia đình!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé là một người con rất ngoan ngoãn và chăm chỉ! Mẹ chắc chắn sẽ rất tự hào về bé!');
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
                    <span>Nói về việc giúp mẹ</span>
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

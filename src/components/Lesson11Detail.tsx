import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson11DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson11Detail: React.FC<Lesson11DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page34' | 'page35'>('page34');
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
      {/* Page Tabs Header: Trang 34 & Trang 35 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page34')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page34'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 34: Nhận biết, Đọc & Viết I i, K k</span>
          </button>
          <button
            onClick={() => setActiveTab('page35')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page35'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🦎 Trang 35: Đọc "Kì đà bò ở kẽ đá." & Nói "Giới thiệu"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 11! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page34' ? (
        /* =========================================================================
           TRANG 34: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 11: I i   K k */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">11</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>I i</span>
                  <span className="text-emerald-200">K k</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười một: I in hoa, i in thường, K in hoa, k in thường. Âm i, âm ca.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm I i, K k</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Nam vẽ kì đà.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Nam vẽ kì đà.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Nam sitting at study desk by window drawing a monitor lizard */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-amber-50 to-emerald-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👦🖍️</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bạn Nam ngồi vẽ tranh
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🦎📄</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Bức tranh vẽ chú kì đà
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🪟📚✏️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Bàn học cạnh cửa sổ
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🪟 Cửa sổ ngập tràn ánh nắng</span>
                  <span>🖍️ Hộp bút sáp màu và trang giấy vẽ</span>
                  <span>🦎 Chú kì đà bò ngoạn mục trên trang giấy</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Nam vẽ kì đà." with red 'kì' */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, chữ <span className="text-rose-600 font-bold">kì</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Nam')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Nam
                  </button>
                  <button
                    onClick={() => handleSpeak('vẽ')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    vẽ
                  </button>
                  <button
                    onClick={() => handleSpeak('ca - i - ki - huyền - kì. kì.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer text-rose-600"
                  >
                    kì
                  </button>
                  <button
                    onClick={() => handleSpeak('đà')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    đà.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 34) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm i và chữ k. Âm i: ca - i - ki. ki. Chữ k: ca - i - ki - huyền - kì. kì. kè, kẻ, kệ, kí, kỉ, kĩ. bí đỏ, kẻ ô, đi đò, kì đà.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'i' and 'k' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'i' & TIẾNG 'ki' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'i' in red */}
                <button
                  onClick={() => handleSpeak('i')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm i"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    i
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm i
                  </span>
                </button>

                {/* Ô trên: [ k | i ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('ca')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ca"
                  >
                    k
                  </button>
                  <button
                    onClick={() => handleSpeak('i')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm i"
                  >
                    i
                  </button>
                </div>

                {/* Ô dưới: [ ki ] */}
                <button
                  onClick={() => handleSpeak('ca - i - ki. ki.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: ca - i - ki. ki."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">k</span>
                    <span className="text-rose-600">i</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('ca - i - ki.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  ca - i - ki
                </button>
              </div>

              {/* CỘT 2: CHỮ 'k' & TIẾNG 'kì' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'k' in red */}
                <button
                  onClick={() => handleSpeak('ca')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe chữ ca"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    k
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    chữ ca
                  </span>
                </button>

                {/* Ô trên: [ k | i ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('ca')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ca"
                  >
                    k
                  </button>
                  <button
                    onClick={() => handleSpeak('i')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm i"
                  >
                    i
                  </button>
                </div>

                {/* Ô dưới: [ kì ] */}
                <button
                  onClick={() => handleSpeak('ca - i - ki - huyền - kì. kì.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: ca - i - ki - huyền - kì. kì."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">k</span>
                    <span className="text-slate-900">ì</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('ca - i - ki - huyền - kì.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  ca - i - ki - huyền - kì
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 34: kè kẻ kệ - kí kỉ kĩ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2">
                <span>Luyện đọc các tiếng cùng âm:</span>
                <span className="text-emerald-700">💡 Quy tắc: k luôn đi với e, ê, i</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('kè')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">kè</button>
                  <button onClick={() => handleSpeak('kẻ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">kẻ</button>
                  <button onClick={() => handleSpeak('kệ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">kệ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('kí')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">kí</button>
                  <button onClick={() => handleSpeak('kỉ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">kỉ</button>
                  <button onClick={() => handleSpeak('kĩ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">kĩ</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 34: "bí đỏ", "kẻ ô", "đi đò", "kì đà" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Quả bí đỏ -> 'bí đỏ' */}
              <button
                onClick={() => handleSpeak('bí đỏ')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🎃🥧
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">bí đỏ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Quả bí chín vàng</span>
              </button>

              {/* Image 2: Kẻ ô ly -> 'kẻ ô' */}
              <button
                onClick={() => handleSpeak('kẻ ô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    📐✏️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">kẻ ô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cầm thước kẻ ô</span>
              </button>

              {/* Image 3: Đi đò qua sông -> 'đi đò' */}
              <button
                onClick={() => handleSpeak('đi đò')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🛶🌊
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">đi đò</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Ngồi đò sang sông</span>
              </button>

              {/* Image 4: Chú kì đà -> 'kì đà' */}
              <button
                onClick={() => handleSpeak('kì đà')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🦎🪨
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">kì đà</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Chú kì đà bò trên cát</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 34)
              Dải kẻ 5 ô ly chuẩn: i (chấm), i (liền), k (chấm), k (liền), kì đà (liền)
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
                  onClick={() => handleSpeak('Cách viết chữ i: Từ đường kẻ 2 viết nét hất lên đường kẻ 3, sau đó kéo thẳng xuống chạm đường kẻ 1 rồi móc lên đường kẻ 2. Lia bút lên giữa đường kẻ 3 và đường kẻ 4 viết dấu chấm nhỏ.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ i"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ i</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ k: Từ đường kẻ 2 viết nét khuyết trên cao 5 ô ly uốn lên đường kẻ 6 rồi kéo thẳng xuống đường kẻ 1. Lia bút lên viết tiếp nét móc hai đầu có thắt ở giữa đường kẻ 2 rồi móc lên dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ k"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ k</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết từ kì đà: Tiếng kì: Viết chữ k cao 5 ô ly nối sang chữ i cao 2 ô ly, dấu huyền trên đầu chữ i. Cách một khoảng 1 ô ly, viết tiếp tiếng đà: chữ đ cao 4 ô ly nối sang a cao 2 ô ly, dấu huyền trên đầu a.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết kì đà"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết kì đà</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">i k</span>
                  <span>Chữ i (cao 2 ô ly) và Chữ k (cao 5 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ i:</strong> Nét hất (ĐK 2 lên ĐK 3) + Nét móc ngược phải cao 2 ô ly (ĐK 3 xuống ĐK 1 rồi móc lên ĐK 2) + Dấu chấm nhỏ trên đầu.<br />
                  <strong>Chữ k:</strong> Nét khuyết trên cao 5 ô ly + Nét móc hai đầu có thắt giữa dừng ở ĐK 2.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">kì đà</span>
                  <span>Cụm từ "kì đà"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Tiếng kì:</strong> Chữ k cao 5 ô ly nối liền nét sang chữ i cao 2 ô ly + dấu huyền trên đầu chữ i.<br />
                  <strong>Tiếng đà:</strong> Cách 1 khoảng 1 ô ly, viết chữ đ cao 4 ô ly nối liền sang chữ a cao 2 ô ly + dấu huyền trên đầu a.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 34 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 34: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page34" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page34)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ k cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 5 (đỉnh chữ đ cao 4 ô ly): y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 4 (vị trí nét gạch ngang ngắn của chữ đ): y = 46 */}
                  <line x1="0" y1="46" x2="100%" y2="46" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ i, a - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm bắt đầu nét hất và điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'i' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét hất + Nét móc ngược phải cao 2 ô ly + Dấu chấm nhỏ
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét hất từ x=16, y=90 lên x=22, y=68 */}
                    <path
                      d="M 16 90 L 22 68"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Nét móc ngược phải từ y=68 xuống y=112 rồi móc lên y=90 tại x=33 */}
                    <path
                      d="M 22 68 L 22 104 C 22 112, 26 112, 30 112 C 32 112, 34 104, 35 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu chấm nhỏ trên đầu ở y=56 */}
                    <circle cx="22" cy="56" r="1.3" fill="#1e293b" />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'i' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      Cách chữ 1 đúng 3 ô ly (tại x=68)
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét hất */}
                    <path
                      d="M 62 90 L 68 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Nét móc ngược phải */}
                    <path
                      d="M 68 68 L 68 104 C 68 112, 72 112, 76 112 C 78 112, 80 104, 81 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu chấm nhỏ */}
                    <circle cx="68" cy="56" r="1.5" fill="#000000" />
                  </g>

                  {/* ==============================================================
                      3. CHỮ 'k' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Nét khuyết trên cao 5 ô ly + nét móc hai đầu thắt giữa cao 2 ô ly
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét khuyết trên cao 5 ô ly */}
                    <path
                      d="M 103 90 L 114 68 C 120 54, 129 32, 129 18 C 129 7, 125 3, 120 3 C 116 3, 114 6, 114 12 L 114 112"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc hai đầu có thắt giữa */}
                    <path
                      d="M 114 96 C 118 78, 124 68, 131 68 C 137 68, 137 77, 131 82 C 127 85, 124 88, 128 92 L 138 112 C 140 112, 142 104, 143 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. CHỮ 'k' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét khuyết trên cao 5 ô ly */}
                    <path
                      d="M 158 90 L 169 68 C 175 54, 184 32, 184 18 C 184 7, 180 3, 175 3 C 171 3, 169 6, 169 12 L 169 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc hai đầu có thắt giữa */}
                    <path
                      d="M 169 96 C 173 78, 179 68, 186 68 C 192 68, 192 77, 186 82 C 182 85, 179 88, 183 92 L 193 112 C 195 112, 197 104, 198 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      5. CỤM TỪ 'kì đà' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng 'kì': chữ k cao 5 ô ly nối i + dấu huyền
                      Tiếng 'đà': chữ đ cao 4 ô ly nối a + dấu huyền
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG KÌ: Chữ k cao 5 ô ly */}
                    <path
                      d="M 215 90 L 226 68 C 232 54, 241 32, 241 18 C 241 7, 237 3, 232 3 C 228 3, 226 6, 226 12 L 226 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 226 96 C 230 78, 236 68, 243 68 C 249 68, 249 77, 243 82 C 239 85, 236 88, 240 92 L 249 112 C 251 112, 252 104, 253 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ i nối liền từ k */}
                    <path
                      d="M 253 90 L 257 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 257 68 L 257 104 C 257 112, 261 112, 265 112 C 267 112, 269 104, 270 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="257" cy="56" r="1.5" fill="#000000" />
                    {/* Dấu huyền trên đầu chữ i */}
                    <path
                      d="M 251 46 L 259 52"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG ĐÀ: Chữ đ cao 4 ô ly */}
                    <path
                      d="M 308 74 C 302 68, 292 68, 286 76 C 280 84, 280 96, 286 104 C 292 112, 302 112, 308 104 C 312 96, 312 82, 308 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 308 24 L 308 104 C 308 112, 312 112, 319 112 C 324 112, 328 104, 330 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 297 46 L 319 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* Chữ a nối từ đ */}
                    <path
                      d="M 352 74 C 346 68, 336 68, 330 76 C 324 84, 324 96, 330 104 C 336 112, 346 112, 352 104 C 356 96, 356 82, 352 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 352 68 L 352 104 C 352 112, 356 112, 363 112 C 368 112, 372 104, 374 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu huyền trên đầu chữ a */}
                    <path
                      d="M 346 56 L 338 64"
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
           TRANG 35: MỤC 4 (ĐỌC CÂU "Kì đà bò ở kẽ đá.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "GIỚI THIỆU")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Kì đà bò ở kẽ đá.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Kì đà bò ở kẽ đá.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Kì đà bò ở kẽ đá."</span>
              </button>
            </div>

            {/* Monitor lizard crawling on rocky stream crevice matching textbook Page 35 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-stone-100 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Rocky mountain and rocks */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🪨⛰️</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-stone-300">
                      Kẽ đá gập ghềnh
                    </span>
                  </div>

                  {/* Monitor lizard crawling */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🦎🌿</span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold mt-1 shadow-xs">
                      Chú kì đà bò thoăn thoắt
                    </span>
                  </div>

                  {/* Forest trees */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🌳🍃</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Rừng cây xanh mát
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Kì đà bò ở kẽ đá." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Kì')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      Kì
                    </button>
                    <button
                      onClick={() => handleSpeak('đà')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      đà
                    </button>
                    <button
                      onClick={() => handleSpeak('bò')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      bò
                    </button>
                    <button
                      onClick={() => handleSpeak('ở')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      ở
                    </button>
                    <button
                      onClick={() => handleSpeak('kẽ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      kẽ
                    </button>
                    <button
                      onClick={() => handleSpeak('đá')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      đá.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Chú kì đà với lớp da rêu phong ngụy trang khéo léo đang bò chậm rãi qua những kẽ đá núi!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: GIỚI THIỆU) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Giới thiệu
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Giới thiệu. Trong tranh, ở hành lang lớp một A và lớp một B, hai bạn nhỏ đang vui vẻ làm quen và giới thiệu bản thân: Chào bạn, mình tên là Nam, mình học lớp một A. Còn bạn tên là gì? Chúng mình hãy cùng tự tin giới thiệu bản thân nhé!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh sân trường: Tranh vẽ hành lang của những lớp học nào? Hai bạn nam ở hành lang lớp 1A đang làm gì và nói những lời gì để làm quen với nhau?
            </p>

            {/* School corridor illustration matching Textbook Page 35: Class 1A and Class 1B */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-2xs">
                    LỚP 1A
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-2xs">
                    LỚP 1B
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Hành lang lớp học rực rỡ bồn hoa</span>
              </div>

              {/* Classroom Corridor Visualization */}
              <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 via-rose-50 to-amber-50 flex flex-col items-center justify-center p-4 text-center border border-sky-200/60 shadow-inner">
                <div className="flex items-center justify-center gap-8 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👦🎒</span>
                    <span className="text-[10px] font-bold text-slate-700 mt-1">Bạn Nam lớp 1A</span>
                  </div>
                  <span className="text-3xl text-emerald-600">🤝</span>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👦👓</span>
                    <span className="text-[10px] font-bold text-slate-700 mt-1">Bạn học sinh mới</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-slate-900 bg-white/90 px-4 py-1 rounded-full shadow-2xs">
                  "Chào bạn! Mình tên là Nam, mình học lớp 1A. Còn bạn tên là gì?"
                </p>
              </div>

              {/* Practice dialogues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleSpeak('Chào bạn! Mình tên là Nam, mình học lớp một A. Rất vui được làm quen với bạn!')}
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Lời giới thiệu của bạn Nam</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  onClick={() => handleSpeak('Chào Nam! Mình tên là Hùng, mình cũng học lớp một A. Giờ ra chơi chúng mình cùng chơi nhảy dây nhé!')}
                  className="p-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Lời đáp lại của bạn mới</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy tự tin giới thiệu bản thân mình nhé!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bé tên là gì? Năm nay bé mấy tuổi? Bé học lớp nào và thích môn học gì nhất?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé giới thiệu bản thân rất to, rõ ràng và tự tin! Cô khen ngợi bé!');
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
                    <span>Luyện giới thiệu cùng cô giáo</span>
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

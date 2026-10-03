import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, HeartHandshake } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson23DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson23Detail: React.FC<Lesson23DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page58' | 'page59'>('page58');
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
      {/* Page Tabs Header: Trang 58 & Trang 59 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page58')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page58'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 58: Nhận biết, Đọc & Viết Th th, ia</span>
          </button>
          <button
            onClick={() => setActiveTab('page59')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page59'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🍽️ Trang 59: Đọc "Bé chia thìa..." & Nói "Cảm ơn"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 23! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page58' ? (
        /* =========================================================================
           TRANG 58: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 23: Th th   ia */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">23</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ ghép và vần
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>Th th</span>
                  <span className="text-emerald-200">ia</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài hai mươi ba: Thờ in hoa, thờ in thường, vần ia. Âm thờ, vần ia.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm Th th, ia</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Trung thu, bé được chia quà.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Trung thu, bé được chia quà.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Mid-Autumn festival with moon, lion dance, cuội and hằng nga handing out gifts */}
            <div className="relative rounded-3xl bg-gradient-to-b from-indigo-900 via-sky-800 to-amber-100 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner text-white">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center animate-pulse">
                    <span className="text-7xl drop-shadow-md">🌕✨</span>
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-bold mt-1 shadow-xs">
                      Trăng rằm vằng vặc
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">🏮🦁🥁</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-900 text-[11px] font-bold mt-1 shadow-xs border border-rose-300">
                      Múa lân rộn rã trống hội
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">🧕👸🎁👦</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-900 text-[11px] font-bold mt-1 shadow-xs border border-sky-300">
                      Chú Cuội & Chị Hằng chia quà
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-amber-200 pt-2 border-t border-white/20">
                  <span>🏮 Đêm hội Trung thu rực rỡ đèn sao</span>
                  <span>🎁 Các bạn nhỏ háo hức quây quần nhận quà</span>
                  <span>🥮 Bánh dẻo, bánh nướng thơm lừng đêm trăng</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Trung thu, bé được chia quà." with red th, ia */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto text-slate-900">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ cái <span className="text-rose-600 font-bold">th, ia</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button onClick={() => handleSpeak('Trung')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">Trung</button>
                  <button onClick={() => handleSpeak('thờ - u - thu. thu.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    <span className="text-rose-600 font-black">th</span>u,
                  </button>
                  <button onClick={() => handleSpeak('bé')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">bé</button>
                  <button onClick={() => handleSpeak('được')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">được</button>
                  <button onClick={() => handleSpeak('chờ - ia - chia. chia.')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">
                    ch<span className="text-rose-600 font-black">ia</span>
                  </button>
                  <button onClick={() => handleSpeak('quà')} className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer">quà.</button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 58) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm thờ và vần ia. Âm thờ: thờ - u - thu. thu. Vần ia: chờ - ia - chia. chia. thẻ, thọ, thơ, đĩa, mía, thìa. thủ đô, lá thư, thìa đĩa, lá tía tô.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'th' and 'ia' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'th' & TIẾNG 'thu' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'th' in red */}
                <button
                  onClick={() => handleSpeak('thờ')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm thờ"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    th
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm thờ
                  </span>
                </button>

                {/* Ô trên: [ th | u ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('thờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm thờ"
                  >
                    th
                  </button>
                  <button
                    onClick={() => handleSpeak('u')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm u"
                  >
                    u
                  </button>
                </div>

                {/* Ô dưới: [ thu ] */}
                <button
                  onClick={() => handleSpeak('thờ - u - thu. thu.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: thờ - u - thu. thu."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-rose-600">th</span>
                    <span className="text-slate-900">u</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('thờ - u - thu.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  thờ - u - thu
                </button>
              </div>

              {/* CỘT 2: VẦN 'ia' & TIẾNG 'chia' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top vowel 'ia' in red */}
                <button
                  onClick={() => handleSpeak('ia')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe vần ia"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ia
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    vần ia
                  </span>
                </button>

                {/* Ô trên: [ ch | ia ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('chờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm chờ"
                  >
                    ch
                  </button>
                  <button
                    onClick={() => handleSpeak('ia')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe vần ia"
                  >
                    ia
                  </button>
                </div>

                {/* Ô dưới: [ chia ] */}
                <button
                  onClick={() => handleSpeak('chờ - ia - chia. chia.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: chờ - ia - chia. chia."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">ch</span>
                    <span className="text-rose-600">ia</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('chờ - ia - chia.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  chờ - ia - chia
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 58: thẻ thọ thơ - đĩa mía thìa */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm/vần:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('thẻ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">thẻ</button>
                  <button onClick={() => handleSpeak('thọ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">thọ</button>
                  <button onClick={() => handleSpeak('thơ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">thơ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('đĩa')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">đĩa</button>
                  <button onClick={() => handleSpeak('mía')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">mía</button>
                  <button onClick={() => handleSpeak('thìa')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">thìa</button>
                </div>
              </div>
            </div>

            {/* 4 Real Vocabulary Images from Textbook Page 58: "thủ đô", "lá thư", "thìa đĩa", "lá tía tô" */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Image 1: Thủ đô -> 'thủ đô' */}
              <button
                onClick={() => handleSpeak('thủ đô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🏛️🇻🇳
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">thủ đô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Thủ đô Hà Nội thân yêu</span>
              </button>

              {/* Image 2: Lá thư -> 'lá thư' */}
              <button
                onClick={() => handleSpeak('lá thư')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    ✉️💌
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">lá thư</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Bức thư gửi người thân</span>
              </button>

              {/* Image 3: Thìa đĩa -> 'thìa đĩa' */}
              <button
                onClick={() => handleSpeak('thìa đĩa')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🥄🍽️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">thìa đĩa</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Bộ thìa đĩa trên bàn ăn</span>
              </button>

              {/* Image 4: Lá tía tô -> 'lá tía tô' */}
              <button
                onClick={() => handleSpeak('lá tía tô')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🌿💜
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-2xl text-slate-900">lá tía tô</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Cây thuốc dân gian quý</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 58)
              Dải kẻ 5 ô ly chuẩn: th (chấm), th (liền), ia (chấm), ia (liền), thủ đô, thìa
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
                  onClick={() => handleSpeak('Cách viết chữ th: Viết chữ t cao 3 ô ly (bắt đầu từ ĐK 2 lên ĐK 3, rồi từ ĐK 4 kéo xuống ĐK 1 uốn lên ĐK 2). Từ điểm dừng bút của t, lia bút nối liền nét sang nét khuyết trên của chữ h cao 5 ô ly vươn lên ĐK 6 rồi kéo xuống baseline, viết nét móc hai đầu dừng ở ĐK 2. Nét gạch ngang của t ở ĐK 3.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ th"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ th</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết vần ia: Viết chữ i cao 2 ô ly dừng ở đường kẻ 2, sau đó lia bút nối liền nét sang nét cong kín của chữ a cao 2 ô ly, viết nét móc ngược dừng ở đường kẻ 2. Cuối cùng lia bút chấm một dấu chấm nhỏ trên đầu chữ i.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết vần ia"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết vần ia</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết cụm từ thủ đô và tiếng thìa: Cụm từ thủ đô: viết chữ th nối sang u có dấu hỏi, cách 1 ô ly viết chữ đ cao 4 ô ly nối sang ô có dấu mũ. Tiếng thìa: viết chữ th nối sang vần ia có dấu huyền trên đầu chữ i.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết thủ đô, thìa"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết thủ đô, thìa</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">th ia</span>
                  <span>Chữ ghép th và Vần ia</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ th:</strong> Chữ t cao 3 ô ly (lên ĐK 4) nối liền sang chữ h cao 5 ô ly (lên ĐK 6). Nét gạch ngang ở ĐK 3.<br />
                  <strong>Vần ia:</strong> Chữ i (cao 2 ô ly) nối liền sang chữ a (cao 2 ô ly) + dấu chấm trên đầu i.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">thủ đô thìa</span>
                  <span>Cụm từ "thủ đô" và tiếng "thìa"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>thủ đô:</strong> Tiếng thủ (th nối u + dấu hỏi), cách 1 ô ly viết tiếng đô (đ cao 4 ô ly nối ô + dấu mũ).<br />
                  <strong>thìa:</strong> Chữ th nối vần ia + dấu huyền \ trên đầu chữ i.
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 58 OF TEXTBOOK */}
            <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                <defs>
                  <pattern id="oli-grid-page58" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                  </pattern>
                </defs>

                {/* Fill background with 22px dotted grid */}
                <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page58)" />

                {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                {/* Đường kẻ 6 (đỉnh chữ h cao 5 ô ly so với baseline y=112): y = 2 */}
                <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 5 (đỉnh chữ đ cao 4 ô ly): y = 24 */}
                <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 4 (Đỉnh chữ t cao đúng 3 ô ly): y = 46 */}
                <line x1="0" y1="46" x2="100%" y2="46" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="3 3" />

                {/* Đường kẻ 3 (đỉnh chữ a, o, ô, u, i cao 2 ô ly): y = 68 */}
                <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                {/* Đường kẻ 2 (độ cao 1 ô ly): y = 90 */}
                <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                {/* Viền trái phải */}
                <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                {/* ==============================================================
                    1. CHỮ GHÉP 'th' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                    Chữ t cao 3 ô ly (y=46) nối liền nét sang h cao 5 ô ly (y=2)
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ t */}
                  <path
                    d="M 12 90 L 21 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 21 46 L 21 104 C 21 112, 25 112, 31 112 C 34 112, 37 106, 38 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 14 68 L 28 68"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  {/* Nối sang chữ h cao 5 ô ly */}
                  <path
                    d="M 38 90 L 46 68 C 52 40, 58 2, 53 2 C 49 2, 47 10, 47 24 L 47 112"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 47 98 C 51 76, 57 68, 63 68 C 68 68, 70 76, 70 90 L 70 106 C 70 112, 73 112, 76 112"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    2. CHỮ GHÉP 'th' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 94 90 L 103 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 103 46 L 103 104 C 103 112, 107 112, 113 112 C 116 112, 119 106, 120 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 96 68 L 110 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 120 90 L 128 68 C 134 40, 140 2, 135 2 C 131 2, 129 10, 129 24 L 129 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 129 98 C 133 76, 139 68, 145 68 C 150 68, 152 76, 152 90 L 152 106 C 152 112, 155 112, 158 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    3. VẦN 'ia' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                    Chữ i (cao 2 ô ly) nối liền nét sang chữ a (cao 2 ô ly)
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ i */}
                  <path
                    d="M 176 90 L 184 68 L 184 104 C 184 112, 188 112, 194 112 C 197 112, 200 106, 202 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="184" cy="58" r="1.3" fill="#1e293b" />
                  {/* Nối chữ a */}
                  <path
                    d="M 230 74 C 224 68, 214 68, 208 76 C 202 84, 202 96, 208 104 C 214 112, 224 112, 230 104 C 234 96, 234 82, 230 74 Z"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 230 68 L 230 104 C 230 112, 234 112, 241 112 C 246 112, 250 104, 252 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    4. VẦN 'ia' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  <path
                    d="M 270 90 L 278 68 L 278 104 C 278 112, 282 112, 288 112 C 291 112, 294 106, 296 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="278" cy="58" r="1.5" fill="#000000" />
                  <path
                    d="M 324 74 C 318 68, 308 68, 302 76 C 296 84, 296 96, 302 104 C 308 112, 318 112, 324 104 C 328 96, 328 82, 324 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 324 68 L 324 104 C 324 112, 328 112, 335 112 C 340 112, 344 104, 346 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    5. CỤM TỪ 'thủ đô' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                    Tiếng thủ: th nối u + dấu hỏi ?
                    Tiếng đô: đ cao 4 ô ly nối ô + dấu mũ ^
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG THỦ */}
                  <path
                    d="M 364 90 L 373 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 373 46 L 373 104 C 373 112, 377 112, 383 112 C 386 112, 389 106, 390 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 366 68 L 380 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 390 90 L 398 68 C 404 40, 410 2, 405 2 C 401 2, 399 10, 399 24 L 399 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 399 98 C 403 76, 409 68, 415 68 C 420 68, 422 76, 422 90 L 422 106 C 422 112, 425 112, 428 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ u nối từ h */}
                  <path
                    d="M 428 112 L 434 68 L 434 102 C 434 112, 439 112, 446 112 C 453 112, 458 102, 458 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 458 68 L 458 104 C 458 112, 462 112, 466 112 C 468 112, 470 104, 471 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dấu hỏi trên u */}
                  <path
                    d="M 450 56 C 450 53, 452 52, 454 52 C 456 52, 457 53, 457 55 C 457 57, 454 58, 453 59 L 453 60"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG ĐÔ: đ cao 4 ô ly nối ô */}
                  <path
                    d="M 508 74 C 502 68, 492 68, 486 76 C 480 84, 480 96, 486 104 C 492 112, 502 112, 508 104 C 512 96, 512 82, 508 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 508 24 L 508 104 C 508 112, 512 112, 519 112 C 524 112, 528 104, 530 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 502 46 L 514 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ ô */}
                  <path
                    d="M 556 74 C 550 68, 540 68, 534 76 C 528 84, 528 96, 534 104 C 540 112, 550 112, 556 104 C 560 96, 560 82, 556 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 542 64 L 546 56 L 550 64"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* ==============================================================
                    6. TIẾNG 'thìa' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                    th nối ia + dấu huyền \ trên i
                    ============================================================== */}
                <g fill="none">
                  {/* Chữ t */}
                  <path
                    d="M 584 90 L 593 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 593 46 L 593 104 C 593 112, 597 112, 603 112 C 606 112, 609 106, 610 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 586 68 L 600 68"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 610 90 L 618 68 C 624 40, 630 2, 625 2 C 621 2, 619 10, 619 24 L 619 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 619 98 C 623 76, 629 68, 635 68 C 640 68, 642 76, 642 90 L 642 106 C 642 112, 645 112, 648 112"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ i */}
                  <path
                    d="M 648 112 L 656 68 L 656 104 C 656 112, 660 112, 666 112 C 669 112, 672 106, 674 90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="656" cy="58" r="1.5" fill="#000000" />
                  {/* Dấu huyền trên i */}
                  <path
                    d="M 660 48 L 652 54"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Chữ a nối từ i */}
                  <path
                    d="M 702 74 C 696 68, 686 68, 680 76 C 674 84, 674 96, 680 104 C 686 112, 696 112, 702 104 C 706 96, 706 82, 702 74 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 702 68 L 702 104 C 702 112, 706 112, 713 112 C 718 112, 722 104, 724 90"
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
           TRANG 59: MỤC 4 (ĐỌC CÂU "Bé chia thìa...") VÀ MỤC 5 (NÓI CHỦ ĐỀ "CẢM ƠN")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Bé chia thìa, chia đĩa cho cả nhà...") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bé chia thìa, chia đĩa cho cả nhà. Thìa đĩa to cho bố mẹ. Thìa đĩa nhỏ cho bé.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc toàn bộ câu</span>
              </button>
            </div>

            {/* Cozy family dining table matching textbook Page 59 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Family dining table */}
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👨‍👩‍👧‍👦🍽️</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-rose-300">
                      Bữa cơm gia đình ấm áp
                    </span>
                  </div>

                  {/* Child sharing spoons and plates */}
                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-7xl drop-shadow-md">👧🥄🥣✨</span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[11px] font-bold mt-1 shadow-xs">
                      Bé ngoan chia thìa đĩa
                    </span>
                  </div>

                  {/* Cozy kitchen */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🏡🍳🥛</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-sky-300">
                      Phòng ăn sạch sẽ, gọn gàng
                    </span>
                  </div>
                </div>

                {/* The Reading Sentences: 3 sentences */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-xl mx-auto my-2 space-y-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900">
                    <button onClick={() => handleSpeak('Bé')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">Bé</button>
                    <button onClick={() => handleSpeak('chia')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">chia</button>
                    <button onClick={() => handleSpeak('thìa')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">thìa,</button>
                    <button onClick={() => handleSpeak('chia')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">chia</button>
                    <button onClick={() => handleSpeak('đĩa')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">đĩa</button>
                    <button onClick={() => handleSpeak('cho')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cho</button>
                    <button onClick={() => handleSpeak('cả')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cả</button>
                    <button onClick={() => handleSpeak('nhà')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">nhà.</button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900 pt-1 border-t border-slate-100">
                    <button onClick={() => handleSpeak('Thìa')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">Thìa</button>
                    <button onClick={() => handleSpeak('đĩa')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">đĩa</button>
                    <button onClick={() => handleSpeak('to')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">to</button>
                    <button onClick={() => handleSpeak('cho')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cho</button>
                    <button onClick={() => handleSpeak('bố')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">bố</button>
                    <button onClick={() => handleSpeak('mẹ')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">mẹ.</button>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-900 pt-1 border-t border-slate-100">
                    <button onClick={() => handleSpeak('Thìa')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">Thìa</button>
                    <button onClick={() => handleSpeak('đĩa')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600">đĩa</button>
                    <button onClick={() => handleSpeak('nhỏ')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">nhỏ</button>
                    <button onClick={() => handleSpeak('cho')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">cho</button>
                    <button onClick={() => handleSpeak('bé')} className="hover:scale-110 active:scale-95 transition-transform px-2.5 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer">bé.</button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Bé ngoan ngoãn biết giúp đỡ bố mẹ chuẩn bị bàn ăn thật chu đáo, khéo léo!
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: CẢM ƠN - Ở TRƯỜNG HỌC) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Nói</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Chủ đề: Cảm ơn (Lễ phép nói lời cảm ơn ở trường học)
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSpeak('Chủ đề nói: Cảm ơn. Tranh một: Trong lớp học, cô giáo phát vở cho học sinh, các bạn đứng lên hai tay đón nhận và đồng thanh nói: Chúng em cảm ơn cô ạ! Tranh hai: Ngoài hành lang lớp học, bạn nam cho bạn nữ mượn quyển sách hay, bạn nữ vui vẻ hai tay nhận và nói: Mình cảm ơn bạn nhiều nhé! Hãy luôn nói lời cảm ơn lễ phép trong cuộc sống bé nhé!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý tình huống</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Bài học ứng xử ở trường:</strong> Khi được cô giáo phát sách vở hoặc được bạn bè giúp đỡ, cho mượn đồ dùng học tập, em cần nói lời cảm ơn như thế nào?
            </p>

            {/* 2 TÌNH HUỐNG NÓI LỜI CẢM ƠN CHUẨN XÁC THEO SGK TRANG 59 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {/* TÌNH HUỐNG 1: CÔ GIÁO PHÁT VỞ TRONG LỚP HỌC */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-rose-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Học sinh cảm ơn cô giáo phát vở
                  </h4>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-rose-100 via-amber-50 to-pink-50 flex flex-col items-center justify-center p-3 text-center border border-rose-200/60 shadow-inner">
                  <span className="text-7xl mb-1 drop-shadow-sm">👩‍🏫📖👦👧</span>
                  <span className="text-[11px] font-bold text-slate-700 bg-white/90 px-3 py-0.5 rounded-full shadow-2xs">
                    "Chúng em cảm ơn cô giáo ạ!"
                  </span>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => handleSpeak('Các bạn học sinh đứng nghiêm trang, hai tay nhận vở từ cô giáo và đồng thanh: Chúng em cảm ơn cô ạ!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-xs font-bold text-rose-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Lời cảm ơn cô giáo trong lớp</span>
                    <Volume2 className="w-4 h-4 text-rose-600" />
                  </button>
                </div>
              </div>

              {/* TÌNH HUỐNG 2: BẠN BÈ CHO MƯỢN SÁCH NGOÀI HÀNH LANG */}
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h4 className="font-kid font-bold text-sm text-slate-900">
                    Cảm ơn bạn bè giúp đỡ, cho mượn sách
                  </h4>
                </div>

                <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                  <span className="text-7xl mb-1 drop-shadow-sm">👦🤝👧📚</span>
                  <span className="text-[11px] font-bold text-slate-700 bg-white/90 px-3 py-0.5 rounded-full shadow-2xs">
                    "Mình cảm ơn bạn rất nhiều nhé!"
                  </span>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => handleSpeak('Bạn nữ tươi cười hai tay nhận quyển sách: Cảm ơn bạn đã cho mình mượn sách nhé! Mình sẽ giữ gìn cẩn thận!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Lời cảm ơn bạn bè thân thiện</span>
                    <Volume2 className="w-4 h-4 text-sky-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Speaking Practice Button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💖</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé hãy thực hành nói lời cảm ơn thầy cô và bạn bè:
                  </h5>
                  <p className="text-emerald-800">
                    Nhận đồ bằng hai tay, mắt nhìn vào người đối diện, mỉm cười và nói lời cảm ơn chân thành!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé nói lời cảm ơn rất lễ phép, lịch sự và đáng khen ngợi! Cô khen bé!');
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
                    <span>Luyện nói lời cảm ơn</span>
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

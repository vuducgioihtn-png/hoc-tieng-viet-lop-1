import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson13DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson13Detail: React.FC<Lesson13DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page38' | 'page39'>('page38');
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
      {/* Page Tabs Header: Trang 38 & Trang 39 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page38')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page38'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 38: Nhận biết, Đọc & Viết U u, Ư ư</span>
          </button>
          <button
            onClick={() => setActiveTab('page39')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page39'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🐟 Trang 39: Đọc "Cá hổ là cá dữ." & Nói "Giới thiệu"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 13! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page38' ? (
        /* =========================================================================
           TRANG 38: MỤC 1 (NHẬN BIẾT), MỤC 2 (ĐỌC) VÀ MỤC 3 (TÔ VÀ VIẾT)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 13: U u   Ư ư */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">13</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và âm vị
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-6">
                  <span>U u</span>
                  <span className="text-emerald-200">Ư ư</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười ba: U in hoa, u in thường, Ư in hoa, ư in thường. Âm u, âm ư.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm U u, Ư ư</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT (Đu đủ chín ngọt lừ.) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => handleSpeak('Đu đủ chín ngọt lừ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration matching textbook scene: Girl sitting at table eating delicious ripe papaya slices */}
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-orange-50 to-emerald-50 p-6 border border-emerald-200 overflow-hidden text-center shadow-inner">
              <div className="relative z-10 py-4 flex flex-col items-center">
                {/* Scene Elements */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl drop-shadow-md">👧🍽️</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bé gái thưởng thức đu đủ
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-bounce-slow">
                    <span className="text-6xl drop-shadow-md">🍈✨</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-orange-300">
                      Quả đu đủ chín vàng
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🥣🥄</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-emerald-300">
                      Đĩa đu đủ ngọt lừ
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-emerald-200/80">
                  <span>🍈 Quả đu đủ chín vàng ruộm</span>
                  <span>😋 Từng miếng thơm lừng, ngọt lịm</span>
                  <span>👧 Bé ăn ngon miệng và vui tươi</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Đu đủ chín ngọt lừ." with red u, ủ, ừ */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">u, ủ, ừ</span> được tô đỏ:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => handleSpeak('Đu')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    Đ<span className="text-rose-600 font-black">u</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('đờ - u - đu - hỏi - đủ. đủ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    đ<span className="text-rose-600 font-black">ủ</span>
                  </button>
                  <button
                    onClick={() => handleSpeak('chín')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    chín
                  </button>
                  <button
                    onClick={() => handleSpeak('ngọt')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    ngọt
                  </button>
                  <button
                    onClick={() => handleSpeak('lờ - ư - lư - huyền - lừ. lừ.')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100 cursor-pointer"
                  >
                    l<span className="text-rose-600 font-black">ừ</span>.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC SGK TRANG 38) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bài học âm u và âm ư. Âm u: đờ - u - đu - hỏi - đủ. đủ. Âm ư: lờ - ư - lư - huyền - lừ. lừ. dù, đủ, hũ, cử, dự, lữ. dù, đu đủ, hổ dữ.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching textbook layout: Two parallel columns for 'u' and 'ư' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-1">
              {/* CỘT 1: ÂM 'u' & TIẾNG 'đủ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'u' in red */}
                <button
                  onClick={() => handleSpeak('u')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm u"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    u
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm u
                  </span>
                </button>

                {/* Ô trên: [ đ | u ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('đờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm đờ"
                  >
                    đ
                  </button>
                  <button
                    onClick={() => handleSpeak('u')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm u"
                  >
                    u
                  </button>
                </div>

                {/* Ô dưới: [ đủ ] */}
                <button
                  onClick={() => handleSpeak('đờ - u - đu - hỏi - đủ. đủ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: đờ - u - đu - hỏi - đủ. đủ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">đ</span>
                    <span className="text-rose-600">ủ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('đờ - u - đu - hỏi - đủ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  đờ - u - đu - hỏi - đủ
                </button>
              </div>

              {/* CỘT 2: ÂM 'ư' & TIẾNG 'lừ' */}
              <div className="bg-sky-50/50 rounded-3xl p-5 border border-sky-200/80 flex flex-col items-center space-y-3">
                {/* Top sound 'ư' in red */}
                <button
                  onClick={() => handleSpeak('ư')}
                  className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Bấm để nghe âm ư"
                >
                  <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                    ư
                  </span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                    âm ư
                  </span>
                </button>

                {/* Ô trên: [ l | ư ] */}
                <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                  <button
                    onClick={() => handleSpeak('lờ')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm lờ"
                  >
                    l
                  </button>
                  <button
                    onClick={() => handleSpeak('ư')}
                    className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                    title="Bấm để nghe âm ư"
                  >
                    ư
                  </button>
                </div>

                {/* Ô dưới: [ lừ ] */}
                <button
                  onClick={() => handleSpeak('lờ - ư - lư - huyền - lừ. lừ.')}
                  className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                  title="Bấm để nghe đánh vần: lờ - ư - lư - huyền - lừ. lừ."
                >
                  <span className="font-sans font-bold text-3xl tracking-normal">
                    <span className="text-slate-900">l</span>
                    <span className="text-rose-600">ừ</span>
                  </span>
                </button>

                <button
                  onClick={() => handleSpeak('lờ - ư - lư - huyền - lừ.')}
                  className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                >
                  lờ - ư - lư - huyền - lừ
                </button>
              </div>
            </div>

            {/* DÒNG TỪ LUYỆN ĐỌC THEO VẦN SGK TRANG 38: dù đủ hũ - cử dự lữ */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 max-w-xl mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-bold block text-center">
                Luyện đọc các tiếng cùng âm:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-2xl font-bold font-sans">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('dù')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">dù</button>
                  <button onClick={() => handleSpeak('đủ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">đủ</button>
                  <button onClick={() => handleSpeak('hũ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">hũ</button>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleSpeak('cử')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">cử</button>
                  <button onClick={() => handleSpeak('dự')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">dự</button>
                  <button onClick={() => handleSpeak('lữ')} className="px-2.5 py-1 rounded-xl hover:bg-sky-100 text-slate-900 hover:text-sky-700">lữ</button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook Page 38: "dù", "đu đủ", "hổ dữ" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Chiếc dù nhảy -> 'dù' */}
              <button
                onClick={() => handleSpeak('dù. chiếc dù nhảy trên bầu trời.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🪂🌤️
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">dù</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chiếc dù lượn trên mây</span>
              </button>

              {/* Image 2: Quả đu đủ -> 'đu đủ' */}
              <button
                onClick={() => handleSpeak('đu đủ. quả đu đủ chín ngọt lịm.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🍈🍯
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">đu đủ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Quả đu đủ chín vàng</span>
              </button>

              {/* Image 3: Con hổ dữ -> 'hổ dữ' */}
              <button
                onClick={() => handleSpeak('hổ dữ. con hổ hung dữ đang vồ mồi.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-orange-50 border-2 border-slate-200 hover:border-orange-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🐯🐾
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">hổ dữ</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-orange-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Chúa tể sơn lâm dũng mãnh</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO SÁCH GIÁO KHOA TRANG 38)
              Dải kẻ 5 ô ly chuẩn: u (chấm), u (liền), ư (chấm), ư (liền), dù, hổ dữ
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
                  onClick={() => handleSpeak('Cách viết chữ u: Từ đường kẻ 2 viết nét hất lên đường kẻ 3. Viết tiếp nét móc ngược thứ nhất rộng 1.5 ô ly kéo xuống đường kẻ 1 rồi móc lên đường kẻ 3. Viết tiếp nét móc ngược thứ hai rộng 1 ô ly kéo thẳng xuống đường kẻ 1 rồi móc lên dừng ở đường kẻ 2.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ u"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ u</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết chữ ư: Viết giống chữ u cao 2 ô ly, sau đó lia bút lên đỉnh phía bên phải của nét móc thứ hai viết một nét râu nhỏ chạm đường kẻ 3 uốn cong nhẹ ra ngoài.')}
                  className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold hover:bg-teal-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ ư"
                >
                  <Play className="w-3 h-3 fill-teal-600 text-teal-600" />
                  <span>Cách viết chữ ư</span>
                </button>

                <button
                  onClick={() => handleSpeak('Cách viết tiếng dù và cụm từ hổ dữ: Tiếng dù: chữ d cao 4 ô ly nối sang u cao 2 ô ly, dấu huyền trên đầu u. Cụm từ hổ dữ: chữ h cao 5 ô ly nối sang ô có dấu hỏi, cách 1 ô ly viết tiếp chữ d cao 4 ô ly nối sang ư có dấu ngã.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết dù, hổ dữ"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết dù, hổ dữ</span>
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
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">u ư</span>
                  <span>Chữ u và Chữ ư (Cả hai đều cao 2 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Chữ u:</strong> Nét hất (ĐK 2 lên ĐK 3) + Nét móc ngược thứ nhất rộng 1.5 ô ly + Nét móc ngược thứ hai rộng 1 ô ly dừng ở ĐK 2.<br />
                  <strong>Chữ ư:</strong> Giống chữ u + nét râu nhỏ ở bên phải đỉnh nét móc thứ hai chạm ĐK 3.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">dù hổ dữ</span>
                  <span>Tiếng "dù" và cụm từ "hổ dữ"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Tiếng dù:</strong> Chữ d cao 4 ô ly nối liền nét sang chữ u cao 2 ô ly + dấu huyền \ trên đầu u.<br />
                  <strong>Cụm từ hổ dữ:</strong> Tiếng hổ (h cao 5 ô ly nối ô + dấu hỏi), cách 1 ô ly, viết tiếp tiếng dữ (d cao 4 ô ly nối ư + dấu ngã).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 38 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 38: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page38" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page38)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ h cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 5 (đỉnh chữ d cao 4 ô ly): y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ u, ư, ô - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm bắt đầu nét hất và điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      1. CHỮ 'u' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED)
                      Nét hất + nét móc ngược 1 (rộng 1.5 ô ly) + nét móc ngược 2 (rộng 1 ô ly)
                      ============================================================== */}
                  <g fill="none">
                    {/* Nét hất */}
                    <path
                      d="M 8 90 L 14 68"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Nét móc ngược thứ nhất rộng 1.5 ô ly */}
                    <path
                      d="M 14 68 L 14 102 C 14 112, 19 112, 26 112 C 33 112, 38 102, 38 68"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét móc ngược thứ hai rộng 1 ô ly */}
                    <path
                      d="M 38 68 L 38 104 C 38 112, 42 112, 46 112 C 48 112, 50 104, 51 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      2. CHỮ 'u' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 58 90 L 64 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 64 68 L 64 102 C 64 112, 69 112, 76 112 C 83 112, 88 102, 88 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 88 68 L 88 104 C 88 112, 92 112, 96 112 C 98 112, 100 104, 101 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* ==============================================================
                      3. CHỮ 'ư' THỨ BA: NÉT CHẤM MỜ (DOTTED)
                      Chữ u + nét râu ở bên phải đỉnh nét móc 2
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 108 90 L 114 68"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 114 68 L 114 102 C 114 112, 119 112, 126 112 C 133 112, 138 102, 138 68"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 138 68 L 138 104 C 138 112, 142 112, 146 112 C 148 112, 150 104, 151 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét râu nhỏ */}
                    <path
                      d="M 138 68 C 140 66, 142 67, 142 71 C 142 74, 140 76, 139 76"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      4. CHỮ 'ư' THỨ TƯ: NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    <path
                      d="M 158 90 L 164 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 164 68 L 164 102 C 164 112, 169 112, 176 112 C 183 112, 188 102, 188 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 188 68 L 188 104 C 188 112, 192 112, 196 112 C 198 112, 200 104, 201 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét râu nhỏ */}
                    <path
                      d="M 188 68 C 190 66, 192 67, 192 71 C 192 74, 190 76, 189 76"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      5. TIẾNG 'dù' THỨ NĂM: NÉT MỰC ĐEN LIỀN (SOLID)
                      Chữ d cao 4 ô ly nối u + dấu huyền \
                      ============================================================== */}
                  <g fill="none">
                    {/* Chữ d cao 4 ô ly */}
                    <path
                      d="M 230 74 C 224 68, 214 68, 208 76 C 202 84, 202 96, 208 104 C 214 112, 224 112, 230 104 C 234 96, 234 82, 230 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 230 24 L 230 104 C 230 112, 234 112, 241 112 C 246 112, 250 104, 252 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ u nối từ d */}
                    <path
                      d="M 252 90 L 256 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 256 68 L 256 102 C 256 112, 261 112, 268 112 C 275 112, 280 102, 280 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 280 68 L 280 104 C 280 112, 284 112, 288 112 C 290 112, 292 104, 293 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu huyền \ */}
                    <path
                      d="M 264 54 L 272 60"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      6. CỤM TỪ 'hổ dữ' THỨ SÁU: NÉT MỰC ĐEN LIỀN (SOLID)
                      Tiếng hổ: h cao 5 ô ly nối ô + dấu hỏi ?
                      Tiếng dữ: d cao 4 ô ly nối ư + dấu ngã ~
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG HỔ: Chữ h cao 5 ô ly */}
                    <path
                      d="M 312 90 L 323 68 C 329 54, 338 32, 338 18 C 338 7, 334 3, 329 3 C 325 3, 323 6, 323 12 L 323 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 323 92 C 327 76, 333 68, 340 68 C 346 68, 348 76, 348 88 L 348 104 C 348 112, 352 112, 356 112 C 359 112, 361 104, 362 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ô */}
                    <path
                      d="M 384 74 C 378 68, 368 68, 362 76 C 356 84, 356 96, 362 104 C 368 112, 378 112, 384 104 C 388 96, 388 82, 384 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ */}
                    <path
                      d="M 368 64 L 373 56 L 378 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu hỏi ? trên đỉnh dấu mũ */}
                    <path
                      d="M 370 50 C 370 48, 372 47, 373 47 C 375 47, 376 48, 376 50 C 376 52, 374 53, 373 54 L 373 55"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG DỮ: Chữ d cao 4 ô ly */}
                    <path
                      d="M 420 74 C 414 68, 404 68, 398 76 C 392 84, 392 96, 398 104 C 404 112, 414 112, 420 104 C 424 96, 424 82, 420 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 420 24 L 420 104 C 420 112, 424 112, 431 112 C 436 112, 440 104, 442 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ư nối từ d */}
                    <path
                      d="M 442 90 L 446 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 446 68 L 446 102 C 446 112, 451 112, 458 112 C 465 112, 470 102, 470 68"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 470 68 L 470 104 C 470 112, 474 112, 478 112 C 480 112, 482 104, 483 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét râu chữ ư */}
                    <path
                      d="M 470 68 C 472 66, 474 67, 474 71 C 474 74, 472 76, 471 76"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Dấu ngã ~ trên đầu chữ ư */}
                    <path
                      d="M 454 54 C 456 52, 458 52, 460 54 C 462 56, 464 56, 466 54"
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
           TRANG 39: MỤC 4 (ĐỌC CÂU "Cá hổ là cá dữ.") VÀ MỤC 5 (NÓI CHỦ ĐỀ "GIỚI THIỆU")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (CÂU ỨNG DỤNG "Cá hổ là cá dữ.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Cá hổ là cá dữ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe đọc câu: "Cá hổ là cá dữ."</span>
              </button>
            </div>

            {/* Fish hunting scene in deep river stream matching textbook Page 39 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-teal-100 to-emerald-100 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                  {/* Aggressive tiger fish with sharp teeth */}
                  <div className="flex flex-col items-center animate-pulse-slow">
                    <span className="text-8xl drop-shadow-md">🐟🦈</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-teal-300">
                      Cá hổ răng nhọn sắc bén
                    </span>
                  </div>

                  {/* Water bubbles */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🫧🌊</span>
                    <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-900 text-[11px] font-bold mt-1 shadow-xs">
                      Làn nước trong xanh
                    </span>
                  </div>

                  {/* School of little fish */}
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">🐟🐟🐟</span>
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-emerald-300">
                      Đàn cá nhỏ bơi tránh
                    </span>
                  </div>
                </div>

                {/* The Reading Sentence: "Cá hổ là cá dữ." */}
                <div className="p-4 rounded-2xl bg-white/95 border-2 border-emerald-300 shadow-sm max-w-md mx-auto my-2">
                  <p className="text-xs text-slate-500 mb-1">Chạm vào từng từ để nghe đọc:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-3xl sm:text-4xl font-kid font-bold text-slate-900">
                    <button
                      onClick={() => handleSpeak('Cá')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      Cá
                    </button>
                    <button
                      onClick={() => handleSpeak('hổ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      hổ
                    </button>
                    <button
                      onClick={() => handleSpeak('là')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      là
                    </button>
                    <button
                      onClick={() => handleSpeak('cá')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer"
                    >
                      cá
                    </button>
                    <button
                      onClick={() => handleSpeak('dữ')}
                      className="hover:scale-110 active:scale-95 transition-transform px-3 py-1 rounded-xl hover:bg-emerald-100 cursor-pointer text-rose-600"
                    >
                      dữ.
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  Cá hổ có hàm răng sắc nhọn lởm chởm, là loài cá săn mồi rất hung dữ dưới nước!
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
                onClick={() => handleSpeak('Chủ đề nói: Giới thiệu. Trong tranh, dưới bóng cây xanh mát râm mát ở sân trường, nhóm học sinh ngồi thành vòng tròn. Một bạn nam đứng lên tự tin giới thiệu: Chào các bạn, mình tên là Đức, mình học lớp một A, sở thích của mình là đá bóng và vẽ tranh. Chúng mình hãy tự tin giới thiệu bản thân nhé!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo gợi ý</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              💡 <strong>Gợi ý thảo luận:</strong> Bé hãy quan sát bức tranh sân trường: Các bạn học sinh đang ngồi ở đâu? Bạn nam đứng lên đang làm gì và các bạn xung quanh lắng nghe như thế nào?
            </p>

            {/* Schoolyard group circle matching Textbook Page 39 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-2xs">
                  Sinh hoạt nhóm dưới bóng cây
                </span>
                <span className="text-xs text-slate-500 font-medium">Sân trường rợp bóng cây cổ thụ</span>
              </div>

              {/* Group Visualization */}
              <div className="h-44 rounded-2xl bg-gradient-to-b from-amber-100 via-sky-50 to-emerald-50 flex flex-col items-center justify-center p-4 text-center border border-amber-200/60 shadow-inner">
                <div className="flex items-center justify-center gap-6 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👦🙋‍♂️</span>
                    <span className="text-[10px] font-bold text-slate-700 mt-1">Bạn nam đứng giới thiệu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-sm">👧👦👧👦</span>
                    <span className="text-[10px] font-bold text-slate-700 mt-1">Các bạn ngồi quanh lắng nghe</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-slate-900 bg-white/90 px-4 py-1 rounded-full shadow-2xs">
                  "Chào các bạn! Mình tên là Đức, mình học lớp 1A. Sở thích của mình là đá bóng và vẽ tranh!"
                </p>
              </div>

              {/* Practice dialogues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleSpeak('Chào các bạn! Mình tên là Đức, mình sáu tuổi, học lớp một A. Sở thích của mình là đá bóng và đọc truyện tranh!')}
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Lời giới thiệu của bạn Đức</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  onClick={() => handleSpeak('Hoan hô bạn Đức! Chào bạn Đức, rất vui được làm quen và học chung lớp với bạn!')}
                  className="p-3 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Cả nhóm vỗ tay chào đón</span>
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
                    Bé hãy tự tin đứng lên giới thiệu với cả lớp nhé!
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Bé tên là gì? Năm nay bé mấy tuổi? Bé học lớp nào và có những sở thích hay ước mơ gì?
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasPracticedSpeaking(true);
                  handleSpeak('Bé giới thiệu bản thân trước nhóm bạn rất tự tin và duyên dáng! Cả lớp vỗ tay khen ngợi bé!');
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
                    <span>Luyện giới thiệu cùng nhóm</span>
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

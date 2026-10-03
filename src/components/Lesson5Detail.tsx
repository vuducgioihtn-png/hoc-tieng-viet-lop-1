import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson5DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson5Detail: React.FC<Lesson5DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page22' | 'page23'>('page22');
  const [hasListenedStory, setHasListenedStory] = useState<boolean>(false);
  const [canvasStrokeColor, setCanvasStrokeColor] = useState<string>('#0284c7');
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
      {/* Page Tabs Header: Trang 22 & Trang 23 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page22')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page22'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🚂 Trang 22: Ôn tập chữ cái & Bảng ghép âm</span>
          </button>
          <button
            onClick={() => setActiveTab('page23')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page23'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>✍️ Trang 23: Tô viết số 6, 7, 8, 9, 0 & Kể chuyện</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 5! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page22' ? (
        /* =========================================================================
           TRANG 22: MỤC 1: ĐỌC (ĐOÀN TÀU CHỮ CÁI, BẢNG GHÉP ÂM & CÂU ĐỌC)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: BÀI 5: ÔN TẬP VÀ KỂ CHUYỆN */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">5</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Tuần 1 • Ôn tập tổng hợp
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-kid drop-shadow-sm">
                  Ôn tập và kể chuyện
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài năm: Ôn tập và kể chuyện. Ôn tập các chữ cái đã học: a, b, c, e, ê.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo giới thiệu Bài 5</span>
            </button>
          </div>

          {/* MỤC 1: ĐỌC */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Chạm vào từng toa tàu và ô chữ để nghe phát âm
              </span>
            </div>

            {/* 1. HAI ĐOÀN TÀU HỎA CHỮ CÁI: CHỮ THƯỜNG & CHỮ HOA */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 p-6 border border-emerald-200 overflow-hidden shadow-inner space-y-6">
              {/* Sun in the corner */}
              <div className="absolute top-2 right-6 text-4xl animate-bounce-slow">☀️</div>

              {/* ĐOÀN TÀU 1: CHỮ THƯỜNG (a, b, c, e, ê) - Đi lên dốc */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <span>🚂 Đoàn tàu chữ thường:</span>
                  </span>
                  <button
                    onClick={() => handleSpeak('Các chữ cái in thường: a, bờ, cờ, e, ê.')}
                    className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Đọc đoàn tàu chữ thường</span>
                  </button>
                </div>

                <div className="flex items-end justify-start gap-2 overflow-x-auto pb-2 pt-4">
                  {/* Đầu tàu xanh lá cây */}
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-5xl drop-shadow-md">🚂</span>
                    <span className="text-[10px] font-bold text-emerald-800 mt-1">Đầu tàu</span>
                  </div>

                  {/* 5 Toa vàng chở chữ thường */}
                  {[
                    { letter: 'a', sound: 'a', label: 'a', kid: '👦', desc: 'chữ a' },
                    { letter: 'b', sound: 'bờ', label: 'b', kid: '👧', desc: 'chữ bờ' },
                    { letter: 'c', sound: 'cờ', label: 'c', kid: '👦', desc: 'chữ cờ' },
                    { letter: 'e', sound: 'e', label: 'e', kid: '🧒', desc: 'chữ e' },
                    { letter: 'ê', sound: 'ê', label: 'ê', kid: '👧', desc: 'chữ ê' },
                  ].map((car, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSpeak(car.sound)}
                      className="group flex flex-col items-center bg-gradient-to-b from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 border-2 border-amber-500 rounded-2xl p-2.5 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer min-w-[70px] shrink-0"
                      title={`Bấm để nghe âm ${car.sound}`}
                    >
                      <span className="text-2xl -mt-4 mb-1 group-hover:animate-bounce">{car.kid}</span>
                      <span className="font-sans font-black text-4xl text-rose-700 group-hover:text-rose-900 leading-none drop-shadow-2xs">
                        {car.letter}
                      </span>
                      <div className="flex items-center gap-2 mt-2 pt-1 border-t border-amber-500/60 w-full justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ĐOÀN TÀU 2: CHỮ HOA (B, C, E, Ê, A) - Đi ngược chiều */}
              <div className="space-y-2 pt-2 border-t border-emerald-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                    <span>🚆 Đoàn tàu chữ in hoa:</span>
                  </span>
                  <button
                    onClick={() => handleSpeak('Các chữ cái in hoa: Bờ in hoa, Cờ in hoa, E in hoa, Ê in hoa, A in hoa.')}
                    className="text-[11px] text-sky-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Đọc đoàn tàu chữ hoa</span>
                  </button>
                </div>

                <div className="flex items-end justify-start gap-2 overflow-x-auto pb-2 pt-4">
                  {/* 5 Toa đỏ hồng chở chữ hoa */}
                  {[
                    { letter: 'B', sound: 'bờ', label: 'B', kid: '👦', desc: 'B in hoa' },
                    { letter: 'C', sound: 'cờ', label: 'C', kid: '👧', desc: 'C in hoa' },
                    { letter: 'E', sound: 'e', label: 'E', kid: '🧒', desc: 'E in hoa' },
                    { letter: 'Ê', sound: 'ê', label: 'Ê', kid: '👦', desc: 'Ê in hoa' },
                    { letter: 'A', sound: 'a', label: 'A', kid: '👧', desc: 'A in hoa' },
                  ].map((car, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSpeak(car.sound)}
                      className="group flex flex-col items-center bg-gradient-to-b from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 border-2 border-rose-600 rounded-2xl p-2.5 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer min-w-[70px] shrink-0"
                      title={`Bấm để nghe âm ${car.sound}`}
                    >
                      <span className="text-2xl -mt-4 mb-1 group-hover:animate-bounce">{car.kid}</span>
                      <span className="font-sans font-black text-4xl text-white group-hover:text-amber-200 leading-none drop-shadow-2xs">
                        {car.letter}
                      </span>
                      <div className="flex items-center gap-2 mt-2 pt-1 border-t border-rose-600/60 w-full justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      </div>
                    </button>
                  ))}

                  {/* Đầu tàu xanh dương */}
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-5xl drop-shadow-md">🚆</span>
                    <span className="text-[10px] font-bold text-sky-800 mt-1">Đầu tàu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. BẢNG GHÉP ÂM THÀNH TIẾNG (MÔ HÌNH CHUẨN SGK TRANG 22) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    📊
                  </span>
                  <h4 className="font-kid font-bold text-base text-slate-900">
                    Bảng ghép âm thành tiếng
                  </h4>
                </div>
                <span className="text-xs text-slate-500">
                  (Dấu ❌ là các âm không ghép theo quy tắc chính tả)
                </span>
              </div>

              {/* Bảng ma trận màu vàng theo đúng trong sách */}
              <div className="max-w-md mx-auto overflow-hidden rounded-2xl border-2 border-amber-400 shadow-sm bg-amber-50">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-amber-300/80">
                      <th className="py-2.5 border-r border-b border-amber-400 w-1/4"></th>
                      <th className="py-2.5 border-r border-b border-amber-400 w-1/4 font-sans font-bold text-2xl text-slate-900">
                        <button
                          onClick={() => handleSpeak('a')}
                          className="hover:scale-110 active:scale-95 transition-transform"
                          title="Âm a"
                        >
                          a
                        </button>
                      </th>
                      <th className="py-2.5 border-r border-b border-amber-400 w-1/4 font-sans font-bold text-2xl text-slate-900">
                        <button
                          onClick={() => handleSpeak('e')}
                          className="hover:scale-110 active:scale-95 transition-transform"
                          title="Âm e"
                        >
                          e
                        </button>
                      </th>
                      <th className="py-2.5 border-b border-amber-400 w-1/4 font-sans font-bold text-2xl text-slate-900">
                        <button
                          onClick={() => handleSpeak('ê')}
                          className="hover:scale-110 active:scale-95 transition-transform"
                          title="Âm ê"
                        >
                          ê
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dòng 1: Phụ âm b */}
                    <tr className="hover:bg-amber-100/60 transition-colors">
                      <td className="py-3 border-r border-b border-amber-400 font-sans font-bold text-3xl text-rose-600 bg-amber-200/60">
                        <button
                          onClick={() => handleSpeak('bờ')}
                          className="hover:scale-110 active:scale-95 transition-transform"
                          title="Âm bờ"
                        >
                          b
                        </button>
                      </td>
                      {/* b + a = ba */}
                      <td className="py-3 border-r border-b border-amber-400">
                        <button
                          onClick={() => handleSpeak('bờ - a - ba. ba.')}
                          className="w-full py-1 rounded-lg hover:bg-amber-200/80 font-sans font-bold text-2xl text-slate-900 active:scale-95 transition-all"
                          title="bờ - a - ba"
                        >
                          ba
                        </button>
                      </td>
                      {/* b + e = be */}
                      <td className="py-3 border-r border-b border-amber-400">
                        <button
                          onClick={() => handleSpeak('bờ - e - be. be.')}
                          className="w-full py-1 rounded-lg hover:bg-amber-200/80 font-sans font-bold text-2xl text-slate-900 active:scale-95 transition-all"
                          title="bờ - e - be"
                        >
                          be
                        </button>
                      </td>
                      {/* b + ê = bê */}
                      <td className="py-3 border-b border-amber-400">
                        <button
                          onClick={() => handleSpeak('bờ - ê - bê. bê.')}
                          className="w-full py-1 rounded-lg hover:bg-amber-200/80 font-sans font-bold text-2xl text-slate-900 active:scale-95 transition-all"
                          title="bờ - ê - bê"
                        >
                          bê
                        </button>
                      </td>
                    </tr>

                    {/* Dòng 2: Phụ âm c */}
                    <tr className="hover:bg-amber-100/60 transition-colors">
                      <td className="py-3 border-r border-amber-400 font-sans font-bold text-3xl text-rose-600 bg-amber-200/60">
                        <button
                          onClick={() => handleSpeak('cờ')}
                          className="hover:scale-110 active:scale-95 transition-transform"
                          title="Âm cờ"
                        >
                          c
                        </button>
                      </td>
                      {/* c + a = ca */}
                      <td className="py-3 border-r border-amber-400">
                        <button
                          onClick={() => handleSpeak('cờ - a - ca. ca.')}
                          className="w-full py-1 rounded-lg hover:bg-amber-200/80 font-sans font-bold text-2xl text-slate-900 active:scale-95 transition-all"
                          title="cờ - a - ca"
                        >
                          ca
                        </button>
                      </td>
                      {/* c + e = ❌ gạch chéo */}
                      <td
                        onClick={() => handleSpeak('Quy tắc chính tả: Chữ c không ghép với e, trong tiếng Việt phải dùng chữ k để viết thành ke, kẻ!')}
                        className="py-3 border-r border-amber-400 bg-amber-200/40 cursor-pointer relative"
                        title="Không ghép: c không đi với e"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#f59e0b" strokeWidth="2.5" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#f59e0b" strokeWidth="2.5" />
                          </svg>
                        </div>
                      </td>
                      {/* c + ê = ❌ gạch chéo */}
                      <td
                        onClick={() => handleSpeak('Quy tắc chính tả: Chữ c không ghép với ê, trong tiếng Việt phải dùng chữ k để viết thành kê, kể!')}
                        className="py-3 bg-amber-200/40 cursor-pointer relative"
                        title="Không ghép: c không đi với ê"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#f59e0b" strokeWidth="2.5" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#f59e0b" strokeWidth="2.5" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. CÁC TỪ NGỮ ỨNG DỤNG ÔN TẬP SGK TRANG 22 */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700">Các từ ngữ ứng dụng ôn tập:</span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { word: 'ba bà', audio: 'ba bà', icon: '👵' },
                  { word: 'be bé', audio: 'be bé', icon: '🐥' },
                  { word: 'cá bé', audio: 'cá bé', icon: '🐟' },
                  { word: 'bè cá', audio: 'bè cá', icon: '🛶' },
                  { word: 'bế bé', audio: 'bế bé', icon: '🤱' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSpeak(item.audio)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-sans font-bold text-2xl text-slate-800">
                      {item.word}
                    </span>
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* 4. CÂU ĐỌC ỨNG DỤNG TRONG KHUNG VÀNG: "Bà bế bé." */}
            <div className="p-4 rounded-2xl bg-[#fef08a] border-2 border-yellow-400 shadow-sm max-w-sm mx-auto text-center">
              <button
                onClick={() => handleSpeak('Bà bế bé.')}
                className="w-full flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <span className="font-sans font-bold text-3xl sm:text-4xl text-slate-900">
                  Bà bế bé.
                </span>
                <Volume2 className="w-6 h-6 text-amber-700" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           TRANG 23: MỤC 2 (TÔ VÀ VIẾT SỐ 6, 7, 8, 9, 0 & TIẾNG BẾ BÉ) VÀ MỤC 3 (KỂ CHUYỆN)
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 2: TÔ VÀ VIẾT (CHUẨN XÁC 100% THEO SÁCH GIÁO KHOA TRANG 23) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center bg-[#58be3b] rounded-full pl-1.5 pr-4 py-1 text-white shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#fbb03b] text-slate-900 font-black flex items-center justify-center text-xs mr-2 shadow-xs">
                  2
                </span>
                <span className="font-kid font-bold text-base tracking-wide">
                  Tô và viết
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak('Các chữ số cao 2 ô ly: Số 6, số 7, số 8, số 9, số 0. Và cụm từ: bế bé.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Hướng dẫn tô và viết</span>
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

            {/* Quy trình chi tiết các nét số và chữ bế bé */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">6 7</span>
                  <span>Số 6 và Số 7 (cao 2 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Số 6:</strong> Đặt bút dưới ĐK 3, viết nét cong xuống dưới lượn tròn tạo thành nét cong kín ở dưới.<br />
                  <strong>Số 7:</strong> Nét ngang ở ĐK 3, nét xiên chéo xuống ĐK 1, nét gạch ngang ngắn ở ĐK 2.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">8 9 0</span>
                  <span>Số 8, Số 9 và Số 0 (cao 2 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Số 8:</strong> Lượn cong tròn từ trên xuống dưới hình số 8 khép kín mềm mại.<br />
                  <strong>Số 9:</strong> Nét cong kín ở trên nối nét móc lượn trái ở dưới.<br />
                  <strong>Số 0:</strong> Nét cong kín hình quả trứng thon dài đứng thẳng.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">bế bé</span>
                  <span>Cụm từ "bế bé"</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Chữ <strong>b</strong> cao 5 ô ly nối sang <strong>ê</strong> cao 2 ô ly, dấu mũ ^ và dấu sắc. Cách 1 khoảng viết tiếp tiếng <strong>bé</strong> (chữ b nối sang e cao 2 ô ly + dấu sắc).
                </p>
              </div>
            </div>

            {/* DẢI Ô LY CHUẨN XÁC TRANG 23: SỐ 6 6  7 7  8 8  9 9  0 0 VÀ BẾ BÉ */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly 5 ô ly chuẩn (cao 116px, mỗi ô ly = 22px) */}
              <div className="w-full h-[126px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '126px' }}>
                  <defs>
                    <pattern id="oli-grid-page23" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Lưới ô ly vuông 22px */}
                  <rect x="0" y="0" width="100%" height="126" fill="url(#oli-grid-page23)" />

                  {/* ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ b cao 5 ô ly): y = 12 */}
                  <line x1="0" y1="12" x2="100%" y2="12" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh các chữ số 6, 7, 8, 9, 0 và chữ e, ê - cao 2 ô ly): y = 78 */}
                  <line x1="0" y1="78" x2="100%" y2="78" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (ở giữa): y = 100 */}
                  <line x1="0" y1="100" x2="100%" y2="100" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 122 */}
                  <line x1="0" y1="121.25" x2="100%" y2="121.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* ==============================================================
                      CÁC CẶP CHỮ SỐ MÀU XANH DƯƠNG CHUẨN SÁCH: 6 6  7 7  8 8  9 9  0 0
                      ============================================================== */}

                  {/* CẶP SỐ 6 (tại x=22 và x=44): 6 chấm mờ và 6 liền nét */}
                  <g fill="none">
                    {/* Số 6 nét chấm mờ */}
                    <path
                      d="M 32 80 C 26 86, 22 96, 22 108 C 22 116, 26 122, 33 122 C 40 122, 44 116, 44 108 C 44 100, 38 96, 32 96 C 26 96, 23 100, 22 106"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="1.6"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Số 6 nét mực liền */}
                    <path
                      d="M 54 80 C 48 86, 44 96, 44 108 C 44 116, 48 122, 55 122 C 62 122, 66 116, 66 108 C 66 100, 60 96, 54 96 C 48 96, 45 100, 44 106"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* CẶP SỐ 7 (tại x=88 và x=110): 7 chấm mờ và 7 liền nét */}
                  <g fill="none">
                    {/* Số 7 nét chấm mờ */}
                    <path
                      d="M 76 78 L 94 78 L 84 122 M 79 100 L 91 100"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="1.6"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Số 7 nét mực liền */}
                    <path
                      d="M 102 78 L 120 78 L 110 122 M 105 100 L 117 100"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* CẶP SỐ 8 (tại x=142 và x=164): 8 chấm mờ và 8 liền nét */}
                  <g fill="none">
                    {/* Số 8 nét chấm mờ */}
                    <path
                      d="M 142 80 C 146 78, 150 82, 150 88 C 150 94, 144 98, 140 101 C 134 104, 132 110, 132 116 C 132 122, 138 122, 142 122 C 148 122, 154 118, 154 112 C 154 106, 148 102, 142 98 C 136 94, 134 90, 134 84 C 134 78, 138 78, 142 80 Z"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="1.6"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Số 8 nét mực liền */}
                    <path
                      d="M 166 80 C 170 78, 174 82, 174 88 C 174 94, 168 98, 164 101 C 158 104, 156 110, 156 116 C 156 122, 162 122, 166 122 C 172 122, 178 118, 178 112 C 178 106, 172 102, 166 98 C 160 94, 158 90, 158 84 C 158 78, 162 78, 166 80 Z"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* CẶP SỐ 9 (tại x=198 và x=220): 9 chấm mờ và 9 liền nét */}
                  <g fill="none">
                    {/* Số 9 nét chấm mờ */}
                    <path
                      d="M 208 94 C 204 94, 198 90, 198 84 C 198 78, 204 78, 210 78 C 218 78, 220 84, 220 92 L 220 114 C 220 120, 216 122, 210 122 M 208 94 C 214 94, 220 90, 220 84"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="1.6"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Số 9 nét mực liền */}
                    <path
                      d="M 230 94 C 226 94, 220 90, 220 84 C 220 78, 226 78, 232 78 C 240 78, 242 84, 242 92 L 242 114 C 242 120, 238 122, 232 122 M 230 94 C 236 94, 242 90, 242 84"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* CẶP SỐ 0 (tại x=254 và x=276): 0 chấm mờ và 0 liền nét */}
                  <g fill="none">
                    {/* Số 0 nét chấm mờ */}
                    <path
                      d="M 264 78 C 258 78, 254 86, 254 100 C 254 114, 258 122, 264 122 C 270 122, 274 114, 274 100 C 274 86, 270 78, 264 78 Z"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="1.6"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    {/* Số 0 nét mực liền */}
                    <path
                      d="M 286 78 C 280 78, 276 86, 276 100 C 276 114, 280 122, 286 122 C 292 122, 296 114, 296 100 C 296 86, 292 78, 286 78 Z"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      TIẾNG 'bế bé' MÀU XANH DƯƠNG CHUẨN MỰC
                      ============================================================== */}
                  <g fill="none">
                    {/* Tiếng bế: Chữ b cao 5 ô ly */}
                    <path
                      d="M 320 100 L 331 78 C 337 64, 346 42, 346 28 C 346 17, 342 13, 337 13 C 333 13, 331 16, 331 22 L 331 108 C 331 117, 336 122, 342 122 C 349 122, 353 114, 353 96 C 353 86, 349 78, 344 78 C 340 78, 339 82, 343 82 C 347 82, 352 82, 359 90"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ê nối từ b */}
                    <path
                      d="M 359 90 C 364 82, 371 78, 376 79 C 382 80, 381 92, 372 102 C 363 112, 365 122, 375 122 C 381 122, 386 116, 389 108"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ */}
                    <path
                      d="M 371 74 L 376 66 L 381 74"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / */}
                    <path
                      d="M 385 60 L 380 68"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* Tiếng bé: Chữ b cao 5 ô ly */}
                    <path
                      d="M 408 100 L 419 78 C 425 64, 434 42, 434 28 C 434 17, 430 13, 425 13 C 421 13, 419 16, 419 22 L 419 108 C 419 117, 424 122, 430 122 C 437 122, 441 114, 441 96 C 441 86, 437 78, 432 78 C 428 78, 427 82, 431 82 C 435 82, 440 82, 447 90"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ e nối từ b */}
                    <path
                      d="M 447 90 C 452 82, 459 78, 464 79 C 470 80, 469 92, 460 102 C 451 112, 453 122, 463 122 C 469 122, 474 116, 477 108"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / trên chữ e */}
                    <path
                      d="M 466 62 L 460 70"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>

                {/* Interactive Drawing Canvas */}
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

              {/* Bút màu & Điều khiển */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium">Bút viết:</span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { color: '#0284c7', name: 'Mực xanh (chuẩn sách)' },
                      { color: '#0f172a', name: 'Mực đen' },
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

          {/* MỤC 3: KỂ CHUYỆN "BÚP BÊ VÀ DẾ MÈN" (CHUẨN XÁC THEO SGK TRANG 23) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  3
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-purple-950">
                    Kể chuyện: Búp bê và dế mèn
                  </h3>
                  <span className="text-xs text-purple-800 font-bold uppercase tracking-wider">
                    Truyện đọc theo tranh • Sách giáo viên
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasListenedStory(true);
                  handleSpeak('Câu chuyện: Búp bê và dế mèn. Búp bê là một cô bé rất chăm chỉ. Hằng ngày, búp bê quét nhà, lau bàn ghế, xếp bát đĩa gọn gàng ngăn nắp trong bếp. Thấy búp bê ngoan ngoãn và chăm chỉ, chú dế mèn ngoài cửa sổ đã giương cánh kéo đàn, cất tiếng hát du dương tặng búp bê. Nghe tiếng hát ngọt ngào của dế mèn, búp bê tì cằm lên bậu cửa sổ mỉm cười hạnh phúc. Búp bê cảm ơn dế mèn và hai bạn trở thành đôi bạn thân thiết của nhau.');
                  playSoundEffect.success();
                  onEarnStar();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 border border-purple-300 text-purple-900 text-xs font-bold hover:bg-purple-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Nghe cô giáo kể toàn bộ câu chuyện</span>
              </button>
            </div>

            {/* 3 Tranh minh họa truyện & 3 câu hỏi gợi ý chuẩn SGK Trang 23 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* TRANH 1 */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                    (1)
                  </span>
                  <h4 className="font-kid font-bold text-sm text-purple-950">
                    Búp bê làm những việc gì?
                  </h4>
                </div>

                {/* Tranh minh họa 1 */}
                <div className="h-44 rounded-2xl bg-gradient-to-b from-amber-100 to-rose-50 flex flex-col items-center justify-center p-3 text-center border border-amber-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">👧🧹🪑</span>
                  <span className="text-[11px] font-bold text-slate-800">
                    Búp bê mặc váy chấm bi cầm chổi quét nhà sạch bong
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Tranh một: Búp bê làm những việc gì? Búp bê là một cô bé rất chăm chỉ. Búp bê giúp mẹ quét nhà, lau bàn ghế, xếp bát đĩa gọn gàng ngăn nắp trong bếp.')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-xs font-bold text-purple-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nghe trả lời câu hỏi 1</span>
                  <Volume2 className="w-4 h-4 text-purple-600" />
                </button>
              </div>

              {/* TRANH 2 */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    (2)
                  </span>
                  <h4 className="font-kid font-bold text-sm text-amber-950">
                    Vì sao dế mèn hát tặng búp bê?
                  </h4>
                </div>

                {/* Tranh minh họa 2 */}
                <div className="h-44 rounded-2xl bg-gradient-to-b from-emerald-100 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-emerald-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🦗🎵🪟</span>
                  <span className="text-[11px] font-bold text-slate-800">
                    Dế mèn kéo đàn hát tặng búp bê bên khung cửa sổ
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Tranh hai: Vì sao dế mèn hát tặng búp bê? Vì dế mèn thấy búp bê ngoan ngoãn và chăm chỉ làm việc nhà, nên dế mèn muốn hát những khúc ca vui tươi để tặng búp bê.')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nghe trả lời câu hỏi 2</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </button>
              </div>

              {/* TRANH 3 */}
              <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    (3)
                  </span>
                  <h4 className="font-kid font-bold text-sm text-emerald-950">
                    Búp bê thấy thế nào khi nghe dế mèn hát?
                  </h4>
                </div>

                {/* Tranh minh họa 3 */}
                <div className="h-44 rounded-2xl bg-gradient-to-b from-purple-100 to-emerald-50 flex flex-col items-center justify-center p-3 text-center border border-purple-200/60 shadow-inner">
                  <span className="text-6xl mb-1 drop-shadow-sm">🥰✨🍃</span>
                  <span className="text-[11px] font-bold text-slate-800">
                    Búp bê tì cằm mỉm cười hạnh phúc lắng nghe tiếng hát
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak('Tranh ba: Búp bê thấy thế nào khi nghe dế mèn hát? Búp bê cảm thấy rất vui sướng, ấm áp và hạnh phúc. Búp bê cảm ơn dế mèn và hai bạn trở thành đôi bạn thân thiết!')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nghe trả lời câu hỏi 3</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* Ý nghĩa câu chuyện & Khen thưởng */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-purple-950">
                    Ý nghĩa bài học: Chăm chỉ và biết ơn
                  </h5>
                  <p className="text-xs text-purple-800">
                    Bé chăm chỉ làm việc nhà giúp đỡ bố mẹ sẽ luôn được mọi người yêu quý như bé búp bê ngoan!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasListenedStory(true);
                  playSoundEffect.success();
                  onEarnStar();
                  handleSpeak('Bé thật giỏi! Bé hãy luôn chăm chỉ, lễ phép và biết ơn như búp bê và dế mèn nhé!');
                }}
                className={`px-4 py-2 rounded-xl font-kid font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
                  hasListenedStory
                    ? 'bg-purple-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-900'
                }`}
              >
                {hasListenedStory ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã nghe xong câu chuyện 🌟</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>Luyện kể lại câu chuyện</span>
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

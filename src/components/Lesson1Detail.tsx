import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, PenTool, CheckCircle2, Play, Award, Sparkles } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson1DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas: () => void;
}

export const Lesson1Detail: React.FC<Lesson1DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page14' | 'page15'>('page14');
  const [hasFinishedTracing, setHasFinishedTracing] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>('#1e1b4b'); // default ink
  const [penSize, setPenSize] = useState<number>(3);
  const [isEraser, setIsEraser] = useState<boolean>(false);

  // In-page mini canvas for Section 3 "Tô và viết"
  const miniCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Initialize mini canvas for Section 3
  const initCanvas = () => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [activeTab]);

  const clearMiniCanvas = () => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setHasFinishedTracing(false);
  };

  const handleMiniDrawStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.lineWidth = isEraser ? 14 : penSize;
    ctx.strokeStyle = isEraser ? '#ffffff' : penColor;
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    playSoundEffect.pencil();
  };

  const handleMiniDrawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const handleMiniDrawEnd = () => {
    setIsDrawing(false);
  };

  const handleGradeTracing = () => {
    if (!hasDrawn) {
      speakVietnamese('Bé hãy dùng tay hoặc chuột tô theo chữ a mẫu và viết tiếp vào các ô ly nhé!');
      return;
    }

    playSoundEffect.success();
    playSoundEffect.star();
    try {
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
    } catch {}

    setHasFinishedTracing(true);
    onEarnStar();
    speakVietnamese('Bé viết chữ a rất đẹp! Nét cong kín tròn và nét móc ngược đều tay lắm!');
  };

  const handlePlayStrokeGuide = () => {
    speakVietnamese('Quy trình viết chữ a: Chữ a thường cao 2 ô ly và gồm 2 nét. Bước một, viết nét cong kín: Đặt bút ngay dưới đường kẻ ngang 3 một chút, viết nét cong tròn đều từ phải sang trái, đáy lượn tròn chạm đường kẻ ngang 1 là đường kẻ đậm ở đáy, lượn cong đi lên khép kín tại điểm xuất phát. Rộng khoảng 1 ô ly rưỡi, cao 2 ô ly. Bước hai, viết nét móc ngược phải: Lia bút lên đường kẻ ngang 3 ngay điểm tiếp xúc mép phải của nét cong kín, kéo một nét thẳng dọc xuống sườn bên phải, khi gần chạm đường kẻ 1 thì lượn cong đáy sang phải rồi móc chếch nhẹ lên, dừng bút tại đường kẻ ngang 2 ở độ cao 1 ô ly.');
  };

  return (
    <div className="space-y-6">
      {/* Page Tab Selector strictly representing Page 14 and Page 15 of Textbook */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-kid font-bold text-lg shadow-xs">
            1
          </div>
          <div>
            <h2 className="font-kid font-bold text-lg text-slate-900 leading-tight">
              Bài 1: A a (Bộ sách Kết nối tri thức với cuộc sống)
            </h2>
            <p className="text-xs text-slate-500">
              Trang 14 & 15 trong Sách Giáo Khoa Tiếng Việt 1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveTab('page14');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'page14' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Trang 14 (Nhận biết, Đọc, Tô & Viết)
          </button>
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveTab('page15');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'page15' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Trang 15 (Đọc tình huống & Nói)
          </button>
        </div>
      </div>

      {/* ========================================================
          TRANG 14: NHẬN BIẾT - ĐỌC - TÔ VÀ VIẾT
          ======================================================== */}
      {activeTab === 'page14' && (
        <div className="space-y-6">
          {/* Header Badge like in Textbook */}
          <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-700 flex flex-col items-center justify-center shadow-lg font-kid">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Bài</span>
                <span className="text-3xl font-black leading-none">1</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái đầu tiên
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-3">
                  <span>A</span>
                  <span className="text-emerald-200">a</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => speakVietnamese('Chữ A in hoa, chữ a in thường. Phát âm là a!')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm A</span>
            </button>
          </div>

          {/* MỤC 1: NHẬN BIẾT */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Nhận biết</h3>
              </div>
              <button
                onClick={() => speakVietnamese('Nam và Hà ca hát.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Stage Illustration Visualizing the Textbook Scene */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-100 p-6 border border-amber-200 overflow-hidden text-center shadow-inner">
              {/* Sun Backdrop */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-24 bg-yellow-300/80 rounded-t-full blur-xs" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-4xl animate-bounce-slow">☀️</div>

              {/* Music notes */}
              <div className="absolute top-6 left-12 text-2xl animate-float">🎵</div>
              <div className="absolute top-8 right-16 text-3xl animate-float delay-100">🎶</div>
              <div className="absolute top-16 left-28 text-xl animate-float delay-200">🎼</div>

              {/* Stage Scene Characters */}
              <div className="relative z-10 py-6 flex flex-col items-center">
                <div className="flex items-end justify-center gap-8 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👦</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-amber-300">
                      Bạn Nam (hát mic 🎤)
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👧</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[11px] font-bold mt-1 shadow-xs border border-amber-300">
                      Bạn Hà (hát mic 🎤)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-2 pt-2 border-t border-emerald-300/60">
                  <span className="text-2xl">💐 Các bạn tặng hoa</span>
                  <span className="text-2xl">👏 Vỗ tay rộn ràng</span>
                  <span className="text-2xl">🌸 Sân khấu trường em</span>
                </div>
              </div>

              {/* The Recognition Sentence: "Nam và Hà ca hát." with RED 'a' letters */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe tiếng, các chữ <span className="text-rose-600 font-bold">a</span> được tô đỏ:
                </p>
                <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => speakVietnamese('Nam')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    N<span className="text-rose-600 font-black">a</span>m
                  </button>
                  <button
                    onClick={() => speakVietnamese('và')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    v<span className="text-rose-600 font-black">à</span>
                  </button>
                  <button
                    onClick={() => speakVietnamese('Hà')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    H<span className="text-rose-600 font-black">à</span>
                  </button>
                  <button
                    onClick={() => speakVietnamese('ca')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    c<span className="text-rose-600 font-black">a</span>
                  </button>
                  <button
                    onClick={() => speakVietnamese('hát')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    h<span className="text-rose-600 font-black">á</span>t.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <span className="text-xs text-sky-700">Mở rộng miệng phát âm tròn âm A</span>
            </div>

            {/* Big 'a' letter card exactly as on page 14 */}
            <div className="flex flex-col items-center justify-center py-6 bg-sky-50/60 rounded-3xl border border-sky-200">
              <button
                onClick={() => speakVietnamese('a')}
                className="w-36 h-36 rounded-3xl bg-white border-4 border-sky-300 shadow-md flex items-center justify-center hover:scale-108 active:scale-95 transition-all group relative cursor-pointer"
                title="Bấm để nghe đọc chữ a"
              >
                <span className="font-kid font-black text-7xl text-rose-600 group-hover:scale-105 transition-transform">
                  a
                </span>
                <span className="absolute bottom-2 text-xs font-semibold text-slate-400 group-hover:text-sky-600 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" /> Chạm để nghe
                </span>
              </button>
              <p className="text-xs text-slate-600 mt-3 font-medium">
                Phát âm: Mở rộng miệng tự nhiên, luồng hơi thoát ra tự do: <span className="font-bold text-rose-600 text-sm">"a"</span>
              </p>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO HÌNH ẢNH SÁCH GIÁO KHOA TRANG 14)
              ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            {/* Header Badge: Exactly matching the textbook's [3] Tô và viết */}
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
                  onClick={handlePlayStrokeGuide}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Nghe quy trình viết</span>
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

            {/* Quy trình chi tiết 2 nét chuẩn chữ viết ô ly tiểu học */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Nét 1: Nét cong kín (cao 2 ô ly, rộng 1,5 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Đặt bút dưới đường kẻ ngang 3 một chút. Viết nét cong tròn đều từ phải sang trái, đáy chạm đường kẻ ngang 1 (đậm ở đáy), lượn lên khép kín tại điểm xuất phát.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Nét 2: Nét móc ngược phải (cao 2 ô ly, dừng ở độ cao 1 ô ly)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Lia bút lên đường kẻ ngang 3 (ngay mép phải nét cong kín), kéo thẳng dọc xuống sườn phải. Gần chạm đường kẻ ngang 1 thì lượn cong đáy sang phải, dừng bút tại đường kẻ ngang 2.
                </p>
              </div>
            </div>

            {/* THE EXACT 4-Ô-LY GRID STRIP AS IN THE TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Outer Blue Bordered Strip with Fixed Height = 96px (exactly 4 ô ly of 24px) */}
              <div className="w-full h-[96px] relative bg-white overflow-hidden">
                {/* SVG RENDERING BOTH THE 4-Ô-LY GRID AND THE 2-Ô-LY LETTERS 'a' IN THE SAME UNIFIED COORDINATES */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '96px' }}>
                  <defs>
                    {/* Exact 24px square grid pattern */}
                    <pattern id="oli-tb-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#7dd3fc" strokeWidth="0.75" />
                    </pattern>
                  </defs>

                  {/* Fill entire background with the 24px square grid */}
                  <rect x="0" y="0" width="100%" height="96" fill="url(#oli-tb-grid)" />

                  {/* 3 Horizontal lines inside (spaced by exactly 24px) */}
                  {/* Đường kẻ 4: y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.75" />
                  {/* Đường kẻ ngang 3 (ĐỈNH CHỮ A - đúng 2 ô ly tính từ đáy): y = 48 */}
                  <line x1="0" y1="48" x2="100%" y2="48" stroke="#7dd3fc" strokeWidth="0.85" />
                  {/* Đường kẻ ngang 2 (ĐIỂM DỪNG BÚT NÉT MÓC - đúng 1 ô ly tính từ đáy): y = 72 */}
                  <line x1="0" y1="72" x2="100%" y2="72" stroke="#7dd3fc" strokeWidth="0.85" />

                  {/* Outer Blue Border (Standard textbook blue outline) */}
                  <rect x="0.75" y="0.75" width="calc(100% - 1.5px)" height="94.5" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                  {/* Đường kẻ ngang 1 (ĐƯỜNG KẺ ĐẬM Ở ĐÁY): y = 96 */}
                  <line x1="0" y1="95.25" x2="100%" y2="95.25" stroke="#0284c7" strokeWidth="1.8" />

                  {/* --- CHỮ 'a' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED) --- */}
                  {/* Nét móc ngược chạy chuẩn xác trên đường kẻ dọc x=48, dừng bút tại đường kẻ dọc x=72 và đường kẻ ngang y=72 */}
                  <g fill="none">
                    {/* Nét 1: Nét cong kín (cao 2 ô ly = 48px, rộng 1.5 ô ly = 36px, mép phải chạm đường kẻ dọc x=48) */}
                    <path
                      d="M 44 53 C 38 48, 24 48, 17 57 C 12 63, 12 81, 17 87 C 24 96, 38 96, 44 90 C 48 84, 48 62, 44 53 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2.5 2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét 2: Nét móc ngược phải (chạy thẳng TRÙNG VỚI ĐƯỜNG KẺ DỌC x=48, chạm đáy y=96, hất lên dừng bút đúng tại đường kẻ dọc x=72 và đường kẻ ngang 2 y=72) */}
                    <path
                      d="M 48 48 L 48 85 C 48 93, 52 96, 60 96 C 66 96, 70 86, 72 72"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2.5 2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* --- CHỮ 'a' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID) --- */}
                  {/* Nét móc ngược chạy chuẩn xác trên đường kẻ dọc x=192, dừng bút tại đường kẻ dọc x=216 */}
                  <g fill="none">
                    {/* Nét 1: Nét cong kín (Solid, mép phải chạm đường kẻ dọc x=192) */}
                    <path
                      d="M 188 53 C 182 48, 168 48, 161 57 C 156 63, 156 81, 161 87 C 168 96, 182 96, 188 90 C 192 84, 192 62, 188 53 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Nét 2: Nét móc ngược phải (Solid, chạy thẳng TRÙNG VỚI ĐƯỜNG KẺ DỌC x=192, dừng bút tại đường kẻ dọc x=216 và đường kẻ ngang 2 y=72) */}
                    <path
                      d="M 192 48 L 192 85 C 192 93, 196 96, 204 96 C 210 96, 214 86, 216 72"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                {/* Pen color & tool selection */}
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium">Bút viết:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setPenColor('#1e1b4b');
                        setIsEraser(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                        penColor === '#1e1b4b' && !isEraser
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                      <span>Mực đen</span>
                    </button>

                    <button
                      onClick={() => {
                        setPenColor('#4338ca');
                        setIsEraser(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                        penColor === '#4338ca' && !isEraser
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                      <span>Mực tím</span>
                    </button>

                    <button
                      onClick={() => {
                        setPenColor('#0284c7');
                        setIsEraser(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                        penColor === '#0284c7' && !isEraser
                          ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                      <span>Mực xanh</span>
                    </button>

                    <button
                      onClick={() => setIsEraser(!isEraser)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                        isEraser
                          ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      <span>Tẩy</span>
                    </button>
                  </div>
                </div>

                {/* Grading Action */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGradeTracing}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-kid font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Chấm điểm bài viết</span>
                  </button>

                  <button
                    onClick={onGoToWritingCanvas}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1"
                  >
                    <PenTool className="w-3 h-3 text-slate-500" />
                    <span>Vở tập viết lớn</span>
                  </button>
                </div>
              </div>
            </div>

            {hasFinishedTracing && (
              <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Bé viết chữ a rất nắn nót và chuẩn ô ly sách giáo khoa! (+1 sao ⭐)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TRANG 15: ĐỌC TÌNH HUỐNG & NÓI
          ======================================================== */}
      {activeTab === 'page15' && (
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (TÌNH HUỐNG THẢ DIỀU & TRƯỢT NƯỚC REO 'A') */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Đọc (Trang 15)</h3>
                  <p className="text-xs text-slate-500">
                    Bé chạm vào bong bóng thoại để cùng các bạn nhỏ reo to chữ "a" nhé!
                  </p>
                </div>
              </div>

              <button
                onClick={() => speakVietnamese('A! Thả diều bay cao quá! A! Trượt máng nước thích quá!')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo đọc mẫu</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Situation 1: Thả diều reo 'a' */}
              <div className="rounded-3xl bg-gradient-to-b from-sky-100 to-emerald-100 p-5 border border-sky-200 flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/80 text-sky-800 font-bold text-xs shadow-2xs">
                    Tình huống 1: Thả diều
                  </span>
                  <button
                    onClick={() => speakVietnamese('A! Cánh diều no gió bay cao vút trên bầu trời xanh!')}
                    className="p-1.5 rounded-xl bg-white text-sky-700 shadow-2xs hover:bg-sky-50"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="my-6 flex flex-col items-center justify-center relative">
                  <div className="text-6xl mb-2 animate-bounce-slow">🪁 👦 👧</div>
                  <p className="text-xs text-slate-600 italic">
                    Các bạn nhỏ chạy nhảy trên bãi cỏ, nhìn diều bay cao thích thú reo vang!
                  </p>

                  {/* Speech bubble 'a' */}
                  <button
                    onClick={() => {
                      playSoundEffect.star();
                      speakVietnamese('A!');
                    }}
                    className="mt-3 px-6 py-2 rounded-2xl bg-white border-2 border-sky-400 font-kid font-black text-4xl text-rose-600 shadow-md hover:scale-110 active:scale-95 transition-transform flex items-center gap-2 group-hover:border-rose-400"
                  >
                    <span>💬</span>
                    <span>a</span>
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 text-center text-[11px] text-sky-900 font-medium">
                  Tiếng reo ngạc nhiên, vui sướng: <b className="text-rose-600 text-sm">A!</b>
                </div>
              </div>

              {/* Situation 2: Trượt máng nước reo 'a' */}
              <div className="rounded-3xl bg-gradient-to-b from-pink-100 via-purple-100 to-sky-100 p-5 border border-purple-200 flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/80 text-purple-800 font-bold text-xs shadow-2xs">
                    Tình huống 2: Công viên nước
                  </span>
                  <button
                    onClick={() => speakVietnamese('A! Bố và bé trượt máng nước bắn tung tóe thật là sảng khoái!')}
                    className="p-1.5 rounded-xl bg-white text-purple-700 shadow-2xs hover:bg-purple-50"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="my-6 flex flex-col items-center justify-center relative">
                  <div className="text-6xl mb-2 animate-bounce-slow">🌊 🏊‍♂️ 👦</div>
                  <p className="text-xs text-slate-600 italic">
                    Bố ôm bé trượt dốc nước uốn lượn rực rỡ, nước bắn tung tóe reo vui!
                  </p>

                  {/* Speech bubble 'a' */}
                  <button
                    onClick={() => {
                      playSoundEffect.star();
                      speakVietnamese('A!');
                    }}
                    className="mt-3 px-6 py-2 rounded-2xl bg-white border-2 border-purple-400 font-kid font-black text-4xl text-rose-600 shadow-md hover:scale-110 active:scale-95 transition-transform flex items-center gap-2 group-hover:border-rose-400"
                  >
                    <span>💬</span>
                    <span>a</span>
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 text-center text-[11px] text-purple-900 font-medium">
                  Cảm giác sảng khoái, bất ngờ: <b className="text-rose-600 text-sm">A!</b>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI: CHỦ ĐỀ CHÀO HỎI */}
          <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-rose-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-rose-950">Nói: Chào hỏi (Trang 15)</h3>
                  <p className="text-xs text-slate-500">
                    Chào hỏi lễ phép khi đến trường và khi gặp thầy cô giáo
                  </p>
                </div>
              </div>

              <span className="text-xs text-rose-700 font-semibold">Chạm vào từng tranh để nghe lời chào</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Scene 1: Chào bố ở cổng trường Lê Quý Đôn */}
              <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase">
                    Trường Tiểu Học Lê Quý Đôn
                  </span>
                  <span className="text-2xl">🏫</span>
                </div>

                <div className="h-32 rounded-2xl bg-white border border-amber-200 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-4xl mb-1">🛵 👨 👦</span>
                  <p className="text-xs text-slate-700 font-medium">
                    Bố đưa bạn Nam đến cổng trường
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => speakVietnamese('Con chào bố con vào lớp ạ!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-left text-xs font-bold text-amber-950 flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <span>👦 Nam: "Con chào bố con vào lớp ạ!"</span>
                    <Volume2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  </button>
                  <button
                    onClick={() => speakVietnamese('Bố chào con! Con học chăm chỉ và ngoan ngoãn nhé!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-left text-xs font-bold text-slate-700 flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <span>👨 Bố: "Bố chào con, học ngoan nhé!"</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Scene 2: Chào cô giáo ở cửa lớp */}
              <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase">
                    Trước Cửa Lớp Học
                  </span>
                  <span className="text-2xl">👩‍🏫</span>
                </div>

                <div className="h-32 rounded-2xl bg-white border border-emerald-200 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-4xl mb-1">👩‍🏫 🚪 👦</span>
                  <p className="text-xs text-slate-700 font-medium">
                    Cô giáo đón bạn Nam ở cửa lớp học
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => speakVietnamese('Em chào cô ạ!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 text-left text-xs font-bold text-emerald-950 flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <span>👦 Nam: "Em chào cô ạ!" (khoanh tay lễ phép)</span>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  </button>
                  <button
                    onClick={() => speakVietnamese('Cô chào em! Mời em vào lớp chuẩn bị học bài mới nào!')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 text-left text-xs font-bold text-slate-700 flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <span>👩‍🏫 Cô giáo: "Cô chào em, vào lớp thôi nào!"</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

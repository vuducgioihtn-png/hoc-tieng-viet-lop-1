import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, PenTool, CheckCircle2, Play, Award, Sparkles, Heart } from 'lucide-react';
import { speakVietnamese, speakPhonics, playSoundEffect } from '../utils/soundEffects';

interface Lesson2DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas: () => void;
}

export const Lesson2Detail: React.FC<Lesson2DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page16' | 'page17'>('page16');
  const [hasFinishedTracing, setHasFinishedTracing] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>('#1e1b4b');
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
    ctx.lineWidth = isEraser ? 16 : penSize;
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
      speakVietnamese('Bé hãy dùng tay hoặc chuột tô theo chữ b và chữ bà mẫu rồi viết tiếp nhé!');
      return;
    }

    playSoundEffect.success();
    playSoundEffect.star();
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}

    setHasFinishedTracing(true);
    onEarnStar();
    speakVietnamese('Bé viết chữ b và chữ bà rất đẹp! Nét khuyết trên cao 5 ô ly chuẩn thẳng và nét thắt rất xinh xắn!');
  };

  const handlePlayStrokeGuideB = () => {
    speakVietnamese('Quy trình viết chữ b: Chữ b thường cao 5 ô ly, gồm nét khuyết trên và nét móc ngược kết hợp nét thắt. Đặt bút trên đường kẻ ngang 2, viết nét khuyết trên cao 5 ô ly chạm đường kẻ ngang 6, uốn sang trái kéo thẳng dọc xuống dọc theo đường kẻ dọc chạm đường kẻ ngang 1 ở đáy. Sau đó lượn cong đáy sang phải, đi lên đến đường kẻ ngang 3 thì lượn vào trong tạo vòng thắt nhỏ, dừng bút gần đường kẻ ngang 3.');
  };

  const handlePlayStrokeGuideBa = () => {
    speakVietnamese('Quy trình viết tiếng bà: Viết chữ b cao 5 ô ly trước, từ nét thắt chữ b lia bút nối liền sang nét cong kín của chữ a cao 2 ô ly. Viết nét móc ngược chữ a dừng ở đường kẻ ngang 2. Cuối cùng lia bút lên đặt dấu huyền xiên ngắn trên đầu chữ a, dưới đường kẻ ngang 4.');
  };

  return (
    <div className="space-y-6">
      {/* Top Page Selector Tabs (Trang 16 & Trang 17) */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-kid font-bold text-lg shadow-xs">
            2
          </div>
          <div>
            <h2 className="font-kid font-bold text-lg text-slate-900 leading-tight">
              Bài 2: B b, Dấu huyền ( \ )
            </h2>
            <p className="text-xs text-slate-500">
              Trang 16 & 17 · Sách Giáo Khoa Tiếng Việt 1 (Kết nối tri thức với cuộc sống)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveTab('page16');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'page16' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Trang 16 (Nhận biết, Đọc, Tô & Viết)
          </button>
          <button
            onClick={() => {
              playSoundEffect.click();
              setActiveTab('page17');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'page17' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Trang 17 (Đọc "A, bà." & Nói Gia đình)
          </button>
        </div>
      </div>

      {/* ========================================================
          TRANG 16: NHẬN BIẾT - ĐỌC - TÔ VÀ VIẾT
          ======================================================== */}
      {activeTab === 'page16' && (
        <div className="space-y-6">
          {/* Header Banner exactly like Textbook Page 16 */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-700 flex flex-col items-center justify-center shadow-lg font-kid">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Bài</span>
                <span className="text-3xl font-black leading-none">2</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Chữ cái và dấu thanh
                </span>
                <h1 className="text-4xl font-black font-kid drop-shadow-sm flex items-center gap-4">
                  <span>B</span>
                  <span className="text-emerald-200">b</span>
                  <span className="text-amber-300 text-5xl font-mono leading-none">\</span>
                </h1>
              </div>
            </div>

            <button
              onClick={() => speakVietnamese('Bài hai: B in hoa, b in thường, dấu huyền. Âm bờ, dấu huyền.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo phát âm B b \</span>
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
                onClick={() => speakVietnamese('Bà cho bé búp bê.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration of Grandma giving doll to granddaughter */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-amber-50 to-orange-50 p-6 border border-amber-200 overflow-hidden text-center shadow-inner">
              <div className="absolute top-2 right-6 text-3xl animate-bounce-slow">🪟</div>
              <div className="absolute top-4 left-6 text-2xl animate-float">☀️</div>

              <div className="relative z-10 py-4 flex flex-col items-center">
                <div className="flex items-center justify-center gap-8 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👧</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bé gái đón quà 🎁
                    </span>
                  </div>

                  <div className="flex flex-col items-center animate-pulse-slow">
                    <span className="text-5xl">🪆</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold mt-1 shadow-xs border border-rose-300">
                      Búp bê tóc vàng
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">👵</span>
                    <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold mt-1 shadow-xs border border-amber-300">
                      Bà hiền hậu tặng quà
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-amber-200/80">
                  <span>🦆 Vịt vàng trên bàn</span>
                  <span>🛋️ Phòng khách ấm cúng</span>
                  <span>🧡 Tình bà cháu yêu thương</span>
                </div>
              </div>

              {/* The Recognition Sentence with RED 'B', 'b' and tone marks */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm max-w-lg mx-auto">
                <p className="text-xs text-slate-500 mb-1">
                  Chạm vào từng từ để nghe đọc, các chữ <span className="text-rose-600 font-bold">B, b</span> được tô đỏ:
                </p>
                <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-kid font-bold text-slate-800">
                  <button
                    onClick={() => speakVietnamese('Bà')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    <span className="text-rose-600 font-black">B</span>à
                  </button>
                  <button
                    onClick={() => speakVietnamese('cho')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    cho
                  </button>
                  <button
                    onClick={() => speakVietnamese('bé')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    <span className="text-rose-600 font-black">b</span>é
                  </button>
                  <button
                    onClick={() => speakVietnamese('búp')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    <span className="text-rose-600 font-black">b</span>úp
                  </button>
                  <button
                    onClick={() => speakVietnamese('bê')}
                    className="hover:scale-110 active:scale-95 transition-transform px-2 py-1 rounded-xl hover:bg-amber-100"
                  >
                    <span className="text-rose-600 font-black">b</span>ê.
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: ĐỌC (MÔ HÌNH ĐÁNH VẦN & TỪ ỨNG DỤNG - CHUẨN XÁC THEO SGK TRANG 16) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-kid font-bold text-xl text-sky-950">Đọc</h3>
              </div>
              <button
                onClick={() => speakVietnamese('Bài học âm bờ và dấu huyền. Âm bờ. bờ... a... ba. ba. bờ... a... ba... huyền... bà. bà. ba, bà, ba ba.')}
                className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* Phonics Diagram Tree matching exactly textbook layout */}
            <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-200/80 max-w-lg mx-auto flex flex-col items-center space-y-3">
              {/* Top sound 'b' */}
              <button
                onClick={() => speakVietnamese('bờ')}
                className="group flex flex-col items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title="Bấm để nghe phát âm: bờ"
              >
                <span className="font-sans font-black text-5xl text-rose-600 leading-none drop-shadow-2xs">
                  b
                </span>
                <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 mt-1">
                  bờ
                </span>
              </button>

              {/* Connecting Branching Tree Lines */}
              <div className="w-56 h-5 relative flex items-center justify-center">
                <div className="absolute top-0 w-44 h-4 border-t-2 border-l-2 border-r-2 border-sky-300 rounded-t-xs" />
                <div className="w-0.5 h-2 bg-sky-300 -mt-3" />
              </div>

              {/* Two Column Phonics Models: 'ba' and 'bà' */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-md pt-1">
                {/* CỘT 1: TIẾNG 'ba' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ b | a ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => speakVietnamese('bờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm bờ"
                    >
                      b
                    </button>
                    <button
                      onClick={() => speakVietnamese('a')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm a"
                    >
                      a
                    </button>
                  </div>

                  {/* Ô dưới: [ ba ] (liền khối, chữ b đỏ, chữ a đen, chuẩn font chữ) */}
                  <button
                    onClick={() => speakVietnamese('bờ... a... ba. ba.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đọc trơn tiếng: ba"
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal">
                      <span className="text-rose-600">b</span>
                      <span className="text-slate-900">a</span>
                    </span>
                  </button>

                  <button
                    onClick={() => speakVietnamese('bờ... a... ba.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    bờ - a - ba
                  </button>
                </div>

                {/* CỘT 2: TIẾNG 'bà' */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Ô trên: [ b | a ] */}
                  <div className="w-full flex rounded-lg bg-[#e0f2fe] border border-[#7dd3fc] shadow-2xs overflow-hidden">
                    <button
                      onClick={() => speakVietnamese('bờ')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-rose-600 border-r border-[#7dd3fc] hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm bờ"
                    >
                      b
                    </button>
                    <button
                      onClick={() => speakVietnamese('a')}
                      className="flex-1 py-2 text-center font-sans font-bold text-3xl text-slate-900 hover:bg-[#bae6fd] transition-colors cursor-pointer"
                      title="Bấm để nghe âm a"
                    >
                      a
                    </button>
                  </div>

                  {/* Ô dưới: [ bà ] (liền khối chuẩn xác, chữ b đỏ, tiếng bà tự nhiên với dấu huyền) */}
                  <button
                    onClick={() => speakVietnamese('bờ... a... ba... huyền... bà. bà.')}
                    className="w-full py-2 rounded-lg bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] shadow-2xs flex items-center justify-center transition-all active:scale-98 cursor-pointer"
                    title="Bấm để nghe đánh vần và đọc trơn: bà"
                  >
                    <span className="font-sans font-bold text-3xl tracking-normal flex items-center justify-center">
                      <span className="text-rose-600">b</span>
                      <span className="text-rose-600 font-sans">à</span>
                    </span>
                  </button>

                  <button
                    onClick={() => speakVietnamese('bờ... a... ba... huyền... bà.')}
                    className="text-xs text-slate-600 font-semibold pt-1 hover:text-sky-700 cursor-pointer"
                  >
                    bờ - a - ba - huyền - bà
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Real Vocabulary Images from Textbook: "ba", "bà", "ba ba" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Image 1: Number 3 -> 'ba' */}
              <button
                onClick={() => speakVietnamese('Số ba. ba.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="font-sans font-black text-8xl text-rose-600 drop-shadow-md group-hover:scale-110 transition-transform">
                    3
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">ba</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Số ba</span>
              </button>

              {/* Image 2: Grandma sitting on bench -> 'bà' */}
              <button
                onClick={() => speakVietnamese('Người bà. bà.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    👵🪑
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">bà</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Bà ngồi phe phẩy quạt</span>
              </button>

              {/* Image 3: Softshell turtle -> 'ba ba' */}
              <button
                onClick={() => speakVietnamese('Con ba ba. ba ba.')}
                className="p-4 rounded-3xl bg-slate-50 hover:bg-cyan-50 border-2 border-slate-200 hover:border-cyan-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    🐢🌊
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                  <span className="font-sans font-bold text-3xl text-slate-900">ba ba</span>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-cyan-600" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Con ba ba</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              MỤC 3: TÔ VÀ VIẾT (CHUẨN 100% THEO HÌNH ẢNH SÁCH GIÁO KHOA TRANG 16)
              Dải kẻ cao 5 ô ly chuẩn nét chữ b và chữ bà!
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
                  onClick={handlePlayStrokeGuideB}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ b"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết chữ b</span>
                </button>

                <button
                  onClick={handlePlayStrokeGuideBa}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết chữ bà"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết chữ bà</span>
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

            {/* Quy trình chi tiết 2 nét chuẩn chữ b và chữ bà */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">b</span>
                  <span>Chữ b (cao 5 ô ly): Nét khuyết trên + Nét thắt</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Đặt bút trên ĐK ngang 2, viết nét khuyết trên cao 5 ô ly chạm ĐK ngang 6, kéo thẳng dọc xuống dọc theo đường kẻ dọc chạm ĐK ngang 1 (đáy). Lượn cong lên ĐK ngang 3 tạo nét thắt nhỏ, dừng bút gần ĐK ngang 3.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">bà</span>
                  <span>Tiếng bà: Chữ b nối chữ a + Dấu huyền</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Viết chữ b cao 5 ô ly, từ nét thắt lia bút nối liền sang nét cong kín chữ a cao 2 ô ly. Nét móc ngược chữ a dừng ở ĐK ngang 2. Đặt dấu huyền \ ngắn trên đầu chữ a (dưới ĐK ngang 4).
                </p>
              </div>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP FROM TEXTBOOK CROP */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Outer Strip with Fixed Height = 110px (5 ô ly of 22px) */}
              <div className="w-full h-[110px] relative bg-white overflow-hidden shadow-xs">
                {/* SVG RENDERING: EXACT GRID AND STROKES MATCHING USER'S TEXTBOOK CROP */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '110px' }}>
                  <defs>
                    {/* Uniform 22px dotted square grid pattern matching image.png */}
                    <pattern id="oli-crop-grid-lesson2" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.75" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill entire background with the uniform 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="110" fill="url(#oli-crop-grid-lesson2)" />

                  {/* THE TWO PROMINENT SOLID BLUE LINES FROM TEXTBOOK CROP */}
                  {/* Đường kẻ ngang 3 (ĐƯỜNG KẺ XANH ĐẬM Ở ĐỘ CAO 2 Ô LY - ĐIỂM GIAO NHAU NÉT KHUYẾT, ĐỈNH CHỮ A & NÉT THẮT CHỮ B): y = 66 */}
                  <line x1="0" y1="66" x2="100%" y2="66" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ ngang 1 (ĐƯỜNG KẺ XANH ĐẬM Ở ĐÁY - BASELINE): y = 110 */}
                  <line x1="0" y1="109.25" x2="100%" y2="109.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Outer Left & Right blue borders */}
                  <line x1="0.75" y1="0" x2="0.75" y2="110" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="110" stroke="#0284c7" strokeWidth="1.5" />

                  {/* --- CHỮ 'b' THỨ NHẤT: NÉT CHẤM MỜ (DOTTED) --- */}
                  {/* Nét khuyết vươn sang phải, lượn đỉnh tròn êm ái, kéo thẳng đứng dọc dòng kẻ x=44 */}
                  <g fill="none">
                    <path
                      d="M 33 88 L 44 66 C 50 52, 59 30, 59 16 C 59 5, 55 1, 50 1 C 46 1, 44 4, 44 10 L 44 96 C 44 105, 49 110, 55 110 C 62 110, 66 102, 66 84 C 66 74, 62 66, 57 66 C 53 66, 52 70, 56 70 C 60 70, 65 67, 70 66"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* --- CHỮ 'b' THỨ HAI: NÉT MỰC ĐEN LIỀN (SOLID) --- */}
                  {/* Nét khuyết đỉnh tròn mượt mà, thân sổ thẳng đứng hoàn hảo theo dòng kẻ x=176 */}
                  <g fill="none">
                    <path
                      d="M 165 88 L 176 66 C 182 52, 191 30, 191 16 C 191 5, 187 1, 182 1 C 178 1, 176 4, 176 10 L 176 96 C 176 105, 181 110, 187 110 C 194 110, 198 102, 198 84 C 198 74, 194 66, 189 66 C 185 66, 184 70, 188 70 C 192 70, 197 67, 202 66"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* --- TIẾNG 'bà' THỨ BA: NÉT MỰC ĐEN LIỀN (SOLID) --- */}
                  {/* Chữ b đỉnh tròn mượt, nét thắt nối liền lạc tự nhiên sang chữ a và dấu huyền */}
                  <g fill="none">
                    {/* Chữ b (thân dọc x=308, nét khuyết cong tròn chuẩn, nét thắt lượn êm sang đón chữ a) */}
                    <path
                      d="M 297 88 L 308 66 C 314 52, 323 30, 323 16 C 323 5, 319 1, 314 1 C 310 1, 308 4, 308 10 L 308 96 C 308 105, 313 110, 319 110 C 326 110, 330 102, 330 84 C 330 74, 326 66, 321 66 C 317 66, 316 70, 320 70 C 325 70, 332 68, 338 71"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Nét 1 chữ a: Nét cong kín cao đúng 2 ô ly, chạm khít tự nhiên với điểm dừng chữ b */}
                    <path
                      d="M 362 70 C 356 66, 344 66, 338 73 C 332 80, 332 96, 338 103 C 344 110, 356 110, 362 103 C 366 96, 366 78, 362 70 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Nét 2 chữ a: Nét móc ngược phải kéo thẳng đứng đè dòng kẻ x=366, móc lên dừng ở ĐK2 (y=88) */}
                    <path
                      d="M 366 66 L 366 96 C 366 106, 370 110, 377 110 C 383 110, 387 102, 388 88"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Dấu huyền \ trên đầu chữ a: nét xiên ngắn từ trái sang phải, cân đối */}
                    <path
                      d="M 346 48 L 356 58"
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
                <span>Bé viết chữ b và tiếng bà rất chuẩn ô ly sách giáo khoa! (+1 sao ⭐)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TRANG 17: ĐỌC TÌNH HUỐNG ("A, BÀ.") & NÓI (GIA ĐÌNH)
          ======================================================== */}
      {activeTab === 'page17' && (
        <div className="space-y-6">
          {/* MỤC 4: ĐỌC (TÌNH HUỐNG BÀ ĐI CHỢ VỀ: "A, BÀ.") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  4
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Đọc (Trang 17)</h3>
                  <p className="text-xs text-slate-500">
                    Bé chạm vào bức tranh hoặc bóng thoại để nghe bé gái reo to đón bà nhé!
                  </p>
                </div>
              </div>

              <button
                onClick={() => speakVietnamese('A, bà.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe đọc câu</span>
              </button>
            </div>

            {/* Illustration of Grandma returning from market with basket */}
            <div className="rounded-3xl bg-gradient-to-b from-sky-100 via-amber-50 to-orange-50 p-6 border border-sky-200 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                {/* Grandma with market basket & conical hat */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <span className="text-7xl drop-shadow-md">👵🧺</span>
                    <span className="absolute -top-2 right-0 text-3xl">👒</span>
                  </div>
                  <span className="mt-2 px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold shadow-xs border border-amber-300">
                    Bà đi chợ về xách làn rau quả
                  </span>
                </div>

                {/* Speech Bubble "A, bà." */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      playSoundEffect.star();
                      speakVietnamese('A, bà.');
                    }}
                    className="px-8 py-3.5 rounded-3xl bg-white border-3 border-sky-400 font-kid font-black text-4xl text-slate-800 shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center gap-3 cursor-pointer group hover:border-emerald-500"
                    title="Bấm để nghe bé reo A, bà."
                  >
                    <span>💬</span>
                    <span>
                      A, <span className="text-rose-600">b</span>à.
                    </span>
                  </button>
                  <span className="text-xs text-slate-500 mt-2 font-medium">
                    Chạm để nghe bé reo vang đón bà
                  </span>
                </div>

                {/* Granddaughter running joyfully */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-7xl drop-shadow-md animate-bounce-slow">🏃‍♀️👧</span>
                  <span className="mt-2 px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-bold shadow-xs border border-sky-300">
                    Bé gái vui sướng chạy ùa ra đón bà
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-sky-200 text-center text-xs text-sky-950 font-medium max-w-lg mx-auto mt-2">
                Khi bà đi chợ về mang quà, bé reo lên đầy yêu thương và lễ phép: <b className="text-rose-600 text-sm">"A, bà!"</b>
              </div>
            </div>
          </div>

          {/* MỤC 5: NÓI (CHỦ ĐỀ: GIA ĐÌNH) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  5
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Nói: Gia đình (Trang 17)</h3>
                  <p className="text-xs text-slate-500">
                    Bé chạm vào từng người trong tranh để tìm hiểu các hoạt động sum vầy ấm cúng nhé!
                  </p>
                </div>
              </div>

              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Gia đình ba thế hệ sum vầy</span>
              </span>
            </div>

            {/* Big interactive family scene breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Member 1: Ông */}
              <button
                onClick={() => speakVietnamese('Ông ngồi uống trà ấm nóng, nói chuyện vui vẻ cùng bố.')}
                className="p-4 rounded-3xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👴☕</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="font-kid font-bold text-base text-amber-950">Ông nội</h4>
                <p className="text-xs text-slate-600 mt-1">Uống trà ấm, trò chuyện vui vẻ</p>
              </button>

              {/* Member 2: Bà */}
              <button
                onClick={() => speakVietnamese('Bà ngồi phe phẩy quạt nan mát rượi, ngắm nhìn các cháu.')}
                className="p-4 rounded-3xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👵🪭</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-kid font-bold text-base text-emerald-950">Bà nội</h4>
                <p className="text-xs text-slate-600 mt-1">Phe phẩy quạt mát, hiền từ</p>
              </button>

              {/* Member 3: Bố */}
              <button
                onClick={() => speakVietnamese('Bố kính cẩn rót trà ấm mời ông uống nước.')}
                className="p-4 rounded-3xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👨🍵</span>
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </div>
                <h4 className="font-kid font-bold text-base text-sky-950">Bố</h4>
                <p className="text-xs text-slate-600 mt-1">Rót trà mời ông kính cẩn</p>
              </button>

              {/* Member 4: Mẹ */}
              <button
                onClick={() => speakVietnamese('Mẹ bưng đĩa hoa quả tươi ngon từ bếp ra mời cả nhà cùng thưởng thức.')}
                className="p-4 rounded-3xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👩🍌</span>
                  <Volume2 className="w-4 h-4 text-rose-600" />
                </div>
                <h4 className="font-kid font-bold text-base text-rose-950">Mẹ</h4>
                <p className="text-xs text-slate-600 mt-1">Bưng hoa quả thơm ngọt</p>
              </button>

              {/* Member 5: Bé trai */}
              <button
                onClick={() => speakVietnamese('Bé trai cầm máy bay đồ chơi màu vàng chạy nhảy vui vẻ.')}
                className="p-4 rounded-3xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👦✈️</span>
                  <Volume2 className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-kid font-bold text-base text-purple-950">Bé trai</h4>
                <p className="text-xs text-slate-600 mt-1">Chơi máy bay đồ chơi</p>
              </button>

              {/* Member 6: Bé gái */}
              <button
                onClick={() => speakVietnamese('Bé gái ngoan ngoãn ngồi trên thảm chơi cùng chú gấu bông đáng yêu.')}
                className="p-4 rounded-3xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-left transition-all hover:scale-102 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl group-hover:scale-110 transition-transform">👧🧸</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="font-kid font-bold text-base text-amber-950">Bé gái</h4>
                <p className="text-xs text-slate-600 mt-1">Ngồi thảm chơi gấu bông</p>
              </button>
            </div>

            {/* Speaking Guide Questions for Kids and Parents */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2">
              <span className="font-bold text-xs text-emerald-950">
                Gợi ý cho bé luyện nói về gia đình:
              </span>
              <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                <li>Gia đình trong tranh gồm có những ai?</li>
                <li>Mọi người trong gia đình đang làm những việc gì?</li>
                <li>Bé cảm thấy không khí gia đình như thế nào? (ấm cúng, hòa thuận, tràn ngập tình yêu thương).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

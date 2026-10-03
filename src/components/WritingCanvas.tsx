import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  RotateCcw, 
  Trash2, 
  Sparkles, 
  Volume2, 
  Eye, 
  EyeOff, 
  Award, 
  HelpCircle,
  Pencil
} from 'lucide-react';
import { BASIC_STROKES, ALL_VIETNAMESE_LETTERS } from '../data/textbookData';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface WritingCanvasProps {
  initialLetter?: string;
  onEarnStar: () => void;
  soundEnabled: boolean;
}

export const WritingCanvas: React.FC<WritingCanvasProps> = ({
  initialLetter = 'a',
  onEarnStar,
  soundEnabled,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState<number>(-1);

  // Tools
  const [penColor, setPenColor] = useState<string>('#4338ca'); // Signature purple ink for VN students
  const [penSize, setPenSize] = useState<number>(6);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [scoreResult, setScoreResult] = useState<{ score: number; comment: string } | null>(null);

  // Writing category: 'stroke' | 'letter' | 'number'
  const [writeCategory, setWriteCategory] = useState<'letter' | 'stroke' | 'number'>('letter');
  const [selectedTarget, setSelectedTarget] = useState<string>(initialLetter);

  const colors = [
    { label: 'Mực tím', value: '#4338ca', bg: 'bg-indigo-700' },
    { label: 'Bút chì', value: '#475569', bg: 'bg-slate-600' },
    { label: 'Mực xanh', value: '#0284c7', bg: 'bg-sky-600' },
    { label: 'Bút đỏ', value: '#dc2626', bg: 'bg-rose-600' },
  ];

  const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial clear & save state
    clearCanvas();
  }, [selectedTarget]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setHistoryStep(-1);
    setScoreResult(null);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || historyStep <= 0) {
      clearCanvas();
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevStep = historyStep - 1;
    const prevImage = history[prevStep];
    ctx.putImageData(prevImage, 0, 0);
    setHistoryStep(prevStep);
    playSoundEffect.click();
  };

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const coords = getCoordinates(e, canvas);

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = isEraser ? penSize * 4 : penSize;
    ctx.strokeStyle = isEraser ? '#ffffff' : penColor;

    if (soundEnabled && !isEraser) {
      playSoundEffect.pencil();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    if (soundEnabled && !isEraser && Math.random() > 0.7) {
      playSoundEffect.pencil();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Chấm điểm và khen ngợi
  const handleGradeWriting = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if anything is drawn
    if (history.length === 0) {
      if (soundEnabled) {
        speakVietnamese('Bé ơi, bé hãy dùng bút tô theo chữ mẫu trên vở ô ly trước nhé!');
      }
      return;
    }

    playSoundEffect.success();
    playSoundEffect.star();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore confetti fallback
    }

    const comments = [
      'Bé viết khéo quá! Nét chữ tròn đều và chuẩn ô ly!',
      'Rất tốt! Chữ của bé ngày càng nắn nót và sạch đẹp!',
      'Tuyệt vời! Bé xứng đáng nhận hoa điểm 10 chăm chỉ!',
    ];
    const pickedComment = comments[Math.floor(Math.random() * comments.length)];

    setScoreResult({
      score: 10,
      comment: pickedComment,
    });

    onEarnStar();

    if (soundEnabled) {
      speakVietnamese(`Hoan hô! Điểm 10 cho bé! ${pickedComment}`);
    }
  };

  const currentStroke = BASIC_STROKES.find((s) => s.id === selectedTarget);
  const currentLetterInfo = ALL_VIETNAMESE_LETTERS.find((l) => l.char === selectedTarget);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Category selection */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-kid font-bold text-xl shadow-xs">
            ✍️
          </div>
          <div>
            <h1 className="text-xl font-bold font-kid text-slate-900 leading-tight">
              Vở Luyện Viết Ô Ly Chuẩn Lớp 1
            </h1>
            <p className="text-xs text-slate-500">
              Lưới 4 ô ly tiểu học, nét mẫu chấm mờ, chấm điểm động viên
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => {
              setWriteCategory('letter');
              setSelectedTarget('a');
              clearCanvas();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              writeCategory === 'letter' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Chữ Cái & Âm Ghép
          </button>
          <button
            onClick={() => {
              setWriteCategory('stroke');
              setSelectedTarget(BASIC_STROKES[0].id);
              clearCanvas();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              writeCategory === 'stroke' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            14 Nét Cơ Bản
          </button>
          <button
            onClick={() => {
              setWriteCategory('number');
              setSelectedTarget('1');
              clearCanvas();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              writeCategory === 'number' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Chữ Số (0-9)
          </button>
        </div>
      </div>

      {/* Target Character Selector Bar */}
      <div className="bg-white rounded-2xl p-3 border border-amber-200 shadow-xs overflow-x-auto scrollbar-none flex items-center gap-2">
        {writeCategory === 'letter' && (
          ALL_VIETNAMESE_LETTERS.map((item) => (
            <button
              key={item.char}
              onClick={() => {
                setSelectedTarget(item.char);
                playSoundEffect.click();
              }}
              className={`min-w-10 h-10 px-2 rounded-xl font-kid font-bold text-lg flex items-center justify-center shrink-0 transition-all ${
                selectedTarget === item.char
                  ? 'bg-purple-600 text-white shadow-xs scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-purple-100'
              }`}
            >
              {item.char}
            </button>
          ))
        )}

        {writeCategory === 'stroke' && (
          BASIC_STROKES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTarget(item.id);
                playSoundEffect.click();
              }}
              className={`px-3 h-10 rounded-xl font-semibold text-xs whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all ${
                selectedTarget === item.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-purple-100'
              }`}
            >
              <span className="font-kid text-base">{item.symbol}</span>
              <span>{item.name}</span>
            </button>
          ))
        )}

        {writeCategory === 'number' && (
          numbersList.map((num) => (
            <button
              key={num}
              onClick={() => {
                setSelectedTarget(num);
                playSoundEffect.click();
              }}
              className={`w-10 h-10 rounded-xl font-kid font-bold text-xl flex items-center justify-center shrink-0 transition-all ${
                selectedTarget === num
                  ? 'bg-purple-600 text-white shadow-xs scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-purple-100'
              }`}
            >
              {num}
            </button>
          ))
        )}
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Writing Canvas Board */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-amber-300 shadow-md">
            {/* Canvas Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
              {/* Color Selectors */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 mr-1">Màu mực:</span>
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      setPenColor(c.value);
                      setIsEraser(false);
                      playSoundEffect.click();
                    }}
                    title={c.label}
                    className={`w-7 h-7 rounded-full ${c.bg} transition-transform ${
                      penColor === c.value && !isEraser
                        ? 'ring-2 ring-offset-2 ring-purple-500 scale-110'
                        : 'hover:scale-105'
                    }`}
                  />
                ))}

                {/* Eraser */}
                <button
                  onClick={() => {
                    setIsEraser(!isEraser);
                    playSoundEffect.click();
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors ${
                    isEraser
                      ? 'bg-rose-500 text-white border-rose-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span>🧼 Tẩy</span>
                </button>
              </div>

              {/* Stroke Size & Guide Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors ${
                    showGuide
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {showGuide ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{showGuide ? 'Ẩn nét mẫu' : 'Hiện nét mẫu'}</span>
                </button>

                <button
                  onClick={handleUndo}
                  title="Hoàn tác nét vừa viết"
                  className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCanvas}
                  title="Xóa trắng bảng ô ly"
                  className="p-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The Notebook Canvas Container with Authentic 4-Ô-Ly Grid */}
            <div className="relative w-full h-[320px] rounded-2xl border-2 border-[#0284c7] overflow-hidden select-none touch-none bg-white shadow-inner">
              {/* Unified SVG Rendering of 4-O-Ly Grid and Synchronized Letter Models */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '320px' }}>
                <defs>
                  {/* Pattern chuẩn tiểu học: 1 Ô LỚN = 80px x 80px chứa đúng 4 ô nhỏ 40px x 40px */}
                  <pattern id="oli-large-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    {/* Viền ô lớn: Đường kẻ liền màu xanh */}
                    <rect x="0" y="0" width="80" height="80" fill="none" stroke="#38bdf8" strokeWidth="0.9" />
                    {/* Đường kẻ chia 4 ô nhỏ: Nét chấm mờ chuẩn xác */}
                    <line x1="40" y1="0" x2="40" y2="80" stroke="#7dd3fc" strokeWidth="0.75" strokeDasharray="2 3" />
                    <line x1="0" y1="40" x2="80" y2="40" stroke="#7dd3fc" strokeWidth="0.75" strokeDasharray="2 3" />
                  </pattern>
                </defs>

                {/* Fill entire background with authentic 40px square grid */}
                <rect x="0" y="0" width="100%" height="320" fill="url(#oli-large-grid)" />

                {/* 4-O-Ly Notebook Lines (Centered: Height = 4 * 40 = 160px from y=80 to y=240) */}
                {/* Đường kẻ ngang 5 (đỉnh trên cùng): y = 80 */}
                <line x1="0" y1="80" x2="100%" y2="80" stroke="#7dd3fc" strokeWidth="0.8" />
                {/* Đường kẻ ngang 4: y = 120 */}
                <line x1="0" y1="120" x2="100%" y2="120" stroke="#7dd3fc" strokeWidth="0.8" />
                {/* Đường kẻ ngang 3 (ĐỈNH CHỮ A - đúng 2 ô ly từ đáy): y = 160 */}
                <line x1="0" y1="160" x2="100%" y2="160" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="4 2" />
                {/* Đường kẻ ngang 2 (ĐIỂM DỪNG BÚT NÉT MÓC - đúng 1 ô ly từ đáy): y = 200 */}
                <line x1="0" y1="200" x2="100%" y2="200" stroke="#7dd3fc" strokeWidth="0.9" />
                {/* Đường kẻ ngang 1 (ĐƯỜNG KẺ ĐẬM Ở ĐÁY - BASELINE): y = 240 */}
                <line x1="0" y1="240" x2="100%" y2="240" stroke="#0284c7" strokeWidth="2.2" />

                {/* Additional light baseline markers for context */}
                <line x1="0" y1="280" x2="100%" y2="280" stroke="#7dd3fc" strokeWidth="0.6" />
                <line x1="0" y1="40" x2="100%" y2="40" stroke="#7dd3fc" strokeWidth="0.6" />

                {/* Outer frame border */}
                <rect x="1" y="1" width="calc(100% - 2px)" height="318" fill="none" stroke="#0284c7" strokeWidth="1.8" />

                {/* SYNCHRONIZED LETTER 'a' MODELS (Exactly matching Page 14 pedagogical specs) */}
                {showGuide && writeCategory === 'letter' && selectedTarget === 'a' && (
                  <g fill="none">
                    {/* --- MẪU 1: CHỮ 'a' NÉT MỰC ĐEN LIỀN (Đầu dòng) --- */}
                    {/* Thân nét móc ngược chạy chuẩn xác trên đường kẻ dọc x=160, hất lên x=200 dừng ở y=200 */}
                    <g>
                      {/* Nét 1: Cong kín (rộng 1.5 ô ly = 60px từ x=100 đến x=160, cao 2 ô ly = 80px từ y=160 đến y=240) */}
                      <path
                        d="M 153 168 C 143 160, 120 160, 108 175 C 100 185, 100 215, 108 225 C 120 240, 143 240, 153 230 C 160 220, 160 183, 153 168 Z"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét 2: Móc ngược phải (chạy thẳng TRÙNG ĐƯỜNG KẺ DỌC x=160, chạm đáy y=240, dừng bút tại x=200, y=200) */}
                      <path
                        d="M 160 160 L 160 222 C 160 235, 167 240, 180 240 C 190 240, 197 223, 200 200"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* --- MẪU 2: CHỮ 'a' NÉT CHẤM MỜ ĐỂ BÉ TÔ (Cách 4 ô ly, thân tại x=320) --- */}
                    <g>
                      {/* Nét 1: Cong kín (Dotted) */}
                      <path
                        d="M 313 168 C 303 160, 280 160, 268 175 C 260 185, 260 215, 268 225 C 280 240, 303 240, 313 230 C 320 220, 320 183, 313 168 Z"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét 2: Móc ngược phải (Dotted, thân trùng đường kẻ dọc x=320, dừng bút tại x=360, y=200) */}
                      <path
                        d="M 320 160 L 320 222 C 320 235, 327 240, 340 240 C 350 240, 357 223, 360 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* --- MẪU 3: CHỮ 'a' NÉT CHẤM MỜ THỨ HAI (Cách 4 ô ly, thân tại x=480) --- */}
                    <g>
                      {/* Nét 1: Cong kín (Dotted) */}
                      <path
                        d="M 473 168 C 463 160, 440 160, 428 175 C 420 185, 420 215, 428 225 C 440 240, 463 240, 473 230 C 480 220, 480 183, 473 168 Z"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét 2: Móc ngược phải (Dotted, thân trùng đường kẻ dọc x=480, dừng bút tại x=520, y=200) */}
                      <path
                        d="M 480 160 L 480 222 C 480 235, 487 240, 500 240 C 510 240, 517 223, 520 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* Điểm chấm định vị đặt bút cho các ô tiếp theo: tại x=633, y=168 */}
                    {[633, 793].map((xDot, idx) => (
                      <circle key={idx} cx={xDot} cy="168" r="3" fill="#38bdf8" opacity="0.7" />
                    ))}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'b' MODELS (Height = 5 ô ly = 200px from y=40 to y=240) */}
                {showGuide && writeCategory === 'letter' && selectedTarget === 'b' && (
                  <g fill="none">
                    {/* Đường kẻ 6 (đỉnh nét khuyết trên): y = 40 */}
                    <line x1="0" y1="40" x2="100%" y2="40" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 3" />

                    {/* MẪU 1: Chữ b mực đen liền (thân sổ thẳng đứng đè đường kẻ dọc x=160, nét khuyết đỉnh tròn mượt) */}
                    <g>
                      <path
                        d="M 140 200 L 160 160 C 172 134, 188 90, 188 68 C 188 48, 180 41, 172 41 C 165 41, 160 48, 160 58 L 160 224 C 160 236, 168 240, 180 240 C 194 240, 200 224, 200 188 C 200 168, 192 152, 182 152 C 174 152, 172 160, 182 160 C 190 160, 204 154, 212 152"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* MẪU 2: Chữ b nét chấm mờ để bé tô (thân sổ thẳng đứng đè đường kẻ dọc x=320) */}
                    <g>
                      <path
                        d="M 300 200 L 320 160 C 332 134, 348 90, 348 68 C 348 48, 340 41, 332 41 C 325 41, 320 48, 320 58 L 320 224 C 320 236, 328 240, 340 240 C 354 240, 360 224, 360 188 C 360 168, 352 152, 342 152 C 334 152, 332 160, 342 160 C 350 160, 364 154, 372 152"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* MẪU 3: Chữ b nét chấm mờ thứ hai (thân sổ thẳng đứng đè đường kẻ dọc x=480) */}
                    <g>
                      <path
                        d="M 460 200 L 480 160 C 492 134, 508 90, 508 68 C 508 48, 500 41, 492 41 C 485 41, 480 48, 480 58 L 480 224 C 480 236, 488 240, 500 240 C 514 240, 520 224, 520 188 C 520 168, 512 152, 502 152 C 494 152, 492 160, 502 160 C 510 160, 524 154, 532 152"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* Điểm chấm định vị đặt bút cho các ô tiếp theo: tại x=610, y=200 */}
                    {[610, 770].map((xDot, idx) => (
                      <circle key={idx} cx={xDot} cy="200" r="3" fill="#38bdf8" opacity="0.7" />
                    ))}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'c' MODELS (Height = 2 ô ly = 80px from y=160 to y=240) */}
                {showGuide && writeCategory === 'letter' && selectedTarget === 'c' && (
                  <g fill="none">
                    {/* MẪU 1: Chữ c nét mực đen liền (dịch sang trái 0.5 ô ly) */}
                    <g>
                      <path
                        d="M 160 172 C 150 160, 122 160, 110 176 C 96 192, 96 216, 110 230 C 122 240, 150 240, 164 226 C 168 220, 170 208, 170 200"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* MẪU 2: Chữ c nét chấm mờ để bé tô (dịch sang trái 0.5 ô ly) */}
                    <g>
                      <path
                        d="M 320 172 C 310 160, 282 160, 270 176 C 256 192, 256 216, 270 230 C 282 240, 310 240, 324 226 C 328 220, 330 208, 330 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* MẪU 3: Tiếng cá nét chấm mờ (chữ a dịch trái 0.5 ô ly liền với chữ c) */}
                    <g>
                      {/* Chữ c dừng bút tại x=460, y=200 */}
                      <path
                        d="M 450 172 C 440 160, 412 160, 400 176 C 386 192, 386 216, 400 230 C 412 240, 440 240, 454 226 C 458 220, 460 208, 460 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Chữ a dịch sang trái 0.5 ô ly (-20px), mép trái chạm liền với x=460 */}
                      <path
                        d="M 516 172 C 504 160, 478 160, 466 176 C 454 192, 454 216, 466 230 C 478 240, 504 240, 516 226 C 524 212, 524 184, 516 172 Z"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 524 160 L 524 218 C 524 234, 532 240, 544 240 C 556 240, 562 226, 564 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Dấu sắc / */}
                      <path
                        d="M 506 142 L 492 154"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'e' MODELS (Height = 2 ô ly = 80px from y=160 to y=240) */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'e' || selectedTarget === 'ê') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ e nét mực đen liền (tại x=160) */}
                    <g>
                      <path
                        d="M 140 224 C 152 208, 172 176, 158 162 C 146 152, 126 168, 124 196 C 120 224, 132 240, 150 240 C 162 240, 172 230, 178 214"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'ê' && (
                        <path
                          d="M 140 152 L 150 136 L 160 152"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </g>

                    {/* MẪU 2: Chữ e nét chấm mờ (tại x=320) */}
                    <g>
                      <path
                        d="M 300 224 C 312 208, 332 176, 318 162 C 306 152, 286 168, 284 196 C 280 224, 292 240, 310 240 C 322 240, 332 230, 338 214"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'ê' && (
                        <path
                          d="M 300 152 L 310 136 L 320 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </g>

                    {/* MẪU 3: Tiếng bé / bế nét chấm mờ (tại x=480) */}
                    <g>
                      {/* Chữ b cao 5 ô ly */}
                      <path
                        d="M 460 200 L 480 160 C 492 134, 508 90, 508 68 C 508 48, 500 41, 492 41 C 485 41, 480 48, 480 58 L 480 224 C 480 236, 488 240, 500 240 C 514 240, 520 224, 520 188 C 520 168, 512 152, 502 152 C 494 152, 492 160, 502 160 C 510 160, 518 160, 530 180"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Chữ e nối từ b */}
                      <path
                        d="M 530 180 C 540 166, 552 160, 560 162 C 570 164, 568 184, 552 204 C 536 224, 540 240, 558 240 C 570 240, 578 230, 584 214"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Dấu thanh */}
                      {selectedTarget === 'ê' ? (
                        <>
                          <path
                            d="M 552 152 L 560 138 L 568 152"
                            fill="none"
                            stroke="#475569"
                            strokeWidth="2.5"
                            strokeDasharray="4 4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M 574 126 L 566 140"
                            fill="none"
                            stroke="#475569"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                          />
                        </>
                      ) : (
                        <path
                          d="M 566 130 L 556 146"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      )}
                    </g>
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'o', 'ô' and 'ơ' MODELS (Height = 2 ô ly = 80px from y=160 to y=240, width = 1.5 ô ly) */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'o' || selectedTarget === 'ô' || selectedTarget === 'ơ') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ o/ô/ơ nét mực đen liền (tại x=160) */}
                    <g>
                      <path
                        d="M 180 172 C 168 160, 142 160, 130 176 C 118 192, 118 216, 130 230 C 142 240, 168 240, 180 226 C 188 212, 188 184, 180 172 Z"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'ô' && (
                        <path
                          d="M 144 152 L 155 136 L 166 152"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {selectedTarget === 'ơ' && (
                        <path
                          d="M 178 160 C 182 156, 186 158, 186 164 C 186 168, 182 172, 180 172"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      )}
                    </g>

                    {/* MẪU 2: Chữ o/ô/ơ nét chấm mờ (tại x=320) */}
                    <g>
                      <path
                        d="M 340 172 C 328 160, 302 160, 290 176 C 278 192, 278 216, 290 230 C 302 240, 328 240, 340 226 C 348 212, 348 184, 340 172 Z"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'ô' && (
                        <path
                          d="M 304 152 L 315 136 L 326 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {selectedTarget === 'ơ' && (
                        <path
                          d="M 338 160 C 342 156, 346 158, 346 164 C 346 168, 342 172, 340 172"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      )}
                    </g>

                    {/* MẪU 3: Tiếng bò / cổ cò / đỡ bé nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'ô' ? (
                      <g>
                        {/* Tiếng cổ */}
                        <path
                          d="M 458 174 C 450 162, 432 162, 424 174 C 416 186, 416 208, 424 220 C 432 232, 450 232, 458 220"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 498 172 C 486 160, 460 160, 448 176 C 436 192, 436 216, 448 230 C 460 240, 486 240, 498 226 C 506 212, 506 184, 498 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 466 152 L 473 138 L 480 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 470 128 C 470 124, 473 122, 476 122 C 479 122, 481 124, 481 128 C 481 132, 476 134, 475 136"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Tiếng cò */}
                        <path
                          d="M 534 174 C 526 162, 508 162, 500 174 C 492 186, 492 208, 500 220 C 508 232, 526 232, 534 220"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 574 172 C 562 160, 536 160, 524 176 C 512 192, 512 216, 524 230 C 536 240, 562 240, 574 226 C 582 212, 582 184, 574 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 544 140 L 558 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : selectedTarget === 'ơ' ? (
                      <g>
                        {/* Tiếng đỡ: chữ đ cao 4 ô ly nối sang ơ */}
                        <path
                          d="M 460 172 C 452 162, 436 162, 426 174 C 416 186, 416 208, 426 222 C 436 236, 452 236, 460 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 460 80 L 460 224 C 460 236, 466 240, 474 240 C 480 240, 484 232, 488 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 448 120 L 472 120"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* Chữ ơ */}
                        <path
                          d="M 518 172 C 506 160, 488 160, 478 174 C 468 186, 468 208, 478 222 C 488 236, 506 236, 518 224 C 526 210, 526 184, 518 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 516 160 C 520 156, 524 158, 524 164 C 524 168, 520 172, 518 172"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* Dấu ngã ~ */}
                        <path
                          d="M 494 144 C 498 140, 502 140, 506 144 C 510 148, 514 148, 518 144"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />

                        {/* Tiếng bé: chữ b cao 5 ô ly nối sang e */}
                        <path
                          d="M 554 200 L 574 160 C 586 134, 602 90, 602 68 C 602 48, 594 41, 586 41 C 579 41, 574 48, 574 58 L 574 224 C 574 236, 582 240, 594 240 C 608 240, 614 224, 614 188 C 614 168, 606 152, 596 152 C 588 152, 586 160, 596 160 C 604 160, 612 160, 624 180"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ e */}
                        <path
                          d="M 624 180 C 634 164, 648 156, 658 158 C 670 160, 668 184, 650 204 C 632 224, 636 240, 656 240 C 668 240, 678 228, 684 212"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dấu sắc / */}
                        <path
                          d="M 662 132 L 650 148"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Chữ b cao 5 ô ly */}
                        <path
                          d="M 460 200 L 480 160 C 492 134, 508 90, 508 68 C 508 48, 500 41, 492 41 C 485 41, 480 48, 480 58 L 480 224 C 480 236, 488 240, 500 240 C 514 240, 520 224, 520 188 C 520 168, 512 152, 502 152 C 494 152, 492 160, 502 160 C 510 160, 518 160, 530 180"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ o nối từ b */}
                        <path
                          d="M 576 172 C 564 160, 538 160, 526 176 C 514 192, 514 216, 526 230 C 538 240, 564 240, 576 226 C 584 212, 584 184, 576 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dấu huyền \ */}
                        <path
                          d="M 544 140 L 558 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'd' and 'đ' MODELS (Height stem = 4 ô ly = 160px from y=80 to y=240, curved body = 2 ô ly) */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'd' || selectedTarget === 'đ') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ d/đ nét mực đen liền (tại x=160) */}
                    <g>
                      {/* Nét cong kín cao 2 ô ly */}
                      <path
                        d="M 180 172 C 168 160, 142 160, 130 176 C 118 192, 118 216, 130 230 C 142 240, 168 240, 180 226 C 188 212, 188 184, 180 172 Z"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét móc ngược phải cao 4 ô ly */}
                      <path
                        d="M 180 80 L 180 224 C 180 236, 188 240, 198 240 C 206 240, 212 232, 216 216"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét gạch ngang ngắn nếu là chữ đ tại y=120 */}
                      {selectedTarget === 'đ' && (
                        <path
                          d="M 164 120 L 196 120"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      )}
                    </g>

                    {/* MẪU 2: Chữ d/đ nét chấm mờ (tại x=320) */}
                    <g>
                      {/* Nét cong kín */}
                      <path
                        d="M 340 172 C 328 160, 302 160, 290 176 C 278 192, 278 216, 290 230 C 302 240, 328 240, 340 226 C 348 212, 348 184, 340 172 Z"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét móc ngược phải cao 4 ô ly */}
                      <path
                        d="M 340 80 L 340 224 C 340 236, 348 240, 358 240 C 366 240, 372 232, 376 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'đ' && (
                        <path
                          d="M 324 120 L 356 120"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      )}
                    </g>

                    {/* MẪU 3: Tiếng đá dế nét chấm mờ (tại x=480) */}
                    <g>
                      {/* Tiếng đá: chữ đ cao 4 ô ly */}
                      <path
                        d="M 460 172 C 452 162, 436 162, 426 174 C 416 186, 416 208, 426 222 C 436 236, 452 236, 460 224"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 460 80 L 460 224 C 460 236, 466 240, 474 240 C 480 240, 484 232, 488 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 448 120 L 472 120"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      {/* Chữ a */}
                      <path
                        d="M 518 172 C 506 160, 488 160, 478 174 C 468 186, 468 208, 478 222 C 488 236, 506 236, 518 224"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 518 160 L 518 224 C 518 236, 524 240, 532 240 C 538 240, 542 232, 546 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 512 140 L 498 154"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />

                      {/* Tiếng dế: chữ d cao 4 ô ly nối ê */}
                      <path
                        d="M 590 172 C 582 162, 566 162, 556 174 C 546 186, 546 208, 556 222 C 566 236, 582 236, 590 224"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 590 80 L 590 224 C 590 236, 596 240, 604 240 C 610 240, 614 232, 618 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 618 216 C 624 200, 638 160, 648 162 C 658 164, 654 184, 642 204 C 628 224, 634 240, 650 240 C 660 240, 668 230, 674 214"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 642 152 L 648 138 L 654 152"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 660 126 L 652 140"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'i' and 'k' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'i' || selectedTarget === 'k') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ i/k nét mực đen liền (tại x=160) */}
                    {selectedTarget === 'i' ? (
                      <g>
                        {/* Nét hất */}
                        <path
                          d="M 148 200 L 160 160"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        {/* Nét móc ngược phải cao 2 ô ly */}
                        <path
                          d="M 160 160 L 160 224 C 160 236, 168 240, 176 240 C 182 240, 186 232, 190 216"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dấu chấm nhỏ */}
                        <circle cx="160" cy="140" r="2.8" fill="#111827" />
                      </g>
                    ) : (
                      <g>
                        {/* Nét khuyết trên cao 5 ô ly (từ y=200 lên y=40 rồi xuống y=240) */}
                        <path
                          d="M 140 200 L 160 160 C 172 134, 188 90, 188 68 C 188 48, 180 41, 172 41 C 165 41, 160 48, 160 58 L 160 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Nét móc hai đầu có thắt giữa cao 2 ô ly */}
                        <path
                          d="M 160 210 C 168 180, 178 160, 192 160 C 204 160, 204 176, 192 186 C 184 192, 178 198, 186 206 L 202 240 C 206 240, 210 232, 214 216"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}

                    {/* MẪU 2: Chữ i/k nét chấm mờ (tại x=320) */}
                    {selectedTarget === 'i' ? (
                      <g>
                        {/* Nét hất */}
                        <path
                          d="M 308 200 L 320 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* Nét móc ngược phải cao 2 ô ly */}
                        <path
                          d="M 320 160 L 320 224 C 320 236, 328 240, 336 240 C 342 240, 346 232, 350 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dấu chấm nhỏ */}
                        <circle cx="320" cy="140" r="2.5" fill="#475569" />
                      </g>
                    ) : (
                      <g>
                        {/* Nét khuyết trên cao 5 ô ly */}
                        <path
                          d="M 300 200 L 320 160 C 332 134, 348 90, 348 68 C 348 48, 340 41, 332 41 C 325 41, 320 48, 320 58 L 320 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Nét móc hai đầu có thắt giữa */}
                        <path
                          d="M 320 210 C 328 180, 338 160, 352 160 C 364 160, 364 176, 352 186 C 344 192, 338 198, 346 206 L 362 240 C 366 240, 370 232, 374 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}

                    {/* MẪU 3: Tiếng kì đà nét chấm mờ (tại x=480) */}
                    <g>
                      {/* Tiếng kì: chữ k cao 5 ô ly */}
                      <path
                        d="M 440 200 L 460 160 C 472 134, 488 90, 488 68 C 488 48, 480 41, 472 41 C 465 41, 460 48, 460 58 L 460 240"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 460 210 C 468 180, 478 160, 492 160 C 504 160, 504 176, 492 186 C 484 192, 478 198, 486 206 L 502 240 C 506 240, 510 232, 514 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Chữ i nối liền từ k */}
                      <path
                        d="M 514 216 L 522 160"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 522 160 L 522 224 C 522 236, 528 240, 534 240 C 540 240, 544 232, 548 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="522" cy="140" r="2.5" fill="#475569" />
                      {/* Dấu huyền trên chữ i */}
                      <path
                        d="M 512 120 L 526 132"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />

                      {/* Tiếng đà: chữ đ cao 4 ô ly nối sang a */}
                      <path
                        d="M 600 172 C 592 162, 576 162, 566 174 C 556 186, 556 208, 566 222 C 576 236, 592 236, 600 224"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 600 80 L 600 224 C 600 236, 606 240, 614 240 C 620 240, 624 232, 628 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 588 120 L 612 120"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      {/* Chữ a */}
                      <path
                        d="M 658 172 C 646 160, 628 160, 618 174 C 608 186, 608 208, 618 222 C 628 236, 646 236, 658 224"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 658 160 L 658 224 C 658 236, 664 240, 672 240 C 678 240, 682 232, 686 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 652 140 L 638 154"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'h' and 'l' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'h' || selectedTarget === 'l') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ h/l nét mực đen liền (tại x=160) */}
                    {selectedTarget === 'h' ? (
                      <g>
                        {/* Nét khuyết trên cao 5 ô ly */}
                        <path
                          d="M 140 200 L 160 160 C 172 134, 188 90, 188 68 C 188 48, 180 41, 172 41 C 165 41, 160 48, 160 58 L 160 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Nét móc hai đầu cao 2 ô ly */}
                        <path
                          d="M 160 200 C 168 174, 178 160, 192 160 C 204 160, 208 174, 208 196 L 208 224 C 208 236, 214 240, 222 240 C 228 240, 232 232, 234 216"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Nét khuyết trên kết hợp nét móc ngược phải cao 5 ô ly */}
                        <path
                          d="M 140 200 L 160 160 C 172 134, 188 90, 188 68 C 188 48, 180 41, 172 41 C 165 41, 160 48, 160 58 L 160 224 C 160 236, 168 240, 176 240 C 182 240, 186 232, 190 216"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}

                    {/* MẪU 2: Chữ h/l nét chấm mờ (tại x=320) */}
                    {selectedTarget === 'h' ? (
                      <g>
                        {/* Nét khuyết trên cao 5 ô ly */}
                        <path
                          d="M 300 200 L 320 160 C 332 134, 348 90, 348 68 C 348 48, 340 41, 332 41 C 325 41, 320 48, 320 58 L 320 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Nét móc hai đầu cao 2 ô ly */}
                        <path
                          d="M 320 200 C 328 174, 338 160, 352 160 C 364 160, 368 174, 368 196 L 368 224 C 368 236, 374 240, 382 240 C 388 240, 392 232, 394 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Nét khuyết trên kết hợp nét móc ngược phải cao 5 ô ly */}
                        <path
                          d="M 300 200 L 320 160 C 332 134, 348 90, 348 68 C 348 48, 340 41, 332 41 C 325 41, 320 48, 320 58 L 320 224 C 320 236, 328 240, 336 240 C 342 240, 346 232, 350 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}

                    {/* MẪU 3: Tiếng hồ / le le nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'h' ? (
                      <g>
                        {/* Tiếng hồ: chữ h cao 5 ô ly */}
                        <path
                          d="M 440 200 L 460 160 C 472 134, 488 90, 488 68 C 488 48, 480 41, 472 41 C 465 41, 460 48, 460 58 L 460 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 460 200 C 468 174, 478 160, 492 160 C 504 160, 508 174, 508 196 L 508 224 C 508 236, 514 240, 522 240 C 528 240, 532 232, 534 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ ô */}
                        <path
                          d="M 580 172 C 568 160, 542 160, 530 176 C 518 192, 518 216, 530 230 C 542 240, 568 240, 580 226 C 588 212, 588 184, 580 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dấu mũ ^ */}
                        <path
                          d="M 544 152 L 555 136 L 566 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dấu huyền \ */}
                        <path
                          d="M 536 126 L 548 138"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Từ le le: chữ l cao 5 ô ly */}
                        <path
                          d="M 440 200 L 460 160 C 472 134, 488 90, 488 68 C 488 48, 480 41, 472 41 C 465 41, 460 48, 460 58 L 460 224 C 460 236, 468 240, 476 240 C 482 240, 486 232, 490 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ e */}
                        <path
                          d="M 490 216 C 496 200, 510 160, 520 162 C 530 164, 526 184, 514 204 C 500 224, 506 240, 522 240 C 532 240, 540 230, 546 214"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Tiếng le thứ 2 */}
                        <path
                          d="M 550 200 L 570 160 C 582 134, 598 90, 598 68 C 598 48, 590 41, 582 41 C 575 41, 570 48, 570 58 L 570 224 C 570 236, 578 240, 586 240 C 592 240, 596 232, 600 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 600 216 C 606 200, 620 160, 630 162 C 640 164, 636 184, 624 204 C 610 224, 616 240, 632 240 C 642 240, 650 230, 656 214"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'u' and 'ư' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'u' || selectedTarget === 'ư') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ u/ư nét mực đen liền (tại x=160) */}
                    <g>
                      {/* Nét hất */}
                      <path
                        d="M 148 200 L 160 160"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      {/* Nét móc ngược 1 rộng 1.5 ô ly */}
                      <path
                        d="M 160 160 L 160 224 C 160 240, 170 240, 184 240 C 198 240, 208 224, 208 160"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét móc ngược 2 rộng 1 ô ly */}
                      <path
                        d="M 208 160 L 208 224 C 208 236, 216 240, 224 240 C 230 240, 234 232, 236 216"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét râu chữ ư */}
                      {selectedTarget === 'ư' && (
                        <path
                          d="M 208 160 C 212 156, 216 158, 216 164 C 216 168, 212 172, 210 172"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      )}
                    </g>

                    {/* MẪU 2: Chữ u/ư nét chấm mờ (tại x=320) */}
                    <g>
                      <path
                        d="M 308 200 L 320 160"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 320 160 L 320 224 C 320 240, 330 240, 344 240 C 358 240, 368 224, 368 160"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 368 160 L 368 224 C 368 236, 376 240, 384 240 C 390 240, 394 232, 396 216"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'ư' && (
                        <path
                          d="M 368 160 C 372 156, 376 158, 376 164 C 376 168, 372 172, 370 172"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      )}
                    </g>

                    {/* MẪU 3: Tiếng dù / cụm từ hổ dữ nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'u' ? (
                      <g>
                        {/* Tiếng dù: chữ d cao 4 ô ly nối u */}
                        <path
                          d="M 460 172 C 452 162, 436 162, 426 174 C 416 186, 416 208, 426 222 C 436 236, 452 236, 460 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 460 80 L 460 224 C 460 236, 466 240, 474 240 C 480 240, 484 232, 488 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ u */}
                        <path
                          d="M 488 216 L 496 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 496 160 L 496 224 C 496 240, 506 240, 520 240 C 534 240, 544 224, 544 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 544 160 L 544 224 C 544 236, 552 240, 560 240 C 566 240, 570 232, 572 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dấu huyền \ */}
                        <path
                          d="M 510 134 L 524 148"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Cụm từ hổ dữ: Tiếng hổ */}
                        <path
                          d="M 420 200 L 440 160 C 452 134, 468 90, 468 68 C 468 48, 460 41, 452 41 C 445 41, 440 48, 440 58 L 440 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 440 200 C 448 174, 458 160, 472 160 C 484 160, 488 174, 488 196 L 488 224 C 488 236, 494 240, 502 240 C 508 240, 512 232, 514 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ ô */}
                        <path
                          d="M 560 172 C 548 160, 522 160, 510 176 C 498 192, 498 216, 510 230 C 522 240, 548 240, 560 226 C 568 212, 568 184, 560 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 524 152 L 535 136 L 546 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 530 126 C 530 122, 533 120, 536 120 C 539 120, 541 122, 541 126 C 541 130, 536 132, 535 134"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Tiếng dữ: chữ d cao 4 ô ly nối sang ư */}
                        <path
                          d="M 610 172 C 602 162, 586 162, 576 174 C 566 186, 566 208, 576 222 C 586 236, 602 236, 610 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 610 80 L 610 224 C 610 236, 616 240, 624 240 C 630 240, 634 232, 638 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ ư */}
                        <path
                          d="M 638 216 L 646 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 646 160 L 646 224 C 646 240, 656 240, 670 240 C 684 240, 694 224, 694 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 694 160 L 694 224 C 694 236, 702 240, 710 240 C 716 240, 720 232, 722 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 694 160 C 698 156, 702 158, 702 164 C 702 168, 698 172, 696 172"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* Dấu ngã ~ */}
                        <path
                          d="M 662 136 C 666 132, 670 132, 674 136 C 678 140, 682 140, 686 136"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'm' and 'n' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'm' || selectedTarget === 'n') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ m/n nét mực đen liền (tại x=160) */}
                    {selectedTarget === 'm' ? (
                      <g>
                        <path
                          d="M 136 178 C 142 164, 150 160, 158 160 L 158 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 158 196 C 166 168, 180 160, 190 160 L 190 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 190 196 C 198 168, 212 160, 222 160 L 222 224 C 222 236, 230 240, 238 240 C 244 240, 248 232, 250 216"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M 144 178 C 150 164, 158 160, 166 160 L 166 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 166 196 C 174 168, 188 160, 198 160 L 198 224 C 198 236, 206 240, 214 240 C 220 240, 224 232, 226 216"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}

                    {/* MẪU 2: Chữ m/n nét chấm mờ (tại x=320) */}
                    {selectedTarget === 'm' ? (
                      <g>
                        <path
                          d="M 296 178 C 302 164, 310 160, 318 160 L 318 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 318 196 C 326 168, 340 160, 350 160 L 350 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 350 196 C 358 168, 372 160, 382 160 L 382 224 C 382 236, 390 240, 398 240 C 404 240, 408 232, 410 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M 304 178 C 310 164, 318 160, 326 160 L 326 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 326 196 C 334 168, 348 160, 358 160 L 358 224 C 358 236, 366 240, 374 240 C 380 240, 384 232, 386 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}

                    {/* MẪU 3: Cụm từ cá mè / nơ đỏ nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'm' ? (
                      <g>
                        {/* Tiếng cá */}
                        <path
                          d="M 468 172 C 460 162, 444 162, 434 174 C 424 186, 424 208, 434 222 C 444 236, 460 236, 468 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 504 172 C 494 160, 476 160, 466 174 C 456 186, 456 208, 466 222 C 476 236, 494 236, 504 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 504 160 L 504 224 C 504 236, 510 240, 518 240 C 524 240, 528 232, 532 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 498 136 L 486 150"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />

                        {/* Tiếng mè: m nối e + dấu huyền */}
                        <path
                          d="M 556 178 C 562 164, 570 160, 578 160 L 578 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 578 196 C 586 168, 600 160, 610 160 L 610 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 610 196 C 618 168, 632 160, 642 160 L 642 224 C 642 236, 650 240, 658 240 C 664 240, 668 232, 670 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ e */}
                        <path
                          d="M 670 216 C 676 200, 690 160, 700 162 C 710 164, 706 184, 694 204 C 680 224, 686 240, 702 240 C 712 240, 720 230, 726 214"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 690 144 L 704 156"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Tiếng nơ: n nối ơ */}
                        <path
                          d="M 464 178 C 470 164, 478 160, 486 160 L 486 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 486 196 C 494 168, 508 160, 518 160 L 518 224 C 518 236, 526 240, 534 240 C 540 240, 544 232, 546 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ ơ */}
                        <path
                          d="M 586 172 C 574 160, 548 160, 536 176 C 524 192, 524 216, 536 230 C 548 240, 574 240, 586 226 C 594 212, 594 184, 586 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 586 172 C 589 168, 593 169, 593 173 C 593 177, 590 180, 588 180"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Tiếng đỏ: đ cao 4 ô ly nối o + dấu hỏi */}
                        <path
                          d="M 640 172 C 632 162, 616 162, 606 174 C 596 186, 596 208, 606 222 C 616 236, 632 236, 640 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 640 80 L 640 224 C 640 236, 646 240, 654 240 C 660 240, 664 232, 668 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 628 120 L 652 120"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* Chữ o */}
                        <path
                          d="M 708 172 C 696 160, 670 160, 658 176 C 646 192, 646 216, 658 230 C 670 240, 696 240, 708 226 C 716 212, 716 184, 708 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 682 134 C 682 130, 685 128, 688 128 C 691 128, 693 130, 693 134 C 693 138, 688 140, 687 142"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'g' and 'gi' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'g' || selectedTarget === 'gi') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ g/gi nét mực đen liền (tại x=160) */}
                    <g>
                      {/* Nét cong kín cao 2 ô ly */}
                      <path
                        d="M 188 174 C 180 160, 160 160, 148 174 C 136 190, 136 214, 148 228 C 160 240, 180 240, 188 226 C 194 214, 194 186, 188 174 Z"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Nét khuyết dưới kéo sâu xuống y=360 */}
                      <path
                        d="M 188 160 L 188 340 C 188 360, 170 360, 160 360 C 150 360, 144 344, 152 324 L 208 228 C 212 220, 214 212, 216 200"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'gi' && (
                        <g>
                          {/* Chữ i nối từ g */}
                          <path
                            d="M 216 200 L 224 160 L 224 224 C 224 236, 230 240, 238 240 C 244 240, 248 232, 250 216"
                            fill="none"
                            stroke="#111827"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="224" cy="144" r="2.5" fill="#111827" />
                        </g>
                      )}
                    </g>

                    {/* MẪU 2: Chữ g/gi nét chấm mờ (tại x=320) */}
                    <g>
                      <path
                        d="M 348 174 C 340 160, 320 160, 308 174 C 296 190, 296 214, 308 228 C 320 240, 340 240, 348 226 C 354 214, 354 186, 348 174 Z"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 348 160 L 348 340 C 348 360, 330 360, 320 360 C 310 360, 304 344, 312 324 L 368 228 C 372 220, 374 212, 376 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'gi' && (
                        <g>
                          <path
                            d="M 376 200 L 384 160 L 384 224 C 384 236, 390 240, 398 240 C 404 240, 408 232, 410 216"
                            fill="none"
                            stroke="#475569"
                            strokeWidth="2.5"
                            strokeDasharray="4 4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="384" cy="144" r="2" fill="#475569" />
                        </g>
                      )}
                    </g>

                    {/* MẪU 3: Cụm từ gà gô / giá đỗ nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'g' ? (
                      <g>
                        {/* Tiếng gà: g nối a + dấu huyền */}
                        <path
                          d="M 488 174 C 480 160, 460 160, 448 174 C 436 190, 436 214, 448 228 C 460 240, 480 240, 488 226 C 494 214, 494 186, 488 174 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 488 160 L 488 340 C 488 360, 470 360, 460 360 C 450 360, 444 344, 452 324 L 508 228"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ a */}
                        <path
                          d="M 548 172 C 538 160, 520 160, 510 174 C 500 186, 500 208, 510 222 C 520 236, 538 236, 548 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 548 160 L 548 224 C 548 236, 554 240, 562 240 C 568 240, 572 232, 576 216"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 522 136 L 536 148"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />

                        {/* Tiếng gô: g nối ô + mũ */}
                        <path
                          d="M 648 174 C 640 160, 620 160, 608 174 C 596 190, 596 214, 608 228 C 620 240, 640 240, 648 226 C 654 214, 654 186, 648 174 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 648 160 L 648 340 C 648 360, 630 360, 620 360 C 610 360, 604 344, 612 324 L 668 228"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ ô */}
                        <path
                          d="M 708 172 C 696 160, 670 160, 658 176 C 646 192, 646 216, 658 230 C 670 240, 696 240, 708 226 C 716 212, 716 184, 708 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 672 152 L 683 136 L 694 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Tiếng giá: gi nối a + dấu sắc */}
                        <path
                          d="M 488 174 C 480 160, 460 160, 448 174 C 436 190, 436 214, 448 228 C 460 240, 480 240, 488 226 C 494 214, 494 186, 488 174 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 488 160 L 488 340 C 488 360, 470 360, 460 360 C 450 360, 444 344, 452 324 L 508 228"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 508 228 L 516 160 L 516 224 C 516 236, 522 240, 530 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <circle cx="516" cy="144" r="2" fill="#475569" />

                        {/* Chữ a */}
                        <path
                          d="M 570 172 C 560 160, 542 160, 532 174 C 522 186, 522 208, 532 222 C 542 236, 560 236, 570 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 570 160 L 570 224 C 570 236, 576 240, 584 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 564 136 L 552 148"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />

                        {/* Tiếng đỗ: đ cao 4 ô ly nối ô + dấu ngã */}
                        <path
                          d="M 640 172 C 632 162, 616 162, 606 174 C 596 186, 596 208, 606 222 C 616 236, 632 236, 640 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 640 80 L 640 224 C 640 236, 646 240, 654 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 628 120 L 652 120"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* Chữ ô */}
                        <path
                          d="M 708 172 C 696 160, 670 160, 658 176 C 646 192, 646 216, 658 230 C 670 240, 696 240, 708 226 C 716 212, 716 184, 708 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 672 152 L 683 136 L 694 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 676 122 C 680 118, 684 118, 688 122 C 692 126, 696 126, 700 122"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'r' and 's' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'r' || selectedTarget === 's') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ r/s nét mực đen liền (tại x=160) */}
                    {selectedTarget === 'r' ? (
                      <path
                        d="M 140 240 C 146 210, 156 168, 162 152 C 165 144, 172 144, 170 154 L 194 154 L 194 226 C 194 238, 202 240, 212 240 C 218 240, 224 228, 226 200"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path
                        d="M 148 240 C 156 212, 168 168, 174 152 C 177 144, 184 144, 182 154 C 198 158, 206 178, 202 204 C 198 226, 184 240, 168 240 C 160 240, 155 234, 155 222 C 155 210, 164 206, 170 210"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* MẪU 2: Chữ r/s nét chấm mờ (tại x=320) */}
                    {selectedTarget === 'r' ? (
                      <path
                        d="M 300 240 C 306 210, 316 168, 322 152 C 325 144, 332 144, 330 154 L 354 154 L 354 226 C 354 238, 362 240, 372 240 C 378 240, 384 228, 386 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path
                        d="M 308 240 C 316 212, 328 168, 334 152 C 337 144, 344 144, 342 154 C 358 158, 366 178, 362 204 C 358 226, 344 240, 328 240 C 320 240, 315 234, 315 222 C 315 210, 324 206, 330 210"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* MẪU 3: Cụm từ rổ rá / su su nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'r' ? (
                      <g>
                        {/* Tiếng rổ: r nối ô + dấu hỏi */}
                        <path
                          d="M 440 240 C 446 210, 456 168, 462 152 C 465 144, 472 144, 470 154 L 494 154 L 494 226 C 494 238, 502 240, 512 240 C 518 240, 524 228, 526 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ ô */}
                        <path
                          d="M 574 172 C 562 160, 536 160, 524 176 C 512 192, 512 216, 524 230 C 536 240, 562 240, 574 226 C 582 212, 582 184, 574 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 540 152 L 548 136 L 556 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 560 126 C 560 120, 564 118, 568 118 C 572 118, 574 120, 574 124 C 574 128, 568 130, 566 132"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Tiếng rá: r nối a + dấu sắc */}
                        <path
                          d="M 616 240 C 622 210, 632 168, 638 152 C 641 144, 648 144, 646 154 L 670 154 L 670 226 C 670 238, 678 240, 688 240 C 694 240, 700 228, 702 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 748 172 C 738 160, 720 160, 710 174 C 700 186, 700 208, 710 222 C 720 236, 738 236, 748 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 748 160 L 748 224 C 748 236, 754 240, 762 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 740 136 L 728 148"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Tiếng su thứ 1: s nối u */}
                        <path
                          d="M 444 240 C 452 212, 464 168, 470 152 C 473 144, 480 144, 478 154 C 494 158, 502 178, 498 204 C 494 226, 480 240, 464 240 C 456 240, 451 234, 451 222 C 451 210, 460 206, 466 210 L 500 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 500 200 L 508 160 L 508 224 C 508 236, 516 240, 528 240 C 540 240, 548 224, 548 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 548 160 L 548 224 C 548 236, 554 240, 560 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Tiếng su thứ 2: s nối u */}
                        <path
                          d="M 596 240 C 604 212, 616 168, 622 152 C 625 144, 632 144, 630 154 C 646 158, 654 178, 650 204 C 646 226, 632 240, 616 240 C 608 240, 603 234, 603 222 C 603 210, 612 206, 618 210 L 652 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 652 200 L 660 160 L 660 224 C 660 236, 668 240, 680 240 C 692 240, 700 224, 700 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 700 160 L 700 224 C 700 236, 706 240, 712 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 't' and 'tr' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 't' || selectedTarget === 'tr') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ t/tr nét mực đen liền (tại x=160) */}
                    <g>
                      {/* Nét hất */}
                      <path
                        d="M 148 200 L 160 160"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      {/* Nét móc ngược cao 3 ô ly */}
                      <path
                        d="M 160 120 L 160 226 C 160 238, 168 240, 178 240 C 184 240, 190 228, 192 200"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 150 160 L 170 160"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      {selectedTarget === 'tr' && (
                        <path
                          d="M 192 200 C 196 172, 206 160, 212 152 C 215 144, 222 144, 220 154 L 244 154 L 244 226 C 244 238, 252 240, 262 240 C 268 240, 274 228, 276 200"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </g>

                    {/* MẪU 2: Chữ t/tr nét chấm mờ (tại x=320) */}
                    <g>
                      <path
                        d="M 308 200 L 320 160"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 320 120 L 320 226 C 320 238, 328 240, 338 240 C 344 240, 350 228, 352 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 310 160 L 330 160"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      {selectedTarget === 'tr' && (
                        <path
                          d="M 352 200 C 356 172, 366 160, 372 152 C 375 144, 382 144, 380 154 L 404 154 L 404 226 C 404 238, 412 240, 422 240 C 428 240, 434 228, 436 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </g>

                    {/* MẪU 3: Cụm từ ô tô / cá trê nét chấm mờ (tại x=480) */}
                    {selectedTarget === 't' ? (
                      <g>
                        {/* Tiếng ô */}
                        <path
                          d="M 488 172 C 476 160, 450 160, 438 176 C 426 192, 426 216, 438 230 C 450 240, 476 240, 488 226 C 496 212, 496 184, 488 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 454 152 L 462 136 L 470 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Tiếng tô: t cao 3 ô ly nối ô */}
                        <path
                          d="M 520 200 L 532 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 532 120 L 532 226 C 532 238, 540 240, 550 240 C 556 240, 562 228, 564 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 522 160 L 542 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 618 172 C 606 160, 580 160, 568 176 C 556 192, 556 216, 568 230 C 580 240, 606 240, 618 226 C 626 212, 626 184, 618 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 584 152 L 592 136 L 600 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Tiếng cá: c nối a + dấu sắc */}
                        <path
                          d="M 470 174 C 462 160, 442 160, 430 174 C 418 190, 418 214, 430 228 C 442 240, 462 240, 470 226"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 504 172 C 494 160, 476 160, 466 174 C 456 186, 456 208, 466 222 C 476 236, 494 236, 504 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 504 160 L 504 224 C 504 236, 510 240, 518 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 498 136 L 486 148"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />

                        {/* Tiếng trê: tr nối ê + dấu mũ */}
                        <path
                          d="M 564 200 L 576 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 576 120 L 576 226 C 576 238, 584 240, 594 240 C 600 240, 606 228, 608 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 566 160 L 586 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 608 200 C 612 172, 622 160, 628 152 C 631 144, 638 144, 636 154 L 660 154 L 660 226 C 660 238, 668 240, 678 240 C 684 240, 690 228, 692 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 692 200 C 696 182, 706 178, 714 178 C 722 178, 726 186, 714 192 C 700 198, 704 210, 714 210 C 722 210, 728 202, 732 198"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 708 160 L 716 148 L 724 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'th' and 'ia' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'th' || selectedTarget === 'ia') && (
                  <g fill="none">
                    {/* MẪU 1: Chữ th/ia nét mực đen liền (tại x=160) */}
                    {selectedTarget === 'th' ? (
                      <g>
                        {/* Chữ t */}
                        <path
                          d="M 132 200 L 144 160"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 144 120 L 144 226 C 144 238, 150 240, 160 240 C 166 240, 170 228, 172 200"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 134 160 L 154 160"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        {/* Nối chữ h cao 5 ô ly */}
                        <path
                          d="M 172 200 L 186 160 C 196 110, 208 40, 198 40 C 190 40, 186 56, 186 84 L 186 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 186 216 C 194 176, 204 160, 214 160 C 224 160, 228 176, 228 200 L 228 228 C 228 240, 234 240, 240 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Chữ i */}
                        <path
                          d="M 148 200 L 160 160 L 160 226 C 160 238, 168 240, 178 240 C 184 240, 190 228, 192 200"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="160" cy="144" r="2.8" fill="#111827" />
                        {/* Chữ a nối từ i */}
                        <path
                          d="M 238 172 C 226 160, 208 160, 198 174 C 188 186, 188 208, 198 222 C 208 236, 226 236, 238 224"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 238 160 L 238 224 C 238 236, 244 240, 252 240"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </g>
                    )}

                    {/* MẪU 2: Chữ th/ia nét chấm mờ (tại x=320) */}
                    {selectedTarget === 'th' ? (
                      <g>
                        <path
                          d="M 292 200 L 304 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 304 120 L 304 226 C 304 238, 310 240, 320 240 C 326 240, 330 228, 332 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 294 160 L 314 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 332 200 L 346 160 C 356 110, 368 40, 358 40 C 350 40, 346 56, 346 84 L 346 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 346 216 C 354 176, 364 160, 374 160 C 384 160, 388 176, 388 200 L 388 228 C 388 240, 394 240, 400 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M 308 200 L 320 160 L 320 226 C 320 238, 328 240, 338 240 C 344 240, 350 228, 352 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="320" cy="144" r="2.5" fill="#475569" />
                        <path
                          d="M 398 172 C 386 160, 368 160, 358 174 C 348 186, 348 208, 358 222 C 368 236, 386 236, 398 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 398 160 L 398 224 C 398 236, 404 240, 412 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      </g>
                    )}

                    {/* MẪU 3: Cụm từ thủ đô / thìa nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'th' ? (
                      <g>
                        {/* Tiếng thủ */}
                        <path
                          d="M 452 200 L 464 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 464 120 L 464 226 C 464 238, 470 240, 480 240 C 486 240, 490 228, 492 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 454 160 L 474 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 492 200 L 506 160 C 516 110, 528 40, 518 40 C 510 40, 506 56, 506 84 L 506 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 506 216 C 514 176, 524 160, 534 160 C 544 160, 548 176, 548 200 L 548 228 C 548 240, 554 240, 560 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* u nối từ h */}
                        <path
                          d="M 560 240 L 568 160 L 568 224 C 568 236, 576 240, 588 240 C 600 240, 608 224, 608 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 608 160 L 608 224 C 608 236, 614 240, 620 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 596 136 C 596 130, 600 128, 604 128 C 608 128, 610 130, 610 134 C 610 138, 604 140, 602 142"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Tiếng đô: đ cao 4 ô ly nối ô */}
                        <path
                          d="M 696 172 C 684 160, 658 160, 646 176 C 634 192, 634 216, 646 230 C 658 240, 684 240, 696 226"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 696 80 L 696 224 C 696 236, 702 240, 710 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 686 120 L 706 120"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 776 172 C 764 160, 738 160, 726 176 C 714 192, 714 216, 726 230 C 738 240, 764 240, 776 226 C 784 212, 784 184, 776 172 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 742 152 L 750 136 L 758 152"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Tiếng thìa: th nối i + a + dấu huyền */}
                        <path
                          d="M 452 200 L 464 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 464 120 L 464 226 C 464 238, 470 240, 480 240 C 486 240, 490 228, 492 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 454 160 L 474 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 492 200 L 506 160 C 516 110, 528 40, 518 40 C 510 40, 506 56, 506 84 L 506 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 506 216 C 514 176, 524 160, 534 160 C 544 160, 548 176, 548 200 L 548 228 C 548 240, 554 240, 560 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Chữ i nối từ h */}
                        <path
                          d="M 560 240 L 572 160 L 572 226 C 572 238, 580 240, 590 240 C 596 240, 602 228, 604 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="572" cy="144" r="2.5" fill="#475569" />
                        <path
                          d="M 580 124 L 568 136"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        {/* Chữ a nối từ i */}
                        <path
                          d="M 650 172 C 638 160, 620 160, 610 174 C 600 186, 600 208, 610 222 C 620 236, 638 236, 650 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 650 160 L 650 224 C 650 236, 656 240, 664 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* SYNCHRONIZED LETTER 'ua' and 'ưa' MODELS */}
                {showGuide && writeCategory === 'letter' && (selectedTarget === 'ua' || selectedTarget === 'ưa') && (
                  <g fill="none">
                    {/* MẪU 1: Vần ua/ưa nét mực đen liền (tại x=160) */}
                    <g>
                      {/* Chữ u/ư */}
                      <path
                        d="M 136 200 L 148 160 L 148 224 C 148 236, 156 240, 168 240 C 180 240, 188 224, 188 160"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 188 160 L 188 226 C 188 238, 194 240, 204 240 C 210 240, 216 228, 218 200"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'ưa' && (
                        <path
                          d="M 188 160 C 192 152, 196 152, 195 160"
                          fill="none"
                          stroke="#111827"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      )}
                      {/* Chữ a nối từ u/ư */}
                      <path
                        d="M 264 172 C 252 160, 234 160, 224 174 C 214 186, 214 208, 224 222 C 234 236, 252 236, 264 224"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 264 160 L 264 224 C 264 236, 270 240, 278 240"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* MẪU 2: Vần ua/ưa nét chấm mờ (tại x=320) */}
                    <g>
                      <path
                        d="M 296 200 L 308 160 L 308 224 C 308 236, 316 240, 328 240 C 340 240, 348 224, 348 160"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 348 160 L 348 226 C 348 238, 354 240, 364 240 C 370 240, 376 228, 378 200"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {selectedTarget === 'ưa' && (
                        <path
                          d="M 348 160 C 352 152, 356 152, 355 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      )}
                      <path
                        d="M 424 172 C 412 160, 394 160, 384 174 C 374 186, 374 208, 384 222 C 394 236, 412 236, 424 224"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 424 160 L 424 224 C 424 236, 430 240, 438 240"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* MẪU 3: Cụm từ cà chua / dưa lê nét chấm mờ (tại x=480) */}
                    {selectedTarget === 'ua' ? (
                      <g>
                        {/* Tiếng cà: c nối a + dấu huyền */}
                        <path
                          d="M 480 174 C 472 160, 452 160, 440 174 C 428 190, 428 214, 440 228 C 452 240, 472 240, 480 226"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 514 172 C 504 160, 486 160, 476 174 C 466 186, 466 208, 476 222 C 486 236, 504 236, 514 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 514 160 L 514 224 C 514 236, 520 240, 528 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 508 136 L 496 148"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />

                        {/* Tiếng chua: c nối h cao 5 ô ly nối vần ua */}
                        <path
                          d="M 568 174 C 560 160, 540 160, 528 174 C 516 190, 516 214, 528 228 C 540 240, 560 240, 568 226"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 568 226 L 582 160 C 592 110, 604 40, 594 40 C 586 40, 582 56, 582 84 L 582 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 582 216 C 590 176, 600 160, 610 160 C 620 160, 624 176, 624 200 L 624 228 C 624 240, 630 240, 636 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* u nối từ h */}
                        <path
                          d="M 636 240 L 644 160 L 644 224 C 644 236, 652 240, 664 240 C 676 240, 684 224, 684 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 684 160 L 684 224 C 684 236, 690 240, 696 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* a nối từ u */}
                        <path
                          d="M 742 172 C 730 160, 712 160, 702 174 C 692 186, 692 208, 702 222 C 712 236, 730 236, 742 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 742 160 L 742 224 C 742 236, 748 240, 756 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                      </g>
                    ) : (
                      <g>
                        {/* Tiếng dưa: d cao 4 ô ly nối vần ưa */}
                        <path
                          d="M 504 172 C 492 160, 466 160, 454 176 C 442 192, 442 216, 454 230 C 466 240, 492 240, 504 226"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 504 80 L 504 224 C 504 236, 510 240, 518 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* ư nối từ d */}
                        <path
                          d="M 518 240 L 526 160 L 526 224 C 526 236, 534 240, 546 240 C 558 240, 566 224, 566 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 566 160 L 566 224 C 566 236, 572 240, 578 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 566 160 C 570 152, 574 152, 573 160"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />
                        {/* a nối từ ư */}
                        <path
                          d="M 624 172 C 612 160, 594 160, 584 174 C 574 186, 574 208, 584 222 C 594 236, 612 236, 624 224"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 624 160 L 624 224 C 624 236, 630 240, 638 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Tiếng lê: l cao 5 ô ly nối ê + dấu mũ */}
                        <path
                          d="M 660 200 L 674 160 C 684 110, 696 40, 686 40 C 678 40, 674 56, 674 84 L 674 224 C 674 236, 680 240, 688 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 688 240 C 692 222, 702 218, 710 218 C 718 218, 722 226, 710 232 C 696 238, 700 240, 710 240"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 704 200 L 712 188 L 720 200"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* Fallback for other letters/strokes/numbers */}
                {showGuide && writeCategory === 'stroke' && currentStroke && (
                  <g transform="translate(100, 60)">
                    <path
                      d={currentStroke.svgPath}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="10"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {showGuide && writeCategory === 'letter' && selectedTarget !== 'a' && selectedTarget !== 'b' && selectedTarget !== 'c' && selectedTarget !== 'e' && selectedTarget !== 'ê' && selectedTarget !== 'o' && selectedTarget !== 'ô' && selectedTarget !== 'ơ' && selectedTarget !== 'd' && selectedTarget !== 'đ' && selectedTarget !== 'i' && selectedTarget !== 'k' && selectedTarget !== 'h' && selectedTarget !== 'l' && selectedTarget !== 'u' && selectedTarget !== 'ư' && selectedTarget !== 'm' && selectedTarget !== 'n' && selectedTarget !== 'g' && selectedTarget !== 'gi' && selectedTarget !== 'r' && selectedTarget !== 's' && selectedTarget !== 't' && selectedTarget !== 'tr' && selectedTarget !== 'th' && selectedTarget !== 'ia' && selectedTarget !== 'ua' && selectedTarget !== 'ưa' && (
                  <text
                    x="200"
                    y="240"
                    fontSize="160"
                    fontFamily="KidFont, sans-serif"
                    fill="#a5b4fc"
                    opacity="0.5"
                  >
                    {selectedTarget}
                  </text>
                )}

                {/* DEDICATED VIETNAMESE GRADE 1 DIGIT MODELS (Height = 2 ô ly = 80px from y=160 to y=240) */}
                {showGuide && writeCategory === 'number' && ['6', '7', '8', '9', '0'].includes(selectedTarget) && (
                  <g fill="none">
                    {/* Helper to render each digit at a specified X offset */}
                    {[160, 320, 480].map((baseX, idx) => {
                      const isDotted = idx > 0;
                      const strokeColor = isDotted ? '#475569' : '#0284c7';
                      const strokeWidth = isDotted ? 2.5 : 2.8;
                      const strokeDasharray = isDotted ? '4 4' : undefined;

                      return (
                        <g key={baseX}>
                          {selectedTarget === '6' && (
                            <path
                              d={`M ${baseX + 24} 164 C ${baseX + 12} 176, ${baseX + 4} 196, ${baseX + 4} 220 C ${baseX + 4} 234, ${baseX + 12} 240, ${baseX + 24} 240 C ${baseX + 38} 240, ${baseX + 46} 230, ${baseX + 46} 214 C ${baseX + 46} 198, ${baseX + 34} 192, ${baseX + 22} 192 C ${baseX + 12} 192, ${baseX + 6} 200, ${baseX + 4} 212`}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth={strokeWidth}
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                            />
                          )}

                          {selectedTarget === '7' && (
                            <path
                              d={`M ${baseX} 160 L ${baseX + 40} 160 L ${baseX + 18} 240 M ${baseX + 8} 200 L ${baseX + 32} 200`}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth={strokeWidth}
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                            />
                          )}

                          {selectedTarget === '8' && (
                            <path
                              d={`M ${baseX + 20} 164 C ${baseX + 28} 160, ${baseX + 36} 168, ${baseX + 36} 180 C ${baseX + 36} 192, ${baseX + 24} 200, ${baseX + 16} 206 C ${baseX + 6} 212, ${baseX + 2} 222, ${baseX + 2} 232 C ${baseX + 2} 240, ${baseX + 14} 240, ${baseX + 22} 240 C ${baseX + 34} 240, ${baseX + 44} 232, ${baseX + 44} 220 C ${baseX + 44} 208, ${baseX + 32} 200, ${baseX + 20} 192 C ${baseX + 10} 184, ${baseX + 6} 176, ${baseX + 6} 168 C ${baseX + 6} 160, ${baseX + 12} 160, ${baseX + 20} 164 Z`}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth={strokeWidth}
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                            />
                          )}

                          {selectedTarget === '9' && (
                            <path
                              d={`M ${baseX + 22} 196 C ${baseX + 12} 196, ${baseX + 2} 186, ${baseX + 2} 174 C ${baseX + 2} 160, ${baseX + 14} 160, ${baseX + 26} 160 C ${baseX + 40} 160, ${baseX + 44} 172, ${baseX + 44} 190 L ${baseX + 44} 226 C ${baseX + 44} 238, ${baseX + 36} 240, ${baseX + 24} 240 M ${baseX + 22} 196 C ${baseX + 34} 196, ${baseX + 44} 186, ${baseX + 44} 174`}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth={strokeWidth}
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                            />
                          )}

                          {selectedTarget === '0' && (
                            <path
                              d={`M ${baseX + 22} 160 C ${baseX + 8} 160, ${baseX} 178, ${baseX} 200 C ${baseX} 224, ${baseX + 8} 240, ${baseX + 22} 240 C ${baseX + 36} 240, ${baseX + 44} 224, ${baseX + 44} 200 C ${baseX + 44} 178, ${baseX + 36} 160, ${baseX + 22} 160 Z`}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth={strokeWidth}
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}

                {showGuide && writeCategory === 'number' && !['6', '7', '8', '9', '0'].includes(selectedTarget) && (
                  <text
                    x="200"
                    y="240"
                    fontSize="160"
                    fontFamily="KidFont, sans-serif"
                    fill="#a5b4fc"
                    opacity="0.5"
                  >
                    {selectedTarget}
                  </text>
                )}
              </svg>

              {/* Interactive HTML5 Drawing Canvas Layer */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10"
              />
            </div>

            {/* Canvas Bottom Action Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Pencil className="w-4 h-4 text-purple-600" />
                <span>Bé dùng chuột hoặc ngón tay để nắn nót tô theo nét mẫu nhé</span>
              </div>

              <button
                onClick={handleGradeWriting}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold font-kid text-sm shadow-md shadow-orange-500/20 hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Chấm Điểm & Khen Thưởng</span>
              </button>
            </div>
          </div>

          {/* Feedback banner */}
          {scoreResult && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between animate-fade-in shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌟</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-kid font-bold text-lg">Điểm {scoreResult.score}/10</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-800 text-xs font-semibold">
                      Xuất sắc (+1 sao ⭐)
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 mt-0.5">{scoreResult.comment}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Handwriting Instruction & Reference */}
        <div className="lg:col-span-4 space-y-4">
          {/* Target Explanation Card */}
          <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-purple-700 tracking-wider">
                Hướng dẫn viết
              </span>
              <button
                onClick={() => {
                  if (writeCategory === 'stroke' && currentStroke) {
                    speakVietnamese(currentStroke.instruction);
                  } else if (currentLetterInfo) {
                    speakVietnamese(`Chữ ${currentLetterInfo.char}, đọc là ${currentLetterInfo.sound}. Ví dụ: ${currentLetterInfo.example}.`);
                  }
                }}
                className="p-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100"
                title="Nghe hướng dẫn viết"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {writeCategory === 'stroke' && currentStroke && (
              <div className="space-y-2">
                <h3 className="font-kid font-bold text-xl text-slate-900">
                  {currentStroke.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentStroke.description}
                </p>
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold">Cách lia bút: </span>
                  {currentStroke.instruction}
                </div>
              </div>
            )}

            {writeCategory === 'letter' && currentLetterInfo && (
              <div className="space-y-3">
                <div className="flex items-center justify-around py-2 bg-purple-50 rounded-2xl">
                  <div className="text-center">
                    <span className="text-3xl font-kid font-bold text-purple-900">
                      {currentLetterInfo.char}
                    </span>
                    <p className="text-[10px] text-slate-500">Chữ thường</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-kid font-bold text-purple-900">
                      {currentLetterInfo.upper}
                    </span>
                    <p className="text-[10px] text-slate-500">Chữ hoa</p>
                  </div>
                </div>

                {selectedTarget === 'a' ? (
                  <div className="space-y-2.5 pt-1">
                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
                      <div className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">1</span>
                        <span>Nét 1: Nét cong kín (cao 2 ô ly, rộng 1,5 ô ly)</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Đặt bút ngay dưới đường kẻ ngang 3 một chút. Viết nét cong tròn đều từ phải sang trái, đáy chạm đường kẻ ngang 1 (đường đậm ở đáy), lượn lên khép kín tại điểm xuất phát.
                      </p>
                    </div>

                    <div className="p-3 bg-sky-50/80 rounded-2xl border border-sky-200 space-y-1">
                      <div className="font-bold text-sky-950 flex items-center gap-1.5 text-xs">
                        <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">2</span>
                        <span>Nét 2: Nét móc ngược phải (cao 2 ô ly, dừng ở 1 ô ly)</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Lia bút lên đường kẻ ngang 3 (ngay mép phải nét cong kín), kéo một nét thẳng dọc theo đường kẻ dọc xuống. Gần chạm đường kẻ 1 thì lượn cong đáy sang phải, dừng bút tại đường kẻ ngang 2 và đường kẻ dọc kế tiếp.
                      </p>
                    </div>

                    <button
                      onClick={() => speakVietnamese('Quy trình viết chữ a: Chữ a thường cao 2 ô ly và gồm 2 nét. Bước một, viết nét cong kín: Đặt bút ngay dưới đường kẻ ngang 3 một chút, viết nét cong tròn đều từ phải sang trái, đáy chạm đường kẻ ngang 1 là đường kẻ đậm ở đáy, lượn lên khép kín. Bước hai, viết nét móc ngược phải: Lia bút lên đường kẻ ngang 3 ngay mép phải nét cong kín, kéo thẳng dọc theo đường kẻ dọc xuống, lượn cong đáy sang phải rồi móc chếch lên, dừng bút tại đường kẻ ngang 2 ở độ cao 1 ô ly.')}
                      className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition-colors shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Nghe cô giáo đọc quy trình viết</span>
                    </button>
                  </div>
                ) : selectedTarget === 'b' ? (
                  <div className="space-y-2.5 pt-1">
                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
                      <div className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">1</span>
                        <span>Nét 1: Nét khuyết trên (cao 5 ô ly)</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Đặt bút trên đường kẻ ngang 2, viết nét khuyết trên chạm đường kẻ ngang 6, uốn sang trái kéo thẳng dọc xuống dọc theo đường kẻ dọc chạm đường kẻ ngang 1 (đáy).
                      </p>
                    </div>

                    <div className="p-3 bg-sky-50/80 rounded-2xl border border-sky-200 space-y-1">
                      <div className="font-bold text-sky-950 flex items-center gap-1.5 text-xs">
                        <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">2</span>
                        <span>Nét 2: Nét móc ngược & Nét thắt (cao 2 ô ly)</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Từ đáy đường kẻ ngang 1, lượn cong đáy sang phải, đi lên đường kẻ ngang 3 thì lượn vào trong tạo vòng thắt nhỏ (nét thắt), rồi dừng bút gần đường kẻ ngang 3.
                      </p>
                    </div>

                    <button
                      onClick={() => speakVietnamese('Quy trình viết chữ b: Chữ b thường cao 5 ô ly, gồm nét khuyết trên và nét móc ngược kết hợp nét thắt. Đặt bút trên đường kẻ ngang 2, viết nét khuyết trên cao 5 ô ly chạm đường kẻ ngang 6, uốn sang trái kéo thẳng dọc xuống dọc theo đường kẻ dọc chạm đường kẻ ngang 1 ở đáy. Sau đó lượn cong đáy sang phải, đi lên đến đường kẻ ngang 3 thì lượn vào trong tạo vòng thắt nhỏ, dừng bút gần đường kẻ ngang 3.')}
                      className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition-colors shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Nghe cô giáo đọc quy trình viết chữ b</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-xs space-y-1 text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Tên gọi: </span>
                      {currentLetterInfo.name}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Phát âm: </span>
                      {currentLetterInfo.sound}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Từ ứng dụng: </span>
                      <span className="font-bold text-emerald-700">{currentLetterInfo.example}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {writeCategory === 'number' && (
              <div className="space-y-2">
                <h3 className="font-kid font-bold text-xl text-slate-900">
                  Chữ số {selectedTarget}
                </h3>
                <p className="text-xs text-slate-600">
                  Chữ số viết cao 2 ô ly chuẩn theo mẫu chữ viết lớp 1 của Bộ Giáo dục và Đào tạo.
                </p>
              </div>
            )}
          </div>

          {/* Quy tắc cầm bút & tư thế ngồi chuẩn lớp 1 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 shadow-xs space-y-2 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 font-kid font-bold text-base text-amber-900">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Quy tắc cầm bút 3 ngón tay:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 text-[11px] leading-relaxed">
              <li>Cầm bút bằng 3 ngón: ngón cái, ngón trỏ và ngón giữa.</li>
              <li>Khoảng cách từ đầu ngón tay đến ngòi bút khoảng 2,5 cm.</li>
              <li>Lưng thẳng, ngực không tì vào mép bàn, khoảng cách mắt 25 - 30 cm.</li>
              <li>Tay trái giữ mép vở cho ngay ngắn, ánh sáng chiếu từ bên trái sang.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

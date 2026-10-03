import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, Sun, Cloud } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson10DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson10Detail: React.FC<Lesson10DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page32' | 'page33'>('page32');
  const [hasCompletedStory, setHasCompletedStory] = useState<boolean>(false);
  const [currentStoryScene, setCurrentStoryScene] = useState<number>(1);
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

  // Story scene data
  const storyScenes = [
    {
      id: 1,
      title: 'Tranh 1: Thăm bà kiến già',
      question: 'Bà kiến sống ở đâu?',
      detail: 'Bà kiến đã già yếu, mắt mờ, chân chậm. Bà sống một mình trong cái hang đất ẩm thấp, tối tăm dưới gốc cây to rễ đâm sâu.',
      speech: 'Tranh một: Bà kiến sống ở đâu? Bà kiến đã già yếu, sống một mình trong một cái hang đất ẩm thấp, tối tăm dưới gốc cây cổ thụ. Đàn kiến con thường mang thức ăn đến thăm bà.',
      icon: '🐜👵🕳️',
    },
    {
      id: 2,
      title: 'Tranh 2: Khiêng kiệu lá đưa bà',
      question: 'Đàn kiến con dùng vật gì để khiêng bà kiến?',
      detail: 'Thấy nơi ở của bà ẩm ướt, đàn kiến con rủ nhau ngắt một chiếc lá cây to màu xanh làm kiệu, nhẹ nhàng mời bà kiến ngồi lên để khiêng đi.',
      speech: 'Tranh hai: Đàn kiến con dùng vật gì để khiêng bà kiến? Đàn kiến con ngoan ngoãn ngắt một chiếc lá xanh thật to làm kiệu, mời bà kiến ngồi lên rồi cùng nhau ghé vai khiêng bà đi.',
      icon: '🍃🐜🐜',
    },
    {
      id: 3,
      title: 'Tranh 3: Vượt dốc đá gập ghềnh',
      question: 'Đàn kiến con đưa bà kiến đến đâu?',
      detail: 'Đàn kiến con đồng lòng, bước đi thật đều và cẩn thận: "Một, hai, ba! Một, hai, ba!", đưa bà kiến vượt qua dốc đá gập ghềnh và bụi cỏ rậm rạp.',
      speech: 'Tranh ba: Đàn kiến con đưa bà kiến đến đâu? Đàn kiến con cẩn thận khiêng kiệu lá đưa bà kiến vượt qua triền đá dốc gập ghềnh để đến một vùng đất cao ráo, ngập tràn ánh nắng.',
      icon: '⛰️🌾🐜',
    },
    {
      id: 4,
      title: 'Tranh 4: Ngôi nhà mới ấm áp',
      question: 'Được ở nhà mới, bà kiến nói gì với đàn kiến con?',
      detail: 'Được ở ngôi nhà mới khô ráo, sạch sẽ, đón ánh nắng mặt trời ấm áp, bà kiến xúc động cảm ơn và khen ngợi đàn kiến con hiếu thảo, ngoan ngoãn.',
      speech: 'Tranh bốn: Được ở nhà mới, bà kiến nói gì với đàn kiến con? Bà kiến rơm rớm nước mắt vì xúc động, bà nói: "Bà cảm ơn các cháu! Các cháu thật là ngoan ngoãn và hiếu thảo!"',
      icon: '🏡☀️🐜💖',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Tabs Header: Trang 32 & Trang 33 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page32')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page32'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 32: Đọc bảng ghép âm & Đám mây từ ngữ</span>
          </button>
          <button
            onClick={() => setActiveTab('page33')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page33'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🐜 Trang 33: Viết "đỗ đỏ" & Kể chuyện "Đàn kiến con ngoan ngoãn"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 10! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page32' ? (
        /* =========================================================================
           TRANG 32: BẢNG GHÉP ÂM, CÁC ĐÁM MÂY TỪ NGỮ VÀ 2 CÂU ĐỌC ỨNG DỤNG
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 10: ÔN TẬP VÀ KỂ CHUYỆN */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">10</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Tiết ôn tập tuần
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-kid drop-shadow-sm">
                  ÔN TẬP VÀ KỂ CHUYỆN
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười: Ôn tập và kể chuyện. Ôn tập các âm dờ, đờ ghép với o, ô, ơ.')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo giới thiệu bài</span>
            </button>
          </div>

          {/* MỤC 1: ĐỌC (BẢNG GHÉP ÂM & ĐÁM MÂY TỪ NGỮ THEO SGK TRANG 32) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bảng ghép âm: dờ o do, dờ ô dô, dờ ơ dơ. đờ o đo, đờ ô đô, đờ ơ đơ. Các từ: bó cỏ, cá cờ, đỡ bà, bờ đê, cờ đỏ, đỗ đỏ, dỗ bé. Câu: Bờ đê có dế. Bà có đỗ đỏ.')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo đọc toàn bộ</span>
              </button>
            </div>

            {/* BẢNG GHÉP ÂM CHUẨN XÁC THEO SGK TRANG 32 */}
            <div className="max-w-md mx-auto bg-amber-50/80 p-5 rounded-3xl border-2 border-amber-200 shadow-xs">
              <span className="text-xs text-slate-600 font-bold block text-center mb-3">
                Bảng ghép âm (Chạm vào từng ô để nghe đọc):
              </span>

              {/* Grid 4 columns: [empty, o, ô, ơ], 2 rows: [d, ...], [đ, ...] */}
              <div className="grid grid-cols-4 gap-2 text-center font-sans font-bold">
                {/* Header row */}
                <div className="p-2.5 rounded-xl bg-transparent" />
                {['o', 'ô', 'ơ'].map((vowel) => (
                  <button
                    key={vowel}
                    onClick={() => handleSpeak(vowel)}
                    className="p-2.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-slate-900 text-2xl transition-colors cursor-pointer shadow-2xs"
                  >
                    {vowel}
                  </button>
                ))}

                {/* Row d */}
                <button
                  onClick={() => handleSpeak('dờ')}
                  className="p-2.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-slate-900 text-2xl transition-colors cursor-pointer shadow-2xs"
                >
                  d
                </button>
                <button
                  onClick={() => handleSpeak('dờ - o - do. do.')}
                  className="p-2.5 rounded-xl bg-[#fed7aa] hover:bg-[#fdba74] text-slate-900 text-2xl transition-all cursor-pointer shadow-2xs"
                >
                  do
                </button>
                <button
                  onClick={() => handleSpeak('dờ - ô - dô. dô.')}
                  className="p-2.5 rounded-xl bg-[#fed7aa] hover:bg-[#fdba74] text-slate-900 text-2xl transition-all cursor-pointer shadow-2xs"
                >
                  dô
                </button>
                <button
                  onClick={() => handleSpeak('dờ - ơ - dơ. dơ.')}
                  className="p-2.5 rounded-xl bg-[#fed7aa] hover:bg-[#fdba74] text-slate-900 text-2xl transition-all cursor-pointer shadow-2xs"
                >
                  dơ
                </button>

                {/* Row đ */}
                <button
                  onClick={() => handleSpeak('đờ')}
                  className="p-2.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-slate-900 text-2xl transition-colors cursor-pointer shadow-2xs"
                >
                  đ
                </button>
                <button
                  onClick={() => handleSpeak('đờ - o - đo. đo.')}
                  className="p-2.5 rounded-xl bg-[#fed7aa] hover:bg-[#fdba74] text-slate-900 text-2xl transition-all cursor-pointer shadow-2xs"
                >
                  đo
                </button>
                <button
                  onClick={() => handleSpeak('đờ - ô - đô. đô.')}
                  className="p-2.5 rounded-xl bg-[#fed7aa] hover:bg-[#fdba74] text-slate-900 text-2xl transition-all cursor-pointer shadow-2xs"
                >
                  đô
                </button>
                <button
                  onClick={() => handleSpeak('đờ - ơ - đơ. đơ.')}
                  className="p-2.5 rounded-xl bg-[#fed7aa] hover:bg-[#fdba74] text-slate-900 text-2xl transition-all cursor-pointer shadow-2xs"
                >
                  đơ
                </button>
              </div>
            </div>

            {/* BẦU TRỜI XANH VỚI 7 ĐÁM MÂY TỪ NGỮ THEO SGK TRANG 32 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-100 p-8 border border-sky-300 overflow-hidden shadow-inner min-h-[360px] flex flex-col justify-between">
              {/* Sun shining on top right */}
              <div className="absolute top-4 right-6 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-400 shadow-[0_0_40px_#f59e0b] flex items-center justify-center animate-pulse-slow">
                  <span className="text-3xl">☀️</span>
                </div>
              </div>

              {/* 7 Fluffy White Clouds with Review Words */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-6 max-w-2xl mx-auto">
                {[
                  { word: 'bó cỏ', icon: '🌾', spell: 'bó cỏ' },
                  { word: 'cá cờ', icon: '🐠', spell: 'cá cờ' },
                  { word: 'đỡ bà', icon: '👵', spell: 'đỡ bà' },
                  { word: 'bờ đê', icon: '🏞️', spell: 'bờ đê' },
                  { word: 'cờ đỏ', icon: '🚩', spell: 'cờ đỏ' },
                  { word: 'đỗ đỏ', icon: '🫘', spell: 'đỗ đỏ' },
                  { word: 'dỗ bé', icon: '👶', spell: 'dỗ bé' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSpeak(item.spell)}
                    className="group bg-white/95 hover:bg-white text-emerald-950 px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center gap-2 border-2 border-sky-100 cursor-pointer"
                    title={`Bấm để nghe: ${item.word}`}
                  >
                    <span className="text-xl group-hover:rotate-12 transition-transform">{item.icon}</span>
                    <span className="font-kid font-bold text-2xl text-slate-800 group-hover:text-emerald-700">
                      {item.word}
                    </span>
                    <Volume2 className="w-4 h-4 text-sky-400 opacity-60 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              {/* Bottom grassy hill with kids reading and kid with magnifying glass */}
              <div className="relative z-10 flex items-end justify-between pt-4 border-t border-sky-300/40">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs">
                  <span className="text-3xl">👦🔍</span>
                  <span className="text-[11px] font-bold text-slate-700">Bé khám phá thiên nhiên</span>
                </div>

                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs">
                  <span className="text-3xl">👦👧📖</span>
                  <span className="text-[11px] font-bold text-slate-700">Các bạn say mê đọc sách</span>
                </div>
              </div>
            </div>

            {/* 2 CÂU ĐỌC ỨNG DỤNG THEO SGK TRANG 32 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-1">
              <button
                onClick={() => handleSpeak('Bờ đê có dế.')}
                className="p-4 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
              >
                <span className="font-kid font-bold text-2xl text-slate-900 group-hover:text-amber-900">
                  Bờ đê có dế.
                </span>
                <div className="mt-1 flex items-center justify-center gap-1 text-xs text-amber-800">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu 1</span>
                </div>
              </button>

              <button
                onClick={() => handleSpeak('Bà có đỗ đỏ.')}
                className="p-4 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
              >
                <span className="font-kid font-bold text-2xl text-slate-900 group-hover:text-amber-900">
                  Bà có đỗ đỏ.
                </span>
                <div className="mt-1 flex items-center justify-center gap-1 text-xs text-amber-800">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu 2</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           TRANG 33: MỤC 2 (VIẾT "đỗ đỏ") VÀ MỤC 3 (KỂ CHUYỆN "ĐÀN KIẾN CON NGOAN NGOÃN")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 2: VIẾT (CHUẨN XÁC TỪNG NÉT THEO SGK TRANG 33: "đỗ đỏ") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center bg-[#58be3b] rounded-full pl-1.5 pr-4 py-1 text-white shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#fbb03b] text-slate-900 font-black flex items-center justify-center text-xs mr-2 shadow-xs">
                  2
                </span>
                <span className="font-kid font-bold text-base tracking-wide">
                  Viết: <span className="text-amber-200 ml-1">đỗ đỏ</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak('Cách viết từ đỗ đỏ: Tiếng đỗ: Viết chữ đ cao 4 ô ly dừng bút ở đường kẻ 2, chạm liền sang mép trái chữ ô cao 2 ô ly, dấu mũ trên đầu chữ ô và dấu ngã trên đỉnh dấu mũ. Cách 1 khoảng 1 ô ly, viết tiếp tiếng đỏ: chữ đ cao 4 ô ly nối sang o cao 2 ô ly, dấu hỏi trên đầu chữ o.')}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết từ đỗ đỏ"
                >
                  <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Cách viết từ "đỗ đỏ"</span>
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

            {/* Quy trình chi tiết nét chữ */}
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-amber-950 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">✏️</span>
                <span>Quy chuẩn kỹ thuật viết từ "đỗ đỏ":</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                <strong>Tiếng đỗ:</strong> Chữ đ cao 4 ô ly (nét gạch ngang ở ĐK 4) dừng ở ĐK 2, mép trái chữ ô chạm liền vào điểm dừng của đ. Dấu mũ ^ cân đối và dấu ngã ~ lượn sóng trên đỉnh dấu mũ.<br />
                <strong>Khoảng cách 1 ô ly:</strong> Cách đúng 1 ô ly (rộng 22px).<br />
                <strong>Tiếng đỏ:</strong> Chữ đ cao 4 ô ly dừng ở ĐK 2, mép trái chữ o chạm liền vào điểm dừng của đ. Dấu hỏi ? đặt ngay ngắn trên đầu chữ o.
              </p>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP FOR "đỗ đỏ" AS ON PAGE 33 */}
            <div className="relative w-full overflow-hidden select-none">
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page33" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page33)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 5 (đỉnh chữ đ - cao 4 ô ly): y = 24 */}
                  <line x1="0" y1="24" x2="100%" y2="24" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 4 (vị trí nét gạch ngang ngắn của chữ đ): y = 46 */}
                  <line x1="0" y1="46" x2="100%" y2="46" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ o, ô - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      MẪU 1: CỤM TỪ 'đỗ đỏ' NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG ĐỖ: Chữ đ cao 4 ô ly */}
                    <path
                      d="M 55 74 C 49 68, 39 68, 33 76 C 27 84, 27 96, 33 104 C 39 112, 49 112, 55 104 C 59 96, 59 82, 55 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 55 24 L 55 104 C 55 112, 59 112, 66 112 C 71 112, 75 104, 77 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 44 46 L 66 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* Chữ ô của tiếng đỗ */}
                    <path
                      d="M 99 74 C 93 68, 83 68, 77 76 C 71 84, 71 96, 77 104 C 83 112, 93 112, 99 104 C 103 96, 103 82, 99 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ */}
                    <path
                      d="M 83 64 L 88 56 L 93 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu ngã ~ trên đỉnh dấu mũ */}
                    <path
                      d="M 83 50 C 85 48, 87 48, 89 50 C 91 52, 93 52, 95 50"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG ĐỎ: Chữ đ cao 4 ô ly */}
                    <path
                      d="M 154 74 C 148 68, 138 68, 132 76 C 126 84, 126 96, 132 104 C 138 112, 148 112, 154 104 C 158 96, 158 82, 154 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 154 24 L 154 104 C 154 112, 158 112, 165 112 C 170 112, 174 104, 176 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 143 46 L 165 46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* Chữ o của tiếng đỏ */}
                    <path
                      d="M 198 74 C 192 68, 182 68, 176 76 C 170 84, 170 96, 176 104 C 182 112, 192 112, 198 104 C 202 96, 202 82, 198 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu hỏi ? trên đầu o */}
                    <path
                      d="M 185 55 C 185 52, 188 50, 190 50 C 193 50, 195 52, 195 55 C 195 58, 191 60, 190 62 L 190 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      MẪU 2: CỤM TỪ 'đỗ đỏ' NÉT CHẤM MỜ (DOTTED) TIẾP THEO
                      ============================================================== */}
                  <g fill="none">
                    {/* Tiếng đỗ chấm mờ */}
                    <path
                      d="M 253 74 C 247 68, 237 68, 231 76 C 225 84, 225 96, 231 104 C 237 112, 247 112, 253 104 C 257 96, 257 82, 253 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 253 24 L 253 104 C 253 112, 257 112, 264 112 C 269 112, 273 104, 275 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 242 46 L 264 46"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 297 74 C 291 68, 281 68, 275 76 C 269 84, 269 96, 275 104 C 281 112, 291 112, 297 104 C 301 96, 301 82, 297 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 281 64 L 286 56 L 291 64"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 281 50 C 283 48, 285 48, 287 50 C 289 52, 291 52, 293 50"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />

                    {/* Tiếng đỏ chấm mờ */}
                    <path
                      d="M 352 74 C 346 68, 336 68, 330 76 C 324 84, 324 96, 330 104 C 336 112, 346 112, 352 104 C 356 96, 356 82, 352 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 352 24 L 352 104 C 352 112, 356 112, 363 112 C 368 112, 372 104, 374 90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 341 46 L 363 46"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 396 74 C 390 68, 380 68, 374 76 C 368 84, 368 96, 374 104 C 380 112, 390 112, 396 104 C 400 96, 400 82, 396 74 Z"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 383 55 C 383 52, 386 50, 388 50 C 391 50, 393 52, 393 55 C 393 58, 389 60, 388 62 L 388 64"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
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
                    Bé dùng chuột hoặc ngón tay chạm vào khung để tập tô và viết tiếp từ "đỗ đỏ"!
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

          {/* MỤC 3: KỂ CHUYỆN (ĐÀN KIẾN CON NGOAN NGOÃN - 4 BỨC TRANH THEO SGK TRANG 33) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  3
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-amber-950">Kể chuyện</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Đàn kiến con ngoan ngoãn
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSpeak('Kể chuyện: Đàn kiến con ngoan ngoãn. Bà kiến đã già yếu, sống một mình trong cái hang đất ẩm thấp dưới gốc cây to. Thấy vậy, đàn kiến con rủ nhau ngắt một chiếc lá xanh thật to làm kiệu, nhẹ nhàng mời bà kiến ngồi lên. Đàn kiến con đồng lòng khiêng kiệu lá đưa bà kiến vượt qua dốc đá gập ghềnh đến một vùng đất cao ráo, ngập tràn ánh nắng ấm áp. Được ở ngôi nhà mới sạch sẽ, bà kiến xúc động rơm rớm nước mắt: Cảm ơn các cháu! Các cháu thật là ngoan ngoãn và hiếu thảo!')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-all"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Nghe cô giáo kể toàn bộ câu chuyện</span>
              </button>
            </div>

            {/* 4 SCENES GRID OF THE STORY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {storyScenes.map((scene) => (
                <div
                  key={scene.id}
                  className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                    currentStoryScene === scene.id
                      ? 'bg-amber-50/70 border-amber-400 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                  onClick={() => {
                    setCurrentStoryScene(scene.id);
                    handleSpeak(scene.speech);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                        {scene.id}
                      </span>
                      <h4 className="font-kid font-bold text-sm text-slate-900">
                        {scene.title}
                      </h4>
                    </div>
                    <span className="text-2xl">{scene.icon}</span>
                  </div>

                  {/* Scene visual illustration */}
                  <div className="h-32 rounded-2xl bg-gradient-to-b from-amber-100/60 to-emerald-100/60 flex flex-col items-center justify-center p-3 text-center border border-amber-200/60 shadow-inner">
                    <span className="text-5xl mb-1 drop-shadow-sm">{scene.icon}</span>
                    <span className="text-xs font-bold text-amber-950 px-2 py-0.5 rounded-md bg-white/80 shadow-2xs">
                      {scene.question}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {scene.detail}
                  </p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>Chạm để nghe kể đoạn này</span>
                    <Volume2 className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Storyteller Completion & Star Earning */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bé học được điều gì từ câu chuyện "Đàn kiến con ngoan ngoãn"?
                  </h5>
                  <p className="text-xs text-emerald-800">
                    Chúng mình cần luôn biết yêu thương, chăm sóc và kính trọng người già nhé!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasCompletedStory(true);
                  handleSpeak('Bé thật tuyệt vời! Đã hoàn thành câu chuyện Đàn kiến con ngoan ngoãn!');
                  playSoundEffect.success();
                  onEarnStar();
                }}
                className={`px-4 py-2 rounded-xl font-kid font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
                  hasCompletedStory
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-900'
                }`}
              >
                {hasCompletedStory ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã nghe xong câu chuyện 🌟</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>Hoàn thành bài kể chuyện</span>
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

import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson20DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson20Detail: React.FC<Lesson20DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page52' | 'page53'>('page52');
  const [activeStoryScene, setActiveStoryScene] = useState<number>(1);
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

  // Story: Cô chủ không biết quý tình bạn
  const storyScenes = [
    {
      id: 1,
      title: 'Đoạn 1: Đổi gà trống lấy gà mái',
      question: 'Cô bé nuôi con vật gì? Cô bé muốn đổi con vật đó lấy con vật nào?',
      imageIcon: '👧🐓➡️🐔',
      audioText: 'Ngày xưa, có một cô bé nuôi một chú gà trống rất đẹp, lông sặc sỡ và gáy rất vang. Một hôm, thấy nhà hàng xóm có con gà mái đẻ trứng, cô bé bèn đem chú gà trống đổi lấy con gà mái.',
      hint: 'Cô bé nuôi gà trống, sau đó đem đổi lấy gà mái.',
    },
    {
      id: 2,
      title: 'Đoạn 2: Đổi gà mái lấy vịt con',
      question: 'Cô bé đổi gà mái lấy con vật nào?',
      imageIcon: '👧🐔➡️🦆',
      audioText: 'Nuôi gà mái được vài hôm, cô bé lại nhìn thấy một bạn nhỏ ôm chú vịt bầu trắng muốt biết bơi lội tung tăng dưới nước. Cô bé thích quá, lại nằng nặc đòi đổi gà mái lấy chú vịt con.',
      hint: 'Cô bé lại đem gà mái đổi lấy chú vịt con.',
    },
    {
      id: 3,
      title: 'Đoạn 3: Đổi vịt con lấy chó cún',
      question: 'Thấy chú chó nhỏ xinh xắn, cô bé đã làm gì?',
      imageIcon: '👧🦆➡️🐶',
      audioText: 'Chú vịt con chưa quen nhà thì cô bé lại thấy một chú chó cún con chạy nhảy đùa nghịch ngoài ngõ rất đáng yêu. Không ngần ngại, cô bé liền đổi ngay chú vịt lấy chú cún con về nuôi.',
      hint: 'Thấy chú cún xinh xắn, cô bé liền đổi ngay chú vịt lấy chú cún.',
    },
    {
      id: 4,
      title: 'Đoạn 4: Không còn người bạn nào',
      question: 'Cuối cùng, có con vật nào ở bên cô bé không? Vì sao?',
      imageIcon: '👧😢🚪🐶💨',
      audioText: 'Đêm đến, chú cún con nghĩ: Cô chủ này cả thèm chóng chán, hôm nay thích mình nhưng ngày mai lại đổi mình lấy con khác, chẳng biết quý trọng tình bạn gì cả. Thế là chú cún lén chui qua cửa bỏ đi. Sáng hôm sau thức dậy, cô bé buồn rầu nhận ra chẳng còn người bạn nào ở bên mình nữa.',
      hint: 'Cuối cùng không còn con vật nào ở bên cô bé vì cô bé không biết quý trọng tình bạn.',
    },
  ];

  const playFullStory = () => {
    handleSpeak(
      'Câu chuyện Cô chủ không biết quý tình bạn. Ngày xưa, có một cô bé nuôi một chú gà trống rất đẹp. Thấy nhà hàng xóm có gà mái, cô bé đổi gà trống lấy gà mái. Ít lâu sau, thấy vịt con bơi lội dễ thương, cô bé lại đổi gà mái lấy vịt con. Rồi thấy chú cún con xinh xắn ngoài ngõ, cô bé lại đổi vịt con lấy cún con. Đêm đến, chú cún nghĩ cô chủ cả thèm chóng chán, không biết quý tình bạn nên đã trốn đi mất. Sáng hôm sau tỉnh dậy, cô bé buồn rầu nhận ra chẳng còn người bạn nào ở bên mình nữa!'
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Tabs Header: Trang 52 & Trang 53 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page52')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page52'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 52: Hai bảng ghép âm & Cây táo từ ngữ</span>
          </button>
          <button
            onClick={() => setActiveTab('page53')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page53'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📚 Trang 53: Viết "ngõ nhỏ nhà bà" & Truyện tình bạn</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 20 Ôn tập và kể chuyện! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page52' ? (
        /* =========================================================================
           TRANG 52: MỤC 1 (ĐỌC - 2 BẢNG GHÉP ÂM, CÂY TÁO TỪ NGỮ VÀ 2 CÂU ỨNG DỤNG)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 20: ÔN TẬP VÀ KỂ CHUYỆN */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">20</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Ôn tập tuần 4
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-kid drop-shadow-sm uppercase">
                  ÔN TẬP VÀ KỂ CHUYỆN
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài hai mươi: Ôn tập và kể chuyện. Chúng mình cùng ôn tập lại các âm và chữ ghép đã học trong tuần nhé!')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo hướng dẫn ôn tập</span>
            </button>
          </div>

          {/* MỤC 1: ĐỌC (2 BẢNG GHÉP ÂM CHUẨN XÁC SGK TRANG 52) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bé bấm vào từng ô trong hai bảng để nghe đánh vần và đọc trơn nhé!')}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Hướng dẫn đọc bảng</span>
              </button>
            </div>

            {/* 2 BẢNG GHÉP ÂM SONG SONG CHUẨN XÁC THEO ẢNH TRANG 52 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BẢNG 1: m, n, g, gi ghép với e, ê, u */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr>
                      <th className="p-2.5 bg-amber-100/60 border border-amber-300 rounded-tl-xl w-14"></th>
                      {['e', 'ê', 'u'].map((vowel) => (
                        <th
                          key={vowel}
                          onClick={() => handleSpeak(`nguyên âm ${vowel}`)}
                          className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300"
                        >
                          {vowel}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* HÀNG m */}
                    <tr>
                      <td onClick={() => handleSpeak('âm mờ')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300">m</td>
                      <td onClick={() => handleSpeak('mờ - e - me. me.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">me</td>
                      <td onClick={() => handleSpeak('mờ - ê - mê. mê.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">mê</td>
                      <td onClick={() => handleSpeak('mờ - u - mu. mu.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">mu</td>
                    </tr>
                    {/* HÀNG n */}
                    <tr>
                      <td onClick={() => handleSpeak('âm nờ')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300">n</td>
                      <td onClick={() => handleSpeak('nờ - e - ne. ne.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">ne</td>
                      <td onClick={() => handleSpeak('nờ - ê - nê. nê.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">nê</td>
                      <td onClick={() => handleSpeak('nờ - u - nu. nu.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">nu</td>
                    </tr>
                    {/* HÀNG g (e và ê có dấu gạch chéo cam ✕) */}
                    <tr>
                      <td onClick={() => handleSpeak('âm gờ')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300">g</td>
                      <td onClick={() => handleSpeak('Quy tắc chính tả: chữ g đơn không đi với nguyên âm e')} className="p-2.5 bg-amber-200/60 border border-amber-300 font-sans font-black text-2xl text-amber-700 select-none cursor-pointer" title="g không đi với e">✕</td>
                      <td onClick={() => handleSpeak('Quy tắc chính tả: chữ g đơn không đi với nguyên âm ê')} className="p-2.5 bg-amber-200/60 border border-amber-300 font-sans font-black text-2xl text-amber-700 select-none cursor-pointer" title="g không đi với ê">✕</td>
                      <td onClick={() => handleSpeak('gờ - u - gu. gu.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">gu</td>
                    </tr>
                    {/* HÀNG gi */}
                    <tr>
                      <td onClick={() => handleSpeak('âm giờ')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 rounded-bl-xl cursor-pointer hover:bg-amber-300">gi</td>
                      <td onClick={() => handleSpeak('giờ - e - gie. gie.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">gie</td>
                      <td onClick={() => handleSpeak('giờ - ê - giê. giê.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">giê</td>
                      <td onClick={() => handleSpeak('giờ - u - giu. giu.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 rounded-br-xl cursor-pointer hover:bg-amber-100">giu</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* BẢNG 2: gh, nh, ng, ngh ghép với o, i, ư */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr>
                      <th className="p-2.5 bg-amber-100/60 border border-amber-300 rounded-tl-xl w-14"></th>
                      {['o', 'i', 'ư'].map((vowel) => (
                        <th
                          key={vowel}
                          onClick={() => handleSpeak(`nguyên âm ${vowel}`)}
                          className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300"
                        >
                          {vowel}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* HÀNG gh (o và ư có dấu gạch chéo ✕) */}
                    <tr>
                      <td onClick={() => handleSpeak('chữ ghờ kép')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300">gh</td>
                      <td onClick={() => handleSpeak('Quy tắc chính tả: chữ gh chỉ ghép với e, ê, i; không đi với o')} className="p-2.5 bg-amber-200/60 border border-amber-300 font-sans font-black text-2xl text-amber-700 select-none cursor-pointer" title="gh không đi với o">✕</td>
                      <td onClick={() => handleSpeak('gờ - i - ghi. ghi.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">ghi</td>
                      <td onClick={() => handleSpeak('Quy tắc chính tả: chữ gh không đi với nguyên âm ư')} className="p-2.5 bg-amber-200/60 border border-amber-300 font-sans font-black text-2xl text-amber-700 select-none cursor-pointer" title="gh không đi với ư">✕</td>
                    </tr>
                    {/* HÀNG nh */}
                    <tr>
                      <td onClick={() => handleSpeak('âm nhờ')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300">nh</td>
                      <td onClick={() => handleSpeak('nhờ - o - nho. nho.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">nho</td>
                      <td onClick={() => handleSpeak('nhờ - i - nhi. nhi.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">nhi</td>
                      <td onClick={() => handleSpeak('nhờ - ư - như. như.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">như</td>
                    </tr>
                    {/* HÀNG ng (i có dấu gạch chéo ✕) */}
                    <tr>
                      <td onClick={() => handleSpeak('âm ngờ đơn')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300">ng</td>
                      <td onClick={() => handleSpeak('ngờ - o - ngo. ngo.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">ngo</td>
                      <td onClick={() => handleSpeak('Quy tắc chính tả: chữ ng đơn không đi với nguyên âm i')} className="p-2.5 bg-amber-200/60 border border-amber-300 font-sans font-black text-2xl text-amber-700 select-none cursor-pointer" title="ng không đi với i">✕</td>
                      <td onClick={() => handleSpeak('ngờ - ư - ngư. ngư.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">ngư</td>
                    </tr>
                    {/* HÀNG ngh (o và ư có dấu gạch chéo ✕) */}
                    <tr>
                      <td onClick={() => handleSpeak('âm ngờ kép')} className="p-2.5 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 rounded-bl-xl cursor-pointer hover:bg-amber-300">ngh</td>
                      <td onClick={() => handleSpeak('Quy tắc chính tả: chữ ngh chỉ đi với e, ê, i; không đi với o')} className="p-2.5 bg-amber-200/60 border border-amber-300 font-sans font-black text-2xl text-amber-700 select-none cursor-pointer" title="ngh không đi với o">✕</td>
                      <td onClick={() => handleSpeak('ngờ - i - nghi. nghi.')} className="p-2.5 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">nghi</td>
                      <td onClick={() => handleSpeak('Quy tắc chính tả: chữ ngh không đi với nguyên âm ư')} className="p-2.5 bg-amber-200/60 border border-amber-300 font-sans font-black text-2xl text-slate-900 rounded-br-xl text-amber-700 select-none cursor-pointer" title="ngh không đi với ư">✕</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CÂY TÁO TỪ NGỮ VỚI CHÚ HƯƠU CAO CỔ SGK TRANG 52 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-emerald-100 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-emerald-900 font-bold bg-white/90 px-3 py-1 rounded-full shadow-2xs">
                  🍎 Cây táo từ ngữ xum xuê quả ngọt:
                </span>
                <span className="text-xs text-slate-600">
                  Chạm vào từng quả táo để nghe cô giáo đọc
                </span>
              </div>

              {/* Tree canopy with 8 apples and Giraffe on the left */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                {/* Giraffe */}
                <div className="flex flex-col items-center">
                  <span className="text-8xl drop-shadow-md animate-bounce-slow">🦒🍎</span>
                  <span className="text-[11px] font-bold text-slate-700 mt-1 bg-white/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                    Hươu cao cổ vươn cổ ăn táo
                  </span>
                </div>

                {/* 8 Apples on Tree */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 flex-1 max-w-xl">
                  {[
                    { word: 'nụ cà', icon: '🍆' },
                    { word: 'nhà ga', icon: '🚉' },
                    { word: 'nghỉ hè', icon: '🏖️' },
                    { word: 'ngủ mơ', icon: '😴' },
                    { word: 'bỡ ngỡ', icon: '😯' },
                    { word: 'giá đỗ', icon: '🌱' },
                    { word: 'ghế gỗ', icon: '🪑' },
                    { word: 'nho nhỏ', icon: '🍇' },
                  ].map((apple, idx) => (
                    <button
                      key={apple.word}
                      onClick={() => handleSpeak(apple.word)}
                      className="group p-3 rounded-3xl bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 hover:from-rose-300 hover:to-rose-500 border-2 border-rose-400 shadow-xs hover:shadow-md transition-all flex flex-col items-center cursor-pointer animate-float"
                      style={{ animationDelay: `${idx * 0.15}s` }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mb-0.5" />
                      <span className="font-sans font-black text-lg text-slate-900 drop-shadow-2xs group-hover:scale-110 transition-transform">
                        {apple.word}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2 CÂU ĐỌC ỨNG DỤNG SGK TRANG 52 (2 THẺ MÀU VÀNG CHÂN TRANG) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Thẻ câu 1: Mẹ ghé nhà bà. */}
              <div className="p-4 rounded-2xl bg-amber-200/80 border-2 border-amber-300 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <button
                    onClick={() => handleSpeak('Mẹ ghé nhà bà.')}
                    className="font-kid font-bold text-2xl text-slate-900 hover:text-emerald-800 transition-colors text-left cursor-pointer"
                  >
                    Mẹ ghé nhà bà.
                  </button>
                </div>
                <button
                  onClick={() => handleSpeak('Mẹ ghé nhà bà.')}
                  className="p-2 rounded-xl bg-white text-amber-700 hover:bg-amber-50 shadow-2xs cursor-pointer"
                  title="Nghe đọc câu"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Thẻ câu 2: Nhà bà ở ngõ nhỏ. */}
              <div className="p-4 rounded-2xl bg-amber-200/80 border-2 border-amber-300 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <button
                    onClick={() => handleSpeak('Nhà bà ở ngõ nhỏ.')}
                    className="font-kid font-bold text-2xl text-slate-900 hover:text-emerald-800 transition-colors text-left cursor-pointer"
                  >
                    Nhà bà ở ngõ nhỏ.
                  </button>
                </div>
                <button
                  onClick={() => handleSpeak('Nhà bà ở ngõ nhỏ.')}
                  className="p-2 rounded-xl bg-white text-amber-700 hover:bg-amber-50 shadow-2xs cursor-pointer"
                  title="Nghe đọc câu"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           TRANG 53: MỤC 2 (VIẾT "ngõ nhỏ nhà bà") VÀ MỤC 3 (KỂ CHUYỆN "Cô chủ không biết quý tình bạn")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 2: VIẾT (CHUẨN XÁC 100% THEO DẢI Ô LY SGK TRANG 53: ngõ nhỏ nhà bà) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center bg-[#58be3b] rounded-full pl-1.5 pr-4 py-1 text-white shadow-xs">
                <span className="w-6 h-6 rounded-full bg-[#fbb03b] text-slate-900 font-black flex items-center justify-center text-xs mr-2 shadow-xs">
                  2
                </span>
                <span className="font-kid font-bold text-base tracking-wide">
                  Viết
                </span>
              </div>

              {/* Chữ mẫu to màu xanh dương giữa dòng */}
              <div className="flex items-center gap-2">
                <span className="font-kid font-black text-3xl text-sky-600 drop-shadow-2xs">
                  ngõ nhỏ nhà bà
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak('Cách viết cụm từ ngõ nhỏ nhà bà: Tiếng ngõ: viết chữ ng nối sang o có dấu ngã. Cách 1 ô ly viết tiếng nhỏ: chữ nh nối sang o có dấu hỏi. Cách 1 ô ly viết tiếng nhà: chữ nh nối sang a có dấu huyền. Cách 1 ô ly viết tiếng bà: chữ b cao 5 ô ly nối sang a có dấu huyền.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết ngõ nhỏ nhà bà"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết "ngõ nhỏ nhà bà"</span>
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
            <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs space-y-1">
              <div className="font-bold text-sky-950 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">✏️</span>
                <span>Quy trình viết chuẩn 5 ô ly cụm từ: "ngõ nhỏ nhà bà"</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>ngõ:</strong> Chữ ng (n cao 2 ô ly nối g cao 5 ô ly) nối liền sang chữ o (cao 2 ô ly) + dấu ngã ~ trên đầu o.<br />
                <strong>nhỏ:</strong> Cách 1 ô ly, viết chữ nh (n cao 2 ô ly nối h cao 5 ô ly) nối sang chữ o + dấu hỏi ? trên đầu o.<br />
                <strong>nhà:</strong> Cách 1 ô ly, viết chữ nh nối sang chữ a (cao 2 ô ly) + dấu huyền \ trên đầu a.<br />
                <strong>bà:</strong> Cách 1 ô ly, viết chữ b (cao 5 ô ly) nối sang chữ a + dấu huyền \ trên đầu a.
              </p>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 53 OF TEXTBOOK */}
            <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                <defs>
                  <pattern id="oli-grid-page53" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                  </pattern>
                </defs>

                {/* Fill background with 22px dotted grid */}
                <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page53)" />

                {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                {/* Đường kẻ 6 (đỉnh chữ h, b cao 5 ô ly so với baseline y=46): y = 2 */}
                <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Đường kẻ 3 (đỉnh chữ n, cong kín g, o, a - cao 2 ô ly): y = 24 */}
                <line x1="0" y1="24" x2="100%" y2="24" stroke="#0284c7" strokeWidth="1.4" />

                {/* Đường kẻ 1 (Baseline ở độ cao y=46): y = 46 */}
                <line x1="0" y1="46" x2="100%" y2="46" stroke="#0284c7" strokeWidth="2.2" />

                {/* Đường kẻ dưới 3 (đáy nét khuyết dưới chữ g - sâu 3 ô ly): y = 112 */}
                <line x1="0" y1="112" x2="100%" y2="112" stroke="#0284c7" strokeWidth="1.4" />

                {/* Viền trái phải */}
                <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                {/* ==============================================================
                    MẪU 1: CỤM TỪ 'ngõ nhỏ nhà bà' NÉT MỰC ĐEN LIỀN (SOLID)
                    ============================================================== */}
                <g fill="none">
                  {/* TIẾNG NGÕ */}
                  <path
                    d="M 20 36 C 23 26, 28 24, 32 24 L 32 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 32 38 C 36 26, 44 24, 49 24 L 49 42 C 49 46, 52 46, 56 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ g */}
                  <path
                    d="M 78 30 C 74 24, 64 24, 58 32 C 52 40, 52 52, 58 60 C 64 68, 74 68, 78 60 C 81 54, 81 38, 78 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 78 24 L 78 100 C 78 112, 69 112, 64 112 C 59 112, 56 104, 60 94 L 88 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ o */}
                  <path
                    d="M 114 30 C 108 24, 98 24, 92 32 C 86 40, 86 52, 92 60 C 98 68, 108 68, 114 60 C 118 52, 118 38, 114 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dấu ngã ~ */}
                  <path
                    d="M 100 14 C 102 12, 104 12, 106 14 C 108 16, 110 16, 112 14"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG NHỎ */}
                  <path
                    d="M 144 36 C 147 26, 152 24, 156 24 L 156 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 156 38 C 160 26, 168 24, 173 24 L 173 42 C 173 46, 176 46, 180 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 180 46 L 188 24 C 194 10, 200 2, 195 2 C 191 2, 189 5, 189 12 L 189 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 189 38 C 193 26, 199 24, 205 24 C 210 24, 212 30, 212 38 L 212 42 C 212 46, 215 46, 218 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ o */}
                  <path
                    d="M 244 30 C 238 24, 228 24, 222 32 C 216 40, 216 52, 222 60 C 228 68, 238 68, 244 60 C 248 52, 248 38, 244 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dấu hỏi ? */}
                  <path
                    d="M 231 16 C 231 13, 233 12, 235 12 C 237 12, 238 13, 238 15 C 238 17, 235 18, 234 19 L 234 20"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG NHÀ */}
                  <path
                    d="M 274 36 C 277 26, 282 24, 286 24 L 286 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 286 38 C 290 26, 298 24, 303 24 L 303 42 C 303 46, 306 46, 310 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ h cao 5 ô ly */}
                  <path
                    d="M 310 46 L 318 24 C 324 10, 330 2, 325 2 C 321 2, 319 5, 319 12 L 319 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 319 38 C 323 26, 329 24, 335 24 C 340 24, 342 30, 342 38 L 342 42 C 342 46, 345 46, 348 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ a nối từ h */}
                  <path
                    d="M 374 30 C 368 24, 358 24, 352 32 C 346 40, 346 52, 352 60 C 358 68, 368 68, 374 60 C 378 52, 378 38, 374 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 374 24 L 374 60 C 374 68, 378 68, 385 68 C 390 68, 394 60, 396 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dấu huyền \ */}
                  <path
                    d="M 364 12 L 356 18"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* KHOẢNG CÁCH 1 Ô LY */}

                  {/* TIẾNG BÀ: chữ b cao 5 ô ly nối a + dấu huyền */}
                  <path
                    d="M 420 46 L 428 24 C 434 10, 440 2, 435 2 C 431 2, 429 5, 429 12 L 429 60 C 429 68, 436 68, 442 64 C 445 62, 446 56, 446 50 C 446 44, 441 46, 439 46 L 450 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chữ a nối từ b */}
                  <path
                    d="M 474 30 C 468 24, 458 24, 452 32 C 446 40, 446 52, 452 60 C 458 68, 468 68, 474 60 C 478 52, 478 38, 474 30 Z"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 474 24 L 474 60 C 474 68, 478 68, 485 68 C 490 68, 494 60, 496 46"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 464 12 L 456 18"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* ==============================================================
                    MẪU 2: CỤM TỪ 'ngõ nhỏ nhà bà' NÉT CHẤM MỜ (DOTTED) TIẾP THEO
                    ============================================================== */}
                <g fill="none">
                  {/* ngõ (chấm mờ) */}
                  <path
                    d="M 524 36 C 527 26, 532 24, 536 24 L 536 46"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 536 38 C 540 26, 548 24, 553 24 L 553 42 C 553 46, 556 46, 560 46"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 582 30 C 578 24, 568 24, 562 32 C 556 40, 556 52, 562 60 C 568 68, 578 68, 582 60 C 585 54, 585 38, 582 30 Z"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 582 24 L 582 100 C 582 112, 573 112, 568 112 C 563 112, 560 104, 564 94 L 592 46"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 618 30 C 612 24, 602 24, 596 32 C 590 40, 590 52, 596 60 C 602 68, 612 68, 618 60 C 622 52, 622 38, 618 30 Z"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 604 14 C 606 12, 608 12, 610 14 C 612 16, 614 16, 616 14"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* nhỏ (chấm mờ) */}
                  <path
                    d="M 648 36 C 651 26, 656 24, 660 24 L 660 46"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 660 38 C 664 26, 672 24, 677 24 L 677 42 C 677 46, 680 46, 684 46"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 684 46 L 692 24 C 698 10, 704 2, 699 2 C 695 2, 693 5, 693 12 L 693 46"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 693 38 C 697 26, 703 24, 709 24 C 714 24, 716 30, 716 38 L 716 42 C 716 46, 719 46, 722 46"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 748 30 C 742 24, 732 24, 726 32 C 720 40, 720 52, 726 60 C 732 68, 742 68, 748 60 C 752 52, 752 38, 748 30 Z"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 735 16 C 735 13, 737 12, 739 12 C 741 12, 742 13, 742 15 C 742 17, 739 18, 738 19 L 738 20"
                    fill="none"
                    stroke="#475569"
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

          {/* MỤC 3: KỂ CHUYỆN (CÂU CHUYỆN: "CÔ CHỦ KHÔNG BIẾT QUÝ TÌNH BẠN") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  3
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Kể chuyện</h3>
                  <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                    Truyện: Cô chủ không biết quý tình bạn
                  </span>
                </div>
              </div>

              <button
                onClick={playFullStory}
                className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-bold text-xs flex items-center gap-2 shadow-xs transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-900" />
                <span>Nghe cô giáo kể toàn bộ câu chuyện</span>
              </button>
            </div>

            {/* 4 Story Comic Panels matching Textbook Page 53 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {storyScenes.map((scene) => {
                const isActive = activeStoryScene === scene.id;
                return (
                  <div
                    key={scene.id}
                    onClick={() => {
                      setActiveStoryScene(scene.id);
                      handleSpeak(`${scene.title}. ${scene.audioText}`);
                    }}
                    className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isActive
                        ? 'bg-amber-50/80 border-amber-400 shadow-sm scale-101'
                        : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                          {scene.id}
                        </span>
                        <h4 className="font-kid font-bold text-sm text-slate-900">
                          {scene.title}
                        </h4>
                      </div>
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                    </div>

                    {/* Scene Illustration Box */}
                    <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 via-rose-50 to-amber-50 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
                      <span className="text-7xl mb-2 drop-shadow-sm">{scene.imageIcon}</span>
                      <span className="text-[11px] font-bold text-slate-700 bg-white/90 px-3 py-0.5 rounded-full shadow-2xs">
                        {scene.hint}
                      </span>
                    </div>

                    {/* Question Prompt matching textbook exact question */}
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Câu hỏi gợi ý:</span>
                      </div>
                      <p className="text-xs text-slate-800 font-semibold italic">
                        "{scene.question}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Lesson Reflection */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <h5 className="font-kid font-bold text-sm text-emerald-950">
                    Bài học về tình bạn:
                  </h5>
                  <p className="text-emerald-800">
                    Chúng mình không nên "cả thèm chóng chán". Hãy luôn trân trọng, thủy chung và gắn bó với những người bạn thân thiết xung quanh mình nhé!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  handleSpeak('Chúc mừng bé đã ghi nhớ và kể lại câu chuyện rất xuất sắc!');
                  playSoundEffect.success();
                  onEarnStar();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-kid font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Hoàn thành kể chuyện 🌟</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

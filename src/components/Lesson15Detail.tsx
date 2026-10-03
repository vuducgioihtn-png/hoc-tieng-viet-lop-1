import React, { useState, useRef } from 'react';
import { Volume2, Play, RotateCcw, Award, CheckCircle2, MessageSquare, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface Lesson15DetailProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
  onGoToWritingCanvas?: () => void;
}

export const Lesson15Detail: React.FC<Lesson15DetailProps> = ({
  onEarnStar,
  soundEnabled,
  onGoToWritingCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'page42' | 'page43'>('page42');
  const [activeStoryScene, setActiveStoryScene] = useState<number>(1);
  const [isPlayingFullStory, setIsPlayingFullStory] = useState<boolean>(false);
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

  // Story: Con quạ thông minh
  const storyScenes = [
    {
      id: 1,
      title: 'Đoạn 1: Quạ khát nước',
      question: 'Quạ nhìn thấy gì dưới gốc cây?',
      imageIcon: '🦅🌳🏺',
      audioText: 'Một hôm, quạ bay đi tìm nước uống vì rất khát. Đang bay mệt mỏi, quạ nhìn xuống một gốc cây to thì thấy một chiếc bình nước bằng thủy tinh có một ít nước ở đáy bình.',
      hint: 'Quạ nhìn thấy một chiếc bình nước bằng thủy tinh ở dưới gốc cây.',
    },
    {
      id: 2,
      title: 'Đoạn 2: Bình nước khó uống',
      question: 'Quạ có uống được nước trong bình không? Vì sao?',
      imageIcon: '🦅🏺🚫',
      audioText: 'Quạ liền sà xuống bên tảng đá, thò mỏ vào bình để uống. Nhưng than ôi, cổ bình thì cao và hẹp, nước lại ở tận đáy bình, mỏ quạ quá ngắn nên không thể nào chạm tới nước.',
      hint: 'Quạ không uống được nước vì cổ bình hẹp và nước ở tận đáy bình.',
    },
    {
      id: 3,
      title: 'Đoạn 3: Sáng kiến thông minh',
      question: 'Quạ đã nghĩ ra điều gì?',
      imageIcon: '🦅🪨💡',
      audioText: 'Quạ nhìn quanh thấy có rất nhiều viên sỏi nhỏ nằm rải rác trên mặt đất. Quạ bèn nảy ra một kế rất hay: dùng mỏ gắp từng viên sỏi nhỏ thả vào trong bình nước.',
      hint: 'Quạ nghĩ ra cách dùng mỏ gắp từng viên sỏi thả vào trong bình.',
    },
    {
      id: 4,
      title: 'Đoạn 4: Thỏa thích uống nước',
      question: 'Cuối cùng, quạ có uống được nước trong bình không? Vì sao?',
      imageIcon: '🦅💧✨',
      audioText: 'Cứ mỗi viên sỏi rơi xuống, mực nước trong bình lại từ từ dâng lên cao. Cuối cùng, nước dâng lên tận miệng bình, chú quạ thông minh đã thỏa thích uống những ngụm nước mát lành!',
      hint: 'Cuối cùng, quạ uống được nước vì sỏi làm nước dâng lên tận miệng bình.',
    },
  ];

  const playFullStory = () => {
    setIsPlayingFullStory(true);
    handleSpeak(
      'Câu chuyện Con quạ thông minh. Một hôm, quạ bay đi tìm nước uống vì rất khát. Đang bay mệt mỏi, quạ nhìn xuống một gốc cây to thì thấy một chiếc bình nước bằng thủy tinh có một ít nước ở đáy bình. Quạ liền sà xuống, thò mỏ vào bình để uống. Nhưng cổ bình cao và hẹp, nước ở tận đáy nên quạ không sao uống được. Quạ nhìn quanh thấy rất nhiều sỏi nhỏ, bèn dùng mỏ gắp từng viên sỏi thả vào trong bình. Cứ thế, mực nước từ từ dâng lên tận miệng bình. Cuối cùng, chú quạ thông minh đã thỏa thích uống được những ngụm nước mát lành!'
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Tabs Header: Trang 42 & Trang 43 */}
      <div className="bg-white rounded-3xl p-3 border-2 border-emerald-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('page42')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page42'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>📖 Trang 42: Bảng ghép âm & Đàn ong hũ mật</span>
          </button>
          <button
            onClick={() => setActiveTab('page43')}
            className={`px-4 py-2 rounded-2xl font-kid font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'page43'
                ? 'bg-emerald-600 text-white shadow-xs scale-102'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>🦅 Trang 43: Viết "cá kho khế" & Truyện "Con quạ thông minh"</span>
          </button>
        </div>

        <button
          onClick={() => {
            playSoundEffect.success();
            onEarnStar();
            handleSpeak('Hoan hô bé đã hoàn thành xuất sắc Bài 15 Ôn tập và kể chuyện! Bé nhận được 1 ngôi sao vàng!');
          }}
          className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-kid font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Award className="w-4 h-4" />
          <span>Thưởng 1 Sao 🌟</span>
        </button>
      </div>

      {activeTab === 'page42' ? (
        /* =========================================================================
           TRANG 42: MỤC 1 (ĐỌC - BẢNG GHÉP ÂM, 7 HŨ MẬT ONG VÀ 2 CÂU ỨNG DỤNG)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Green Banner with Title: Bài 15: ÔN TẬP VÀ KỂ CHUYỆN */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Bài</span>
                <span className="text-3xl font-black leading-none">15</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  Ôn tập tuần 3
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-kid drop-shadow-sm uppercase">
                  ÔN TẬP VÀ KỂ CHUYỆN
                </h1>
              </div>
            </div>

            <button
              onClick={() => handleSpeak('Bài mười lăm: Ôn tập và kể chuyện. Chúng mình cùng ôn lại các âm k, h, l, ch, kh ghép với các nguyên âm e, ê, i, u, ư nhé!')}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-kid font-bold text-xs flex items-center gap-2 border border-white/30 shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe cô giáo hướng dẫn ôn tập</span>
            </button>
          </div>

          {/* MỤC 1: ĐỌC (BẢNG GHÉP ÂM CHUẨN XÁC SGK TRANG 42) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-kid font-bold text-xl text-amber-950">Đọc</h3>
              </div>
              <button
                onClick={() => handleSpeak('Bảng ghép âm: ca - e - ke. ke. ca - ê - kê. kê. ca - i - ki. ki. hờ - e - he. he. hờ - ê - hê. hê. hờ - i - hi. hi. hờ - u - hu. hu. hờ - ư - hư. hư. lờ - e - le. le. lờ - ê - lê. lê. lờ - i - li. li. lờ - u - lu. lu. lờ - ư - lư. lư. chờ - e - che. che. chờ - ê - chê. chê. chờ - i - chi. chi. chờ - u - chu. chu. chờ - ư - chư. chư. khờ - e - khe. khe. khờ - ê - khê. khê. khờ - i - khi. khi. khờ - u - khu. khu. khờ - ư - khư. khư.')}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Nghe cô giáo đọc toàn bảng</span>
              </button>
            </div>

            {/* BẢNG GHÉP ÂM CHUẨN XÁC THEO ẢNH TRANG 42 */}
            <div className="overflow-x-auto">
              <table className="w-full max-w-2xl mx-auto border-collapse text-center">
                <thead>
                  <tr>
                    <th className="p-3 bg-amber-100/60 border border-amber-300 rounded-tl-2xl"></th>
                    {['e', 'ê', 'i', 'u', 'ư'].map((vowel) => (
                      <th
                        key={vowel}
                        onClick={() => handleSpeak(`nguyên âm ${vowel}`)}
                        className="p-3 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300 transition-colors"
                        title={`Bấm nghe âm ${vowel}`}
                      >
                        {vowel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* HÀNG 1: ÂM 'k' */}
                  <tr>
                    <td
                      onClick={() => handleSpeak('chữ ca')}
                      className="p-3 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300"
                    >
                      k
                    </td>
                    <td
                      onClick={() => handleSpeak('ca - e - ke. ke.')}
                      className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100"
                    >
                      ke
                    </td>
                    <td
                      onClick={() => handleSpeak('ca - ê - kê. kê.')}
                      className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100"
                    >
                      kê
                    </td>
                    <td
                      onClick={() => handleSpeak('ca - i - ki. ki.')}
                      className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100"
                    >
                      ki
                    </td>
                    {/* Hai ô k + u và k + ư có dấu gạch chéo trắng */}
                    <td
                      onClick={() => handleSpeak('Quy tắc chính tả: chữ ca không đi với nguyên âm u')}
                      className="p-3 bg-amber-200/70 border border-amber-300 font-sans font-black text-2xl text-white select-none cursor-pointer relative"
                      title="Quy tắc: k không đi với u"
                    >
                      ✕
                    </td>
                    <td
                      onClick={() => handleSpeak('Quy tắc chính tả: chữ ca không đi với nguyên âm ư')}
                      className="p-3 bg-amber-200/70 border border-amber-300 font-sans font-black text-2xl text-white select-none cursor-pointer relative"
                      title="Quy tắc: k không đi với ư"
                    >
                      ✕
                    </td>
                  </tr>

                  {/* HÀNG 2: ÂM 'h' */}
                  <tr>
                    <td
                      onClick={() => handleSpeak('âm hờ')}
                      className="p-3 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300"
                    >
                      h
                    </td>
                    <td onClick={() => handleSpeak('hờ - e - he. he.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">he</td>
                    <td onClick={() => handleSpeak('hờ - ê - hê. hê.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">hê</td>
                    <td onClick={() => handleSpeak('hờ - i - hi. hi.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">hi</td>
                    <td onClick={() => handleSpeak('hờ - u - hu. hu.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">hu</td>
                    <td onClick={() => handleSpeak('hờ - ư - hư. hư.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">hư</td>
                  </tr>

                  {/* HÀNG 3: ÂM 'l' */}
                  <tr>
                    <td
                      onClick={() => handleSpeak('âm lờ')}
                      className="p-3 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300"
                    >
                      l
                    </td>
                    <td onClick={() => handleSpeak('lờ - e - le. le.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">le</td>
                    <td onClick={() => handleSpeak('lờ - ê - lê. lê.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">lê</td>
                    <td onClick={() => handleSpeak('lờ - i - li. li.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">li</td>
                    <td onClick={() => handleSpeak('lờ - u - lu. lu.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">lu</td>
                    <td onClick={() => handleSpeak('lờ - ư - lư. lư.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">lư</td>
                  </tr>

                  {/* HÀNG 4: ÂM 'ch' */}
                  <tr>
                    <td
                      onClick={() => handleSpeak('âm chờ')}
                      className="p-3 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 cursor-pointer hover:bg-amber-300"
                    >
                      ch
                    </td>
                    <td onClick={() => handleSpeak('chờ - e - che. che.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">che</td>
                    <td onClick={() => handleSpeak('chờ - ê - chê. chê.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">chê</td>
                    <td onClick={() => handleSpeak('chờ - i - chi. chi.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">chi</td>
                    <td onClick={() => handleSpeak('chờ - u - chu. chu.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">chu</td>
                    <td onClick={() => handleSpeak('chờ - ư - chư. chư.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">chư</td>
                  </tr>

                  {/* HÀNG 5: ÂM 'kh' */}
                  <tr>
                    <td
                      onClick={() => handleSpeak('âm khờ')}
                      className="p-3 bg-amber-200 border border-amber-300 font-sans font-bold text-2xl text-amber-950 rounded-bl-2xl cursor-pointer hover:bg-amber-300"
                    >
                      kh
                    </td>
                    <td onClick={() => handleSpeak('khờ - e - khe. khe.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">khe</td>
                    <td onClick={() => handleSpeak('khờ - ê - khê. khê.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">khê</td>
                    <td onClick={() => handleSpeak('khờ - i - khi. khi.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">khi</td>
                    <td onClick={() => handleSpeak('khờ - u - khu. khu.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 cursor-pointer hover:bg-amber-100">khu</td>
                    <td onClick={() => handleSpeak('khờ - ư - khư. khư.')} className="p-3 bg-amber-50 border border-amber-300 font-sans font-bold text-2xl text-slate-900 rounded-br-2xl cursor-pointer hover:bg-amber-100">khư</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 7 CHÚ ONG CHĂM CHỈ MANG HŨ MẬT TỪ NGỮ THEO ẢNH TRANG 42 */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 p-6 border border-emerald-200 overflow-hidden shadow-inner text-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-emerald-800 font-bold bg-white/80 px-3 py-1 rounded-full shadow-2xs">
                  🐝 Đàn ong chăm chỉ mang 7 hũ mật ngọt ngào:
                </span>
                <span className="text-xs text-slate-500">
                  Chạm vào từng hũ mật để nghe đọc từ ngữ
                </span>
              </div>

              {/* 7 Bees with honey pots */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { word: 'chú hề', icon: '🤡', color: 'from-amber-200 to-amber-100' },
                  { word: 'lá khô', icon: '🍂', color: 'from-amber-200 to-amber-100' },
                  { word: 'bờ hồ', icon: '🏞️', color: 'from-amber-200 to-amber-100' },
                  { word: 'chợ cá', icon: '🐟', color: 'from-amber-200 to-amber-100' },
                  { word: 'che ô', icon: '☂️', color: 'from-amber-200 to-amber-100' },
                  { word: 'cá dữ', icon: '🦈', color: 'from-amber-200 to-amber-100' },
                  { word: 'lá hẹ', icon: '🌿', color: 'from-amber-200 to-amber-100' },
                ].map((item, idx) => (
                  <button
                    key={item.word}
                    onClick={() => handleSpeak(item.word)}
                    className="group p-3 rounded-2xl bg-white/90 hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500 shadow-2xs hover:shadow-xs transition-all flex flex-col items-center cursor-pointer animate-float"
                    style={{ animationDelay: `${idx * 0.18}s` }}
                  >
                    <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🐝</span>
                    {/* Honey pot shape */}
                    <div className="w-full py-2 px-1 rounded-xl bg-gradient-to-b from-amber-100 to-orange-100 border border-amber-400 text-center shadow-inner">
                      <span className="font-sans font-bold text-base text-emerald-700 block leading-tight">
                        {item.word}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2 CÂU ĐỌC ỨNG DỤNG SGK TRANG 42 (2 THẺ MÀU VÀNG CHÂN TRANG) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Thẻ câu 1: Chị cho bé cá cờ. */}
              <div className="p-4 rounded-2xl bg-amber-200/80 border-2 border-amber-300 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <button
                    onClick={() => handleSpeak('Chị cho bé cá cờ.')}
                    className="font-kid font-bold text-2xl text-slate-900 hover:text-emerald-800 transition-colors text-left cursor-pointer"
                  >
                    Chị cho bé cá cờ.
                  </button>
                </div>
                <button
                  onClick={() => handleSpeak('Chị cho bé cá cờ.')}
                  className="p-2 rounded-xl bg-white text-amber-700 hover:bg-amber-50 shadow-2xs cursor-pointer"
                  title="Nghe đọc câu"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Thẻ câu 2: Dì Kha cho Hà đi chợ. */}
              <div className="p-4 rounded-2xl bg-amber-200/80 border-2 border-amber-300 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <button
                    onClick={() => handleSpeak('Dì Kha cho Hà đi chợ.')}
                    className="font-kid font-bold text-2xl text-slate-900 hover:text-emerald-800 transition-colors text-left cursor-pointer"
                  >
                    Dì Kha cho Hà đi chợ.
                  </button>
                </div>
                <button
                  onClick={() => handleSpeak('Dì Kha cho Hà đi chợ.')}
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
           TRANG 43: MỤC 2 (VIẾT "cá kho khế") VÀ MỤC 3 (KỂ CHUYỆN "Con quạ thông minh")
           ========================================================================= */
        <div className="space-y-6">
          {/* MỤC 2: VIẾT (CHUẨN XÁC 100% THEO DẢI Ô LY SGK TRANG 43: cá kho khế) */}
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
                  cá kho khế
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak('Cách viết cụm từ cá kho khế: Tiếng cá: viết chữ c cao 2 ô ly nối sang a cao 2 ô ly, dấu sắc trên đầu a. Cách 1 ô ly viết tiếp tiếng kho: chữ ghép kh (k cao 5 ô ly nối h cao 5 ô ly) nối sang o. Cách 1 ô ly viết tiếp tiếng khế: chữ ghép kh nối sang ê, dấu mũ và dấu sắc trên đầu ê.')}
                  className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 text-xs font-bold hover:bg-sky-100 flex items-center gap-1 transition-all"
                  title="Nghe hướng dẫn viết cá kho khế"
                >
                  <Play className="w-3 h-3 fill-sky-600 text-sky-600" />
                  <span>Cách viết "cá kho khế"</span>
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
                <span>Quy trình viết chuẩn 5 ô ly cụm từ: "cá kho khế"</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Tiếng cá:</strong> Chữ c (cao 2 ô ly) nối sang a (cao 2 ô ly) + dấu sắc / trên đầu a.<br />
                <strong>Tiếng kho:</strong> Cách 1 ô ly, viết chữ ghép kh (chữ k cao 5 ô ly nối h cao 5 ô ly) nối liền sang chữ o (cao 2 ô ly).<br />
                <strong>Tiếng khế:</strong> Cách 1 ô ly, viết chữ ghép kh nối liền sang chữ ê (cao 2 ô ly) + dấu mũ ^ và dấu sắc / trên đầu ê.
              </p>
            </div>

            {/* THE EXACT 5-Ô-LY GRID STRIP AS ON PAGE 43 OF TEXTBOOK */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Dải ô ly chuẩn theo SGK Trang 43: 5 ô ly = 110px (mỗi ô ly = 22px) */}
              <div className="w-full h-[116px] relative bg-white overflow-hidden shadow-xs border border-sky-200">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" style={{ width: '100%', height: '116px' }}>
                  <defs>
                    <pattern id="oli-grid-page43" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#7dd3fc" strokeWidth="0.7" strokeDasharray="1.5 2" />
                    </pattern>
                  </defs>

                  {/* Fill background with 22px dotted grid */}
                  <rect x="0" y="0" width="100%" height="116" fill="url(#oli-grid-page43)" />

                  {/* CÁC ĐƯỜNG KẺ CHÍNH */}
                  {/* Đường kẻ 6 (đỉnh chữ k, h cao 5 ô ly): y = 2 */}
                  <line x1="0" y1="2" x2="100%" y2="2" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 3 (đỉnh chữ c, a, o, ê và nét móc chữ h - cao 2 ô ly): y = 68 */}
                  <line x1="0" y1="68" x2="100%" y2="68" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Đường kẻ 2 (độ cao 1 ô ly - điểm bắt đầu nét hất và điểm dừng bút): y = 90 */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#7dd3fc" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* Đường kẻ 1 (Baseline ở đáy): y = 112 */}
                  <line x1="0" y1="111.25" x2="100%" y2="111.25" stroke="#0284c7" strokeWidth="2.2" />

                  {/* Viền trái phải */}
                  <line x1="0.75" y1="0" x2="0.75" y2="116" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="calc(100% - 0.75px)" y1="0" x2="calc(100% - 0.75px)" y2="116" stroke="#0284c7" strokeWidth="1.5" />

                  {/* ==============================================================
                      MẪU 1: CỤM TỪ 'cá kho khế' NÉT MỰC ĐEN LIỀN (SOLID)
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG CÁ: Chữ c nối a + dấu sắc */}
                    <path
                      d="M 32 76 C 28 70, 19 70, 14 77 C 9 84, 9 96, 14 103 C 19 110, 28 110, 33 104 C 35 101, 37 96, 37 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 58 74 C 52 68, 42 68, 36 76 C 30 84, 30 96, 36 104 C 42 112, 52 112, 58 104 C 62 96, 62 82, 58 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 58 68 L 58 104 C 58 112, 62 112, 69 112 C 74 112, 78 104, 80 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc trên chữ a */}
                    <path
                      d="M 52 54 L 46 60"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG KHO: chữ ghép kh nối o */}
                    {/* Chữ k cao 5 ô ly */}
                    <path
                      d="M 96 90 L 107 68 C 113 54, 122 32, 122 18 C 122 7, 118 3, 113 3 C 109 3, 107 6, 107 12 L 107 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 107 96 C 111 78, 117 68, 124 68 C 130 68, 130 77, 124 82 C 120 85, 117 88, 121 92 L 130 112 C 132 112, 134 104, 135 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ h cao 5 ô ly */}
                    <path
                      d="M 135 90 L 146 68 C 152 54, 161 32, 161 18 C 161 7, 157 3, 152 3 C 148 3, 146 6, 146 12 L 146 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 146 92 C 150 76, 156 68, 163 68 C 169 68, 171 76, 171 88 L 171 104 C 171 112, 175 112, 179 112 C 182 112, 184 104, 185 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ o nối từ h */}
                    <path
                      d="M 206 74 C 200 68, 190 68, 184 76 C 178 84, 178 96, 184 104 C 190 112, 200 112, 206 104 C 210 96, 210 82, 206 74 Z"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* KHOẢNG CÁCH 1 Ô LY */}

                    {/* TIẾNG KHẾ: chữ ghép kh nối ê + dấu mũ + dấu sắc */}
                    {/* Chữ k cao 5 ô ly */}
                    <path
                      d="M 226 90 L 237 68 C 243 54, 252 32, 252 18 C 252 7, 248 3, 243 3 C 239 3, 237 6, 237 12 L 237 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 237 96 C 241 78, 247 68, 254 68 C 260 68, 260 77, 254 82 C 250 85, 247 88, 251 92 L 260 112 C 262 112, 264 104, 265 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ h cao 5 ô ly */}
                    <path
                      d="M 265 90 L 276 68 C 282 54, 291 32, 291 18 C 291 7, 287 3, 282 3 C 278 3, 276 6, 276 12 L 276 112"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 276 92 C 280 76, 286 68, 293 68 C 299 68, 301 76, 301 88 L 301 104 C 301 112, 305 112, 309 112 C 312 112, 314 104, 315 90"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chữ ê nối từ h */}
                    <path
                      d="M 315 90 C 320 82, 327 78, 332 79 C 338 80, 337 92, 328 102 C 319 112, 321 122, 331 122 C 337 122, 342 116, 345 108"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu mũ ^ */}
                    <path
                      d="M 324 64 L 329 56 L 334 64"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dấu sắc / */}
                    <path
                      d="M 334 50 L 328 56"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* ==============================================================
                      MẪU 2: CỤM TỪ 'cá kho khế' NÉT CHẤM MỜ (DOTTED) TIẾP THEO
                      ============================================================== */}
                  <g fill="none">
                    {/* TIẾNG CÁ (chấm mờ) */}
                    <path
                      d="M 388 76 C 384 70, 375 70, 370 77 C 365 84, 365 96, 370 103 C 375 110, 384 110, 389 104 C 391 101, 393 96, 393 90"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 414 74 C 408 68, 398 68, 392 76 C 386 84, 386 96, 392 104 C 398 112, 408 112, 414 104 C 418 96, 418 82, 414 74 Z"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 414 68 L 414 104 C 414 112, 418 112, 425 112 C 430 112, 434 104, 436 90"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 408 54 L 402 60"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* TIẾNG KHO (chấm mờ) */}
                    <path
                      d="M 452 90 L 463 68 C 469 54, 478 32, 478 18 C 478 7, 474 3, 469 3 C 465 3, 463 6, 463 12 L 463 112"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 463 96 C 467 78, 473 68, 480 68 C 486 68, 486 77, 480 82 C 476 85, 473 88, 477 92 L 486 112 C 488 112, 490 104, 491 90"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 491 90 L 502 68 C 508 54, 517 32, 517 18 C 517 7, 513 3, 508 3 C 504 3, 502 6, 502 12 L 502 112"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 502 92 C 506 76, 512 68, 519 68 C 525 68, 527 76, 527 88 L 527 104 C 527 112, 531 112, 535 112 C 538 112, 540 104, 541 90"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 562 74 C 556 68, 546 68, 540 76 C 534 84, 534 96, 540 104 C 546 112, 556 112, 562 104 C 566 96, 566 82, 562 74 Z"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* TIẾNG KHẾ (chấm mờ) */}
                    <path
                      d="M 582 90 L 593 68 C 599 54, 608 32, 608 18 C 608 7, 604 3, 599 3 C 595 3, 593 6, 593 12 L 593 112"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 593 96 C 597 78, 603 68, 610 68 C 616 68, 616 77, 610 82 C 606 85, 603 88, 607 92 L 616 112 C 618 112, 620 104, 621 90"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 621 90 L 632 68 C 638 54, 647 32, 647 18 C 647 7, 643 3, 638 3 C 634 3, 632 6, 632 12 L 632 112"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 632 92 C 636 76, 642 68, 649 68 C 655 68, 657 76, 657 88 L 657 104 C 657 112, 661 112, 665 112 C 668 112, 670 104, 671 90"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 671 90 C 676 82, 683 78, 688 79 C 694 80, 693 92, 684 102 C 675 112, 677 122, 687 122 C 693 122, 698 116, 701 108"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 680 64 L 685 56 L 690 64"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 690 50 L 684 56"
                      fill="none"
                      stroke="#475569"
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

          {/* MỤC 3: KỂ CHUYỆN (CÂU CHUYỆN: "CON QUẠ THÔNG MINH") */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-kid font-black text-base flex items-center justify-center shadow-xs">
                  3
                </span>
                <div>
                  <h3 className="font-kid font-bold text-xl text-emerald-950">Kể chuyện</h3>
                  <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                    Truyện: Con quạ thông minh
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

            {/* 4 Story Comic Panels matching Textbook Page 43 */}
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
                    <div className="h-44 rounded-2xl bg-gradient-to-b from-sky-100 via-emerald-50 to-stone-100 flex flex-col items-center justify-center p-3 text-center border border-sky-200/60 shadow-inner">
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
                    Bài học từ chú quạ thông minh:
                  </h5>
                  <p className="text-emerald-800">
                    Khi gặp khó khăn trong cuộc sống và học tập, chúng mình hãy bình tĩnh suy nghĩ và tìm cách giải quyết thông minh như chú quạ nhé!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  handleSpeak('Chúc mừng bé đã ghi nhớ và kể lại câu chuyện Con quạ thông minh rất xuất sắc!');
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

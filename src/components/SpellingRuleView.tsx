import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, Check, X, Award, RotateCcw } from 'lucide-react';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface SpellingRuleViewProps {
  onEarnStar: () => void;
  soundEnabled: boolean;
}

interface PracticeItem {
  id: string;
  prefix: string; // e.g. "..."
  suffix: string; // e.g. "ẻ ô"
  correct: string; // e.g. "k"
  options: string[]; // ["c", "k"]
  fullWord: string; // "kẻ ô"
  meaning: string;
}

export const SpellingRuleView: React.FC<SpellingRuleViewProps> = ({ onEarnStar, soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<'ck' | 'ggh' | 'ngngh'>('ck');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  const practiceData: Record<'ck' | 'ggh' | 'ngngh', PracticeItem[]> = {
    ck: [
      { id: 'ck1', prefix: '', suffix: 'ẻ ô', correct: 'k', options: ['c', 'k'], fullWord: 'kẻ ô', meaning: 'Dùng thước kẻ từng đường ngay ngắn' },
      { id: 'ck2', prefix: '', suffix: 'on cá', correct: 'c', options: ['c', 'k'], fullWord: 'con cá', meaning: 'Chú cá bơi lội dưới nước' },
      { id: 'ck3', prefix: '', suffix: 'ì đà', correct: 'k', options: ['c', 'k'], fullWord: 'kì đà', meaning: 'Chú kì đà bò trên mỏm đá' },
      { id: 'ck4', prefix: '', suffix: 'ờ đỏ', correct: 'c', options: ['c', 'k'], fullWord: 'cờ đỏ', meaning: 'Lá cờ đỏ sao vàng' },
      { id: 'ck5', prefix: '', suffix: 'ể chuyện', correct: 'k', options: ['c', 'k'], fullWord: 'kể chuyện', meaning: 'Bà kể chuyện cổ tích cho bé nghe' },
    ],
    ggh: [
      { id: 'ggh1', prefix: '', suffix: 'ế gỗ', correct: 'gh', options: ['g', 'gh'], fullWord: 'ghế gỗ', meaning: 'Chiếc ghế ngồi làm bằng gỗ' },
      { id: 'ggh2', prefix: '', suffix: 'à gô', correct: 'g', options: ['g', 'gh'], fullWord: 'gà gô', meaning: 'Chú gà gô trên nương rẫy' },
      { id: 'ggh3', prefix: '', suffix: 'é thăm', correct: 'gh', options: ['g', 'gh'], fullWord: 'ghé thăm', meaning: 'Hà ghé nhà bà chơi ngày nghỉ' },
      { id: 'ggh4', prefix: '', suffix: 'i nhớ', correct: 'gh', options: ['g', 'gh'], fullWord: 'ghi nhớ', meaning: 'Bé ghi nhớ lời dạy của cô' },
      { id: 'ggh5', prefix: '', suffix: 'iá đỗ', correct: 'g', options: ['g', 'gh'], fullWord: 'giá đỗ', meaning: 'Món rau giá tươi ngon' },
    ],
    ngngh: [
      { id: 'ng1', prefix: '', suffix: 'é con', correct: 'ngh', options: ['ng', 'ngh'], fullWord: 'nghé con', meaning: 'Chú trâu non dễ thương' },
      { id: 'ng2', prefix: '', suffix: 'õ nhỏ', correct: 'ng', options: ['ng', 'ngh'], fullWord: 'ngõ nhỏ', meaning: 'Con ngõ dẫn vào nhà bà' },
      { id: 'ng3', prefix: '', suffix: 'ỉ hè', correct: 'ngh', options: ['ng', 'ngh'], fullWord: 'nghỉ hè', meaning: 'Mùa hè được đi bơi thỏa thích' },
      { id: 'ng4', prefix: '', suffix: 'ã ba', correct: 'ng', options: ['ng', 'ngh'], fullWord: 'ngã ba', meaning: 'Nơi giao nhau ba con đường' },
      { id: 'ng5', prefix: '', suffix: 'e nhạc', correct: 'ngh', options: ['ng', 'ngh'], fullWord: 'nghe nhạc', meaning: 'Lắng nghe giai điệu vui tươi' },
    ],
  };

  const handleSelectOption = (item: PracticeItem, selected: string) => {
    playSoundEffect.click();
    const isCorrect = selected === item.correct;
    setAnswers(prev => ({ ...prev, [item.id]: selected }));
    setFeedback(prev => ({ ...prev, [item.id]: isCorrect }));

    if (isCorrect) {
      playSoundEffect.success();
      if (soundEnabled) {
        speakVietnamese(`Đúng rồi! ${item.fullWord}!`);
      }
    } else {
      playSoundEffect.wrong();
      if (soundEnabled) {
        speakVietnamese(`Chưa đúng rồi bé ơi! Hãy xem lại quy tắc nhé!`);
      }
    }
  };

  const handleReadChant = () => {
    if (soundEnabled) {
      playSoundEffect.click();
      speakVietnamese(
        'Câu thần chú chính tả vàng: Chữ k, gh, và ngh luôn luôn đứng trước ba nguyên âm: i, e, và ê. Các nguyên âm còn lại như a, o, ô, ơ, u, ư thì viết với c, g, ng!',
        { rate: 0.8 }
      );
    }
  };

  const checkAllPassed = () => {
    const currentItems = practiceData[activeTab];
    const total = currentItems.length;
    const correctCount = currentItems.filter(item => feedback[item.id] === true).length;
    return correctCount === total;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-kid font-bold text-xl shadow-xs">
            ⭐
          </div>
          <div>
            <h1 className="text-xl font-bold font-kid text-slate-900 leading-tight">
              Bí Kíp Chính Tả Vàng (Bài 29 SGK Kết Nối Tri Thức)
            </h1>
            <p className="text-xs text-slate-500">
              Quy tắc vàng phân biệt c/k, g/gh, ng/ngh - Bí quyết không bao giờ viết sai!
            </p>
          </div>
        </div>

        <button
          onClick={handleReadChant}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-kid font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          <span>Nghe Câu Thần Chú</span>
        </button>
      </div>

      {/* Golden Rule Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
              Ghi nhớ bất biến
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-kid leading-snug drop-shadow-sm">
            k, gh, ngh — CHỈ ĐI VỚI: i, e, ê!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
              <span className="font-kid font-bold text-lg text-amber-200 block">1. Chữ K</span>
              <p className="text-xs text-white/90">
                k + i, e, ê ➔ <span className="font-bold underline">ki, ke, kê</span>
              </p>
              <p className="text-[11px] text-white/70 mt-1">Còn lại đi với c: ca, co, cô, cu...</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
              <span className="font-kid font-bold text-lg text-amber-200 block">2. Chữ GH</span>
              <p className="text-xs text-white/90">
                gh + i, e, ê ➔ <span className="font-bold underline">ghi, ghe, ghê</span>
              </p>
              <p className="text-[11px] text-white/70 mt-1">Còn lại đi với g: ga, go, gô, gu...</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
              <span className="font-kid font-bold text-lg text-amber-200 block">3. Chữ NGH</span>
              <p className="text-xs text-white/90">
                ngh + i, e, ê ➔ <span className="font-bold underline">nghi, nghe, nghê</span>
              </p>
              <p className="text-[11px] text-white/70 mt-1">Còn lại đi với ng: nga, ngo, ngô, ngu...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Laboratory Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-kid font-bold text-lg text-slate-900">
              Thực hành bài tập trắc nghiệm:
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-xl border border-amber-200">
            <button
              onClick={() => setActiveTab('ck')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'ck' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
              }`}
            >
              Phân biệt c / k
            </button>
            <button
              onClick={() => setActiveTab('ggh')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'ggh' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
              }`}
            >
              Phân biệt g / gh
            </button>
            <button
              onClick={() => setActiveTab('ngngh')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'ngngh' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
              }`}
            >
              Phân biệt ng / ngh
            </button>
          </div>
        </div>

        {/* Practice Exercises List */}
        <div className="space-y-3">
          {practiceData[activeTab].map((item, idx) => {
            const currentAnswer = answers[item.id];
            const isCorrect = feedback[item.id];

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border-2 flex flex-wrap items-center justify-between gap-4 transition-all ${
                  isCorrect === true
                    ? 'border-emerald-300 bg-emerald-50/60'
                    : isCorrect === false
                    ? 'border-rose-300 bg-rose-50/60'
                    : 'border-slate-200 bg-slate-50/50 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 text-xl font-bold font-kid text-slate-900">
                      <span className="px-3 py-1 rounded-xl bg-white border border-slate-300 font-mono text-amber-800">
                        {currentAnswer ? currentAnswer : '...'}
                      </span>
                      <span>{item.suffix}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.meaning}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(item, opt)}
                      className={`w-12 h-10 rounded-xl font-kid font-bold text-lg flex items-center justify-center border transition-all active:scale-95 ${
                        currentAnswer === opt
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-amber-400 hover:bg-amber-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}

                  {/* Audio pronounce result */}
                  {currentAnswer && (
                    <button
                      onClick={() => speakVietnamese(item.fullWord)}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 ml-1"
                      title="Nghe phát âm từ này"
                    >
                      <Volume2 className="w-4 h-4 text-amber-600" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Victory Notification when all passed */}
        {checkAllPassed() && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between animate-fade-in shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className="font-kid font-bold text-lg">Bé Thật Tuyệt Vời!</h4>
                <p className="text-xs text-emerald-100">
                  Bé đã xuất sắc hoàn thành tất cả các câu hỏi chính tả phần này!
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onEarnStar();
                try { confetti({ particleCount: 40 }); } catch {}
              }}
              className="px-4 py-2 rounded-xl bg-white text-emerald-800 font-kid font-bold text-xs shadow-xs hover:bg-emerald-50"
            >
              Nhận Thưởng ⭐
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

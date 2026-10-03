import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  HelpCircle,
  Trophy,
  Star
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/textbookData';
import { speakVietnamese, playSoundEffect } from '../utils/soundEffects';

interface QuizAssessmentProps {
  onEarnStar: () => void;
  avatar: 'nam' | 'ha';
  soundEnabled: boolean;
}

export const QuizAssessment: React.FC<QuizAssessmentProps> = ({
  onEarnStar,
  avatar,
  soundEnabled,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    if (isCorrect) {
      playSoundEffect.success();
      setScore((s) => s + 1);
      setUserAnswers((prev) => ({ ...prev, [currentIdx]: true }));

      if (soundEnabled) {
        speakVietnamese('Chính xác! Bé giỏi quá!');
      }
    } else {
      playSoundEffect.wrong();
      setUserAnswers((prev) => ({ ...prev, [currentIdx]: false }));

      if (soundEnabled) {
        speakVietnamese('Chưa đúng rồi bé ơi! Hãy xem giải thích nhé!');
      }
    }
  };

  const handleNext = () => {
    playSoundEffect.click();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      playSoundEffect.star();
      onEarnStar();
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      } catch {}

      if (soundEnabled) {
        speakVietnamese(
          `Chúc mừng bé ${avatar === 'nam' ? 'Nam' : 'Hà'} đã hoàn thành bài trắc nghiệm với điểm số ${score} trên ${QUIZ_QUESTIONS.length}!`
        );
      }
    }
  };

  const handleRestart = () => {
    playSoundEffect.click();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers({});
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center font-kid font-bold text-xl shadow-xs">
            📝
          </div>
          <div>
            <h1 className="text-xl font-bold font-kid text-slate-900 leading-tight">
              Bài Tập Trắc Nghiệm Đánh Giá Năng Lực Lớp 1
            </h1>
            <p className="text-xs text-slate-500">
              Kiểm tra nhận diện âm chữ cái, dấu thanh, chính tả và ghép từ
            </p>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-amber-100 flex items-center gap-1.5 text-xs font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại từ đầu</span>
        </button>
      </div>

      {!isCompleted ? (
        /* Quiz Active State */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-6">
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Câu hỏi {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
              <span className="font-kid font-bold text-amber-700">
                Đã đạt: {score} câu đúng
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-kid font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                  {currentIdx + 1}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-kid text-slate-900 leading-snug">
                    {question.questionText}
                  </h3>
                  {question.hint && (
                    <p className="text-xs text-amber-800/80 mt-1 italic">
                      💡 Gợi ý: {question.hint}
                    </p>
                  )}
                </div>
              </div>

              {/* Audio Prompt Button */}
              {question.audioPrompt && (
                <button
                  onClick={() => speakVietnamese(question.audioPrompt || question.questionText)}
                  className="p-2.5 rounded-xl bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 shadow-2xs shrink-0 transition-transform active:scale-95"
                  title="Nghe câu hỏi"
                >
                  <Volume2 className="w-5 h-5 text-amber-600" />
                </button>
              )}
            </div>

            {/* Optional Large Image or Icon Display */}
            {question.imageIcon && (
              <div className="flex justify-center py-2">
                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center text-5xl shadow-xs animate-bounce-slow">
                  {question.imageIcon}
                </div>
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.options.map((opt) => {
              const isChosen = selectedOption === opt.id;
              let btnStyle = 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400';
                } else if (isChosen && !opt.isCorrect) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  btnStyle = 'opacity-40 border-slate-200 bg-slate-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id, opt.isCorrect)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 text-left font-kid font-bold text-lg transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{opt.text}</span>
                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isChosen && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fade-in">
              <div className="text-xs text-slate-700 leading-relaxed">
                {question.options.find((o) => o.id === selectedOption)?.explanation ||
                  'Hoan hô bé đã có câu trả lời!'}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-kid font-bold text-sm shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả & Giấy Khen'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Certificate & Evaluation Summary */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-xl space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 mx-auto flex items-center justify-center text-4xl shadow-md">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-amber-700 tracking-widest">
              Bộ Giáo dục & Đào tạo · Tiếng Việt 1
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-kid text-slate-900">
              GIẤY KHEN HỌC SINH CHĂM NGOAN
            </h2>
            <p className="text-xs text-slate-500">
              Công nhận thành tích luyện đọc và viết chữ cái Tiếng Việt
            </p>
          </div>

          {/* Certificate Content Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">{avatar === 'nam' ? '👦' : '👧'}</span>
              <div className="text-left">
                <span className="text-xs text-slate-500 block">Khen tặng bé:</span>
                <span className="font-kid font-black text-xl text-amber-950">
                  Bé {avatar === 'nam' ? 'Nam' : 'Hà'}
                </span>
              </div>
            </div>

            <div className="py-2 border-y border-amber-200 flex items-center justify-around">
              <div>
                <span className="text-[11px] text-slate-500 uppercase">Điểm số</span>
                <p className="font-kid font-black text-2xl text-emerald-700">
                  {score} / {QUIZ_QUESTIONS.length}
                </p>
              </div>
              <div className="w-px h-8 bg-amber-200" />
              <div>
                <span className="text-[11px] text-slate-500 uppercase">Xếp loại</span>
                <p className="font-kid font-black text-2xl text-amber-600">
                  {score >= 6 ? 'Xuất Sắc' : 'Chăm Chỉ'}
                </p>
              </div>
              <div className="w-px h-8 bg-amber-200" />
              <div>
                <span className="text-[11px] text-slate-500 uppercase">Sao thưởng</span>
                <p className="font-kid font-black text-2xl text-rose-600 flex items-center gap-1">
                  +1 <Star className="w-4 h-4 fill-amber-400 text-amber-500 inline" />
                </p>
              </div>
            </div>

            <p className="text-xs text-amber-900 font-medium italic">
              "Bé đã nắm vững các chữ cái và quy tắc ghép vần trong Sách Giáo Khoa Tiếng Việt 1. Bố mẹ và thầy cô rất tự hào về con!"
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-kid font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Luyện Tập Lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { X, Heart, BookOpen, CheckCircle, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { StudentProgress } from '../types';
import { TEXTBOOK_LESSONS } from '../data/textbookData';
import { playSoundEffect } from '../utils/soundEffects';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: StudentProgress;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
              👨‍👩‍👧‍👦
            </div>
            <div>
              <h2 className="font-kid font-bold text-lg text-slate-900 leading-tight">
                Góc Phụ Huynh & Thầy Cô Đồng Hành
              </h2>
              <p className="text-[11px] text-slate-500">
                Phương pháp dạy tiếng Việt lớp 1 chuẩn GDPT 2018 bộ Kết Nối Tri Thức
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSoundEffect.click();
              onClose();
            }}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-slate-700 text-xs sm:text-sm">
          {/* Progress summary for parent */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-amber-800">
                Nhật ký học tập của bé {progress.avatar === 'nam' ? 'Nam' : 'Hà'}:
              </span>
              <div className="flex items-center gap-4 text-xs text-amber-950 font-medium">
                <span>⭐ Sao thưởng: <b>{progress.stars}</b></span>
                <span>📚 Đã học: <b>{progress.completedLessons.length} / {TEXTBOOK_LESSONS.length} bài</b></span>
              </div>
            </div>
            <span className="text-3xl">🌱</span>
          </div>

          {/* Section 1: Phương pháp đánh vần mới */}
          <div className="space-y-2">
            <h3 className="font-kid font-bold text-base text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>1. Phương pháp đánh vần chuẩn GDPT 2018</span>
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs leading-relaxed text-slate-600">
              <p>
                <b>Phân biệt Tên chữ cái và Âm:</b> Khi đọc chữ cái đơn lẻ, đọc tên chữ (a, bê, xê, đê...). Khi đánh vần ghép tiếng, đọc theo <b>âm</b> (bờ, cờ, dờ, đờ...).
              </p>
              <p>
                <b>Quy trình đánh vần xuôi:</b> Đọc âm đầu ghép với âm chính, sau đó thêm dấu thanh:
                <br />
                • Ví dụ chữ <i>bà</i>: <b>bờ - a - ba - huyền - bà</b>.
                <br />
                • Ví dụ chữ <i>cá</i>: <b>cờ - a - ca - sắc - cá</b>.
              </p>
              <p>
                <b>Mẹo cho bố mẹ:</b> Đừng bắt bé đọc vẹt; hãy cho bé bấm vào từng nút mô hình âm thanh trong ứng dụng để tai nghe và mắt nhìn đồng thời.
              </p>
            </div>
          </div>

          {/* Section 2: Tư thế ngồi & Cầm bút chuẩn */}
          <div className="space-y-2">
            <h3 className="font-kid font-bold text-base text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Tư thế ngồi viết và cách cầm bút 3 ngón tay</span>
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs leading-relaxed text-slate-600">
              <ul className="list-disc list-inside space-y-1">
                <li><b>Cầm bút bằng 3 ngón:</b> Ngón cái và ngón trỏ giữ hai bên thân bút, ngón giữa đỡ phía dưới. Đầu ngón tay cách ngòi bút 2,5 cm.</li>
                <li><b>Tư thế ngồi:</b> Lưng thẳng, hai vai ngang bằng, ngực không tì vào mép bàn. Khoảng cách từ mắt đến trang vở từ <b>25 đến 30 cm</b>.</li>
                <li><b>Tay trái:</b> Đặt nhẹ nhàng lên mép vở để giữ vở không bị xê dịch.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Bí kíp chính tả dễ nhớ */}
          <div className="space-y-2">
            <h3 className="font-kid font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>3. Câu thần chú quy tắc chính tả vàng</span>
            </h3>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5 leading-relaxed">
              <p className="font-bold">« k, gh, ngh chỉ đi với i, e, ê »</p>
              <p>Bố mẹ hãy cùng bé đọc nhịp nhàng câu thần chú này trước khi làm bài tập chính tả. Bé sẽ nhớ ngay và không bao giờ viết nhầm "cẻ ô" hay "gế gỗ" nữa!</p>
            </div>
          </div>

          {/* Section 4: Lời khuyên tâm lý học đường */}
          <div className="space-y-2">
            <h3 className="font-kid font-bold text-base text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>4. Đồng hành cùng con nhẹ nhàng, hiệu quả</span>
            </h3>
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs text-rose-950 space-y-1 leading-relaxed">
              <p>• Mỗi buổi học cùng con chỉ nên kéo dài từ <b>15 - 20 phút</b> để giữ trọn sự hào hứng của trẻ lớp 1.</p>
              <p>• Luôn khen ngợi nỗ lực của con (ví dụ: "Hôm nay con viết nét cong kín tròn hơn hôm qua rồi đấy!").</p>
              <p>• Tận dụng các trò chơi bắn bóng, câu cá trong app để biến giờ học thành giờ vui chơi lý thú.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              playSoundEffect.click();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-kid font-bold text-xs shadow-xs"
          >
            Đã Hiểu & Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};

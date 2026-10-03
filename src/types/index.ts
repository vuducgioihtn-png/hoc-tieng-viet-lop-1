export type LearningMode = 
  | 'overview'       // Mục lục & Chào em vào lớp 1
  | 'reading'        // Bài học đọc & nhận biết chữ cái / âm / vần
  | 'writing'        // Luyện viết & tô chữ trên vở 4 ô ly
  | 'games'          // Trò chơi tương tác chữ cái
  | 'spelling-rule'  // Quy tắc chính tả vàng (c/k, g/gh, ng/ngh)
  | 'quiz'           // Bài tập trắc nghiệm đánh giá
  | 'parent-guide';  // Góc phụ huynh & thầy cô

export interface WordItem {
  id: string;
  word: string;
  highlightPart?: string;
  meaning?: string;
  icon?: string;
  imageAlt?: string;
  spellingGuide?: string; // e.g. "bờ - a - ba"
}

export interface PhonicsModel {
  initial: string;       // Âm đầu (e.g., 'b', 'c', 'd')
  rhyme: string;         // Âm đệm / chính / vần (e.g., 'a', 'e', 'ê', 'o', 'an')
  tone?: string;         // Dấu thanh (e.g., 'huyền', 'sắc', 'hỏi', 'ngã', 'nặng', 'không dấu')
  result: string;        // Tiếng ghép được (e.g., 'ba', 'bà', 'cá')
  spellingStep: string;  // "bờ - a - ba - huyền - bà"
}

export interface Lesson {
  id: number;
  title: string;
  letters: string[];
  subTitle?: string;
  pageNumber: number;
  theme: string;
  // Phần 1: Nhận biết
  recognition: {
    sentence: string;
    targetWords: string[];
    description: string;
    characterScene: string;
  };
  // Phần 2: Đọc & mô hình ghép vần
  phonics: PhonicsModel[];
  sampleWords: WordItem[];
  // Phần 4: Đoạn văn đọc
  readingPassage: {
    title?: string;
    sentences: string[];
  };
  // Phần 5: Nói & giao tiếp
  speakingTopic?: {
    topic: string;
    prompt: string;
  };
  // Phần viết mẫu
  writingTargets: string[];
}

export interface BasicStroke {
  id: string;
  name: string;
  symbol: string;
  description: string;
  instruction: string;
  svgPath: string; // Preview path
}

export interface ToneMark {
  id: string;
  name: string;
  symbol: string;
  sample: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  lessonId?: number;
  type: 'listen-letter' | 'picture-word' | 'fill-blank' | 'spelling-rule' | 'sentence-order';
  questionText: string;
  audioPrompt?: string;
  imageIcon?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  hint?: string;
}

export interface StudentProgress {
  stars: number;
  completedLessons: number[];
  completedQuizzes: number;
  lettersPracticed: string[];
  avatar: 'nam' | 'ha';
  soundEnabled: boolean;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/OverviewView';
import { ReadingLessonView } from './components/ReadingLessonView';
import { WritingCanvas } from './components/WritingCanvas';
import { GamesHub } from './components/GamesHub';
import { SpellingRuleView } from './components/SpellingRuleView';
import { QuizAssessment } from './components/QuizAssessment';
import { ParentGuideModal } from './components/ParentGuideModal';
import { LearningMode, StudentProgress } from './types';
import { playSoundEffect, registerSpeakingListener } from './utils/soundEffects';

export default function App() {
  const [currentMode, setCurrentMode] = useState<LearningMode>('overview');
  const [currentLessonId, setCurrentLessonId] = useState<number>(1);
  const [targetWritingChar, setTargetWritingChar] = useState<string>('a');
  const [isParentModalOpen, setIsParentModalOpen] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');

  useEffect(() => {
    registerSpeakingListener((isSpeaking, text) => {
      setSpeakingText(isSpeaking ? text : '');
    });
  }, []);

  // Student progress state
  const [progress, setProgress] = useState<StudentProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tv1_progress');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {
      stars: 5,
      completedLessons: [1],
      completedQuizzes: 0,
      lettersPracticed: ['a'],
      avatar: 'nam',
      soundEnabled: true,
    };
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tv1_progress', JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const handleEarnStar = () => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + 1,
      completedLessons: prev.completedLessons.includes(currentLessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, currentLessonId],
    }));
  };

  const handleToggleSound = () => {
    setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleSwitchAvatar = () => {
    setProgress((prev) => ({
      ...prev,
      avatar: prev.avatar === 'nam' ? 'ha' : 'nam',
    }));
  };

  const handleGoToLesson = (id: number) => {
    setCurrentLessonId(id);
    setCurrentMode('reading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToWriting = (target: string) => {
    setTargetWritingChar(target);
    setCurrentMode('writing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 selection:bg-amber-200">
      {/* Top Bar Navigation */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          setCurrentMode(mode);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
        onToggleSound={handleToggleSound}
        onSwitchAvatar={handleSwitchAvatar}
        onOpenParentGuide={() => setIsParentModalOpen(true)}
      />

      {/* Floating Teacher Speaking Toast */}
      {speakingText && (
        <div className="fixed top-16 right-4 z-50 animate-bounce-slow">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-pink-600 text-white rounded-2xl shadow-xl border border-pink-400/80 text-xs font-semibold backdrop-blur-md">
            <span className="text-lg">👩‍🏫</span>
            <div className="flex items-center gap-1.5">
              <span>Cô giáo đang đọc:</span>
              <span className="font-kid font-bold text-amber-200 text-sm max-w-[200px] truncate">
                « {speakingText} »
              </span>
            </div>
            <div className="flex gap-0.5 items-center ml-1">
              <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-white rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150" />
            </div>
          </div>
        </div>
      )}

      {/* Main Learning Canvas */}
      <main className="flex-1 py-4">
        {currentMode === 'overview' && (
          <OverviewView
            onSelectLesson={handleGoToLesson}
            onGoToWriting={handleGoToWriting}
            completedLessons={progress.completedLessons}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentMode === 'reading' && (
          <ReadingLessonView
            currentLessonId={currentLessonId}
            onSelectLesson={setCurrentLessonId}
            onGoToWriting={handleGoToWriting}
            onEarnStar={handleEarnStar}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentMode === 'writing' && (
          <WritingCanvas
            initialLetter={targetWritingChar}
            onEarnStar={handleEarnStar}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentMode === 'games' && (
          <GamesHub
            onEarnStar={handleEarnStar}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentMode === 'spelling-rule' && (
          <SpellingRuleView
            onEarnStar={handleEarnStar}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {currentMode === 'quiz' && (
          <QuizAssessment
            onEarnStar={handleEarnStar}
            avatar={progress.avatar}
            soundEnabled={progress.soundEnabled}
          />
        )}
      </main>

      {/* Parent & Teacher Guide Modal */}
      <ParentGuideModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        progress={progress}
      />

      {/* Quiet, clean educational footer */}
      <footer className="border-t border-amber-200/70 bg-white py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-kid font-bold text-amber-900 text-sm">Tiếng Việt 1</span>
            <span>·</span>
            <span>Bộ sách Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam)</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Đồng hành cùng bé Nam & bé Hà</span>
            <span>·</span>
            <button
              onClick={() => {
                playSoundEffect.click();
                setIsParentModalOpen(true);
              }}
              className="text-sky-700 font-semibold hover:underline"
            >
              Hướng dẫn dành cho phụ huynh
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

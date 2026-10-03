import React from 'react';
import { Volume2, VolumeX, Star, BookOpen, PenTool, Gamepad2, Award, Compass, HelpCircle } from 'lucide-react';
import { LearningMode, StudentProgress } from '../types';
import { playSoundEffect, speakVietnamese } from '../utils/soundEffects';

interface NavbarProps {
  currentMode: LearningMode;
  onSelectMode: (mode: LearningMode) => void;
  progress: StudentProgress;
  onToggleSound: () => void;
  onSwitchAvatar: () => void;
  onOpenParentGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  progress,
  onToggleSound,
  onSwitchAvatar,
  onOpenParentGuide,
}) => {
  const navItems = [
    { mode: 'overview' as LearningMode, label: 'Mục lục & Giới thiệu', icon: Compass },
    { mode: 'reading' as LearningMode, label: 'Học Đọc & Đánh Vần', icon: BookOpen },
    { mode: 'writing' as LearningMode, label: 'Vở Tập Viết Ô Ly', icon: PenTool },
    { mode: 'games' as LearningMode, label: 'Trò Chơi Chữ Cái', icon: Gamepad2 },
    { mode: 'spelling-rule' as LearningMode, label: 'Bí Kíp Chính Tả', icon: Compass },
    { mode: 'quiz' as LearningMode, label: 'Bài Tập Trắc Nghiệm', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            playSoundEffect.click();
            onSelectMode('overview');
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <span className="font-kid font-bold text-2xl tracking-tighter">TV1</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-kid font-black text-amber-950 tracking-tight leading-none group-hover:text-amber-700 transition-colors">
              Tiếng Việt 1
            </span>
            <span className="text-[11px] font-medium text-amber-700/80 leading-tight">
              Kết nối tri thức với cuộc sống
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => {
                  playSoundEffect.click();
                  onSelectMode(item.mode);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                    : 'text-slate-600 hover:text-amber-800 hover:bg-amber-100/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Stars, Sound, Avatar & Parent Guide) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 border border-amber-300/80 rounded-xl text-amber-900 shadow-2xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="text-sm font-bold font-kid tabular-nums">
              {progress.stars} <span className="text-[10px] font-medium uppercase text-amber-700 hidden sm:inline">sao</span>
            </span>
          </div>

          {/* Female Voice Test Button */}
          <button
            onClick={() => {
              playSoundEffect.click();
              speakVietnamese('Xin chào các em học sinh lớp 1! Cô là giọng đọc mẫu chuẩn tiếng Việt.');
            }}
            title="Bấm nghe thử giọng cô giáo đọc mẫu"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 text-xs font-semibold transition-colors"
          >
            <span>👩‍🏫</span>
            <span className="hidden sm:inline">Giọng Cô Giáo</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playSoundEffect.click();
              onToggleSound();
            }}
            title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className={`p-2 rounded-xl border transition-colors ${
              progress.soundEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {progress.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Avatar Switcher */}
          <button
            onClick={() => {
              playSoundEffect.click();
              onSwitchAvatar();
            }}
            title="Đổi nhân vật bạn học (Nam / Hà)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 hover:bg-orange-100 transition-colors"
          >
            <span className="text-base">{progress.avatar === 'nam' ? '👦' : '👧'}</span>
            <span className="text-xs font-semibold hidden md:inline">
              Bé {progress.avatar === 'nam' ? 'Nam' : 'Hà'}
            </span>
          </button>

          {/* Parent & Teacher Guide Button */}
          <button
            onClick={() => {
              playSoundEffect.click();
              onOpenParentGuide();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white font-semibold text-xs hover:bg-sky-700 transition-all shadow-sm shadow-sky-600/20 whitespace-nowrap"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Góc Bố Mẹ</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-amber-100 bg-amber-50/50 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => {
                playSoundEffect.click();
                onSelectMode(item.mode);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-amber-500 text-white font-semibold'
                  : 'text-slate-600 hover:bg-amber-100/70'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  isSystemDark: boolean;
  onSetThemeMode: (mode: ThemeMode) => void;
  className?: string;
  variant?: 'navbar' | 'segmented' | 'dropdown';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  themeMode,
  isDarkMode,
  isSystemDark,
  onSetThemeMode,
  className = '',
  variant = 'dropdown'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const themes: Array<{
    id: ThemeMode;
    label: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    accentColor: string;
  }> = [
    {
      id: 'system',
      label: 'Как в системе',
      description: isSystemDark ? 'Сейчас тёмная (ОС)' : 'Сейчас светлая (ОС)',
      icon: Monitor,
      accentColor: 'text-indigo-500 dark:text-indigo-400'
    },
    {
      id: 'light',
      label: 'Светлая тема',
      description: 'Чистая контрастная палитра',
      icon: Sun,
      accentColor: 'text-amber-500'
    },
    {
      id: 'dark',
      label: 'Тёмная тема',
      description: 'Комфортная ночная гамма',
      icon: Moon,
      accentColor: 'text-emerald-500 dark:text-emerald-400'
    }
  ];

  const currentTheme = themes.find((t) => t.id === themeMode) || themes[0];
  const CurrentIcon = currentTheme.icon;

  if (variant === 'segmented') {
    return (
      <div className={`inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 ${className}`}>
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = themeMode === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSetThemeMode(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={`${t.label} (${t.description})`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? t.accentColor : ''}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
          isOpen
            ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-emerald-500/50 dark:border-emerald-500/50'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-xs'
        }`}
        aria-label="Выбрать тему оформления"
        aria-expanded={isOpen}
        title={`Тема: ${currentTheme.label} (${currentTheme.description})`}
      >
        <CurrentIcon
          className={`w-4 h-4 transition-transform ${
            themeMode === 'system'
              ? 'text-indigo-500 dark:text-indigo-400'
              : themeMode === 'light'
              ? 'text-amber-500'
              : 'text-emerald-500 dark:text-emerald-400'
          }`}
        />
        <span className="hidden md:inline font-semibold text-xs text-slate-700 dark:text-slate-200">
          {themeMode === 'system' ? 'Авто' : themeMode === 'light' ? 'Светлая' : 'Тёмная'}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-600 dark:text-slate-200' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-[45] animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Оформление
              </span>
              {themeMode === 'system' && (
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  ОС: {isSystemDark ? 'Тёмная' : 'Светлая'}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = themeMode === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onSetThemeMode(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-white dark:bg-slate-700 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? t.accentColor : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <div className="text-xs">{t.label}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {t.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="p-1 rounded-full bg-emerald-500 text-white shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 px-3 py-1 text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
            При выборе «Как в системе» тема автоматически меняется при смене оформления в вашей ОС.
          </div>
        </div>
      )}
    </div>
  );
};

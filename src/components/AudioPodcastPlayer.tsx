import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Download, 
  Headphones, 
  Volume2, 
  VolumeX,
  FileText,
  X
} from 'lucide-react';
import { METADATA } from '../data/strategicData';

interface AudioPodcastPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const AudioPodcastPlayer: React.FC<AudioPodcastPlayerProps> = ({
  isPlaying,
  onPlayPause
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const rates = [0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      const nextTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const cycleRate = () => {
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="my-6 p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <audio
        ref={audioRef}
        src={METADATA.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => onPlayPause()}
        preload="metadata"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <button
            onClick={onPlayPause}
            className="w-14 h-14 flex-shrink-0 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
            aria-label={isPlaying ? 'Пауза' : 'Слушать подкаст'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Headphones className="w-3 h-3" /> Аудио-подкаст
              </span>
              <span className="text-xs text-slate-400 font-medium">15 минут</span>
            </div>
            <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate">
              ИИ и автоматизация в СмИТ Биллинг
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Разбор стратегического плана: рынок ISP, СОРМ, выписки, AI-агент на 7 каналах
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-1 max-w-xl">
          {/* Scrubber & Time */}
          <div className="w-full flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 min-w-[36px] text-right">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 rounded-lg bg-slate-100 dark:bg-slate-800 accent-emerald-500 cursor-pointer appearance-none"
                style={{
                  background: `linear-gradient(to right, #10b981 ${progressPercent}%, rgba(148, 163, 184, 0.25) ${progressPercent}%)`
                }}
              />
            </div>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 min-w-[36px]">
              {formatTime(duration)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 self-end sm:self-center">
            <button
              onClick={() => handleSkip(-15)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              title="Назад на 15 секунд"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleSkip(15)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              title="Вперёд на 15 секунд"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={cycleRate}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold font-mono text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Скорость воспроизведения"
            >
              {playbackRate}×
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              title={isMuted ? 'Включить звук' : 'Выключить звук'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`p-2.5 rounded-xl text-xs font-medium transition-colors ${
                showTranscript
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white'
                  : 'text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
              title="Темы подкаста"
            >
              <FileText className="w-4 h-4" />
            </button>

            <a
              href={METADATA.audioUrl}
              download="podcast_ai_smit_billing.m4a"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              title="Скачать запись (M4A)"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Transcript / Topics Drawer */}
      {showTranscript && (
        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Ключевые темы и таймкоды:</span>
            <button onClick={() => setShowTranscript(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">00:00 – 03:20</strong>
              Почему рынок ISP биллинга в РФ (5.28 млрд ₽) застрял в 2010 году и требует перезагрузки.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">03:20 – 07:15</strong>
              Архитектура СмИТ: мульти-провайдер AI, 7 каналов и голосовой ассистент на реальном телефоне.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">07:15 – 11:40</strong>
              Замкнутый денежный контур: от почтовой выписки банка до чека 54-ФЗ в ОФД без ручного ввода.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">11:40 – 15:11</strong>
              СОРМ-3 сертификация в ЦНИИС и условия 6 месяцев бесплатного пилота для первых операторов.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
import { METADATA, PODCAST_EPISODES } from '../data/strategicData';

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
  const [episodeId, setEpisodeId] = useState(PODCAST_EPISODES[0].id);
  // подсказка про выпуски: гаснет сама и сразу после первого переключения
  const [showHint, setShowHint] = useState(true);

  const episode = PODCAST_EPISODES.find(e => e.id === episodeId) || PODCAST_EPISODES[0];

  const rates = [0.75, 1, 1.25, 1.5, 2];

  // Смена выпуска: начинаем сначала и продолжаем слушать, если слушали.
  const selectEpisode = (id: string) => {
    setShowHint(false);
    if (id === episodeId) return;
    setEpisodeId(id);
    setCurrentTime(0);
    setDuration(0);
    const el = audioRef.current;
    if (!el) return;
    const wasPlaying = isPlaying;
    window.setTimeout(() => {
      el.currentTime = 0;
      el.playbackRate = playbackRate;
      if (wasPlaying) el.play().catch(() => {});
    }, 0);
  };

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
        key={episode.id}
        src={episode.url}
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
              <span className="text-xs text-slate-400 font-medium">{episode.duration}</span>
              {episode.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {episode.badge}
                </span>
              )}
            </div>
            <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate">
              {episode.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {episode.subtitle}
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
            aria-label="Скорость воспроизведения"
          >
              {playbackRate}×
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              title={isMuted ? 'Включить звук' : 'Выключить звук'}
            aria-label="Выключить или включить звук"
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
              href={episode.url}
              download={episode.url.split('/').pop()}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              title="Скачать запись (M4A)"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Transcript / Topics Drawer */}
      {/* Выпуски: их уже три, поэтому нужен явный выбор, а не один трек */}
      {PODCAST_EPISODES.length > 1 && (
        <div className="relative z-10 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2.5">
            Выпуски
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 ${showHint ? 'episode-hint-on' : ''}`}>
            {PODCAST_EPISODES.map((ep, i) => {
              const active = ep.id === episode.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => selectEpisode(ep.id)}
                  aria-pressed={active}
                  style={{ ['--hint-delay' as string]: `${i * 0.32}s` } as React.CSSProperties}
                  className={`episode-card text-left p-3 rounded-2xl border transition-all ${
                    active
                      ? 'border-emerald-500/50 bg-emerald-50/60 dark:bg-emerald-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      active ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'
                    }`}>
                      {ep.duration}
                    </span>
                    {ep.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                        {ep.badge}
                      </span>
                    )}
                    {active && isPlaying && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">звучит</span>
                    )}
                  </div>
                  <div className="text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
                    {ep.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                    {ep.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showTranscript && (
        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              {episode.topics.some(t => t.time) ? 'Ключевые темы и таймкоды:' : 'О чём выпуск:'}
            </span>
            <button onClick={() => setShowTranscript(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {episode.topics.map((t, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800"
              >
                {t.time && (
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">{t.time}</strong>
                )}
                {t.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

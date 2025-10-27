import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { parseAndTransformLRC } from "@/utils/lyricAlchemist";
import { SAMPLE_SONGS, Song } from "@/data/sampleSongs";
import SongSelector from "@/components/SongSelector";
import LyricDisplay from "@/components/LyricDisplay";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75); // 0-1 for HTML audio
  const [transformedLyrics, setTransformedLyrics] = useState<any[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync audio playback
  useEffect(() => {
    if (!audioRef.current) return;
    if (currentSong) {
      audioRef.current.src = currentSong.url!;
    }
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log(err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, volume]);

  // Update currentTime as song plays
  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => setCurrentTime(audioRef.current!.currentTime);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      const transformed = parseAndTransformLRC(currentSong.lrcLyrics);
      setTransformedLyrics(transformed);
    }
  }, [currentSong]);

  const handleSongSelect = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handlePrevious = () => {
    const idx = SAMPLE_SONGS.findIndex((s) => s.id === currentSong?.id);
    const prevIdx = idx > 0 ? idx - 1 : SAMPLE_SONGS.length - 1;
    setCurrentSong(SAMPLE_SONGS[prevIdx]);
    setCurrentTime(0);
    setIsPlaying(true);
  };
  const handleNext = () => {
    const idx = SAMPLE_SONGS.findIndex((s) => s.id === currentSong?.id);
    const nextIdx = (idx + 1) % SAMPLE_SONGS.length;
    setCurrentSong(SAMPLE_SONGS[nextIdx]);
    setCurrentTime(0);
    setIsPlaying(true);
  };
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Toaster />

      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Header */}
      <header className="bg-card border-b border-border p-4">
       <header className="bg-card border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center glow-primary">
              <span className="text-lg font-orbitron font-bold text-primary-foreground">🧪</span>
            </div>
            <div>
              <h1 className="text-2xl font-orbitron font-bold text-glow">
                Lyric Alchemist
              </h1>
              <p className="text-sm text-muted-foreground font-tech">
                Chemistry + Mathematics + Music = Magic
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground font-tech">
              Experience The Next level 
            </div>
            <div className="text-xs text-muted-foreground/70 font-tech">
              Transform • Synchronize • Experience
            </div>
          </div>
        </div>
        </header>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <SongSelector
          songs={SAMPLE_SONGS}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onSongSelect={handleSongSelect}
          onPlayPause={handlePlayPause}
        />
        <LyricDisplay
          lyrics={transformedLyrics}
          currentTime={currentTime}
          isPlaying={isPlaying}
        />
      </div>

      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        volume={volume}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export default Index;

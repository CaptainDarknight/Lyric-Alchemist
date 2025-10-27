import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Song } from '@/data/sampleSongs';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  isPlaying,
  currentTime,
  volume,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [isLiked, setIsLiked] = useState(false);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      setIsMuted(false);
      onVolumeChange(volume > 0 ? volume : 50);
    } else {
      setIsMuted(true);
      onVolumeChange(0);
    }
  };

  const handleRepeatToggle = () => {
    const modes: ('none' | 'one' | 'all')[] = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  if (!currentSong) {
    return (
      <div className="bg-card border-t border-border p-6">
        <div className="text-center text-muted-foreground">
          <div className="text-3xl mb-2">🎵</div>
          <p>Developed By Agraj</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-t border-border p-6 gradient-player">
      <div className="max-w-6xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center glow-primary">
              <div className="text-2xl font-orbitron font-bold text-primary-foreground">
                {currentSong.title.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-orbitron font-bold text-glow">
                {currentSong.title}
              </h3>
              <p className="text-muted-foreground font-tech">
                {currentSong.artist}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "hover:scale-110 transition-all duration-300",
              isLiked && "text-destructive"
            )}
          >
            <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider
            value={[currentTime]}
            max={currentSong.duration}
            step={1}
            onValueChange={(value) => onSeek(value[0])}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2 font-tech">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsShuffled(!isShuffled)}
            className={cn(
              "hover:scale-110 transition-all duration-300",
              isShuffled && "text-accent"
            )}
          >
            <Shuffle className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            className="hover:scale-110 transition-all duration-300"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            onClick={onPlayPause}
            size="lg"
            className="w-14 h-14 rounded-full glow-primary hover:scale-105 transition-all duration-300 gradient-primary"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-primary-foreground" />
            ) : (
              <Play className="h-6 w-6 text-primary-foreground ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            className="hover:scale-110 transition-all duration-300"
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRepeatToggle}
            className={cn(
              "hover:scale-110 transition-all duration-300",
              repeatMode !== 'none' && "text-accent"
            )}
          >
            <Repeat className="h-4 w-4" />
            {repeatMode === 'one' && (
              <span className="ml-1 text-xs">1</span>
            )}
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center mt-6 space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVolumeToggle}
            className="hover:scale-110 transition-all duration-300"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <div className="w-32">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(value) => {
                setIsMuted(false);
                onVolumeChange(value[0]);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
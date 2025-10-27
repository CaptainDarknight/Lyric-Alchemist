import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { Song } from "@/data/sampleSongs";
import { cn } from "@/lib/utils";

interface SongSelectorProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
  onPlayPause: () => void;
}

const SongSelector: React.FC<SongSelectorProps> = ({
  songs,
  currentSong,
  isPlaying,
  onSongSelect,
  onPlayPause,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log(err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

 
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url!;
      if (isPlaying) audioRef.current.play().catch((err) => console.log(err));
    }
  }, [currentSong]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
      <audio ref={audioRef} />

      <div className="mb-6">
        <h2 className="text-xl font-orbitron font-bold text-glow mb-2">
          Lyric Alchemist
        </h2>
        <p className="text-sm text-muted-foreground font-tech">
          Lets make Boredom into music
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-orbitron font-semibold mb-4">Songs</h3>

        {songs.map((song) => {
          const isActive = currentSong?.id === song.id;
          const isCurrentlyPlaying = isActive && isPlaying;

          return (
            <Card
              key={song.id}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:scale-105",
                isActive && "ring-2 ring-primary glow-primary bg-primary/5"
              )}
              onClick={() => onSongSelect(song)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-orbitron font-semibold text-sm truncate">
                      {song.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-tech truncate">
                      {song.artist}
                    </p>
                    <p className="text-xs text-muted-foreground font-tech mt-1">
                      {formatDuration(song.duration)}
                    </p>
                  </div>

                  {isActive && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayPause(); // toggle play/pause
                      }}
                      className="ml-2 hover:scale-110 transition-all duration-300"
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SongSelector;

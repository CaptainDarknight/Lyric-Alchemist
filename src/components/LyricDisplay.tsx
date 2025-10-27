import React, { useEffect, useState } from 'react';
import { TransformToken, LyricLine, formatTimeToSeconds } from '@/utils/lyricAlchemist';
import { cn } from '@/lib/utils';

interface LyricDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
  isPlaying: boolean;
}

const LyricDisplay: React.FC<LyricDisplayProps> = ({ lyrics, currentTime, isPlaying }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    let activeIndex = 0;
    for (let i = 0; i < lyrics.length; i++) {
      const lineTime = formatTimeToSeconds(lyrics[i].timestamp);
      if (currentTime >= lineTime) {
        activeIndex = i;
      } else {
        break;
      }
    }
    setCurrentLineIndex(activeIndex);

    if (lyrics[activeIndex]) {
      const nextLineTime = lyrics[activeIndex + 1]
        ? formatTimeToSeconds(lyrics[activeIndex + 1].timestamp)
        : currentTime + 10;
      const currentLineTime = formatTimeToSeconds(lyrics[activeIndex].timestamp);
      const lineDuration = nextLineTime - currentLineTime;
      const timeIntoLine = currentTime - currentLineTime;
      const progressRatio = Math.max(0, Math.min(1, timeIntoLine / lineDuration));

      const words = lyrics[activeIndex].original.split(/\s+/).filter(word => word.length > 0);
      const targetWordIndex = Math.floor(progressRatio * words.length);
      setCurrentWordIndex(targetWordIndex);
    }
  }, [currentTime, lyrics, isPlaying]);

  const renderTransformedToken = (
    token: TransformToken,
    index: number,
    wordIndex: number,
    isWordActive: boolean,
    isWordPast: boolean
  ) => {
    // Styles for element tokens
    if (token.type === 'element') {
      const color = token.color || "#FFD700";
      const style = {
        color,
        fontWeight: "bold",
        fontSize: "1.3em",
        textShadow: `0 0 8px ${color}`,
        opacity: isWordPast ? 1 : isWordActive ? 1 : 0.7,
        borderRadius: "0.4em",
        padding: "0.15em 0.5em",
        background: `${color}22`,
        boxShadow: isWordActive ? `0 0 12px 2px ${color}55` : `0 0 4px 1px ${color}33`,
        transition: "all 0.2s cubic-bezier(.4,2,.3,1)"
      };
      return (
        <span
          key={index}
          className="element-token mx-1"
          style={style}
          title={`${token.elementName} (${token.original})`}
        >
          {token.transformed}
        </span>
      );
    }

    // Styles for math tokens (boxed, gentle shadow, no pop)
    if (token.type === 'math') {
      const style = {
        color: isWordActive ? "#00bcd4" : "#888",
        fontWeight: isWordActive ? "bold" : "normal",
        fontSize: "1.15em",
        opacity: isWordPast ? 1 : isWordActive ? 1 : 0.7,
        borderRadius: "0.4em",
        padding: "0.15em 0.5em",
        background: isWordActive ? "#00bcd422" : "#232a45",
        boxShadow: isWordActive ? "0 0 10px 2px #00bcd455" : "0 0 4px 1px #232a4533",
        transition: "all 0.2s cubic-bezier(.4,2,.3,1)"
      };
      return (
        <span
          key={index}
          className="math-token mx-1"
          style={style}
          title={token.elementName}
        >
          {token.transformed}
        </span>
      );
    }

    // Space
    if (token.type === 'space') {
      return <span key={index} className="mx-1">&nbsp;</span>;
    }

    // Punctuation
    if (token.type === 'punctuation') {
      return (
        <span
          key={index}
          className="punctuation-token mx-1"
          style={{
            color: "#bbb",
            opacity: isWordPast ? 1 : isWordActive ? 1 : 0.5
          }}
        >
          {token.transformed}
        </span>
      );
    }

    // Default
    return (
      <span
        key={index}
        className="text-token mx-1"
        style={{
          color: "#eee",
          opacity: isWordPast ? 1 : isWordActive ? 1 : 0.5
        }}
      >
        {token.transformed}
      </span>
    );
  };

  const renderLyricLine = (line: LyricLine, index: number, isActive: boolean, isPast: boolean) => {
    const words = line.original.split(/\s+/).filter(word => word.length > 0);
    let tokenIndex = 0;

    return (
      <div
        key={index}
        className={cn(
          "lyric-line text-center py-4 px-6 rounded-xl shadow-lg mb-2 transition-all duration-500",
          isActive && "scale-105 bg-primary/10 border border-primary/30",
          !isActive && !isPast && "opacity-70",
          isPast && !isActive && "opacity-40"
        )}
        style={{
          borderLeft: isActive ? "4px solid #00bcd4" : "4px solid transparent",
          marginBottom: "1.5em"
        }}
      >
        <div className="font-tech flex flex-wrap justify-center gap-2">
          {words.map((word, wordIndex) => {
            const isWordActive = isActive && wordIndex === currentWordIndex;
            const isWordPast = isActive && wordIndex < currentWordIndex;

            const wordTokens = [];
            let currentTokenContent = '';

            while (tokenIndex < line.transformed.length) {
              const token = line.transformed[tokenIndex];
              if (token.type === 'space' && currentTokenContent.length > 0) {
                tokenIndex++;
                break;
              }
              wordTokens.push(token);
              if (token.type !== 'space') {
                currentTokenContent += token.original;
              }
              tokenIndex++;
              if (currentTokenContent.length >= word.length) break;
            }

            return (
              <span key={wordIndex} className="inline-flex">
                {wordTokens.map((token, tIndex) =>
                  renderTransformedToken(token, tIndex, wordIndex, isWordActive, isWordPast)
                )}
              </span>
            );
          })}
        </div>
        {isActive && (
          <div className="text-xs text-muted-foreground mt-3 opacity-80 font-mono">
            <span style={{ letterSpacing: "1px" }}>Original: {line.original}</span>
          </div>
        )}
      </div>
    );
  };

  if (lyrics.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <div className="text-center text-muted-foreground">
          <div className="text-3xl mb-4">🧪</div>
          <p>No lyrics available for transformation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-br from-[#181c2f] via-[#232a45] to-[#181c2f]">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {lyrics.map((line, index) => {
            const isActive = index === currentLineIndex;
            const isPast = index < currentLineIndex;
            return renderLyricLine(line, index, isActive, isPast);
          })}
        </div>
      </div>
      <div className="particles fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LyricDisplay;
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Type definitions
interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords: React.FC<FlipWordsProps> = ({
  words,
  duration = 3000,
  className
}) => {
  const [index, setIndex] = useState<number>(0);
  const currentWord: string = words[index] ?? "";

  useEffect(() => {
    if (words.length === 0) return;

    const intervalId: NodeJS.Timeout = setInterval(() => {
      setIndex((prevIndex: number) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [duration, words.length]);

  // Calculate the width needed for the longest word
  const longestWord: string = words.reduce((a: string, b: string) => 
    a.length > b.length ? a : b, ""
  );
  
  const getMinWidth = (): string => {
    return `${longestWord.length * 0.6}em`;
  };

  const handleLetterAnimation = (letterIndex: number) => ({
    initial: { opacity: 0, y: 8, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { 
      delay: letterIndex * 0.03, 
      duration: 0.35, 
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  });

  if (words.length === 0) {
    return <span className={className || ""}>No words provided</span>;
  }
  
  return (
    <span 
      className={`inline-block align-baseline ${className || ""}`} 
      style={{ 
        minWidth: getMinWidth(), 
        textAlign: 'left' as const 
      }}
      aria-live="polite"
    >
      {currentWord.split("").map((ch: string, letterIndex: number) => {
        const isSpace: boolean = ch === " ";
        
        if (isSpace) {
          return (
            <span 
              key={`sp-${letterIndex}`} 
              className="inline-block"
            >
              &nbsp;
            </span>
          );
        }
        
        return (
          <motion.span
            key={`${index}-${letterIndex}-${ch}`}
            {...handleLetterAnimation(letterIndex)}
            className="inline-block"
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
};
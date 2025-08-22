import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const FlipWords = ({
  words,
  duration = 3000,
  className
}) => {
  const [index, setIndex] = useState(0);
  const currentWord = words[index] ?? "";

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration);
    return () => clearInterval(t);
  }, [duration, words.length]);

  // Calculate the width needed for the longest word
  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");
  
  return (
    <span 
      className={`inline-block align-baseline ${className || ""}`} 
      style={{ minWidth: `${longestWord.length * 0.6}em`, textAlign: 'left' }}
      aria-live="polite">
      {currentWord.split("").map((ch, letterIndex) => {
        const isSpace = ch === " ";
        if (isSpace) {
          return <span key={`sp-${letterIndex}`} className="inline-block">&nbsp;</span>;
        }
        return (
          <motion.span
            key={`${index}-${letterIndex}-${ch}`}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: letterIndex * 0.03, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block">
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
};

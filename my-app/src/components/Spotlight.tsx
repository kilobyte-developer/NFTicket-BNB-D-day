// src/components/home/Spotlight.js
"use client";
import React from "react";
import { motion } from "motion/react";

export const Spotlight = ({
  translateY = -350,
  width = 560,
  height = 1380,
  duration = 7,
  xOffset = 100,
  className = "",
  fill = "hsla(210, 100%, 85%, .08)"
} = {}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      
      {/* Left spotlight - lighter, moved further left, and extended down */}
      <motion.div
        animate={{
          x: [0, xOffset/6, 0],
          y: [0, -xOffset/8, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-full h-full z-40 pointer-events-none">
        <div
          style={{
            transform: `translateY(${translateY}px) translateX(-30%) rotate(-30deg)`,
            background: `radial-gradient(ellipse at left, ${fill} 0%, transparent 70%)`,
            width: `${width/2}px`,
            height: `${height/2}px`,
            opacity: 0.4
          }}
          className={`absolute top-0 left-0`} />
      </motion.div>
      
      {/* Right spotlight - lighter, moved further right, and extended down */}
      <motion.div
        animate={{
          x: [0, -xOffset/6, 0],
          y: [0, -xOffset/8, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-full h-full z-40 pointer-events-none">
        <div
          style={{
            transform: `translateY(${translateY}px) translateX(30%) rotate(30deg)`,
            background: `radial-gradient(ellipse at right, ${fill} 0%, transparent 70%)`,
            width: `${width/2}px`,
            height: `${height/2}px`,
            opacity: 0.4
          }}
          className={`absolute top-0 right-0`} />
      </motion.div>
    </motion.div>
  );
};
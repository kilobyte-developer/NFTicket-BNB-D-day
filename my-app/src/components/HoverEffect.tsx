"use client";

import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, ReactNode } from "react";

// Type definitions
interface HoverEffectItem {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface HoverEffectProps {
  items: HoverEffectItem[];
  className?: string;
}

interface CardProps {
  className?: string;
  children: ReactNode;
}

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

interface CardDescriptionProps {
  className?: string;
  children: ReactNode;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number): void => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = (): void => {
    setHoveredIndex(null);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -m-2",
        className
      )}
    >
      {items.map((item: HoverEffectItem, idx: number) => {
        const IconComponent = item.icon;
        return (
          <div
            key={`${item.title}-${idx}`}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              {IconComponent && (
                <div className="mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.1))",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    <IconComponent
                      className="w-6 h-6"
                      style={{ color: "#C0C0C0" }}
                    />
                  </div>
                </div>
              )}
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-medium tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
"use client"
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className="relative group overflow-hidden ">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-700 rounded-2xl blur-lg opacity-15 group-hover:opacity-30 transition duration-500"></div>
      <div className={`relative bg-gradient-to-br from-purple-900/5 via-gray-900/10 to-purple-900/5 p-6 rounded-2xl border border-purple-600/10 h-auto backdrop-blur-sm ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;

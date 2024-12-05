import React from 'react';
import { Award } from 'lucide-react';

interface CardMedalProps {
  label: string;
  className?: string;
}

export const CardMedal: React.FC<CardMedalProps> = ({ label, className = '' }) => {
  return (
    <div className={`absolute top-4 right-4 flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg ${className}`}>
      <Award className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
};
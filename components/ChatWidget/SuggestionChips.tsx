'use client';

import { Sparkles } from 'lucide-react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  primaryColor?: string;
}

export default function SuggestionChips({ 
  suggestions, 
  onSelect,
  primaryColor = '#4F46E5' 
}: SuggestionChipsProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Sparkles className="h-4 w-4" style={{ color: primaryColor }} />
        <span className="font-medium">Suggested questions:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{ 
              borderColor: primaryColor,
              color: primaryColor
            }}
          >
            <span className="relative z-10">{suggestion}</span>
            
            {/* Hover background effect */}
            <span 
              className="absolute inset-0 z-0 translate-y-full transform bg-opacity-10 transition-transform duration-200 group-hover:translate-y-0"
              style={{ backgroundColor: primaryColor }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { Smile, ThumbsUp, Heart, Sparkles, Dog, Coffee, Plane, Lightbulb, Flag, Clock } from 'lucide-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose?: () => void;
  primaryColor?: string;
}

type CategoryKey = 'Recent' | 'Smileys' | 'Gestures' | 'Hearts' | 'Animals' | 'Food' | 'Travel' | 'Objects' | 'Symbols' | 'Flags';

const EMOJI_CATEGORIES: Record<CategoryKey, string[]> = {
  'Recent': [], // Will be populated from localStorage
  'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬'],
  'Gestures': ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅'],
  'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
  'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗'],
  'Food': ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🥕', '🧄', '🧅', '🥔', '🍠', '🌰', '🥜', '🍞', '🥐', '🥖', '🥨', '🥯', '🧇', '🥞', '🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🍳', '☕', '🍵', '🧃', '🥤', '🧋', '🍺', '🍻', '🥂', '🍷', '🍰', '🎂', '🧁', '🍪', '🍩', '🍫', '🍬', '🍭'],
  'Travel': ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '✈️', '🛩️', '🚁', '🚂', '🚊', '🚝', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚞', '🚋', '🚃', '🚟', '🚠', '🚡', '🛸', '🚀', '🛰️', '⛵', '🛥️', '🚤', '⛴️', '🛳️', '🏝️', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯'],
  'Objects': ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🕹️', '💾', '💿', '📀', '📷', '📹', '🎥', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏰', '⏲️', '🕰️', '⏳', '⌛', '📡', '🔋', '🪫', '🔌', '💡', '🔦', '🕯️', '🧯', '🛢️', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '🔨', '🪓', '⚒️', '🛠️', '🔧', '🪛', '🔩'],
  'Symbols': ['✨', '⭐', '🌟', '💫', '✅', '❌', '⚠️', '💯', '🔥', '💧', '⚡', '💥', '💢', '💬', '💭', '🗯️', '👁️', '🔔', '🔕', '🎵', '🎶', '〰️', '➰', '✔️', '✖️', '➕', '➖', '➗', '💲', '💱', '™️', '©️', '®️', '🔚', '🔙', '🔛', '🔝', '🔜', '☑️', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤'],
  'Flags': ['🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇨', '🇦🇩', '🇦🇪', '🇦🇫', '🇦🇬', '🇦🇮', '🇦🇱', '🇦🇲', '🇦🇴', '🇦🇶', '🇦🇷', '🇦🇸', '🇦🇹', '🇦🇺', '🇦🇼', '🇦🇽', '🇦🇿', '🇧🇦', '🇧🇧', '🇧🇩', '🇧🇪', '🇧🇫', '🇧🇬', '🇧🇭', '🇧🇮', '🇧🇯', '🇧🇱', '🇧🇲', '🇧🇳', '🇧🇴', '🇧🇶', '🇧🇷', '🇧🇸', '🇧🇹', '🇧🇻', '🇧🇼', '🇧🇾', '🇧🇿', '🇨🇦', '🇨🇳', '🇩🇪', '🇪🇸', '🇫🇷', '🇬🇧', '🇮🇹', '🇯🇵', '🇰🇷', '🇷🇺', '🇺🇸', '🇻🇳'],
};

const CATEGORY_ICONS: Record<CategoryKey, React.ComponentType<{ className?: string }>> = {
  'Recent': Clock,
  'Smileys': Smile,
  'Gestures': ThumbsUp,
  'Hearts': Heart,
  'Animals': Dog,
  'Food': Coffee,
  'Travel': Plane,
  'Objects': Lightbulb,
  'Symbols': Sparkles,
  'Flags': Flag,
};

const RECENT_EMOJIS_KEY = 'chat-widget-recent-emojis';

export default function EmojiPicker({ onSelect, onClose, primaryColor = '#4F46E5' }: EmojiPickerProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('Smileys'); // Default to Smileys instead of Recent
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load recent emojis from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RECENT_EMOJIS_KEY);
      if (stored) {
        try {
          setRecentEmojis(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse recent emojis:', e);
        }
      }
    }
  }, []);

  // Save emoji to recent
  const saveToRecent = (emoji: string) => {
    const updated = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 24);
    setRecentEmojis(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(updated));
    }
  };

  const handleEmojiClick = (emoji: string) => {
    saveToRecent(emoji);
    onSelect(emoji);
    if (onClose) onClose();
  };

  // Get emojis for current category
  const getEmojisForCategory = () => {
    if (activeCategory === 'Recent') {
      return recentEmojis;
    }
    return EMOJI_CATEGORIES[activeCategory] || [];
  };

  // Filter emojis based on search (simple filter for demo)
  const filteredEmojis = searchQuery
    ? Object.values(EMOJI_CATEGORIES).flat().filter(emoji => emoji.includes(searchQuery))
    : getEmojisForCategory();

  return (
    <div 
      className="w-[340px] rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden"
    >
        {/* Search Bar */}
        <div className="p-3 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search emoji..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all"
            style={{ 
              focusRingColor: primaryColor,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Category tabs with icons */}
        <div className="flex items-center gap-0.5 border-b border-gray-100 px-2 py-2 overflow-x-auto scrollbar-hide">
          {(Object.keys(EMOJI_CATEGORIES) as CategoryKey[]).map((category) => {
            const IconComponent = CATEGORY_ICONS[category];
            const isActive = activeCategory === category;
            
            // Don't show Recent if empty
            if (category === 'Recent' && recentEmojis.length === 0) {
              return null;
            }
            
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchQuery('');
                }}
                className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-sm scale-105'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
                style={{
                  backgroundColor: isActive ? primaryColor : 'transparent',
                }}
                title={category}
              >
                <IconComponent className="h-4 w-4" />
              </button>
            );
          })}
        </div>

        {/* Emoji grid */}
        <div className="max-h-64 overflow-y-auto p-3 bg-gray-50">
          {filteredEmojis.length > 0 ? (
            <div className="grid grid-cols-8 gap-1">
              {filteredEmojis.map((emoji, index) => (
                <button
                  key={`${emoji}-${index}`}
                  onClick={() => handleEmojiClick(emoji)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl transition-all duration-200 hover:scale-125 hover:bg-white hover:shadow-sm active:scale-110"
                  title={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Smile className="h-12 w-12 mb-2 opacity-30" />
              <p className="text-sm">
                {searchQuery ? 'No emojis found' : activeCategory === 'Recent' ? 'No recent emojis' : 'No emojis'}
              </p>
            </div>
          )}
        </div>

        {/* Hide scrollbar CSS */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
  );
}


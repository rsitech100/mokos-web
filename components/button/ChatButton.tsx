import React from 'react';

interface ChatButtonProps {
  isOpen: boolean;
  totalUnread: number;
  onClick: () => void;
}

export const ChatButton = React.memo(({ isOpen, totalUnread, onClick }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-13 h-13 bg-gradient-to-br from-primary via-primary to-primary-hover text-white rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center group hover:scale-110"
      aria-label="Open chat"
    >
      {totalUnread > 0 && (
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
          {totalUnread > 9 ? '9+' : totalUnread}
        </span>
      )}
      {isOpen ? (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )}
    </button>
  );
});

ChatButton.displayName = 'ChatButton';

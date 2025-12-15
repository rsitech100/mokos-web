import React from 'react';

export interface ChatConversation {
  kostId: string;
  kost: {
    id: string;
    name: string;
    city: string;
    address: string;
  };
  lastMessage: string;
  lastMessageAt: string;
  lastMessageRead: boolean;
  unreadCount: string;
}

interface ConversationListProps {
  conversations: ChatConversation[];
  loading: boolean;
  error: string | null;
  onConversationClick: (conv: ChatConversation) => void;
  onRefresh: () => void;
  formatTime: (date: string) => string;
}

export const ConversationList = React.memo(({
  conversations,
  loading,
  error,
  onConversationClick,
  onRefresh,
  formatTime
}: ConversationListProps) => {
  if (loading && conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-gray-900 font-semibold mb-1">Error</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary-hover/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <p className="text-gray-900 font-bold text-lg mb-1">No conversations yet</p>
          <p className="text-gray-600 text-sm">Start chatting with kost owners</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <button
          key={conv.kostId}
          onClick={() => onConversationClick(conv)}
          className="w-full text-left block p-4 rounded-xl bg-white hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-primary/30 group"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary-hover text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
              {conv.kost.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  {conv.kost.name}
                </h4>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatTime(conv.lastMessageAt)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1.5 truncate flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {conv.kost.city}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm truncate ${conv.lastMessageRead ? 'text-gray-500' : 'text-gray-900 font-semibold'}`}>
                  {conv.lastMessage}
                </p>
                {parseInt(conv.unreadCount) > 0 && (
                  <span className="flex-shrink-0 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 animate-pulse">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
});

ConversationList.displayName = 'ConversationList';

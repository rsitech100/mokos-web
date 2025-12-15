import React, { useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  message: string;
  senderId: string;
  senderRole: string;
  createdAt: string;
  isRead: boolean;
}

interface MessagesListProps {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  formatTime: (date: string) => string;
  messageInput: string;
  sending: boolean;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

export const MessagesList = React.memo(({
  messages,
  loading,
  error,
  formatTime,
  messageInput,
  sending,
  onMessageChange,
  onSendMessage
}: MessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading messages...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
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
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <p className="text-gray-900 font-semibold mb-1">No messages</p>
              <p className="text-gray-600 text-sm">Send a message to start the conversation</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              const isOwn = msg.senderRole === 'user';
              return (
                <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-md ${
                    isOwn 
                      ? 'bg-gradient-to-br from-primary to-primary-hover text-white rounded-br-md' 
                      : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                  }`}>
                    <p className="text-sm break-words leading-relaxed">{msg.message}</p>
                    <p className={`text-xs mt-1.5 ${isOwn ? 'text-white/80' : 'text-gray-500'}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              value={messageInput}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendMessage();
                }
              }}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
          <button
            onClick={onSendMessage}
            disabled={!messageInput.trim() || sending}
            className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {sending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

MessagesList.displayName = 'MessagesList';

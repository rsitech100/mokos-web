'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ConversationList } from '../lists/ConversationList';
import { MessagesList } from '../lists/MessagesList';
import type { ChatConversation } from '../lists/ConversationList';

interface ChatMessage {
  id: string;
  message: string;
  senderId: string;
  senderRole: string;
  createdAt: string;
  isRead: boolean;
}

function getTokenFromCookies(): string | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => cookie.trim().startsWith('client_token='));
  
  if (!authCookie) return null;
  
  const encryptedToken = authCookie.split('=')[1];
  
  try {
    return atob(decodeURIComponent(encryptedToken));
  } catch {
    return null;
  }
}

interface ChatPanelProps {
  initialKostId?: string;
}

export function ChatPanel({ initialKostId }: ChatPanelProps) {
  const [view, setView] = useState<'list' | 'messages'>('list');
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [sending, setSending] = useState(false);

  const fetchConversations = useCallback(async () => {
    const token = getTokenFromCookies();
    
    if (!token) {
      setError('Not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setConversations(data.data || []);
      } else {
        setError(data.error || 'Failed to load conversations');
      }
    } catch {
      setError('Error loading conversations');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (kostId: string) => {
    const token = getTokenFromCookies();
    
    if (!token) return;

    setMessagesLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/chat/${kostId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(data.data || []);
      } else {
        setError(data.error || 'Failed to load messages');
      }
    } catch {
      setError('Error loading messages');
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (kostId: string, hasUnread: boolean) => {
    if (!hasUnread) return;
    
    const token = getTokenFromCookies();
    if (!token) return;

    try {
      await fetch(`/api/chat/${kostId}/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchConversations();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  }, [fetchConversations]);

  const sendMessage = useCallback(async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const token = getTokenFromCookies();
    if (!token) return;

    // Get user ID from token (basic JWT decode)
    const getUserId = () => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id || 'user';
      } catch {
        return 'user';
      }
    };

    const tempMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      message: messageInput,
      senderId: getUserId(),
      senderRole: 'user',
      createdAt: new Date().toISOString(),
      isRead: false
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, tempMessage]);
    const sentMessage = messageInput;
    setMessageInput('');
    setSending(true);

    try {
      const response = await fetch(`/api/chat/${selectedConversation.kostId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: sentMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        // Replace temp message with real message from server
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id ? (data.data || tempMessage) : msg
        ));
      } else {
        // Remove temp message on error
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
        setMessageInput(sentMessage);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      // Remove temp message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      setMessageInput(sentMessage);
    } finally {
      setSending(false);
    }
  }, [messageInput, selectedConversation]);

  const handleConversationClick = useCallback((conversation: ChatConversation) => {
    setSelectedConversation(conversation);
    setView('messages');
    fetchMessages(conversation.kostId);
    // Mark messages as read when opening conversation (only if there are unread messages)
    const hasUnread = parseInt(conversation.unreadCount || '0') > 0;
    markAsRead(conversation.kostId, hasUnread);
  }, [fetchMessages, markAsRead]);

  const handleBackToList = useCallback(() => {
    setView('list');
    setSelectedConversation(null);
    setMessages([]);
  }, []);

  useEffect(() => {
    fetchConversations();
    
    // Poll conversations every 10 seconds
    const interval = setInterval(() => {
      fetchConversations();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [fetchConversations]);

  useEffect(() => {
    if (initialKostId) {
      // If we have an initialKostId, try to find existing conversation or create new one
      if (conversations.length > 0) {
        const conversation = conversations.find(c => c.kostId === initialKostId);
        if (conversation) {
          handleConversationClick(conversation);
        } else {
          // Create a temporary conversation to open messages view
          setView('messages');
          fetchMessages(initialKostId);
          setSelectedConversation({
            kostId: initialKostId,
            kost: {
              id: initialKostId,
              name: 'New Chat',
              city: '',
              address: ''
            },
            lastMessage: '',
            lastMessageAt: new Date().toISOString(),
            lastMessageRead: true,
            unreadCount: '0'
          });
        }
      }
    }
  }, [initialKostId, conversations, handleConversationClick, fetchMessages]);

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="flex items-center justify-between relative z-10">
          {view === 'messages' && selectedConversation ? (
            <>
              <button
                onClick={handleBackToList}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex-1 ml-3">
                <h3 className="text-base font-bold truncate">{selectedConversation.kost.name}</h3>
                <p className="text-xs text-white/90 truncate flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {selectedConversation.kost.city}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-bold">Messages</h3>
                <p className="text-xs text-white/90">
                  {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={fetchConversations}
                disabled={loading}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 backdrop-blur-sm"
              >
                <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {view === 'list' ? (
          <div className="p-3">
            <ConversationList
              conversations={conversations}
              loading={loading}
              error={error}
              onConversationClick={handleConversationClick}
              onRefresh={fetchConversations}
              formatTime={formatTime}
            />
          </div>
        ) : (
          <MessagesList
            messages={messages}
            loading={messagesLoading}
            error={error}
            formatTime={formatTime}
            messageInput={messageInput}
            sending={sending}
            onMessageChange={setMessageInput}
            onSendMessage={sendMessage}
          />
        )}
      </div>
    </div>
  );
}

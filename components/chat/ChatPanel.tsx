'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
  const [requireLogin, setRequireLogin] = useState(false);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat');
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setRequireLogin(false);
        setConversations(data.data || []);
      } else if (response.status === 401) {
        setRequireLogin(true);
        setError('Silakan login untuk menggunakan chat');
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
    setMessagesLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/chat/${kostId}`);
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setRequireLogin(false);
        setMessages(data.data || []);
      } else if (response.status === 401) {
        setRequireLogin(true);
        setError('Silakan login untuk menggunakan chat');
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
    
    try {
      await fetch(`/api/chat/${kostId}/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchConversations();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  }, [fetchConversations]);

  const sendMessage = useCallback(async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const tempMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      message: messageInput,
      senderId: 'user',
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
        },
        body: JSON.stringify({ message: sentMessage }),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id ? (data.data || tempMessage) : msg
        ));
      } else {
        if (response.status === 401) {
          setRequireLogin(true);
          setError('Silakan login untuk menggunakan chat');
        }
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
        setMessageInput(sentMessage);
      }
    } catch (err) {
      console.error('Error sending message:', err);
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
    
    const interval = setInterval(() => {
      fetchConversations();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [fetchConversations]);

  useEffect(() => {
    if (initialKostId) {
      if (conversations.length > 0) {
        const conversation = conversations.find(c => c.kostId === initialKostId);
        if (conversation) {
          handleConversationClick(conversation);
        } else {
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
            {requireLogin ? (
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl text-center space-y-4 shadow-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">🔒</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Login dulu untuk mulai chat</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-all text-sm shadow-md"
                  >
                    Login sekarang
                  </Link>
                  <button
                    onClick={fetchConversations}
                    className="px-4 py-2 rounded-xl bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all text-sm"
                  >
                    Coba lagi
                  </button>
                </div>
              </div>
            ) : (
              <ConversationList
                conversations={conversations}
                loading={loading}
                error={error}
                onConversationClick={handleConversationClick}
                onRefresh={fetchConversations}
                formatTime={formatTime}
              />
            )}
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

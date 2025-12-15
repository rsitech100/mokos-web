'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ChatButton } from '../button/ChatButton';

const ChatPanel = dynamic(() => import('./ChatPanel').then(mod => ({ default: mod.ChatPanel })), {
  ssr: false,
  loading: () => null
});

interface ChatWidgetClientProps {
  initialKostId?: string;
}

export function ChatWidgetClient({ initialKostId }: ChatWidgetClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeKostId, setActiveKostId] = useState<string | undefined>(initialKostId);

  const totalUnread = useMemo(() => 
    conversations.reduce((sum, conv) => sum + parseInt(conv.unreadCount || '0'), 0),
    [conversations]
  );

  useEffect(() => {
    (window as any).openChatWidget = (kostId?: string) => {
      setActiveKostId(kostId);
      setIsOpen(true);
    };
  }, []);

  return (
    <>
      <ChatButton 
        isOpen={isOpen} 
        totalUnread={totalUnread} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      
      {isOpen && <ChatPanel initialKostId={activeKostId} />}
    </>
  );
}

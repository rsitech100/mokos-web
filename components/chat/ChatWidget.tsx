import { ChatWidgetClient } from './ChatWidgetClient';

interface ChatWidgetProps {
  initialKostId?: string;
}

export function ChatWidget({ initialKostId }: ChatWidgetProps) {
  return <ChatWidgetClient initialKostId={initialKostId} />;
}



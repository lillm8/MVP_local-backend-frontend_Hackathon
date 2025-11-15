import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import type { ChatItem } from '@/hooks/suppliers/use-supplier-messages-tab';

interface ChatsSidebarProps {
  chats: ChatItem[];
  selectedChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export function ChatsSidebar({
  chats,
  selectedChatId,
  onSelectChat,
  onNewChat,
}: ChatsSidebarProps) {
  return (
    <Card className='rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <CardHeader className='p-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg'>Chats</h3>
          <Button onClick={onNewChat} size='sm' className='rounded-xl'>
            <Plus className='mr-2 h-4 w-4' />
            New Chat
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-6 pt-0'>
        <div className='space-y-2'>
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`duration-250 w-full rounded-2xl p-3 text-left transition-all ${
                selectedChatId === chat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <div className='flex items-center gap-2'>
                <MessageSquare className='h-4 w-4' />
                <span className='font-medium'>{chat.name}</span>
              </div>
              <p
                className={`mt-1 text-xs ${
                  selectedChatId === chat.id
                    ? 'opacity-80'
                    : 'text-muted-foreground'
                }`}
              >
                {chat.description}
              </p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

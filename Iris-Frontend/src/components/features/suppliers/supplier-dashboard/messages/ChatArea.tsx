import { Send } from 'lucide-react';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { ScrollArea } from '@components/ui/scroll-area';
import { Card, CardHeader } from '@components/ui/card';
import type {
  ChatItem,
  MessageItem,
} from '@/hooks/suppliers/use-supplier-messages-tab';

interface ChatAreaProps {
  selectedChat: ChatItem;
  messageInput: string;
  setMessageInput: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  getParticipantCount: (chat: ChatItem) => number;
}

export function ChatArea({
  selectedChat,
  messageInput,
  setMessageInput,
  onSendMessage,
  messagesEndRef,
  getParticipantCount,
}: ChatAreaProps) {
  return (
    <Card className='flex h-[calc(100vh-12rem)] flex-col rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <CardHeader className='p-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl'>{selectedChat.name}</h3>
          <div className='text-sm text-muted-foreground'>
            {getParticipantCount(selectedChat)} participant
            {getParticipantCount(selectedChat) !== 1 ? 's' : ''}
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <div className='flex flex-1 flex-col overflow-hidden p-0'>
        <ScrollArea className='flex-1 px-4'>
          <div className='space-y-4 py-4'>
            {selectedChat.messages.map((message: MessageItem) => {
              const isYou = message.sender === 'You';
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isYou ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className='h-8 w-8'>
                    <AvatarFallback className='bg-muted text-muted-foreground'>
                      {message.sender.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex max-w-[70%] flex-col ${isYou ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`mb-1 flex items-center gap-2 ${isYou ? 'flex-row-reverse' : ''}`}
                    >
                      <span className='text-sm font-medium'>
                        {message.sender}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {message.timestamp}
                      </span>
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isYou
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className='whitespace-pre-wrap break-words text-sm leading-relaxed'>
                        {message.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className='border-t border-border p-4'>
          <form onSubmit={onSendMessage} className='flex gap-2'>
            <Input
              placeholder='Type a message...'
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              className='rounded-xl'
            />
            <Button
              type='submit'
              disabled={!messageInput.trim()}
              className='rounded-xl'
            >
              <Send className='h-4 w-4' />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}

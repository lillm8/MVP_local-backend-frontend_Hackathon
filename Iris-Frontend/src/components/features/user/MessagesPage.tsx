'use client';

import { ChatsSidebar } from './messages/ChatsSidebar';
import { ChatArea } from './messages/ChatArea';
import { useMessagesPage, type Chat } from '@/hooks/user/use-messages-page';
import { useEffect } from 'react';

export interface MessagesPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Green Valley Farm',
    type: 'project',
    description: 'Supplier: Organic Vegetables',
    supplierId: '1',
    messages: [
      {
        id: '1',
        text: "Hi! I'd like to place an order for next week's delivery.",
        sender: 'You',
        timestamp: '10:30 AM',
      },
      {
        id: '2',
        text: "Hello! Of course, we'd be happy to help. What items are you interested in?",
        sender: 'Green Valley Farm',
        timestamp: '10:32 AM',
      },
      {
        id: '3',
        text: 'I need 10kg of heirloom tomatoes, 5kg of mixed greens, and 8kg of organic carrots.',
        sender: 'You',
        timestamp: '10:33 AM',
      },
      {
        id: '4',
        text: 'Perfect! All items are in stock. The heirloom tomatoes are particularly beautiful this week.',
        sender: 'Green Valley Farm',
        timestamp: '10:35 AM',
      },
    ],
  },
  {
    id: '2',
    name: 'Mountain Dairy Co.',
    type: 'project',
    description: 'Supplier: Artisan Dairy',
    supplierId: '2',
    messages: [
      {
        id: '1',
        text: 'Thank you for the last delivery, the mozzarella was excellent!',
        sender: 'You',
        timestamp: 'Yesterday, 3:45 PM',
      },
      {
        id: '2',
        text: "We're so glad you enjoyed it! We have a new aged cheddar you might be interested in.",
        sender: 'Mountain Dairy Co.',
        timestamp: 'Yesterday, 4:12 PM',
      },
    ],
  },
  {
    id: '3',
    name: 'Heritage Bakery',
    type: 'project',
    description: 'Supplier: Artisan Bakery',
    supplierId: '3',
    messages: [
      {
        id: '1',
        text: 'Can I add pastries to my weekly order?',
        sender: 'You',
        timestamp: 'Oct 23, 2:15 PM',
      },
      {
        id: '2',
        text: 'Absolutely! We have fresh croissants and pain au chocolat available.',
        sender: 'Heritage Bakery',
        timestamp: 'Oct 23, 2:20 PM',
      },
    ],
  },
  {
    id: '4',
    name: 'Olive Grove Estate',
    type: 'project',
    description: 'Supplier: Oils & Preserves',
    supplierId: '4',
    messages: [
      {
        id: '1',
        text: 'Do you have any truffle-infused olive oil in stock?',
        sender: 'You',
        timestamp: 'Oct 18, 11:00 AM',
      },
      {
        id: '2',
        text: 'Yes! We just received a fresh batch. Would you like to place an order?',
        sender: 'Olive Grove Estate',
        timestamp: 'Oct 18, 11:15 AM',
      },
    ],
  },
];

export function MessagesPage({ onViewSupplier }: MessagesPageProps) {
  const {
    chats,
    setChats,
    selectedChatId,
    setSelectedChatId,
    selectedChat,
    messageInput,
    setMessageInput,
    messagesEndRef,
    handleSendMessage,
    handleNewChat,
    getParticipantCount,
  } = useMessagesPage();

  useEffect(() => {
    if (chats.length === 0) {
      setChats(initialChats);
      setSelectedChatId('1');
    }
  }, [chats.length, setChats, setSelectedChatId]);

  if (!selectedChat) return null;

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid gap-6 lg:grid-cols-[300px_1fr]'>
          <ChatsSidebar
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
            onNewChat={handleNewChat}
          />
          <ChatArea
            chatName={selectedChat.name}
            participantCount={getParticipantCount(selectedChat)}
            messages={selectedChat.messages}
            messageInput={messageInput}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>
    </div>
  );
}

import { useState, useRef } from 'react';
import { toast } from 'sonner';

export interface MessageItem {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export interface ChatItem {
  id: string;
  name: string;
  type: 'general' | 'project';
  description?: string;
  supplierId?: string;
  messages: MessageItem[];
}

interface UseSupplierMessagesTabOptions {
  onViewSupplier?: (supplierId: string) => void;
}

export function useSupplierMessagesTab({
  onViewSupplier,
}: UseSupplierMessagesTabOptions = {}) {
  const [chats, setChats] = useState<ChatItem[]>([
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
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: MessageItem = {
      id: `m${Date.now()}`,
      text: messageInput,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setMessageInput('');
    toast.success('Message sent');

    if (selectedChat.type === 'project') {
      setTimeout(() => {
        const autoReply: MessageItem = {
          id: `m${Date.now()}`,
          text: "Thanks for your message! We'll get back to you shortly.",
          sender: selectedChat.name,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setChats(prev =>
          prev.map(chat =>
            chat.id === selectedChatId
              ? { ...chat, messages: [...chat.messages, autoReply] }
              : chat
          )
        );
      }, 2000);
    }
  };

  const handleNewChat = () => {
    toast.success('New chat feature coming soon!');
  };

  const getParticipantCount = (chat: ChatItem) => {
    const uniqueSenders = new Set(chat.messages.map(m => m.sender));
    return uniqueSenders.size;
  };

  return {
    chats,
    selectedChatId,
    setSelectedChatId,
    selectedChat,
    messageInput,
    setMessageInput,
    messagesEndRef,
    handleSendMessage,
    handleNewChat,
    getParticipantCount,
    onViewSupplier,
  };
}

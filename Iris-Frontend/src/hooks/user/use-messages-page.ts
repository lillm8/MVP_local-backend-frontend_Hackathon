'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  type: 'general' | 'project';
  description?: string;
  supplierId?: string;
  messages: Message[];
}

export function useMessagesPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat =
    chats.find(chat => chat.id === selectedChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageInput,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setMessageInput('');
    toast.success('Message sent');

    // Simulate response after 2 seconds if not general chat
    if (selectedChat?.type === 'project') {
      setTimeout(() => {
        const autoReply: Message = {
          id: `m${Date.now()}`,
          text: "Thanks for your message! We'll get back to you shortly.",
          sender: selectedChat.name,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setChats(prevChats =>
          prevChats.map(chat =>
            chat.id === selectedChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, autoReply],
                }
              : chat
          )
        );
      }, 2000);
    }
  };

  const handleNewChat = () => {
    toast.success('New chat feature coming soon!');
  };

  const getParticipantCount = (chat: Chat) => {
    const uniqueSenders = new Set(chat.messages.map(m => m.sender));
    return uniqueSenders.size;
  };

  return {
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
  };
}

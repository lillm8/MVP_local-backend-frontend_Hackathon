'use client';

import { useSupplierMessagesTab } from '@/hooks/suppliers/use-supplier-messages-tab';
import { ChatsSidebar } from './messages/ChatsSidebar';
import { ChatArea } from './messages/ChatArea';

interface SupplierMessagesTabProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function SupplierMessagesTab({
  onViewSupplier,
}: SupplierMessagesTabProps) {
  const {
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
  } = useSupplierMessagesTab({ onViewSupplier });

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 lg:grid-cols-[300px_1fr]'>
        <ChatsSidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onNewChat={handleNewChat}
        />
        <ChatArea
          selectedChat={selectedChat}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          getParticipantCount={getParticipantCount}
        />
      </div>
    </div>
  );
}

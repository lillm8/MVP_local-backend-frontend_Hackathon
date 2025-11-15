// Communication-related entities

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  ORDER_UPDATE = 'order_update',
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  isRead: boolean;
  createdAt: string;
}

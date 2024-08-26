import ChatMessage from "./ChatMessage";

export interface ChatUser {
  name: string;
  isRead: boolean;
  messages: ChatMessage[];
}

import ChatMessage from "./ChatMessage";

export interface ChatUser {
  name: string;
  messages: ChatMessage[];
}

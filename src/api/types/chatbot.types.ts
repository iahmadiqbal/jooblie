// Chatbot related types

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
}

export interface SendMessageRequest {
    message: string;
    context?: string;
    conversationId?: string;
}

export interface SendMessageResponse {
    id: string;
    text: string;
    sender: 'bot';
    timestamp: string;
    conversationId: string;
}

export interface ChatConversation {
    id: string;
    messages: ChatMessage[];
    context: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetConversationHistoryResponse {
    conversations: ChatConversation[];
    total: number;
}

import { apiClient } from '../config/axios';
import { SendMessageRequest, SendMessageResponse, GetConversationHistoryResponse } from '../types/chatbot.types';

/**
 * Chatbot Service
 * Handles all chatbot/AI assistant related API calls
 */
export const chatbotService = {
    /**
     * Send message to chatbot and get AI response
     * POST /chatbot/message
     */
    sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
        const response = await apiClient.post('/chatbot/message', data);
        return response.data;
    },

    /**
     * Get conversation history
     * GET /chatbot/conversations
     */
    getConversationHistory: async (): Promise<GetConversationHistoryResponse> => {
        const response = await apiClient.get('/chatbot/conversations');
        return response.data;
    },

    /**
     * Get single conversation by ID
     * GET /chatbot/conversations/:id
     */
    getConversation: async (id: string) => {
        const response = await apiClient.get(`/chatbot/conversations/${id}`);
        return response.data;
    },

    /**
     * Delete conversation
     * DELETE /chatbot/conversations/:id
     */
    deleteConversation: async (id: string): Promise<void> => {
        await apiClient.delete(`/chatbot/conversations/${id}`);
    },

    /**
     * Clear all conversations
     * DELETE /chatbot/conversations
     */
    clearAllConversations: async (): Promise<void> => {
        await apiClient.delete('/chatbot/conversations');
    },

    /**
     * Get suggested questions based on context
     * GET /chatbot/suggestions
     */
    getSuggestions: async (context?: string): Promise<{ suggestions: string[] }> => {
        const response = await apiClient.get('/chatbot/suggestions', { params: { context } });
        return response.data;
    },
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatbotService } from '../services/chatbotService';
import { SendMessageRequest } from '../types/chatbot.types';

/**
 * Hook to send message to chatbot
 */
export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SendMessageRequest) => chatbotService.sendMessage(data),
        onSuccess: () => {
            // Invalidate conversation history to refetch
            queryClient.invalidateQueries({ queryKey: ['chatbot', 'conversations'] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to send message.';
            console.error('Chatbot error:', message);
        },
    });
};

/**
 * Hook to get conversation history
 */
export const useConversationHistory = () => {
    return useQuery({
        queryKey: ['chatbot', 'conversations'],
        queryFn: () => chatbotService.getConversationHistory(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to get single conversation
 */
export const useConversation = (id: string) => {
    return useQuery({
        queryKey: ['chatbot', 'conversation', id],
        queryFn: () => chatbotService.getConversation(id),
        enabled: !!id,
    });
};

/**
 * Hook to delete conversation
 */
export const useDeleteConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => chatbotService.deleteConversation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chatbot', 'conversations'] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete conversation.';
            console.error('Delete conversation error:', message);
        },
    });
};

/**
 * Hook to clear all conversations
 */
export const useClearAllConversations = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => chatbotService.clearAllConversations(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chatbot', 'conversations'] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to clear conversations.';
            console.error('Clear conversations error:', message);
        },
    });
};

/**
 * Hook to get suggested questions
 */
export const useSuggestions = (context?: string) => {
    return useQuery({
        queryKey: ['chatbot', 'suggestions', context],
        queryFn: () => chatbotService.getSuggestions(context),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

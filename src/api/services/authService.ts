import { apiClient } from '../config/axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';

/**
 * Authentication Service
 * Handles all authentication related API calls
 */
export const authService = {
    /**
     * Login user
     * POST /auth/login
     */
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    /**
     * Register new user
     * POST /auth/register
     */
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    /**
     * Logout user
     * POST /auth/logout
     */
    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout');
        localStorage.removeItem('token');
    },

    /**
     * Get current authenticated user
     * GET /auth/me
     */
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },

    /**
     * Refresh authentication token
     * POST /auth/refresh
     */
    refreshToken: async (): Promise<{ token: string }> => {
        const response = await apiClient.post('/auth/refresh');
        return response.data;
    },

    /**
     * Request password reset
     * POST /auth/forgot-password
     */
    forgotPassword: async (email: string): Promise<void> => {
        await apiClient.post('/auth/forgot-password', { email });
    },

    /**
     * Reset password with token
     * POST /auth/reset-password
     */
    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        await apiClient.post('/auth/reset-password', { token, newPassword });
    },
};

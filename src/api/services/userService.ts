import { apiClient } from '../config/axios';
import { UserProfile, UpdateProfileRequest, JobRecommendation } from '../types/user.types';

/**
 * User Service
 * Handles all user profile related API calls
 */
export const userService = {
    /**
     * Get user profile
     * GET /users/profile
     */
    getProfile: async (): Promise<UserProfile> => {
        const response = await apiClient.get('/users/profile');
        return response.data;
    },

    /**
     * Update user profile
     * PUT /users/profile
     */
    updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
        const response = await apiClient.put('/users/profile', data);
        return response.data;
    },

    /**
     * Upload profile picture
     * POST /users/profile/picture
     */
    uploadProfilePicture: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append('picture', file);
        const response = await apiClient.post('/users/profile/picture', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    /**
     * Upload resume
     * POST /users/resume
     */
    uploadResume: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append('resume', file);
        const response = await apiClient.post('/users/resume', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    /**
     * Delete resume
     * DELETE /users/resume
     */
    deleteResume: async (): Promise<void> => {
        await apiClient.delete('/users/resume');
    },

    /**
     * Get job recommendations for user
     * GET /users/recommendations
     */
    getRecommendations: async (): Promise<JobRecommendation[]> => {
        const response = await apiClient.get('/users/recommendations');
        return response.data;
    },

    /**
     * Add experience to profile
     * POST /users/profile/experience
     */
    addExperience: async (data: any): Promise<UserProfile> => {
        const response = await apiClient.post('/users/profile/experience', data);
        return response.data;
    },

    /**
     * Update experience
     * PUT /users/profile/experience/:id
     */
    updateExperience: async (id: string, data: any): Promise<UserProfile> => {
        const response = await apiClient.put(`/users/profile/experience/${id}`, data);
        return response.data;
    },

    /**
     * Delete experience
     * DELETE /users/profile/experience/:id
     */
    deleteExperience: async (id: string): Promise<void> => {
        await apiClient.delete(`/users/profile/experience/${id}`);
    },

    /**
     * Add education to profile
     * POST /users/profile/education
     */
    addEducation: async (data: any): Promise<UserProfile> => {
        const response = await apiClient.post('/users/profile/education', data);
        return response.data;
    },

    /**
     * Update education
     * PUT /users/profile/education/:id
     */
    updateEducation: async (id: string, data: any): Promise<UserProfile> => {
        const response = await apiClient.put(`/users/profile/education/${id}`, data);
        return response.data;
    },

    /**
     * Delete education
     * DELETE /users/profile/education/:id
     */
    deleteEducation: async (id: string): Promise<void> => {
        await apiClient.delete(`/users/profile/education/${id}`);
    },
};

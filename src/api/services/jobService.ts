import { apiClient } from '../config/axios';
import { Job, JobFilters, JobApplication, CreateJobRequest } from '../types/job.types';

/**
 * Job Service
 * Handles all job related API calls
 */
export const jobService = {
    /**
     * Get all jobs with optional filters
     * GET /jobs
     */
    getJobs: async (filters?: JobFilters): Promise<{ jobs: Job[]; total: number; page: number }> => {
        const response = await apiClient.get('/jobs', { params: filters });
        return response.data;
    },

    /**
     * Get single job by ID
     * GET /jobs/:id
     */
    getJobById: async (id: string): Promise<Job> => {
        const response = await apiClient.get(`/jobs/${id}`);
        return response.data;
    },

    /**
     * Search jobs
     * GET /jobs/search
     */
    searchJobs: async (query: string): Promise<Job[]> => {
        const response = await apiClient.get('/jobs/search', { params: { q: query } });
        return response.data;
    },

    /**
     * Apply for a job
     * POST /jobs/:id/apply
     */
    applyForJob: async (jobId: string, data: { coverLetter?: string; resumeUrl?: string }): Promise<JobApplication> => {
        const response = await apiClient.post(`/jobs/${jobId}/apply`, data);
        return response.data;
    },

    /**
     * Get user's job applications
     * GET /jobs/applications
     */
    getUserApplications: async (): Promise<JobApplication[]> => {
        const response = await apiClient.get('/jobs/applications');
        return response.data;
    },

    /**
     * Get application by ID
     * GET /jobs/applications/:id
     */
    getApplicationById: async (id: string): Promise<JobApplication> => {
        const response = await apiClient.get(`/jobs/applications/${id}`);
        return response.data;
    },

    /**
     * Withdraw job application
     * DELETE /jobs/applications/:id
     */
    withdrawApplication: async (id: string): Promise<void> => {
        await apiClient.delete(`/jobs/applications/${id}`);
    },

    /**
     * Get featured jobs
     * GET /jobs/featured
     */
    getFeaturedJobs: async (): Promise<Job[]> => {
        const response = await apiClient.get('/jobs/featured');
        return response.data;
    },

    /**
     * Get similar jobs
     * GET /jobs/:id/similar
     */
    getSimilarJobs: async (id: string): Promise<Job[]> => {
        const response = await apiClient.get(`/jobs/${id}/similar`);
        return response.data;
    },
};

import { apiClient } from '../config/axios';
import { Job, CreateJobRequest } from '../types/job.types';

/**
 * Recruiter Service
 * Handles all recruiter related API calls
 */
export const recruiterService = {
    /**
     * Get recruiter's posted jobs
     * GET /recruiter/jobs
     */
    getMyJobs: async (): Promise<Job[]> => {
        const response = await apiClient.get('/recruiter/jobs');
        return response.data;
    },

    /**
     * Create new job posting
     * POST /recruiter/jobs
     */
    createJob: async (data: CreateJobRequest): Promise<Job> => {
        const response = await apiClient.post('/recruiter/jobs', data);
        return response.data;
    },

    /**
     * Update job posting
     * PUT /recruiter/jobs/:id
     */
    updateJob: async (id: string, data: Partial<CreateJobRequest>): Promise<Job> => {
        const response = await apiClient.put(`/recruiter/jobs/${id}`, data);
        return response.data;
    },

    /**
     * Delete job posting
     * DELETE /recruiter/jobs/:id
     */
    deleteJob: async (id: string): Promise<void> => {
        await apiClient.delete(`/recruiter/jobs/${id}`);
    },

    /**
     * Get applicants for a job
     * GET /recruiter/jobs/:id/applicants
     */
    getJobApplicants: async (jobId: string): Promise<any[]> => {
        const response = await apiClient.get(`/recruiter/jobs/${jobId}/applicants`);
        return response.data;
    },

    /**
     * Update application status
     * PUT /recruiter/applications/:id/status
     */
    updateApplicationStatus: async (
        applicationId: string,
        status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
    ): Promise<void> => {
        await apiClient.put(`/recruiter/applications/${applicationId}/status`, { status });
    },

    /**
     * Get recruiter dashboard stats
     * GET /recruiter/stats
     */
    getDashboardStats: async (): Promise<{
        totalJobs: number;
        activeJobs: number;
        totalApplications: number;
        pendingApplications: number;
    }> => {
        const response = await apiClient.get('/recruiter/stats');
        return response.data;
    },

    /**
     * Close job posting
     * POST /recruiter/jobs/:id/close
     */
    closeJob: async (id: string): Promise<void> => {
        await apiClient.post(`/recruiter/jobs/${id}/close`);
    },

    /**
     * Reopen job posting
     * POST /recruiter/jobs/:id/reopen
     */
    reopenJob: async (id: string): Promise<void> => {
        await apiClient.post(`/recruiter/jobs/${id}/reopen`);
    },
};

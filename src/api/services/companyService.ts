import { apiClient } from '../config/axios';
import { Company, UpdateCompanyRequest } from '../types/company.types';

/**
 * Company Service
 * Handles all company related API calls
 */
export const companyService = {
    /**
     * Get all companies
     * GET /companies
     */
    getCompanies: async (params?: { search?: string; industry?: string }): Promise<Company[]> => {
        const response = await apiClient.get('/companies', { params });
        return response.data;
    },

    /**
     * Get company by ID
     * GET /companies/:id
     */
    getCompanyById: async (id: string): Promise<Company> => {
        const response = await apiClient.get(`/companies/${id}`);
        return response.data;
    },

    /**
     * Get recruiter's company profile
     * GET /companies/my-company
     */
    getMyCompany: async (): Promise<Company> => {
        const response = await apiClient.get('/companies/my-company');
        return response.data;
    },

    /**
     * Update company profile
     * PUT /companies/my-company
     */
    updateCompany: async (data: UpdateCompanyRequest): Promise<Company> => {
        const response = await apiClient.put('/companies/my-company', data);
        return response.data;
    },

    /**
     * Upload company logo
     * POST /companies/my-company/logo
     */
    uploadLogo: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append('logo', file);
        const response = await apiClient.post('/companies/my-company/logo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    /**
     * Get company jobs
     * GET /companies/:id/jobs
     */
    getCompanyJobs: async (id: string): Promise<any[]> => {
        const response = await apiClient.get(`/companies/${id}/jobs`);
        return response.data;
    },

    /**
     * Get featured companies
     * GET /companies/featured
     */
    getFeaturedCompanies: async (): Promise<Company[]> => {
        const response = await apiClient.get('/companies/featured');
        return response.data;
    },
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService } from '../services/companyService';
import { UpdateCompanyRequest } from '../types/company.types';

/**
 * Hook to get all companies
 */
export const useCompanies = (params?: { search?: string; industry?: string }) => {
    return useQuery({
        queryKey: ['companies', params],
        queryFn: () => companyService.getCompanies(params),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

/**
 * Hook to get company by ID
 */
export const useCompany = (id: string) => {
    return useQuery({
        queryKey: ['company', id],
        queryFn: () => companyService.getCompanyById(id),
        enabled: !!id,
    });
};

/**
 * Hook to get recruiter's company
 */
export const useMyCompany = () => {
    return useQuery({
        queryKey: ['myCompany'],
        queryFn: () => companyService.getMyCompany(),
    });
};

/**
 * Hook to update company
 */
export const useUpdateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateCompanyRequest) => companyService.updateCompany(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myCompany'] });
            alert('Company profile updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update company.';
            alert(message);
        },
    });
};

/**
 * Hook to upload company logo
 */
export const useUploadLogo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => companyService.uploadLogo(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myCompany'] });
            alert('Company logo uploaded successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to upload logo.';
            alert(message);
        },
    });
};

/**
 * Hook to get company jobs
 */
export const useCompanyJobs = (id: string) => {
    return useQuery({
        queryKey: ['company', id, 'jobs'],
        queryFn: () => companyService.getCompanyJobs(id),
        enabled: !!id,
    });
};

/**
 * Hook to get featured companies
 */
export const useFeaturedCompanies = () => {
    return useQuery({
        queryKey: ['companies', 'featured'],
        queryFn: () => companyService.getFeaturedCompanies(),
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
};

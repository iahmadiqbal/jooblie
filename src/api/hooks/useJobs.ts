import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../services/jobService';
import { JobFilters } from '../types/job.types';

/**
 * Hook to get all jobs with filters
 */
export const useJobs = (filters?: JobFilters) => {
    return useQuery({
        queryKey: ['jobs', filters],
        queryFn: () => jobService.getJobs(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to get single job by ID
 */
export const useJob = (id: string) => {
    return useQuery({
        queryKey: ['job', id],
        queryFn: () => jobService.getJobById(id),
        enabled: !!id,
    });
};

/**
 * Hook to search jobs
 */
export const useSearchJobs = (query: string) => {
    return useQuery({
        queryKey: ['jobs', 'search', query],
        queryFn: () => jobService.searchJobs(query),
        enabled: query.length > 0,
    });
};

/**
 * Hook to apply for a job
 */
export const useApplyJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ jobId, data }: { jobId: string; data: any }) =>
            jobService.applyForJob(jobId, data),
        onSuccess: () => {
            // Invalidate applications to refetch
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            alert('Application submitted successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to submit application.';
            alert(message);
        },
    });
};

/**
 * Hook to get user's applications
 */
export const useApplications = () => {
    return useQuery({
        queryKey: ['applications'],
        queryFn: () => jobService.getUserApplications(),
    });
};

/**
 * Hook to get application by ID
 */
export const useApplication = (id: string) => {
    return useQuery({
        queryKey: ['application', id],
        queryFn: () => jobService.getApplicationById(id),
        enabled: !!id,
    });
};

/**
 * Hook to withdraw application
 */
export const useWithdrawApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => jobService.withdrawApplication(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            alert('Application withdrawn successfully.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to withdraw application.';
            alert(message);
        },
    });
};

/**
 * Hook to get featured jobs
 */
export const useFeaturedJobs = () => {
    return useQuery({
        queryKey: ['jobs', 'featured'],
        queryFn: () => jobService.getFeaturedJobs(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

/**
 * Hook to get similar jobs
 */
export const useSimilarJobs = (id: string) => {
    return useQuery({
        queryKey: ['jobs', 'similar', id],
        queryFn: () => jobService.getSimilarJobs(id),
        enabled: !!id,
    });
};

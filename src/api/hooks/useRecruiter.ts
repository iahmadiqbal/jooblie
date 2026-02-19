import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recruiterService } from '../services/recruiterService';
import { CreateJobRequest } from '../types/job.types';

/**
 * Hook to get recruiter's jobs
 */
export const useMyJobs = () => {
    return useQuery({
        queryKey: ['recruiter', 'jobs'],
        queryFn: () => recruiterService.getMyJobs(),
    });
};

/**
 * Hook to create new job
 */
export const useCreateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateJobRequest) => recruiterService.createJob(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruiter', 'jobs'] });
            alert('Job posted successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to create job.';
            alert(message);
        },
    });
};

/**
 * Hook to update job
 */
export const useUpdateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreateJobRequest> }) =>
            recruiterService.updateJob(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruiter', 'jobs'] });
            alert('Job updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update job.';
            alert(message);
        },
    });
};

/**
 * Hook to delete job
 */
export const useDeleteJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => recruiterService.deleteJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruiter', 'jobs'] });
            alert('Job deleted successfully.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete job.';
            alert(message);
        },
    });
};

/**
 * Hook to get job applicants
 */
export const useJobApplicants = (jobId: string) => {
    return useQuery({
        queryKey: ['recruiter', 'job', jobId, 'applicants'],
        queryFn: () => recruiterService.getJobApplicants(jobId),
        enabled: !!jobId,
    });
};

/**
 * Hook to update application status
 */
export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            applicationId,
            status,
        }: {
            applicationId: string;
            status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
        }) => recruiterService.updateApplicationStatus(applicationId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruiter', 'job'] });
            alert('Application status updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update status.';
            alert(message);
        },
    });
};

/**
 * Hook to get dashboard stats
 */
export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['recruiter', 'stats'],
        queryFn: () => recruiterService.getDashboardStats(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to close job
 */
export const useCloseJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => recruiterService.closeJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruiter', 'jobs'] });
            alert('Job closed successfully.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to close job.';
            alert(message);
        },
    });
};

/**
 * Hook to reopen job
 */
export const useReopenJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => recruiterService.reopenJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruiter', 'jobs'] });
            alert('Job reopened successfully.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to reopen job.';
            alert(message);
        },
    });
};

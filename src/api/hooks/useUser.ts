import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { UpdateProfileRequest } from '../types/user.types';

/**
 * Hook to get user profile
 */
export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => userService.getProfile(),
    });
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProfileRequest) => userService.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Profile updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update profile.';
            alert(message);
        },
    });
};

/**
 * Hook to upload profile picture
 */
export const useUploadProfilePicture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => userService.uploadProfilePicture(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Profile picture uploaded successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to upload picture.';
            alert(message);
        },
    });
};

/**
 * Hook to upload resume
 */
export const useUploadResume = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => userService.uploadResume(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Resume uploaded successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to upload resume.';
            alert(message);
        },
    });
};

/**
 * Hook to delete resume
 */
export const useDeleteResume = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => userService.deleteResume(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Resume deleted successfully.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete resume.';
            alert(message);
        },
    });
};

/**
 * Hook to get job recommendations
 */
export const useRecommendations = () => {
    return useQuery({
        queryKey: ['recommendations'],
        queryFn: () => userService.getRecommendations(),
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
};

/**
 * Hook to add experience
 */
export const useAddExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => userService.addExperience(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Experience added successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to add experience.';
            alert(message);
        },
    });
};

/**
 * Hook to update experience
 */
export const useUpdateExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => userService.updateExperience(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Experience updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update experience.';
            alert(message);
        },
    });
};

/**
 * Hook to delete experience
 */
export const useDeleteExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => userService.deleteExperience(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Experience deleted successfully.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete experience.';
            alert(message);
        },
    });
};

/**
 * Hook to add education
 */
export const useAddEducation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => userService.addEducation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Education added successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to add education.';
            alert(message);
        },
    });
};

/**
 * Hook to update education
 */
export const useUpdateEducation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => userService.updateEducation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Education updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update education.';
            alert(message);
        },
    });
};

/**
 * Hook to delete education
 */
export const useDeleteEducation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => userService.deleteEducation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            alert('Education deleted successfully.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete education.';
            alert(message);
        },
    });
};

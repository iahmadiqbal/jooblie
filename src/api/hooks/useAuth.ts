import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { LoginRequest, RegisterRequest } from '../types/auth.types';

/**
 * Hook for user login
 */
export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),
        onSuccess: (data) => {
            // Save token to localStorage
            localStorage.setItem('token', data.token);

            // Invalidate current user query to refetch
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });

            // Navigate based on user role
            const redirectPath = data.user.role === 'seeker' ? '/dashboard' : '/recruiter';
            navigate(redirectPath);
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            alert(message);
        },
    });
};

/**
 * Hook for user registration
 */
export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterRequest) => authService.register(data),
        onSuccess: () => {
            alert('Registration successful! Please login to continue.');
            navigate('/login');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            alert(message);
        },
    });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            // Clear all queries
            queryClient.clear();

            // Navigate to home
            navigate('/');
        },
    });
};

/**
 * Hook to get current authenticated user
 */
export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => authService.getCurrentUser(),
        enabled: !!localStorage.getItem('token'), // Only fetch if token exists
        retry: false,
    });
};

/**
 * Hook for forgot password
 */
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email: string) => authService.forgotPassword(email),
        onSuccess: () => {
            alert('Password reset link sent to your email.');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to send reset link.';
            alert(message);
        },
    });
};

/**
 * Hook for reset password
 */
export const useResetPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
            authService.resetPassword(token, newPassword),
        onSuccess: () => {
            alert('Password reset successful! Please login with your new password.');
            navigate('/login');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to reset password.';
            alert(message);
        },
    });
};

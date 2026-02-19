// Authentication related types

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    role: 'seeker' | 'recruiter';
    companyName?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'seeker' | 'recruiter';
    companyName?: string;
    createdAt: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}
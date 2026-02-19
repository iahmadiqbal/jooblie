// User related types

export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    bio?: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
    resumeUrl?: string;
    profilePicture?: string;
    role: 'seeker' | 'recruiter';
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
}

export interface UpdateProfileRequest {
    fullName?: string;
    phone?: string;
    location?: string;
    bio?: string;
    skills?: string[];
}

export interface JobRecommendation {
    id: string;
    job: any;
    matchScore: number;
    matchReasons: string[];
}

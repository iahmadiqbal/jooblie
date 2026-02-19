// Job related types

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salary: string;
    description: string;
    requirements: string[];
    benefits: string[];
    postedDate: string;
    deadline: string;
    companyLogo?: string;
    isRemote: boolean;
    experienceLevel: 'Entry' | 'Mid' | 'Senior';
    category: string;
}

export interface JobFilters {
    search?: string;
    location?: string;
    type?: string;
    category?: string;
    experienceLevel?: string;
    isRemote?: boolean;
    page?: number;
    limit?: number;
}

export interface JobApplication {
    id: string;
    jobId: string;
    job: Job;
    userId: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    appliedDate: string;
    coverLetter?: string;
    resumeUrl?: string;
}

export interface CreateJobRequest {
    title: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    benefits: string[];
    deadline: string;
    isRemote: boolean;
    experienceLevel: string;
    category: string;
}

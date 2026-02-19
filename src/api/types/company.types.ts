// Company related types

export interface Company {
    id: string;
    name: string;
    logo?: string;
    description: string;
    industry: string;
    size: string;
    location: string;
    website?: string;
    foundedYear?: number;
    benefits: string[];
    culture: string;
    openPositions: number;
}

export interface UpdateCompanyRequest {
    name?: string;
    description?: string;
    industry?: string;
    size?: string;
    location?: string;
    website?: string;
    foundedYear?: number;
    benefits?: string[];
    culture?: string;
}

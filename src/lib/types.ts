export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    bullets: string[];
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
    technologies: string[];
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
}

export const defaultResumeData: ResumeData = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
};

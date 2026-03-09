export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    location: string;
    linkedin: string;
    portfolio: string;
    github: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    current: boolean;
    gradeType: 'cgpa' | 'percentage';
    grade: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
    technologies: string[];
}

export type TemplateType = 'classic' | 'modern' | 'minimal';

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    categorizedSkills?: Record<string, string[]>;
    projects: Project[];
    template: TemplateType;
}

export const defaultResumeData: ResumeData = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        location: '',
        linkedin: '',
        portfolio: '',
        github: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    template: 'classic',
};

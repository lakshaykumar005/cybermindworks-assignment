export interface Job {
    id: string;
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salaryRange: {
      min: number;
      max: number;
    };
    jobDescription: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface JobFormData {
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salaryMin: number;
    salaryMax: number;
    jobDescription: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: Date;
  }
  
  export interface JobFilters {
    search: string;
    location: string;
    jobType: string;
    salaryRange: number;
  }
  
  export const JOB_TYPES = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
  ] as const;
  
  export const LOCATIONS = [
    'Chennai',
    'Bangalore',
    'Mumbai',
    'Hyderabad',
    'Pune',
    'Delhi',
    'Remote',
  ] as const;
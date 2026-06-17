
const KATA_API_URL = 'https://kata-jobs.onrender.com/api/jobs';

interface KataJobsResponse {
  success: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  jobs: KataJob[];
}

export interface KataJob {
  id: number;
  company_name: string;
  name: string;
  city: string;
  salary: string;
  published_at: string;
  short_description: string;
  space: string;
  skills: string;
  experience: string;
  description?: string; 
  about_company?: string; 
}

export const getVacancies = async (page: number = 1, limit: number = 100) => {
  const response = await fetch(`${KATA_API_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: KataJobsResponse = await response.json();
    
    return {
      jobs: data.jobs,
      totalPages: data.pagination.totalPages,
    };
  };

export const getVacancyById = async (id: string): Promise<KataJob> => {
  const response = await fetch(`${KATA_API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.success && data.error) {
    throw new Error(data.error);
  }
  
  return data.job;
};


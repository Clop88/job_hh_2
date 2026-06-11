interface Vacancy {
  id: string;
  name: string;
  salary: {
    from: number | null;
    to: number | null;
    currency: string;
    gross: boolean;
  } | null;
  experience: {
    id: string;
    name: string;
  };
  employment: {
    id: string;
    name: string;
  };
  schedule: {
    id: string;
    name: string;
  } | null;
  employer: {
    id: string;
    name: string;
    url: string | null;
    alternate_url?: string;
    logo_urls?: {
      '90'?: string;
      '240'?: string;
      original?: string;
    };
    trusted?: boolean;
  };
  area: {
    id: string;
    name: string;
    url?: string;
  };
  alternate_url: string;
  apply_alternate_url?: string;
  snippet: {
    requirement: string;
    responsibility: string;
  };
  key_skills: Array<{ name: string }>;
  published_at?: string;
  type?: {
    id: string;
    name: string;
  };
  professional_roles?: Array<{
    id: string;
    name: string;
  }>;
  description?: string;
  about_company?: string;
}

interface VacanciesResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
}

interface VacancyDetailResponse extends Vacancy {
  description: string;
  about_company: string;
}
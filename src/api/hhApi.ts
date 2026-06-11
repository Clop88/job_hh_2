import { mockVacanciesResponse } from './mockData';

const API_URL = 'https://api.hh.ru/vacancies';
const KATA_API_URL = 'https://kata-jobs.onrender.com/api/jobs';

interface FetchParams {
  [key: string]: string;
}

export const getVacancies = async (
  page: number = 0,
  perPage: number = 6,
  text: string = '',
  area: string = '',
  skills: string[] = []
): Promise<VacanciesResponse & { isMock?: boolean }> => {
  const params: FetchParams = {
    page: page.toString(),
    per_page: perPage.toString(),
    industry: '7',
    professional_role: '96',
  };

  if (text) {
    params.text = text;
    params.search_field = 'name,company';
  }

  if (area) {
    params.area = area;
  }

  if (skills.length > 0) {
    const skillsText = skills.join(' AND ');
    if (params.text) {
      params.text = `${params.text} ${skillsText}`;
    } else {
      params.text = skillsText;
    }
  }

  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${queryString}`);

    if (response.status === 403) {
      console.warn('API вернул 403 Forbidden. Используем моковые данные.');
      const filteredData = filterMockData(page, perPage, text, area, skills);
      return { ...filteredData, isMock: true };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { ...data, isMock: false };
  } catch (error) {
    console.error('Ошибка при запросе к API:', error);
    const filteredData = filterMockData(page, perPage, text, area, skills);
    return { ...filteredData, isMock: true };
  }
};

const filterMockData = (
  page: number,
  perPage: number,
  text: string,
  area: string,
  skills: string[]
): VacanciesResponse => {
  let filtered = [...mockVacanciesResponse.items];

  if (text) {
    const lowerText = text.toLowerCase();
    filtered = filtered.filter(
      (item: Vacancy) =>
        item.name.toLowerCase().includes(lowerText) ||
        item.employer.name.toLowerCase().includes(lowerText) ||
        item.snippet.requirement.toLowerCase().includes(lowerText)
    );
  }

  if (area) {
    const areaMap: { [key: string]: string } = {
      '1': 'Москва',
      '2': 'Санкт-Петербург',
      '3': 'Барнаул',
    };
    const cityName = areaMap[area];
    if (cityName) {
      filtered = filtered.filter((item: Vacancy) => item.area.name === cityName);
    }
  }

  if (skills.length > 0) {
    filtered = filtered.filter((item: Vacancy) =>
      skills.some((skill: string) =>
        item.key_skills.some((ks: { name: string }) => 
          ks.name.toLowerCase() === skill.toLowerCase()
      )
     )
    );
  }

  const total = filtered.length;
  const start = page * perPage;
  const end = start + perPage;
  const paginatedItems = filtered.slice(start, end);

  return {
    ...mockVacanciesResponse,
    found: total,
    pages: Math.ceil(total / perPage),
    page: page,
    per_page: perPage,
    items: paginatedItems,
  };
};

export const getVacancyById = async (id: string): Promise<VacancyDetailResponse> => {
  const response = await fetch(`${KATA_API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.success && data.error) {
    throw new Error(data.error);
  }
  
  return data;
};
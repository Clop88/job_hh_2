import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { VacancyCard } from '../components/VacancyCard';

const mockVacancy: Vacancy = {
  id: '123',
  name: 'Frontend Developer',
  salary: {
    from: 100000,
    to: 150000,
    currency: 'RUR',
    gross: true,
  },
  experience: {
    id: 'between1And3',
    name: '1-3 года',
  },
  employment: {
    id: 'full',
    name: 'Полная занятость',
  },
  schedule: {
    id: 'remote',
    name: 'Удаленная работа',
  },
  employer: {
    id: '1',
    name: 'Tech Company',
    url: null,
  },
  area: {
    id: '1',
    name: 'Москва',
  },
  alternate_url: 'https://hh.ru/vacancy/123',
  snippet: {
    requirement: 'React, TypeScript',
    responsibility: 'Разработка UI',
  },
  key_skills: [{ name: 'React' }, { name: 'TypeScript' }],
};

describe('VacancyCard', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('отображает название вакансии', () => {
    renderWithRouter(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('отображает зарплату в правильном формате', () => {
    renderWithRouter(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('100 000 RUR – 150 000 RUR')).toBeInTheDocument();
  });

  it('отображает название компании', () => {
    renderWithRouter(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('Tech Company')).toBeInTheDocument();
  });

  it('отображает город', () => {
    renderWithRouter(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });

  it('отображает ссылку на детальную страницу', () => {
    renderWithRouter(<VacancyCard vacancy={mockVacancy} />);
    const link = screen.getByRole('link', { name: /Frontend Developer/i });
    expect(link).toHaveAttribute('href', '/vacancies/123');
  });

  it('отображает "Можно удалённо" для удаленной работы', () => {
    renderWithRouter(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('Можно удалённо')).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { VacancyCard } from '../components/VacancyCard';
import type { KataJob } from '../api/hhApi';

const mockVacancy: KataJob = {
  id: 1,
  name: 'Frontend Developer',
  salary: '100000',
  experience: '1-3 года',
  company_name: 'Tech Company',
  city: 'Москва',
  space: 'remote',
  skills: 'React, TypeScript',
  short_description: 'Разработка UI',
  published_at: '2024-01-01',
  description: 'Полное описание',
  about_company: 'О компании',
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
    expect(screen.getByText('100 000 ₽')).toBeInTheDocument();
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
    expect(link).toHaveAttribute('href', '/vacancies/1');
  });

  it('отображает "Удалённо" для удаленной работы', () => {
    renderWithRouter(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('Удалённо')).toBeInTheDocument();
  });
});
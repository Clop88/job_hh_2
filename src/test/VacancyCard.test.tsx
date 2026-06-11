import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VacancyCard } from '../components/VacancyCard';
import type { Vacancy } from '../types/vacancy';

describe('VacancyCard', () => {
     const mockVacancy: Vacancy = {
    id: '1',
    name: 'Frontend разработчик',
    salary: {
      from: 150000,
      to: 200000,
      currency: 'RUB',
      gross: false,
    },
    experience: {
      id: '1',
      name: '1-3 года',
    },
    employment: {
      id: '1',
      name: 'Полная занятость',
    },
    schedule: {
      id: '1',
      name: 'Удаленная работа',
    },
    employer: {
      id: '1',
      name: 'Kata Academy',
      url: null,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    alternate_url: 'https://hh.ru/vacancy/1',
    snippet: {
      requirement: 'Требования: React, TypeScript',
      responsibility: 'Обязанности: разработка',
    },
    key_skills: [{ name: 'React' }, { name: 'TypeScript' }],
  };

  const mockVacancyWithoutSalary: Vacancy = {
    ...mockVacancy,
    salary: null,
  };

    it('отображает название вакансии', () => {
    render(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
  });

  it('отображает зарплатную вилку', () => {
    render(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText('150 000 RUB – 200 000 RUB')).toBeInTheDocument();
  });

  it('отображает текст "Зарплата не указана", если salary = null', () => {
    render(<VacancyCard vacancy={mockVacancyWithoutSalary} />);
    expect(screen.getByText('Зарплата не указана')).toBeInTheDocument();
  });
});
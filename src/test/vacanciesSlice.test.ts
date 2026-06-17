import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer, {
  setCurrentPage,
  setSearchText,
  setSelectedCity,
  setSkills,
  clearSelectedVacancy,
  selectVacancies,
  selectCurrentPage,
  selectSearchText,
} from '../store/vacanciesSlice';
import type { KataJob } from '../api/hhApi';


vi.mock('../api/hhApi', () => ({
  getVacancies: vi.fn(),
  getVacancyById: vi.fn(),
}));

describe('vacanciesSlice', () => {
  describe('редьюсеры', () => {
    const initialState = {
      vacancies: [] as KataJob[],
      loading: false,
      totalPages: 0,
      currentPage: 1,
      searchText: '',
      selectedCity: null as string | null,
      skills: [] as string[],
      selectedVacancy: null as KataJob | null,
      loadingDetail: false,
      detailError: null as string | null,
    };

    it('обрабатывает setCurrentPage', () => {
      const nextState = vacanciesReducer(initialState, setCurrentPage(3));
      expect(nextState.currentPage).toBe(3);
    });

    it('обрабатывает setSearchText и сбрасывать страницу', () => {
      const stateWithPage = { ...initialState, currentPage: 5 };
      const nextState = vacanciesReducer(stateWithPage, setSearchText('React'));
      expect(nextState.searchText).toBe('React');
      expect(nextState.currentPage).toBe(1);
    });

    it('обрабатывает setSelectedCity и сбрасывать страницу', () => {
      const stateWithPage = { ...initialState, currentPage: 3 };
      const nextState = vacanciesReducer(stateWithPage, setSelectedCity('1'));
      expect(nextState.selectedCity).toBe('1');
      expect(nextState.currentPage).toBe(1);
    });

    it('обрабатывает setSkills и сбрасывать страницу', () => {
      const stateWithPage = { ...initialState, currentPage: 2 };
      const nextState = vacanciesReducer(stateWithPage, setSkills(['React', 'TypeScript']));
      expect(nextState.skills).toEqual(['React', 'TypeScript']);
      expect(nextState.currentPage).toBe(1);
    });

    it('обрабатывает clearSelectedVacancy', () => {
      const mockJob: KataJob = {
        id: 1,
        company_name: 'Test Company',
        name: 'Test Job',
        city: 'Moscow',
        salary: '100000',
        space: 'office',
        skills: 'React',
        experience: '3-5 years',
        short_description: 'Test',
        published_at: '2024-01-01',
        description: 'Description',
        about_company: 'About',
      };
      
      const stateWithVacancy = { 
        ...initialState, 
        selectedVacancy: mockJob,
        detailError: 'Some error',
      };
      
      const nextState = vacanciesReducer(stateWithVacancy, clearSelectedVacancy());
      expect(nextState.selectedVacancy).toBeNull();
      expect(nextState.detailError).toBeNull();
    });
  });

  describe('селекторы', () => {
    const mockJob: KataJob = {
      id: 1,
      company_name: 'Test Company',
      name: 'Test Job',
      city: 'Moscow',
      salary: '100000',
      space: 'office',
      skills: 'React, TypeScript',
      experience: '3-5 years',
      short_description: 'Test description',
      published_at: '2024-01-01',
    };

    const store = configureStore({
      reducer: {
        vacancies: vacanciesReducer,
      },
      preloadedState: {
        vacancies: {
          vacancies: [mockJob],
          loading: false,
          totalPages: 10,
          currentPage: 2,
          searchText: 'React',
          selectedCity: '1',
          skills: ['TypeScript'],
          selectedVacancy: null,
          loadingDetail: false,
          detailError: null,
        },
      },
    });

    it('selectVacancies возвращает список вакансий', () => {
      const state = store.getState();
      expect(selectVacancies(state)).toEqual([mockJob]);
    });

    it('selectCurrentPage возвращает текущую страницу', () => {
      const state = store.getState();
      expect(selectCurrentPage(state)).toBe(2);
    });

    it('selectSearchText возвращает текст поиска', () => {
      const state = store.getState();
      expect(selectSearchText(state)).toBe('React');
    });
  });
});
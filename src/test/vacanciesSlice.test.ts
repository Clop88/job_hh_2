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


vi.mock('../../api/hhApi', () => ({
  getVacancies: vi.fn(),
  getVacancyById: vi.fn(),
}));

describe('vacanciesSlice', () => {
  describe('редьюсеры', () => {
    const initialState = {
      vacancies: [] as Vacancy[],  // ← тип Vacancy глобальный
      loading: false,
      totalPages: 0,
      currentPage: 1,
      searchText: '',
      selectedCity: null as string | null,
      skills: [] as string[],
      isMockData: false,
      selectedVacancy: null as VacancyDetailResponse | null,  // ← тип глобальный
      loadingDetail: false,
      detailError: null as string | null,
    };

    it('должен обрабатывать setCurrentPage', () => {
      const nextState = vacanciesReducer(initialState, setCurrentPage(3));
      expect(nextState.currentPage).toBe(3);
    });

    it('должен обрабатывать setSearchText и сбрасывать страницу', () => {
      const stateWithPage = { ...initialState, currentPage: 5 };
      const nextState = vacanciesReducer(stateWithPage, setSearchText('React'));
      expect(nextState.searchText).toBe('React');
      expect(nextState.currentPage).toBe(1);
    });

    it('должен обрабатывать setSelectedCity и сбрасывать страницу', () => {
      const stateWithPage = { ...initialState, currentPage: 3 };
      const nextState = vacanciesReducer(stateWithPage, setSelectedCity('1'));
      expect(nextState.selectedCity).toBe('1');
      expect(nextState.currentPage).toBe(1);
    });

    it('должен обрабатывать setSkills и сбрасывать страницу', () => {
      const stateWithPage = { ...initialState, currentPage: 2 };
      const nextState = vacanciesReducer(stateWithPage, setSkills(['React', 'TypeScript']));
      expect(nextState.skills).toEqual(['React', 'TypeScript']);
      expect(nextState.currentPage).toBe(1);
    });

    it('должен обрабатывать clearSelectedVacancy', () => {
      const stateWithVacancy = { 
        ...initialState, 
        selectedVacancy: { id: '123' } as VacancyDetailResponse,
        detailError: 'Some error',
      };
      
      const nextState = vacanciesReducer(stateWithVacancy, clearSelectedVacancy());
      expect(nextState.selectedVacancy).toBeNull();
      expect(nextState.detailError).toBeNull();
    });
  });

  describe('селекторы', () => {
    const mockVacancy: Vacancy = {
      id: '1',
      name: 'Test Vacancy',
      salary: null,
      experience: { id: '1', name: '1-3 года' },
      employment: { id: '1', name: 'Полная занятость' },
      schedule: null,
      employer: { id: '1', name: 'Test Company', url: null },
      area: { id: '1', name: 'Москва' },
      alternate_url: 'https://test.com',
      snippet: { requirement: 'Test', responsibility: 'Test' },
      key_skills: [],
    };

    const store = configureStore({
      reducer: {
        vacancies: vacanciesReducer,
      },
      preloadedState: {
        vacancies: {
          vacancies: [mockVacancy],
          loading: false,
          totalPages: 10,
          currentPage: 2,
          searchText: 'React',
          selectedCity: '1',
          skills: ['TypeScript'],
          isMockData: false,
          selectedVacancy: null,
          loadingDetail: false,
          detailError: null,
        },
      },
    });

    it('selectVacancies должен возвращать список вакансий', () => {
      const state = store.getState();
      expect(selectVacancies(state)).toEqual([mockVacancy]);
    });

    it('selectCurrentPage должен возвращать текущую страницу', () => {
      const state = store.getState();
      expect(selectCurrentPage(state)).toBe(2);
    });

    it('selectSearchText должен возвращать текст поиска', () => {
      const state = store.getState();
      expect(selectSearchText(state)).toBe('React');
    });
  });
});
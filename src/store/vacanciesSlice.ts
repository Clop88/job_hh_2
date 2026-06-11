import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getVacancies, getVacancyById } from '../api/hhApi';
import type { RootState } from './index';

interface VacanciesState {
  vacancies: Vacancy[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  searchText: string;
  selectedCity: string | null;
  skills: string[];
  isMockData: boolean;
  selectedVacancy: VacancyDetailResponse | null;
  loadingDetail: boolean;
  detailError: string | null;
}

const initialState: VacanciesState = {
  vacancies: [],
  loading: false,
  totalPages: 0,
  currentPage: 1,
  searchText: '',
  selectedCity: null,
  skills: ['TypeScript', 'React', 'Redux', 'Python'],
  isMockData: false,
  selectedVacancy: null,
  loadingDetail: false,
  detailError: null,
};

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
    const state = getState() as { vacancies: VacanciesState };
    const { currentPage, searchText, selectedCity, skills } = state.vacancies;
    const response = await getVacancies(
      currentPage - 1,
      6,
      searchText,
      selectedCity || '',
      skills
    );
    return response;
  }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки вакансий');
    }
  }
 );

export const fetchVacancyById = createAsyncThunk(
  'vacancies/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getVacancyById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки вакансии');
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.currentPage = 1;
    },
    setSelectedCity: (state, action: PayloadAction<string | null>) => {
      state.selectedCity = action.payload;
      state.currentPage = 1;
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
      state.currentPage = 1;
    },
    clearSelectedVacancy: (state) => {
      state.selectedVacancy = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies = action.payload.items;
        state.totalPages = Math.min(action.payload.pages, 50);
        state.isMockData = action.payload.isMock || false;
      })
      .addCase(fetchVacancies.rejected, (state) => {
        state.loading = false;
        state.vacancies = [];
        state.totalPages = 0;
      })
      
      .addCase(fetchVacancyById.pending, (state) => {
        state.loadingDetail = true;
        state.selectedVacancy = null;
        state.detailError = null;
      })
      .addCase(fetchVacancyById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedVacancy = action.payload;
      })
      .addCase(fetchVacancyById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.selectedVacancy = null;
        state.detailError = action.payload as string;
      });
  },
});

export const selectVacanciesState = (state: RootState) => state.vacancies;
export const selectVacancies = (state: RootState) => state.vacancies.vacancies;
export const selectLoading = (state: RootState) => state.vacancies.loading;
export const selectTotalPages = (state: RootState) => state.vacancies.totalPages;
export const selectCurrentPage = (state: RootState) => state.vacancies.currentPage;
export const selectSearchText = (state: RootState) => state.vacancies.searchText;
export const selectSelectedCity = (state: RootState) => state.vacancies.selectedCity;
export const selectSkills = (state: RootState) => state.vacancies.skills;
export const selectIsMockData = (state: RootState) => state.vacancies.isMockData;
export const selectSelectedVacancy = (state: RootState) => state.vacancies.selectedVacancy;
export const selectLoadingDetail = (state: RootState) => state.vacancies.loadingDetail;
export const selectDetailError = (state: RootState) => state.vacancies.detailError;

export const {
  setCurrentPage,
  setSearchText,
  setSelectedCity,
  setSkills,
  clearSelectedVacancy,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;


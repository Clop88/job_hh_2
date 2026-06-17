import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import { Header } from '../components/Header';
import vacanciesReducer from '../store/vacanciesSlice';



const createTestStore = () => {
  return configureStore({
    reducer: {
      vacancies: vacanciesReducer,
    },
  });
};

describe('Header', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    const store = createTestStore();
    return render(
      <Provider store={store}>
        <MemoryRouter>
          {component}
        </MemoryRouter>
      </Provider>
    );
  };

  it('отображает логотип с текстом "hh"', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('hh')).toBeInTheDocument();
  });

  it('отображает текст ".FrontEnd"', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('отображает пункт меню "Вакансии FE"', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
  });

  it('отображает пункт меню "Обо мне"', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });
}); 
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header', () => {
  it('отображает логотип с текстом "hh"', () => {
    render(<Header />);
    expect(screen.getByText('hh')).toBeInTheDocument();
  });

  it('отображает текст ".FrontEnd"', () => {
    render(<Header />);
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('отображает пункт меню "Вакансии FE"', () => {
    render(<Header />);
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
  });

  it('отображает пункт меню "Обо мне"', () => {
    render(<Header />);
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });
});
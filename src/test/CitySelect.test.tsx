import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CitySelect } from '../components/CitySelect';

describe('CitySelect', () => {
  const cities = ['Все города', 'Москва', 'Санкт-Петербург'];

  it('отображает все варианты городов', () => {
    const mockOnChange = vi.fn();
    render(<CitySelect value={null} onChange={mockOnChange} />);
    
    cities.forEach(city => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('отображает выбранное значение "Барнаул"', () => {
    const mockOnChange = vi.fn();
    render(<CitySelect value="3" onChange={mockOnChange} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('3');
  });

  it('вызывает onChange при выборе города', async () => {
    const mockOnChange = vi.fn();
    render(<CitySelect value={null} onChange={mockOnChange} />);
    
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '1');
    
    expect(mockOnChange).toHaveBeenCalledWith('1');
  });
});
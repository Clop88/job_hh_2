import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../components/SearchBar';

describe('SearchBar', () => {
  it('отображает поле ввода с правильным placeholder', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Должность или название компании');
    expect(input).toBeInTheDocument();
  });

  it('отображает введённое значение', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="React разработчик" onChange={mockOnChange} />);
    
    const input = screen.getByDisplayValue('React разработчик');
    expect(input).toBeInTheDocument();
  });

   it('не вызывает onChange при вводе текста', async () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Должность или название компании');
    await userEvent.type(input, 'JavaScript');
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
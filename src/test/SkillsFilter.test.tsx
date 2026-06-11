import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillsFilter } from '../components/SkillsFilter';

describe('SkillsFilter', () => {
  const initialSkills = ['TypeScript', 'React', 'Redux'];

  it('отображает начальные навыки', () => {
    const mockOnChange = vi.fn();
    render(<SkillsFilter skills={initialSkills} onSkillsChange={mockOnChange} />);
    
    initialSkills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('удаляет навык при нажатии на крестик', async () => {
    const mockOnChange = vi.fn();
    render(<SkillsFilter skills={initialSkills} onSkillsChange={mockOnChange} />);
    
    const removeButtons = screen.getAllByText('×');
    await userEvent.click(removeButtons[0]);
    
    expect(mockOnChange).toHaveBeenCalledWith(['React', 'Redux']);
  });

  it('добавляет новый навык при нажатии на кнопку "+"', async () => {
    const mockOnChange = vi.fn();
    render(<SkillsFilter skills={initialSkills} onSkillsChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Навык');
    await userEvent.type(input, 'Vue');
    
    const addButton = screen.getByRole('button', { name: '' });
    await userEvent.click(addButton);
    
    expect(mockOnChange).toHaveBeenCalledWith([...initialSkills, 'Vue']);
  });
});
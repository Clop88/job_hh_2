import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './SkillsFilter.module.css';

interface SkillsFilterProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export const SkillsFilter = ({ skills, onSkillsChange }: SkillsFilterProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && trimmed.length <= 30 && !skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      onSkillsChange([...skills, trimmed]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    onSkillsChange(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className={styles.skillsFilter}>
      <label className={styles.label}>Ключевые навыки</label>
      <div className={styles.skillsList}>
        <input
          type="text"
          className={styles.skillInput}
          placeholder="Навык"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className={styles.addBtn} onClick={handleAddSkill}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8L15 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M8 15L22 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
        {skills.map((skill) => (
          <div key={skill} className={styles.skillTag}>
            <span>{skill}</span>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => handleRemoveSkill(skill)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
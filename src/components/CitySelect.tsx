import styles from './CitySelect.module.css';

interface CitySelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const cities = [
  { value: '', label: 'Все города' },
  { value: '1', label: 'Москва' },
  { value: '2', label: 'Санкт-Петербург' },
  { value: '3', label: 'Барнаул' },
];

export const CitySelect = ({ value, onChange }: CitySelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newValue = e.target.value === '' ? null : e.target.value;
    onChange(newValue);
  };

  const selectValue = value === null ? '' : value;

  return (
    <select 
      className={styles.select} 
      value={selectValue} 
      onChange={handleChange}
      aria-label="Выбор города"
    >
      {cities.map((city) => (
        <option key={city.value} value={city.value}>
          {city.label}
        </option>
      ))}
    </select>
  );
};
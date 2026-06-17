import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setSearchText, setSelectedCity, setSkills, setCurrentPage } from '../store/vacanciesSlice';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleResetFilters = () => {
    dispatch(setSearchText(''));
    dispatch(setSelectedCity(null));
    dispatch(setSkills([]));
    dispatch(setCurrentPage(1));
    navigate('/vacancies');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>hh</div>
          <span className={styles.logoText}>.FrontEnd</span>
        </div>
        <div className={styles.centerMenu}>
          <span onClick={handleResetFilters} className={styles.menuItem}>
            Вакансии FE
          </span>
        </div>
        <div className={styles.rightMenu}>
          <span className={styles.dot}>•</span>
          <a href="/about" className={styles.userLink}>
          <div className={styles.userIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 20V19C5 15.6863 7.68629 13 11 13H13C16.3137 13 19 15.6863 19 19V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={styles.aboutText}>Обо мне</span>
          </a>
        </div>
        </div>
      </header>
  );
};
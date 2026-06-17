import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cardStyles from '../components/VacancyCard.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Header } from '../components/Header';
import { 
  fetchVacancyById, 
  selectSelectedVacancy, 
  selectLoadingDetail, 
  selectDetailError,
  clearSelectedVacancy 
} from '../store/vacanciesSlice';
import styles from './VacancyDetailPage.module.css';

export const VacancyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [timeoutError, setTimeoutError] = useState(false);
  
  const vacancy = useAppSelector(selectSelectedVacancy);
  const loading = useAppSelector(selectLoadingDetail);
  const error = useAppSelector(selectDetailError);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setTimeoutError(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (id) {
      dispatch(fetchVacancyById(id));
    }
    
    return () => {
      dispatch(clearSelectedVacancy());
    };
  }, [dispatch, id]);

  const formatSalary = (salary?: string) => {
    if (!salary) return 'Зарплата не указана';
    return `${Number(salary).toLocaleString()} ₽`;
  };

  const formatWorkFormat = (space?: string) => {
    if (space === 'hybrid') return 'Гибрид';
    if (space === 'remote') return 'Удалённо';
    return 'Офис';
  };

  const getWorkFormatClass = (space?: string) => {
  if (space === 'remote') return 'tagRemote';
  if (space === 'hybrid') return 'tagHybrid';
  return 'tagOffice';
};

  if (loading && !timeoutError) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader} />
        <p>Загрузка вакансии...</p>
      </div>
    );
  }

  if (timeoutError || error) {
    return (
      <div className={styles.errorWrapper}>
        <h2>Ошибка загрузки вакансии</h2>
        <p>{error || 'Сервер временно недоступен. Попробуйте позже.'}</p>
        <button onClick={() => navigate('/vacancies')} className={styles.backBtn}>
          Вернуться к списку
        </button>
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className={styles.errorWrapper}>
        <h2>Вакансия не найдена</h2>
        <p>Возможно, она была удалена или перемещена</p>
        <button onClick={() => navigate('/vacancies')} className={styles.backBtn}>
          Вернуться к списку
        </button>
      </div>
    );
  }

 return (
  <>
      <Header />
    <div className={styles.container}>
      <button onClick={() => navigate('/vacancies')} className={styles.backBtn}>
        ← Назад к вакансиям
      </button>

      <div className={styles.card}>
        <div className={styles.titleVacancy}>
        <h1 className={styles.title}>{vacancy.name}</h1>

        <div className={styles.salaryRow}>
          <span className={styles.salary}>{formatSalary(vacancy.salary)}</span>
          <span className={styles.experience}>Опыт: {vacancy.experience || 'Опыт не указан'}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.company}> {vacancy.company_name || 'Компания не указана'}</span>
          <span className={`${cardStyles.tag} ${cardStyles[getWorkFormatClass(vacancy.space)]}`}>
            {formatWorkFormat(vacancy.space)}
          </span>
          <span className={styles.city}> {vacancy.city || 'Город не указан'}</span>
        </div>

        
        </div>
        <div className={styles.titleCompany}>

        {vacancy.about_company && (
          <div className={styles.section}>
            <h3>Компания:</h3>
            <div className={styles.htmlContent}>
              {vacancy.about_company}
            </div>
          </div>
        )}

        {vacancy.description && (
          <div className={styles.section}>
            <h3>О вакансии:</h3>
            <div className={styles.htmlContent}>
              {vacancy.description}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
    </>
  );
};
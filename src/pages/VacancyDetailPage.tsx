import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
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
  
  const vacancy = useAppSelector(selectSelectedVacancy);
  const loading = useAppSelector(selectLoadingDetail);
  const error = useAppSelector(selectDetailError);

  useEffect(() => {
    if (id) {
      dispatch(fetchVacancyById(id));
    }
    
    return () => {
      dispatch(clearSelectedVacancy());
    };
  }, [dispatch, id]);

  const formatSalary = (salary: Vacancy['salary']) => {
    if (!salary) return 'Зарплата не указана';
    
    const from = salary.from !== null && salary.from !== undefined 
      ? `${salary.from.toLocaleString()} ${salary.currency}` 
      : '';
    const to = salary.to !== null && salary.to !== undefined 
      ? `${salary.to.toLocaleString()} ${salary.currency}` 
      : '';
    
    if (from && to) return `${from} – ${to}`;
    if (from) return `от ${from}`;
    if (to) return `до ${to}`;
    return 'Зарплата не указана';
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <h2>Ошибка загрузки вакансии</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/vacancies')} className={styles.backBtn}>
          Вернуться к списку
        </button>
      </div>
    );
  }

  if (!vacancy) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/vacancies')} className={styles.backBtn}>
        ← Назад к вакансиям
      </button>

      <div className={styles.card}>
        <h1 className={styles.title}>{vacancy.name}</h1>

        <div className={styles.salaryRow}>
          <span className={styles.salary}>{formatSalary(vacancy.salary)}</span>
          <span className={styles.experience}>{vacancy.experience?.name || 'Опыт не указан'}</span>
        </div>

        <div className={styles.infoRow}>
          <span>🏢 {vacancy.employer?.name || 'Компания не указана'}</span>
          <span>📍 {vacancy.area?.name || 'Город не указан'}</span>
          <span>💼 {vacancy.employment?.name || 'Тип занятости не указан'}</span>
          <span>⏰ {vacancy.schedule?.name || 'График не указан'}</span>
        </div>

        {vacancy.key_skills && vacancy.key_skills.length > 0 && (
          <div className={styles.skillsSection}>
            <h3>Ключевые навыки:</h3>
            <div className={styles.skillsList}>
              {vacancy.key_skills.map((skill: { name: string }) => (
                <span key={skill.name} className={styles.skillTag}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {vacancy.description && (
          <div className={styles.section}>
            <h3>Описание вакансии:</h3>
            <div 
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{ __html: vacancy.description }}
            />
          </div>
        )}

        {vacancy.about_company && (
          <div className={styles.section}>
            <h3>О компании:</h3>
            <div 
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{ __html: vacancy.about_company }}
            />
          </div>
        )}

        <div className={styles.actions}>
          <a
            href={vacancy.alternate_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.respondBtn}
          >
            Откликнуться на hh.ru
          </a>
        </div>
      </div>
    </div>
  );
};
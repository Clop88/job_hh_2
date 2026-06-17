
import styles from './VacancyCard.module.css';
import { Link } from 'react-router-dom';
import type { KataJob } from '../api/hhApi';

interface VacancyCardProps {
  vacancy: KataJob;
}

const getWorkFormatTag = (space?: string) => {
  if (space === 'remote') {
    return { label: 'Удалённо', className: 'tagRemote' };
  }
  if (space === 'hybrid') {
    return { label: 'Гибрид', className: 'tagHybrid' };
  }
  return { label: 'Офис', className: 'tagOffice' };
};

const formatSalary = (salary?: string) => {
  if (!salary) return 'Зарплата не указана';
  return `${Number(salary).toLocaleString()} ₽`;
};

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  const workFormat = getWorkFormatTag(vacancy.space);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <Link to={`/vacancies/${vacancy.id}`} className={styles.vacancyLink}>
            <h3 className={styles.vacancyTitle}>{vacancy.name}</h3>
          </Link>

          <div className={styles.salaryRow}>
            <span className={styles.salary}>{formatSalary(vacancy.salary)}</span>
            <span className={styles.experience}>{vacancy.experience || 'Опыт не указан'}</span>
          </div>

          <p className={styles.company}>{vacancy.company_name || 'Компания не указана'}</p>

          <div className={styles.tagsRow}>
            <span className={`${styles.tag} ${styles[workFormat.className]}`}>
              {workFormat.label}
            </span>
          </div>

          <p className={styles.city}>{vacancy.city || 'Город не указан'}</p>
        </div>

        <div className={styles.cardActions}>
          <Link to={`/vacancies/${vacancy.id}`} className={styles.watchBtn}>
            Смотреть вакансию
          </Link>
          <button
            onClick={() => window.open(`https://clop88.github.io/job_hh_2/#/vacancies/${vacancy.id}`, '_blank')}
          >
          </button>
        </div>
      </div>
    </div>
  );
};
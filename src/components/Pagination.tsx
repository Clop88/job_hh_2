import styles from './Pagination.module.css';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ total, current, onChange }: PaginationProps) => {
  if (total <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 3; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      }
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowBtn}
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
      >
        ‹
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`${styles.pageBtn} ${page === current ? styles.active : ''}`}
          onClick={() => typeof page === 'number' && onChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.arrowBtn}
        onClick={() => onChange(current + 1)}
        disabled={current === total}
      >
        ›
      </button>
    </div>
  );
};
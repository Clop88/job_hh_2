import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Container } from '@mantine/core';
import { 
  fetchVacancies, 
  setCurrentPage, 
  setSearchText, 
  setSelectedCity, 
  setSkills,
  selectVacancies,
  selectLoading,
  selectTotalPages,
  selectCurrentPage,
  selectSearchText,
  selectSelectedCity,
  selectSkills,
  selectIsMockData,
} from '../store/vacanciesSlice';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { CitySelect } from '../components/CitySelect';
import { SkillsFilter } from '../components/SkillsFilter';
import { VacancyCard } from '../components/VacancyCard';
import { Pagination } from '../components/Pagination';
import styles from './VacanciesPage.module.css';

export const VacanciesPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);
  const vacancies = useAppSelector(selectVacancies);
  const loading = useAppSelector(selectLoading);
  const totalPages = useAppSelector(selectTotalPages);
  const currentPage = useAppSelector(selectCurrentPage);
  const searchText = useAppSelector(selectSearchText);
  const selectedCity = useAppSelector(selectSelectedCity);
  const skills = useAppSelector(selectSkills);
  const isMockData = useAppSelector(selectIsMockData);

  
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCity = searchParams.get('city');
    const urlSkills = searchParams.get('skills');
    const urlPage = searchParams.get('page');
    
    if (urlSearch !== null) {
      dispatch(setSearchText(urlSearch));
    }
    
    if (urlCity !== null) {
      dispatch(setSelectedCity(urlCity));
    }
    
    if (urlSkills !== null) {
      const skillsArray = urlSkills.split(',');
        dispatch(setSkills(skillsArray));
    }
    
    if (urlPage !== null) {
      dispatch(setCurrentPage(parseInt(urlPage)));
    }

    isFirstRender.current = false;
    // eslint-disable-next-line
  }, []);

  
  useEffect(() => {
    if (isFirstRender.current) return;

    const params: Record<string, string> = {};
    
    if (searchText) params.search = searchText;
    if (selectedCity) params.city = selectedCity;
    if (skills.length > 0) params.skills = skills.join(',');
    if (currentPage > 1) params.page = currentPage.toString();
    
    setSearchParams(params, { replace: true });
  }, [searchText, selectedCity, skills, currentPage, setSearchParams]);

  
  useEffect(() => {
    if (isFirstRender.current) return;

    dispatch(fetchVacancies());
  }, [dispatch, currentPage, searchText, selectedCity, skills]);

  const handleSearchChange = (value: string) => dispatch(setSearchText(value));
  const handleCityChange = (value: string | null) => dispatch(setSelectedCity(value));
  const handleSkillsChange = (newSkills: string[]) => dispatch(setSkills(newSkills));
  const handlePageChange = (page: number) => dispatch(setCurrentPage(page));

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.divider}></div>
      <Container className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            <h1 className={styles.title}>Список вакансий</h1>
            <p className={styles.subtitle}>по профессии Frontend-разработчик</p>
          </div>
          <div className={styles.filtersRow}>
            <SearchBar value={searchText} onChange={handleSearchChange} />
          </div>
        </div>

        {isMockData && (
          <div className={styles.warningBanner}>
            <span>⚠️</span>
            <span>Сервис временно недоступен.</span>
          </div>
        )}

        <div className={styles.main}>
          <div className={styles.leftsection}>
            <div className={styles.moduleskills}>
              <SkillsFilter skills={skills} onSkillsChange={handleSkillsChange} />
            </div>
            <div className={styles.modulecity}>
              <CitySelect value={selectedCity} onChange={handleCityChange} />
            </div>
          </div>

          <div className={styles.rightsection}>
            {loading ? (
              <div className={styles.loaderWrapper}>
                <div className={styles.loader} />
              </div>
            ) : vacancies.length === 0 ? (
              <div className={styles.emptyWrapper}>
                <p className={styles.emptyText}>Вакансии не найдены</p>
                <p className={styles.emptySubtext}>Попробуйте изменить параметры поиска</p>
              </div>
            ) : (
              <>
                <div className={styles.vacanciesList}>
                  {vacancies.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <Pagination total={totalPages} current={currentPage} onChange={handlePageChange} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
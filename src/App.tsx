import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { store } from './store';
import { theme } from './theme';
import { VacanciesPage } from './pages/VacanciesPage';
import { VacancyDetailPage } from './pages/VacancyDetailPage';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <BrowserRouter basename="/job_hh">
          <Routes>
            <Route path="/" element={<Navigate to="/vacancies" replace />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  );
}

export default App;
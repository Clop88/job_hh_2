import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getVacancyById } from '../api/hhApi';
import type { KataJob } from '../api/hhApi';

describe('hhApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getVacancyById', () => {
    const mockVacancyResponse: KataJob = {
      id: 1,
      name: 'Test Vacancy',
      description: 'Test description',
      about_company: 'Test about company',
      company_name: 'Test Company',
      city: 'Moscow',
      salary: '100000',
      space: 'office',
      skills: 'React, TypeScript',
      experience: '3-5 years',
      short_description: 'Test short description',
      published_at: '2024-01-01',
    };

    it('получает данные вакансии', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          job: mockVacancyResponse,
        }),
      } as Response);

      const result = await getVacancyById('1');
      
      expect(fetchSpy).toHaveBeenCalledWith('https://kata-jobs.onrender.com/api/jobs/1');
      expect(result).toEqual(mockVacancyResponse);
      
      fetchSpy.mockRestore();
    });

    it('выбрасывает ошибку при статусе 404', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(getVacancyById('999')).rejects.toThrow('HTTP error! status: 404');
      
      fetchSpy.mockRestore();
    });

    it('выбрасывает ошибку при статусе 503', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: false,
        status: 503,
      } as Response);

      await expect(getVacancyById('1')).rejects.toThrow('HTTP error! status: 503');
      
      fetchSpy.mockRestore();
    });

    it('обрабатывает ошибку сети', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

      await expect(getVacancyById('1')).rejects.toThrow('Network error');
      
      fetchSpy.mockRestore();
    });
  });
});
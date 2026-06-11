import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getVacancyById } from '../api/hhApi';

describe('hhApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getVacancyById', () => {
    const mockVacancyResponse = {
      id: '123',
      name: 'Test Vacancy',
      description: 'Test description',
      about_company: 'Test about company',
    };

    it('должен успешно получать данные вакансии', async () => {
      
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockVacancyResponse,
      });

      const result = await getVacancyById('123');
      
      expect(globalThis.fetch).toHaveBeenCalledWith('https://kata-jobs.onrender.com/api/jobs/123');
      expect(result).toEqual(mockVacancyResponse);
    });

    it('должен выбрасывать ошибку при статусе 404', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(getVacancyById('999')).rejects.toThrow('HTTP error! status: 404');
    });

    it('должен выбрасывать ошибку при статусе 503', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      });

      await expect(getVacancyById('123')).rejects.toThrow('HTTP error! status: 503');
    });

    it('должен обрабатывать ошибку сети', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(getVacancyById('123')).rejects.toThrow('Network error');
    });
  });
});
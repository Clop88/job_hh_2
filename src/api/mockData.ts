import type { VacanciesResponse } from '../types/vacancy';

export const mockVacanciesResponse: VacanciesResponse = {
  found: 25,
  pages: 3,
  per_page: 6,
  page: 0,
  items: [
    {
      id: "8331228",
      name: "Frontend разработчик в EdTech продукт",
      salary: {
        from: 80000,
        to: 170000,
        currency: "RUR",
        gross: true
      },
      experience: {
        id: "between1And3",
        name: "1-3 года"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "remote",
        name: "Удаленная работа"
      },
      employer: {
        id: "1455",
        name: "Kata Academy",
        url: "https://api.hh.ru/employers/1455",
        alternate_url: "https://hh.ru/employer/1455",
        logo_urls: {
          "90": "https://hh.ru/employer-logo/289027.png",
          "240": "https://hh.ru/employer-logo/289169.png",
          original: "https://hh.ru/file/2352807.png"
        },
        trusted: true
      },
      area: {
        id: "1",
        name: "Москва",
        url: "https://api.hh.ru/areas/1"
      },
      alternate_url: "https://hh.ru/vacancy/8331228",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331228",
      snippet: {
        requirement: "Опыт работы с React, Redux, TypeScript. Знание современного JavaScript.",
        responsibility: "Разработка новых функций, поддержка существующего кода, код-ревью."
      },
      key_skills: [
        { name: "JavaScript" },
        { name: "React" },
        { name: "Redux" },
        { name: "TypeScript" },
        { name: "Next.js" }
      ],
      published_at: "2024-05-20T10:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331229",
      name: "Frontend разработчик в казино",
      salary: {
        from: 30000,
        to: 970000,
        currency: "RUR",
        gross: false
      },
      experience: {
        id: "noExperience",
        name: "Без опыта"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "fullDay",
        name: "Полный день"
      },
      employer: {
        id: "777",
        name: "777",
        url: "https://api.hh.ru/employers/777",
        alternate_url: "https://hh.ru/employer/777",
        trusted: false
      },
      area: {
        id: "99",
        name: "Уфа",
        url: "https://api.hh.ru/areas/99"
      },
      alternate_url: "https://hh.ru/vacancy/8331229",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331229",
      snippet: {
        requirement: "Базовые знания HTML, CSS, JavaScript. Готовность обучаться.",
        responsibility: "Верстка компонентов, доработка интерфейсов."
      },
      key_skills: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" }
      ],
      published_at: "2024-05-19T15:30:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331230",
      name: "Frontend разработчик в стартап",
      salary: {
        from: 15000,
        to: 20000,
        currency: "RUR",
        gross: false
      },
      experience: {
        id: "noExperience",
        name: "Без опыта"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "flexible",
        name: "Гибрид"
      },
      employer: {
        id: "888",
        name: "Точное Стрельнет",
        url: "https://api.hh.ru/employers/888",
        alternate_url: "https://hh.ru/employer/888",
        trusted: false
      },
      area: {
        id: "2",
        name: "Санкт-Петербург",
        url: "https://api.hh.ru/areas/2"
      },
      alternate_url: "https://hh.ru/vacancy/8331230",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331230",
      snippet: {
        requirement: "Знание React, умение работать в команде.",
        responsibility: "Разработка MVP продукта."
      },
      key_skills: [
        { name: "React" },
        { name: "Git" }
      ],
      published_at: "2024-05-18T09:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331231",
      name: "Senior React Developer",
      salary: {
        from: 250000,
        to: 350000,
        currency: "RUR",
        gross: true
      },
      experience: {
        id: "between3And6",
        name: "3-6 лет"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "remote",
        name: "Удаленная работа"
      },
      employer: {
        id: "999",
        name: "TechGiant",
        url: "https://api.hh.ru/employers/999",
        alternate_url: "https://hh.ru/employer/999",
        trusted: true
      },
      area: {
        id: "1",
        name: "Москва",
        url: "https://api.hh.ru/areas/1"
      },
      alternate_url: "https://hh.ru/vacancy/8331231",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331231",
      snippet: {
        requirement: "Глубокое знание React, Redux, Next.js. Опыт оптимизации производительности.",
        responsibility: "Техническое лидерство, архитектура приложений."
      },
      key_skills: [
        { name: "React" },
        { name: "Redux" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Webpack" }
      ],
      published_at: "2024-05-17T14:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331232",
      name: "React Native Developer",
      salary: {
        from: 180000,
        to: 250000,
        currency: "RUR",
        gross: true
      },
      experience: {
        id: "between1And3",
        name: "1-3 года"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "remote",
        name: "Удаленная работа"
      },
      employer: {
        id: "1000",
        name: "MobileApp Studio",
        url: "https://api.hh.ru/employers/1000",
        alternate_url: "https://hh.ru/employer/1000",
        trusted: true
      },
      area: {
        id: "2",
        name: "Санкт-Петербург",
        url: "https://api.hh.ru/areas/2"
      },
      alternate_url: "https://hh.ru/vacancy/8331232",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331232",
      snippet: {
        requirement: "Опыт разработки мобильных приложений на React Native.",
        responsibility: "Разработка кроссплатформенных приложений."
      },
      key_skills: [
        { name: "React Native" },
        { name: "React" },
        { name: "TypeScript" }
      ],
      published_at: "2024-05-16T11:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331233",
      name: "Vue.js Developer",
      salary: {
        from: 120000,
        to: 180000,
        currency: "RUR",
        gross: true
      },
      experience: {
        id: "between1And3",
        name: "1-3 года"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "flexible",
        name: "Гибрид"
      },
      employer: {
        id: "1001",
        name: "FinTech Solutions",
        url: "https://api.hh.ru/employers/1001",
        alternate_url: "https://hh.ru/employer/1001",
        trusted: true
      },
      area: {
        id: "1",
        name: "Москва",
        url: "https://api.hh.ru/areas/1"
      },
      alternate_url: "https://hh.ru/vacancy/8331233",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331233",
      snippet: {
        requirement: "Знание Vue.js, Vuex, Pinia. Опыт работы с REST API.",
        responsibility: "Разработка frontend части финансовой платформы."
      },
      key_skills: [
        { name: "Vue.js" },
        { name: "Vuex" },
        { name: "Pinia" },
        { name: "TypeScript" }
      ],
      published_at: "2024-05-15T16:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331234",
      name: "Junior Frontend Developer",
      salary: {
        from: 60000,
        to: 90000,
        currency: "RUR",
        gross: false
      },
      experience: {
        id: "noExperience",
        name: "Без опыта"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "fullDay",
        name: "Полный день"
      },
      employer: {
        id: "1002",
        name: "IT-Академия",
        url: "https://api.hh.ru/employers/1002",
        alternate_url: "https://hh.ru/employer/1002",
        trusted: false
      },
      area: {
        id: "3",
        name: "Екатеринбург",
        url: "https://api.hh.ru/areas/3"
      },
      alternate_url: "https://hh.ru/vacancy/8331234",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331234",
      snippet: {
        requirement: "Базовые знания HTML, CSS, JavaScript. Желание учиться.",
        responsibility: "Помощь в разработке проектов под руководством ментора."
      },
      key_skills: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" }
      ],
      published_at: "2024-05-14T10:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331235",
      name: "Angular Developer",
      salary: {
        from: 200000,
        to: 280000,
        currency: "RUR",
        gross: true
      },
      experience: {
        id: "between3And6",
        name: "3-6 лет"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "remote",
        name: "Удаленная работа"
      },
      employer: {
        id: "1003",
        name: "Corporate Systems",
        url: "https://api.hh.ru/employers/1003",
        alternate_url: "https://hh.ru/employer/1003",
        trusted: true
      },
      area: {
        id: "1",
        name: "Москва",
        url: "https://api.hh.ru/areas/1"
      },
      alternate_url: "https://hh.ru/vacancy/8331235",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331235",
      snippet: {
        requirement: "Опыт работы с Angular 2+, RxJS, NgRx.",
        responsibility: "Разработка корпоративных приложений."
      },
      key_skills: [
        { name: "Angular" },
        { name: "RxJS" },
        { name: "NgRx" },
        { name: "TypeScript" }
      ],
      published_at: "2024-05-13T13:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331236",
      name: "Frontend Team Lead",
      salary: {
        from: 350000,
        to: 450000,
        currency: "RUR",
        gross: true
      },
      experience: {
        id: "moreThan6",
        name: "Более 6 лет"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "remote",
        name: "Удаленная работа"
      },
      employer: {
        id: "1004",
        name: "International Corp",
        url: "https://api.hh.ru/employers/1004",
        alternate_url: "https://hh.ru/employer/1004",
        trusted: true
      },
      area: {
        id: "2",
        name: "Санкт-Петербург",
        url: "https://api.hh.ru/areas/2"
      },
      alternate_url: "https://hh.ru/vacancy/8331236",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331236",
      snippet: {
        requirement: "Опыт управления командой от 5 человек. Знание React, архитектуры приложений.",
        responsibility: "Управление frontend командой, код-ревью, архитектура."
      },
      key_skills: [
        { name: "React" },
        { name: "TypeScript" },
        { name: "Team Leadership" },
        { name: "Architecture" }
      ],
      published_at: "2024-05-12T12:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    },
    {
      id: "8331237",
      name: "Frontend разработчик (Next.js)",
      salary: {
        from: 220000,
        to: 300000,
        currency: "RUR",
        gross: true
      },
      experience: {
        id: "between3And6",
        name: "3-6 лет"
      },
      employment: {
        id: "full",
        name: "Полная занятость"
      },
      schedule: {
        id: "remote",
        name: "Удаленная работа"
      },
      employer: {
        id: "1005",
        name: "E-commerce Platform",
        url: "https://api.hh.ru/employers/1005",
        alternate_url: "https://hh.ru/employer/1005",
        trusted: true
      },
      area: {
        id: "1",
        name: "Москва",
        url: "https://api.hh.ru/areas/1"
      },
      alternate_url: "https://hh.ru/vacancy/8331237",
      apply_alternate_url: "https://hh.ru/applicant/vacancy_response?vacancyId=8331237",
      snippet: {
        requirement: "Опыт работы с Next.js, SSR, SSG. Знание Node.js.",
        responsibility: "Разработка высоконагруженного e-commerce сайта."
      },
      key_skills: [
        { name: "Next.js" },
        { name: "React" },
        { name: "Node.js" },
        { name: "TypeScript" }
      ],
      published_at: "2024-05-11T09:00:00+0400",
      type: {
        id: "open",
        name: "Открытая"
      },
      professional_roles: [
        {
          id: "96",
          name: "Программист, разработчик"
        }
      ]
    }
  ]
};
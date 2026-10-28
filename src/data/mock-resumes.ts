import type { Resume } from "@/types/resume";

export const MOCK_RESUMES: readonly Resume[] = [
  {
    id: "resume-mariana-costa",
    fullName: "Mariana Costa",
    jobTitle: "Product Designer",
    email: "mariana.costa@example.com",
    phone: "(11) 99999-0001",
    cpf: "111.111.111-11",
    birthDate: "1996-04-18",
    city: "São Paulo",
    state: "SP",
    summary:
      "Designer de produto com experiência em pesquisa, sistemas de design e criação de experiências digitais acessíveis. Gosta de conectar as necessidades das pessoas aos objetivos do negócio.",
    photo: null,
    experiences: [
      {
        id: "exp-mariana-1",
        company: "Orla Digital",
        position: "Product Designer",
        startDate: "2022-03-01",
        endDate: null,
        description:
          "Conduz pesquisa com usuários, prototipação e evolução de um sistema de design para produtos web.",
      },
      {
        id: "exp-mariana-2",
        company: "Estúdio Norte",
        position: "UX Designer",
        startDate: "2019-02-01",
        endDate: "2022-02-28",
        description:
          "Planejou jornadas e testes de usabilidade para produtos digitais de diferentes setores.",
      },
    ],
    education: [
      {
        id: "edu-mariana-1",
        institution: "Centro Universitário Belas Artes",
        course: "Design Digital",
        degree: "Bacharelado",
        startDate: "2015-02-01",
        endDate: "2018-12-15",
        description: "Ênfase em design de interfaces e comunicação digital.",
      },
    ],
    createdAt: "2026-09-18T12:00:00.000Z",
  },
  {
    id: "resume-rafael-nogueira",
    fullName: "Rafael Nogueira",
    jobTitle: "Desenvolvedor Back-end",
    email: "rafael.nogueira@example.com",
    phone: "(21) 99999-0002",
    cpf: "222.222.222-22",
    birthDate: "1992-11-07",
    city: "Rio de Janeiro",
    state: "RJ",
    summary:
      "Desenvolvedor back-end com atuação em APIs, integração de serviços e modelagem de dados. Valoriza soluções simples, observabilidade e colaboração próxima com o time de produto.",
    photo: null,
    experiences: [
      {
        id: "exp-rafael-1",
        company: "Horizonte Tech",
        position: "Desenvolvedor Back-end",
        startDate: "2021-06-01",
        endDate: null,
        description:
          "Desenvolve APIs e serviços internos, com foco em confiabilidade e integração entre sistemas.",
      },
      {
        id: "exp-rafael-2",
        company: "Ponto Nuvem",
        position: "Desenvolvedor Júnior",
        startDate: "2018-08-01",
        endDate: "2021-05-31",
        description:
          "Implementou funcionalidades de plataforma e apoiou a manutenção de aplicações existentes.",
      },
    ],
    education: [
      {
        id: "edu-rafael-1",
        institution: "Universidade Federal Fluminense",
        course: "Sistemas de Informação",
        degree: "Bacharelado",
        startDate: "2014-02-01",
        endDate: "2018-07-15",
        description: "Formação em desenvolvimento de software e sistemas distribuídos.",
      },
    ],
    createdAt: "2026-09-12T12:00:00.000Z",
  },
  {
    id: "resume-camila-oliveira",
    fullName: "Camila Oliveira",
    jobTitle: "Analista de Recursos Humanos",
    email: "camila.oliveira@example.com",
    phone: "(31) 99999-0003",
    cpf: "333.333.333-33",
    birthDate: "1994-02-23",
    city: "Belo Horizonte",
    state: "MG",
    summary:
      "Profissional de recursos humanos com experiência em recrutamento, integração e desenvolvimento de pessoas. Atua com comunicação clara e processos inclusivos.",
    photo: null,
    experiences: [
      {
        id: "exp-camila-1",
        company: "Raiz Consultoria",
        position: "Analista de RH",
        startDate: "2022-01-01",
        endDate: null,
        description:
          "Coordena processos seletivos, ações de integração e iniciativas de desenvolvimento profissional.",
      },
      {
        id: "exp-camila-2",
        company: "Grupo Semente",
        position: "Assistente de RH",
        startDate: "2018-03-01",
        endDate: "2021-12-31",
        description:
          "Apoiou recrutamento e seleção, comunicação interna e rotinas de departamento pessoal.",
      },
    ],
    education: [
      {
        id: "edu-camila-1",
        institution: "Pontifícia Universidade Católica de Minas Gerais",
        course: "Psicologia",
        degree: "Bacharelado",
        startDate: "2013-02-01",
        endDate: "2017-12-15",
        description: "Formação com ênfase em psicologia organizacional e do trabalho.",
      },
    ],
    createdAt: "2026-09-05T12:00:00.000Z",
  },
];

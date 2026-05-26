// Single Source of Truth — Raw JSON data
// UI MUST NOT consume this directly. Use mappers.

export const rawUserData = {
  personal_info: {
    name: "Marcos",
    role: "Analista de Sistemas / Backend Developer",
    focus: ["Java", "Spring Boot", "SQL", "Troubleshooting", "AI", "QA"],
    bio: "Analista de sistemas con experiencia en procesos de desarrollo. Especializado en POO concretamente Java y Spring, análisis de requerimientos, pruebas e implementación de soluciones enfocadas en calidad de código y buenas prácticas.",
    contact: {
      email: "mpardo@issd.edu.ar",
      //phone: "+54 9 351 0000000",
      location: "Córdoba, Argentina",
      availability: "Open to work",
      links: {
        linkedin: "https://www.linkedin.com/in/marcos-agustin-pardo-varela-27479626a/",
        github: "https://github.com/GIT-Marcos",
        //portfolio: "https://portfolio.com",
      },
    },
  },
  projects: [
    {
      id: "p4",
      name: "Flashcards API",
      type: "cloud",
      is_ai_built: true,
      status: "in-development",
      links: { github: "https://github.com/GIT-Marcos/flashcards" },
      stack: ["Spring Boot 4.0.6", "Java 21", "PostgreSQL 15", "Flyway", "Spring Security", "JWT", "Bucket4j", "Micrometer", "TestContainers", "Docker", "OpenCode AI Agent"],
      description: "API RESTful para estudio con tarjetas flash usando el algoritmo SM-2 de spaced repetition. Incluye autenticación JWT, rate limiting, notificaciones por email, métricas con Prometheus, asistencia para desarrollo con OpenCode AI Agent.",
      technical_focus: ["Algoritmo SM-2", "Autenticación JWT con refresh tokens", "Rate limiting con Bucket4j", "370+ tests con TestContainers", "Optimistic Locking", "Perfiles de despliegue (dev/prod/free)", "Uso de Skills y MCPs con OpenCode"],
    },
    {
      id: "p3",
      name: "Simple Task Frontend",
      type: "cloud",
      is_ai_built: true,
      status: "completed",
      links: {
        demo: "https://simple-tasks-front.vercel.app/",
        github: "https://github.com/GIT-Marcos/simple-tasks-front",
      },
      stack: ["React 18 (Vite)", "TypeScript", "TailwindCSS", "TanStack Query v5", "Zod", "Claude Sonnet 4.5"],
      description: "Frontend desarrollado enteramente con prompting avanzado para consumir la Simple Task API. No busca ser una solución real a un problema de negocio real, si no simplemente entender el proceso de desarrollo",
      technical_focus: ["Paginación Inteligente por Cursor", "Prompting avanzado", "Despliegue en la nube"],
    },
    {
      id: "p2",
      name: "Simple Task API",
      type: "cloud",
      status: "completed",
      links: { github: "https://github.com/GIT-Marcos/task-api-springboot" },
      stack: ["Spring Boot", "PostgreSQL", "OpenAPI (Swagger UI)", "Postman", "Flyway"],
      description: "API RESTful simple para gestionar tareas con operaciones básicas. Está orientada a entender el proceso de desarrollo y conocer estándares backend profesionales.",
      technical_focus: ["REST Best Practices", "perfiles de entorno (development y production)", "pruebas de endpoints HTTP"],
    },
    {
      id: "p1",
      name: "Sistema de Gestión de taller mecánico",
      type: "desktop",
      status: "completed",
      links: { github: "https://github.com/GIT-Marcos/super-service" },
      stack: ["Java", "JavaFX", "Hibernate", "PostgreSQL", "Jira", "Confluence", "SCRUM"],
      description: "Proyecto de tesis: Sistema para la gestión de services y autopartes en un taller mecánico. El desarrollo va desde la recopilación de requerimientos hasta la implementación de un sistema completo.",
      technical_focus: ["Arquitectura MVC", "Testing", "Programación orientada a objetos"],
    },
  ],
  techs: [
    "Java", "SQL", "Spring", "Hibernate", "PostgreSQL", "Flyway",
    "Docker", "OpenCode AI Agent", "Jira",
    "Confluence", "C#", "CSS", "Git", "HTML",
    "Maven", "OpenAPI", "Postman", "React",
  ],
  skills: [
    "Prompt Engineering", "AI-Assisted coding",
    "QA", "Colaboración en equipo", "Resolución de problemas complejos",
    "Pensamiento analítico", "Aprendizaje continuo",
    "API REST / Diseño de APIs", "CI/CD", "Clean Code / SOLID",
  ],
} as const;

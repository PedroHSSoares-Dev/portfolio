export const translations = {
    pt: {
        nav: {
            sobre: 'sobre',
            experiencia: 'experiência',
            formacao: 'formação',
            projetos: 'projetos',
            habilidades: 'habilidades',
            certificacoes: 'certificações',
            contato: 'contato'
        },
        hero: {
            role: 'Data Scientist & Developer',
            title: 'Transformando dados em',
            impact: 'impacto',
            description: 'Especialista em modelagem de dados, ETL e visualização.\nCriando soluções inteligentes para problemas complexos.',
            viewProjects: 'Ver Projetos',
            contact: 'Entrar em Contato'
        },
        experience: {
            title: 'Experiência Profissional',
            role: 'Estagiário em Dados',
            company: 'WorkWise Consulting',
            startDate: '2025-08',
            endDate: null,
            description: 'Responsável pelo desenvolvimento de dashboards interativos e implementação de pipelines de ETL, transformando dados brutos em insights estratégicos para a tomada de decisão.'
        },
        education: {
            title: 'Formação Acadêmica',
            status: {
                ongoing: 'Em andamento',
                completed: 'Concluído'
            },
            items: [
                {
                    institution: 'FIAP',
                    course: 'CST em Data Science',
                    startDate: '2025-01',
                    endDate: '2026-12',
                    totalSemesters: 4,
                    statusKey: 'ongoing'
                },
                {
                    institution: 'ETEC',
                    course: 'Técnico em Desenvolvimento de Sistemas',
                    startDate: '2023-01',
                    endDate: '2024-06',
                    totalSemesters: 3,
                    statusKey: 'completed'
                }
            ]
        },
        projects: {
            title: 'Projetos em Destaque',
            viewCode: 'Ver Código',
            impactLabel: '⚡ Impacto:',
            showMore: 'Ver Mais',
            showLess: 'Ver Menos',
            items: [
                {
                    title: 'Challenge ClickBus (FIAP)',
                    badge: '🏆 TOP 3',
                    badgeTooltip: '3º Lugar entre 140 projetos',
                    description: 'Análise de dados e storytelling para otimização de vendas. Utilizei K-Means para segmentação de clientes e XGBoost para predição de churn.',
                    impact: 'Identificação de clusters de alto valor e redução potencial de churn em 15%.',
                    tags: ['Python', 'Machine Learning', 'K-Means', 'XGBoost', 'Storytelling']
                },
                {
                    title: 'Real-Time Fraud Detection',
                    badge: '🛡️ 71.6% RECALL',
                    badgeTooltip: 'Alta taxa de detecção de fraudes',
                    description: 'API completa para detecção de fraudes em transações financeiras. Implementa Isolation Forest para detecção de anomalias em tempo real.',
                    impact: 'Processamento de transações em <100ms com alta precisão na detecção de anomalias.',
                    tags: ['Python', 'Flask', 'Docker', 'PostgreSQL', 'Isolation Forest']
                },
                {
                    title: 'AWS CCP Exam Simulator',
                    badge: '☁️ 1.200+ QUESTÕES',
                    badgeTooltip: 'Banco de questões baseado no CLF-C02',
                    description: 'Simulador completo para certificação AWS Cloud Practitioner com dashboard analítico, heatmap de domínios e análise preditiva de pontos fracos.',
                    impact: '4 modos de estudo, sistema anti-vício de questões e deploy automatizado com Docker + CI/CD.',
                    tags: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Docker', 'AWS']
                },
                {
                    title: 'ETL Pipeline com GenAI',
                    badge: '🎓 DIO × TOTVS',
                    badgeTooltip: 'Bootcamp TOTVS – Fundamentos de Engenharia de Dados e ML',
                    description: 'Exercício do bootcamp TOTVS × DIO de fundamentos de ETL com IA Generativa. Pipeline que extrai perfis bancários sintéticos de uma API FastAPI (Docker), transforma via Google Gemini em mensagens de marketing personalizadas e carrega de volta na API.',
                    impact: 'Structured output com Pydantic, cache local para economia de quota do Gemini e segmentação automática em 6 perfis de marketing.',
                    tags: ['Python', 'FastAPI', 'Docker', 'Google Gemini', 'Pydantic', 'ETL']
                },
                {
                    title: 'Sistema Bancário Containerizado',
                    description: 'Backend robusto para operações bancárias com arquitetura de microsserviços simulada via Docker Compose.',
                    impact: 'Ambiente de desenvolvimento replicável e escalável.',
                    tags: ['Python', 'Docker', 'PostgreSQL', 'API REST']
                }
            ]
        },
        skills: {
            title: 'Stack Tecnológica',
            categories: {
                ds: 'Data Science & ML',
                de: 'Data Engineering & Backend',
                tools: 'Tools & Visualization'
            }
        },
        certifications: {
            title: 'Certificações',
            filterAll: 'Todas',
            status: {
                inProgress: 'Em progresso',
                completed: 'Concluída'
            },
            viewCredential: 'Ver credencial',
            progressLabel: 'Progresso',
            items: [
                {
                    id: 'aws-ccp',
                    name: 'AWS Certified Cloud Practitioner',
                    issuer: 'AWS',
                    code: 'CLF-C02',
                    status: 'inProgress',
                    progress: 65,
                    credentialUrl: null,
                    description: 'Fundamentos de cloud, serviços core da AWS, segurança, arquitetura e billing.'
                }
            ]
        },
        contact: {
            title: 'Vamos Conversar?',
            description: 'Estou sempre aberto a novas oportunidades e colaborações. Se você tem um projeto interessante ou quer apenas trocar uma ideia sobre dados, entre em contato!',
            email: 'Enviar e-mail',
            whatsapp: 'WhatsApp'
        },
        footer: {
            rights: '© {year} Pedro Henrique Simão Soares. Todos os direitos reservados.'
        }
    },
    en: {
        nav: {
            sobre: 'about',
            experiencia: 'experience',
            formacao: 'education',
            projetos: 'projects',
            habilidades: 'skills',
            certificacoes: 'certifications',
            contato: 'contact'
        },
        hero: {
            role: 'Data Scientist & Developer',
            title: 'Transforming data into',
            impact: 'impact',
            description: 'Specialist in data modeling, ETL, and visualization.\nCreating intelligent solutions for complex problems.',
            viewProjects: 'View Projects',
            contact: 'Get in Touch'
        },
        experience: {
            title: 'Professional Experience',
            role: 'Data Intern',
            company: 'WorkWise Consulting',
            startDate: '2025-08',
            endDate: null,
            description: 'Responsible for developing interactive dashboards and implementing ETL pipelines, transforming raw data into strategic insights for decision-making.'
        },
        education: {
            title: 'Education',
            status: {
                ongoing: 'In progress',
                completed: 'Completed'
            },
            items: [
                {
                    institution: 'FIAP',
                    course: 'Associate Degree in Data Science',
                    startDate: '2025-01',
                    endDate: '2026-12',
                    totalSemesters: 4,
                    statusKey: 'ongoing'
                },
                {
                    institution: 'ETEC',
                    course: 'Systems Development Technician',
                    startDate: '2023-01',
                    endDate: '2024-06',
                    totalSemesters: 3,
                    statusKey: 'completed'
                }
            ]
        },
        projects: {
            title: 'Featured Projects',
            viewCode: 'View Code',
            impactLabel: '⚡ Impact:',
            showMore: 'Show More',
            showLess: 'Show Less',
            items: [
                {
                    title: 'Challenge ClickBus (FIAP)',
                    badge: '🏆 TOP 3',
                    badgeTooltip: '3rd Place among 140 projects',
                    description: 'Data analysis and storytelling for sales optimization. Used K-Means for customer segmentation and XGBoost for churn prediction.',
                    impact: 'Identification of high-value clusters and potential churn reduction of 15%.',
                    tags: ['Python', 'Machine Learning', 'K-Means', 'XGBoost', 'Storytelling']
                },
                {
                    title: 'Real-Time Fraud Detection',
                    badge: '🛡️ 71.6% RECALL',
                    badgeTooltip: 'High fraud detection rate',
                    description: 'Complete API for fraud detection in financial transactions. Implements Isolation Forest for real-time anomaly detection.',
                    impact: 'Transaction processing in <100ms with high precision in anomaly detection.',
                    tags: ['Python', 'Flask', 'Docker', 'PostgreSQL', 'Isolation Forest', 'AWS']
                },
                {
                    title: 'AWS CCP Exam Simulator',
                    badge: '☁️ 1,200+ QUESTIONS',
                    badgeTooltip: 'Question bank based on CLF-C02',
                    description: 'Complete simulator for AWS Cloud Practitioner certification with analytical dashboard, domain heatmap and predictive weakness analysis.',
                    impact: '4 study modes, question anti-addiction system and automated deploy with Docker + CI/CD.',
                    tags: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Docker', 'AWS']
                },
                {
                    title: 'ETL Pipeline with GenAI',
                    badge: '🎓 DIO × TOTVS',
                    badgeTooltip: 'TOTVS Bootcamp – Data Engineering & ML Fundamentals',
                    description: 'Bootcamp project (TOTVS × DIO) on ETL fundamentals with Generative AI. Pipeline that extracts synthetic banking profiles from a Dockerized FastAPI, transforms them via Google Gemini into personalized marketing messages, and loads them back into the API.',
                    impact: 'Structured output with Pydantic, local cache for Gemini quota savings, and automatic segmentation into 6 marketing profiles.',
                    tags: ['Python', 'FastAPI', 'Docker', 'Google Gemini', 'Pydantic', 'ETL']
                },
                {
                    title: 'Containerized Banking System',
                    description: 'Robust backend for banking operations with microservices architecture simulated via Docker Compose.',
                    impact: 'Replicable and scalable development environment.',
                    tags: ['Python', 'Docker', 'PostgreSQL', 'API REST']
                }
            ]
        },
        skills: {
            title: 'Tech Stack',
            categories: {
                ds: 'Data Science & ML',
                de: 'Data Engineering & Backend',
                tools: 'Tools & Visualization'
            }
        },
        certifications: {
            title: 'Certifications',
            filterAll: 'All',
            status: {
                inProgress: 'In progress',
                completed: 'Completed'
            },
            viewCredential: 'View credential',
            progressLabel: 'Progress',
            items: [
                {
                    id: 'aws-ccp',
                    name: 'AWS Certified Cloud Practitioner',
                    issuer: 'AWS',
                    code: 'CLF-C02',
                    status: 'inProgress',
                    progress: 65,
                    credentialUrl: null,
                    description: 'Cloud fundamentals, AWS core services, security, architecture and billing.'
                }
            ]
        },
        contact: {
            title: 'Let\'s Talk?',
            description: 'I am always open to new opportunities and collaborations. If you have an interesting project or just want to chat about data, get in touch!',
            email: 'Send Email',
            whatsapp: 'WhatsApp'
        },
        footer: {
            rights: '© {year} Pedro Henrique Simão Soares. All rights reserved.'
        }
    }
};

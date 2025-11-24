export const translations = {
    pt: {
        nav: {
            sobre: 'sobre',
            experiencia: 'experiência',
            formacao: 'formação',
            projetos: 'projetos',
            habilidades: 'habilidades',
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
            current: 'Atual',
            role: 'Estagiário em Dados',
            company: 'WorkWise Consulting',
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
                    period: 'fev/2025 – dez/2026',
                    statusKey: 'ongoing'
                },
                {
                    institution: 'ETEC',
                    course: 'Técnico em Desenvolvimento de Sistemas',
                    period: 'jan/2023 – jun/2024',
                    statusKey: 'completed'
                }
            ]
        },
        projects: {
            title: 'Projetos em Destaque',
            viewCode: 'Ver Código',
            impactLabel: '⚡ Impacto:',
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
        contact: {
            title: 'Vamos Conversar?',
            description: 'Estou sempre aberto a novas oportunidades e colaborações. Se você tem um projeto interessante ou quer apenas trocar uma ideia sobre dados, entre em contato!',
            email: 'Enviar e-mail',
            whatsapp: 'WhatsApp'
        },
        footer: {
            rights: '© 2025 Pedro Henrique Simão Soares. Todos os direitos reservados.'
        }
    },
    en: {
        nav: {
            sobre: 'about',
            experiencia: 'experience',
            formacao: 'education',
            projetos: 'projects',
            habilidades: 'skills',
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
            current: 'Current',
            role: 'Data Intern',
            company: 'WorkWise Consulting',
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
                    period: 'Feb/2025 – Dec/2026',
                    statusKey: 'ongoing'
                },
                {
                    institution: 'ETEC',
                    course: 'Systems Development Technician',
                    period: 'Jan/2023 – Jun/2024',
                    statusKey: 'completed'
                }
            ]
        },
        projects: {
            title: 'Featured Projects',
            viewCode: 'View Code',
            impactLabel: '⚡ Impact:',
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
        contact: {
            title: 'Let\'s Talk?',
            description: 'I am always open to new opportunities and collaborations. If you have an interesting project or just want to chat about data, get in touch!',
            email: 'Send Email',
            whatsapp: 'WhatsApp'
        },
        footer: {
            rights: '© 2025 Pedro Henrique Simão Soares. All rights reserved.'
        }
    }
};

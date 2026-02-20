(function () {
    var doc = document;
    var win = window;
    var root = doc.documentElement;
    var hasIntersectionObserver = 'IntersectionObserver' in win;
    var prefersReducedMotion =
        typeof win.matchMedia === 'function' &&
        win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isMobileViewport =
        typeof win.matchMedia === 'function' &&
        win.matchMedia('(max-width: 768px)').matches;
    var currentLanguage = 'en';

    var runWhenIdle = function (task, timeout) {
        if (typeof win.requestIdleCallback === 'function') {
            win.requestIdleCallback(task, { timeout: timeout || 1000 });
            return;
        }
        win.setTimeout(task, 1);
    };

    var onLoadIdle = function (task, timeout) {
        var schedule = function () {
            runWhenIdle(task, timeout);
        };
        if (doc.readyState === 'complete') {
            schedule();
            return;
        }
        win.addEventListener('load', schedule, { once: true });
    };

    var runOnInteractionOrTimeout = function (task, timeout) {
        var done = false;
        var events = ['scroll', 'pointerdown', 'keydown', 'touchstart'];
        var timerId = 0;

        var cleanup = function () {
            events.forEach(function (eventName) {
                win.removeEventListener(eventName, onTrigger, true);
            });
            if (timerId) {
                win.clearTimeout(timerId);
            }
        };

        var onTrigger = function () {
            if (done) {
                return;
            }
            done = true;
            cleanup();
            runWhenIdle(task, 1200);
        };

        events.forEach(function (eventName) {
            win.addEventListener(eventName, onTrigger, { once: true, passive: true, capture: true });
        });

        timerId = win.setTimeout(onTrigger, timeout || 1500);
    };

    // Year
    var yearEl = doc.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    // Dynamic years of experience (started Feb 2016)
    var yearsExpEl = doc.getElementById('years-exp');
    if (yearsExpEl) {
        yearsExpEl.textContent = String(new Date().getFullYear() - 2016);
    }

    var setTextContent = function (selector, value) {
        var node = doc.querySelector(selector);
        if (!node || typeof value !== 'string') {
            return;
        }
        node.textContent = value;
    };

    var setHTMLContent = function (selector, value) {
        var node = doc.querySelector(selector);
        if (!node || typeof value !== 'string') {
            return;
        }
        node.innerHTML = value;
    };

    var setAttribute = function (selector, attributeName, value) {
        var node = doc.querySelector(selector);
        if (!node || typeof value !== 'string') {
            return;
        }
        node.setAttribute(attributeName, value);
    };

    var setNodeListText = function (selector, values) {
        var nodes = doc.querySelectorAll(selector);
        if (!nodes.length || !Array.isArray(values)) {
            return;
        }

        values.forEach(function (value, index) {
            if (nodes[index] && typeof value === 'string') {
                nodes[index].textContent = value;
            }
        });
    };

    var setNodeListAttribute = function (selector, attributeName, values) {
        var nodes = doc.querySelectorAll(selector);
        if (!nodes.length || !Array.isArray(values)) {
            return;
        }

        values.forEach(function (value, index) {
            if (nodes[index] && typeof value === 'string') {
                nodes[index].setAttribute(attributeName, value);
            }
        });
    };

    var translations = {
        en: {
            metaTitle: 'Matteo Senardi | Head of Data & AI in Italy for Cloud Platforms and AI Copilots',
            metaDescription:
                'Head of Data & AI in Turin, Italy. I facilitate companies build GCP, Azure, and AWS data platforms with production LangGraph AI copilots that improve efficiency and analytics.',
            metaOgDescription:
                'Head of Data & AI in Turin, Italy. GCP, Azure, and AWS data platforms with production LangGraph AI copilots.',
            metaTwitterDescription:
                'GCP, Azure, and AWS data platforms with production LangGraph AI copilots.',
            metaImageAlt: 'Portrait of Matteo Senardi, Head of Data and AI',
            ogLocale: 'en_US',
            ogLocaleAlternate: 'it_IT',
            skipLink: 'Skip to main content',
            mainNavigationAria: 'Main Navigation',
            mobileNavigationAria: 'Mobile Navigation',
            menuToggleAria: 'Toggle menu',
            themeToLightAria: 'Switch to light mode',
            themeToDarkAria: 'Switch to dark mode',
            languageToggleAria: 'Switch language to Italian',
            scrollTopAria: 'Scroll to top',
            navLinks: ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'],
            heroName: 'Head of Data & AI in Italy for Cloud Platforms and AI Copilots',
            heroTitle:
                'I facilitate companies build GCP, Azure, and AWS data platforms with production AI copilots that improve efficiency, analytics, and customer experience.',
            heroDescriptionHtml:
                'I help companies turn data into measurable growth with cloud platforms, LangGraph agent workflows, and practical AI copilots. <a href="#experience">Review my leadership experience</a>, <a href="#projects">explore Data &amp; AI projects</a>, or <a href="#contact">contact me for collaboration</a>. Based in Turin, Italy and open to remote and international projects.',
            heroPrimaryText: 'Reach out on LinkedIn',
            heroPrimaryAria: 'Reach out on LinkedIn',
            heroSecondaryText: 'View Data & AI Projects',
            heroSecondaryAria: 'View Data & AI Projects',
            aboutLabel: 'About',
            aboutTitle: 'Envisioning data-driven solutions.',
            aboutParagraph1:
                'An engineering professional with deep experience bridging complex data infrastructures and high-impact business outcomes. I lead cross-functional teams building advanced analytics, AI copilots, and cloud-native data platforms.',
            aboutParagraph2Html:
                'My work spans software engineering, machine learning, and cloud architecture across GCP, Azure, and AWS - designing scalable decoupled environments and orchestrating AI agent systems with multiple graph architectures and LLMs. Explore my <a href="#skills">cloud and AI technology stack</a> and <a href="#experience">recent Data leadership roles</a>.',
            aboutStats: [
                'Years in Data, Cloud & AI Engineering',
                'Major Cloud Platforms (GCP, Azure, AWS)',
                'Open-Source Projects Published'
            ],
            experienceLabel: 'Experience',
            experienceTitle: 'Career.',
            experienceDates: [
                'Jan 2025 - Present',
                'Jan 2020 - Present',
                'Apr 2019 - Dec 2019',
                'Feb 2016 - Mar 2019'
            ],
            experienceRoles: [
                'Head of Data & AI',
                'Head of Data & Analytics / Innovation',
                'Solution Architect / Lead Data Engineer',
                'Innovation Engineer / Data Scientist'
            ],
            experienceDescriptions: [
                'Leading data science and AI teams to develop products that enhance operational efficiency and customer experience. Overseeing AI-based payment reconciliation, natural-language copilots, and advanced analytics platforms.',
                'Architecting solutions with Microsoft Azure, Terraform, Apache Airflow, PowerBI, and Azure OpenAI LLMs.',
                'Envisioning and executing data strategies for informed decision-making. Designed end-to-end data infrastructure on Google Cloud Platform managed through Terraform and Apache Airflow.',
                'Governing analytics through Looker and enriching products with LLM-powered agent capabilities.',
                'Architected a custom data lake for real-time click-stream events processing 2-3 GB/hour. Built decoupled environments across prod, QA, and dev using Terraform and AWS services including Kinesis, Glue, and Athena.',
                'Lead developer for Big Data architectures merging APIs, scraped data, and CRMs. Deployed ML techniques - forecasting, clustering, NLP - for clients including Allianz, Bulgari, Mediaset, and Johnson & Johnson.'
            ],
            projectsLabel: 'Open Source',
            projectsTitle: 'Notable Projects.',
            projectDescriptions: [
                'Python package for document conversion and text extraction via algorithm/LLM  - Office to PDF, multi-backend PDF parsing, text from images, audio/video, URLs, and YouTube transcripts.',
                'Chrome extension for debugging tag managers (GTM, Tealium, Commanders Act) and common tags like GA4, Floodlight, and Adobe Analytics.',
                'Python utilities simplifying Google API connections - wrappers for BigQuery, Analytics, Drive, Search Console, Sheets, and Storage.',
                'Simplify MongoDB connections through SSH tunnels - establishes the tunnel and exposes the URI as local.',
                'Connect to any SQLAlchemy-supported database securely through an SSH tunnel.',
                'Fork of Facebook Research fastText for numpy version 2 compatibility - efficient learning of word representations and sentence classification for NLP.'
            ],
            projectLinkTexts: ['Code', 'PyPI', 'Website', 'Code', 'PyPI', 'Code', 'PyPI', 'Code', 'PyPI', 'Code'],
            projectLinkAriaLabels: [
                'View Polytext source code on GitHub',
                'View Polytext package on PyPI',
                'Open the Trackie project website',
                'View Gcloud Connectors source code on GitHub',
                'View Gcloud Connectors package on PyPI',
                'View Pymongo-SSH source code on GitHub',
                'View Pymongo-SSH package on PyPI',
                'View SQLAlchemy Connector source code on GitHub',
                'View SQLAlchemy Connector package on PyPI',
                'View fastText source code on GitHub'
            ],
            skillsLabel: 'Expertise',
            skillsTitle: 'Skills.',
            skillsCategories: [
                'Languages & Frameworks',
                'Cloud & Infrastructure',
                'Databases',
                'Data Visualization & Tools'
            ],
            skillsItems: [
                'Python - Pandas, NumPy, Scikit-Learn, Keras',
                'Generative AI - LangGraph, Azure OpenAI',
                'Web - FastAPI, Django, Flask, Angular, Node',
                'Data - PySpark, Apache Airflow',
                'Mobile - Swift',
                'Google Cloud Platform',
                'Terraform / Terragrunt',
                'Microsoft Azure',
                'Amazon Web Services',
                'Docker, Kubernetes, Helm',
                'BigQuery, Athena - analytical',
                'Qdrant, PGvector - vector',
                'ElasticSearch - search',
                'MongoDB, DynamoDB - document',
                'SQL - relational',
                'Looker / Looker Studio',
                'PowerBI, Tableau, Qlik Sense',
                'Google Tag Manager',
                'ClickUp, Jira, Asana'
            ],
            educationLabel: 'Education',
            educationTitle: 'Academics.',
            educationDegrees: ['M.Sc. Computer Engineering', 'IELTS - Band 7.0'],
            educationSchools: ['Dipartimento di Ingegneria Enzo Ferrari, Modena', 'British Council'],
            educationDetails: [
                'Thesis on Visual Analytics for Web Analytics and SEO. Score: 107/110. Licensed professional engineer.',
                'Listening 6.5 · Reading 8.5 · Writing 6.0 · Speaking 6.5'
            ],
            footerTitle: "Let's connect.",
            footerSubtitle:
                'Open to select collaborations in Data, AI, graph-based copilots, and cloud architecture.',
            footerLinks: ['View GitHub repositories', 'Contact on LinkedIn', 'Download CV'],
            footerLocation: 'Turin, Italy',
            badgeAltSuffix: 'monthly downloads'
        },
        it: {
            metaTitle: 'Matteo Senardi | Head of Data & AI in Italia per Cloud Platform e Copilot AI',
            metaDescription:
                'Head of Data & AI a Torino, Italia. Supporto le aziende nella costruzione di piattaforme dati GCP, Azure e AWS con copilot AI LangGraph in produzione, per migliorare efficienza e analytics.',
            metaOgDescription:
                'Head of Data & AI a Torino, Italia. Piattaforme dati GCP, Azure e AWS con copilot AI LangGraph in produzione.',
            metaTwitterDescription:
                'Piattaforme dati GCP, Azure e AWS con copilot AI LangGraph in produzione.',
            metaImageAlt: 'Ritratto di Matteo Senardi, Head of Data and AI',
            ogLocale: 'it_IT',
            ogLocaleAlternate: 'en_US',
            skipLink: 'Vai al contenuto principale',
            mainNavigationAria: 'Navigazione principale',
            mobileNavigationAria: 'Navigazione mobile',
            menuToggleAria: 'Apri o chiudi menu',
            themeToLightAria: 'Passa al tema chiaro',
            themeToDarkAria: 'Passa al tema scuro',
            languageToggleAria: 'Passa la lingua a inglese',
            scrollTopAria: 'Torna in alto',
            navLinks: ['Chi sono', 'Esperienza', 'Progetti', 'Competenze', 'Formazione', 'Contatti'],
            heroName: 'Head of Data & AI in Italia per Cloud Platform e Copilot AI',
            heroTitle:
                'Aiuto le aziende a costruire piattaforme dati su GCP, Azure e AWS con copilot AI in produzione che migliorano efficienza, analytics e customer experience.',
            heroDescriptionHtml:
                'Aiuto le aziende a trasformare i dati in crescita misurabile con piattaforme cloud, workflow agentici LangGraph e copilot AI concreti. <a href="#experience">Scopri la mia esperienza di leadership</a>, <a href="#projects">esplora i progetti Data &amp; AI</a>, oppure <a href="#contact">contattami per collaborare</a>. Basato a Torino, Italia, disponibile per progetti da remoto e internazionali.',
            heroPrimaryText: 'Contattami su LinkedIn',
            heroPrimaryAria: 'Contattami su LinkedIn',
            heroSecondaryText: 'Vedi i progetti Data & AI',
            heroSecondaryAria: 'Vedi i progetti Data & AI',
            aboutLabel: 'Chi sono',
            aboutTitle: 'Immaginare soluzioni data-driven.',
            aboutParagraph1:
                "Professionista dell'ingegneria con una profonda esperienza nel collegare infrastrutture dati complesse e risultati di business ad alto impatto. Guido team cross-funzionali che costruiscono analytics avanzati, copilot AI e piattaforme dati cloud-native.",
            aboutParagraph2Html:
                'Il mio lavoro unisce software engineering, machine learning e cloud architecture su GCP, Azure e AWS, progettando ambienti disaccoppiati e orchestrando sistemi di agenti AI con architetture a grafo multiple e LLM. Scopri il mio <a href="#skills">stack tecnologico cloud e AI</a> e i miei <a href="#experience">ruoli recenti di leadership Data</a>.',
            aboutStats: [
                'Anni in Data, Cloud e AI Engineering',
                'Principali piattaforme cloud (GCP, Azure, AWS)',
                'Progetti open-source pubblicati'
            ],
            experienceLabel: 'Esperienza',
            experienceTitle: 'Percorso.',
            experienceDates: [
                'Gen 2025 - Presente',
                'Gen 2020 - Presente',
                'Apr 2019 - Dic 2019',
                'Feb 2016 - Mar 2019'
            ],
            experienceRoles: [
                'Head of Data & AI',
                'Head of Data & Analytics / Innovation',
                'Solution Architect / Lead Data Engineer',
                'Innovation Engineer / Data Scientist'
            ],
            experienceDescriptions: [
                'Guido i team Data Science e AI nello sviluppo di prodotti che migliorano efficienza operativa e customer experience. Supervisiono riconciliazione pagamenti basata su AI, copilot in linguaggio naturale e piattaforme di analytics avanzate.',
                'Progetto soluzioni con Microsoft Azure, Terraform, Apache Airflow, PowerBI e LLM Azure OpenAI.',
                "Definisco ed eseguo strategie dati per supportare decisioni informate. Ho progettato un'infrastruttura dati end-to-end su Google Cloud Platform gestita con Terraform e Apache Airflow.",
                "Governo l'analytics con Looker e arricchisco i prodotti con capacita agentiche basate su LLM.",
                'Ho progettato un data lake custom per eventi click-stream in tempo reale con volumi di 2-3 GB/ora. Ho costruito ambienti disaccoppiati tra prod, QA e dev con Terraform e servizi AWS come Kinesis, Glue e Athena.',
                'Lead developer per architetture Big Data che uniscono API, dati scraped e CRM. Ho applicato tecniche ML - forecasting, clustering, NLP - per clienti come Allianz, Bulgari, Mediaset e Johnson & Johnson.'
            ],
            projectsLabel: 'Open Source',
            projectsTitle: 'Progetti principali.',
            projectDescriptions: [
                'Package Python per conversione documenti ed estrazione testo via algoritmi/LLM - Office in PDF, parsing PDF multi-backend, testo da immagini, audio/video, URL e trascrizioni YouTube.',
                'Estensione Chrome per il debug dei tag manager (GTM, Tealium, Commanders Act) e dei tag comuni come GA4, Floodlight e Adobe Analytics.',
                'Utility Python che semplificano le connessioni alle API Google - wrapper per BigQuery, Analytics, Drive, Search Console, Sheets e Storage.',
                "Semplifica le connessioni MongoDB tramite tunnel SSH - apre il tunnel ed espone l'URI in locale.",
                'Connessione sicura a qualsiasi database supportato da SQLAlchemy tramite tunnel SSH.',
                'Fork di fastText di Facebook Research per compatibilità con numpy versione 2 - apprendimento efficiente di rappresentazioni di parole e classificazione di frasi per NLP.'
            ],
            projectLinkTexts: ['Codice', 'PyPI', 'Sito', 'Codice', 'PyPI', 'Codice', 'PyPI', 'Codice', 'PyPI', 'Codice'],
            projectLinkAriaLabels: [
                'Visualizza il codice sorgente di Polytext su GitHub',
                'Visualizza il package Polytext su PyPI',
                'Apri il sito del progetto Trackie',
                'Visualizza il codice sorgente di Gcloud Connectors su GitHub',
                'Visualizza il package Gcloud Connectors su PyPI',
                'Visualizza il codice sorgente di Pymongo-SSH su GitHub',
                'Visualizza il package Pymongo-SSH su PyPI',
                'Visualizza il codice sorgente di SQLAlchemy Connector su GitHub',
                'Visualizza il package SQLAlchemy Connector su PyPI',
                'Visualizza il codice sorgente di fastText su GitHub'
            ],
            skillsLabel: 'Competenze',
            skillsTitle: 'Competenze.',
            skillsCategories: [
                'Linguaggi e Framework',
                'Cloud e Infrastruttura',
                'Database',
                'Data Visualization e Strumenti'
            ],
            skillsItems: [
                'Python - Pandas, NumPy, Scikit-Learn, Keras',
                'AI Generativa - LangGraph, Azure OpenAI',
                'Web - FastAPI, Django, Flask, Angular, Node',
                'Data - PySpark, Apache Airflow',
                'Mobile - Swift',
                'Google Cloud Platform',
                'Terraform / Terragrunt',
                'Microsoft Azure',
                'Amazon Web Services',
                'Docker, Kubernetes, Helm',
                'BigQuery, Athena - analitici',
                'Qdrant, PGvector - vettoriali',
                'ElasticSearch - ricerca',
                'MongoDB, DynamoDB - documentali',
                'SQL - relazionali',
                'Looker / Looker Studio',
                'PowerBI, Tableau, Qlik Sense',
                'Google Tag Manager',
                'ClickUp, Jira, Asana'
            ],
            educationLabel: 'Formazione',
            educationTitle: 'Studi.',
            educationDegrees: ['Laurea Magistrale in Ingegneria Informatica', 'IELTS - Band 7.0'],
            educationSchools: ['Dipartimento di Ingegneria Enzo Ferrari, Modena', 'British Council'],
            educationDetails: [
                'Tesi in Visual Analytics per Web Analytics e SEO. Voto: 107/110. Ingegnere professionista abilitato.',
                'Listening 6.5 · Reading 8.5 · Writing 6.0 · Speaking 6.5'
            ],
            footerTitle: 'Restiamo in contatto.',
            footerSubtitle:
                'Disponibile per collaborazioni selezionate in Data, AI, copilot basati su grafi e cloud architecture.',
            footerLinks: ['Vedi i repository GitHub', 'Contattami su LinkedIn', 'Scarica CV'],
            footerLocation: 'Torino, Italia',
            badgeAltSuffix: 'download mensili'
        }
    };

    var resolveInitialLanguage = function () {
        var savedLanguage = null;
        var browserLanguage = '';

        try {
            savedLanguage = localStorage.getItem('language');
        } catch (e) {
            savedLanguage = null;
        }

        if (savedLanguage === 'en' || savedLanguage === 'it') {
            return savedLanguage;
        }

        if (win.navigator && typeof win.navigator.language === 'string') {
            browserLanguage = win.navigator.language.toLowerCase();
        }

        if (browserLanguage.indexOf('it') === 0) {
            return 'it';
        }

        return 'en';
    };

    var getCurrentTheme = function () {
        return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    };

    var getCurrentLanguage = function () {
        return root.getAttribute('lang') === 'it' ? 'it' : 'en';
    };

    var pushDataLayerEvent = function (payload) {
        var dataLayer;

        if (!payload || typeof payload !== 'object') {
            return;
        }

        dataLayer = win.dataLayer = win.dataLayer || [];
        dataLayer.push(payload);
    };

    if (typeof win.pushDataLayerEvent !== 'function') {
        win.pushDataLayerEvent = pushDataLayerEvent;
    }

    var pushPageViewEvent = function (source) {
        win.pushDataLayerEvent({
            event: 'pageview',
            page_title: doc.title,
            page_location: win.location.href,
            page_path: win.location.pathname + win.location.search,
            page_language: getCurrentLanguage(),
            page_theme: getCurrentTheme(),
            pageview_source: source || 'state_sync'
        });
    };

    var initOutboundLinkTracking = function () {
        if (win.__outboundLinkTrackingInitialized === true) {
            return;
        }

        win.__outboundLinkTrackingInitialized = true;

        doc.addEventListener(
            'click',
            function (event) {
                var anchor =
                    event.target && typeof event.target.closest === 'function'
                        ? event.target.closest('a[href]')
                        : null;
                var href;
                var destination;
                var linkText;

                if (!anchor) {
                    return;
                }

                href = anchor.getAttribute('href');
                if (!href || href.charAt(0) === '#') {
                    return;
                }

                try {
                    destination = new URL(anchor.href, win.location.href);
                } catch (e) {
                    return;
                }

                if (
                    (destination.protocol !== 'http:' && destination.protocol !== 'https:') ||
                    destination.origin === win.location.origin
                ) {
                    return;
                }

                linkText = anchor.textContent ? anchor.textContent.replace(/\s+/g, ' ').trim() : '';

                win.pushDataLayerEvent({
                    event: 'outbound_link_click',
                    link_url: destination.href,
                    link_domain: destination.hostname,
                    link_text: linkText,
                    link_id: anchor.id || '',
                    page_language: getCurrentLanguage(),
                    page_theme: getCurrentTheme()
                });
            },
            true
        );
    };

    var buildPyPIBadgeUrl = function (pkg, theme) {
        var baseUrl = 'https://img.shields.io/pypi/dm/' + encodeURIComponent(pkg);
        if (theme === 'dark') {
            return baseUrl + '?style=flat&labelColor=1d1d1f&color=0a66c2';
        }
        return baseUrl + '?style=flat';
    };

    var buildPyPIBadgeAlt = function (pkg) {
        var languageData = translations[currentLanguage] || translations.en;
        return pkg + ' ' + languageData.badgeAltSuffix;
    };

    var syncLoadedPyPIBadges = function () {
        var theme = getCurrentTheme();
        var loadedBadges = Array.prototype.slice.call(
            doc.querySelectorAll('img[data-pypi-badge][data-loaded="true"]')
        );
        loadedBadges.forEach(function (badge) {
            var pkg = badge.getAttribute('data-pypi-badge');
            if (!pkg) {
                return;
            }
            badge.src = buildPyPIBadgeUrl(pkg, theme);
            badge.alt = buildPyPIBadgeAlt(pkg);
        });
    };

    var themeToggle = doc.getElementById('theme-toggle');
    var applyTheme = function () {};

    // Theme toggle
    if (themeToggle) {
        var themeIcon = themeToggle.querySelector('[data-theme-icon]');

        applyTheme = function (theme, options) {
            var languageData = translations[currentLanguage] || translations.en;
            var shouldTrackPageView = options && options.trackPageView === true;
            var pageViewSource = options && options.pageViewSource ? options.pageViewSource : 'theme_change';

            root.setAttribute('data-theme', theme);
            if (themeIcon) {
                themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
            }
            themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
            themeToggle.setAttribute(
                'aria-label',
                theme === 'dark' ? languageData.themeToLightAria : languageData.themeToDarkAria
            );
            syncLoadedPyPIBadges();

            if (shouldTrackPageView) {
                pushPageViewEvent(pageViewSource);
            }
        };

        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', {
            trackPageView: false
        });

        themeToggle.addEventListener('click', function () {
            var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme, {
                trackPageView: true,
                pageViewSource: 'theme_change'
            });
            try {
                localStorage.setItem('theme', nextTheme);
            } catch (e) {
                // Ignore storage errors in restricted browsing contexts.
            }
        });
    }

    var languageToggle = doc.getElementById('language-toggle');
    var languageCodeEl = languageToggle ? languageToggle.querySelector('[data-language-code]') : null;

    var updateLanguageToggleState = function () {
        var languageData;
        var nextLanguage;

        if (!languageToggle) {
            return;
        }

        languageData = translations[currentLanguage] || translations.en;
        nextLanguage = currentLanguage === 'it' ? 'en' : 'it';

        languageToggle.setAttribute('aria-label', languageData.languageToggleAria);
        languageToggle.setAttribute('aria-pressed', String(currentLanguage === 'it'));

        if (languageCodeEl) {
            languageCodeEl.textContent = nextLanguage.toUpperCase();
        }
    };

    var applyLanguage = function (language, options) {
        var normalizedLanguage = language === 'it' ? 'it' : 'en';
        var languageData = translations[normalizedLanguage] || translations.en;
        var heroButtons = doc.querySelectorAll('.hero__actions .btn');
        var heroAvatar = doc.querySelector('.hero__avatar');
        var shouldTrackPageView = !options || options.trackPageView !== false;
        var pageViewSource =
            options && options.pageViewSource ? options.pageViewSource : 'language_change';

        currentLanguage = normalizedLanguage;
        root.setAttribute('lang', normalizedLanguage);

        doc.title = languageData.metaTitle;
        setAttribute('meta[name="description"]', 'content', languageData.metaDescription);
        setAttribute('meta[property="og:title"]', 'content', languageData.metaTitle);
        setAttribute('meta[property="og:description"]', 'content', languageData.metaOgDescription);
        setAttribute('meta[name="twitter:title"]', 'content', languageData.metaTitle);
        setAttribute('meta[name="twitter:description"]', 'content', languageData.metaTwitterDescription);
        setAttribute('meta[property="og:image:alt"]', 'content', languageData.metaImageAlt);
        setAttribute('meta[name="twitter:image:alt"]', 'content', languageData.metaImageAlt);
        setAttribute('meta[property="og:locale"]', 'content', languageData.ogLocale);
        setAttribute('meta[property="og:locale:alternate"]', 'content', languageData.ogLocaleAlternate);

        setTextContent('.skip-link', languageData.skipLink);
        setAttribute('.nav', 'aria-label', languageData.mainNavigationAria);
        setAttribute('#mobile-menu', 'aria-label', languageData.mobileNavigationAria);
        setAttribute('#mobile-btn', 'aria-label', languageData.menuToggleAria);
        setNodeListText('.nav__link', languageData.navLinks);
        setNodeListText('#mobile-menu a', languageData.navLinks);

        setTextContent('.hero__name', languageData.heroName);
        setTextContent('.hero__title', languageData.heroTitle);
        setHTMLContent('.hero__desc', languageData.heroDescriptionHtml);

        if (heroButtons[0]) {
            heroButtons[0].textContent = languageData.heroPrimaryText;
            heroButtons[0].setAttribute('aria-label', languageData.heroPrimaryAria);
        }
        if (heroButtons[1]) {
            heroButtons[1].textContent = languageData.heroSecondaryText;
            heroButtons[1].setAttribute('aria-label', languageData.heroSecondaryAria);
        }

        if (heroAvatar) {
            heroAvatar.alt = languageData.metaImageAlt;
        }

        setTextContent('#about .section__label', languageData.aboutLabel);
        setTextContent('#about .section__title', languageData.aboutTitle);
        setNodeListText('#about .about__text p', [
            languageData.aboutLabel,
            languageData.aboutParagraph1,
            ''
        ]);
        setHTMLContent('#about .about__text p:nth-of-type(3)', languageData.aboutParagraph2Html);
        setNodeListText('.about__stat-label', languageData.aboutStats);

        setTextContent('#experience .section__label', languageData.experienceLabel);
        setTextContent('#experience .section__title', languageData.experienceTitle);
        setNodeListText('#experience .exp__date', languageData.experienceDates);
        setNodeListText('#experience .exp__role', languageData.experienceRoles);
        setNodeListText('#experience .exp__desc p', languageData.experienceDescriptions);

        setTextContent('#projects .section__label', languageData.projectsLabel);
        setTextContent('#projects .section__title', languageData.projectsTitle);
        setNodeListText('#projects .project__desc', languageData.projectDescriptions);
        setNodeListText('#projects .project__link', languageData.projectLinkTexts);
        setNodeListAttribute('#projects .project__link', 'aria-label', languageData.projectLinkAriaLabels);

        setTextContent('#skills .section__label', languageData.skillsLabel);
        setTextContent('#skills .section__title', languageData.skillsTitle);
        setNodeListText('#skills .skills__category h3', languageData.skillsCategories);
        setNodeListText('#skills .skills__list li', languageData.skillsItems);

        setTextContent('#education .section__label', languageData.educationLabel);
        setTextContent('#education .section__title', languageData.educationTitle);
        setNodeListText('#education .edu__degree', languageData.educationDegrees);
        setNodeListText('#education .edu__school', languageData.educationSchools);
        setNodeListText('#education .edu__detail', languageData.educationDetails);

        setTextContent('.footer__title', languageData.footerTitle);
        setTextContent('.footer__subtitle', languageData.footerSubtitle);
        setNodeListText('.footer__link', languageData.footerLinks);
        setTextContent('#footer-location', languageData.footerLocation);

        setAttribute('#scroll-top', 'aria-label', languageData.scrollTopAria);

        Array.prototype.slice.call(doc.querySelectorAll('img[data-pypi-badge]')).forEach(function (badge) {
            var pkg = badge.getAttribute('data-pypi-badge');
            if (!pkg) {
                return;
            }
            badge.alt = buildPyPIBadgeAlt(pkg);
        });

        updateLanguageToggleState();
        applyTheme(getCurrentTheme(), {
            trackPageView: false
        });

        if (shouldTrackPageView) {
            pushPageViewEvent(pageViewSource);
        }
    };

    initOutboundLinkTracking();

    applyLanguage(resolveInitialLanguage(), {
        pageViewSource: 'initial_load'
    });

    if (languageToggle) {
        languageToggle.addEventListener('click', function () {
            var nextLanguage = currentLanguage === 'it' ? 'en' : 'it';
            applyLanguage(nextLanguage, {
                pageViewSource: 'language_change'
            });
            try {
                localStorage.setItem('language', nextLanguage);
            } catch (e) {
                // Ignore storage errors in restricted browsing contexts.
            }
        });
    }

    // Mobile menu
    var mobileBtn = doc.getElementById('mobile-btn');
    var mobileMenu = doc.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        var mobileIcon = mobileBtn.querySelector('[data-mobile-icon]');

        var closeMobileMenu = function () {
            mobileMenu.classList.remove('open');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            if (mobileIcon) {
                mobileIcon.textContent = '☰';
            }
        };

        mobileBtn.addEventListener('click', function () {
            var open = mobileMenu.classList.toggle('open');
            mobileBtn.setAttribute('aria-expanded', String(open));
            mobileMenu.setAttribute('aria-hidden', String(!open));
            if (mobileIcon) {
                mobileIcon.textContent = open ? '✕' : '☰';
            }
        });

        mobileMenu.addEventListener('click', function (event) {
            if (event.target && event.target.tagName === 'A') {
                closeMobileMenu();
            }
        });

        doc.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
                mobileBtn.focus();
            }
        });

        doc.addEventListener('click', function (event) {
            var target = event.target;
            if (
                mobileMenu.classList.contains('open') &&
                target &&
                !mobileMenu.contains(target) &&
                !mobileBtn.contains(target)
            ) {
                closeMobileMenu();
            }
        });
    }

    var initPyPIBadges = function () {
        var badgeNodes = Array.prototype.slice.call(doc.querySelectorAll('img[data-pypi-badge]'));
        if (!badgeNodes.length) {
            return;
        }

        var hasWarmedUpConnection = false;
        var warmUpShieldsConnection = function () {
            if (hasWarmedUpConnection) {
                return;
            }

            hasWarmedUpConnection = true;

            var preconnectLink = doc.createElement('link');
            preconnectLink.rel = 'preconnect';
            preconnectLink.href = 'https://img.shields.io';
            preconnectLink.crossOrigin = 'anonymous';
            doc.head.appendChild(preconnectLink);

            var dnsPrefetchLink = doc.createElement('link');
            dnsPrefetchLink.rel = 'dns-prefetch';
            dnsPrefetchLink.href = '//img.shields.io';
            doc.head.appendChild(dnsPrefetchLink);
        };

        var loadPyPIBadge = function (badge) {
            if (!badge || badge.getAttribute('data-loaded') === 'true') {
                return;
            }

            var pkg = badge.getAttribute('data-pypi-badge');
            if (!pkg) {
                return;
            }

            warmUpShieldsConnection();

            badge.src = buildPyPIBadgeUrl(pkg, getCurrentTheme());
            badge.alt = buildPyPIBadgeAlt(pkg);
            badge.setAttribute('data-loaded', 'true');
        };

        if (hasIntersectionObserver) {
            var badgeObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        loadPyPIBadge(entry.target);
                        observer.unobserve(entry.target);
                    });
                },
                { rootMargin: '250px 0px' }
            );

            badgeNodes.forEach(function (badge) {
                badgeObserver.observe(badge);
            });
            return;
        }

        runWhenIdle(function () {
            badgeNodes.forEach(function (badge) {
                loadPyPIBadge(badge);
            });
        }, 1500);
    };

    var initScrollTop = function () {
        var scrollTopBtn = doc.getElementById('scroll-top');

        if (scrollTopBtn) {
            var updateScrollTopVisibility = function () {
                scrollTopBtn.classList.toggle('visible', win.scrollY > 500);
            };

            var scrollTickPending = false;
            var onScrollForButton = function () {
                if (scrollTickPending) {
                    return;
                }
                scrollTickPending = true;
                win.requestAnimationFrame(function () {
                    updateScrollTopVisibility();
                    scrollTickPending = false;
                });
            };

            win.addEventListener('scroll', onScrollForButton, { passive: true });
            updateScrollTopVisibility();

            scrollTopBtn.addEventListener('click', function () {
                win.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });
        }
    };

    var initBadgeLoading = function () {
        var projectsSection = doc.getElementById('projects');
        if (!projectsSection || !hasIntersectionObserver) {
            runWhenIdle(initPyPIBadges, 2200);
            return;
        }

        var started = false;
        var start = function () {
            if (started) {
                return;
            }

            started = true;
            runWhenIdle(initPyPIBadges, 1200);
        };

        var projectsObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    start();
                    observer.disconnect();
                });
            },
            { rootMargin: '300px 0px' }
        );

        projectsObserver.observe(projectsSection);
    };

    var initDeferredFeatures = function () {
        if (!isMobileViewport) {
            runWhenIdle(initScrollTop, 1200);
        }
        runWhenIdle(initBadgeLoading, 1800);
    };

    onLoadIdle(function () {
        runOnInteractionOrTimeout(initDeferredFeatures, 6000);
    }, 1000);
})();

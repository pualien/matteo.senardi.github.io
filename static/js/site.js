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

    // Theme toggle
    var themeToggle = doc.getElementById('theme-toggle');
    if (themeToggle) {
        var themeIcon = themeToggle.querySelector('[data-theme-icon]');

        var applyTheme = function (theme) {
            root.setAttribute('data-theme', theme);
            if (themeIcon) {
                themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
            }
            themeToggle.setAttribute(
                'aria-label',
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        };

        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

        themeToggle.addEventListener('click', function () {
            var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            try {
                localStorage.setItem('theme', nextTheme);
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

            badge.src = 'https://img.shields.io/pypi/dm/' + encodeURIComponent(pkg);
            badge.alt = pkg + ' monthly downloads';
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

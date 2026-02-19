(function () {
    var doc = document;
    var win = window;
    var root = doc.documentElement;
    var hasIntersectionObserver = 'IntersectionObserver' in win;
    var prefersReducedMotion =
        typeof win.matchMedia === 'function' &&
        win.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    var initReveal = function () {
        var revealNodes = doc.querySelectorAll('.reveal');
        if (!revealNodes.length) {
            return;
        }

        if (prefersReducedMotion || !hasIntersectionObserver) {
            revealNodes.forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        var revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        revealNodes.forEach(function (el) {
            revealObserver.observe(el);
        });
    };

    var initNavAndScrollTop = function () {
        var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.nav__link'));
        var sectionNodes = doc.querySelectorAll('section[id], footer[id], header[id]');
        var scrollTopBtn = doc.getElementById('scroll-top');

        var setActiveLink = function (id) {
            if (!id) {
                return;
            }
            navLinks.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        };

        if (sectionNodes.length && navLinks.length && hasIntersectionObserver) {
            var visibleRatiosById = {};

            var activeObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        var id = entry.target.id;
                        if (!id) {
                            return;
                        }

                        if (entry.isIntersecting) {
                            visibleRatiosById[id] = entry.intersectionRatio;
                        } else {
                            delete visibleRatiosById[id];
                        }
                    });

                    var bestId = '';
                    var bestRatio = -1;
                    Object.keys(visibleRatiosById).forEach(function (id) {
                        var ratio = visibleRatiosById[id];
                        if (ratio > bestRatio) {
                            bestRatio = ratio;
                            bestId = id;
                        }
                    });

                    if (bestId) {
                        setActiveLink(bestId);
                    }
                },
                {
                    rootMargin: '-35% 0px -55% 0px',
                    threshold: [0, 0.5, 1]
                }
            );

            sectionNodes.forEach(function (section) {
                activeObserver.observe(section);
            });
        } else if (sectionNodes.length && navLinks.length) {
            // Fallback when IntersectionObserver is not available.
            var tickPending = false;

            var updateActiveByScroll = function () {
                var y = win.scrollY + 120;
                var current = '';

                sectionNodes.forEach(function (section) {
                    if (section.offsetTop <= y) {
                        current = section.id;
                    }
                });
                setActiveLink(current);
            };

            var onScroll = function () {
                if (tickPending) {
                    return;
                }
                tickPending = true;
                win.requestAnimationFrame(function () {
                    updateActiveByScroll();
                    tickPending = false;
                });
            };

            win.addEventListener('scroll', onScroll, { passive: true });
            updateActiveByScroll();
        }

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

    var initDeferredFeatures = function () {
        initReveal();
        runWhenIdle(initNavAndScrollTop, 1200);
        runWhenIdle(initPyPIBadges, 2000);
    };

    onLoadIdle(function () {
        runOnInteractionOrTimeout(initDeferredFeatures, 2200);
    }, 1000);
})();

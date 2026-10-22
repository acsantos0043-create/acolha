document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. DARK MODE (LocalStorage)
    // =========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // =========================================================================
    // 2. HEADER GLASSMORPHISM NO SCROLL
    // =========================================================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================================================
    // 3. MENU MOBILE
    // =========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // =========================================================================
    // 4. ACCORDION FAQ
    // =========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =========================================================================
    // 5. INTERSECTION OBSERVER (Animações de Entrada)
    // =========================================================================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .card, .testimonial').forEach(el => {
        observer.observe(el);
    });

    // =========================================================================
    // 6. RASTREAMENTO DE UTMs E INJEÇÃO NO WHATSAPP
    // =========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {};
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
        if (urlParams.has(param)) {
            utmData[param] = urlParams.get(param);
            localStorage.setItem(param, urlParams.get(param));
        } else {
            utmData[param] = localStorage.getItem(param) || 'organico';
        }
    });

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const baseMessage = `Olá, Cláudia! Vim pelo site (Fonte: ${utmData.utm_source}, Campanha: ${utmData.utm_campaign}) e gostaria de mais informações sobre o apoio ao luto.`;
    const encodedMessage = encodeURIComponent(baseMessage);
    
    whatsappLinks.forEach(link => {
        const baseUrl = link.href.split('?')[0];
        link.href = `${baseUrl}?text=${encodedMessage}`;
    });

    // =========================================================================
    // 7. SISTEMA DE CONSENTIMENTO DE COOKIES (LGPD)
    // =========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const customizeBtn = document.getElementById('cookie-customize');
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        setTimeout(() => cookieBanner.classList.add('show'), 1000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
        enableTracking();
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.remove('show');
    });

    customizeBtn.addEventListener('click', () => {
        alert('Funcionalidade de personalização: Apenas cookies essenciais serão mantidos.');
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.remove('show');
    });

    // =========================================================================
    // 8. FUNÇÃO DE RASTREAMENTO SEGURA (Só dispara se aceito)
    // =========================================================================
    window.trackEvent = function(eventName, element) {
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            if (typeof gtag === 'function') {
                gtag('event', eventName, { 'event_category': 'engagement', 'event_label': element });
            }
            if (typeof fbq === 'function') {
                fbq('trackCustom', eventName, { element: element });
            }
            console.log(`[Track Permitido] ${eventName} - ${element}`);
        } else {
            console.log(`[Track Bloqueado pela LGPD] ${eventName} - ${element}`);
        }
    };

    function enableTracking() {
        console.log('Rastreamento de marketing ativado após consentimento LGPD.');
    }

    // =========================================================================
    // 9. FORMULÁRIO INTELIGENTE (Fallback Mailto/WA + Rascunho)
    // =========================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            localStorage.setItem('formDraft', JSON.stringify({ name, email, message }));

            const waMsg = encodeURIComponent(`Olá, Cláudia! Meu nome é ${name}. E-mail: ${email}. Mensagem: ${message}`);
            window.open(`https://wa.me/5511916348793?text=${waMsg}`, '_blank');
            
            contactForm.reset();
            localStorage.removeItem('formDraft');
            alert('Obrigado pelo contato! Redirecionando para o WhatsApp para atendimento imediato.');
        });

        const draft = localStorage.getItem('formDraft');
        if (draft) {
            const data = JSON.parse(draft);
            document.getElementById('name').value = data.name || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('message').value = data.message || '';
        }
    }
});
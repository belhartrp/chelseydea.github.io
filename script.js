
    window.addEventListener('DOMContentLoaded', () => {
      const root = document.documentElement;
      const header = document.getElementById('header');
      const themeToggle = document.querySelector('[data-theme-toggle]');
      let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', theme);
      themeToggle.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);

      themeToggle.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      });

      document.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 24);
      });

      AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });

      if (window.gsap) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.hero-copy > *', {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out'
        });

        gsap.from('.profile-card', {
          scale: 0.92,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out'
        });

        gsap.utils.toArray('.progress-line span').forEach((bar) => {
          gsap.to(bar, {
            width: bar.dataset.width,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%'
            }
          });
        });

        gsap.utils.toArray('.project-card, .skill-card, .gallery-card, .timeline-card').forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%'
            }
          });
        });

        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = +counter.dataset.target;
          ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              gsap.fromTo(counter, { innerText: 0 }, {
                innerText: target,
                duration: 1.4,
                snap: { innerText: 1 },
                ease: 'power1.out'
              });
            }
          });
        });

        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        magneticButtons.forEach(btn => {
          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.12, y: y * 0.18, duration: 0.3, ease: 'power3.out' });
          });
          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.4)' });
          });
        });
      }

      const swiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 900,
        loop: true,
        autoplay: { delay: 3600, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true }
      });

      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
          }
        });
      }, { threshold: 0.45 });
      sections.forEach(section => observer.observe(section));
      window._swiper = swiper;
    });

    function showToast() {
      const toastElement = document.getElementById('liveToast');
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
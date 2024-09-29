document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    const heroBackgroundImages = document.querySelectorAll('.hero-background img');
    let currentImageIndex = 0;

    function rotateHeroImages() {
        heroBackgroundImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroBackgroundImages.length;
        heroBackgroundImages[currentImageIndex].classList.add('active');
    }

    setInterval(rotateHeroImages, 5000);

    const fadeInElements = document.querySelectorAll('.fade-in');

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function handleScroll() {
        fadeInElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', debounce(handleScroll));
    handleScroll(); 
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.parentElement;
            const isActive = parent.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                item.querySelector('.accordion-content').setAttribute('aria-hidden', 'true');
            });

            if (!isActive) {
                parent.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                parent.querySelector('.accordion-content').setAttribute('aria-hidden', 'false');
            }
        });

        header.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                header.click();
            }
        });
    });

    const introAnimation = document.querySelector('.intro-animation');
    const introLogo = document.querySelector('.intro-logo');
    const pageContent = document.querySelector('.page-content');

    if (pageContent) {
        pageContent.classList.add('blur');
    }

    if (introLogo) {
        introLogo.addEventListener('animationend', () => {
            introAnimation.classList.add('fade-out');
            
            introAnimation.addEventListener('transitionend', () => {
                introAnimation.style.display = 'none';
                if (pageContent) {
                    pageContent.classList.remove('blur');
                }
            });
        });
    }

    setTimeout(() => {
        if (introAnimation && introAnimation.classList.contains('active')) {
            introAnimation.classList.add('fade-out');
            introAnimation.addEventListener('transitionend', () => {
                introAnimation.style.display = 'none';
                if (pageContent) {
                    pageContent.classList.remove('blur');
                }
            });
        }
    }, 3000); 


    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const getStartedBtnSmooth = document.querySelector('.get-started-btn');
    const targetSection = document.querySelector('#join-uniengineer');

    if (getStartedBtnSmooth && targetSection) {
        getStartedBtnSmooth.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

           
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        });
    }
});

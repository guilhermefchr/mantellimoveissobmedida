document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Header Scroll Effect
    ========================================= */
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       1.5 Mobile Menu Toggle
    ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('open');
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* =========================================
       2. Scroll Reveal Animations
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       3. Animated Number Counters
    ========================================= */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // ~60fps

                    let current = 0;
                    const updateNumber = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current).toLocaleString('pt-BR');
                            requestAnimationFrame(updateNumber);
                        } else {
                            stat.innerText = target.toLocaleString('pt-BR');
                        }
                    };
                    updateNumber();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.company-about');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* =========================================
       4. Modern Carousel (Coverflow)
    ========================================= */
    const mSlides = document.querySelectorAll('.m-slide');
    const mNextBtn = document.getElementById('mNextBtn');
    const mPrevBtn = document.getElementById('mPrevBtn');
    let mCurrentIndex = 0;

    function updateModernCarousel() {
        if (mSlides.length === 0) return;
        mSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            if (index === mCurrentIndex) {
                slide.classList.add('active');
            } else if (index === (mCurrentIndex - 1 + mSlides.length) % mSlides.length) {
                slide.classList.add('prev');
            } else if (index === (mCurrentIndex + 1) % mSlides.length) {
                slide.classList.add('next');
            }
        });
    }

    if (mSlides.length > 0) {
        updateModernCarousel();

        mNextBtn.addEventListener('click', () => {
            mCurrentIndex = (mCurrentIndex + 1) % mSlides.length;
            updateModernCarousel();
        });

        mPrevBtn.addEventListener('click', () => {
            mCurrentIndex = (mCurrentIndex - 1 + mSlides.length) % mSlides.length;
            updateModernCarousel();
        });

        // Click on side slides to navigate
        mSlides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (slide.classList.contains('prev') || slide.classList.contains('next')) {
                    mCurrentIndex = index;
                    updateModernCarousel();
                }
            });
        });

        // Auto play
        setInterval(() => {
            mCurrentIndex = (mCurrentIndex + 1) % mSlides.length;
            updateModernCarousel();
        }, 4000);
    }

    /* =========================================
       4.5 3D Environment Configurator
    ========================================= */
    const scene = document.getElementById('cfgScene');
    const model = document.getElementById('cfgModel');
    const glare = document.getElementById('cfgGlare');
    const cfgImage = document.getElementById('cfgImage');
    const cfgBtns = document.querySelectorAll('.cfg-btn');

    if (scene && model && glare) {
        scene.addEventListener('mousemove', (e) => {
            const rect = scene.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit degrees so it doesn't flip
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            model.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Move glare effect
            const glareX = (x / rect.width) * 200 - 100;
            glare.style.transform = `translateX(${glareX}%)`;
        });

        scene.addEventListener('mouseleave', () => {
            model.style.transform = `rotateX(0deg) rotateY(0deg)`;
            glare.style.transform = `translateX(-100%)`;
        });

        scene.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = scene.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = Math.max(-15, Math.min(15, ((y - centerY) / centerY) * -15));
                const rotateY = Math.max(-15, Math.min(15, ((x - centerX) / centerX) * 15));

                model.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        scene.addEventListener('touchend', () => {
            model.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });

        cfgBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                cfgBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const imgSrc = btn.getAttribute('data-img');
                if (imgSrc) {
                    cfgImage.src = imgSrc;
                    cfgImage.style.filter = 'none';
                }
            });
        });
    }

    /* =========================================
       5. Modal logic
    ========================================= */
    const modal = document.getElementById('formModal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.getElementById('closeModal');

    if (modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // block scroll
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // allow scroll
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    /* =========================================
       6. Dynamic Form (Typeform Style)
    ========================================= */
    const form = document.getElementById('dynamicForm');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const progressBar = document.getElementById('formProgress');

    let currentStep = 0;
    const totalSteps = steps.length;

    // Update the UI to show the current step
    function updateFormSteps() {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === currentStep) {
                step.classList.add('active');
            }
        });

        // Update Progress Bar (25% per step)
        const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Validation per step
    function validateStep(index) {
        if (index === 0) {
            const radio = document.querySelector('input[name="projectType"]:checked');
            if (!radio) { alert('Por favor, selecione o tipo de projeto.'); return false; }
        }
        if (index === 1) {
            const radio = document.querySelector('input[name="deadline"]:checked');
            if (!radio) { alert('Por favor, informe para quando precisa dos móveis.'); return false; }
        }
        if (index === 2) {
            const radio = document.querySelector('input[name="hasProject"]:checked');
            if (!radio) { alert('Por favor, informe se você possui projeto/planta.'); return false; }
        }
        return true;
    }

    // Next step logic
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps - 1) {
                    currentStep++;
                    updateFormSteps();
                }
            }
        });
    });

    // Previous step logic
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateFormSteps();
            }
        });
    });

    /* =========================================
       7. Form Submit / WhatsApp Redirect
    ========================================= */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather data
        const projectType = document.querySelector('input[name="projectType"]:checked').value;
        const deadline = document.querySelector('input[name="deadline"]:checked').value;
        const hasProject = document.querySelector('input[name="hasProject"]:checked').value;
        const userName = document.getElementById('userName').value;

        if (!userName.trim()) {
            alert('Por favor, digite o seu nome antes de finalizar.');
            return;
        }

        // WhatsApp specific config
        const phoneNumber = "551144374048"; // Número atual listado no site da Mantelli

        const messageText = `Olá equipe Mantelli! Meu nome é *${userName}* e gostaria de solicitar um orçamento.
        
*Meus Detalhes:*
- Tipo de projeto: ${projectType}
- Prazo desejado: ${deadline}
- Possui planta/projeto? ${hasProject}

Aguardo o retorno para continuarmos o atendimento!`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Redirect
        window.open(whatsappUrl, '_blank');

        // Reset form visually (optional)
        form.reset();
        currentStep = 0;
        updateFormSteps();
    });

});

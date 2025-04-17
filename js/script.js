// Ferrari Cred - JavaScript Functions
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Transform hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('active') && !event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const privacy = document.getElementById('privacy').checked;
            
            // Basic validation
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Por favor, informe seu nome.\n';
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }
            
            if (email === '') {
                isValid = false;
                errorMessage += 'Por favor, informe seu e-mail.\n';
                document.getElementById('email').classList.add('error');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Por favor, informe um e-mail válido.\n';
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            if (phone === '') {
                isValid = false;
                errorMessage += 'Por favor, informe seu telefone.\n';
                document.getElementById('phone').classList.add('error');
            } else {
                document.getElementById('phone').classList.remove('error');
            }
            
            if (service === '') {
                isValid = false;
                errorMessage += 'Por favor, selecione um serviço.\n';
                document.getElementById('service').classList.add('error');
            } else {
                document.getElementById('service').classList.remove('error');
            }
            
            if (!privacy) {
                isValid = false;
                errorMessage += 'Você precisa concordar com a Política de Privacidade.\n';
                document.getElementById('privacy').parentElement.classList.add('error');
            } else {
                document.getElementById('privacy').parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // Form is valid, can submit
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset();
            } else {
                // Show error message
                alert('Por favor, corrija os seguintes erros:\n\n' + errorMessage);
            }
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Testimonial slider autoplay
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        if (testimonials.length > 1) {
            let currentSlide = 0;
            
            function moveToSlide(index) {
                if (index >= testimonials.length) {
                    index = 0;
                }
                
                testimonialSlider.scrollTo({
                    left: testimonials[index].offsetLeft - testimonialSlider.offsetLeft,
                    behavior: 'smooth'
                });
                
                currentSlide = index;
            }
            
            // Auto scroll testimonials every 5 seconds
            setInterval(() => {
                moveToSlide(currentSlide + 1);
            }, 5000);
        }
    }

    // Add animation on scroll
    const animateElements = document.querySelectorAll('.service-card, .testimonial');
    const animateOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, animateOptions);

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        animateObserver.observe(element);
    });

    // WhatsApp Button Animation
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappBtn.classList.add('visible');
            } else {
                whatsappBtn.classList.remove('visible');
            }
        });
        
        // Initial check
        if (window.scrollY > 300) {
            whatsappBtn.classList.add('visible');
        }
    }

    // Add notification system
    function showNotification(message, type) {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = `notification ${type}`;
        notificationContainer.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notificationContainer);
        
        // Show notification
        setTimeout(() => {
            notificationContainer.classList.add('show');
        }, 100);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notificationContainer.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notificationContainer);
            }, 300);
        }, 5000);
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Add CSS animation for WhatsApp button
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        
        .whatsapp-float.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .notification {
            position: fixed;
            top: -100px;
            right: 20px;
            background-color: #fff;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transition: top 0.3s ease;
            z-index: 1001;
            max-width: 350px;
        }
        
        .notification.show {
            top: 20px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
        }
        
        .notification-content i {
            font-size: 24px;
            margin-right: 10px;
        }
        
        .notification.success .notification-content i {
            color: #2ecc71;
        }
        
        .notification.error .notification-content i {
            color: #e74c3c;
        }
        
        .notification-content p {
            margin: 0;
            font-size: 14px;
        }
        
        .service-card, .testimonial {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .testimonial.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}); 
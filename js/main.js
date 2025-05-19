

// Script principal para el sitio web
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.getElementById('scroll-to-top');
    const skillBars = document.querySelectorAll('.skill-progress');
    const revealElements = document.querySelectorAll('.reveal');

    // Toggle menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Inicializar Particles.js en el hero si existe
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Cambiar estilo del header al hacer scroll
    function handleScroll() {
        // Header estilo al hacer scroll
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Botón de volver arriba
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
        
        // Destacar enlace activo al desplazarse
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
        
        // Revelar elementos al hacer scroll
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // Inicializar las barras de habilidades
    function initSkillBars() {
        skillBars.forEach(bar => {
            // Guardar el ancho original como atributo
            const width = bar.style.width;
            bar.setAttribute('data-width', width);
            // Iniciar en 0
            bar.style.width = '0';
        });

        setTimeout(() => {
            skillBars.forEach(bar => {
                // Restaurar al ancho original con animación
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 500);
    }

    // NUEVO: Funcionamiento del acordeón de servicios
    const serviceHeaders = document.querySelectorAll('.service-header');
    
    if (serviceHeaders.length > 0) {
        serviceHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const panel = this.parentElement;
                const content = this.nextElementSibling;
                const expandBtn = this.querySelector('.expand-btn');
                
                // Cierra todos los paneles abiertos
                document.querySelectorAll('.service-content').forEach(item => {
                    if (item !== content && item.classList.contains('active')) {
                        item.classList.remove('active');
                        item.previousElementSibling.querySelector('.expand-btn').classList.remove('active');
                    }
                });
                
                // Abre/cierra el panel actual
                content.classList.toggle('active');
                expandBtn.classList.toggle('active');
            });
        });
    }

    // Filtro de proyectos (actualizado para mantener el diseño original)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Activar botón
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filtrar proyectos
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    // Eliminar animación previa
                    card.classList.remove('fade-in');
                    
                    if (filter === 'all') {
                        // Mostrar todas las tarjetas con animación
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.classList.add('fade-in');
                        }, 10);
                    } else if (card.getAttribute('data-category') === filter) {
                        // Mostrar tarjetas de la categoría seleccionada con animación
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.classList.add('fade-in');
                        }, 10);
                    } else {
                        // Ocultar las tarjetas que no pertenecen a la categoría
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Validación y envío del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            let valid = true;
            const inputs = contactForm.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                // Validar email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        valid = false;
                        input.classList.add('error');
                    }
                }
            });
            
            if (valid) {
                // Simulación de envío exitoso
                const submitBtn = contactForm.querySelector('.form-submit');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Crear notificación de éxito
                    const notification = document.createElement('div');
                    notification.className = 'form-notification success';
                    notification.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias por tu mensaje! Te responderé lo antes posible.';
                    
                    contactForm.appendChild(notification);
                    
                    // Resetear formulario
                    contactForm.reset();
                    submitBtn.innerHTML = 'Enviar Mensaje';
                    submitBtn.disabled = false;
                    
                    // Ocultar notificación después de 5 segundos
                    setTimeout(() => {
                        notification.style.opacity = '0';
                        setTimeout(() => {
                            notification.remove();
                        }, 300);
                    }, 5000);
                }, 2000);
            }
        });
    }

    // Scroll suave al hacer clic en enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botón de volver arriba
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animación de entrada para los elementos de la página
    function animateOnScroll() {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    // Inicializar todos los efectos
    function init() {
        // Activar para disparar el primer cálculo de elementos visibles
        handleScroll();
        
        // Inicializar barras de habilidades
        initSkillBars();
        
        // Animar elementos cuando sean visibles
        animateOnScroll();
        
        // Activar el filtro "Todos" por defecto en la sección de proyectos
        const defaultFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (defaultFilterBtn) {
            defaultFilterBtn.click();
        }
    }

    // Ejecutar inicialización
    init();
});


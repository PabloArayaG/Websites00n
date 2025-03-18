/**
 * EstudioDiseño - Landing Page Modern Dark Theme
 * Script principal para la interactividad de la página
 */

// Elementos del DOM
const header = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// Navegación sticky
function handleStickyHeader() {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Navegación móvil
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Cerrar menú móvil
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Resaltar enlace activo
function highlightActiveLink() {
    let scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Formulario de contacto
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Validación simple
    if (!name || !email || !message) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // Simulación de envío
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // Simulamos una respuesta exitosa después de 1 segundo
    setTimeout(() => {
        contactForm.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Mensaje enviado</h3>
                <p>Gracias ${name}, nos pondremos en contacto contigo pronto.</p>
            </div>
        `;
    }, 1000);
}

// Desplazamiento suave
function scrollToSection(targetId) {
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerHeight = header.offsetHeight;
        
        setTimeout(() => {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Crear partículas para el fondo
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Eliminamos las partículas existentes para crear nuevas
    particlesContainer.innerHTML = '';
    
    // Creamos 15 partículas
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // Tamaño aleatorio entre 1px y 4px
        const size = Math.random() * 3 + 1;
        
        // Retraso aleatorio para la animación
        const delay = Math.random() * 15;
        
        // Duración aleatoria para la animación
        const duration = Math.random() * 10 + 20;
        
        // Aplicar estilos
        particle.style.top = `${top}%`;
        particle.style.left = `${left}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Efecto de resplandor siguiendo el ratón
function addGlowEffects() {
    const glowElements = document.querySelectorAll('.service-icon, .btn-primary');
    
    document.addEventListener('mousemove', (e) => {
        glowElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.setProperty('--x-position', `${x}px`);
            el.style.setProperty('--y-position', `${y}px`);
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Navegación
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Enlaces de navegación
    navLinksItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            closeMobileMenu();
            scrollToSection(href);
        });
    });
    
    // Enlaces internos
    document.querySelectorAll('a[href^="#"]:not(.nav-links li a)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href'));
        });
    });
    
    // Formulario
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Efectos
    createParticles();
    addGlowEffects();
});

// Eventos de scroll
window.addEventListener('scroll', () => {
    handleStickyHeader();
    highlightActiveLink();
}); 
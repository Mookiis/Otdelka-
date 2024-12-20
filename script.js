// Плавная навигация
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Изменение навбара при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Анимация чисел в статистике
function animateNumbers() {
    const statsCards = document.querySelectorAll('.stats-card');
    
    statsCards.forEach(card => {
        const numberElement = card.querySelector('.stats-number');
        const targetValue = parseInt(card.dataset.value);
        let currentValue = 0;
        
        const increment = targetValue / 50; // Скорость анимации
        
        const updateNumber = () => {
            if (currentValue < targetValue) {
                currentValue += increment;
                if (currentValue > targetValue) currentValue = targetValue;
                
                numberElement.textContent = Math.floor(currentValue) + (numberElement.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateNumber);
            }
        };
        
        updateNumber();
    });
}

// Наблюдатель для запуска анимации чисел
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats-section')?.let(section => observer.observe(section));

// Динамическая галерея портфолио
const portfolioImages = [
    { url: '/api/placeholder/400/300', title: 'Проект 1' },
    { url: '/api/placeholder/400/300', title: 'Проект 2' },
    { url: '/api/placeholder/400/300', title: 'Проект 3' },
    { url: '/api/placeholder/400/300', title: 'Проект 4' },
    { url: '/api/placeholder/400/300', title: 'Проект 5' },
    { url: '/api/placeholder/400/300', title: 'Проект 6' }
];

const portfolioGallery = document.querySelector('.portfolio-gallery');
if (portfolioGallery) {
    portfolioImages.forEach((image, index) => {
        const delay = index * 200;
        const html = `
            <div class="col-md-4" data-aos="zoom-in" data-aos-delay="${delay}">
                <div class="portfolio-item shadow-sm">
                    <img src="${image.url}" alt="${image.title}" class="img-fluid">
                </div>
            </div>
        `;
        portfolioGallery.insertAdjacentHTML('beforeend', html);
    });
}

// Обработка формы
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Анимация кнопки при отправке
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Отправка...';
    submitBtn.disabled = true;
    
    submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Отправлено!';
    submitBtn.classList.add('btn-success');
    
    // Сброс формы и кнопки через 3 секунды
    setTimeout(() => {
        this.reset();
        submitBtn.innerHTML = 'Отправить заявку';
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-success');
    }, 3000);
}, 2000);

// Параллакс эффект для фона героя
document.querySelector('.hero-section')?.addEventListener('mousemove', (e) => {
const moving_value = 3; // Степень эффекта параллакса
const x = (e.clientX * moving_value) / 250;
const y = (e.clientY * moving_value) / 250;

document.querySelector('.hero-section').style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
});

// Анимация сервисных карточек при наведении
document.querySelectorAll('.service-card').forEach(card => {
card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.service-icon i');
    icon.style.transform = 'rotateY(180deg)';
    setTimeout(() => {
        icon.style.transform = 'rotateY(0deg)';
    }, 300);
});
});

// Добавление эффекта волны при клике на кнопки
function createRipple(event) {
const button = event.currentTarget;
const circle = document.createElement('span');
const diameter = Math.max(button.clientWidth, button.clientHeight);

circle.style.width = circle.style.height = `${diameter}px`;
circle.style.left = `${event.clientX - button.offsetLeft - diameter / 2}px`;
circle.style.top = `${event.clientY - button.offsetTop - diameter / 2}px`;
circle.classList.add('ripple');

const ripple = button.getElementsByClassName('ripple')[0];
if (ripple) {
    ripple.remove();
}

button.appendChild(circle);
}

document.querySelectorAll('.btn-custom').forEach(button => {
button.addEventListener('click', createRipple);
});

// Анимация для поля ввода в форме
document.querySelectorAll('.form-control').forEach(input => {
input.addEventListener('focus', function() {
    this.parentElement.classList.add('input-focused');
});

input.addEventListener('blur', function() {
    if (!this.value) {
        this.parentElement.classList.remove('input-focused');
    }
});
});

// Ленивая загрузка изображений
document.addEventListener('DOMContentLoaded', function() {
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
});

// Добавление анимации при скролле для секций
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
    }
});
}, { threshold: 0.2 });

sections.forEach(section => {
section.classList.add('section-hidden');
sectionObserver.observe(section);
});

// Мобильное меню
const mobileMenu = document.querySelector('.navbar-toggler');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenu?.addEventListener('click', function() {
document.body.classList.toggle('menu-open');
});

navLinks.forEach(link => {
link.addEventListener('click', () => {
    if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        mobileMenu.click();
    }
});
});

// Динамический год в футере
const yearElement = document.querySelector('.current-year');
if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}

// Добавление прелоадера
window.addEventListener('load', () => {
const preloader = document.querySelector('.preloader');
if (preloader) {
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
        preloader.remove();
    }, 1000);
}
});

// Обработка ошибок ввода в форме
function validateForm(form) {
const inputs = form.querySelectorAll('input, textarea');
let isValid = true;

inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        showError(input, 'Это поле обязательно для заполнения');
    } else if (input.type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        showError(input, 'Введите корректный email');
    } else if (input.type === 'tel' && !validatePhone(input.value)) {
        isValid = false;
        showError(input, 'Введите корректный номер телефона');
    } else {
        removeError(input);
    }
});

return isValid;
}

function showError(input, message) {
const errorDiv = input.nextElementSibling?.classList.contains('error-message') 
    ? input.nextElementSibling 
    : document.createElement('div');

errorDiv.className = 'error-message';
errorDiv.textContent = message;

if (!input.nextElementSibling?.classList.contains('error-message')) {
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

input.classList.add('is-invalid');
}

function removeError(input) {
const errorDiv = input.nextElementSibling;
if (errorDiv?.classList.contains('error-message')) {
    errorDiv.remove();
}
input.classList.remove('is-invalid');
}

function validateEmail(email) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
}

// Инициализация всех компонентов
document.addEventListener('DOMContentLoaded', function() {
// Инициализация тултипов
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Инициализация анимаций
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
});
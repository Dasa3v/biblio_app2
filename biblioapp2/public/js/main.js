// public/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    //  Configuración Global
    // ======================
    'use strict';
  
    // ======================
    //  Funciones Comunes
    // ======================
  
    /**
     * Inicializa componentes Bootstrap que necesitan JS
     */
    const initBootstrapComponents = () => {
      // Tooltips
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      [...tooltipTriggerList].forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
      // Popovers
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      [...popoverTriggerList].forEach(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    };
  
    /**
     * Maneja la validación de formularios
     */
    const handleFormValidation = () => {
      document.querySelectorAll('form.needs-validation').forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    };
  
    // ======================
    //  Manejo de Tema Oscuro
    // ======================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
  
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('theme', theme);
      
      if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' 
          ? '<i class="bi bi-sun-fill"></i>' 
          : '<i class="bi bi-moon-fill"></i>';
      }
    };
  
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }
  
    // Aplicar tema al cargar
    applyTheme(currentTheme);
  
    // ======================
    //  Carga Perezosa de Imágenes
    // ======================
    const lazyLoadImages = () => {
      const lazyImages = document.querySelectorAll('img.lazy');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });
  
      lazyImages.forEach(img => observer.observe(img));
    };
  
    // ======================
    //  Confirmación de Acciones
    // ======================
    const handleDeleteConfirmations = () => {
      document.querySelectorAll('[data-confirm]').forEach(button => {
        button.addEventListener('click', (e) => {
          if (!confirm(button.dataset.confirm)) {
            e.preventDefault();
          }
        });
      });
    };
  
    // ======================
    //  Inicialización General
    // ======================
    const init = () => {
      initBootstrapComponents();
      handleFormValidation();
      lazyLoadImages();
      handleDeleteConfirmations();
      
      // Animaciones básicas
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
          });
        }).observe(el);
      });
    };
  
    // Ejecutar inicialización
    init();
  });
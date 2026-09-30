// Initialize Vercel Analytics
import { inject } from '@vercel/analytics';
inject();

document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM listo, inicializando listeners...');

  /* ── Mobile nav ─────────────────────────────────────── */
  const menuBtn = document.getElementById('menu-btn');
  const mainNav = document.getElementById('main-nav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    mainNav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ── Header scroll state ────────────────────────────── */
  const header = document.getElementById('site-header');
  const heroEl = document.getElementById('inicio');

  if (header && heroEl) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' }
    );
    headerObserver.observe(heroEl);
  }

  /* ── Project modals ─────────────────────────────────── */
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) {
      console.warn('⚠️ No se encontró modal con ID:', id);
      return;
    }
    console.log('✨ Abriendo modal:', id);
    modal.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal || modal.classList.contains('closing')) return;
    console.log('🔒 Cerrando modal:', modal.id);
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('closing');
      modal.close();
      document.body.style.overflow = '';
      console.log('✅ Modal cerrado exitosamente:', modal.id);
    }, 310);
  };

  // Botones de apertura
  const openButtons = document.querySelectorAll('[data-modal]');
  console.log('🔘 Botones para abrir modal encontrados:', openButtons.length);
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.modal;
      openModal(targetId);
    });
  });

  // Botones de cierre (X)
  const closeButtons = document.querySelectorAll('.modal-close');
  console.log('❌ Botones de cierre (X) encontrados:', closeButtons.length);
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.project-modal');
      closeModal(modal);
    });
  });

  // Cierre al hacer clic en el backdrop (fuera de .modal-inner)
  const modals = document.querySelectorAll('.project-modal');
  console.log('📦 Modales <dialog> encontrados:', modals.length);
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (!e.target.closest('.modal-inner')) {
        console.log('Clic en backdrop de modal:', modal.id);
        closeModal(modal);
      }
    });
  });
});

/**
 * youprem - Vanilla JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ------------------------------------------------------------------------
   * 1. MOBILE DRAWER NAVIGATION
   * ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ------------------------------------------------------------------------
   * 2. PRODUCT CAROUSEL HORIZONTAL SCROLL
   * ------------------------------------------------------------------------ */
  const productsGrid = document.getElementById('productsGrid');
  const carouselNext = document.getElementById('carouselNext');
  const carouselPrev = document.getElementById('carouselPrev');

  if (productsGrid && carouselNext && carouselPrev) {
    const scrollAmount = 320;

    carouselNext.addEventListener('click', () => {
      // In RTL, positive scroll is towards left/start depending on browser
      productsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    carouselPrev.addEventListener('click', () => {
      productsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }


  /* ------------------------------------------------------------------------
   * 3. ACTIVE HEADER LINK ON SCROLL
   * ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (scrollY < 200 && navLinks.length > 0) {
      navLinks[0].classList.add('active');
    }
  });


  /* ------------------------------------------------------------------------
   * 4. SCROLL REVEAL ANIMATIONS
   * ------------------------------------------------------------------------ */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

});

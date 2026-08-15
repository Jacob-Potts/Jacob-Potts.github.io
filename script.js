const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach((item) => {
    observer.observe(item);
  });
} else {
  // Fallback for older browsers
  revealItems.forEach((item) => {
    item.classList.add('visible');
  });
}


// Cursor glow effect
const glow = document.querySelector('.cursor-glow');

if (glow) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}


// Highlight current navigation section
const navLinks = Array.from(
  document.querySelectorAll('.site-header nav a[href^="#"]')
);

const sections = navLinks
  .map((link) => {
    const target = link.getAttribute('href');

    if (!target || target === '#') {
      return null;
    }

    return document.querySelector(target);
  })
  .filter(Boolean);


if ('IntersectionObserver' in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.removeAttribute('data-active');
      });

      const activeLink = navLinks.find((link) => {
        return link.getAttribute('href') === `#${entry.target.id}`;
      });

      if (activeLink) {
        activeLink.setAttribute('data-active', 'true');
      }
    });
  }, {
    rootMargin: '-35% 0px -55% 0px'
  });

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// Smooth scrolling for internal navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
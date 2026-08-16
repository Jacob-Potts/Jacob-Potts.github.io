/* =========================================================
   PROJECT CARD LINKS

   To update a project:
   1. Replace its url with the project page or repository.
   2. Set enabled to true or false.
   3. Use newTab: false for pages on this website.
   ========================================================= */

const projectLinks = {
  'digital-logic': {
    enabled: true,
    url: 'https://github.com/Jacob-Potts',
    newTab: true
  },
  'computer-organization': {
    enabled: true,
    url: 'https://github.com/Jacob-Potts',
    newTab: true
  },
  'cad-design': {
    enabled: true,
    url: 'https://github.com/Jacob-Potts',
    newTab: true
  }
};


document
  .querySelectorAll('.project-card[data-project]')
  .forEach((card) => {
    const settings = projectLinks[card.dataset.project];

    if (!settings?.enabled || !settings.url) {
      card.classList.add('project-card-disabled');
      return;
    }

    const link = document.createElement('a');
    link.className = 'project-card-link';
    link.href = settings.url;
    link.setAttribute(
      'aria-label',
      `View project: ${card.querySelector('h3')?.textContent.trim() || 'project'}`
    );

    if (settings.newTab) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    while (card.firstChild) {
      link.appendChild(card.firstChild);
    }

    card.appendChild(link);
    card.classList.add('project-card-enabled');
  });


const revealItems = document.querySelectorAll('.reveal');


/* =========================================================
   SECTION REVEAL ANIMATION
   ========================================================= */

if ('IntersectionObserver' in window) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08
    }
  );


  revealItems.forEach((item) => {

    observer.observe(item);

  });

} else {

  revealItems.forEach((item) => {

    item.classList.add('visible');

  });

}


/* =========================================================
   CURSOR GLOW
   ========================================================= */

const glow =
  document.querySelector('.cursor-glow');


window.addEventListener(
  'pointermove',
  (event) => {

    if (
      !glow ||
      window
        .matchMedia(
          '(prefers-reduced-motion: reduce)'
        )
        .matches
    ) {
      return;
    }


    glow.style.left =
      `${event.clientX}px`;

    glow.style.top =
      `${event.clientY}px`;

  }
);


/* =========================================================
   ACTIVE NAVIGATION SECTION
   ========================================================= */

const navLinks = [
  ...document.querySelectorAll(
    '.site-header nav a[href^="#"]'
  )
];


const sections = navLinks
  .map((link) => {

    const target =
      link.getAttribute('href');


    if (
      !target ||
      target === '#'
    ) {
      return null;
    }


    return document.querySelector(target);

  })
  .filter(Boolean);


if ('IntersectionObserver' in window) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          navLinks.forEach((link) => {

            link.removeAttribute(
              'data-active'
            );

          });


          const active =
            navLinks.find((link) => {

              return (
                link.getAttribute('href') ===
                `#${entry.target.id}`
              );

            });


          if (active) {

            active.setAttribute(
              'data-active',
              'true'
            );

          }

        });

      },
      {
        rootMargin:
          '-35% 0px -55% 0px'
      }
    );


  sections.forEach((section) => {

    sectionObserver.observe(section);

  });

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      'click',
      (event) => {

        const targetId =
          link.getAttribute('href');


        if (
          !targetId ||
          targetId === '#'
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      }
    );

  });

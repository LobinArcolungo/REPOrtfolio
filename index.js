// ---

// Load carousel modules dynamically
document.querySelectorAll('[data-carousel]').forEach(el => {
  const carouselName = el.dataset.carousel;
  fetch(`./hobbies-carousels/${carouselName}.html`)
    .then(r => r.text())
    .then(html => {
      el.innerHTML = html;
      // Initialize carousel functionality for newly loaded carousel
      initCarousel(el.querySelector('.carousel'));
    })
    .catch(err => console.error(`Error loading carousel: ${carouselName}`, err));
});

// Carousel initialization function
function initCarousel(carousel) {
  if (!carousel) return;
  
  const container = carousel.querySelector('.carousel__container');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');
  const dots = carousel.querySelectorAll('.carousel__dot');

  let currentSlide = 0;

  function goToSlide(n) {
    if (n >= slides.length) {
      currentSlide = 0;
    } else if (n < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = n;
    }

    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('carousel__dot--active'));
    dots[currentSlide].classList.add('carousel__dot--active');
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.slide)));
  });

  // Touch/Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToSlide(currentSlide + 1); // Swipe left
    } else if (touchEndX - touchStartX > 50) {
      goToSlide(currentSlide - 1); // Swipe right
    }
  });
}

// Carousel Functionality (for inline carousels)
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  initCarousel(carousel);
});
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

headerHamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})
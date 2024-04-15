// Modal functionality
const showModal = document.querySelector(".footer-btn");
const popup = document.querySelector(".popup");
const closeModal = document.querySelector(".form-close");

function toggleModal(e) {
  e.preventDefault();
  popup.classList.toggle("popup--hidden");
}

[closeModal, showModal].forEach((element) =>
  element.addEventListener("click", toggleModal)
);

popup.addEventListener("click", function (e) {
  if (!e.target.closest(".form")) {
    toggleModal(e);
  }
});

// Page navigation
const navbarList = document.querySelector(".navbar-list");

navbarList.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("navbar-link")) {
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed functionality
const tabbedFeatures = document.querySelectorAll(".feature");
const tabbedButtonsContainer = document.querySelector(".features-titles");
const tabbedButtons = document.querySelectorAll(".feature-btn");

tabbedButtonsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".feature-btn");
  if (!clicked) return;

  tabbedButtons.forEach((el) => el.classList.remove("feature-btn--active"));
  clicked.classList.add("feature-btn--active");
  tabbedFeatures.forEach((el) => el.classList.remove("feature--active"));
  document
    .querySelector(`.feature--${clicked.dataset.tab}`)
    .classList.add("feature--active");
});

// Menu change colors animation
const navbar = document.querySelector(".navbar");

function handleMouseEvent(e) {
  if (e.target.classList.contains("navbar-link")) {
    const clicked = e.target;
    const siblings = e.target
      .closest(".navbar")
      .querySelectorAll(".navbar-link");
    const logo = e.target.closest(".navbar").querySelector(".navbar-logo-name");

    siblings.forEach((el) => {
      if (el !== clicked) {
        el.style.color = this;
      }
      logo.style.color = this;
    });
  }
}

navbar.addEventListener("mouseover", handleMouseEvent.bind("#5650354d"));
navbar.addEventListener("mouseout", handleMouseEvent.bind("#000"));

// Sticky navigation
const header = document.querySelector(".header");
const navHeight = navbar.getBoundingClientRect().height;

function sticky(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll("section");

function revealSection(entries, observer) {
  const [entry] = entries;

  console.log();

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (el) {
  sectionObserver.observe(el);
  el.classList.add("section--hidden");
});

// Lazy loading images
const photoTargets = document.querySelectorAll("img[data-src]");

function loadImg(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy");
    });
    observer.unobserve(entry.target);
  });
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.15,
});

photoTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider-btn--left");
const btnRight = document.querySelector(".slider-btn--right");
const dots = document.querySelector(".slider-dots");

let currentSlide = 0;
const maximumSlide = slides.length;

function createDots() {
  slides.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="slider-dot" data-slide="${i}"></button>`
    );
  });
}

function activateDot(slide) {
  document
    .querySelectorAll(".slider-dot")
    .forEach((dot) => dot.classList.remove("slider-dot--active"));
  document
    .querySelector(`.slider-dot[data-slide="${slide}"]`)
    .classList.add("slider-dot--active");
}

function goSlide(slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}

function nextSlide() {
  if (currentSlide === maximumSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goSlide(currentSlide);
  activateDot(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = maximumSlide - 1;
  } else {
    currentSlide--;
  }

  goSlide(currentSlide);
  activateDot(currentSlide);
}

function init() {
  goSlide(0);
  createDots();
  activateDot(0);
}

init();

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-dot")) {
    console.log("click");
    const { slide } = e.target.dataset;
    goSlide(slide);
    activateDot(slide);
  }
});

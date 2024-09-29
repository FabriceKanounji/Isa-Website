// const allLinks = document.querySelectorAll("a:link");

// allLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const href = link.getAttribute("href");

//     // Scroll back to top
//     if (href === "#")
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });

//     // Scroll to other links
//     if (href !== "#" && href.startsWith("#")) {
//       const sectionEl = document.querySelector(href);
//       sectionEl.scrollIntoView({ behavior: "smooth" });
//     }
//   });
// });

"use strict";

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Lange testimonial
// Define the original and shortened texts
var originalText = `"Het idee bestaat dat je naar een tot stand komende tekst moet ‘horen’. Het heeft iets te maken met geluid, met woordverloop, hoe iets ‘klinkt’ en hoe iets ‘moet’. Het idee bestaat dat schrijven veelal alleen-werk is. Je wil aan je eigen stem werken. Je wil ‘dat wat erin zit’ ‘eruit halen’. Schrijven is een vreemd labyrint; je wil het niet dwingen. Links en rechtsom dacht ik Isa Altink werk te sturen, opdat er iemand van buiten zou kunnen meeluisteren. Dat was éen van de meer verstandige keuzes die ik dit jaar heb gemaakt. Ik ben heel blij met haar leesintuïtie, begrip, vermogen om aan te wijzen wat er (nog) niet is, en dat vervolgens weer in begrijpbare taal terug te leggen."`;
var shortenedText = `"Links en rechtsom dacht ik Isa Altink werk te sturen, opdat er iemand van buiten zou kunnen meeluisteren. Dat was éen van de meer verstandige keuzes die ik dit jaar heb gemaakt. Ik ben heel blij met haar leesintuïtie, begrip, vermogen om aan te wijzen wat er (nog) niet is, en dat vervolgens weer in begrijpbare taal terug te leggen."`;

// Create a media query that matches screens with a max-width of 36em
var mediaQuery = window.matchMedia("(max-width: 36em)");

// Function to update the text based on the media query
function updateTestimonialText(mediaQuery) {
  var testimonialElement = document.querySelector(".testimonial-roelof");

  if (mediaQuery.matches) {
    // If the media query matches, change to the shortened text
    testimonialElement.textContent = shortenedText;
  } else {
    // If the media query doesn't match, revert to the original text
    testimonialElement.textContent = originalText;
  }
}

// Initial check
updateTestimonialText(mediaQuery);

// Add a listener to detect changes
mediaQuery.addListener(updateTestimonialText);

import { initGallery, WORKS } from "./gallery.js";
import { initTicker } from "./ticker.js";

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

const lightbox = document.querySelector(".lightbox");
const lbImg = document.querySelector(".lightbox__img");
const lbCount = document.querySelector(".lightbox__count");
let current = 0;

function openLightbox(index) {
  current = index;
  const work = WORKS[index];

  if (work.src) {
    lbImg.src = work.src;
    lbImg.alt = work.alt;
    lbImg.style.display = "block";
  } else {
    lbImg.style.display = "none";
  }

  lbCount.textContent = `${index + 1} / ${WORKS.length}`;
  lightbox.classList.add("lightbox--open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("lightbox--open");
  document.body.style.overflow = "";
}

function prevImage() {
  openLightbox((current - 1 + WORKS.length) % WORKS.length);
}

function nextImage() {
  openLightbox((current + 1) % WORKS.length);
}

function initLightbox() {
  document
    .querySelector(".lightbox__close")
    .addEventListener("click", closeLightbox);
  document
    .querySelector(".lightbox__nav--prev")
    .addEventListener("click", prevImage);
  document
    .querySelector(".lightbox__nav--next")
    .addEventListener("click", nextImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("lightbox--open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });
}

initTicker();
initGallery(openLightbox);
initReveal();
initLightbox();

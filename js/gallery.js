const WORKS = [
  { src: "img/img_1.WEBP", alt: "Работа 1", ph: ["#d4a5a5", "#c87e7e", 220] },
  { src: "img/img_2.WEBP", alt: "Работа 2", ph: ["#a5b4d4", "#7e96c8", 290] },
  { src: "img/img_3.WEBP", alt: "Работа 3", ph: ["#a5d4b4", "#7ec890", 200] },
  { src: "img/img_4.WEBP", alt: "Работа 4", ph: ["#d4cba5", "#c8bc7e", 330] },
  { src: "img/img_5.WEBP", alt: "Работа 5", ph: ["#c4a5d4", "#a87ec8", 260] },
  { src: "img/img_6.WEBP", alt: "Работа 6", ph: ["#d4b4a5", "#c89a7e", 180] },
  { src: "img/img_7.WEBP", alt: "Работа 7", ph: ["#a5d4d4", "#7ec8c8", 310] },
  { src: "img/img_8.WEBP", alt: "Работа 8", ph: ["#d4a5c4", "#c87eb4", 240] },
  { src: "img/img_9.WEBP", alt: "Работа 9", ph: ["#b4d4a5", "#96c87e", 350] },
  { src: "img/img_10.WEBP", alt: "Работа 10", ph: ["#d4d4a5", "#c8c87e", 210] },
  { src: "img/img_11.WEBP", alt: "Работа 11", ph: ["#a5a5d4", "#7e7ec8", 270] },
  { src: "img/img_12.WEBP", alt: "Работа 12", ph: ["#d4b4b4", "#c89090", 195] },
  { src: "img/img_13.WEBP", alt: "Работа 13", ph: ["#b4d4d4", "#90c8c8", 305] },
  { src: "img/img_14.WEBP", alt: "Работа 14", ph: ["#d4c4a5", "#c8ac7e", 250] },
  { src: "img/img_15.WEBP", alt: "Работа 15", ph: ["#c4d4a5", "#acc87e", 230] },
  { src: "img/img_16.WEBP", alt: "Работа 16", ph: ["#a5c4d4", "#7eacc8", 285] },
  { src: "img/img_17.WEBP", alt: "Работа 17", ph: ["#d4a5b4", "#c87e9a", 200] },
  { src: "img/img_18.WEBP", alt: "Работа 18", ph: ["#b4a5d4", "#9a7ec8", 340] },
];

function makePlaceholder(bg, fg, h) {
  return `<svg viewBox="0 0 400 ${h}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">
    <rect width="400" height="${h}" fill="${bg}"/>
    <ellipse cx="150" cy="${h * 0.4}" rx="90" ry="60" fill="${fg}" opacity="0.6"/>
    <ellipse cx="260" cy="${h * 0.65}" rx="70" ry="50" fill="${bg}" opacity="0.45"/>
  </svg>`;
}

export function initGallery(onItemClick) {
  const grid = document.querySelector(".gallery__grid");
  if (!grid) return;

  WORKS.forEach((work, i) => {
    const item = document.createElement("div");
    item.classList.add("gallery__item");
    item.dataset.index = i;

    if (work.src) {
      item.innerHTML = `<img src="${work.src}" alt="${work.alt}" loading="lazy">`;
    } else {
      const [bg, fg, h] = work.ph;
      item.innerHTML = makePlaceholder(bg, fg, h);
    }

    item.addEventListener("click", () => onItemClick(i));
    grid.appendChild(item);
  });

  const countEl = document.querySelector(".gallery__count");
  if (countEl) countEl.textContent = `${WORKS.length} работ`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = parseInt(entry.target.dataset.index);
        const delay = (index % 3) * 100;
        setTimeout(
          () => entry.target.classList.add("gallery__item--visible"),
          delay,
        );
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );

  document
    .querySelectorAll(".gallery__item")
    .forEach((el) => observer.observe(el));

  return WORKS;
}

export { WORKS };

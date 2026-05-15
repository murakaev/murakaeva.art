const TICKER_CONFIG = [
  {
    modifier: "ticker--firstname",
    text: "Светлана\u00a0",
    direction: "right",
    speed: 22,
    dot: true,
  },
  {
    modifier: "ticker--lastname",
    text: "Муракаева\u00a0",
    direction: "left",
    speed: 16,
    dot: true,
  },
  {
    modifier: "ticker--sub",
    text: "художник\u00a0\u00a0·\u00a0\u00a0абстракционист\u00a0\u00a0·\u00a0\u00a0",
    direction: "right",
    speed: 30,
    dot: false,
  },
];

const COPIES = 10;

function buildTicker(config) {
  const ticker = document.createElement("div");
  ticker.classList.add("ticker", config.modifier);

  const track = document.createElement("div");
  track.classList.add("ticker__track");

  const animName = config.direction === "left" ? "tickerLeft" : "tickerRight";
  track.style.animation = `${animName} ${config.speed}s linear infinite`;

  for (let i = 0; i < COPIES; i++) {
    const item = document.createElement("span");
    item.classList.add("ticker__item");
    item.innerHTML = config.dot
      ? `${config.text}<span class="ticker__dot" aria-hidden="true">·</span>`
      : config.text;
    track.appendChild(item);
  }

  ticker.appendChild(track);
  return ticker;
}

export function initTicker() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const wrapper = document.createElement("div");
  wrapper.classList.add("hero__tickers");

  TICKER_CONFIG.forEach((config) => {
    wrapper.appendChild(buildTicker(config));
  });

  hero.insertBefore(wrapper, hero.firstChild);
}

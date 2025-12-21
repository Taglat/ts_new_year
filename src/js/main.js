import { gsap } from "gsap/gsap-core";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { months } from "./data";

gsap.registerPlugin(ScrollToPlugin);

const app = document.querySelector("#app");
const dateDisplay = document.querySelector("#date");
const elevator = document.querySelector("#elevator");
const startScreen = document.querySelector("#start");

const startBtn = document.querySelector("#start_btn");

const PageState = {
  isPlaying: false,
  currentSeason: months[0].season,
  speed: 1, // 0.5 | 1 | 1.5
};

let scrollTl = null;

function createScrollTimeline() {
  scrollTl = gsap.timeline({
    paused: true,
  });

  scrollTl.to(window, {
    scrollTo: { y: 0 },
    duration: 150,
    ease: "none",
  });

  scrollTl.timeScale(PageState.speed);
}

startBtn.addEventListener("click", () => {
  PageState.isPlaying = true;

  gsap.to(startScreen, {
    opacity: 0,
    duration: 2,
    onComplete: () => {
      startScreen.style.display = "none";

      // прыгаем вниз
      gsap.set(window, { scrollTo: { y: "max" } });

      // создаём и запускаем автоскролл
      createScrollTimeline();
      scrollTl.play();
    },
  });
});

document.querySelectorAll("[data-speed]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const speed = Number(btn.dataset.speed);
    PageState.speed = speed;

    if (scrollTl) {
      scrollTl.timeScale(speed);
    }
  });
});

document.querySelectorAll(".speed-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".speed-btn")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");
  });
});

const playPauseBtn = document.querySelector("#play_pause");

playPauseBtn.addEventListener("click", () => {
  if (!scrollTl) return;

  if (scrollTl.isActive()) {
    scrollTl.pause();
        playPauseBtn.textContent = "▶";

  } else {
    scrollTl.play();
      playPauseBtn.textContent = "⏸";
  }
});

if (scrollTl.isActive()) {
  scrollTl.pause();
  playPauseBtn.classList.remove("paused");
} else {
  scrollTl.play();
  playPauseBtn.classList.add("paused");
}

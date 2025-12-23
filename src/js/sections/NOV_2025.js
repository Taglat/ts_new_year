import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function initNOV_2025(section, stateManager, index) {
  const text = section.querySelector(".nov-2025-text");

  // Set initial state
  gsap.set(text, {
    scale: 0.4,
    opacity: 0,
    y: 550
  });

  // Simple scroll-triggered animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      // когда секция появляется на 70% экрана
      start: "top 60%",
      // когда секция исчезает на 30% экрана
      end: "top 10%",
      // это скорость реакции на скролл
      scrub: 0.9,
    }
  });

  tl.to(text, {
    scale: 1,
    opacity: 1,
    y: 0,
    ease: "power1.out"
    // ease: "bounce.out"
  });
}


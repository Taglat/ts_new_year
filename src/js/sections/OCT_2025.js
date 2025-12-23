import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function initOct(stateManager) {
    const section = document.querySelector(".OCT_2024");

    stateManager.on("scrolling", () => {
        gsap.from(section, {
            y: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
            }
        });
    });
}

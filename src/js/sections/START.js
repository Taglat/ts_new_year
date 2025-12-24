import gsap from "gsap";

export function initStart({ section, index, stateManager, sections }) {
    const title = section.querySelector("h3");
    const btn = section.querySelector("#start-btn");
    const p = section.querySelector("p");

    gsap.timeline()
        .from(title, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.out",
        })
        .from(p, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                btn.style.animation = "pulse 1.5s infinite";
            }
        }, "-=1");
}

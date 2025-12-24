import gsap from "gsap";

export function initOCT_2024({ section, index, stateManager }) {
    const bg = section.querySelector(".pixel-bg");
    const header = section.querySelector(".month-header");
    const title = section.querySelector(".month-title");
    const subtitle = section.querySelector(".month-subtitle");
    const chip = section.querySelector(".month-chip");

    const cards = section.querySelectorAll(".event-card");
    const levelComplete = section.querySelector(".level-complete");

    gsap.set([header, cards, levelComplete], { opacity: 0 });
    gsap.set(cards, { y: 40, scale: 0.95 });
    gsap.set(levelComplete, { y: 20 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
        }
    });

    tl.from(bg, {
        opacity: 0,
        duration: 0.5
    }).to(header, {
        opacity: 1,
        duration: 0.5
    }).from(chip, {
        scale: 0,
        rotation: -10,
        transformOrigin: "left center",
        duration: 0.4
    }).from(title, {
        y: 40,
        opacity: 0,
        duration: 0.6
    }).from(subtitle, {
        y: 20,
        opacity: 0,
        duration: 0.4
    }, "-=0.3");

    /* ─────────────────────────────
       🎯 QUEST CARDS
    ───────────────────────────── */

    tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.3,
        duration: 0.6,
        // ease: "steps(4)"
        ease: "power2.out",
    });

    /* ─────────────────────────────
       ✅ LEVEL COMPLETE
    ───────────────────────────── */

    tl.to(levelComplete, {
        opacity: 0.4,
        y: 0,
        duration: 0.4
    });

}

import gsap from "gsap";
import { startAutoScroll } from "../autoPlay";

export function initOCT_2024({ section, index, stateManager, sections }) {
    section.dataset.speed = "0.6";

    const bg = section.querySelector(".u_pixel-bg");
    const content = section.querySelector(".content");

    const ts = section.querySelector(".ts-img");
    const astana = section.querySelector(".astana-hub-img");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=900%",
            scrub: true,
            pin: true,

            onEnter: () => stateManager.setIndex(index),
            onEnterBack: () => stateManager.setIndex(index),

            onLeave: () => {
                const nextIndex = index + 1;
                if (nextIndex >= sections.length) {
                    stateManager.setState("scroll");
                    return;
                }
                stateManager.setIndex(nextIndex);
                startAutoScroll(stateManager, sections);
            }
        }
    });

    /* 🎥 CINEMATIC ZOOM всей сцены */
    tl.fromTo(section,
        { scale: 1 },
        {
            scale: 1.03,
            transformOrigin: "center center",
            ease: "none",
            duration: 1 // откат
        },
        0
    );

    /* 🟦 PIXEL BACKGROUND движение */
    tl.to(bg, {
        backgroundPosition: "128px 128px",
        duration: 1, // откат
        ease: "none"
    }, 0);

    /* 📝 ТЕКСТ — уверенный вход */
    tl.to(content, {
        opacity: 1,
        y: 0,
        duration: 1, // откат
        ease: "power3.out"
    }, 0.4);

    /* 🏢 ASTANA HUB — спокойный, стабильный */
    tl.fromTo(astana,
        {
            opacity: 0,
            scale: 0.85
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1, // откат
            ease: "power2.out"
        },
        1
    );

    tl.fromTo(ts,
        {
            opacity: 0,
            scale: 0.7,
            filter: "blur(6px)"
        },
        {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1, // откат
            ease: "elastic.out(1, 0.6)"
        },
        1.2
    );

    /* 🌊 ALIVE MOTION — разная фаза (ключевой момент) */
    tl.to(astana, {
        y: -8,
        duration: 1, // откат
        ease: "sine.inOut"
    }, 2.2);

    tl.to(ts, {
        y: -14,
        duration: 1, // откат
        ease: "sine.inOut"
    }, 2.3);

    tl.to([ts, astana], {
        filter: "drop-shadow(0 0 28px rgba(0,200,255,0.6)) drop-shadow(0 0 50px rgba(0,200,255,0.35))",
        duration: 1 // откат
    }, 2.4);

    section._st = tl.scrollTrigger;
    return tl;
}

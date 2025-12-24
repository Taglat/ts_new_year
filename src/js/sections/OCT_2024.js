import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { startAutoScroll } from "../autoPlay";

export function initOCT_2024({ section, index, stateManager, sections }) {
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

    // 1️⃣ СНАЧАЛА собираем timeline
    const tl = gsap.timeline();

    tl.from(bg, { opacity: 0 })
        .to(header, { opacity: 1 })
        .from(chip, { scale: 0, rotation: -10 })
        .from(title, { y: 40, opacity: 0 })
        .from(subtitle, { y: 20, opacity: 0 }, "-=0.3")
        .to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.3,
            ease: "power2.out"
        })
        .to(levelComplete, {
            opacity: 0.4,
            y: 0
        });

    // 2️⃣ ТОЛЬКО ПОТОМ создаём ScrollTrigger
    const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        animation: tl,

        onLeave: () => {
            if (stateManager.state === "auto") {
                const nextIndex = index + 1;

                // 🔥 ЕСЛИ ЭТО ПОСЛЕДНЯЯ СЕКЦИЯ
                if (nextIndex >= sections.length) {
                    stateManager.setState("scroll");
                    return;
                }

                stateManager.setIndex(nextIndex);
                startAutoScroll(stateManager, sections);
            }
        }
    });

    // 3️⃣ Сохраняем ссылку для autoplay
    section._st = st;
}

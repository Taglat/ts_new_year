import gsap from "gsap";
import { startAutoScroll } from "../autoPlay";

export function initOCT_2024({ section, index, stateManager, sections }) {
    const bg = section.querySelector(".pixel-bg");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: true,

            onEnter: () => stateManager.setIndex(index),
            onEnterBack: () => stateManager.setIndex(index),

            onLeave: () => {
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

    tl.to(bg, { opacity: 1 });

    // autoplay должен знать, что секция pinned
    section._st = tl.scrollTrigger;

    return tl;
}


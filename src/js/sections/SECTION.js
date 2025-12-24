import gsap from "gsap";
import { startAutoScroll } from "../autoPlay";

export function initSection({ section, index, stateManager, sections }) {
    console.log("section index", index);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,

            onEnter: () => {
                if (stateManager.state === "scroll") {
                    stateManager.setIndex(index);
                }
            },
            onEnterBack: () => {
                if (stateManager.state === "scroll") {
                    stateManager.setIndex(index);
                }
            },

            // 🔥 ВОТ ОНО
            onLeave: () => {
                if (stateManager.state === "auto") {
                    stateManager.setIndex(index + 1);
                    startAutoScroll(stateManager, sections);
                }
            }
        }
    });

    tl.from(section.querySelector(".title"), {
        y: 100,
        opacity: 0
    }).from(
        section.querySelector(".text"),
        {
            y: 50,
            opacity: 0
        },
        "<"
    );

    // autoplay использует этот trigger
    section._st = tl.scrollTrigger;

    return tl;
}

import gsap from "gsap";

export function initTUTORIAL({ section, index, stateManager, sections }) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: true,

            onEnter: () => stateManager.setIndex(index),
            onEnterBack: () => stateManager.setIndex(index),

            // 🔥 ФИНАЛ
            onLeave: () => {
                if (stateManager.state === "auto") {
                    stateManager.setState("scroll");
                }
            }
        }
    });

    tl.from(section, {
        scale: 0.5,
        rotation: -180,
        opacity: 0
    })
        .to(section, {
            scale: 1.5,
            rotation: 360
        })
        .to(section, {
            scale: 1,
            rotation: 0
        });

    // autoplay должен знать, что секция pinned
    section._st = tl.scrollTrigger;

    return tl;
}

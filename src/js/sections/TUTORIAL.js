import gsap from "gsap";

export function initTUTORIAL({ section, index, stateManager }) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: true,

            onEnter: () => stateManager.setIndex(index),
            onEnterBack: () => stateManager.setIndex(index)
        }
    });

    tl.from(section, {
        scale: 0.5,
        rotation: -180,
        opacity: 0,
        duration: 1
    })
        .to(section, {
            scale: 1.5,
            rotation: 360,
            duration: 1
        })
        .to(section, {
            scale: 1,
            rotation: 0,
            duration: 1
        });

    return tl;
}
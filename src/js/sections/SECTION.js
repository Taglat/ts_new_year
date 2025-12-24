import gsap from "gsap";

export function initSection({ section, index, stateManager }) {
    console.log("section index", index);
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,

            onEnter: () => { return stateManager.setIndex(index) },
            onEnterBack: () => { return stateManager.setIndex(index) }
        }
    });

    tl.from(section.querySelector(".title"), {
        y: 100,
        opacity: 0
    })
        .from(section.querySelector(".text"), {
            y: 50,
            opacity: 0
        }, "<")
    // .from(section.querySelector(".image"), {
    //     scale: 0.8,
    //     opacity: 0
    // });

    return tl;
}

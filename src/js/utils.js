export function moveToSection(index, sections, stateManager) {
    stateManager.setState("auto");

    gsap.to(window, {
        scrollTo: sections[index],
        duration: 1 / stateManager.speed,
        ease: "power2.inOut",

        onComplete: () => {
            stateManager.setState("auto");
        }
    });
}
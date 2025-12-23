import gsap from "gsap";

export function initSection(section, stateManager, index) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse",
            markers: true, // Отладка
            onEnter: () => {
                stateManager.currentIndex = index; // Синхронизируем стейт со скроллом
                console.log("Current Section:", index + 1);
            },
            onEnterBack: () => {
                stateManager.currentIndex = index;
            }
        }
    });

    // tl.from(section, { opacity: 0, duration: 1 });
}

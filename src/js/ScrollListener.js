let scrollListenerAdded = false;

export function initScrollListener(stateManager, sections) {
    // если слушатель уже добавлен или включен autoplay
    if (scrollListenerAdded || stateManager.state === "auto") return;


    // Отключение автоматической прокрутки и слушатели для отключения
    // const interrupt = () => {
    //     if (stateManager.state === "auto") {
    //         stateManager.setState("scroll");
    //         stopAutoScroll();
    //     }
    // };

    // window.addEventListener("wheel", interrupt, { passive: true });
    // window.addEventListener("touchstart", interrupt, { passive: true });
    // window.addEventListener("keydown", interrupt);


    window.addEventListener("scroll", () => {
        if (stateManager.state !== "scroll") return;

        const scrollY = window.scrollY;
        let closestIndex = stateManager.currentIndex;
        let minDistance = Infinity;

        sections.forEach((section, index) => {
            const distance = Math.abs(scrollY - section.offsetTop);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        if (stateManager.currentIndex !== closestIndex) {
            stateManager.setIndex(closestIndex);
        }
    });

    scrollListenerAdded = true;
}

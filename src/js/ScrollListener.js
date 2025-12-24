let scrollListenerAdded = false;

export function initScrollListener(stateManager, sections) {
    if (scrollListenerAdded) return;

    window.addEventListener("scroll", () => {
        // auto -> scroll
        // if (stateManager.state !== "scroll") {
        //     stateManager.setState("scroll");
        // }

        // stateManager индекс 
        const scrollY = window.scrollY;
        let closestIndex = 0;
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

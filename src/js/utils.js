export function getCurrentIndexByScroll(sections) {
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

    console.log("currentIndexByScrollChecker", closestIndex);

    return closestIndex;
}

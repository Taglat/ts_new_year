import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import StateManager from "./StateManager";

import { initControls } from "./Controllers";
import { initStart } from "./sections/START";
import { initSection } from "./SectionTemplate";
import { initTUTORIAL } from "./sections/TUTORIAL";
import { initMAR_2025 } from "./sections/MAR_2025";

// Не завбывайте писать код для анимации секций и импортировать их
// import { initDEC_2025 } from "./sections/DEC_2025";

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    stateManager.currentIndex = 0;
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = Array.from(document.querySelectorAll(".sections section"));
export const stateManager = new StateManager(sections);

// Анимации секций через INIT функции, которые будут писаться в отдельных файлах js/sections/
initStart(stateManager);
sections.forEach((section, index) => {
    // Пример как регать свои анимации секций
    if (section.classList.contains("TUTORIAL")) {
        initTUTORIAL(section, stateManager, index);
        return;
    }

    if (section.classList.contains("MAR_2025")) {
        initMAR_2025(section, stateManager, index);
        return;
    }

    // initSection - пока заглушка, анимация секции по дефолту
    initSection(section, stateManager, index);
});

initControls(stateManager);

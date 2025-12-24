import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import StateManager from "./StateManager";

import { initControls } from "./Controllers";
import { initStart } from "./sections/START";
import { initTUTORIAL } from "./sections/TUTORIAL";

// Не завбывайте писать код для анимации секций и импортировать их
// import { initDEC_2025 } from "./sections/DEC_2025";

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    stateManager.currentIndex = 0;
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = Array.from(document.querySelectorAll(".sections section"));
export const stateManager = new StateManager(sections);

// Регистрация анимацийсекций
sections.forEach((section, index) => {
    if (section.classList.contains("START")) {
        initStart(section, stateManager, index);
        return;
    }

    // Пример как регать свои анимации секций
    if (section.classList.contains("TUTORIAL")) {
        initTUTORIAL(section, stateManager, index);
        return;
    }
});

initControls(stateManager);

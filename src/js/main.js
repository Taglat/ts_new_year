import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import StateManager from "./StateManager";
import { initTUTORIAL } from "./sections/TUTORIAL";
import { initControls } from "./Controlls";
import { initScrollListener } from "./ScrollListener";
import { initSection } from "./sections/SECTION";
import { initStart } from "./sections/START";
import { initOCT_2024 } from "./sections/OCT_2024";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const stateManager = new StateManager();
const sections = document.querySelectorAll(".section");

sections.forEach((section, index) => {
    if (section.classList.contains("TUTORIAL")) {
        initTUTORIAL({ section, index, stateManager, sections });
    } else if (section.classList.contains("START")) {
        initStart({ section, index, stateManager, sections });
    } else if (section.classList.contains("OCT_2024")) {
        initOCT_2024({ section, index, stateManager, sections });
    }
    else {
        initSection({ section, index, stateManager, sections });
    }
});

initControls(stateManager, sections);
initScrollListener(stateManager, sections);

ScrollTrigger.refresh();

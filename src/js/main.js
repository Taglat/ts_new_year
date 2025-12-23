import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import StateManager from "./StateManager";

import { initStart } from "./sections/START";
import { initSection } from "./SectionTemplate";
import { initControls } from "./controllers";

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    stateManager.currentIndex = 0;
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = Array.from(document.querySelectorAll(".sections section"));
export const stateManager = new StateManager(sections);

initStart(stateManager);

sections.forEach((section, index) => {
    initSection(section, stateManager, index);
});

initControls(stateManager);

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { stateManager } from "./main";

export function initControls(stateManager) {
    const playPauseBtn = document.querySelector("#play-pause-btn");
    let isPaused = false;

    playPauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        ScrollTrigger.getAll().forEach(st => {
            if (isPaused) st.pause();
            else st.resume();
        });
    });

    document.querySelector("#next-btn").addEventListener("click", () => {
        // Просто скроллим к следующей секции, StateManager и анимации обновятся через ScrollTrigger
        const nextIndex = stateManager.currentIndex + 1;
        if (nextIndex < stateManager.sections.length) {
            gsap.to(window, {
                scrollTo: { y: stateManager.sections[nextIndex], autoKill: false },
                duration: 1
            });
        }
    });

    document.querySelector("#prev-btn").addEventListener("click", () => {
        const prevIndex = stateManager.currentIndex - 1;
        if (prevIndex >= 0) {
            gsap.to(window, {
                scrollTo: { y: stateManager.sections[prevIndex], autoKill: false },
                duration: 1
            });
        }
    });
}

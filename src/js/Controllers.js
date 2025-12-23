import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function initControls(stateManager) {
    const playPauseBtn = document.querySelector("#play-pause-btn");

    let isPaused = stateManager.state === "paused";

    function updateIcon() {
        playPauseBtn.innerHTML = isPaused
            ? `<svg viewBox="0 0 24 24">
                 <path d="M8 5v14l11-7z" />
               </svg>`
            : `<svg viewBox="0 0 24 24">
                 <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
               </svg>`;
    }

    updateIcon();

    playPauseBtn.addEventListener("click", () => {
        stateManager.togglePlayPause();
        isPaused = stateManager.state === "paused";
        updateIcon();

        // 🔥 ВАЖНО: управляем ScrollTrigger, а НЕ globalTimeline
        ScrollTrigger.getAll().forEach(st => {
            isPaused ? st.disable() : st.enable();
        });
    });

    document.querySelector("#next-btn").addEventListener("click", () => {
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

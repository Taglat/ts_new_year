import gsap from "gsap";

export function initControls(stateManager) {
    const playPauseBtn = document.querySelector("#play-pause-btn");

    // 🎯 Подписываемся на событие PLAYING
    stateManager.on(stateManager.STATES.PLAYING, () => {
        updateIcon();
    });

    // 🎯 Подписываемся на событие PAUSED
    stateManager.on(stateManager.STATES.PAUSED, () => {
        updateIcon();
    });

    /**
     * Обновляет иконку кнопки Play/Pause
     */
    function updateIcon() {
        // Показываем Pause (⏸) только когда состояние PLAYING
        // Во всех остальных случаях (intro, paused, finished) показываем Play (▶)
        playPauseBtn.innerHTML = stateManager.state === stateManager.STATES.PLAYING
            ? `<svg viewBox="0 0 24 24">
                 <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
               </svg>` // Pause ⏸
            : `<svg viewBox="0 0 24 24">
                 <path d="M8 5v14l11-7z" />
               </svg>`; // Play ▶
    }

    updateIcon();

    // 🎬 Кнопка Play/Pause
    playPauseBtn.addEventListener("click", () => {
        stateManager.togglePlayPause();
        updateIcon();
    });

    // ⏭ Кнопка "Следующая секция"
    document.querySelector("#next-btn").addEventListener("click", () => {
        const nextIndex = stateManager.currentIndex + 1;
        if (nextIndex < stateManager.sections.length) {
            stateManager.setState(stateManager.STATES.PAUSED);
            updateIcon();

            gsap.to(window, {
                scrollTo: { y: stateManager.sections[nextIndex], autoKill: false },
                duration: 1,
                ease: "power2.inOut"
            });
        }
    });

    // ⏮ Кнопка "Предыдущая секция"
    document.querySelector("#prev-btn").addEventListener("click", () => {
        const prevIndex = stateManager.currentIndex - 1;
        if (prevIndex >= 0) {
            stateManager.setState(stateManager.STATES.PAUSED);
            updateIcon();

            gsap.to(window, {
                scrollTo: { y: stateManager.sections[prevIndex], autoKill: false },
                duration: 1,
                ease: "power2.inOut"
            });
        }
    });
}

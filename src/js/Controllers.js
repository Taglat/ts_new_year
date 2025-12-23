import gsap from "gsap";

export function initControls(stateManager) {
    const playPauseBtn = document.querySelector("#play-pause-btn");
    let autoScrollTimeline = null;
    let isPaused = stateManager.state === "paused";

    stateManager.on(stateManager.STATES.PLAYING, () => {
        if (!autoScrollTimeline) {
            autoScrollTimeline = createAutoScrollTimeline();
        }
        autoScrollTimeline.play();
        isPaused = false;
        updateIcon();
    });

    /**
     * Создает GSAP Timeline для автоматического скролла по всем секциям
     */
    function createAutoScrollTimeline() {
        const tl = gsap.timeline({
            paused: true, // Изначально на паузе
            onComplete: () => {
                stateManager.setState(stateManager.STATES.FINISHED);
                isPaused = true;
                updateIcon();
            }
        });

        // Добавляем скролл к каждой секции
        stateManager.sections.forEach((section, index) => {
            tl.to(window, {
                scrollTo: {
                    y: section,
                    autoKill: false
                },
                duration: 1,
                ease: "power2.inOut",
                onStart: () => {
                    stateManager.currentIndex = index;
                    console.log(`Scrolling to section ${index + 1}`);
                }
            })
                .to({}, { duration: 2 }); // Пауза 2 сек на каждой секции
        });

        return tl;
    }

    /**
     * Обновляет иконку кнопки Play/Pause
     */
    function updateIcon() {
        playPauseBtn.innerHTML = isPaused
            ? `<svg viewBox="0 0 24 24">
                 <path d="M8 5v14l11-7z" />
               </svg>` // Play ▶
            : `<svg viewBox="0 0 24 24">
                 <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
               </svg>`; // Pause ⏸
    }

    updateIcon();

    // 🎬 Кнопка Play/Pause
    playPauseBtn.addEventListener("click", () => {
        stateManager.togglePlayPause();
        isPaused = stateManager.state === "paused";
        updateIcon();

        if (isPaused) {
            // Пауза: останавливаем таймлайн
            if (autoScrollTimeline) {
                autoScrollTimeline.pause();
            }
        } else {
            // Play: запускаем/возобновляем таймлайн
            if (!autoScrollTimeline) {
                autoScrollTimeline = createAutoScrollTimeline();
            }
            autoScrollTimeline.play();
        }
    });

    // ⏭ Кнопка "Следующая секция"
    document.querySelector("#next-btn").addEventListener("click", () => {
        const nextIndex = stateManager.currentIndex + 1;
        if (nextIndex < stateManager.sections.length) {
            // Останавливаем автоплей при ручном переключении
            if (autoScrollTimeline) {
                autoScrollTimeline.pause();
            }
            stateManager.setState(stateManager.STATES.PAUSED);
            isPaused = true;
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
            // Останавливаем автоплей при ручном переключении
            if (autoScrollTimeline) {
                autoScrollTimeline.pause();
            }
            stateManager.setState(stateManager.STATES.PAUSED);
            isPaused = true;
            updateIcon();

            gsap.to(window, {
                scrollTo: { y: stateManager.sections[prevIndex], autoKill: false },
                duration: 1,
                ease: "power2.inOut"
            });
        }
    });
}

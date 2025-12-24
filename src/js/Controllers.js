import gsap from "gsap";
import { getCurrentIndexByScroll } from "./utils";

let scrollListenerAdded = false;

export function initControls(stateManager) {
    const playPauseBtn = document.querySelector("#play-pause-btn");
    let autoScrollTimeline = null;
    let isAutoScrolling = false;

    // 🎯 Обработчик ручного скролла
    if (!scrollListenerAdded) {
        window.addEventListener("scroll", () => {
            if (!isAutoScrolling) {
                if (stateManager.state === stateManager.STATES.PLAYING) {
                    stateManager.setState(stateManager.STATES.PAUSED);
                }
            }
        });

        scrollListenerAdded = true;
    }

    // 🎯 Подписка на событие PLAYING
    stateManager.on(stateManager.STATES.PLAYING, () => {
        stateManager.setCurrentIndex(getCurrentIndexByScroll(stateManager.sections));

        if (!autoScrollTimeline) {
            autoScrollTimeline = createAutoScrollTimeline();
        } else {
            // Если timeline уже есть, пересоздаём с новым startIndex
            autoScrollTimeline.kill();
            autoScrollTimeline = createAutoScrollTimeline();
        }

        autoScrollTimeline.play();
        updateIcon();
    });

    // 🎯 Подписка на событие PAUSED
    stateManager.on(stateManager.STATES.PAUSED, () => {
        if (autoScrollTimeline) {
            autoScrollTimeline.pause();
        }
        updateIcon();
    });

    /**
     * Создает GSAP Timeline для автоматического скролла по всем секциям
     */
    function createAutoScrollTimeline() {
        const tl = gsap.timeline({
            paused: true,
            onStart: () => { isAutoScrolling = true; },
            onComplete: () => {
                isAutoScrolling = false;
                stateManager.setState(stateManager.STATES.FINISHED);
                updateIcon();
            }
        });

        // Начинаем с текущего индекса
        const startIndex = stateManager.currentIndex;

        stateManager.sections.slice(startIndex).forEach((section, i) => {
            const index = startIndex + i;
            tl.to(window, {
                scrollTo: { y: section, autoKill: false },
                duration: 1,
                ease: "power2.inOut",
                onStart: () => {
                    isAutoScrolling = true;
                    stateManager.setCurrentIndex(index);
                },
                onComplete: () => { isAutoScrolling = false; }
            }).to({}, { duration: 2 });
        });

        return tl;
    }


    /**
     * Обновляет иконку кнопки Play/Pause
     */
    function updateIcon() {
        playPauseBtn.innerHTML = stateManager.state === stateManager.STATES.PLAYING
            ? `<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>` // Pause
            : `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`; // Play
    }

    updateIcon();

    // 🎬 Кнопка Play/Pause
    playPauseBtn.addEventListener("click", () => {
        stateManager.togglePlayPause();
    });

    // ⏭ Кнопка "Следующая секция"
    document.querySelector("#next-btn").addEventListener("click", () => {
        const nextIndex = stateManager.currentIndex + 1;
        if (nextIndex < stateManager.sections.length) {
            stateManager.setState(stateManager.STATES.PAUSED);
            stateManager.setCurrentIndex(nextIndex);
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
            stateManager.setCurrentIndex(prevIndex);
            updateIcon();

            gsap.to(window, {
                scrollTo: { y: stateManager.sections[prevIndex], autoKill: false },
                duration: 1,
                ease: "power2.inOut"
            });
        }
    });
}

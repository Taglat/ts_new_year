import gsap from "gsap";

export function initStart(section, stateManager, index) {
    console.log(`START INIT (index ${index})`);
    const title = section.querySelector("h3");
    const btn = section.querySelector("#start-btn");
    const p = section.querySelector("p");

    let isHidden = false; // защита от повторного срабатывания

    function hideStart(shouldPlay = false) {
        if (isHidden) return;
        isHidden = true;

        if (shouldPlay) {
            stateManager.setState(stateManager.STATES.PLAYING);
        } else {
            stateManager.setState(stateManager.STATES.PAUSED);
        }

        gsap.to(section, {
            duration: 0.5,
            onComplete: () => {
                window.removeEventListener("wheel", onFirstScroll);
                window.removeEventListener("touchmove", onFirstScroll);
            }
        });
    }

    // Анимация появления
    gsap.timeline()
        .from(title, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.out",
        })
        .from(p, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                btn.style.animation = "pulse 1.5s infinite";
            }
        }, "-=1");

    // Клик по кнопке
    btn.addEventListener("click", () => {
        hideStart(true);
    });

    // Первый скролл (мышь + тач)
    function onFirstScroll(e) {
        hideStart(false);
    }

    window.addEventListener("wheel", onFirstScroll, { passive: true });
    window.addEventListener("touchmove", onFirstScroll, { passive: true });
}

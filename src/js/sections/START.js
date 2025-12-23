import gsap from "gsap";

export function initStart(stateManager) {
    const section = document.querySelector(".START");
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
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                section.style.display = "none";
                document.body.style.overflow = "";
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
        hideStart(true); // true = включить автоплей
    });

    // Первый скролл (мышь + тач)
    function onFirstScroll(e) {
        hideStart(false); // false = НЕ запускать автоплей
    }

    window.addEventListener("wheel", onFirstScroll, { passive: true });
    window.addEventListener("touchmove", onFirstScroll, { passive: true });
}

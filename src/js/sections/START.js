import gsap from "gsap";

export function initStart({ section, index, stateManager }) {
    const title = section.querySelector("h3");
    const btn = section.querySelector("#start-btn");
    const p = section.querySelector("p");

    function start(shouldPlay = false) {
        stateManager.setState(shouldPlay ? "auto" : "scroll");

        gsap.to(section, {
            duration: 0.5,
            onComplete: () => {
                window.removeEventListener("wheel", onFirstScroll); // Убираем слушателя скролла
                window.removeEventListener("touchmove", onFirstScroll); // Убираем слушателя моб скролла
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

    btn.addEventListener("click", () => {
        start(true);
    });

    function onFirstScroll(e) {
        start(false);
    }

    window.addEventListener("wheel", onFirstScroll, { passive: true }); // Слушаем первый скролл
    window.addEventListener("touchmove", onFirstScroll, { passive: true }); // Слушаем первый скролл
}

import gsap from "gsap";

export function initStart(stateManager) {
    const section = document.querySelector(".START");
    const title = section.querySelector("h3");
    const btn = section.querySelector("#start-btn");
    const p = section.querySelector("p");

    let isHidden = false; // защита от повторного срабатывания

    function hideStart() {
        if (isHidden) return;
        isHidden = true;

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
        hideStart();
        stateManager.setState(stateManager.STATES.PLAYING);
    });

    // Первый скролл (мышь + тач)
    function onFirstScroll(e) {
        hideStart();
    }

    window.addEventListener("wheel", onFirstScroll, { passive: true });
    window.addEventListener("touchmove", onFirstScroll, { passive: true });
}

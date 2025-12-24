import gsap from "gsap";

let autoTween = null;

export function startAutoScroll(stateManager, sections) {
    if (!sections || !sections.length) return;

    const index = stateManager.currentIndex;

    if (index < 0 || index >= sections.length) {
        stateManager.setState("scroll");
        return;
    }

    const section = sections[index];
    if (!section) {
        stateManager.setState("scroll");
        return;
    }
    const st = section?._st;

    // 🧠 если секция с pinned ScrollTrigger
    if (st) {
        autoTween = gsap.to(window, {
            scrollTo: {
                y: st.end,
                autoKill: false
            },
            duration: 2 / stateManager.speed,
            ease: "linear",

            onComplete: () => {
                // 
            }
        });

        return;
    }

    // обычная секция
    const nextIndex = stateManager.currentIndex + 1;
    if (!sections[nextIndex]) {
        stateManager.setState("scroll");
        return;
    }

    autoTween = gsap.to(window, {
        scrollTo: sections[nextIndex],
        duration: 1 / stateManager.speed,
        ease: "power2.inOut",

        onComplete: () => {
            if (stateManager.state === "auto") {
                startAutoScroll(stateManager, sections);
            }
        }
    });
}

export function stopAutoScroll() {
    if (autoTween) {
        autoTween.kill();
        autoTween = null;
    }
}

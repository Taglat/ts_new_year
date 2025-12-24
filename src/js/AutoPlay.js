import gsap from "gsap";

let autoTween = null;

export function startAutoScroll(stateManager, sections) {
    if (!sections || !sections.length) return;

    const index = stateManager.currentIndex;
    const section = sections[index];

    if (!section) {
        stateManager.setState("scroll");
        return;
    }


    // 🧠 скорость секции
    const sectionSpeed = Number(section.dataset.speed) || 1;

    const st = section._st;

    // 🔒 PINNED секция
    if (st) {
        const scrollDistance = st.end - st.start;

        autoTween = gsap.to(window, {
            scrollTo: {
                y: st.end,
                autoKill: false
            },
            duration:
                scrollDistance /
                1200 /
                (stateManager.speed * sectionSpeed),
            ease: "linear"
        });

        return;
    }

    // 🧭 обычная секция
    const nextIndex = index + 1;
    if (!sections[nextIndex]) {
        stateManager.setState("scroll");
        return;
    }

    autoTween = gsap.to(window, {
        scrollTo: sections[nextIndex],
        duration: 1.2 / (stateManager.speed * sectionSpeed),
        ease: "power2.inOut",
        onComplete: () => {
            if (stateManager.state === "auto") {
                startAutoScroll(stateManager, sections);
            }
        }
    });

    console.log(
        "AUTO",
        section.className,
        "sectionSpeed:", sectionSpeed,
        "globalSpeed:", stateManager.speed,
        "distance:", st?.end - st?.start
    );
}

export function stopAutoScroll() {
    if (autoTween) {
        autoTween.kill();
        autoTween = null;
    }
}

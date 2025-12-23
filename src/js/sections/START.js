import gsap from "gsap";

export function initStart(stateManager) {
    const section = document.querySelector(".START");
    const title = section.querySelector("h3");
    const btn = section.querySelector("#start-btn");
    const tl = gsap.timeline();
    console.log(btn)
    tl.from(title, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
    }).from(btn, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            btn.style.animation = "pulse 1.5s infinite";
        }
    }, "-=1");

    btn.addEventListener("click", () => {
        console.log("click");
        gsap.to(section, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                section.style.display = "none"; // Убираем секцию, чтобы она не перекрывала кнопки
                document.body.style.overflow = "";
                stateManager.setState(stateManager.STATES.SCROLLING);
            }
        });
    });
}

// import ScrollTrigger from "gsap/ScrollTrigger";
// import { moveToSection } from "./utils";

const svgPlay = `
<svg viewBox="0 0 24 24">
  <path d="M8 5v14l11-7z" />
</svg>
`;

const svgPause = `
<svg viewBox="0 0 24 24">
  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
</svg>
`;


export function initControls(stateManager, sections) {
    const playPauseBtn = document.querySelector("#play-pause");
    const startBtn = document.querySelector("#start-btn");

    // 🔁 реакция на изменения состояния
    stateManager.subscribe(({ state }) => {
        playPauseBtn.innerHTML =
            state === "auto" ? svgPause : svgPlay;
    });

    startBtn.addEventListener("click", () => {
        stateManager.setState("auto");
        playPauseBtn.innerHTML = svgPause;
        // ScrollTrigger.getAll().forEach(st => st.enable());
    });

    playPauseBtn.addEventListener("click", () => {
        if (stateManager.state === "scroll") {
            stateManager.setState("auto");
            console.log("play click, new State", stateManager);

            playPauseBtn.innerHTML = svgPause;
            // ScrollTrigger.getAll().forEach(st => st.disable());
        } else {
            stateManager.setState("scroll");
            console.log("pauseClick click, new State", stateManager);
            playPauseBtn.innerHTML = svgPlay;
            // ScrollTrigger.getAll().forEach(st => st.enable());
        }
    });

    // document.querySelector("#prev").onclick = () => {
    //     if (stateManager.state === "auto") return;
    //     stateManager.setIndex(stateManager.currentIndex - 1);
    //     moveToSection(
    //         stateManager.currentIndex,
    //         sections,
    //         stateManager
    //     );
    // };

    // document.querySelector("#next").onclick = () => {
    //     if (stateManager.currentIndex >= sections.length - 1) return;
    //     stateManager.setIndex(stateManager.currentIndex + 1);
    //     moveToSection(
    //         stateManager.currentIndex,
    //         sections,
    //         stateManager
    //     );
    // };
}

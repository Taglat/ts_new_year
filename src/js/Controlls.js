import { startAutoScroll, stopAutoScroll } from "./autoPlay";

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

    playPauseBtn.addEventListener("click", () => {
        if (stateManager.state === "scroll") {
            stateManager.setState("auto");
            console.log("play click, new State", stateManager);
            startAutoScroll(stateManager, sections);
        } else {
            stateManager.setState("scroll");
            stopAutoScroll(stateManager, sections);
        }
    });

    startBtn?.addEventListener("click", () => {
        stateManager.setIndex(1); // 👈 OCT_2024
        stateManager.setState("auto");
        startAutoScroll(stateManager, sections);
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

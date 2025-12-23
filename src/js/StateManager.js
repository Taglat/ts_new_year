export default class StateManager {
    constructor(sections = []) {
        this.state = "intro";
        this.listeners = {};
        this.sections = sections; // массив секций в порядке
        this.currentIndex = 0;    // текущая секция
    }

    STATES = {
        INTRO: "intro",
        SCROLLING: "scrolling",
        PAUSED: "paused",
        LOCKED: "locked",
        FINISHED: "finished",
    };

    setState(newState) {
        this.state = newState;
        this.emit(newState);
    }

    on(stateName, callback) {
        if (!this.listeners[stateName]) this.listeners[stateName] = [];
        this.listeners[stateName].push(callback);
    }

    emit(stateName) {
        const cbs = this.listeners[stateName];
        if (cbs) cbs.forEach(cb => cb());
    }

    nextSection() {
        if (this.currentIndex < this.sections.length - 1) {
            this.currentIndex++;
            this.setState(this.STATES.PAUSED);
            this.emit(this.STATES.SCROLLING); // вызываем анимации для новой секции
        }
    }

    prevSection() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.setState(this.STATES.PAUSED);
            this.emit(this.STATES.SCROLLING); // вызываем анимации для предыдущей секции
        }
    }

    getCurrentSection() {
        return this.sections[this.currentIndex];
    }
}

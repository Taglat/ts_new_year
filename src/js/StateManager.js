export default class StateManager {
    constructor() {
        this.state = "scroll"; // scroll | auto
        this.currentIndex = 0;
        this.speed = 1;

        this.listeners = new Set();
    }

    get snapshot() {
        return {
            state: this.state,
            currentIndex: this.currentIndex,
            speed: this.speed
        };
    }

    subscribe(fn) {
        this.listeners.add(fn);
        fn(this.snapshot);
        return () => this.listeners.delete(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn(this.snapshot));
    }

    setState(newState) {
        this.state = newState;
        console.log("STATE:", newState);
        this.notify();
    }

    setIndex(index) {
        this.currentIndex = index;
        console.log("INDEX:", index);
        this.notify();
    }

    setSpeed(speed) {
        this.speed = speed;
        console.log("SPEED:", speed);
        this.notify();
    }
}

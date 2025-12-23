export default class StateManager {
    constructor(sections = []) {
        this.state = "intro";
        this.listeners = {};
        this.sections = sections; // массив секций в порядке
        this.currentIndex = 0;    // текущая секция
    }

    STATES = {
        INTRO: "intro",
        PLAYING: "playing",
        PAUSED: "paused",
        LOCKED: "locked",
        FINISHED: "finished",
    };

    /**
     * Устанавливает новое состояние и уведомляет всех подписчиков.
     * Используй, когда глобально меняется режим работы приложения.
     * Например: перешли из intro в scrolling.
     */
    setState(newState) {
        this.state = newState;
        console.log(`this.state: ${this.state}`);
        this.emit(newState);
    }

    /**
     * Подписка на событие.
     * Используй в компонентах, чтобы реагировать на изменения.
     * Пример: stateManager.on("scrolling", () => { ...запусти анимацию... })
     */
    on(stateName, callback) {
        if (!this.listeners[stateName]) this.listeners[stateName] = [];
        this.listeners[stateName].push(callback);
    }

    /**
     * Вызывает событие вручную.
     * Обычно используется внутри setState, но можно вызывать и отдельно,
     * чтобы просто оповестить всех: "Эй, произошло событие Х!"
     */
    emit(stateName) {
        const cbs = this.listeners[stateName];
        if (cbs) cbs.forEach(cb => cb());
    }

    /**
     * Переключает на следующую секцию (если она есть).
     * Используй в кнопках "Далее" или при скролле вниз.
     * Автоматически меняет индекс и вызывает событие 'scrolling'.
     */
    nextSection() {
        if (this.currentIndex < this.sections.length - 1) {
            this.currentIndex++;
            console.log(`this.currentIndex: ${this.currentIndex}`);
            this.setState(this.STATES.PAUSED);
            this.emit(this.STATES.PLAYING); // вызываем анимации для новой секции
        }
    }

    /**
     * Переключает на предыдущую секцию (если она есть).
     * Используй в кнопках "Назад" или при скролле вверх.
     */
    prevSection() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            console.log(`this.currentIndex: ${this.currentIndex}`);
            this.setState(this.STATES.PAUSED);
            this.emit(this.STATES.PLAYING); // вызываем анимации для предыдущей секции
        }
    }

    /**
     * Возвращает DOM-элемент текущей активной секции.
     * Используй, если нужно что-то сделать с текущим слайдом (например, найти в нем элементы).
     */
    getCurrentSection() {
        console.log(`this.currentIndex: ${this.currentIndex}`);
        return this.sections[this.currentIndex];
    }
}

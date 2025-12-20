export default class HtmlElement {
    constructor({ tagName, parent = null, id = null, classNames = [] }) {
        if (!tagName) throw new Error("tagName обязателен");

        this.element = document.createElement(tagName);

        if (id) this.element.id = id;
        if (classNames.length) this.element.classList.add(...classNames);

        if (parent) this.appendTo(parent);
    }

    appendTo(parent) {
        if (typeof parent === 'string') {
            const parentEl = document.querySelector(parent);
            if (!parentEl) throw new Error(`Элемент с селектором "${parent}" не найден`);
            parentEl.appendChild(this.element);
        } else if (parent instanceof HTMLElement) {
            parent.appendChild(this.element);
        } else {
            throw new Error('Parent должен быть селектором или HTMLElement');
        }
        return this;
    }

    setText(text) { this.element.textContent = text; return this; }
    setHTML(html) { this.element.innerHTML = html; return this; }
    setAttr(attr, value) { this.element.setAttribute(attr, value); return this; }
    on(event, callback) { this.element.addEventListener(event, callback); return this; }
    addClass(...classNames) { this.element.classList.add(...classNames); return this; }
    remove() { this.element.remove(); }
}

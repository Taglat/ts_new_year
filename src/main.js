import './css/style.css'
import HtmlElement from "./utils/HtmlElement";

const app = document.querySelector('#app');

const elevator = new HtmlElement({
    tagName: "div", 
    parent: app,
    id: "elevator",
}).setHTML(`<div class="person">👤</div>`)

const date = new HtmlElement({
    tagName: "div", 
    parent: app,
    id: "date",
}).setHTML(`Октябрь 2024`)

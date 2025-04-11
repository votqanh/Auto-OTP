import { render, h } from "preact";
import { App } from "./App";

document.addEventListener("DOMContentLoaded", () => {
    const appElement = document.getElementById('app');

    if (appElement) {
        render(h(App), appElement);
        console.log('Preact app rendered successfully');
    } else {
        console.error('Could not find #app element to render into');
    }
});
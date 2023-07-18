import {createApp, h, onUnmounted} from "vue";

import "./index.css";

import VueCounterApp from "./VueCounterApp.vue";

let app = null

const mountCounter = (el) => {
    console.log('vue-counter-app bootstrap!')
    app = createApp({
        render: () => h(VueCounterApp)
    })
    app.mount(el)

    onUnmounted(() => {
        app.unmount();
        app = null;
    });
};

const root = document.querySelector('#vue-counter')

if (root) { mountCounter(root); }

export { mountCounter }
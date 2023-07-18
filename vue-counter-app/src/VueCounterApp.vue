<script setup>
import { onMounted, createApp, ref } from 'vue';
import CounterApp from './CounterApp.vue';
import vueCustomElement from '@vue/web-component-wrapper';

onMounted(() => {
    console.log('onMounted!');
});

const app = createApp(CounterApp);

// Vue 컴포넌트를 Web Component로 변환
const webComponentOptions = vueCustomElement(app, app.mount);
const webComponentName = 'counter-app'; // 원하는 웹 컴포넌트 이름으로 변경

// Web Component 등록
window.customElements.define(webComponentName, webComponentOptions);

// Module Federation을 통해 CounterApp을 expose
if (window.__POWERED_BY_VUE_APP__) {
    __webpack_init_sharing__('default');
}

export async function loadCounterApp() {
    await __webpack_share_scopes__.default.CounterApp.init(
        __webpack_share_scopes__.default
    );

    return app;
}
</script>

<template>
    <CounterApp/>
</template>
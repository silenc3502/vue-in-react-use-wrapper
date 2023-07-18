<template>
    <div>
        <p>나는 Vue Counter App</p>
        <button title="clickTest" @click="incrementCount">
            빨리 버튼 눌러봐 {{ count }} 번 눌렀어
        </button>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'CounterApp',
    setup() {
        const count = ref(0);
        const incrementCount = () => {
            count.value++;
        };

        return {
            count,
            incrementCount,
        };
    },
};
</script>
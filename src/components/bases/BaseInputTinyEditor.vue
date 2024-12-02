<template>

    <div>
        <div><p>{{ outputData }}</p></div>
        <div></div>
        <TinyEditor v-model="outputData" hidden="true"></TinyEditor>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import TinyEditor from '@/components/bases/BaseTinyEditor.vue';

const outputData = ref('')


</script>
<template>
    <div>
        <button @click="toggleDrawio">{{ title }}</button>
        <DrawIO :show-button="false" v-model:src="imgSrc" ref="drawioRef" class="drawio" />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import type { PropType } from 'vue'
import DrawIO from './Draw.io.vue'
import { createDiagramSvg } from '@/utils/svg'
import { Insert, Themes } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
const props = defineProps({
    insert: {
        type: Function as PropType<Insert>,
        default: () => null,
    },
    title: {
        type: String,
        default: 'draw.io',
    }
})

const drawioRef = ref<InstanceType<typeof DrawIO> | null>(null);

const imgSrc = ref<string>('');

console.log(imgSrc.value);

const toggleDrawio = () => {
    drawioRef.value?.toggle();
}

const generator: InsertContentGenerator = () => {
    return {
        targetValue: `<img src="${imgSrc.value}" alt="draw.io" />`, 
        select: true,
        // deviationStart: 10,
        // deviationEnd: -22
    };
};

watch(imgSrc, (newVal) => {
    console.log(newVal);
    props.insert(generator);

})

</script>

<style scoped>
.drawio[data-show="true"] {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}
</style>
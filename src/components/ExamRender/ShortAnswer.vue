<template>
    <LongAnswer :data="data" :show-line :lines="1" />
</template>


<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { PropType } from 'vue';

import Question from '@/classes/question';

import LongAnswer from './LongAnswer.vue';


const props = defineProps({
    data: {
        type: Object as PropType<Question>,
        required: true
    },
    showLine: {
        type: Boolean,
        default: true
    },
});

</script>
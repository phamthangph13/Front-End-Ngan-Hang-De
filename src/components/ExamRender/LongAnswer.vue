<template>
    <div class="lomg-answer">
        <div class="multiple-choice">
        <div class="title" v-html="renderKatex(data.title)">
        </div>
        <div class="answer">
            <!-- <div class="line"></div> -->
            <template v-for="i in lines">
                <div class="line"></div>
            </template>
        </div>
    </div>
    </div>

</template>


<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { PropType } from 'vue';
import Question from '@/classes/question';

import { renderKatex } from '@/utils/text';

const props = defineProps({
    data: {
        type: Object as PropType<Question>,
        required: true
    },
    showLine: {
        type: Boolean,
        default: true
    },
    lines: {
        type: Number,
        default: 10
    }
});

</script>

<style lang="scss">
.multiple-choice {
    font-family: 'Times New Roman', Times, serif;
    white-space: pre-wrap;
    p {
        margin: 0;
    }

    .title {
        //
        &:not(:has(div)) {
            &::before {
                font-weight: bold;
                content: var(--question-num);
                display: inline;
            }
        }

        &>div:first-child::before {
            font-weight: bold;
            content: var(--question-num);
        }
    }

    // img {
    //     // display: block;
    // }

    .line {
        width: 100%;
        height: 20px;
        border-bottom: 1px dotted black;

        &:last-child {
            margin-bottom: 10px;
        }
    }
}

</style>
<template>
    <div class="check-box">
        <div class="title" v-html="renderKatex(data.title)">
        </div>
        <ul class="answers">
            <template v-for="(answer, index) in data.answers" :key="index">
                <li class="answer" v-html="renderKatex(answer.content)">
                </li>
            </template>
        </ul>
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
    }
});



</script>

<style>
:root {
    --question-num: 'Câu 1. ';
}
</style>

<style lang="scss">
.check-box {
    font-family: 'Times New Roman', Times, serif;
    white-space: pre-wrap;

    p {
        margin: 0;
    }

    .title {

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

    .answers {
        // display: none;
        // code
        margin: 0;
        width: calc(100% - 2rem);
        list-style-type: none;
        display: flex;

        padding: 0;
        padding-left: 2rem;

        flex-wrap: wrap;
        column-gap: 2em;


        .answer {
            margin: 0;
            padding: 0;
            flex-grow: 1;
            word-wrap: break-word;
            white-space: pre-wrap;
            max-width: 100%;
            // padding: 0.5rem;
            // padding-right: 1.5rem;
            // margin-right: 2rem;
            // height: 1rem;
            // display: flex;
            // align-items: center;
            // text-align: center;

            // >div:first-child:before {
            //     content: '□';
            //     margin-right: 0.5rem;
            //     font-size: 1.8rem;
            //     // width: 1em;
            //     line-height: 0rem;

            // }

            // &:not(:has(div)) {
            //     &::before {
            //         content: '□';
            //         margin-right: 0.5rem;
            //         font-size: 1.8rem;
            //         // width: 1em;
            //         line-height: 0rem;
            //     }
            // }

            &::marker {
                content: '□ ';
                margin-right: 0.5rem;
                font-size: 1.8rem;
                // width: 1em;
                line-height: 0rem;
            }
        }
    }
}
</style>
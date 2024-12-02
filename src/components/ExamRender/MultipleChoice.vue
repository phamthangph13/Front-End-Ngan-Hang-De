<template>
    <div class="multiple-choice">
        <div class="title" v-html="renderKatex(data.title)">
        </div>
        <ol class="answers">
            <template  v-for="(answer, index) in data.answers"  :key="index">
                <li :class="{
                    answer: true,
                    correct: showCorrectAnswer && answer.isCorrect,
                }" v-html="renderKatex(answer.content)">
                </li>
            </template>
        </ol>
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
    showCorrectAnswer: {
        type: Boolean,
        default: false
    }
});



</script>

<style>
:root {
    --question-num: 'Câu 1. ';
}

</style>

<style lang="scss">
.multiple-choice {
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
        list-style-type: upper-alpha;
        display: flex;
        
        padding: 0;
        padding-left: 2rem;

        flex-wrap: wrap ;
        column-gap: 2em;
        

        .answer {
            margin: 0;
            padding: 0;
            flex-grow: 1;
            word-wrap: break-word;
            max-width: 100%;
            // padding: 0.5rem;
            // padding-right: 1.5rem;
            // margin-right: 2rem;

            &.correct {
                color: green;
            }

        }
    }
}



</style>
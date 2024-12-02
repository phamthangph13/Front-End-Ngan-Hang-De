<template>
    <TagAObject :elem :item :tag-keys :body-keys :compact="compact ? '' : null" class="question">
        <template v-for="(slot, index) of Object.keys($slots)" v-slot:[slot]="{ key, checkbox, ...item }" >
            <slot :name="slot" v-bind="item" ></slot>
        </template>

        <template #body>
            <div class="body">
<!--                <div class="title" v-html="item.title"></div>-->
<!--                <ol class="answers">-->
<!--                    <template v-for="(answer, i) in item.answers" :key="i">-->
<!--                        <li :correct="answer.isCorrect ? '' : null" class="answer">-->
<!--                            <div v-html="answer.content"></div>-->
<!--                        </li>-->
<!--                    </template>-->
<!--                </ol>-->
                <template v-if="item.type == 'multiple-choice'">
                    <MultipleChoice :data="item" show-correct-answer/>
                </template>
                <template v-else-if="item.type == 'check-box'">
                    <CheckBox :data="item" />
                </template>
                <template v-else-if="item.type == 'essay'">
                    <LongAnswer :data="item" />
                </template>
                <template v-else-if="item.type == 'short-answer'">
                    <ShortAnswer :data="item" />
                </template>
            </div>
        </template>
        <template #tag-type="{ value }">
            <span>{{ $t('question.type.title') }}&nbsp:&nbsp</span>
            <span>{{ $t(`question.type.${value}`) }}</span>
        </template>
        <template #tag-class="{ value }">
            <span>{{ $t('class') }}&nbsp:&nbsp</span>
            <span>{{ value }}</span>
        </template>
        <template #tag-subject="{ value }">
            <span>{{ $t('subject') }}&nbsp:&nbsp</span>
            <span>{{ value }}</span>
        </template>
        <template #tag-difficulty="{value}">
            <span>{{ $t('difficulty.title') }}&nbsp:&nbsp</span>
            <span>{{ $t(`difficulty.${value}`) }}</span>
        </template>
        

    
    </TagAObject>
</template>


<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, type PropType, type Component } from 'vue'
import Question from '@/classes/question';

import TagAObject from './bases/BaseTagObject.vue'
import type { ObjKey, ObjItem } from './bases/BaseTagObject.vue'

import { useI18n } from 'vue-i18n';
import MultipleChoice from "@/components/ExamRender/MultipleChoice.vue";
import LongAnswer from "@/components/ExamRender/LongAnswer.vue";
import ShortAnswer from "@/components/ExamRender/ShortAnswer.vue";
import CheckBox from "@/components/ExamRender/CheckBox.vue";


const tagKeys = ref<ObjKey[]>([
    // { name: 'id', value: 'id', clickable: true },
    { name: 'type', value: 'type', clickable: true },
    { name: 'class', value: 'class', clickable: true },
    { name: 'subject', value: 'subject.name', clickable: true },
    { name: 'difficulty', value: 'difficulty', clickable: true },
    { name: 'knowledge', value: 'knowledgeScope', clickable: true, hideName: true }
])

const bodyKeys = ref<ObjKey[]>([
    { name: 'title', value: 'title' },
    { name: 'answers', value: 'answers' }
])


const props = defineProps({
    item: {
        type: Object as PropType<Question>,
        required: true

    },
    elem: {
        type: String,
        default: 'div'
    },
    compact: {
        type: Boolean,
        default: false
    },
    // tags: {
    //     type: Array,
    //     default: () => []
    // }
})

const emit = defineEmits()

</script>

<style>
:root {
    --tag-question-answer-correct-color: green;
}


</style>


<style lang="scss" scoped>
.question {
    

    .head {
        
    }


    .body {
        //padding: 0.5rem 0;
        font-family: 'Times New Roman', Times, serif;

        .answers {
            list-style-type: upper-alpha;
            // padding: 0;
            margin: 0;
            font-size: 0.95rem;
    
            &:has(.answer:only-child) {
                padding: 0;
                list-style-type: none;
            }

            .answer[correct] {
                color: var(--tag-question-answer-correct-color);
            }
        }
    }
}

.question[compact] {
    overflow: hidden;

    :deep(img) {
        display: none;
    }

    .body {



        .answers {
            display: -webkit-box;
            list-style-type: none;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            overflow: hidden;
            padding: 0;
            
    
            .answer {
                display: none;
                
    
                &[correct] {
                    display: block;
                }
            }
        }
    
        .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            overflow: hidden;
        }

    }

}
</style>
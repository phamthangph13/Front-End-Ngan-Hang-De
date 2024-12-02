<template>
    <TagAObject :item :tag-keys class="question-group" :compact="compact ? '' : null">
        <template v-for="(slot, index) of Object.keys($slots)" v-slot:[slot]="{ key, checkbox, ...item }" >
            <slot :name="slot" v-bind="item" ></slot>
        </template>

        <template #tag-class="{ value }">
            <span>{{ $t('class') }}&nbsp:&nbsp</span>
            <span>{{ value }}</span>
        </template>
        <template #tag-subject="{ value }">
            <span>{{ $t('subject') }}&nbsp:&nbsp</span>
            <span>{{ value }}</span>
        </template>

        <template #body>
            <div class="body">
                <div v-if="item.method" class="method" v-html="item.method"></div>
                <div v-if="item.source" class="source" v-html="item.source"></div>

                <div class="list">
                    <template v-for="(question, i) in item.questions" :key="i">
                        <TagsNQuestion :item="question" class="question" :compact :style="{
                            '--question-num': `'Câu ${i + 1}. '`,
                        }"/>
                    </template>
                </div>
            </div>
        </template>
        
    </TagAObject>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, defineAsyncComponent, type PropType } from 'vue';
import TagAObject from './bases/BaseTagObject.vue';
import type { ObjItem, ObjKey } from './bases/BaseTagObject.vue';
import TagsNQuestion from './TagsNQuestion.vue';

import Question from '@/classes/question';
import QuestionGroup from '@/classes/questionGroup';

const props = defineProps({
    item: {
        type: Object as PropType<QuestionGroup>,
        required: true
    },
    compact: {
        type: Boolean,
        default: false
    }
})

const tagKeys = ref<Array<ObjKey>>([
    // {
    //     name: 'id',
    //     value: 'id'
    // },
    {
        name: 'class',
        value: 'class'
    },
    {
        name: 'subject',
        value: 'subject.name'
    },
    // {
    //     name: 'difficulty',
    //     value: 'difficulty'
    // },
    {
        name: 'knowledgeScope',
        value: 'knowledgeScope',
        isArray: true,
        hideName: true
    },
] as ObjKey[])

</script>


<style>

</style>


<style scoped lang="scss">
.question-group {

    .question {
        //margin-top: 0.5rem;
        //--tag-object-border: 1px solid #ccc;
        //--tag-object-bg: var(--tag-question-group-item-bg);
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-top: 0.25rem;
    }

    .method {
        font-style: italic;
        font-weight: bold;
    }

    .source {
        // add a tab on first line
        text-indent: 30px;
    }

    &[compact] {
        .body {

            .title {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}
</style>
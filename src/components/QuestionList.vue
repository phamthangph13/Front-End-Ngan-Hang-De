<template>
    <ul class="questions" ref="listRef">
        <template v-for="(item, i) in list" :key="item.id" >
            <TagsNQuestion 
                v-if="(item instanceof Question)"
                elem="li"
                :item="item" 
                compact 
                :class="{
                    'question': true,
                    [itemClass]: true
                }"  
                @click="emit('click-item', item, $event)"
            >
                <template #right v-if="showQNum">
                    <div class="q-num">
                        <span class="text">{{ i + 1 }}.</span>
                    </div>
                </template>
                <template #foot>
                    <div class="actions">
                        <slot name="foot-single" :item="item"></slot>
                    </div>
                </template>
            </TagsNQuestion>

<!--            <TagsNQuestionGroup -->
<!--                v-else-if="(item instanceof QuestionGroup)"-->
<!--                elem="li"-->
<!--                :item="item" -->
<!--                compact -->
<!--                -->
<!--                :class="{-->
<!--                    'question-group': true,-->
<!--                    [itemClass]: true-->
<!--                }" -->
<!--                @click="emit('click-group', item, $event)"-->
<!--            >-->
<!--                <template #foot>-->
<!--                    <slot name="foot-group" :item></slot>-->
<!--                </template>-->
<!--            </TagsNQuestionGroup>-->




        </template>
    </ul> 
</template>


<script setup lang="ts">
import {ref, defineProps, defineAsyncComponent, defineEmits, watch, defineModel, useTemplateRef, onMounted} from 'vue';
import type { PropType } from 'vue';
import {useSortable} from "@vueuse/integrations/useSortable";
// import { useRouter } from 'vue-router';

import Question from '@/classes/question';
import QuestionGroup from '@/classes/questionGroup';


const TagsNQuestion = defineAsyncComponent(() => import('@/components/TagsNQuestion.vue'))
const TagsNQuestionGroup = defineAsyncComponent(() => import('@/components/TagsNQuestionGroup.vue'))


const emit = defineEmits(['click-item', 'click-group'])

const { itemClass = '', sortable = false, showQNum = false } = defineProps<{
    itemClass?: string,
    sortable?: boolean,
    showQNum?: boolean,
}>()

const list = defineModel<Question[]>({
    required: true,
})

const listRef = useTemplateRef<HTMLElement>('listRef')

if (sortable) {
    const { option } = useSortable(listRef, list, {
        animation: 100,
    })
}

onMounted(() => {

})






// const checkObj = (obj: any) => {
//     // console.log(typeof obj)
//     if (obj.questions) return 1;
//     if (obj.answers) return 2;
//     return 0;
// }

</script>


<style scoped lang="scss">
.questions {
    // display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    column-count: 1;
    // column-gap: 10px;
	// flex-wrap: wrap;
    column-gap: 0.5rem;
    // row-gap: 0.5rem;
    // align-items: stretch;
    // justify-content: center;
    // overflow: hidden;
    

    > li {
        margin-bottom: 0.5rem;
        transition: background-color 0.3s;
        // width: 49%;
        // width: 100%;
        break-inside: avoid;
        //transition: all 0.3s ease;

        .q-num {
            position: relative;
            width: 2rem;
            .text {
                position: absolute;
                bottom: -20px;
                color: #000;
                background-color: #fff;
                padding: 5px;
            }
        }

        :deep(.foot) {
            position: relative;
        }

        &:hover {
            // background-color: #f0f0f0;

            .actions {
                opacity: 1;
            }
        }
    }

    .actions {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        gap: 0.25rem;
        opacity: 0;
        transition: all 0.3s ease;
        // pointer-events: none;
        // user-select: none;
    }

    :slotted(button) {
        border: none;
        border-radius: 999rem;
        padding: 0rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }




}




</style>
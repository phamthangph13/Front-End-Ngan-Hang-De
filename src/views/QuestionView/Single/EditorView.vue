<template>

    <!-- <div class="view" :mode="mode"> -->



    <!-- <template class="editor" v-if="mode !== 'view'"> -->
    <fieldset>
        <legend>{{ $t('setting.title', { name: $t('question.title')}) }} </legend>
        <div class="body">
            <div class="group">
                <BaseFormSelect :label="$t('question.type.title')" :list="questionTypes" v-model="questionData.type">
                    <template #default="{value}">
                        {{ $t(`question.type.${value}`) }}
                    </template>
                    <template #item="{item}">
                        {{ $t(`question.type.${item}`) }}
                    </template>
                </BaseFormSelect>  
                <BaseFormSelect :label="$t('difficulty.title')" :list="diffcultList" v-model="questionData.difficulty">
                    <template #default="{value}">
                        {{ $t(`difficulty.${value}`) }}
                    </template>
                    <template #item="{item}">
                        {{ $t(`difficulty.${item}`) }}
                    </template>
                </BaseFormSelect>    
                <BaseFormSelect :label="$t('class')" :list="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="questionData.class" />
                <BaseFormSelect :label="$t('subject')" :list="subjectsStore.subjects" v-model="questionData.subject">
                    <template #default="{value} ">
                        {{ value?.name }}
                    </template>
                    <template #item="{item}">
                        {{ item?.name }}
                    </template>
                </BaseFormSelect>
            </div>
            <!-- <BaseFormSelect :label="$t('method')" v-model="data.method" :list="subjectsStore.subjects" nullable :null-label="$t('none')">
                <template #default="{value} ">
                    {{ value?.name }}
                </template>
                <template #item="{item}">
                    {{ item?.name }}
                </template>
            </BaseFormSelect> -->
            <div class="field">
                <label>
                    {{ $t('tag')}}
                </label>
                <TagIpt v-model="questionData.knowledgeScope" class="tagIpt" />
            </div>
        </div>
    </fieldset>
    <!-- <hgroup>
                <ul style="margin: 0; list-style: none; padding: 0;">
                    <li>{{ $t('question_editor_hgroup.hg1') }}</li>
                    <li>{{ $t('question_editor_hgroup.hg2') }}</li>
                    <li>{{ $t('question_editor_hgroup.hg3') }}</li>
                    <li>Lưu ý: Tính năng chỉ thêm câu hỏi đơn lẻ</li>
                    <li>Lưu ý: Nếu thêm câu hỏi liên quan đến tài liệu thì chọn mục khác</li>
                    <li>Lưu ý: Chuyển từ dạng trắc nghiệm thành tự luận kiến tất cả câu trả lời biến mất</li>
                </ul>
            </hgroup> -->
    <QuestionEditor v-model="questionData" ref="editor" class="editor" />
    <div class="preview">
        <MultipleChoice :data="questionData" v-if="questionData.type === 'multiple-choice'" />
        <LongAnswer :data="questionData" v-else-if="questionData.type === 'essay'" />
        <ShortAnswer :data="questionData" v-else-if="questionData.type === 'short-answer'" />
        <CheckBox :data="questionData" v-else-if="questionData.type === 'check-box'" />

    </div>
    <div class="actions">
        <BaseButton @click="mode === 'edit' ? update() : add()">
            <template #icon>
                <FontAwesomeIcon :icon="faFloppyDisk" />
            </template>
            {{ $t('crud.save') }}
        </BaseButton>
    </div>
    <!-- </template> -->

    <!-- <template v-else>
            <TagsNQuestion :item="data" elem="div" />


            <div class="func">
                
                <button @click="router.push(`edit`)">{{ $t('crud.edit') }}</button>
                <button @click="remove">{{ $t('crud.delete') }}</button>
                <button @click="router.push(`clone`)">Nhân bản</button>
                <button @click="router.push(`similar`)">AI tạo câu hỏi tương tự</button>

            </div>
        </template> -->

    <!-- </div> -->
</template>

<script setup lang="ts">
import {ref, defineAsyncComponent, onMounted, defineModel, defineExpose, reactive} from 'vue';
import { PropType } from "vue";
import { addQuestion, updateQuestion } from '@/api/question';
import { useRouter } from 'vue-router';
import { useSubjectStore } from '@/stores/subjects';

import Question, { QuestionTypes, DifficultyList } from '@/classes/question';
import Subject from "@/classes/subject";
import type { Difficulty, QuestionType } from '@/classes/question';
import type Mode from '@/types/mode.ts';
// import Subject from "@/classes/subject";
import BaseButton from "@/components/bases/BaseButton.vue";
import BaseFormSelect from "@/components/bases/BaseFormSelect.vue";


//#region components
const TagIpt = defineAsyncComponent(() => import('@/components/bases/BaseTagIpt.vue'));
// const TagsNQuestion = defineAsyncComponent(() => import('@/components/TagsNQuestion.vue'));
const QuestionEditor = defineAsyncComponent(() => import('@/components/QuestionEditor.vue'));
// const NewDialog = defineAsyncComponent(() => import('@/components/BaseDialog.vue'))
const MultipleChoice = defineAsyncComponent(() => import('@/components/ExamRender/MultipleChoice.vue'))
const LongAnswer = defineAsyncComponent(() => import('@/components/ExamRender/LongAnswer.vue'))
const ShortAnswer = defineAsyncComponent(() => import('@/components/ExamRender/ShortAnswer.vue'))
const CheckBox = defineAsyncComponent(() => import('@/components/ExamRender/CheckBox.vue'))
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import useToastStore from "@/stores/toast";
//#endregion


const router = useRouter();
// const route = useRoute();

// const data = ref<Question>(Question.createMultipleChoiceTest());

const mode = defineModel('mode', {
    type: String as PropType<Mode>,
    default: 'view',
})

const questionData = defineModel({
    type: Question,
    // required: false,
    default: () => reactive(Question.createMultipleChoiceTest()) // fix value not change error
})

const subjectsStore = useSubjectStore()
const toastStore = useToastStore()
const diffcultList = ref<Difficulty[]>(Object.values(DifficultyList))
const questionTypes = ref<QuestionType[]>(Object.values(QuestionTypes))

// const props = defineProps({
//     subjects: {
//         type: Array as PropType<Subject[]>,
//         required: true
//     },
//     diffcultList: {
//         type: Array as PropType<Difficulty[]>,
//         required: true
//     },
//     questionTypes: {
//         type: Array as PropType<QuestionType[]>,
//         required: true
//     }
// })

const emits = defineEmits(['add', 'update', 'remove', 'clone', 'similar'])

onMounted(async () => {
    await subjectsStore.fetchSubjects()
    // if (id.value) {
    //     // query mode from the router
    //     mode.value = route.params.mode as Mode ?? 'view'
    //     data.value = await getQuestion(id.value) as Question
    //     // console.log(data.value)
    // }
    // // if (mode.value === 'clone') {
    // //     data.value?.id = undefined
    // // }
    // if (mode.value === 'similar') {
    //     await createSimilarQuestion(data.value.id ?? '').then((res) => {
    //         data.value = Question.fromJson(res)
    //         console.log(data.value)
    //     })
    // }

})

const add = async () => {
    // console.log(data.value)
    await addQuestion(questionData.value).then(() => {
        toastStore.addTimeout({
            message: 'Add question successfull',
            type: 'success'
        })
        router.push({
            name: 'question-list'
        })
    })
}

const update = async () => {
    await updateQuestion(questionData.value.id ?? '', questionData.value).then(() => {
        toastStore.addTimeout({
            message: 'Update question successfull',
            type: 'success'
        })
        router.push({
            name: 'question-list'
        })
    })
}

// const remove = async () => {
//     await deleteQuestion(data.value.id ?? '').then(() => {
//         // go back to the previous page
//         router.back()
//     })
// }

// const similar = async () => {
//
// }

defineExpose({
    mode,
})


</script>

<style>


</style>


<style scoped lang="scss">
// .view {
//     --border: 1px solid #ccc;
//     --hgroupl: 5px solid #333;
//     font-family: Arial, sans-serif;
//     padding: 10px;
//     position: relative;
//     overflow-x: hidden;

//* > * {
//    padding: 1rem;
//}

//.view {
//    padding: 1rem;
//}

$padding: 10px;
$margin: 10px;

// }


h3 {
    margin: 0;
    padding: 0 $padding;
}

hgroup {
    padding: 10px;
    //border-left: var(--hgroupl);
    margin: 10px 0;
}

fieldset {
    padding: $padding;
    margin: $margin;
    //border: var(--border);
    // margin: 10px;
    border-radius: 0.25rem;

    .body {
        display: flex;
        flex-direction: column;
        row-gap: 0.75rem;

        // display: grid;
        // grid-template-columns: auto 1fr;
        .group {
            display: grid;
            // 1 column, 2 column max 4 columns
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            row-gap: 0.75rem;
            column-gap: 0.25rem;
        }


    }
}

:deep(.preview) {
    border-bottom: none;
    margin: $margin
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;

    button {
        margin-right: 10px;
    }
}

.editor {
    margin: $margin;
}

//.tagIpt {
//    --tag-height: 25px;
//    --bg-color: #f1f1f1;
//    --icon-color: #333;
//    --font-size: 16px;
//    --svg-size: 16px;
//}



</style>
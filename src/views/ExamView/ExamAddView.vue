<script setup lang="ts">
import {
    ref,
    defineProps,
    onMounted,
    defineAsyncComponent,
    watch,
    nextTick,
    reactive,
    useTemplateRef,
    computed
} from 'vue';

import Question from '@/classes/question';
import Exam from '@/classes/exam';

import {addExam} from "@/api/exam";

import {useRouter} from 'vue-router';
import useToastStore from "@/stores/toast";
import {useSubjectStore} from '@/stores/subjects';
import {useQuestionStore} from '@/stores/questions';

import {faArrowDown, faArrowUp, faFloppyDisk, faMinus, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const BaseButton = defineAsyncComponent(() => import('@/components/bases/BaseButton.vue'))
const BaseFormInputText = defineAsyncComponent(() => import('@/components/bases/BaseFormInputText.vue'))
const BaseFormSelect = defineAsyncComponent(() => import('@/components/bases/BaseFormSelect.vue'))
const BaseToggleSwitch = defineAsyncComponent(() => import('@/components/bases/BaseToggleSwitch.vue'))
const BaseTabWarpper = defineAsyncComponent(() => import('@/components/bases/BaseTabWarpper.vue'))
const BaseTabItem = defineAsyncComponent(() => import('@/components/bases/BaseTabItem.vue'))
const BaseDialog = defineAsyncComponent(() => import('@/components/bases/BaseDialog.vue'))
const TagIpt = defineAsyncComponent(() => import('@/components/bases/BaseTagIpt.vue'))
const QuestionList = defineAsyncComponent(() => import('@/components/QuestionList.vue'))


const router = useRouter()
const subjectStore = useSubjectStore()
const questionStore = useQuestionStore()
const toastStore = useToastStore()

const { mode = 'add' } = defineProps<{
    mode?: 'add' | 'edit',
}>()

const examData = defineModel({
    type: Exam,
    default: () => reactive(Exam.createExam())
})

const qBank = ref<Question[]>([]) // the clone of questionStore.questions for filter
const dialogRef = useTemplateRef<InstanceType<typeof BaseDialog>>('dialogRef')
const examQListRef = useTemplateRef('examQListRef')

const searchText = ref<string>('')

// return a list from the examData.questions, most component use list not Set
const examQList = computed({
    get() {
        return Array.from(examData.value.questions)
    },
    set(value) {
        examData.value.questions = new Set(value)
    }
})

// check if the examData is good to save
const isLookGood = computed(() => {
    return examData.value.title.length > 0
        && examData.value.subject
        && examData.value.questions.size > 0
})

const refresh = async () => {
    await questionStore.fetchQuestions()
    await subjectStore.fetchSubjects()
}

const deleteQuestion = (question: Question) => {
    // data.value.questions?.splice(index, 1)
    examData.value.questions?.delete(question)
}

const addQuestion = (q: Question) => {
    // console.log(q)
    examData.value.questions?.add(q)
}

// change the order of the question
const upQuestion = (q: Question) => {
    const questions = Array.from(examData.value.questions)
    const index = questions.indexOf(q)
    if (index > 0) {
        [questions[index], questions[index - 1]] = [questions[index - 1], questions[index]]
        console.log(questions)
        examData.value.questions = new Set(questions)
    }
}

const downQuestion = (q: Question) => {
    const questions = Array.from(examData.value.questions)
    const index = questions.indexOf(q)
    if (index < questions.length - 1) {
        [questions[index], questions[index + 1]] = [questions[index + 1], questions[index]]
        console.log(questions)
        examData.value.questions = new Set(questions)
    }
}

const save = () => {
    addExam(examData.value).then(() => {
            toastStore.addTimeout({
                type: 'success',
                message: 'Add exam success'
            })
            router.push({
                name: 'exam-list'
            })
        }
    );
}

const questionFilter = () => {
    qBank.value = questionStore.questions
        .filter((q) => {
            return q.title.includes(searchText.value)
        })
        .filter((q) => {
            // check it is not in the examData.questions, p/s: examData.questions is a Set
            return !examData.value.questions?.has(q)
        })
        .filter((q) => {
            // check it is in the same subject
            return q.subject.id === examData.value.subject.id
        })
}

// call questionFilter when searchText or examData.subject change
watch(() => searchText.value, async (newValue) => {
    // qBank.value = questionStore.questions.filter(questionFilter)
    questionFilter()
}, {deep: true})

watch(() => examData.value.subject, async (newValue) => {
    await questionStore.fetchQuestions();
    questionFilter()
}, {deep: true})

watch(() => examData.value.questions, async (newValue, oldValue) => {
    questionFilter()
    // useSortable('#test', examQList)
}, {deep: true})


onMounted(async () => {
    await refresh()
})


</script>

<template>
    <h2 v-if="mode === 'add'">{{ $t('crud.add', {name: $t('exam.title')}) }}</h2>
    <h2 v-else-if="mode === 'edit'">{{ $t('crud.edit', {name: $t('exam.title')}) }}</h2>
    <BaseTabWarpper>
        <BaseTabItem :title="$t('setting.title')" _key="setting">
            <fieldset>
                <BaseFormInputText v-model="examData.title" :label="$t('title')" class="title"></BaseFormInputText>
                <BaseFormSelect :label="$t('subject')" :list="subjectStore.subjects" v-model="examData.subject">
                    <template #default="{value} ">
                        {{ value?.name }}
                    </template>
                    <template #item="{item}">
                        {{ item?.name }}
                    </template>
                </BaseFormSelect>
                <BaseFormSelect :label="$t('duration')" :list="[15,30,45,60,75,90,115,120]" v-model="examData.duration">
                    <template #default="{value} ">
                        {{ value }} {{ $t('minute') }}
                    </template>
                    <template #item="{item}">
                        {{ item }} {{ $t('minute') }}
                    </template>
                </BaseFormSelect>
                <BaseFormInputText v-model="examData.code" :label="$t('code')" class="title"></BaseFormInputText>
                <div class="field">
                    <label>
                        {{ $t('official') }}
                    </label>
                    <BaseToggleSwitch v-model="examData.isOfficial"/>
                </div>
                <div class="field">
                    <label>
                        {{ $t('tag') }}
                    </label>
                    <TagIpt v-model="examData.knowledgeScope" class="tagIpt"/>
                </div>
            </fieldset>
        </BaseTabItem>
        <BaseTabItem :title="`${$t('question.title')} (${examData.questions.size})`" _key="questions"
                     class="tab-questions">
            <div class="actions">
                <BaseButton disabled>
                    <template #icon>
                        <FontAwesomeIcon :icon="faPlus"/>
                    </template>
                    {{ $t('crud.add', {name: $t('question.title')}) }}
                </BaseButton>
                <BaseButton @click="dialogRef?.show">
                    <template #icon>
                        <FontAwesomeIcon :icon="faSearch"/>
                    </template>
                    {{ $t('crud.find', {name: $t('question.title')}) }}
                </BaseButton>
            </div>
            <QuestionList v-model="examQList" ref="examQListRef" sortable showQNum>
                <template #foot-single="{item}">
                    <button @click="upQuestion(item)">
                        <FontAwesomeIcon :icon="faArrowUp"/>
                    </button>
                    <button @click="downQuestion(item)">
                        <FontAwesomeIcon :icon="faArrowDown"/>
                    </button>
                    <button @click="deleteQuestion(item)">
                        <FontAwesomeIcon :icon="faMinus"/>
                    </button>

                </template>
            </QuestionList>
            <!--            <ul class="questions" ref="examQListRef">-->
            <!--                <TagsNQuestion :item="q" v-for="q in examQList" :key="q.id" elem="li"></TagsNQuestion>-->
            <!--            </ul>-->

        </BaseTabItem>
    </BaseTabWarpper>
    <div class="actions">
        <BaseButton :disabled="!isLookGood" @click="save">
            <template #icon>
                <FontAwesomeIcon :icon="faFloppyDisk"/>
            </template>
            {{ $t('crud.save') }}
        </BaseButton>
    </div>
    <BaseDialog ref="dialogRef" model-screen="lg">
        <template #title>
            {{ $t('crud.find', {name: $t('question.title')}) }}
        </template>
        <template #body>
            <div class="content">
                <BaseFormInputText :label="$t('crud.find', {name : $t('question.title')})"
                                   v-model="searchText"/>
                <QuestionList v-model="qBank">
                    <template #foot-single="{item}">
                        <button @click="addQuestion(item)">
                            <FontAwesomeIcon :icon="faPlus"/>
                        </button>
                    </template>
                </QuestionList>
            </div>
        </template>
    </BaseDialog>
</template>

<style lang="scss" scoped>
$padding: 10px;
$margin: 10px;

h2 {
    margin: $margin;
    //padding: 0 $padding;
}

.tabs-wrapper {
    margin: 0 $margin 0 $margin;
    flex: 1;

    fieldset {
        //margin: $margin;
        padding: 0;
        border: none;
        border-radius: 5px;
        width: 100%;
        margin: 0;

        .field {
            margin-top: $margin;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    .tab-questions {
        //flex: 1;
        height: 42rem;
        display: grid;
        //flex-direction: column;
        grid-template-rows: auto 1fr;

        overflow: hidden;

        .actions {
            margin-top: 0;
            margin-left: 0;
            margin-right: 0;
        }

        .questions {
            flex: 1;
            overflow-y: auto;
            column-count: unset;
            scrollbar-width: thin;
        }

    }
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin: $margin;
    gap: 0.5rem;
}

.modal {
    .content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow: hidden;
        //flex: 1;
        height: 100%;


    }

}

.questions {
    //display: flex;
    //flex-direction: column;
    //height: 100%;
    overflow-y: auto;

    button {
        min-width: 2rem;
        height: 2rem;

        //svg {
        //    width: 1.5rem;
        //    height: 1.5rem;
        //}
    }
}

</style>
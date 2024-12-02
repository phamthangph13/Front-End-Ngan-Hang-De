<template>
    <!-- <div class="view"> -->

    <HeadCrud @add="addSingle" @refresh="refreshAll">
        <template #title>
            <h2>{{ $t('crud.list', {name: $t('question.title')}) }}</h2>
        </template>
    </HeadCrud>

    <div class="list">

        <QuestionList v-model="questionStore.questions" itemClass="item" @click-item="viewSingle">
            <template #foot-single="{ item }">
                <!-- <button @click="viewSingle(item)" class="btn btn-primary">Xem</button> -->
                <button @click.stop="editSingle(item)" class="">
                    <FontAwesomeIcon :icon="faPencil" />
                </button>
                <button @click.stop="cloneSingle(item)" class="">
                    <FontAwesomeIcon :icon="faCopy" />
                </button>
                <button @click.stop="openSimilarAIDialog(item)" class="">
                    <SparkIcon width="1.25rem" height="1.25rem"/>
                </button>
                <button @click.stop="removeSingle(item)" class="">
                    <FontAwesomeIcon :icon="faTrash" />
                </button>
                <!-- <div class="func">
                </div> -->
            </template>
<!--            <template #foot-group="{ item }">-->
<!--                &lt;!&ndash; <button @click="viewGroup(item)" class="btn btn-primary">Xem</button> &ndash;&gt;-->
<!--                <div class="func">-->
<!--                    <button @click="editGroup(item)" class="btn btn-warning">Sửa</button>-->
<!--                    <button @click="removeGroup(item)" class="btn btn-danger">Xóa</button>-->
<!--                </div>-->
<!--            </template>-->
        </QuestionList>

    </div>


    <BaseDialog ref="addDialogRef">
        <template #title>{{ $t("crud.add") }} {{ $t("question.title") }}</template>
        <template #body>
            <div class="add-dialog-body">
                <div>Chọn loại câu hỏi muốn thêm</div>
                <small>- Các loại câu hỏi đơn</small>
                <BaseButton @click="router.push({name: 'question-add-single'})">{{ $t('crud.single', {name : $t('question.title')}) }}</BaseButton>
                <small>- Các loại câu hỏi đặc biệt</small>
                <BaseButton disabled>Điền vào chỗ trống</BaseButton>
                <BaseButton disabled>Câu hỏi kích thích</BaseButton>
                <small>- Tạo câu hỏi bằng AI</small>
                <BaseButton @click="openSimilarAIDialog(null)">{{ $t('crud.single', {name : $t('question.title')}) }}</BaseButton>
            </div>

        </template>
        <template #footer>
            <span></span>
        </template>
    </BaseDialog>
    <GenerateQuestionAIDialog ref="genDialogRef" @reload="refreshAll"></GenerateQuestionAIDialog>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, defineAsyncComponent } from 'vue';

import { useRouter } from 'vue-router';
import { useQuestionStore } from '@/stores/questions';
import { deleteQuestion } from '@/api/question';
import { deleteQuestionGroup } from "@/api/questionGroup";

import QuestionGroup from '@/classes/questionGroup';
import Question from '@/classes/question';

//#region components
const DataTable = defineAsyncComponent(() => import('@/components/bases/BaseDataTable.vue'));
const HeadCrud = defineAsyncComponent(() => import('@/components/HeadCrud.vue'));
// const TagsNQuestion = defineAsyncComponent(() => import('@/components/TagsNQuestion.vue'))
// const TagsNQuestionGroup = defineAsyncComponent(() => import('@/components/TagsNQuestionGroup.vue'))
const QuestionList = defineAsyncComponent(() => import('@/components/QuestionList.vue'));
const GenerateQuestionAIDialog = defineAsyncComponent(() => import('@/components/GenerateQuestionAIDialog.vue'));
const BaseDialog = defineAsyncComponent(() => import('@/components/bases/BaseDialog.vue'));
const BaseButton = defineAsyncComponent(() => import('@/components/bases/BaseButton.vue'));
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPencil, faCopy } from '@fortawesome/free-solid-svg-icons';
import SparkIcon from '@/assets/icon/spark-svgrepo-com.svg'
// import GenerateQuestionAIDialog from "@/components/GenerateQuestionAIDialog.vue";

//#endregion

const router = useRouter()
const questionStore = useQuestionStore()

const refreshAll = async () => {
    console.log('refresh');
    await questionStore.fetchQuestions().then().catch(() => {
        console.log('error');
    });
}

const genDialogRef = ref<InstanceType<typeof GenerateQuestionAIDialog> | null>(null)
const addDialogRef = ref<InstanceType<typeof BaseDialog> | null>(null)


const viewSingle = (item: Item & Question) => {
    router.push(`/question/single/${item.id}`)
}

const addSingle = () => {
    // router.push({
    //     name: 'question-add-single'
    // })
    addDialogRef.value?.show()
}

const editSingle = (item: Item & Question) => {
    router.push({
        name: 'question-edit-single',
        params: {
            id: item.id
        }
    })
}

const removeSingle = async (item: Item & Question) => {
    item.id && await deleteQuestion(item.id)
    await refreshAll()
}

const cloneSingle = (item: Item & Question) => {
    console.log(item);
    router.push({
        name: 'question-add-single',
        query: {
            clone: item.id
        }
    })
}

const openSimilarAIDialog = (item: Item & Question) => {
    console.log(item);
    genDialogRef.value?.show(item);
}

const viewGroup = (item: Item & QuestionGroup) => {
    router.push(`/question/group/${item.id}`)
}

const editGroup = (item: Item & QuestionGroup) => {
    router.push(`/question/group/${item.id}/edit`)
}

const removeGroup = async (item: Item & QuestionGroup) => {
    item.id && await deleteQuestionGroup(item.id);
    await refreshAll()
}

onMounted(async () => {
    await refreshAll();
})


</script>


<style>
:root {
    --list-item-button-bg-color: #f0f0f0;
    --list-item-button-font-color: #000;
}
</style>


<style scoped lang="scss">
// .view {
//     position: relative;
//     // overflow-y: hidden;
//     font-family: Arial, sans-serif;



// }

// *:has(.list) {
//     position: relative;
//     // overflow-y: hidden;
//     font-family: Arial, sans-serif;
//     padding: 0;
// }

.list {
    padding: 1rem;

    //:deep(.question) {
    //    column-count: 2;
    //}

    @media (min-width: 1000px) {
        > :deep(.questions) {
            column-count: 2;
        }
    }

    @media (min-width: 1500px) {
        > :deep(.questions) {
            column-count: 3;
        }
    }

    :deep(.item) {
        cursor: pointer;
        position: relative;

        button {
            min-width: 2rem;
            height: 2rem;
        }

        //
        // .func {

        //     position: absolute;
        //     // padding: 0.2rem 0.5rem 0.5rem 0.5rem;
        //     opacity: 0;
        //     transition: all 0.3s ease;
        //     background-color: var(--list-item-button-bg-color);
        //     color: var(--list-item-button-font-color);
        //     bottom: -0.5rem;
        //     display: flex;
        //     // gap: 0.5rem;

        //     --r: 1rem;
        //     border: var(--r) solid #0000;
        //     border-bottom: 0;
        //     border-radius: calc(var(--r) * 1.2) calc(var(--r) * 1.2) 0 0;
        //     height: calc(var(--r) * 2.5);
        //     // width: 10rem;

        //     mask:
        //         radial-gradient(100% 100% at 0% 0%, #0000 98%, #000) 8% 100% / calc(var(--r) / 2) calc(var(--r) / 2),
        //         radial-gradient(100% 100% at 100% 0%, #0000 98%, #000) 92% 100% / calc(var(--r) / 2) calc(var(--r) / 2),
        //         linear-gradient(#000 0 0) padding-box;
        //     mask-repeat: no-repeat;

        //     button {
        //         // position: absolute;
        //         padding: 0 0.5rem;
        //         border: none;
        //         background-color: transparent;
        //         color: var(--list-item-button-font-color);
        //         border-left: 1px solid #ccc;

        //         cursor: pointer;
        //         // padding: 0

        //         &:first-child {
        //             border: none;
        //         }

        //         // &:not(:first-child) {
        //         //     border: none;
        //         //     border-left: 1px solid #ccc;
        //         // }
        //     }
        // }

        // &:hover {

        //     .func {
        //         opacity: 1;
        //         // transform: translateY(-1rem);

        //         bottom: 0;
        //     }

        // }
    }
}

.add-dialog-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

// @media screen and (min-width: 1000px) {
//     .view {

//         :deep(.item) {
//             max-width: 50%;
//         }

//         :deep(.questions) {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 1rem;
//         }
//     }

// }



</style>
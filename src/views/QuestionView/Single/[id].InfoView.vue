<template>
    <TagsNQuestion :item="data" elem="div" />
    <div class="actions">
        
        <BaseButton @click="editItem">
            <template #icon>
                <FontAwesomeIcon :icon="faPencil" />
            </template>
            {{ $t('crud.edit') }}
        </BaseButton>
        <BaseButton @click="deleteItem">
            <template #icon>
                <FontAwesomeIcon :icon="faTrash" />
            </template>
            {{ $t('crud.delete') }}
        </BaseButton>
        <BaseButton @click="cloneItem">
            <template #icon>
                <FontAwesomeIcon :icon="faCopy" />
            </template>
            Nhân bản
        </BaseButton>
        <BaseButton @click="generateItem">
            <template #icon>
                <SparkIcon width="1.25rem" height="1.25rem"/>
            </template>
            Tạo câu hỏi tương tự
        </BaseButton>

    </div>
    <GenerateQuestionAIDialog ref="dialogRef" @reload="backToList"/>
</template>



<script setup lang="ts">
import { ref, defineAsyncComponent, defineModel } from 'vue';
// import type {PropType} from "vue";
import { deleteQuestion } from '@/api/question';
import { useRouter } from 'vue-router';


// #region Components
import Question from '@/classes/question';
import BaseButton from "@/components/bases/BaseButton.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPencil, faCopy } from '@fortawesome/free-solid-svg-icons';
import SparkIcon from '@/assets/icon/spark-svgrepo-com.svg'
const TagsNQuestion = defineAsyncComponent(() => import('@/components/TagsNQuestion.vue'));
const GenerateQuestionAIDialog = defineAsyncComponent(() => import('@/components/GenerateQuestionAIDialog.vue'));
// #endregion

// const emits = defineEmits(['remove', 'edit', 'clone', 'similar']);

const data = defineModel({
    type: Question,
    required: true,
})

const router = useRouter();
// const route = useRoute();

const dialogRef = ref<InstanceType<typeof GenerateQuestionAIDialog> | null>(null);


const deleteItem = async () => {

    await deleteQuestion(data.value.id).then(() => {
        backToList();
    })
}

const editItem = () => {
    router.push({
        name: 'question-edit-single',
        params: {
            id: data.value.id
        }
    })
}

const cloneItem = () => {
    router.push({
        name: 'question-add-single',
        query: {
            clone: data.value.id
        }
    })
}

const generateItem = () => {
    dialogRef.value?.show(data.value);
}

const backToList = () => {
    router.push({
        name: 'question-list'
    })
}

</script>


<style scoped lang="scss">
.actions {
    display: flex;
    justify-content: end;
    margin-top: 1rem;
    gap: 1rem;
    //button {
    //    width: 100%;
    //}
}


</style>
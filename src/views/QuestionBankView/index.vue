<script setup lang="ts">
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseDialog from "@/components/bases/BaseDialog.vue";
import BaseFormSelect from "@/components/bases/BaseFormSelect.vue";
import BaseFormInputText from "@/components/bases/BaseFormInputText.vue";
import {onMounted, ref} from "vue";
import QuestionBank from "@/classes/questionBank";
import BaseButton from "@/components/bases/BaseButton.vue";
import {addQuestionBank} from "@/api/questionBank";
import {useSubjectStore} from "@/stores/subjects";



const dialogRef = ref<InstanceType<BaseDialog | null>>(null);

const toggleDialog = () => {
    dialogRef.value?.toggle()
}

const cancelDialog = () => {
    dialogRef.value?.close()
    createdBankData.value = QuestionBank.createBank()
}

const saveDialog = () => {
    addQuestionBank(createdBankData.value).then(() => {
        console.log('Bank created')
        dialogRef.value?.close()
        createdBankData.value = QuestionBank.createBank()
    }).catch((e) => {
        console.error(e)
    })
}

const createdBankData = ref(QuestionBank.createBank())


const subjectStore = useSubjectStore()

onMounted(async() => {
    await subjectStore.fetchSubjects()
})

</script>


<template>
    <h2>{{ $t('crud.list', { name: $t('bank', {name: $t('question.title')}) }) }}</h2>
    <button @click="toggleDialog">
        <FontAwesomeIcon :icon="faPlus" />
    </button>
    <BaseDialog ref="dialogRef" model-screen="lg">
        <template #title>
            {{ $t('crud.create', { name: $t('bank') }) }}
        </template>
        <template #body>
            <div class="content">
                <BaseFormInputText :label="$t('crud.name', { name: $t('bank') } )" v-model="createdBankData.title"/>
                <BaseFormSelect :label="$t('subject')" v-model="createdBankData.subject" :list="subjectStore.subjects" >
                    <template #default="{value} ">
                        {{ value?.name }}
                    </template>
                    <template #item="{item}">
                        {{ item?.name }}
                    </template>
                </BaseFormSelect>
                <BaseFormSelect :label="$t('class')" v-model="createdBankData.class" :list="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" />
            </div>

        </template>
        <template #footer>
            <BaseButton @click="cancelDialog" class="secondary">
                {{ $t('crud.cancel') }}
            </BaseButton>
            <BaseButton @click="saveDialog">
                {{ $t('crud.save') }}
            </BaseButton>

        </template>
    </BaseDialog>
</template>

<style scoped lang="scss">
    .content {
        display: grid;
        gap: 0.8rem;
    }
</style>
<template>
    <div class="view">
        <div class="list">
            <h2>{{ $t('crud.list', {name: $t('subject')})}}</h2>
            <div class="actions">
                <BaseButton @click="subjectStore.fetchSubjects">Refresh</BaseButton>
            </div>
            <div v-if="subjectStore.loading">Loading...</div>
            <div v-if="subjectStore.subjects">
                <Datatable :data="subjectStore.subjects" :headers :rows-per-page-message="$t('crud.rows-per-page-message')">
                </Datatable>
            </div>
        </div>
        <div class="add">
            <h2>{{ $t('crud.add', {name: $t('subject')})}}</h2>
            <fieldset>
                <BaseFormInputText v-model="subjectObj.name" label="Name" />
                <BaseFormTextArea v-model="subjectObj.description" label="Description" />
            </fieldset>
<!--            <button @click="addSubjectHandler">Add Subject</button>-->
            <BaseButton @click="addSubjectHandler">{{ $t('crud.add', {name: $t('subject')})}}</BaseButton>
        </div>
    </div>
</template>


<script setup lang="ts">
import Subject from "@/classes/subject"
import { Item, Header } from "vue3-easy-data-table";
import { ref, defineAsyncComponent, onMounted, onActivated, defineProps, type PropType } from 'vue';
import { useSubjectStore } from '@/stores/subjects';
import { addSubject } from '@/api/subject';
// import BaseFormInputText from "@/components/bases/BaseFormInputText.vue";
// import BaseFormTextArea from "@/components/bases/BaseFormTextArea.vue";



const Datatable = defineAsyncComponent(() => import('@/components/bases/BaseDataTable.vue'));
const BaseFormInputText = defineAsyncComponent(() => import('@/components/bases/BaseFormInputText.vue'));
const BaseFormTextArea = defineAsyncComponent(() => import('@/components/bases/BaseFormTextArea.vue'));
const BaseButton = defineAsyncComponent(() => import('@/components/bases/BaseButton.vue'));


const subjectStore = useSubjectStore();

const subjectObj = ref<Subject>(new Subject(
    null,
    "",
    "",
    null,
));

const headers: Header[] = [
    // {
    //     text: 'ID',
    //     value: 'id',
    // },
    {
        text: 'Name',
        value: 'name',
    },
    {
        text: 'Description',
        value: 'description',
    },
    {
        text: 'Action',
        value: 'action',
    }
]

onMounted(() => {
    subjectStore.fetchSubjects();
})

const addSubjectHandler = () => {
    addSubject(subjectObj.value)
        .then(() => {
            subjectStore.fetchSubjects();
            subjectObj.value.description = "";
            subjectObj.value.name = "";
        })
        .catch((error) => {
            console.log(error);
        })
}

</script>


<style></style>


<style scoped lang="scss">
.view {
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    height: 100vh;
    padding: 1rem;

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        // margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    .list {
        .subjects {
            // list-style-type: none;
            // padding: 0;
            margin: 0;
        }
    }

    .add {
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        // justify-content: center;
        // height: 100vh;

        fieldset {
            border: none;
            padding: 0;
            margin: 0;

            .field {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;

                label {
                    margin-bottom: 5px;
                }

                input, textarea {
                    padding: 5px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
            }    
        }
    }
}
</style>
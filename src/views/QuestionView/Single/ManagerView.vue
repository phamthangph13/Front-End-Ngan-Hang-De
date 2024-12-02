<template>
    <h2 class="view-title">
        {{ $t(`crud.${componentRef?.mode ?? 'view'}`) }} {{ $t('question.title').toLowerCase() }}
    </h2>
    <router-view v-slot="{ Component }">
        <component v-model="data" :is="Component" v-if="data" ref="componentRef"

        />
    </router-view>
</template>



<script setup lang="ts">
import { defineProps, onMounted, ref, defineModel } from 'vue';
import { useRoute } from 'vue-router';
// import {PropType} from "vue";
// import type  Mode  from '@/types/mode.ts';
import Question from '@/classes/question';
// import type { Difficulty, QuestionType } from '@/classes/question';
import { getQuestion, addQuestion, updateQuestion } from '@/api/question';
// import {useSubjectStore} from "@/stores/subjects";

const props = defineProps({
    // mode: {
    //     type: String as PropType<Mode>,
    //     required: true,
    // },
    id : {
        type: String,
    }
})

const data = ref<Question | null>(null);

const componentRef = ref(null)

const route = useRoute();
// const router = useRouter();

// const subjectStore = useSubjectStore();
// const diffcultList = ref<Difficulty[]>([]);
// const questionTypes = ref<QuestionType[]>([]);
//
// const add = async (question : Question) => {
//     await addQuestion(question).then((res) => {
//         router.push({
//             name: 'question'
//         })
//     })
// }
//
// const edit = async (question : Question) => {
//     await updateQuestion(question.id, question).then((res) => {
//         router.push({
//             name: 'question'
//         })
//     })
// }

onMounted(async() => {

    // await subjectStore.fetchSubjects();
    //
    // diffcultList.value = Object.values(DifficultyList)
    // questionTypes.value = Object.values(QuestionTypes)

    if ( props.id ) {
        // query mode from the router
        await getQuestion(props.id).then((res) => {
            data.value = Question.fromJson(res)
        })
        console.log(data.value)
    }
    else if (route.query?.clone) {
        await getQuestion(route.query.clone as string).then((res) => {
            data.value = Question.fromJson(res)
        })
    }
    else {
        data.value = Question.createMultipleChoiceTest()
    }
    
})



</script>


<style scoped>
.view-title {
    margin: 10px 10px 0 10px;
    /* margin-bottom: ; */
}

</style>
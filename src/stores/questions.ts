import { ref, watch } from "vue";

import Question from '@/classes/question';
import QuestionGroup from "@/classes/questionGroup";


import { defineStore } from "pinia";

import { getQuestions } from "@/api/question";

import { getQuestionGroups } from "@/api/questionGroup";
import useToastStore from "@/stores/toast";

const toastStore = useToastStore();

export const useQuestionStore = defineStore('question', () => {
    const questions = ref<Question[]>([]);
    const groups = ref<QuestionGroup[]>([]);
    const list = ref<Array<Question | QuestionGroup>>([]);
    const loading = ref(false);

    const fetchQuestions = async () => {
        await getQuestions().then((data) => {
            questions.value = data
            console.log('questions:', questions.value);
        }).catch((error) => {
            toastStore.addTimeout({
                message: 'Failed to fetch questions',
                type: 'error'
            })
        })
    }


    watch(() => [questions.value, groups.value], () => {
        // @ts-ignore
        list.value = questions.value.concat(groups.value);
        console.log('list:',list.value);
    }, { deep: true });

    return {
        list,
        questions,
        groups,
        loading,
        fetchQuestions
    };
});
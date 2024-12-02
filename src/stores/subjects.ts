import { ref } from "vue";

import { defineStore } from 'pinia';

import { getSubjects } from '@/api/subject';

import  Subject from '@/classes/subject';

export const useSubjectStore = defineStore('subject', () => {
    const subjects = ref<Subject[]>([]);
    const loading = ref(false);
    const error = ref(null);

    async function fetchSubjects() {
        loading.value = true;
        error.value = null;
        getSubjects().then((data) => {
            subjects.value = (data as Array<string>).map((item: any) => {
                return Subject.fromJson(item);
            });
            // console.log(subjects.value)
        }).catch((err) => {
            error.value = err;
        }).finally(() => {
            loading.value = false;
        });
    }

    return { subjects, loading, error, fetchSubjects };
})
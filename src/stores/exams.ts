import { defineStore } from "pinia";

import { ref } from "vue";
import Exam from "@/classes/exam";
import {getExams} from "@/api/exam";



export const useExamStore = defineStore('exam', () => {
    const exams = ref<Array<Exam>>([]);
    const printExam = ref<Exam | null>(null);

    const setPrintExam = (exam: Exam) => {
        printExam.value = exam;
    }

    const refresh = async () => {
        await getExams().then((data) => {
            exams.value = data;
        }).catch((error) => {
            console.log(error);
        })
    }


    return { exams, printExam, setPrintExam, refresh };
})
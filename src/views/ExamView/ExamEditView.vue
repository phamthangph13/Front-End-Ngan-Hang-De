<script setup lang="ts">
import ExamAddView from "@/views/ExamView/ExamAddView.vue";
import {onMounted, ref} from "vue";
import Exam from "@/classes/exam";
import {getExam} from "@/api/exam";

const { id } = defineProps<{
    id: string
}>();

const examData = ref<Exam>();

onMounted(async () => {
    await getExam(id).then((res) => {
        examData.value = res;
    })
})

</script>

<template>
    <ExamAddView mode="edit" v-model="examData"></ExamAddView>
<!--    <span></span>-->
</template>

<style scoped lang="scss">

</style>
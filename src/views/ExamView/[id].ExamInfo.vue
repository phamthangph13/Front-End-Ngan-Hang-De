<script setup lang="ts">


import {useRoute, useRouter} from "vue-router";
import Exam from "@/classes/exam";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {getExam} from "@/api/exam";

const BaseButton = defineAsyncComponent(() => import('@/components/bases/BaseButton.vue'))
const TagsNQuestion = defineAsyncComponent(() => import('@/components/TagsNQuestion.vue'))

const route = useRoute();
const router = useRouter();
const data = ref<Exam | null>(null);

onMounted(async () => {
    const id = route.params.id;
    console.log(id);
    await getExam(id).then((res) => {
        console.log(res);
        data.value = res;
    })
})

</script>

<template>
    <h2>Thông tin đề thi</h2>
    <div class="info">
        <div>Tiêu đề: {{ data?.title }}</div>
        <div>Thời gian: {{ data?.duration }} phút</div>
        <div>Số lượng câu hỏi: {{ data?.questions.length }}</div>
        <div>{{ $t('subject') }} : {{ data?.subject.name }}</div>
    </div>
    <ul class="list">
        <template v-for="item in data?.questions" :key="item?.id">
            <TagsNQuestion :item="item" class="item" elem="li">
            </TagsNQuestion>
        </template>
    </ul>
    <BaseButton @click="router.push({name: 'exam-print', params: { id: route.params.id}})">
        In đề
    </BaseButton>
</template>

<style scoped lang="scss">
h2 {
    margin: 0.5rem 0.5rem 1rem 0.5rem;
}

.info {
    margin: 0 0.5rem 1rem 0.5rem;
}

.list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 10px;

    .item {
        width: 100%;
    }
}
</style>
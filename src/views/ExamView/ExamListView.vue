<template>
    <HeadCrud v-model="listView" @add="() => {router.push({name: 'exam-add'})}" @refresh="refresh" obj_name="exam.title">
        <template #title>
            <h2>{{ $t('crud.list', {name: $t('exam.title')}) }}</h2>
        </template>
    </HeadCrud>
    <div class="list">
        <template v-for="item in examStore.exams ?? []" :key="item?.id">
            <TagsNExam :item="item" @click="router.push({name: 'exam-info', params: {
                id: item?.id
            }})" class="item"
            >
            </TagsNExam>
        </template>
    </div>
</template>


<script setup lang="ts">
import { ref, defineProps, onMounted, defineAsyncComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import {useExamStore} from "@/stores/exams";

const HeadCrud = defineAsyncComponent(() => import('@/components/HeadCrud.vue'))
const TagsNExam = defineAsyncComponent(() => import('@/components/TagsNExam.vue'))

const router = useRouter()
const listView = ref<'table' | 'list'>('list')

const examStore = useExamStore();

const refresh = async() => {
    await examStore.refresh()
}

onMounted(async () => {
    await refresh()
})

</script>

<style scoped lang="scss">
.list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 10px;

    .item {
        width: 100%;
        cursor: pointer;
    }
}
</style>
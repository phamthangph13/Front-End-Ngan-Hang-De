<template>
    <NewDialog model-screen="full-screen" ref="dialog" >
        <template #title>
            DEV
        </template>
        <template #body>
            <div>
                <BaseButton @click="addQuestionTest">Thêm Câu hỏi tạm thời</BaseButton> <br>
                <small>Không thể xem câu hỏi chi tiết</small>
            </div>
            <div>
                <BaseButton @click="bypassLogin">Bỏ qua Đăng nhập</BaseButton>
            </div>
<!--            <button popovertarget="foo">Toggle the popover</button>-->
<!--            <button popovertarget="foo" popovertargetaction="show">This button only shows the popover</button>-->
<!--            <button popovertarget="foo" popovertargetaction="hide">This button only hides the popover</button>-->
<!--            <div id="foo" popover="manual" style="z-index: 1000000">Popover content</div>-->
        </template>
        <template #show>
            <div></div>
        </template>
    </NewDialog>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NewDialog from './bases/BaseDialog.vue'
import { useQuestionStore } from '@/stores/questions'
import Question from '@/classes/question';
import Subject from '@/classes/subject';
import BaseButton from "@/components/bases/BaseButton.vue";
const questionStore = useQuestionStore()


const dialog = ref<InstanceType<typeof NewDialog> | null>(null);
const router = useRouter()

const addQuestionTest = () => {
    
    const q = new Question(
        'test',
        'check-box',
        10,
        new Subject('Toán', 'Toán học', 'Toán học', null),
        'easy',
        [],
        'Câu hỏi tạm thời',
        [],
        ''
    )

    questionStore.questions.push(q)
}

const bypassLogin = () => {
    sessionStorage.setItem('token', 'test')
    window.location.href = '/'
    
}

onMounted(() => {
    // shift + F12
    window.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.code === 'F12') {
            dialog.value?.toggle()
        }
    })
})

</script>



<style scoped lang="scss"></style>
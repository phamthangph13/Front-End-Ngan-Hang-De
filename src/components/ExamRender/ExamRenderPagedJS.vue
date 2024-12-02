<template>
    <!-- Add a examcode css var for adding examcode to footer -->
    <div class="base" >
        <div class="exam">

            <div class="html" ref="examRef" :hidden="render_mode !== 'html'">
    
                <div class="exam-title">
                    <div class="exam-info">
                        <div class="col1">
                            <p class="host">{{ exam?.schoolName ?? 'Trường Đa Cấp ABC' }}</p>
                            <p class="exam-type">
                                {{ exam?.isOfficial ? 'Đề chính thức' : 'Đề thi thử' }}
                            </p>
                            <p class="pagenum">
                                (Đề thi có <span></span> trang)
                            </p>
                        </div>
                        <div class="col2">
                            <div>
                                <p>
                                    {{ exam?.title }}
                                </p>
                                <p>
                                    Môn: {{ exam?.subject?.name }}
                                </p>
                                <p>
                                    Thời gian: {{ exam?.duration }} phút
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="exam-info-2">
                        <div class="col1">
                            <div class="student-info">
                                <ul>
                                    <li>
                                        <span>
                                            Họ và tên thí sinh:
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            Số báo danh:
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col2">
                            <div class="examcode" v-if="exam?.code">
                                {{ examStyle.exam_code }}
                            </div>
                        </div>
                    </div>
                </div>
    
                <template v-if="exam_mode === 'exam'">
                
                    <div class="exam-body" ref="questionsRef">
                        <template v-for="(obj, index) in exam?.questions" :key="index">
                            <template v-if="(obj instanceof Question)">
                                <component :is="QuestionComponents[obj.type]" :data="obj" class="question" />
                            </template>
<!--                            <template v-else>-->
<!--                                <div class="title" v-html="obj.source"></div>-->
<!--                                <template v-for="question in obj.questions">-->
<!--                                    <component :is="QuestionComponents[question.type]" :data="question" class="question"/>-->
<!--                                </template>-->
<!--                            </template>-->
                        </template>
                    </div>
                    <div class="exam-end">
                        <p>
                            ----------------------- HẾT -----------------------
                        </p>
                    </div>
                </template>
    
    
    
                <template v-if="exam_mode === 'answer'">
                    <div class="exam_answer ">
                        <template v-for="(question, index) in exam.questions">
                            <p class="answer">{{ index + 1 }}.
                                <template v-for="(answer, i) in question.answers" v-if="answer && answer.isCorrect">
                                    <span v-html="answer.content"></span>
                                </template>
                            </p>
                        </template>
                    </div>
                </template>
    
            </div>
            <div class="pagedjs" ref="outputRef" :hidden="render_mode !== 'pagedjs'"></div>

        </div>
    </div>
</template>


<script setup lang="ts">
import Exam from '@/classes/exam';
import Question from '@/classes/question';
import QuestionGroup from '@/classes/questionGroup';
import type { PropType } from 'vue';

import lodash from 'lodash';

import { ref, defineProps, onMounted, nextTick, watch, defineExpose, defineAsyncComponent, computed } from 'vue';
// @ts-ignore
import { Previewer } from 'pagedjs';

export type RenderMode = 'html' | 'pagedjs';
export type ExamMode = 'exam' | 'answer';

const QuestionComponents = {
    'multiple-choice': defineAsyncComponent(() => import('@/components/ExamRender/MultipleChoice.vue')),
    'essay': defineAsyncComponent(() => import('@/components/ExamRender/LongAnswer.vue')),
    'short-answer': defineAsyncComponent(() => import('@/components/ExamRender/ShortAnswer.vue')),
    'check-box': defineAsyncComponent(() => import('@/components/ExamRender/CheckBox.vue'))
}




const props = defineProps({
    render_mode: {
        type: String as PropType<RenderMode>,
        default: 'pagedjs'
    },
    exam_mode: {
        type: String as PropType<ExamMode>,
        default: 'exam'
    },
    exam: {
        type: Exam,
        required: true
    }
});


const examRef = ref<HTMLElement>();
const outputRef = ref<HTMLElement>();
const previewer = ref<any>();

const questionsRef = ref<HTMLElement>();

const examStyle = ref<{exam_code : string | null, exam_page_bottom_right: string | null }>({
    exam_code: '',
    exam_page_bottom_right: '\"\"'
});

const renderExam = () => {
    // examStyle.value.exam_code = props.exam.exam_code ? `Mã đề thi: ${props.exam.exam_code}` : ' '
    // examStyle.value.exam_page_bottom_right = props.exam.exam_code ? `Mã đề thi: ${props.exam.exam_code}` : ' '
    let counter = 1;
    questionsRef.value?.querySelectorAll('.question').forEach((value, key, parent) => {
        // add --question-num: 'Câu ${counter}. '` to css
        // @ts-ignore
        value.style.setProperty('--question-num', `\"Câu ${counter}. \"`);
        counter++;
    });


    if (props.exam?.code?.length) {
        examStyle.value.exam_code = `Mã đề thi: ${props.exam.code}`;
        examStyle.value.exam_page_bottom_right = `\"- Mã đề thi: ${props.exam.code}\"`;
    }
    else {
        examStyle.value.exam_code = '';
        examStyle.value.exam_page_bottom_right = '\"\"';
    }

    // console.log(examStyle.value, props.exam?.code)

    nextTick(() => {

        // if previewer is already created, destroy it
        if (previewer.value) {
            previewer.value.chunker.destroy();
        }

        if (props.render_mode === 'html') {
            return;
        }

        // create new previewer
        previewer.value = new Previewer();

        // initialize handlers
        previewer.value.preview(examRef.value?.innerHTML, ["/exam.css"], outputRef.value).then(() => {
            // window.print();
        });
    });
}

const renderExamDelay = lodash.debounce(renderExam, 100);

watch(() => props, () => {
    renderExamDelay();
}, { deep: true });

onMounted(() => {
    nextTick(() => {
        renderExamDelay();
    });
});


</script>

<style lang="scss">
// @import url('../assets/exam.scss');

// // @media screen, pagedjs-ignore {
// //     .pagedjs_pages {
// //         display: flex;
// //         align-items: center;
// //         flex-direction: column;
// //         background: lightgray;
// //     }

// //     .pagedjs_page {
// //         margin-bottom: 5mm;
// //         border: 1px solid black;
// //         background: white;
// //     }
// // }

// // @page {
// //     // adjust as needed
// //     // margin: 2cm 2cm 2cm 2.5cm;

// //     size: A4;
// //     // bleed: 6mm;

// //     @bottom-right {
// //         // --test : "Trang " counter(page) "/" counter(pages);
// //         // content: "Trang " counter(page) "/" counter(pages);
// //         content: "Trang " counter(page) "/" counter(pages) var(--exam-code);
// //     }
// // }

</style>

<style>

</style>

<style scoped lang="scss">
.base {
    --exam-code: v-bind(examStyle.exam_page_bottom_right);
    height: max-content;
    width: 100%;
    // zoom: (100vh / 100);
    font-family: 'Times New Roman', Times, serif;
}

.html {
    // margin: 20px;
    padding: 20px;
    background: white;
}



// .html {}
</style>

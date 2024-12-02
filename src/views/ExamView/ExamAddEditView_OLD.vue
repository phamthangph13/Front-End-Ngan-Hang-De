<template>
    <div class="view">
        <h2>Thêm đề thi</h2>
        <div class="tabs">
            <div class="tab config" v-show="progress === 0">
                <h3>{{ progress + 1 }}. Cài đặt</h3>
                <fieldset>
                    <div class="body">
                        <!-- <div class="field">
                            <label for="title">Trường</label>
                            <input type="text" id="title" v-model="data.schoolName" class="ipt">
                        </div> -->
                        <div class="field">
                            <label for="title">Tiêu đề</label>
                            <input type="text" id="title" v-model="data.title" class="ipt">
                        </div>
                        <div class="field">
                            <label for="title">Thời lượng </label>
                            <!-- <input type="range" id="title" v-model="data.duration" class="ipt" min="10" max="120"> -->
                            <select name="" id="" v-model="data.duration">
                                <option :value="i * 15 " v-for="i in 8">
                                    {{ i * 15 }}
                                </option>
                            </select>
                        </div>
                        <div class="field">
                            <label>{{ $t('subject') }}</label>
                            <select name="" id="" v-model="data.subject" class="ipt">
                                <option v-for="subject in subjectStore.subjects" :value="subject">{{
                                        subject.name
                                    }}
                                </option>
                            </select>
                        </div>
                        <div class="field">
                            <label>Đề chính thức</label>
                            <input type="checkbox" name="" id="" v-model="data.isOfficial">
                        </div>
                        <div class="field">
                            <label>Mã đề</label>
                            <input type="text" name="" id="" v-model="data.code">
                        </div>
                        <div class="field">
                            <label>
                                Phạm vi kiến thức
                            </label>
                            <TagIpt v-model="data.knowledgeScope" class="tagIpt"/>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="tab add-question" v-show="progress === 1">
                <h3>{{ progress + 1 }}. Thêm câu hỏi vào đề </h3>
                <small>* Bạn phải thêm câu hỏi từ ngân hàng đề trước sau đó với thêm vào đề</small>
                <!-- bank / exam -->
                <div class="body">
                    <QuestionList v-model="qBank" class="question-list" v-draggable="[
                        // @ts-ignore
                        qBank,
                        {
                            animation: 150,
                            group: { name: 'question', pull: 'clone', put: false },
                            sort: false,
                            // onClone: (e) => {
                            //     console.log(e)
                            // },
                            clone: (element: Record<any, string>) => {
                                console.log(element)
                                return element
                            }
                        }
                    ]">
                        <template #foot-single="{item}">
                            <button @click="() => {
                                data.questions?.push(item)
                            }">Thêm
                            </button>
                        </template>
                        <template #foot-group="{item}">
                            <button @click="() => {
                                data.questions?.push(item)
                            }">Thêm
                            </button>
                        </template>

                    </QuestionList>
                    <QuestionList v-model="data.questions" class="question-list" group="question" v-draggable="[
                        // @ts-ignore
                        data.questions,
                        {
                            animation: 150,
                            group: 'question',
                            // sort: false,
                        }
                    ]">
                        <!-- <template #foot-single="{item}">
                            <button @click="() => {
                                data.questions?.splice(data.questions?.findIndex(x => x === item), 1)
                            }">Xóa</button>
                        </template>
                        <template #foot-group="{item}">
                            <button @click="() => {
                                data.questions?.splice(data.questions?.findIndex(x => x === item), 1)
                            }">Xóa</button>
                        </template> -->
                    </QuestionList>
                </div>
            </div>
            <div class="tab exam-preview" v-show="progress === 2">
                <h3>{{ progress + 1 }}. Xem trước đề thi</h3>
                <div class="body">
                    <RouterLink to="/exam/print-preview">Xem trước</RouterLink>
                    <div>
                        <!-- {{ data }} -->
                        <ul>
                            <li>Tiêu đề: {{ data.title }}</li>
                            <li>Môn: {{ subjectStore.subjects.find(x => x === data.subject)?.name }}</li>
                            <li>Thời lượng: {{ data.duration }}</li>
                            <li>Số lượng câu hỏi: {{ data.questions?.length }}</li>
                            <li>Phạm vi kiến thức:
                                <template v-for="(item, index) in data.knowledgeScope">
                                    {{ item }}{{ index < data.knowledgeScope.length - 1 ? ', ' : '' }}
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div class="questions">
                        <!-- <QuestionList :value="data.questions" class="question-list">
                        </QuestionList> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- <code>{{ data }}</code> -->
        <div class="actions">
            <button @click="progress -= 1" :disabled="progress <= 0">Quay lại</button>
            <button @click="progress += 1" :disabled="progress >= 2">Tiếp tục</button>
            <button @click="save" :disabled="progress !== 2">Lưu</button>
            <button @click="router.go(-1)">Hủy</button>
            <!--            <button class="dev">-->
            <!--                data-->
            <!--                <code>{{ data }}</code>-->
            <!--            </button>-->
        </div>

    </div>
</template>


<script setup lang="ts">
import {ref, defineProps, onMounted, defineAsyncComponent, watch, type PropType, nextTick} from 'vue';

import QuestionGroup from '@/classes/questionGroup';
import Question from '@/classes/question';
import Exam from '@/classes/exam';

import {useRouter} from 'vue-router';

import {useSubjectStore} from '@/stores/subjects';
import {useQuestionStore} from '@/stores/questions';
import {useExamStore} from '@/stores/exams';

// import { VueDraggable as draggable  } from 'vue-draggable-plus'
import {vDraggable} from 'vue-draggable-plus'
import {addExam} from "@/api/exam";
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { } from '@fortawesome/free-solid-svg-icons';

const router = useRouter()
const subjectStore = useSubjectStore()
const questionStore = useQuestionStore()
const qBank = ref<Question[]>([])

const TagIpt = defineAsyncComponent(() => import('@/components/bases/BaseTagIpt.vue'))
const QuestionList = defineAsyncComponent(() => import('@/components/QuestionList.vue'))

const data = ref<Exam>(new Exam(
    '',
    '',
    90,
    null,
    [],
    false,
    [],
    null,
    null,
))

// const q = ref([])


const progress = ref(0)

onMounted(async () => {

    refresh()
    // diffcultList.value = Object.values(DifficultyList)
    // convert QuestionTypeList to array
    // questionTypes.value = Object.values(QuestionTypeList)

    // if (questionId.value) {
    //     data.value = await getQuestion(questionId.value) as Question
    //     // console.log(data.value)
    // }
})

const refresh = async () => {
    await questionStore.fetchQuestions()
    await subjectStore.fetchSubjects()
}

// const deleteQuestion = (index: number) => {
//     data.value.questions?.splice(index, 1)
// }

const addQuestion = (q: Question | QuestionGroup) => {
    data.value.questions?.push(q)
}

const save = () => {
    addExam(data.value).then(() => {
            router.push({
                name: 'exam-list'
            })
        }
    );

}

watch(() => data.value.subject, async (newValue) => {

    await questionStore.fetchQuestions();
    while (qBank.value.length > 0) {
        qBank.value.pop();
    }
    while (data.value.questions?.length > 0) {
        data.value.questions.pop();
    }
    questionStore.questions.filter(x => x.subject?.id === newValue.id).map(x => qBank.value.push(x));
    console.log(qBank.value, questionStore.questions)
}, {deep: true})

watch(() => data.value.questions, async (newValue, oldValue) => {
}, {deep: true})

</script>


<style scoped lang="scss">
.view {
    --border: 1px solid #ccc;
    --hgroupl: 5px solid #333;
    font-family: Arial, sans-serif;
    padding: 10px;
    // position: relative;
    height: calc(100% - 20px);
    display: grid;
    grid-template-rows: auto 1fr auto;

    h2,
    h3 {
        margin: 0;
        padding: 0 10px 10px 10px;
    }

    .tabs {
        overflow: hidden;
        height: 100%;
        // flex: 1;

        .tab {
            height: 100%;
            overflow: hidden;
            border-bottom: #333 5px solid;
        }
    }

    .config {
        fieldset {
            padding: 10px;
            border: none;
            // margin: 10px;

            .body {

                // display: grid;
                // grid-template-columns: auto 1fr;
                .field {
                    margin: 10px 0;
                    display: flex;

                    label {
                        width: 200px;
                    }

                    .ipt {
                        flex: 1;
                    }
                }


            }
        }
    }

    .add-question {
        // overflow: hidden;
        display: flex;
        flex-direction: column;

        .body {

            // display: flex;
            flex: 1;
            // height: 100%;
            overflow: hidden;
            display: grid;
            grid-template-columns: 1fr 1fr;
            // grid-template-rows: 1fr;

            .question-list {
                column-count: unset;
                overflow-y: auto;
                // flex: 1;
                border: var(--border);
                padding: 10px;
                height: calc(100% - 20px);
                scroll-behavior: smooth;
                scrollbar-width: thin;
            }
        }
    }

    .exam-preview {
        display: flex;
        flex-direction: column;

        .body {
            flex: 1;
            overflow: auto;
            scroll-behavior: smooth;
            scrollbar-width: thin;
        }
    }

    .actions {
        margin-bottom: auto;

        button {
            margin-right: 10px;
        }
    }
}


.drag {
    opacity: 0;
}

.dev {
    position: relative;
    display: inline-flex;

    code {
        display: none;
        position: absolute;
        bottom: 20px;
        left: 0;
        flex: 1;
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 5px;
        text-align: left;
        width: auto;
        /* auto resize */
        // max-width: 500px; /* prevent it from becoming too wide */
        min-height: 300px;
        max-height: 600px;
        min-width: 600px;
        overflow: auto;
    }

    &:hover {
        code {
            display: block;
        }
    }
}

</style>
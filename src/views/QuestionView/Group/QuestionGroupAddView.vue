<template>
<!--    region old version-->
<!--    <div class="view">-->
<!--        <h2>Thêm nhóm câu hỏi</h2>-->
<!--        <div class="tabs" :data-progress="progress">-->
<!--            <div class="tab config" v-show="progress === 0">-->
<!--                <h3>Cấu hình</h3>-->
<!--                <div class="field">-->
<!--                    <label for="">Lớp</label>-->
<!--                    <select v-model="data.class" class="ipt">-->
<!--                        <template v-for="i in 12" :key="i">-->
<!--                            <option :value="i">{{ i }}</option>-->
<!--                        </template>-->
<!--                    </select>-->
<!--                </div>-->
<!--                <div class="field">-->
<!--                    <label for="">Môn học</label>-->
<!--                    <select v-model="data.subject" class="ipt">-->
<!--                        <template v-for="(s, i) in subjectStore.subjects" :key="i">-->
<!--                            <option :value="s">{{ s.name }}</option>-->
<!--                        </template>-->
<!--                    </select>-->
<!--                </div>-->
<!--                <div class="field">-->
<!--                    <label for="">Phạm vi kiến thức</label>-->
<!--                    <TagIpt class="ipt" v-model="data.knowledgeScope"></TagIpt>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="tab doc" v-show="progress === 1">-->
<!--                <h3>Thêm Tài liệu</h3>-->
<!--                <NewMdEditor v-model="data.title" />-->
<!--            </div>-->
<!--            <div class="tab questions" v-show="progress === 2">-->
<!--                <h3>Thêm Câu hỏi vào nhóm</h3>-->
<!--                <div class="body">-->
<!--                    <div class="doc" v-html="data.title"></div>-->
<!--                    <div class="editor">-->
<!--                        <button @click="addQuestionToGroup">Thêm</button>-->
<!--                        <span> Số lượng câu hỏi: {{ data.questions.length }}</span>-->
<!--                        <QuestionEditor v-model="questionTemplate" />-->
<!--                    </div>-->
<!--                    <div class="list">-->
<!--                        <template v-for="(question, i) in data.questions" :key="i">-->
<!--                            <div class="question">-->
<!--                                <div class="title" v-html="question.title" :style="{ '&#45;&#45;text': `'Câu ${i + 1}: '` }">-->
<!--                                </div>-->
<!--                                <ol style="list-style: upper-alpha;">-->
<!--                                    <li v-for="(answer, j) in question.answers" :key="j" v-html="answer.content"></li>-->
<!--                                </ol>-->
<!--                                <button @click="() => { data.questions.splice(i, 1); }">Xóa</button>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="tab preview" v-show="progress === 3">-->
<!--                <h3>Xem lại</h3>-->
<!--                <div class="body">-->
<!--                    <div v-html="data.title"></div>-->
<!--                    <template v-for="(q, i) in data.questions" :key="i">-->

<!--                        <div class="question">-->
<!--                            <div class="title" v-html="q.title" :style="{ '&#45;&#45;text': `'Câu ${i + 1}: '` }"></div>-->
<!--                            <ol style="list-style: upper-alpha;">-->
<!--                                <li v-for="(answer, j) in q.answers" :key="j" v-html="answer.content"></li>-->
<!--                            </ol>-->
<!--                        </div>-->

<!--                    </template>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="btn">-->
<!--            <button @click="progress -= 1" :disabled="progress <= 0">Quay lại</button>-->
<!--            <button @click="progress += 1" :disabled="progress >= 3">Tiếp tục</button>-->
<!--            <button @click="saveGroup" :disabled="progress != 3">Lưu</button>-->
<!--            <button class="dev">-->
<!--                data-->
<!--                <code>{{ data }}</code>-->
<!--            </button>-->
<!--        </div>-->
<!--    </div>-->
<!--    endregion oldv-->
    <h2>Thêm nhóm câu hỏi</h2>
    <fieldset>
        <legend>Cấu hình</legend>
        <div class="field">
            <label for="">Môn học</label>
            <select v-model="data.subject" class="ipt">
                <template v-for="(s, i) in subjectStore.subjects" :key="i">
                    <option :value="s">{{ s.name }}</option>
                </template>
            </select>
        </div>
        <div class="field">
            <label for="">Phạm vi kiến thức</label>
            <TagIpt class="ipt" v-model="data.knowledgeScope"></TagIpt>
        </div>
    </fieldset>
    <fieldset>
        <legend>Thêm Tài liệu</legend>
        <NewMdEditor v-model="data.source" />
    </fieldset>
    <fieldset>
        <legend>Phương pháp</legend>
        <NewMdEditor v-model="data.method" />
    </fieldset>
    <BaseButton @click="saveGroup">Lưu</BaseButton>

</template>


<script setup lang="ts">
import { ref, defineProps, onMounted, defineAsyncComponent, type PropType } from 'vue';
import { useSubjectStore } from '@/stores/subjects';
import { addQuestionGroup } from '@/api/questionGroup';
import Question from '@/classes/question';
import QuestionGroup from '@/classes/questionGroup';
import {useRouter} from "vue-router";

const QuestionEditor = defineAsyncComponent(() => import('@/components/QuestionEditor.vue'));
const NewMdEditor = defineAsyncComponent(() => import('@/components/bases/BaseMdEditor.vue'));
const TagIpt = defineAsyncComponent(() => import('@/components/bases/BaseTagIpt.vue'));
const BaseButton = defineAsyncComponent(() => import('@/components/bases/BaseButton.vue'));

// import { type QuestionGroup, Question, Answer } from '@/types/exam';
// import BaseButton from "@/components/bases/BaseButton.vue";

const subjectStore = useSubjectStore();
const router = useRouter();


const data = ref<QuestionGroup>(QuestionGroup.create());

const progress = ref(0);

// const questionTemplate = ref<Question>(Question.createMultipleChoiceTest());
// questionTemplate.value.class = data.value.class;
// questionTemplate.value.subject = data.value.subject;

// const addQuestionToGroup = () => {
//     data.value.questions.push(questionTemplate.value);
//     questionTemplate.value.createdAt = new Date();
//     questionTemplate.value = Question.createMultipleChoiceTest();
//     // questionTemplate.value.class = data.value.class;
//     // questionTemplate.value.subject = data.value.subject;
// }

const saveGroup = () => {
    addQuestionGroup(data.value).then((res) => {
        console.log(res);
        router.push({
            name: 'question-list',
        });
    })
}

onMounted(() => {
    subjectStore.fetchSubjects();
})

</script>

<style>
div.view {
    overflow: hidden;
}
</style>

<style lang="scss" scoped>
// region old
.view {
    padding: 20px;
    // width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .tabs {
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;

        .tab {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            // margin-right: 10px;
            // height: 100%;
            overflow: hidden;
            flex: 1;
            // width: calc(100% - 20px);


            &.questions {
                // height: calc(100% - 40px);
                // overflow-y: auto;
                flex: 1;
                display: flex;
                flex-direction: column;

                .body {
                    display: grid;
                    flex: 1;
                    grid-template-areas:
                        "doc questions"
                        "editor questions";
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr 2fr;
                    overflow: hidden;

                    >div {
                        scrollbar-width: thin;
                        overflow: auto;
                    }

                    .doc {
                        grid-area: doc;
                        // border: 1px solid #ccc;
                        padding: 10px;
                        // border-radius: 5px;

                    }

                    .editor {
                        grid-area: editor;
                        // border: 1px solid #ccc;
                        // padding: 10px;
                        // border-radius: 5px;
                    }

                    .list {
                        grid-area: questions;
                        border: 1px solid #ccc;
                        padding: 10px;
                        // border-radius: 5px;
                        margin-left: 1em;


                        .question {
                            border: 1px solid #ccc;
                            padding: 10px;
                        }

                    }
                }



            }

            &.preview {
                overflow: hidden;
                display: flex;
                flex-direction: column;

                .body {
                    overflow: auto;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    scrollbar-width: thin;

                }
            }
        }
    }
}

.question {
    // border: 1px solid #ccc;
    // padding: 10px;
    // margin-bottom: 10px;

    .title> ::before {
        content: var(--text);
        font-weight: bold;
    }

    .title:not(:has(*))::before {
        content: var(--text);
        font-weight: bold;
    }

    ol {
        list-style: upper-alpha;
        margin: 10px;
    }
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    margin-bottom: 10px;
}

.btn {
    margin-top: 0.5rem;

    button {
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f0f0f0;
        cursor: pointer;
        margin-right: 10px;
    }
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

.field {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    label {
        width: 200px;

    }

    .ipt {
        flex: 1
    }
}


@media screen and (max-width: 1000px) {
    .view {

        .tabs {

            .tab {


                &.questions {
                    overflow: auto;

                    .body {
                        overflow: auto;
                        display: flex;
                        flex-direction: column;
                        scrollbar-width: thin;

                        >div {
                            scrollbar-width: thin;
                            overflow: visible;
                        }
                        
                        .list {
                            border: none;
                            margin: 0;
                        }
                    }

                }
            }
        }
    }

}

// endregion old

fieldset {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    max-width: 100%;
    overflow: hidden;

    legend {
        font-weight: bold;
    }
}

</style>
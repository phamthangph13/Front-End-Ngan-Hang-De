<template>
    <div class="question-editor" ref="editorRef">
        <div class="question-title" v-if="showTitle">
            <div  @click="moveEditor('title')">
                <div class="text" v-html="renderKatex(data.title)" v-show="activeField !== 'title'"></div>
            </div>
<!--            <div class="func">-->
<!--                <div class="btn_custom" @click="isDebug = !isDebug">-->
<!--                    <font-awesome-icon :icon="faCode" />-->
<!--                </div>-->
<!--            </div>-->
            <NewMdEditor class="editor" v-model="data.title" v-show="activeField === 'title'">
            </NewMdEditor>
        </div>
        <div class="question-body">
            <ul v-if="_type === 'multiple-choice' || _type === 'check-box'">

                <VueDraggable v-model="data.answers" :animation="150" ghostClass="ghost" dragClass="drag" @move="() => {moveEditor(null)}" :disabled="false" handle=".drag-obj">

                    <TransitionGroup name="list">
                        <template v-for="(item, index) in data.answers" :key="index">
                            <li>
                                <div class="answer">
                                    <div class="drag-obj">
                                        <!-- <font-awesome-icon :icon="faBars" /> -->
                                    </div>


                                    <div class="radio">
                                        <input type="radio" v-if="_type === 'multiple-choice'"  :checked="item.isCorrect" @change="changeRadio(index)">
                                        <input type="checkbox" v-if="_type === 'check-box'"  :checked="item.isCorrect" @change="changeCheckbox($event, index)">
                                    </div>
                                    <div @click="moveEditor(index.toString())" class="text">
                                        <div  v-html="renderKatex(item.content)" v-show="activeField !== index.toString()"></div>
                                    </div>
                                    <div class="remove">
                                        <FontAwesomeIcon :icon="faXmark" @click="data.answers.splice(index, 1)" />
                                    </div>
                                    <NewMdEditor
                                        class="editor"
                                        v-model="item.content"
                                        v-show="activeField === index.toString()"
                                    >
                                    </NewMdEditor>
                                </div>
                            </li>

                        </template>
                    </TransitionGroup>
                </VueDraggable>

                <li class="answer add-new" @click="addNewAnswer">
                    <font-awesome-icon :icon="faAdd" />
                    <span>{{ $t('crud.add') }} {{ $t('question.answer').toLowerCase() }}</span>
                </li>

            </ul>

            <template v-if="_type === 'essay' || _type === 'short-answer'">
                <div class="answer single">
                    <div @click="moveEditor('0')" class="text" >
                        <td  v-html="data.answers[0].content"  v-show="activeField !== '0'"></td>
                    </div>
                    <NewMdEditor  class="editor" v-model="data.answers[0].content" v-if="activeField === '0'">
                    </NewMdEditor>
                </div>

            </template>

        </div>

    </div>

<!--        <div v-if="isDebug">-->
<!--            <button @click="addQuestionDev">Add Question To LocalStorage</button>-->
<!--            <div><code style="word-wrap: break-word;">{{ data }} </code></div>-->
<!--        </div>-->


</template>

<script setup lang="ts">
// vue3
import { ref, watch, defineAsyncComponent, onMounted, defineProps, defineEmits, defineModel } from 'vue';
import type { PropType } from 'vue';
// draggable
import { VueDraggable, type DraggableEvent, type UseDraggableReturn, } from 'vue-draggable-plus'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCode, faAdd, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
// types
import Question, { QuestionType } from '@/classes/question';
// katex
import { renderKatex } from '@/utils/text';
// editor
const NewMdEditor = defineAsyncComponent(() => import('@/components/bases/BaseMdEditor.vue'))

const props = defineProps({
    showTitle: {
        type: Boolean,
        default: true
    }
})

const data = defineModel({
        type: Object as PropType<Question>,
        default: () => (Question.createMultipleChoiceTest())
})

const isDebug = ref(false)
const activeField = ref<string | null>('')

const _type = ref<QuestionType>(data.value.type)
const editorRef = ref<HTMLElement | null>(null)

const emits = defineEmits(['update:data'])

const moveEditor = (field: string | null) => {
	console.log('moveEditor', field)

    if (field === activeField.value) {
        activeField.value = null
        return
    }
    activeField.value = field
}

const addNewAnswer = () => {
    data.value.answers.push({ content: '', isCorrect: false })
}

const changeRadio = (index: number) => {
    data.value.answers.forEach((item, i) => {
        if (i === index) {
            item.isCorrect = true
        } else {
            item.isCorrect = false
        }
    })
}

const changeCheckbox = (event: Event, index: number) => {
    const target = event.target as HTMLInputElement
    data.value.answers[index].isCorrect = target.checked
}

const addQuestionDev = () => {
    //  get the questions from local storage
    const questions: Array<Question> = JSON.parse(localStorage.getItem('questions') ?? '[]') || []
    // add the new question to the array
    questions.push(data.value)
    // save the questions back to local storage
    localStorage.setItem('questions', JSON.stringify(questions))
}


watch(() => data.value.type, (newvalue) => {
    if (newvalue === 'essay') {
        data.value.answers = [{ content: 'Đáp án', isCorrect: true }]
        _type.value = 'essay'
    }
    _type.value = newvalue
    if (newvalue === 'multiple-choice') {
        // if (_type.value === 'multiple-choice') return

        

        // question.value.answers.map((item, index) => {
        //     item.isCorrect = false
        // })
    }
}, { deep: true })



</script>


<style>
:root {
    --question-editor-border: 1px solid #ccc;
    --question-editor-font-family: 'Arial', sans-serif;
}

</style>

<style scoped lang="scss">
.question-editor {
    border: var(--question-editor-border);
    border-radius: 0.25rem;
    // margin: 10px;
    padding: 10px;
    max-width: 100%;
    font-family: var(--question-editor-font-family);

    .question-title {
        font-weight: bold;
        // margin-bottom: 10px;
        width: 100%;
        cursor: text;
        word-wrap: break-word;
        display: grid;
        grid-template-columns: 1fr 35px 10px;
        grid-template-areas: 
        "text func " 
        "editor editor";

        .text {
            grid-area: text;
        }

        .actions {

            grid-area: func;
            // display: flex;
            // justify-content: end;
            // align-items: center;
            align-self: center;
            justify-self: end;


            .btn_custom {
                font-weight: lighter;
                cursor: pointer;
                border-radius: 5px;
                border: var(--question-editor-border);
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;

                height: 30px;
            }
        }

        .editor {
            grid-area: editor;
        }
    }

    .question-body {
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .answer {
            // margin-bottom: 5px;
            margin-top: 10px;
            border: 1px;
            border: var(--question-editor-border);
            border-radius: 5px;
            padding: 0 10px;
            cursor: pointer;
            display: grid;
            grid-template-columns: auto auto 1fr auto;
            grid-template-areas:
                "drag input text remove"
                "editor editor editor editor"
            ;
            min-height: 40px;
        
            &.single {

                &:has(.editor) {
                    padding-top: 20px;
                }
            }

            &.add-new {
                border-style: dashed;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 20px;
                // color: #ccc;
                // height: 40px;

                span {
                    margin-left: 10px;
                }
            }

            .radio {
                padding: 10px 0;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;

                input {
                    margin: 0px;
                }
            }

            .drag-obj {
                grid-area: drag;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: grab;
                width: 30px;

                svg {
                    width: 20px;
                    height: 20px;
                }
            }



            .remove {
                grid-area: remove;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                width: 30px;

                svg {
                    width: 20px;
                    height: 20px;
                }
            }

            .editor {
                // margin: 10px 0;
                grid-area: editor;
                padding-bottom: 10px;
            }

            .text {
                grid-area: text;
                // pointer-events: all;
            }

        }


    }

    .text {
        padding: 10px;
        // margin-left: 10px;
        cursor: pointer;
        display: inline-block;
        max-width: calc(100% - 20px);
        user-select: none;
        /* Chặn chọn văn bản */
        -webkit-user-select: none;
        /* Chặn chọn văn bản trên Chrome/Safari */
        -moz-user-select: none;
        /* Chặn chọn văn bản trên Firefox */
        -ms-user-select: none;
        /* Chặn chọn văn bản trên Internet Explorer/Edge */
        -o-user-select: none;
        /* Chặn chọn văn bản trên Opera */
        word-wrap: break-word;
        white-space: pre-line;

        &:deep(p) {
            margin: 5px 0 0 0;
            word-wrap: break-word;
            max-width: 100%;

            &:first-child {
                margin-top: 0;
                display: inline-block;
            }
        }
    }

    .editor {
        height: 200px;
        font-family: var(--question-editor-font-family);
        font-weight: lighter;
    }
}

// .question-editor.dark {
//     --question-editor-border: 1px solid #474747;
//     background-color: #333;
//     color: #fff;
// }

.ghost {
    opacity: 1;
    background: gray;
    //   border-width: 2px !important;
    //   transform: rotate(1deg) !important;
    cursor: all-scroll;
    .answer {
        background-color: white;
        // border: 1px dashed #ccc;
        animation: shake 0.5s infinite linear;
        // transform:translateX(10px);

    }
}

.drag {
    opacity: 0;
}


// @keyframes shake {
//     0% {
//         transform: rotate(0deg);
//     }
//     25% {
//         transform: rotate(0.5deg);
//     }
//     50% {
//         transform: rotate(0deg);
//     }
//     75% {
//         transform: rotate(-0.5deg);
//     }
//     100% {
//         transform: rotate(0deg);
//     }
    
// }

.list-enter-active, .list-leave-active {
    transition: all 0.5s ease;
}

</style>
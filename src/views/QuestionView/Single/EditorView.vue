<template>
    <div class="question-editor-container">
        <fieldset class="setting-card">
            <legend class="setting-title">{{ $t('setting.title', { name: $t('question.title')}) }}</legend>
            <div class="setting-body">
                <div class="setting-group">
                    <BaseFormSelect 
                        class="form-select" 
                        :label="$t('question.type.title')" 
                        :list="questionTypes" 
                        v-model="questionData.type"
                        animation="slide-fade"
                    >
                        <template #default="{value}">
                            {{ $t(`question.type.${value}`) }}
                        </template>
                        <template #item="{item}">
                            {{ $t(`question.type.${item}`) }}
                        </template>
                    </BaseFormSelect>  
                    <BaseFormSelect 
                        class="form-select" 
                        :label="$t('difficulty.title')" 
                        :list="diffcultList" 
                        v-model="questionData.difficulty"
                        animation="slide-fade"
                    >
                        <template #default="{value}">
                            {{ $t(`difficulty.${value}`) }}
                        </template>
                        <template #item="{item}">
                            {{ $t(`difficulty.${item}`) }}
                        </template>
                    </BaseFormSelect>    
                    <BaseFormSelect 
                        class="form-select" 
                        :label="$t('class')" 
                        :list="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" 
                        v-model="questionData.class"
                        animation="slide-fade" 
                    />
                    <BaseFormSelect 
                        class="form-select" 
                        :label="$t('subject')" 
                        :list="subjectsStore.subjects" 
                        v-model="questionData.subject"
                        animation="slide-fade"
                    >
                        <template #default="{value}">
                            {{ value?.name }}
                        </template>
                        <template #item="{item}">
                            {{ item?.name }}
                        </template>
                    </BaseFormSelect>
                </div>
                <div class="field tag-field">
                    <label class="tag-label">
                        {{ $t('tag')}}
                    </label>
                    <TagIpt v-model="questionData.knowledgeScope" class="tagIpt" />
                </div>
            </div>
        </fieldset>

        <Transition name="fade" mode="out-in">
            <QuestionEditor 
                v-model="questionData" 
                ref="editor" 
                class="question-editor" 
            />
        </Transition>

        <div class="preview-container">
            <h3 class="preview-title">Preview</h3>
            <Transition name="slide-fade" mode="out-in">
                <component 
                    :is="getPreviewComponent()" 
                    :data="questionData" 
                    class="preview-content"
                />
            </Transition>
        </div>

        <div class="actions">
            <BaseButton 
                @click="mode === 'edit' ? update() : add()"
                class="save-button"
                :class="{ 'pulse': isSaving }"
                @mouseenter="animateButton"
            >
                <template #icon>
                    <FontAwesomeIcon :icon="faFloppyDisk" class="icon-save" />
                </template>
                {{ $t('crud.save') }}
            </BaseButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, defineModel, defineExpose, reactive, computed } from 'vue';
import { PropType } from "vue";
import { addQuestion, updateQuestion } from '@/api/question';
import { useRouter } from 'vue-router';
import { useSubjectStore } from '@/stores/subjects';

import Question, { QuestionTypes, DifficultyList } from '@/classes/question';
import Subject from "@/classes/subject";
import type { Difficulty, QuestionType } from '@/classes/question';
import type Mode from '@/types/mode.ts';
import BaseButton from "@/components/bases/BaseButton.vue";
import BaseFormSelect from "@/components/bases/BaseFormSelect.vue";

//#region components
const TagIpt = defineAsyncComponent(() => import('@/components/bases/BaseTagIpt.vue'));
const QuestionEditor = defineAsyncComponent(() => import('@/components/QuestionEditor.vue'));
const MultipleChoice = defineAsyncComponent(() => import('@/components/ExamRender/MultipleChoice.vue'))
const LongAnswer = defineAsyncComponent(() => import('@/components/ExamRender/LongAnswer.vue'))
const ShortAnswer = defineAsyncComponent(() => import('@/components/ExamRender/ShortAnswer.vue'))
const CheckBox = defineAsyncComponent(() => import('@/components/ExamRender/CheckBox.vue'))
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import useToastStore from "@/stores/toast";
//#endregion

const router = useRouter();
const isSaving = ref(false);

const mode = defineModel('mode', {
    type: String as PropType<Mode>,
    default: 'view',
})

const questionData = defineModel({
    type: Question,
    default: () => reactive(Question.createMultipleChoiceTest())
})

const subjectsStore = useSubjectStore()
const toastStore = useToastStore()
const diffcultList = ref<Difficulty[]>(Object.values(DifficultyList))
const questionTypes = ref<QuestionType[]>(Object.values(QuestionTypes))

const emits = defineEmits(['add', 'update', 'remove', 'clone', 'similar'])

const getPreviewComponent = () => {
    switch(questionData.value.type) {
        case 'multiple-choice': return MultipleChoice;
        case 'essay': return LongAnswer;
        case 'short-answer': return ShortAnswer;
        case 'check-box': return CheckBox;
        default: return MultipleChoice;
    }
}

const animateButton = () => {
    // Just trigger CSS animation
}

onMounted(async () => {
    await subjectsStore.fetchSubjects()
})

const add = async () => {
    isSaving.value = true;
    await addQuestion(questionData.value).then(() => {
        toastStore.addTimeout({
            message: 'Add question successful',
            type: 'success'
        })
        setTimeout(() => {
            isSaving.value = false;
            router.push({
                name: 'question-list'
            })
        }, 800);
    }).catch(() => {
        isSaving.value = false;
    })
}

const update = async () => {
    isSaving.value = true;
    await updateQuestion(questionData.value.id ?? '', questionData.value).then(() => {
        toastStore.addTimeout({
            message: 'Update question successful',
            type: 'success'
        })
        setTimeout(() => {
            isSaving.value = false;
            router.push({
                name: 'question-list'
            })
        }, 800);
    }).catch(() => {
        isSaving.value = false;
    })
}

defineExpose({
    mode,
})
</script>

<style scoped lang="scss">
.question-editor-container {
    --primary-color: #4361ee;
    --secondary-color: #3f37c9;
    --accent-color: #f72585;
    --bg-color: #f8f9fa;
    --card-bg: #ffffff;
    --text-color: #212529;
    --border-color: #e9ecef;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --transition-speed: 0.3s;
    
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    border-radius: 12px;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.setting-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    box-shadow: var(--shadow);
    padding: 1.5rem;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
        border-radius: 10px 0 0 10px;
    }
}

.setting-title {
    color: var(--primary-color);
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding: 0.25rem 0.75rem;
    background-color: var(--card-bg);
    border-radius: 4px;
    display: inline-block;
    transform: translateY(-50%);
    box-shadow: var(--shadow);
}

.setting-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.setting-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
}

.form-select {
    background-color: var(--card-bg);
    border-radius: 8px;
    transition: transform var(--transition-speed);
    
    &:hover {
        transform: translateY(-2px);
    }
}

.tag-field {
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid var(--border-color);
}

.tag-label {
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    display: block;
}

.tagIpt {
    --tag-height: 32px;
    --bg-color: #f1f7ff;
    --icon-color: var(--primary-color);
    --font-size: 14px;
    --svg-size: 14px;
}

.question-editor {
    background-color: var(--card-bg);
    border-radius: 10px;
    box-shadow: var(--shadow);
    padding: 1.5rem;
    margin-bottom: 2rem;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
}

.preview-container {
    background-color: var(--card-bg);
    border-radius: 10px;
    box-shadow: var(--shadow);
    padding: 1.5rem;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
        border-radius: 50%;
        z-index: 0;
    }
}

.preview-title {
    color: var(--primary-color);
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(to right, var(--primary-color), var(--accent-color));
        border-radius: 2px;
    }
}

.preview-content {
    position: relative;
    z-index: 1;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
}

.save-button {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
    }
    
    &:active {
        transform: translateY(1px);
    }
    
    &.pulse {
        animation: pulse 1.5s infinite;
    }
    
    .icon-save {
        font-size: 1rem;
    }
}

/* Animations */
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(67, 97, 238, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(67, 97, 238, 0);
    }
}

/* Vue transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
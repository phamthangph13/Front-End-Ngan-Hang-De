<script setup lang="ts">
import {ref, defineExpose, defineEmits, defineAsyncComponent} from "vue";
import Question from "@/classes/question";
import {addQuestion, generateQuestion} from "@/api/question";

//# region components
const TagsNQuestion = defineAsyncComponent(() => import("@/components/TagsNQuestion.vue"));
const BaseButton = defineAsyncComponent(() => import("@/components/bases/BaseButton.vue"));
const BaseDialog = defineAsyncComponent(() => import("@/components/bases/BaseDialog.vue"));
const BaseFormTextArea = defineAsyncComponent(() => import('@/components/bases/BaseFormTextArea.vue'));
const SparkIcon = defineAsyncComponent(() => import("@/assets/icon/spark-svgrepo-com.svg"));
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {faBan, faFloppyDisk, faPencil, faArrowLeftLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
//# endregion

const emits = defineEmits('reload');

const dialogRef = ref<InstanceType<typeof BaseDialog> | null>(null);
const input = ref<Question | null>(null);
const output = ref<Question | null>(null);
const process = ref<number>(0);
const message = ref<string>('');

const show = (question: Question | null) => {
    dialogRef.value?.show();
    input.value = question;
}

const close = () => {
    process.value = 0;
    input.value = null;
    message.value = '';
    dialogRef.value?.close();
}

const generate = () => {
    // process.value = 1;
    generateQuestion(message.value, input.value).then((res) => {
        output.value = Question.fromJson(res);
        process.value = 1;
    }).catch((err) => {
        console.log(err);
        // process.value = 0;
    })
    // console.log(
    //     `Generate question with message: ${message.value} and data: ${JSON.stringify(data.value)}`
    // )
}

const toggle = () => {
    if (dialogRef.value?.open) {
        close();
    } else {
        show(null);
    }
}

const save = () => {
    console.log('save');
    addQuestion(output.value).then((res) => {
        console.log(res);
        emits('reload');
        close();
    }).catch((err) => {
        console.log(err);
    })
}


defineExpose({
    show,
    close,
    toggle,
})

</script>

<template>
    <BaseDialog ref="dialogRef" model-screen="lg">
        <template #title>
            Tạo câu hỏi bằng AI {{process}}
        </template>
        <template #body>
            <transition-group name="list">
                <div class="part config" v-if="process == 0">
<!--                    <label for="message">Cài đặt</label>-->
<!--                    <textarea placeholder="thông điệp" class="field" v-model="message"></textarea>-->
                        <BaseFormTextArea label="Yêu cầu" v-model="message"></BaseFormTextArea>
                    <div class="" v-if="input">
                        <p>Câu hỏi gốc:</p>
                        <TagsNQuestion :item="input" ></TagsNQuestion>
                    </div>
                </div>
                <div v-if="process == 1" class="part">
<!--                    <p>Đang xử lý...</p>-->
                    <p>Câu hỏi tạo ra: </p>
                    <TagsNQuestion :item="output" ></TagsNQuestion>
                    <div class="" v-if="input">
                        <p>Câu hỏi gốc:</p>
                        <TagsNQuestion :item="input" ></TagsNQuestion>
                    </div>
                </div>
            </transition-group>

        </template>
        <template #footer="{func}">
            <span class="warning">
                <FontAwesomeIcon :icon="faCircleExclamation"></FontAwesomeIcon>
                Tuyên Bố
                <span class="tooltip">
                    - AI có thể tạo ra câu hỏi không phù hợp với nội dung <br>
                    - Giáo viên cần kiểm tra, chỉnh sửa trước và sau khi sử dụng
                </span>
            </span>
            <BaseButton class="secondary" @click="close">
                <template #icon>
                    <FontAwesomeIcon :icon="faBan"></FontAwesomeIcon>
                </template>
                {{ $t('action.cancel') }}
            </BaseButton>
<!--            back-->
            <template v-if="process != 0">
                <BaseButton class="secondary" @click="() => {process--}">
                    <template #icon>
                        <FontAwesomeIcon :icon="faArrowLeftLong" />
                    </template>
                    {{ $t('action.back') }}
                </BaseButton>
            </template>
<!--            generate-->
            <template v-if="process == 0">

                <BaseButton @click="generate">
                    <template #icon>
                        <SparkIcon></SparkIcon>
                    </template>
                    Generate
                </BaseButton>
            </template>

            <template v-if="process == 1">

                <BaseButton class="secondary" @click="() => {console.log('e')}" :disabled="!output">
                    <template #icon>
                        <FontAwesomeIcon :icon="faPencil" />
                    </template>
                    {{ $t('crud.edit') }}
                </BaseButton>
                <BaseButton @click="save" :disabled="!output">
                    <template #icon>
                        <FontAwesomeIcon :icon="faFloppyDisk" />
                    </template>
                    {{ $t('crud.save') }}
                </BaseButton>
            </template>

        </template>
    </BaseDialog>
</template>

<style scoped lang="scss">
.part {
    p {
        //font-weight: bold;
        margin: 0 0 0.5rem 0;
    }

    &.config {
        .field {
            width: calc(100% - 0.5rem);
            height: 100px;
            padding: 0.25rem;
            resize: none;
        }
    }
}




.list-enter-active, .list-leave-active {
    transition: opacity 0.25s;
}

.list-enter, .list-leave-to /* .list-leave-active in <2.1.8 */ {
    opacity: 0;
}

span.warning {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    position: relative;

    .tooltip {
        display: none;
        position: absolute;
        background-color: var(--modal-background-color);
        border: solid 1px var(--modal-border-color);
        //color: var(--color-on-primary);
        padding: 0.5rem;
        border-radius: 0.25rem;
        z-index: 100;
        bottom: 100%;
        left: 0;
        width: 300%;
    }

    &:hover {
        .tooltip {
            display: block;

        }
    }
}

</style>
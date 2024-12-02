<script setup lang="ts" generic="T">
import {ref, defineProps, onMounted, defineModel, reactive} from 'vue';

const text = defineModel<T>({
    default: () => reactive<T>(undefined)
})

const {required = false, label = 'Enter text'} = defineProps<{
    required?: boolean,
    label?: string
}>();

var autoResize = function (el: HTMLTextAreaElement) {
    el.style.height = "1px";
    el.style.height = `calc(${el.scrollHeight}px - 1rem)`;
};

</script>

<template>
    <div class="base-text-area">
        <label class="label">
            {{ label }}
        </label>
        <textarea :required rows="1" class="input" v-model="text" placeholder=" " @input="autoResize($event.target)" >
        </textarea>
    </div>
</template>

<style scoped lang="scss">
.base-text-area {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 0.8rem;

    .label {
        font-size: 1rem;
        position: absolute;
        top: 30%;
        left: 0.5rem;
        color: var(--base-form-input-border-color);
        transition: all 0.3s ease;
        pointer-events: none;
        font-family: var(--base-form-input-familiy);
    }

    .input {
        padding: 0.5rem;
        border: 1px solid var(--base-form-input-border-color);
        border-radius: 0.25rem;
        font-size: 1rem;
        margin-top: 0.25rem;
        background: none;
        color: var(--base-form-input-font-color);
        font-family: var(--base-form-input-familiy);
        //height: auto;
        resize: none;
        //height: 1.2rem;

        // hide scrollbar
        scrollbar-width: none;


        //&::placeholder {
        //    color: var(--base-form-input-border-color);
        //}

        // remove hover border
        &:focus {
            outline: none;
            border-color: var(--base-form-input-border-color-focus);
        }
    }

    .input:valid ~ .label {
        top: -0.75rem;
        font-size: 0.8rem;
        color: var(--base-form-input-border-color-focus);
    }

    &:has(.input:focus), &:has(.input:not(:placeholder-shown)) {
        .label {
            top: -0.75rem;
            font-size: 0.8rem;
            color: var(--base-form-input-border-color-focus);

        }
    }
}

</style>
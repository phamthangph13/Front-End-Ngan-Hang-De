<script setup lang="ts" generic="T">
import {ref, defineProps, defineEmits, defineModel, reactive} from 'vue';

const text = defineModel<T>({
    type: String,
    default: ""
})

const {required = false, label = 'Enter text', autocomplete = 'off', type = 'text'} = defineProps<
    {
        required?: Boolean,
        label?: String,
        type?: "text" | "email" | "password" | "number" | "tel" | "url",
        autocomplete?: String
    }>();

</script>

<template>
    <div class="base-form-input">
        <label class="label">
            {{ label }}
        </label>
        <input :required :type class="input" v-model="text" placeholder=" " :autocomplete="autocomplete">
    </div>
</template>

<style>
:root {
    --base-form-input-font-size: 1rem;
    --base-form-input-font-color: #000;
    --base-form-input-border-color: #ccc;
    --base-form-input-border-color-focus: #000;
    --base-form-input-familiy: Arial, sans-serif;
}


</style>

<style scoped lang="scss">
.base-form-input {
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
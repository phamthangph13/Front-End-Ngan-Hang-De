<template>
    <div class="base">
        <div class="icon">
            <slot name="icon"></slot>
        </div>
        <input type="text" v-model="text" class="input" :placeholder="placeholder" />
    </div>
</template>


<script setup lang="ts">
import { ref, defineModel, defineProps } from 'vue';


defineProps({
    placeholder: {
        type: String,
        default: ''
    }
})

const text = defineModel({
    type: String,
    default: ''
});

</script>

<style>
:root {
    --input-text-bar-border: #000;
    --input-text-bar-text: #000;
    --input-text-bar-background: transparent;
}
</style>

<style scoped lang="scss">
.base {
    display: flex;
    flex-direction: row;
    border-radius: 999rem;
    border: 1px solid var(--input-text-bar-border);
    padding: 0 0.5rem;
    overflow: hidden;
    background: var(--input-text-bar-background);
    transition: all 0.3s ease;

    > .input {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--input-text-bar-text);
        transition: all 0.3s ease;

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: var(--input-text-bar-text);
            opacity: 0.5;

            text-transform: capitalize;
        }

    }

    > .icon:has(:not(:empty)) {
        display: flex;
        align-items: center;
        padding: 0 0.5rem;
        color: var(--input-text-bar-text);
        transition: all 0.3s ease;
    }
}
</style>
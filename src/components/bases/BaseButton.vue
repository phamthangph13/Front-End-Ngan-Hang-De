<template>
    <button class="button" @click="emits('click', $event)">
        <div class="icon">
            <slot name="icon"></slot>
        </div>
        <div class="text">
            <slot name="default">
                Button
            </slot>
        </div>
    </button>
</template>


<script setup lang="ts">
import { defineEmits } from 'vue';

const emits = defineEmits(['click']);

</script>

<style>

:root {
    --base-button-bg-color: #1e1d1d;
    --base-button-bg-color-hover: rgba(0, 0, 0, 0.71);
    --base-button-text-color: #ffffff;
    --base-button-text-color-hover: #fcfcfd;
}

</style>


<style scoped lang="scss">
.button {
    padding: 0.5rem;
    border: none;
    background-color: var(--base-button-bg-color);
    border-radius: 0.25rem;
    font-size: 1rem;
    font-family: Arial, sans-serif;

    color: var(--base-button-text-color);
    transition: all 0.3s ease;

    display: flex;
    //gap: 0.5rem;
    align-items: center;
    justify-content: center;

    > .icon:not(:empty) {
        display: flex;
        margin-right: 0.25rem;
        align-items: center;
        justify-content: center;
        //width: 100%;
        //height: 100%;

        :slotted(svg) {
            width: 1rem;
            height: 1rem;
        }

        :deep(svg) {
            width: 1rem;
            height: 1rem;
        }

    }


    > .text {
        font-weight: 520;
        text-align: center;
        white-space: nowrap;
    }

    &:hover {
        color: var(--base-button-text-color-hover);
        background-color: var(--base-button-bg-color-hover);
    }
}

.button[disabled] {
    opacity: 0.7;
    background-color: var(--base-button-bg-color);
    color: var(--base-button-text-color);
    cursor: not-allowed;
}

.button.secondary {
    background-color: #0000;
    border: 1px solid var(--base-button-bg-color);
    color: var(--base-button-bg-color);
}

</style>
<script setup lang="ts" generic="T">
import { ref, defineProps, defineEmits, defineModel,  } from 'vue';
import type { PropType, ModelRef } from 'vue';

const value = defineModel<T | null>()

const {
    required = false,
    label = 'Enter text',
    list = [],
    nullable = false,
    nullLabel = 'None'
} = defineProps<{
    required?: boolean,
    label?: string,
    list?: Array<T>,
    nullable?: boolean,
    nullLabel?: string
}>()


</script>


<template>
    <div class="base-form-select">
        <slot :value>
            {{ value }}
        </slot> &nbsp;
        <label class="label" :data-is-value="value ? '' : null">
            {{ label }}
        </label>
        <ul class="list">

            <li class="item" @click="value = undefined" v-if="nullable">
                <slot name="null">
                    <span>{{ nullLabel }}</span>
                </slot>
            </li>

            <template v-for="(item, i) in list" :key="i">
                <li  class="item" @click="value = item">
                    <slot :item="item" name="item">
                        {{ item }}
                    </slot>
                </li>
            </template>
        </ul>
    </div>
</template>


<style>
:root {
    --base-form-option-background-color: #fff;
    --base-form-option-background-color-hover: #d4d4d4;
    --base-form-input-font-size: 1rem;
    --base-form-input-font-color: #000;
    --base-form-input-border-color: #ccc;
    --base-form-input-border-color-focus: #000;
    --base-form-input-familiy: inherit;
}


</style>


<style lang="scss" scoped>
.base-form-select {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 1.05rem;

    padding: 0.5rem;
    border: 1px solid var(--base-form-input-border-color);
    border-radius: 0.25rem;
    font-size: 1rem;
    //margin-top: 0.25rem;
    background: none;
    color: var(--base-form-input-font-color);
    font-family: inherit;

    .label {
        font-size: 1rem;
        position: absolute;
        top: calc(26% - 1px);
        left: 0.5rem;
        color: var(--base-form-input-border-color);
        transition: all 0.3s ease;
        pointer-events: none;
    }

    .label[data-is-value] {
        top: -1rem;
        font-size: 0.8rem;
        color: var(--base-form-input-border-color-focus);
    }

    .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: none;

        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 10rem;

        background-color: var(--base-form-option-background-color);

        border: 1px solid var(--base-form-input-border-color);
        border-radius: 0.25rem;

        z-index: 1;

        overflow-x: hidden;
        scrollbar-width: thin;

        .item {
            padding: 0.5rem;
            cursor: pointer;

            color: var(--base-form-input-font-color);

            &:hover {
                background-color: var(--base-form-option-background-color-hover);
                // color: white;
            }
        }
    }

    &:hover .list {
        display: block;
    }

}

</style>
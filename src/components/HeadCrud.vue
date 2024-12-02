<template>
    <div class="head">
        
        <div class="title">
            <slot name="title"></slot>
        </div>

        <div class="actions">
            <slot name="refresh" :click="() => {emit('refresh')}">
                <button @click="emit('refresh')" class="btn">
                    <FontAwesomeIcon :icon="faArrowRotateLeft"></FontAwesomeIcon>
                </button>
            </slot>
            <slot name="add" :click="() => {emit('add')}">
                <button @click="emit('add')" class="btn">
                    <FontAwesomeIcon :icon="faPlus"></FontAwesomeIcon>
                </button>
            </slot>
            <slot name="group">
<!--                <div class="btn-group">-->
<!--                    <button @click="view = 'list'">-->
<!--                        <FontAwesomeIcon :icon="faBars"></FontAwesomeIcon>-->
<!--                    </button>-->
<!--                    <button @click="view = 'table'">-->
<!--                        <FontAwesomeIcon :icon="faTable"></FontAwesomeIcon>-->
<!--                    </button>-->
<!--                </div>-->

            </slot>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, defineEmits, defineProps, watch, defineModel  } from 'vue'

// const { t } = useI18n()

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRotateLeft, faPlus, faTable, faBars } from '@fortawesome/free-solid-svg-icons';







const emit = defineEmits(['refresh', 'add'])




</script>

<style>
:root {
    --head-crud-bg-color: white;
    --head-crud-btn-bg-color: #f0f0f0;
    --head-crud-btn-border-left-color: #333;
    --head-crud-btn-bg-color-hover: #f0f0f0;
    --head-crud-font-color: #333;
}

</style>

<style scoped lang="scss">
.head {

    position: sticky;
    top: 0;
    padding: 0.5rem;
    z-index: 1;
    background-color: var(--head-crud-bg-color);
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);

    color: var(--head-crud-font-color);
    
    .title {
        :slotted(:where(h1, h2, h3, h4, h5, h6)) {
            margin: 0 0.5rem 0.5rem 0.5rem;
            // text-transform: capitalize;
            text-transform: lowercase;
    
            &::first-letter {
                text-transform: uppercase;
            }
    
        }
    }


    .actions {
        // margin: 10px 0;
        padding: 0 0.5rem;
        // border: 1px solid #333;
        display: flex;
        // justify-content: space-between;

        :slotted(button) {
            margin-right: 0.25rem;
            // border: 1px solid #333;
            border-radius: 0.25rem;
            padding: 0.5rem;
            min-width: 2.5rem;
            min-height: 2.5rem;
            position: relative;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            background-color: var(--head-crud-btn-bg-color);
            border: none;

            &:hover {
                background-color: var(--head-crud-btn-bg-color-hover);
            }

            svg {
                width: 1.25rem;
                height: 1.25rem;
                color: var(--head-crud-font-color);
            }

        }

        :slotted(.btn-group) {
            display: flex;
            border-radius: 0.25rem;
            overflow: hidden;

            & button:first-child {
                border-left: none
            }

            button {
                margin: 0;
                border-left: 0.1rem solid var(--head-crud-btn-border-left-color);
                border-radius: 0;
                padding: 0.25rem;
                min-width: 2.5rem;
                min-height: 2.5rem;
            }
        }
    }
}
</style>
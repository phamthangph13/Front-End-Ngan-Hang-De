<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCheck, faInfo, faWarning, faXmark} from "@fortawesome/free-solid-svg-icons";

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

const { message = 'This is a toast', type = 'default' } = defineProps<{
    message?: string,
    type?: ToastType
}>()

</script>

<template>
    <li :class="{
        'toast-item': true,
        [`${type}`]: true
    }">
        <div class="icon">
            <FontAwesomeIcon :icon="faInfo" v-if="type === 'default'"></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faInfo" v-if="type === 'info'"></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faCheck" v-if="type === 'success'"></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faXmark" v-if="type === 'error'"></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faWarning" v-if="type === 'warning'"></FontAwesomeIcon>
        </div>
        <div class="message">
            {{ message }}
        </div>
    </li>
</template>

<style>
:root {
    --toast-default: #1c1c1c;
    --toast-success: #54b354;
    --toast-error: #d86b6b;
    --toast-warning: rgba(250, 250, 159, 0.82);
    --toast-info: #5353fd;
}
</style>

<style scoped lang="scss">
.toast-item {
    padding: 0.5rem;
    border-radius: 0.25rem;
    width: 16rem;

    display: grid;
    //gap: 0.5rem;

    grid-template-columns: 2rem 1fr;
    grid-template-rows: 2rem;

    background-color: var(--toast-default);

    pointer-events: auto;

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        //width: 1rem;
        //height: 1rem;
        color: white;
    }

    .message {
        display: flex;
        align-items: center;
        padding: 0.5rem;

        color: white;
    }
}

.toast-item.success {
    background-color: var(--toast-success);
}

.toast-item.error {
    background-color: var(--toast-error);
}

.toast-item.warning {
    background-color: var(--toast-warning);
    .icon, .message {
        color: black;
    }
}

.toast-item.info {
    background-color: var(--toast-info);
}



</style>
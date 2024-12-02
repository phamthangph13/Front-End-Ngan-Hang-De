<script setup lang="ts">

import {nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch, watchEffect} from "vue";
import {onBeforeRouteUpdate} from "vue-router";

let observer = null
const elemRef = useTemplateRef('elemRef')
const dialogList = ref<Array<HTMLDialogElement>>([])
const target = ref<HTMLElement | null>(null)

const handleModalOpen = (dialog: HTMLDialogElement) => {
    if (dialog.open) {
        if (!dialogList.value.includes(dialog)) {
            dialogList.value.push(dialog);
        }
    }
};
const handleModalClose = (dialog: HTMLDialogElement) => {
    // dialogList.value.delete(dialog)
    dialogList.value = dialogList.value.filter((d) => d !== dialog)
};

onMounted(() => {

    observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (
                mutation.type === "attributes" &&
                mutation.target instanceof HTMLDialogElement
            ) {
                const target = mutation.target as HTMLDialogElement;
                if (target.hasAttribute("open")) {
                    if (target.matches("dialog:modal")) handleModalOpen(target);
                } else {
                    handleModalClose(target);
                }
            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        attributes: true,
        subtree: true,
        attributeFilter: ["open"], // Listen to changes in 'open' attribute
    });
    elemRef.value?.showPopover()
    target.value = dialogList.value?.at(-1) ?? document.body
})

onBeforeUnmount(() => {
    observer.disconnect()
})


watch(dialogList, (newVal) => {
    nextTick(() => {
        elemRef.value?.showPopover();
    });
    target.value = dialogList.value?.at(-1) ?? document.body
}, { deep: true });






</script>

<template>
    <teleport :to="dialogList.at(-1) ?? 'body'">
        <div class="alway-top" popover="manual" ref="elemRef">
            <slot></slot>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.alway-top {
    border: 0;
    //background-color: transparent;
    background-color: red;
    padding: 0;
    //margin: 0;
    //transform: translateX(-50%);
    //transition: all 0.3s ease;
}

</style>
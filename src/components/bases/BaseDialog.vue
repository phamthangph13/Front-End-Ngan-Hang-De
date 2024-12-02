<template>
    <transition name="dialog">
        <div class="dialog" v-if="open">
            <div ref="dialogRef" class="modal" :model-screen >
                <header>
                    <slot name="head" :function="{ closeDialog }">
                <span class="title">
                    <slot name="title">Thông báo</slot>
                </span>
                        <button class="closeBtn" @click="closeDialog">
                            <FontAwesomeIcon :icon="faXmark"/>
                        </button>
                    </slot>
                </header>
                <article class="body">
                    <slot name="body">
                        <p>Đây là thông báo</p>
                    </slot>
                </article>
                <footer>
                    <slot name="footer" :func="{ closeDialog }">
                        <BaseButton @click="closeDialog">
                            Close
                        </BaseButton>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>

</template>


<script setup lang="ts">
import {ref, defineExpose, defineProps, onMounted, reactive} from 'vue';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import BaseButton from "@/components/bases/BaseButton.vue";


defineProps({
    modelScreen: {
        type: String,
    }
})


const open = defineModel('open', {
    type: Boolean,
    default: false
})


const closeDialog = async () => {
    open.value = false;
}

const showDialog = () => {
    // dialogRef.value?.showModal();
    open.value = true;
}

const toggleDialog = () => {
    open.value = !open.value;
}



defineExpose({
    close: closeDialog,
    show: showDialog,
    toggle: toggleDialog,
    open
})

// onMounted(() => {
//     dialogRef.value?.addEventListener('click', lightDismiss)
// })

</script>

<style>
:root {
    --modal-border-color: #b1b0b0;
    --modal-background-color: #fff;
}
</style>

<style scoped lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@380&family=LXGW+WenKai+TC:wght@700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Patrick+Hand&display=swap');
@import "https://unpkg.com/open-props";

.modal {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 0.5rem;
    padding: 1rem;
    //position: fixed;

    background-color: var(--modal-background-color);

    //visibility: hidden;

    inset: 0;
    z-index: var(--layer-important); // 1000
    max-inline-size: min(90vw, var(--size-content-3)); // prevent overflow
    max-block-size: min(80vh, 100%); // prevent overflow
    overflow: hidden;
    transition: opacity .5s var(--ease-3); // ease-in-out
    // animation: var(--animation-scale-down) forwards;
    // animation-timing-function: var(--ease-squish-3);
    border: solid 1px var(--modal-border-color); // border
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.5); // shadow


    > header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding: 0.5rem 1rem;
        // border-bottom: solid 1px var(--dialog-border-color);
        background-color: var(--color-primary);
        color: var(--color-on-primary);
        // border-top-left-radius: 0.5rem;
        // border-top-right-radius: 0.5rem;

        .title {
            font-size: 1.5rem;
            font-weight: bold;
        }


        .closeBtn {
            background: none;
            border: none;
            color: var(--color-on-primary);
            cursor: pointer;
            font-size: 1.5rem;
        }
    }

    > article {
        padding: 0.25rem;
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;

        scrollbar-width: thin;
    }

    > footer {
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        gap: 0.5rem;
        // padding: 0.5rem;
        // border-top: solid 1px var(--dialog-border-color);
        background-color: var(--color-primary);
        color: var(--color-on-primary);
        // border-bottom-left-radius: 0.5rem;
        // border-bottom-right-radius: 0.5rem;

    }
}

.dialog-enter-active,
.dialog-leave-active {
    transition: opacity 0.5s ease;
}

.dialog-enter-active {
    .modal {
        animation: var(--animation-slide-in-up) forwards;
    }
}


.dialog-leave-active {
    .modal {
        animation: var(--animation-slide-out-down) forwards;
    }
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}

// dialog[open] {
//     animation: var(--animation-slide-in-up) forwards;
// }


//.modal::backdrop {
//    backdrop-filter: blur(0.25rem);
//}

//.modal {
//    animation: var(--animation-slide-out-down) forwards; // use for close
//    animation-timing-function: var(--ease-squish-3); // time: 0.5s
//}
//
//.modal[open] {
//    animation: var(--animation-slide-in-up) forwards; // use for open
//}

.modal[model-screen="full-screen"] {
    max-inline-size: calc(100% - 4rem);
    max-block-size: calc(100% - 4rem);
    // border-radius: 0;
    // padding: 0;s
    // box-shadow: none;
    // border: none;
    width: 100%;
    height: 100%;
}

.modal[model-screen="lg"] {
    max-inline-size: min(90vw, var(--size-content-3));
    max-block-size: min(80vh, 100%);
    width: 100%;
    height: 100%;

}


// @media (prefers-reduced-motion: no-preference), (max-width: 768px) {
//   dialog[modal-mode="mega"] {
//     animation: var(--animation-slide-out-down) forwards;
//     animation-timing-function: var(--ease-squish-2);
//   }
// }

.dialog {
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;

    background-color: rgba(0, 0, 0, 0.5);
}

.dialog:not(:has(.modal)) {
    pointer-events: none;
    visibility: hidden;
    animation: dialog-close 0.5s forwards;
}

//@keyframes dialog-close {
//    0% {
//        visibility: visible;
//        opacity: 1;
//    }
//    100% {
//        opacity: 0;
//        visibility: hidden;
//    }
//}

</style>
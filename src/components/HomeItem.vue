<template>
    <li class="item" @click="emits('click')" 
    @mouseleave="isHover = false"
    @mouseenter="isHover = true"
    >
        <div class="icon">
            <!-- <component :is="link.component" /> -->
            <slot></slot>
        </div>
        <div class="text">
            <slot name="text"></slot>
        </div>
        <!-- <div class="curve"></div> -->
    </li>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

defineProps({
    translate: {
        type: Boolean,
        default: true
    },
})

const emits = defineEmits(['click'])

const isHover = ref(false)

// const mouseLeave = () => {
//     linkRef.value?.classList.add('mouse-leave')
//     setTimeout(() => {
//         linkRef.value?.classList.remove('mouse-leave')
//     }, 250)
// }

// watch(isHover, (value) => {
//     if (!value) {
//         linkRef.value?.classList.add('mouse-leave')
//         setTimeout(() => {
//             linkRef.value?.classList.remove('mouse-leave')
//         }, 1250)
//     }
// })

</script>

<style lang="scss">
:root {
    --home-item-bg-color: var(--app-bg-color);
}

</style>


<style scoped lang="scss">
.item {
    width: 15rem;
    height: 10rem;
    border-radius: 1rem;
    overflow: hidden;
    background-color: var(--home-item-bg-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .icon {
        width: 4rem;
        height: 4rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 0.5rem;
        z-index: 1;


        :slotted(svg) {
            width: 80%;
            height: 80%;
            // fill: var(--app-icon-color);
            transition: all 0.3s ease;
        }
    }

    .text {
        text-transform: lowercase;
        // width: 5em;
        // overflow: hidden;
        white-space: nowrap;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;
        font-size: 1.5rem;

        &::first-letter {
            text-transform: uppercase;
        }
    }
}

</style>
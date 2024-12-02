<template>
    <li class="item" @click="emits('click', $event)" 
    :data-active="active" 
    @mouseleave="isHover = false"
        @mouseenter="isHover = true">
        <div class="icon">
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
    active: {
        type: Boolean,
        default: false
    },
    closed: {
        type: Boolean,
        default: false
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@380&family=LXGW+WenKai+TC&family=Patrick+Hand&display=swap');

:root {
    
}
</style>

<style scoped lang="scss">
.item {
    // padding: 0.5rem 2.25rem 0.5rem 0.5rem;


    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    // animation: mouseLeave 0.25s linear;
    // transition: background-color 0.3s ease;

    font-family: "LXGW WenKai TC", cursive;
    font-weight: 700;
    font-size: 1rem;
    color: var(--app-text-color);
    height: 3rem;
    width: 100%;

    --curve-x-location: calc(100% - 1.5rem);
    --curve-width: calc(100% - 0.5rem);

    // &:hover {

    // }

    // &.mouse-leave {
    //     animation: changeColor 0.25s linear reverse;
    // }

    > .icon {
        width: 2rem;
        height: 2rem;
        margin-right: 1rem;
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

    > .text {
        text-transform: lowercase;
        width: 5em;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;

        &::first-letter {
            text-transform: uppercase;
        }


    }


    &:before {
        content: '';
        --r: 1.5rem;
        // z-index: -1;
        
        border: var(--r) solid #0000;
        // border-right: 0;
        border-radius: 999rem 0 0 999rem;
        /* border-left: 0; */
        mask:
        radial-gradient(100% 100% at 0 0, #0000 98%, #000) var(--curve-x-location) 0 / var(--r) var(--r),
        radial-gradient(100% 100% at 0 100%, #0000 98%, #000) var(--curve-x-location) 100% / var(--r) var(--r),
        // radial-gradient(100% 100% at 100% 0, #0000 98%, #000) 100% calc(100% - var(--r)) / var(--r) var(--r),
        linear-gradient(#000 0 0) padding-box;
        mask-repeat: no-repeat;
        
        position: absolute;
        height: calc(var(--r) * 2);
        width: 0;
        right: -0.25rem;
        bottom: 50%;
        transform: translateY(50%);
        mix-blend-mode: normal;
        // visibility: hidden;
        // background: var(--app-content-bg-color);

        pointer-events: none;

        transition: all 0.3s ease;
    }

    &.last:before {
        mask:
        radial-gradient(100% 100% at 0 0, #0000 98%, #000) var(--curve-x-location) 0 / var(--r) var(--r),
        radial-gradient(100% 100% at 0 100%, #0000 98%, #000) var(--curve-x-location) 100% / var(--r) var(--r),
        radial-gradient(101% 101% at 100% 0, #0000 98%, #000) calc(100% - 0px) calc(100% - var(--r) ) / var(--r) var(--r),
        linear-gradient(#000 0 0) padding-box;
        mask-repeat: no-repeat;
    }




    &[data-active="true"] {
        // background: var(--app-content-bg-color);
        // transition: all 0.3s ease;

        &:before {
            width: var(--curve-width);
            background: var(--app-content-bg-color);
            // border-color: red;
        }


    }

}

[data-web-app].closed .item {
    // --curve-x-location: 3.5rem;
    --curve-width: 3.75rem;

    &:before {
        right: 6.75rem;
        transition-duration: 0.3s;
    }

    > .text {
            width: 0;
        }
}

// @keyframes mouseEnter {
//     0% {
//         background-position: 0% 0%;
//     }

//     100% {
//         background-position: 100% 0%;
//     }
// }

// @keyframes mouseLeave {
//     0% {
//         background-position: 100% 0%;
//     }

//     100% {
//         background-position: 0% 0%;
//     }
// }



</style>
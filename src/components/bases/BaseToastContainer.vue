<script setup lang="ts">

import BaseToastItem, {ToastType} from "@/components/bases/BaseToastItem.vue";
import AlwayTop from "@/components/bases/AlwayTop.vue";
import {ref} from "vue";

export type Item = {
    time: Date // local date time
    message: string,
    type: ToastType
}

const {items = []} = defineProps<{
    items: Item[]
}>()
//
// const addAToastTest = () => {
//     let item: Item = {
//         time: new Date(),
//         message: `This is a toast ${items.value.length}`,
//         type: 'success'
//     }
//     items.value.push(item)
//     // remove after 5 seconds
//     setTimeout(() => {
//         items.value = items.value.filter(i => i.time !== item.time)
//     }, 5000)
// }
//
// defineExpose({
//     addAToast: addAToastTest
// })

</script>

<template>
    <div class="toast-container">
        <transition-group name="toast" tag="ul">
            <template v-for="item in items" :key="item.time">
                <BaseToastItem :message="item.message" :type="item.type" ></BaseToastItem>
            </template>
        </transition-group>
    </div>
</template>

<style scoped lang="scss">
.toast-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 2147483647;

    pointer-events: none;

    ul {
        list-style-type: none;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
}

.toast-move,
.toast-enter-active,
.toast-leave-active {
    transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

//.toast-leave-active {
//    position: absolute;
//}

</style>
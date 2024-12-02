<script setup lang="ts">

import {inject} from "vue";

const { title = "", _key } = defineProps<{
    title?: string,
    _key: string
}>();

const selectedKey = inject('selectedKey');

</script>

<template>
<!--    <transition name="tab">-->
        <div class="tab" v-show="_key === selectedKey" :key="_key">
            <slot/>
        </div>
<!--    </transition>-->
</template>


<style scoped lang="scss">
//.tab-enter-active,
//.tab-leave-active {
//    transition: opacity 4s ease;
//}
//
//.tab-enter-from,
//.tab-leave-to {
//    opacity: 0;
//}
</style>
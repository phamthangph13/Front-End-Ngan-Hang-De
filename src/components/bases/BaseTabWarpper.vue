<script setup lang="ts">

import {computed, provide, ref, useSlots, watch, watchEffect} from "vue";

const slots = defineSlots<{
    default(props: { title: string, _key: string }): any
}>()


// const tabTitles = ref<string[]>(slots.default().map((slot: any) => slot.props.title));
// const tabKeys = ref<string[]>(slots.default().map((slot: any) => slot.props._key));
const tabs = ref<{
    title: string,
    _key: string
}[]>(slots.default().map((slot: any) => slot.props));
const selectedKey = ref<string>(tabs.value[0]._key);

// watch(() => slots.default(), (newVal) => {
//     tabs.value = newVal.map((slot: any) => slot.props);
// }, {immediate: true, deep: true})

const isSlideLeft = ref(false);

const getSlideEnterAnimation = computed(() => {
    return isSlideLeft.value ? 'var(--animation-slide-in-left)' : 'var(--animation-slide-in-right)';
})

const getSlideOutAnimation = computed(() => {
    return isSlideLeft.value ? 'var(--animation-slide-out-left)' : 'var(--animation-slide-out-right)';
})

watchEffect(() => {
    tabs.value = slots.default().map((slot: any) => slot.props);
})

watch(() => selectedKey.value, (oldVal, newVal) => {
    // if oldVal index > newVal index, then slide in left, else slide in right
    const oldIndex = tabs.value.findIndex((tab) => tab._key === oldVal);
    const newIndex = tabs.value.findIndex((tab) => tab._key === newVal);
    if (oldIndex > newIndex) {
        isSlideLeft.value = true;
    } else {
        isSlideLeft.value = false;
    }
})

provide('selectedKey', selectedKey);

defineExpose({
    selectedKey
})

</script>

<template>
    <div class="tabs-wrapper">
        <ul class="header">
            <li :class="{
                item: true,
                active: item._key === selectedKey
            }" v-for="item in tabs" :key="item._key " @click="selectedKey = item._key">
                {{ item.title }}
            </li>
        </ul>
        <transition-group name="tab" tag="div" class="container">
            <slot/>
        </transition-group>
    </div>
</template>

<style>
:root {
    --tabs-wapper-item-active-color: #000;
}
</style>

<style scoped lang="scss">
.tabs-wrapper {
    //width: 100%;
    //height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        .item {
            padding: 10px;
            cursor: pointer;
            position: relative;

            &.active {
                //background-color: #f0f0f0;

                &:before {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: var(--tabs-wapper-item-active-color);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
        }

    }

    .container {
        position: relative;
        //padding: 10px;
        margin-top: 10px;
        width: 100%;
        flex: 1;
        overflow-x: hidden;

        display: flex;
        flex-direction: column;

        :deep(.tab) {

            //position: absolute;
            //top: 0;
            //left: 0;
            width: 100%;
            overflow-x: hidden;

            $timeout: 0.8s;

            &.tab-move,
            &.tab-enter-active,
            &.tab-leave-active {
                transition: opacity $timeout;
            }

            &.tab-enter-active {
                animation: v-bind(getSlideEnterAnimation) forwards;
                animation-duration: $timeout;
            }

            &.tab-leave-active {
                //animation: var(--animation-slide-out-left) forwards;
                animation: v-bind(getSlideOutAnimation) forwards;
                animation-duration: $timeout;

                position: absolute;
                top: 0;
                //left: 0;
            }

            &.tab-enter-from,
            &.tab-leave-to {
                opacity: 0.5;
            }

            &.tab-enter-to,
            &.tab-leave-from {
                opacity: 1;
            }
        }
    }


}




</style>
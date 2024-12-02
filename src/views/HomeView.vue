<script setup>

</script>

<template>
    <div class="view">
        <h1 class="title">{{ $t('home') }}</h1>

        
        <ul class="menu">
            <template v-for="i in [...topLinks, ...bottomLinks].slice(1)">
                <HomeItem @click="() => { router.push(i.path) }">
                    <component :is="i.component" />
                    <template #text>
                        {{ !i.noTranslate ? $t(i.name) : i.name }}
                    </template>
                </HomeItem>
            </template>
        </ul>
        <template v-if="isDev">
            <template v-if="test">
                <p>
                    Bạn đã kết nối đến máy chủ 🎉
                </p>
                <p>
                    Máy chủ phản hồi với bạn: {{ test }}
                </p>
            </template>
            <p v-else style="color: red;">Chạy backend để test api</p>
        </template>




    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, nextTick, watch, defineExpose, defineAsyncComponent } from 'vue';
import getHome  from '@/api/home.js'

import { useRouter } from 'vue-router';

import topLinks from '@/router/topLinks';
import bottomLinks from '@/router/bottomLinks';

const router = useRouter()

const HomeItem = defineAsyncComponent(() => import('@/components/HomeItem.vue'))
const test = ref<String | null>(null);

const isDev = import.meta.env.DEV;

onMounted(() => {
    getHome().then((res) => {
        test.value = res
        console.log(res)
    })

})

</script>


<style scoped lang="scss">

.view {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-x: hidden;
    overflow-y: visible;
    height: calc(100% - 2rem);
    scrollbar-width: thin;

    .menu {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 0;
        margin: 0;
        list-style-type: none;
        flex-wrap: wrap;
    }


    .title {
        font-size: 2rem;
        margin: 0;
        margin-bottom: 1rem;
        text-transform: lowercase;
        &::first-letter {
            text-transform: uppercase;
        }
    }
}


</style>
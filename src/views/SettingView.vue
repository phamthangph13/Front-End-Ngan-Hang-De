<template>
    <div class="view">
        <h1>{{ $t('setting.title') }}</h1>

        <!-- <div class="part appearance">
            <h2>Hiển thị</h2>
            <div class="ipt">
                <label for="">Theme</label>
                <select v-model="settingStore.settings.theme">
                    <option v-for="theme in themes" :value="theme" :key="theme">{{ theme }}</option>
                </select>
            </div>
        </div> -->
        <div class="part lang" id="lang">
            <h2>{{ $t('setting.language') }}</h2>
            <div class="ipt">
                <label for="" class="uppercaseFirstLetter"> {{ $t('setting.system', { name: $t('setting.language') })
                    }}</label>
                <select v-model="settingStore.settings.language">
                    <option v-for="lang in configStore.config.supportedLanguages" :value="lang.lang" :key="lang.region">
                        {{ lang.name }}
                    </option>
                </select>
            </div>
            <BaseButton @click="settingStore.loadLanguage(true)">{{ $t('action.refresh') }}</BaseButton>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue'
import useSettingsStore from '@/stores/settings'
import useConfigStore from '@/stores/config';
import BaseButton from "@/components/bases/BaseButton.vue";


const settingStore = useSettingsStore()
const configStore = useConfigStore()

</script>

<style lang="scss"></style>

<style scoped lang="scss">
.view {
    padding: 1rem;
    height: 100%;
    overflow-y: auto;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;



    }

    .uppercaseFirstLetter {
            text-transform: lowercase;
            display: block;

            &::first-letter {
                text-transform: uppercase;
            }
        }

    .ipt {
        display: flex;

    }



}
</style>
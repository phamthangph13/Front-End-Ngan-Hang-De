import { defineStore } from "pinia";

import { ref } from "vue";


type Config = {
    version: string;
    supportedLanguages: {
        lang: string;
        region: string;
        name: string;
    }[];
}


export const useConfigStore = defineStore('config', () => {
    const config = ref<Config>({} as Config);
    const isLoading = ref<boolean>(false);
    const isLoadAll = ref<boolean>(false);
    const error = ref<string | null>(null);

    const loadConfig = async () => {
        isLoading.value = true;
        try {
            const response = await fetch('/config.json');
            config.value = await response.json();
        } catch (e: any) {
            error.value = e.message;
        } finally {
            isLoading.value = false
            isLoadAll.value = true;
        }
    }



    return { config, loadConfig, isLoading, isLoadAll, error };
})


export default useConfigStore;
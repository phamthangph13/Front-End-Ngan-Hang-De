import { ref, watch, computed } from "vue";
import { defineStore } from 'pinia';
import i18n, { loadI18nLanguage, setI18nLanguage } from '@/plugins/i18n';
import { useStorage, useDark } from "@vueuse/core";
import type { BasicColorSchema } from "@vueuse/core";
import toggleDark from "@/utils/toggleDark";

const app = document.querySelector('[data-web-app]') as HTMLElement

// const themes = ['dark', 'light', 'system-default', 'custom'] as const;

type Setting = {
    theme: BasicColorSchema;
    isSidebarClose: boolean;
    language: string;
}

// const useLocalStorage = <T,>(key: string, defaultValue?: T) => {
//     const storedValue = ref<T>(defaultValue as T);

//     // Load initial value from localStorage
//     const json = localStorage.getItem(key);
//     if (json) {
//         storedValue.value = JSON.parse(json);
//     }

//     window.addEventListener('storage', (event: StorageEvent) => {
//         if (event.key === key) {
//             storedValue.value = JSON.parse(event.newValue!);
//         }
//     });

//     // Watch for changes and store them in localStorage
//     watch(storedValue, (value) => {
//         localStorage.setItem(key, JSON.stringify(value));
//     }, { deep: true });

//     return storedValue;
// }

const useSettingsStore = defineStore('settings', () => {


    // const settings = useLocalStorage<Setting>('settings', {
    //     theme: 'system-default',
    //     isSidebarClose: true,
    //     language: 'vi'
    // });

    const settings = useStorage('settings', {
        theme: 'auto',
        isSidebarClose: true,
        language: 'vi',
    })


    const isDark = useDark({
        storageRef: computed<BasicColorSchema>({
            get() {
                return settings.value.theme as BasicColorSchema;
            },
            set(value) {
                settings.value.theme = value;
            }
        }),
    });

    const isLoading = ref<boolean>(false);

    app.setAttribute('theme', settings.value.theme);
    settings.value.isSidebarClose ? app.classList.add('closed') : app.classList.remove('closed');

    const setSettings = (value: Setting) => {
        settings.value = value;
    }

    const setTheme = (theme: Setting['theme']) => {
        settings.value.theme = theme;
    }

    const toggleSidebar = () => {
        settings.value.isSidebarClose = !settings.value?.isSidebarClose;
    }

    const toggleDarkTheme = (event: MouseEvent) => {
        toggleDark(isDark, event);
    }

    const loadLanguage = async(force = false) => {
        console.log('loading language', settings.value.language);
        isLoading.value = true;
        await loadI18nLanguage(i18n, settings.value.language, force);
        setI18nLanguage(i18n, settings.value.language);
        isLoading.value = false;
    }



    watch(()=> settings.value.theme, (value) => {
        app.setAttribute('data-theme', value);
    });

    watch(()=> settings.value.isSidebarClose, (value) => {
        value ? app.classList.add('closed') : app.classList.remove('closed');
    });

    watch(()=> settings.value.language, async() => {
        await loadLanguage();
    });

    return { settings, isDark, isLoading, setSettings, toggleSidebar, setTheme, loadLanguage, toggleDarkTheme };

})


export default useSettingsStore;
export { themes };
export type { Setting };
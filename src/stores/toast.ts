import {defineStore} from "pinia";
import {ref} from "vue";
import {Item} from "@/components/bases/BaseToastContainer.vue";

const useToastStore = defineStore('toast', () => {
    const toasts = ref<Item>([])

    const addToast = (toast : Item) => {
        toasts.value.push(toast)
    }

    const removeToast = (toast : Item) => {
        toasts.value = toasts.value.filter(t => t.time !== toast.time)
    }

    const addTimeout = (toast : Item) => {
        toast.time = new Date().getTime()
        addToast(toast)
        setTimeout(() => {
            removeToast(toast)
        }, 5000)
    }

    const clear = () => {
        toasts.value = []
    }

    return {
        toasts,
        addToast,
        removeToast,
        addTimeout,
        clear
    }
})


export default useToastStore
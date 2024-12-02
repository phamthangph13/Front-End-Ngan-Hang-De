<template>
    <div class="view">
        <LoginPanel v-model="data" @login="loginUser" />
        <BaseButton @click="checkToken" v-show="false">Check Token</BaseButton>
        <div @click="setting.toggleDarkTheme($event)" class="toggle">
            <moonSvg v-show="setting.isDark" />
            <sunSvg v-show="!setting.isDark" />
        </div>
    </div>
</template>


<script setup lang="ts">
// import LoginPanel from '@/components/PanelLogin.vue';
import { ref, defineProps, watch, defineEmits, defineAsyncComponent } from 'vue';
import { LoginModel } from "@/classes/auth";
import { login, checkToken } from '@/api/auth';
import { useRouter } from "vue-router";
import useSettingsStore from '@/stores/settings';
import useToastStore from "@/stores/toast";

const BaseButton = defineAsyncComponent(() => import("@/components/bases/BaseButton.vue"));
const LoginPanel = defineAsyncComponent(() => import('@/components/PanelLogin.vue'));
const sunSvg = defineAsyncComponent(() => import('@/assets/icon/sun.svg'));
const moonSvg = defineAsyncComponent(() => import('@/assets/icon/moon.svg'));

const data = ref<LoginModel>({
    username: '',
    password: ''
});

const setting = useSettingsStore();
const toastStore = useToastStore();

const router = useRouter();

const loginUser = () => {
    if (data.value.username === '' || data.value.password === '') {
        toastStore.addTimeout({
            message: 'Please fill in all fields',
            type: 'error'
        });
        return;
    }

    login(data.value).then(() => {
        toastStore.clear();
        router.push('/');
    }).catch((err) => {
        console.log(err);
        if (err.status === 401) {
            toastStore.addTimeout({
                message: 'Invalid username or password',
                type: 'error'
            });
        } else {
            toastStore.addTimeout({
                message: 'An error occurred',
                type: 'error'
            });
        }
    });

}


</script>


<style scoped lang="scss">
.view {
    display: flex;
    justify-content: center;
    align-items: center;
    //background-color: #f0f0f0;
    height: 100vh;
    width: 100vw;

    .toggle {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        cursor: pointer;
        z-index: 100;

        svg {
            width: 2rem;
            height: 2rem;
        }
    }
}

</style>
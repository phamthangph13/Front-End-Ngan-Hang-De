<template>
    <div class="panel">
        <div class="title">Login</div>
        <form @submit.prevent="emits('login', data)">
            <BaseFormInput v-model="data.username" label="Username" />
            <BaseFormInput v-model="data.password" label="Password" type="password" />
            <BaseButton type="submit" class="sumbit" >Login</BaseButton>
        </form>
        <small class="small">or login with</small>
        <BaseButton>
            Microsoft
            <template #icon>
                <FontAwesomeIcon :icon="faMicrosoft" />
            </template>
        </BaseButton>
    </div>

</template>


<script setup lang="ts">
import { ref, defineProps, watch, defineEmits, defineModel, defineAsyncComponent } from 'vue';
import type { PropType } from "vue";
import type { LoginModel } from "@/classes/auth";
import BaseFormInput from "@/components/bases/BaseFormInputText.vue";
import BaseButton from "@/components/bases/BaseButton.vue";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


// const BaseButton = defineAsyncComponent(() => import('@/components/bases/BaseButton.vue'));


const data = defineModel({
    type: Object as PropType<LoginModel>,
    default: {
        username: '',
        password: ''
    }
})

const emits = defineEmits(['login'])


</script>

<style>
:root {
    --auth-panel-background-color: #fff;
}

</style>

<style scoped lang="scss">
.panel {
    background-color: var(--auth-panel-background-color);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: "Bitter", serif;

    > .title {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }

    > form {
        display: flex;
        flex-direction: column;
        //gap: 0.25rem;
        > .sumbit {
            margin-top: 1rem;
        }
    }

    > .small {
        font-size: 0.75rem;
        text-align: center;
    }
}
</style>
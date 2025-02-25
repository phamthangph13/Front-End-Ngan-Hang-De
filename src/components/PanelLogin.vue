<template>
    <div class="panel">
        <div class="title-container">
            <h1 class="title">Welcome Back!</h1>
            <p class="subtitle">Please sign in to continue</p>
        </div>
        <form @submit.prevent="emits('login', data)">
            <BaseFormInput v-model="data.username" label="Username" class="input-field">
                <template #prefix>
                    <FontAwesomeIcon :icon="faUser" />
                </template>
            </BaseFormInput>
            <BaseFormInput v-model="data.password" label="Password" type="password" class="input-field">
                <template #prefix>
                    <FontAwesomeIcon :icon="faLock" />
                </template>
            </BaseFormInput>
            <div class="options">
                <label class="remember-me">
                    <input type="checkbox" v-model="rememberMe">
                    Remember me
                </label>
                <a href="#" class="forgot-password">Forgot Password?</a>
            </div>
            <BaseButton type="submit" class="submit">Sign In</BaseButton>
        </form>
        <div class="divider">
            <span>or continue with</span>
        </div>
        <BaseButton class="microsoft-btn">
            <template #icon>
                <FontAwesomeIcon :icon="faMicrosoft" />
            </template>
            Sign in with Microsoft
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
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const rememberMe = ref(false);

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
    --primary-color: #4A90E2;
    --text-color: #2C3E50;
    --border-color: #E5E9F2;
}
</style>

<style scoped lang="scss">
.panel {
    background-color: var(--auth-panel-background-color);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: "Inter", sans-serif;
    max-width: 400px;
    width: 100%;

    .logo-container {
        text-align: center;
        margin-bottom: 1rem;
        
        .logo {
            width: 80px;
            height: auto;
        }
    }

    .title {
        font-size: 1.75rem;
        font-weight: 700;
        text-align: center;
        color: var(--text-color);
    }

    .subtitle {
        text-align: center;
        color: #666;
        margin-top: -0.5rem;
        font-size: 0.9rem;
    }
    .title-container {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .input-field {
            :deep(input) {
                padding: 0.75rem 1rem;
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                transition: all 0.3s ease;

                &:focus {
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
                }
            }
        }

        .options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;

            .remember-me {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #666;

                input[type="checkbox"] {
                    accent-color: var(--primary-color);
                }
            }

            .forgot-password {
                color: var(--primary-color);
                text-decoration: none;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .submit {
            margin-top: 1rem;
            padding: 0.75rem;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;

            &:hover {
                background-color: darken(#4A90E2, 10%);
                transform: translateY(-1px);
            }
        }
    }

    .divider {
        display: flex;
        align-items: center;
        text-align: center;
        color: #666;
        font-size: 0.9rem;
        margin: 1rem 0;

        &::before,
        &::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid var(--border-color);
        }

        span {
            padding: 0 1rem;
        }
    }

    .microsoft-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background-color: #f8f9fa;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        color: var(--text-color);
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            background-color: #e9ecef;
        }

        :deep(svg) {
            font-size: 1.2rem;
            color: #00a4ef;
        }
    }
}
</style>
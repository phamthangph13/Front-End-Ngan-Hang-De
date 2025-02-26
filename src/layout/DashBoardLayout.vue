<template>
    <aside class="sidebar">
        <div class="logo">
    <img src="https://cmc-u.edu.vn/wp-content/uploads/2022/04/favicon-2.png" alt="Logo" />
</div>

        <ul class="top-links">
            <SidebarItem @click="settingStore.toggleSidebar()">
                <FontAwesomeIcon :icon="faBars" />
            </SidebarItem>
            <template v-for="link in topLinks" :key="link.name">
                <SidebarItem @click="() => { router.push(link.path) }" :data-active="isLinkActive(link.path)"
                             :closed="settingStore.settings?.isSidebarClose">
                    <component :is="link.component" />
                    <template #text>
                        {{ !link.noTranslate ? $t(link.name) : link.name }}
                    </template>
                </SidebarItem>
            </template>
        </ul>
        <ul class="bottom-links">
            <SidebarItem @click="settingStore.toggleDarkTheme($event)">
                <moonSvg v-show="settingStore.isDark" />
                <sunSvg v-show="!settingStore.isDark" />
                <template #text>
                    {{ !settingStore.isDark ? $t('theme.light') : $t('theme.dark') }}
                </template>

            </SidebarItem>
            <template v-for="link in bottomLinks" :key="link.name">
                <SidebarItem @click="() => { router.push(link.path) }" :data-active="isLinkActive(link.path)" :class="{ last: link?.last}"
                             :closed="settingStore.settings?.isSidebarClose">
                    <component :is="link.component" />
                    <template #text>
                        {{ !link.noTranslate ? $t(link.name) : link.name }}
                    </template>
                </SidebarItem>
            </template>
        </ul>
    </aside>
    <div class="body">
        <nav>
            <!-- <InputTextBar class="search" :placeholder="$t('search')">
                <template #icon>
                    <FontAwesomeIcon :icon="faMagnifyingGlass" />
                </template>
            </InputTextBar> -->
            <!-- <div class="lang">
                <select name="" id="" v-model="settingStore.settings.language">
                    <template v-for="item in configStore.config.supportedLanguages">
                        <option :value="item">{{ item }}</option>
                    </template>
                </select>
            </div> -->
            <div class="account" v-if="userData">
                <div class="avatar">
                    <img alt="avatar" v-if="userData?.avatar"
                        :src="`data:image/png;base64,${userData?.avatar}`"

                    />
                    <FontAwesomeIcon :icon="faUserCircle" v-else />
                </div>
                <div class="name">
                    {{ userData?.username }}
                </div>
                <div class="dropdown">
                    <ul>
                        <li @click="logoutUser">
                            {{ $t('auth.logout') }}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <section class="content">
            <slot name="default"></slot>
        </section>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import topLinks from '@/router/topLinks';
import bottomLinks from '@/router/bottomLinks';
import useSettingsStore from '@/stores/settings';
import { getMe } from "@/api/user";
import { logout } from "@/api/auth";
import userInfo from "@/types/userInfo";

//#region Components

import SidebarItem from '../components/SidebarItem.vue';
// import ToggleDarkLight from './components/ToggleDarkLight.vue';
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


const InputTextBar = defineAsyncComponent(() => import('@/components/bases/BaseInputTextBar.vue'));

const sunSvg = defineAsyncComponent(() => import('@/assets/icon/sun.svg'));
const moonSvg = defineAsyncComponent(() => import('@/assets/icon/moon.svg'));


//#endregion

const router = useRouter()
const settingStore = useSettingsStore()

const userData = ref<userInfo | null>(null)

const isLinkActive = (link: string) => {
	return router.currentRoute.value.path.startsWith(link)
}

const logoutUser = () => {
    logout();
    router.push({ name: 'auth' });
};

onMounted(() => {
    nextTick(async () => {
        await getMe().then((res) => {
            userData.value = res
        }).catch((err) => {
            console.log(err)
        })
    })
})




</script>

<style>


[data-web-app] {
	display: flex;
	flex-direction: row;
	height: 100vh;
	overflow: hidden;
}

</style>

<style scoped lang="scss">
@mixin top {
	padding: 0.5rem;
	height: 2rem;
}



.body {
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	overflow: hidden;
	z-index: 1;
	background-color: transparent;
	position: absolute;
	width: calc(100% - 11rem);
	right: 0;
	transition: width 0.3s ease;
	//font-family: Arial, sans-serif;
	// visibility: hidden;


	nav {
		@include top;
		background-color: transparent;
		// color: white;
		display: flex;

		.search {
			flex: 1;
		}

        .account {
            // self - flex to end
            margin-left: auto;
            //min-width: 4rem;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.11);
            border-radius: 999rem;
            padding: 0 0.5rem;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.25rem;

            position: relative;

            .avatar {
                width: 2rem;
                height: 2rem;
                border-radius: 999rem;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                //background-color: rgba(0, 0, 0, 0.11);
                font-size: 1.5rem;
                //color: #fff;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .dropdown {
                position: absolute;
                z-index: 1;
                top: 100%;
                right: 0;
                background-color: rgba(131, 131, 131, 0.53);
                border-radius: 0.25rem;
                visibility: hidden;

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;

                    li {
                        padding: 0.5rem;
                        background-color: rgba(0, 0, 0, 0.11);
                        border-radius: 0.25rem;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                        // no wrap text
                        white-space: nowrap;

                        &:hover {
                            background-color: rgba(0, 0, 0, 0.21);
                        }
                    }
                }
            }

            &:hover .dropdown {
                visibility: visible;
            }
        }
	}

	.content {
		flex: 1;
		overflow-x: hidden;
		// padding: 1rem;
		background-color: var(--app-content-bg-color);
		border-radius: 1.5rem 0 0 1.5rem;
		margin-bottom: 1rem;
		// mix-blend-mode: normal;
		display: flex;
		flex-direction: column;
        z-index: 0;
	}
}

.sidebar {
	width: 12.25rem;
	height: 100%;
	background-color: transparent;
	color: #000;
	transition: width 0.3s ease;
	overflow-y: hidden;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	z-index: 0;

	.logo img {
    width: 60%;  /* Điều chỉnh kích thước phù hợp */
    height: 60%; /* Đảm bảo tỷ lệ kích thước không bị méo */
    object-fit: contain; /* Đảm bảo logo không bị cắt xén */
    margin-top: 10px; /* Đẩy logo xuống một chút */
}


	@mixin links {
		list-style: none;
		padding-left: 1rem;
		margin: 0;
		// margin-top: 2rem;
		// overflow: hidden;
		// width: 100%;
	}

	.top-links {
		@include links;
		// margin-bottom: auto;
		flex: 1;
		// padding: 1rem;

		li:first-child {
			background-image: none;
		}
	}

	.bottom-links {
		@include links;
		margin-bottom: 1rem;
		padding-top: 1rem;
		overflow: hidden;
	}

}



.closed {
	.body {
		width: calc(100% - 4rem);
	}
	// .sidebar {
	// 	width: 4rem;
	// }
}
</style>

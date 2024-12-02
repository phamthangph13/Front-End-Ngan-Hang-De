<template>
	<template v-if="isLoaded">
        <component :is="$route.meta.layout || 'div'">
            <router-view></router-view>
        </component>
	
		<DevDialog></DevDialog>
<!--        <div popover>test</div>-->
        <BaseToastContainer :items="toastStore.toasts" v-if="!isRouterReload"></BaseToastContainer>
	</template>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, nextTick } from 'vue'
import useSettingsStore from '@/stores/settings';
import useConfigStore from '@/stores/config';
import useToastStore from '@/stores/toast';
import {onBeforeRouteUpdate} from "vue-router";






//#region Components
const DevDialog = defineAsyncComponent(() => import('@/components/DevDialog.vue'));
const BaseToastContainer = defineAsyncComponent(() => import('@/components/bases/BaseToastContainer.vue'));

//#endregion


const settingStore = useSettingsStore()
const configStore = useConfigStore()
const toastStore = useToastStore()

const isLoaded = ref(false)



onMounted(() => {
	nextTick(async() => {
		await configStore.loadConfig()
		await settingStore.loadLanguage()

		isLoaded.value = true

        // toastStore.addTimeout({
        //     message: 'This is a toast',
        //     type: 'success'
        // })

	})
})

const isRouterReload = ref(false)

// onBeforeRouteUpdate(() => {
//     isRouterReload.value = true
//     setTimeout(() => {
//         isRouterReload.value = false
//     }, 0)
// })


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
	font-family: Arial, sans-serif;
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
            width: 8rem;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.11);
            border-radius: 999rem;
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

	.logo {
		@include top;
		// background-color: #333;
		// color: white;
		// text-align: center;
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

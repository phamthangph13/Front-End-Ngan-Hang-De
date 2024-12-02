<template>
    <div class="view">
        <RouterView>
        </RouterView>
<!--            <template #default="{Component}">-->
<!--                <component :is="Component" mode="add" v-if="$router.currentRoute.value.name === 'question-add-single'"/>-->
<!--                <component :is="Component" mode="edit" v-else-if="$router.currentRoute.value.name === 'question-edit'"/>-->
<!--                <component :is="Component" mode="view" v-else/>-->
<!--            </template>-->
    </div>

</template>

<script setup lang="ts">



</script>


<style scoped lang="scss">
.view {
    height: 100%;
    overflow-y: auto;
    // padding: 10px;
}

</style>
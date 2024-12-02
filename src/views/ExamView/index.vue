<template>
    <div class="view">
        <RouterView>
            <template #default="{Component}">
                <component :is="Component" />
            </template>
        </RouterView>
    </div>
</template>


<script setup lang="ts">
</script>


<style scoped lang="scss">
.view {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

</style>
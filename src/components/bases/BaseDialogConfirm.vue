<script setup lang="ts">

import BaseDialog from "@/components/bases/BaseDialog.vue";
import BaseButton from "@/components/bases/BaseButton.vue";
</script>

<template>
    <BaseDialog>
        <template #header>
            <h2>Confirm</h2>
        </template>
        <template #body>
            <p>Are you sure you want to delete this item?</p>
        </template>
        <template #footer>
            <BaseButton @click="closeDialog" class="">
                Cancel
            </BaseButton>
            <BaseButton @click="deleteItem">
                OK
            </BaseButton>
        </template>
    </BaseDialog>
</template>

<style scoped lang="scss">

</style>
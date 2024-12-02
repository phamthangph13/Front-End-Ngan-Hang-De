<template>
    <h2 class="title">{{ $t("crud.add", { name: $t("question.title")}) }}</h2>
    <RouterView v-bind="{mode: mode}" />
</template>

<script setup lang="ts">

defineProps({
    mode: String
})

</script>


<style scoped lang="scss">
.title {
    margin: 10px 10px 0 10px;
}
</style>
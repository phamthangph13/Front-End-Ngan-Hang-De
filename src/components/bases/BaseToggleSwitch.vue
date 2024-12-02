<script setup lang="ts">

const isChecked = defineModel({
    type: Boolean,
    default: false
})
</script>

<template>
    <label class="switch">
        <input type="checkbox" v-model="isChecked">
        <span class="slider"></span>
    </label>
</template>

<style scoped lang="scss">
.switch {
    --button-width: 1.8em;
    --button-height: 1em;
    --toggle-diameter: 1em;
    --toggle-wider: 2em;
    --button-toggle-offset: calc((var(--button-height) - var(--toggle-diameter)) / 2);
    --toggle-shadow-offset: 10px;
    --color-disabled: #cccccc;
    --color-enabled: #4296f4;
    .slider {
        display: inline-block;
        width: var(--button-width);
        height: var(--button-height);
        background-color: var(--color-disabled);
        border-radius: calc(var(--button-height) / 2);
        position: relative;
        transition: 0.3s all ease-in-out;

        &::after {
            content: "";
            display: inline-block;
            width: var(--toggle-diameter);
            height: var(--toggle-diameter);
            background-color: #fff;
            border-radius: calc(var(--toggle-diameter) / 2);
            position: absolute;
            top: var(--button-toggle-offset);
            transform: translateX(var(--button-toggle-offset));
            box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
            transition: 0.3s all ease-in-out;
        }
    }
}


.switch input[type="checkbox"]:checked + .slider {
    background-color: var(--color-enabled);
}

.switch input[type="checkbox"]:checked + .slider::after {
    transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
    box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
}

.switch input[type="checkbox"] {
    display: none;
}

.switch input[type="checkbox"]:active + .slider::after {
    width: var(--toggle-wider);
}

.switch input[type="checkbox"]:checked:active + .slider::after {
    transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
}
</style>
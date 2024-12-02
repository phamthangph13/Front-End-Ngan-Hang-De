<template>
    <div class="base">
        <slot :toogle="toggleDark">
            <button @click="toggleDark" class="toggle">
                <span v-if="!isDark">🌞</span>
                <span v-else>🌚</span>
            </button>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { nextTick } from 'vue'

const isDark = useDark()

const toggleDark = (event: MouseEvent) => {
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
        isDark.value = !isDark.value
        return
    }
    // Add the theme-transition class to the root element to avoid conflicts
    document.documentElement.classList.add('theme-transition')
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    )
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
    })
    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
            {
                clipPath: isDark.value
                    ? clipPath.reverse()
                    : clipPath,
            },
            {
                duration: 1000,
                easing: 'ease-in-out',
                pseudoElement: isDark.value
                    ? '::view-transition-old(root)'
                    : '::view-transition-new(root)',
            },
        )
    }).finally(() => {
        // Remove the class precisely after the transition
        transition.finished.then(() => {
            document.documentElement.classList.remove('theme-transition')
        })
    })
}



</script>
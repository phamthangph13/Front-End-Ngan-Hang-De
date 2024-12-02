// import { useDark } from '@vueuse/core'
// import type {BasicColorSchema} from '@vueuse/core'
import { nextTick, ref } from 'vue'
import type { WritableComputedRef } from 'vue'




const toggleDark = (isDark: WritableComputedRef<boolean>, event: MouseEvent) => {
    // @ts-expect-error experimental API
    // Check if the browser supports the experimental Transition API
    const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
        isDark.value = !isDark.value
        return
    }
    // Add the theme-transition class to the root element to avoid conflicts
    document.documentElement.classList.add('theme-transition')
    // Get the mouse position
    const x = event.clientX
    const y = event.clientY
    // Get the viewport size
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    )
    // @ts-expect-error: Transition API
    // Start the transition
    const transition = document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
    })
    // Animate the clip-path
    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        // start the animation
        document.documentElement.animate(
            {
                // if the theme is dark, reverse the clip-path
                clipPath: isDark.value
                    ? clipPath.reverse()
                    : clipPath,
            },
            {
                duration: 400,
                easing: 'ease-in-out',
                // pseudoElement: 'root' is not supported in Safari
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


export default toggleDark
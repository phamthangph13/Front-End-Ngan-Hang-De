<template>
    <div class="drawio" ref="mainRef" :data-show="isShow">
        <iframe ref="iframeRef" :src="props.dramIoSrc" frameborder="0" v-if="isShow"></iframe>
        <button @click="isShow = !isShow" v-if="showButton">show</button>
        <div ref="testRef" v-html="imgSrc" v-if="showTest">
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, DefineProps, watch, defineEmits, onBeforeMount, defineExpose } from 'vue';

const props = defineProps({
    dramIoSrc: {
        type: String,
        default: 'https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&configure=1',
    },
    imgSrc: {
        type: String,
        default: '',
    },
    showTest: {
        type: Boolean,
        default: false
    },
    showButton: {
        type: Boolean,
        default: true
    }
})

const emits = defineEmits(['update:src']);

const isShow = ref<boolean>(false);
const iframeRef = ref<HTMLIFrameElement | null>(null);
const mainRef = ref<HTMLDivElement | null>(null);

const testRef = ref<HTMLElement | null>(null)

const close = () => {
    isShow.value = false;

    window.removeEventListener('message', receive);
}

const receive = (evt: any) => {
    console.log(evt);
    if (evt.origin !== "https://embed.diagrams.net") return;
    if (evt.data && evt?.data.length > 0) {
        var msg = JSON.parse(evt.data);

        if (msg.event == 'configure') {
            // Configuration example
            iframeRef.value?.contentWindow?.postMessage(JSON.stringify({
                action: 'configure',
                config: { defaultFonts: ["Humor Sans", "Helvetica", "Times New Roman"] }
            }), '*');
        }
        if (msg.event == 'init') {
            iframeRef.value?.contentWindow?.postMessage(JSON.stringify({
                action: 'load',
                autosave: 1, xmlpng: props.imgSrc
            }), '*');
        }
        else if (msg.event == 'export') {
            // Extracts SVG DOM from data URI to enable links
            var src = msg.data
            console.log(`<img src="${src}" alt="draw.io" />`);
            emits('update:src', src);
            close();
        }
        else if (msg.event == 'autosave') {

        }
        else if (msg.event == 'save') {
            iframeRef.value?.contentWindow?.postMessage(JSON.stringify({action: 'export',
							format: 'xmlsvg', xml: msg.xml, spin: 'Updating page'}), '*');
        }
        else if (msg.event == 'exit') {
            close();
        }
    }
}

const toggle = () => {
    isShow.value = !isShow.value;
}

watch(() => isShow.value, (newValue) => {
    if (newValue) {
        window.addEventListener('message', receive);
    } else {
        close();
    }
})

defineExpose({
    toggle, isShow
})

</script>


<style scoped lang="scss">
.drawio {

    width: 100%;
    height: 100%;
    background-color: white;

    iframe {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
}
</style>
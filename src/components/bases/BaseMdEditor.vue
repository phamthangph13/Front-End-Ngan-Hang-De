<template>
    <MdEditor v-model="text" :toolbars language="en-US" :placeholder>
        <template #defToolbars>
            <OriginalImg>
            </OriginalImg>
            <DrawIOEtension/>
            <ExportPDF :modelValue="text"></ExportPDF>
        </template>
    </MdEditor>
</template>


<script setup lang="ts">

import { ref, onMounted, watch, defineProps, defineEmits, defineAsyncComponent, defineModel } from 'vue';
import type { PropType } from 'vue';

// import { MdEditor } from 'md-editor-v3';
const MdEditor = defineAsyncComponent(() => import('md-editor-v3').then((module) => module.MdEditor));
import type { ToolbarNames } from 'md-editor-v3';
// import { OriginalImg, ExportPDF } from '@vavt/v3-extension';
const OriginalImg = defineAsyncComponent(() => import('@vavt/v3-extension').then((module) => module.OriginalImg));
const ExportPDF = defineAsyncComponent(() => import('@vavt/v3-extension').then((module) => module.ExportPDF));
import 'md-editor-v3/lib/style.css';
import '@vavt/v3-extension/lib/asset/ExportPDF.css';
import '@vavt/v3-extension/lib/asset/OriginalImg.css';

import DrawIOEtension from '../MdEditorDrawIo.vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Type here...'
    }
})


const text = defineModel({
    type: String,
    required: true
})




const toolbars: ToolbarNames[] = [
    'bold',
    'underline',
    'italic',
    '-',
    'strikeThrough',
    //   'title',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task', // ^2.4.0
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '-',
    'revoke',
    'next',
    //   'save',
    '-',
    0,
    1,
    '-',
    2,
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'previewOnly',
    'htmlPreview',
    'catalog',
    //   'github',


];

</script>



<style></style>



<style scoped lang="scss"></style>
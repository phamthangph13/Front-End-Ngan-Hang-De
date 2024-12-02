<template>
    <div>
        <Editor :init="init2" v-model="dataHTML" :id="id" />
        <!-- <div v-html="dataHTML"></div>
        <div v-html="dataInnerHTML"></div> -->
    </div>

</template>


<script setup lang="ts">
import { ref, defineEmits, defineProps, watch, defineExpose, onMounted, defineAsyncComponent } from 'vue'


// Load the TinyMCE editor
import 'tinymce/tinymce'
import 'tinymce/icons/default/icons'
import 'tinymce/themes/silver/theme'
import 'tinymce/models/dom/model'
import 'tinymce/skins/ui/oxide/skin.css'

// main Plugins
import 'tinymce/plugins/lists/plugin'
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/image/plugin'
import 'tinymce/plugins/table/plugin'
import 'tinymce/plugins/code/plugin'
import 'tinymce/plugins/wordcount/plugin'
import 'tinymce/plugins/save/plugin'
import 'tinymce/plugins/autoresize/plugin'
import 'tinymce/plugins/advlist/plugin'

// custom plugins
import '@wiris/mathtype-tinymce6/'

// import tinymce from 'tinymce/tinymce'


const Editor = defineAsyncComponent(() => import('@tinymce/tinymce-vue'))

import getInit from '@/utils/tinymceutils'


const props = defineProps({
    value: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        required: false
    },
    init: {
        type: Object,
        default: null
    }
})

const init2 = props.init ? props.init : getInit()

const emits = defineEmits(['update:value'])

const dataHTML = ref(props.value)

watch(() => dataHTML.value, (newvalue) => {
    emits('update:value', dataHTML.value)
})


// // set the value of the editor to the value of the prop
watch(() => props.value, (newvalue) => {
    dataHTML.value = newvalue
})

// // emit the value of the editor when it changes
// watch(() => dataHTML.value, (newvalue) => {
//     emits('update:value', newvalue)
// })

// onMounted(() => {
//     tinyeditor.value = props.id ? tinymce.get(props.id) : null;
//     // editorhtml.value = tinymce.DOM.getAttrib(props.id);
// })

// defineExpose({
//     editor: tinyeditor,
//     // html: editorhtml
// })



</script>
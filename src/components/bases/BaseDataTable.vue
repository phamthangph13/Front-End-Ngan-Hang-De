<template>
    <EasyDataTable :headers :items v-model:items-selected="itemsSelected" :rows-items="[5, 10, 15, 20]" :rows-per-page="10"   buttons-pagination>
        <!-- <template v-for="(slot, index) of Object.keys($slots)" v-slot:[slot]="{ key, checkbox, ...item }" >
            <slot :name="slot" v-bind="item" ></slot>
        </template> -->
    </EasyDataTable>
</template>


<script setup lang="ts">
import { ref, defineProps, onMounted, nextTick, watch, defineExpose, defineEmits, type PropType } from 'vue';
import EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import type { Header, Item } from "vue3-easy-data-table";
// import TagBaseIpt from '@/components/BaseTagIpt2.vue';




const props = defineProps({
    headers: {
        type: Array as PropType<Header[]>,
        required: true
    },
    data: {
        type: Array as PropType<Item[]>,
        required: true
    },
    selected: {
        type: Array as PropType<Item[]>,
        default: () => null,
    }
})


const items = ref<Item[]>(props.data)

const itemsSelected = ref<Item[]>(props.selected)

const iptRef = ref<InstanceType<typeof TagBaseIpt> | null>(null)



const emit = defineEmits(['update:selected'])


const search = (tags: string[] | null) => {
    


    if (!tags) {
        items.value = props.data
        return
    }
    
    const KeyTags = tags.filter(tag => tag.includes(':') && !tag.includes('::'))

    const NormalTags = tags.filter(tag => !tag.includes(':'))

    items.value = props.data.filter(item => {
        // console.log(Object.values(item))
        return NormalTags.every(tag => {
            // check if any value of item contains tag
            return Object.values(item).some(value => {
                // change to string
                if (typeof value !== 'string') {
                    value = JSON.stringify(value)
                }
                // lowercase for case-insensitive
                return value.toLowerCase().includes(tag.toLowerCase())
            })
        })
    })

    items.value = items.value.filter(item => {
        return KeyTags.every(tag => {
            // split key and value
            const [key, value] = tag.split(':')
            // console.log(key, value)
            // convert item[key] to string using == operator
            return item[key] == value
        })
    })

}


watch(() => itemsSelected.value, (newVal) => {
    emit('update:selected', newVal)
})

watch(() => props.selected, (newVal) => {
    itemsSelected.value = newVal
})

watch(() => props.data, (newVal) => {
    search(iptRef.value?.tags ?? null)
})

watch(() => iptRef.value?.tags, (newVal) => {
    search(newVal ?? null)
}, {deep: true})








</script>

<style scoped lang="scss">
// .component {
//     // font-family: "Comfortaa", sans-serif;
//     --border-color: #b1b0b0;
//     --padding: 10px;
// }

</style>
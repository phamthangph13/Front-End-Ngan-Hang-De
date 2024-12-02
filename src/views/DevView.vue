<template>
    <div class="dev-view">


        <div style="margin: 10px;">
            <h2 style="margin: 0;">🚧 This is dev page! Will be removed in production 🚧</h2>
            <small>Enjoy! Thoải mái sự kiểm thử và sáng tạo</small>
        </div>

<!--        <div>-->
<!--            <CustomButton>-->
<!--                <template #icon>-->
<!--                    <FontAwesomeIcon :icon="faPlus"></FontAwesomeIcon>-->
<!--                </template>-->
<!--            </CustomButton>-->
<!--        </div>-->


<!--        input accept image-->
<!--        <input type="file" name="" id="" accept="image/*" ref="fileRef">-->
<!--        <BaseButton @click="uploadImage">-->
<!--            Upload Image-->
<!--        </BaseButton>-->

<!--        <BaseFormSelect label="Select" :list="['1', '2', '3']" />-->

<!--        <BaseFormInputText/>-->

<!--        <BaseToastItem></BaseToastItem>-->

<!--        <BaseDialog ref="dialogRef">-->
<!--            <template #body>-->
<!--        <BaseButton @click="toastsRef?.addAToast">Toast</BaseButton>-->

<!--            </template>-->
<!--        </BaseDialog>-->
<!--        <BaseButton @click="dialogRef?.toggle">Show Dialog</BaseButton>-->
<!--        <AlwayTop>Test</AlwayTop>-->

<!--        <BaseToggleSwitch></BaseToggleSwitch>-->

        <BaseTabWarpper>
            <BaseTabItem title="Test sortable" _key="tab1">
                <div ref="el">
                    <div v-for="item in set" :key="item.id">
                        {{ item.name }}
                    </div>
                </div>
            </BaseTabItem>
            <BaseTabItem title="Test UploadImage" _key="tab2">
                <input type="file" name="" id="" accept="image/*" ref="fileRef">
                <BaseButton @click="uploadImage">
                    Upload Image
                </BaseButton>
            </BaseTabItem>
            <BaseTabItem title="Tab 3" _key="tab3">
                <p>Tab 3</p>
            </BaseTabItem>
        </BaseTabWarpper>

    </div>
</template>

<script setup lang="ts">

import {ref, onMounted, defineAsyncComponent, useTemplateRef, computed} from 'vue'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faArrowRotateLeft, faPlus, faTable, faBars } from '@fortawesome/free-solid-svg-icons';


import BaseButton from "@/components/bases/BaseButton.vue";
// import BaseFormSelect from "@/components/bases/BaseFormSelect.vue";
// import BaseFormInputText from "@/components/bases/BaseFormInputText.vue";
import BaseDialog from "@/components/bases/BaseDialog.vue";
import BaseToggleSwitch from "@/components/bases/BaseToggleSwitch.vue";
import BaseTabWarpper from "@/components/bases/BaseTabWarpper.vue";
import BaseTabItem from "@/components/bases/BaseTabItem.vue";



import { useSortable } from '@vueuse/integrations/useSortable'


const el = ref<HTMLElement | null>(null)

const set = ref(new Set([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }]))

const list = computed({
    get: () => Array.from(set.value),
    set: (val) => {
        set.value = new Set(val)
    },
})

// const list = ref([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }])


const { option } = useSortable(el, list, {
    animation: 100,
})

// option('animation', 200)

// list.value = []
// list.value.push({ id: 2, name: 'b' })
// list.value.push({ id: 1, name: 'a' })
// list.value.push({ id: 3, name: 'c' })
// list.value.push({ id: 4, name: 'd' })

import {uploadAvatar} from "@/api/user";
const fileRef = ref(null);

const uploadImage = async () => {
    console.log(fileRef.value.files[0]);
    const file = fileRef.value.files[0];
    if (!file) return;
    await uploadAvatar(file);
}



</script>



<style scoped lang="scss">


</style>
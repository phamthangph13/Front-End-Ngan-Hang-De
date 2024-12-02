<script setup lang="ts">
import BaseTagObject, {ObjKey} from "@/components/bases/BaseTagObject.vue";
import {PropType} from "vue";
import Exam from "@/classes/exam";

const props = defineProps({
    item: {
        type: Object as PropType<Exam>,
        required: true
    }
});

const tagsKey : ObjKey[] = [
    // { name: 'id', value: 'id', clickable: true },
    { name: 'duration', value: 'duration', clickable: true },
    { name: 'subject', value: 'subject.name', clickable: true },
    { name: 'knowledge', value: 'knowledgeScope', clickable: true, hideName: true }
]

const bodyKeys : ObjKey[] = [
    { name: 'title', value: 'title' },
    { name: 'questionCount', value: 'questionCount' }
]

</script>

<template>
  <BaseTagObject :item :tag-keys="tagsKey" :body-keys="bodyKeys">
      <template #body-title>
            <div>
                <span>Title</span> :
                <span>{{ item.title }}</span>
            </div>
      </template>
      <template #body-questionCount>
          <div>
                <span>Question Count</span> :
                <span>{{ item.questionIds.length }}</span>
          </div>
      </template>
      <template #foot>
          <slot name="foot" :item="item"></slot>
      </template>
  </BaseTagObject>
</template>

<style scoped lang="scss">

</style>
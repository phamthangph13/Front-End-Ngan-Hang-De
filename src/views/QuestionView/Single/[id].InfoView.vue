<template>
    <TagsNQuestion :item="data" elem="div" />
    <div class="actions">
      <BaseButton @click="editItem" class="action-btn edit-btn">
        <template #icon>
          <FontAwesomeIcon :icon="faPencil" />
        </template>
        {{ $t('crud.edit') }}
      </BaseButton>
      <BaseButton @click="deleteItem" class="action-btn delete-btn">
        <template #icon>
          <FontAwesomeIcon :icon="faTrash" />
        </template>
        {{ $t('crud.delete') }}
      </BaseButton>
      <BaseButton @click="cloneItem" class="action-btn clone-btn">
        <template #icon>
          <FontAwesomeIcon :icon="faCopy" />
        </template>
        Nhân bản
      </BaseButton>
      <BaseButton @click="generateItem" class="action-btn generate-btn">
        <template #icon>
          <SparkIcon width="1.25rem" height="1.25rem" />
        </template>
        Tạo câu hỏi tương tự
      </BaseButton>
    </div>
    <GenerateQuestionAIDialog ref="dialogRef" @reload="backToList" />
  </template>
  
  <script setup lang="ts">
  import { ref, defineAsyncComponent, defineModel } from 'vue';
  import { deleteQuestion } from '@/api/question';
  import { useRouter } from 'vue-router';
  
  // #region Components
  import Question from '@/classes/question';
  import BaseButton from "@/components/bases/BaseButton.vue";
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faTrash, faPencil, faCopy } from '@fortawesome/free-solid-svg-icons';
  import SparkIcon from '@/assets/icon/spark-svgrepo-com.svg';
  const TagsNQuestion = defineAsyncComponent(() => import('@/components/TagsNQuestion.vue'));
  const GenerateQuestionAIDialog = defineAsyncComponent(() => import('@/components/GenerateQuestionAIDialog.vue'));
  // #endregion
  
  const data = defineModel({
    type: Question,
    required: true,
  });
  
  const router = useRouter();
  
  const dialogRef = ref<InstanceType<typeof GenerateQuestionAIDialog> | null>(null);
  
  const deleteItem = async () => {
    await deleteQuestion(data.value.id).then(() => {
      backToList();
    });
  };
  
  const editItem = () => {
    router.push({
      name: 'question-edit-single',
      params: { id: data.value.id },
    });
  };
  
  const cloneItem = () => {
    router.push({
      name: 'question-add-single',
      query: { clone: data.value.id },
    });
  };
  
  const generateItem = () => {
    dialogRef.value?.show(data.value);
  };
  
  const backToList = () => {
    router.push({
      name: 'question-list',
    });
  };
  </script>
  
  <style scoped lang="scss">
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
    gap: 1.5rem;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
  
    &.edit-btn {
      background-color: #007bff;
      color: #fff;
  
      &:hover {
        background-color: #0056b3;
      }
    }
  
    &.delete-btn {
      background-color: #dc3545;
      color: #fff;
  
      &:hover {
        background-color: #c82333;
      }
    }
  
    &.clone-btn {
      background-color: #28a745;
      color: #fff;
  
      &:hover {
        background-color: #218838;
      }
    }
  
    &.generate-btn {
      background-color: #6c757d;
      color: #fff;
  
      &:hover {
        background-color: #5a6268;
      }
    }
  
    /* Icon style */
    svg {
      margin-right: 0.5rem;
    }
  }
  
  /* Custom Animation for Button Hover Effects */
  .action-btn {
    position: relative;
    overflow: hidden;
  
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300%;
      height: 300%;
      background-color: rgba(0, 0, 0, 0.1);
      transition: width 0.4s, height 0.4s, top 0.4s, left 0.4s;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  
    &:hover::before {
      width: 0;
      height: 0;
      top: 50%;
      left: 50%;
    }
  }
  </style>
  
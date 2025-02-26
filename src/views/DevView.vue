<template>
    <div class="dev-view">
      <div class="header">
        <h2>🚧 This is dev page! Will be removed in production 🚧</h2>
        <small>Enjoy! Thoải mái sự kiểm thử và sáng tạo</small>
      </div>
  
      <BaseTabWarpper class="tab-wrapper">
        <BaseTabItem title="Test sortable" _key="tab1">
          <div ref="el" class="sortable-list">
            <div v-for="item in set" :key="item.id" class="sortable-item">
              {{ item.name }}
            </div>
          </div>
        </BaseTabItem>
        <BaseTabItem title="Test UploadImage" _key="tab2">
          <div class="upload-section">
            <input type="file" accept="image/*" ref="fileRef" class="upload-input" />
            <BaseButton @click="uploadImage">
              Upload Image
            </BaseButton>
          </div>
        </BaseTabItem>
        <BaseTabItem title="Tab 3" _key="tab3">
          <p class="tab-content">Tab 3 content goes here...</p>
        </BaseTabItem>
      </BaseTabWarpper>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import BaseButton from "@/components/bases/BaseButton.vue";
  import BaseTabWarpper from "@/components/bases/BaseTabWarpper.vue";
  import BaseTabItem from "@/components/bases/BaseTabItem.vue";
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { uploadAvatar } from "@/api/user";
  
  const el = ref<HTMLElement | null>(null)
  const set = ref(new Set([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }]))
  const list = computed({
    get: () => Array.from(set.value),
    set: (val) => {
      set.value = new Set(val)
    },
  })
  const { option } = useSortable(el, list, {
    animation: 100,
  })
  
  const fileRef = ref(null);
  const uploadImage = async () => {
    if (!fileRef.value || !fileRef.value.files || !fileRef.value.files[0]) return;
    const file = fileRef.value.files[0];
    await uploadAvatar(file);
  }
  </script>
  
  <style scoped lang="scss">
  @use "sass:color";
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  $primary-color: #3498db;
  $secondary-color: #2ecc71;
  $text-color: #2c3e50;
  $background-color: #ecf0f1;
  $card-bg: #fff;
  $border-radius: 8px;
  
  .dev-view {
    font-family: 'Roboto', sans-serif;
    padding: 2rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    min-height: 100vh;
    animation: fadeIn 0.8s ease-in-out;
  
    .header {
      text-align: center;
      margin-bottom: 2rem;
      h2 {
        font-size: 1.5rem;
        margin: 0;
        padding: 0.5rem 1rem;
        background: $primary-color;
        color: #fff;
        border-radius: $border-radius;
        display: inline-block;
        animation: slideDown 1s ease-out;
      }
      small {
        display: block;
        margin-top: 0.5rem;
        color: $text-color;
      }
    }
  
    .tab-wrapper {
      background: $card-bg;
      border-radius: $border-radius;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      animation: zoomIn 0.5s ease-in-out;
    }
  
    .sortable-list {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  
      .sortable-item {
        padding: 0.75rem 1rem;
        background: $background-color;
        border: 1px solid color.scale($background-color, $lightness: 10%);
        border-radius: $border-radius;
        cursor: grab;
        transition: transform 0.3s, box-shadow 0.3s;
  
        &:hover {
          transform: translateX(10px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
  
    .upload-section {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
  
      .upload-input {
        border: 2px dashed $primary-color;
        padding: 1rem;
        border-radius: $border-radius;
        width: 100%;
        max-width: 300px;
        background: transparent;
        transition: border-color 0.3s;
        &:hover {
          border-color: $secondary-color;
        }
      }
    }
  
    .tab-content {
      padding: 1rem;
      color: $text-color;
    }
  }
  
  /* Keyframes for animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes zoomIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  </style>
  
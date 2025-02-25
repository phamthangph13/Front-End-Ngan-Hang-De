<template>
    <div class="view">
      <div class="list">
        <div class="header">
          <h2>{{ $t('crud.list', { name: $t('subject') }) }}</h2>
          <div class="actions">
            <BaseButton @click="subjectStore.fetchSubjects">Refresh</BaseButton>
          </div>
        </div>
        <div v-if="subjectStore.loading" class="loading">Loading...</div>
        <div v-if="subjectStore.subjects" class="subjects-grid">
          <div v-for="subject in subjectStore.subjects" :key="subject.id" class="subject-card">
            <h3>{{ subject.name }}</h3>
            <p class="description">{{ subject.description }}</p>
            <div class="card-actions">
              <BaseButton variant="secondary" size="small">Edit</BaseButton>
              <BaseButton variant="danger" size="small">Delete</BaseButton>
            </div>
          </div>
        </div>
      </div>
      <div class="add">
        <h2>{{ $t('crud.add', { name: $t('subject') }) }}</h2>
        <fieldset>
          <BaseFormInputText v-model="subjectObj.name" label="Name" />
          <BaseFormTextArea v-model="subjectObj.description" label="Description" />
        </fieldset>
        <BaseButton @click="addSubjectHandler">{{ $t('crud.add', { name: $t('subject') }) }}</BaseButton>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Subject from "@/classes/subject";
  import { ref, defineAsyncComponent, onMounted } from "vue";
  import { useSubjectStore } from "@/stores/subjects";
  import { addSubject } from "@/api/subject";
  
  const BaseFormInputText = defineAsyncComponent(() => import("@/components/bases/BaseFormInputText.vue"));
  const BaseFormTextArea = defineAsyncComponent(() => import("@/components/bases/BaseFormTextArea.vue"));
  const BaseButton = defineAsyncComponent(() => import("@/components/bases/BaseButton.vue"));
  
  const subjectStore = useSubjectStore();
  
  const subjectObj = ref<Subject>(
    new Subject(null, "", "", null)
  );
  
  onMounted(() => {
    subjectStore.fetchSubjects();
  });
  
  const addSubjectHandler = () => {
    addSubject(subjectObj.value)
      .then(() => {
        subjectStore.fetchSubjects();
        subjectObj.value.name = "";
        subjectObj.value.description = "";
      })
      .catch((error) => {
        console.error(error);
      });
  };
  </script>
  
  <style scoped lang="scss">
  .view {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 2rem;
    background-color: #f0f2f5;
    min-height: 100vh;
  
    // Card style cho cả 2 khối
    .list,
    .add {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      flex: 1;
    }
  
    // Style cho danh sách môn học
    .list {
      display: flex;
      flex-direction: column;
  
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
  
        h2 {
          font-size: 1.5rem;
          color: #333;
          margin: 0;
        }
      }
  
      .actions {
        button {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
      }
  
      .loading {
        text-align: center;
        color: #777;
        padding: 1rem 0;
      }
      
      // Style cho grid môn học
      .subjects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1rem;
        
        .subject-card {
          background-color: #f9f9f9;
          border-radius: 6px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          h3 {
            font-size: 1.1rem;
            margin: 0 0 0.5rem 0;
            color: #333;
          }
          
          .description {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 3em;
          }
          
          .card-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
            
            button {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        }
      }
    }
  
    // Style cho form thêm môn học
    .add {
      h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
      }
  
      fieldset {
        border: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
  
      BaseButton {
        margin-top: 1rem;
        align-self: flex-end;
      }
    }
  }
  
  // Responsive breakpoints
  @media (max-width: 1024px) {
    .view .list .subjects-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .view {
      flex-direction: column;
    }
    
    .view .list .subjects-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .view .list .subjects-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
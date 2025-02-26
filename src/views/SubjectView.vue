<template>
  <div class="view">
    <div class="list">
      <div class="header">
        <h2>{{ $t('crud.list', { name: $t('subject') }) }}</h2>
        <div class="actions">
          <BaseButton @click="subjectStore.fetchSubjects" class="refresh-btn">
            <span>Refresh</span>
            <i class="material-icons">refresh</i>
          </BaseButton>
        </div>
      </div>
      <div v-if="subjectStore.loading" class="loading">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>
      <div v-else-if="subjectStore.subjects && subjectStore.subjects.length === 0" class="empty-state">
        <div class="empty-icon">📚</div>
        <p>No subjects found. Add your first subject!</p>
      </div>
      <div v-else-if="subjectStore.subjects" class="subjects-grid">
        <div v-for="subject in subjectStore.subjects" :key="subject.id" class="subject-card">
          <div class="card-header">
            <h3>{{ subject.name }}</h3>
            <div class="subject-badge">Subject</div>
          </div>
          <p class="description">{{ subject.description }}</p>
          <div class="card-actions">
            <BaseButton variant="secondary" size="small" class="edit-btn">
              <i class="material-icons">edit</i>
              <span>Edit</span>
            </BaseButton>
            <BaseButton variant="danger" size="small" class="delete-btn">
              <i class="material-icons">delete</i>
              <span>Delete</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <div class="add">
      <div class="form-header">
        <h2>{{ $t('crud.add', { name: $t('subject') }) }}</h2>
      </div>
      <form @submit.prevent="addSubjectHandler">
        <fieldset>
          <BaseFormInputText v-model="subjectObj.name" label="Name" placeholder="Enter subject name" />
          <BaseFormTextArea 
            v-model="subjectObj.description" 
            label="Description" 
            placeholder="Enter subject description"
            rows="5"
          />
        </fieldset>
        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="resetForm">Reset</BaseButton>
          <BaseButton type="submit" variant="primary">
            <i class="material-icons">add</i>
            {{ $t('crud.add', { name: $t('subject') }) }}
          </BaseButton>
        </div>
      </form>
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

const resetForm = () => {
  subjectObj.value.name = "";
  subjectObj.value.description = "";
};

const addSubjectHandler = () => {
  if (!subjectObj.value.name.trim()) {
    alert("Please enter a subject name");
    return;
  }
  
  addSubject(subjectObj.value)
    .then(() => {
      subjectStore.fetchSubjects();
      resetForm();
      // Hiển thị thông báo thành công (có thể thêm toast notification)
    })
    .catch((error) => {
      console.error(error);
      // Hiển thị thông báo lỗi (có thể thêm toast notification)
    });
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.view {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem;
  background-color: #f7f9fc;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;

  // Card style cho cả 2 khối
  .list,
  .add {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    padding: 1.75rem;
    flex: 1;
    transition: box-shadow 0.3s;
    
    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    }
  }

  // Style cho danh sách môn học
  .list {
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eaeef5;

      h2 {
        font-size: 1.6rem;
        color: #2d3748;
        margin: 0;
        font-weight: 600;
      }
    }

    .actions {
      .refresh-btn {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        background-color: #f1f5f9;
        color: #4a5568;
        border: none;
        padding: 0.5rem 0.8rem;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s;
        
        &:hover {
          background-color: #e2e8f0;
        }
        
        i {
          font-size: 18px;
        }
      }
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 0;
      color: #718096;
      gap: 1rem;
      
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e2e8f0;
        border-top-color: #3182ce;
        border-radius: 50%;
        animation: spin 1s infinite linear;
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 0;
      color: #718096;
      
      .empty-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }
      
      p {
        font-size: 1.1rem;
      }
    }
    
    // Style cho grid môn học
    .subjects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      
      .subject-card {
        background-color: #fff;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #edf2f7;
        transition: all 0.3s;
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.8rem;
          
          h3 {
            font-size: 1.2rem;
            margin: 0;
            color: #2d3748;
            font-weight: 600;
          }
          
          .subject-badge {
            background-color: #ebf8ff;
            color: #3182ce;
            font-size: 0.7rem;
            padding: 0.2rem 0.6rem;
            border-radius: 20px;
            font-weight: 500;
          }
        }
        
        .description {
          color: #4a5568;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 4.2em;
          line-height: 1.4;
        }
        
        .card-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.8rem;
          
          button {
            font-size: 0.85rem;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            transition: all 0.2s;
            
            i {
              font-size: 16px;
            }
          }
          
          .edit-btn {
            background-color: #edf2f7;
            color: #4a5568;
            border: none;
            
            &:hover {
              background-color: #e2e8f0;
            }
          }
          
          .delete-btn {
            background-color: #fff;
            color: #e53e3e;
            border: 1px solid #fed7d7;
            
            &:hover {
              background-color: #fff5f5;
            }
          }
        }
      }
    }
  }

  // Style cho form thêm môn học
  .add {
    max-width: 450px;
    
    .form-header {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eaeef5;
      
      h2 {
        font-size: 1.6rem;
        color: #2d3748;
        margin: 0;
        font-weight: 600;
      }
    }

    form {
      display: flex;
      flex-direction: column;
    }

    fieldset {
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      
      button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s;
        
        &[type="button"] {
          background-color: #fff;
          color: #4a5568;
          border: 1px solid #e2e8f0;
          
          &:hover {
            background-color: #f7fafc;
          }
        }
        
        &[type="submit"] {
          background-color: #3182ce;
          color: white;
          border: none;
          
          &:hover {
            background-color: #2c5282;
          }
          
          i {
            font-size: 18px;
          }
        }
      }
    }
  }
}

// Responsive breakpoints
@media (max-width: 1200px) {
  .view .list .subjects-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 992px) {
  .view .list .subjects-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .view {
    flex-direction: column-reverse;
    
    .add {
      max-width: 100%;
      margin-bottom: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .view {
    padding: 1rem;
    
    .list .subjects-grid {
      grid-template-columns: 1fr;
    }
    
    .list, .add {
      padding: 1.25rem;
    }
  }
}
</style>
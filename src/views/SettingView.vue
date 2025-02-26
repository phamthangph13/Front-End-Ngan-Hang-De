<template>
    <div class="settings-view">
      <div class="settings-header">
        <h1 class="title">{{ $t('setting.title') }}</h1>
        <div class="header-decoration"></div>
      </div>
  
      <div class="settings-container">
        <!-- Language Settings Section -->
        <div class="settings-card" id="lang">
          <div class="settings-card-header">
            <div class="icon-container">
              <i class="material-icons">language</i>
            </div>
            <h2>{{ $t('setting.language') }}</h2>
          </div>
          
          <div class="settings-card-content">
            <div class="form-group">
              <label for="language-select" class="form-label uppercaseFirstLetter">
                {{ $t('setting.system', { name: $t('setting.language') }) }}
              </label>
              <div class="select-wrapper">
                <select 
                  id="language-select"
                  v-model="settingStore.settings.language"
                  class="form-select"
                >
                  <option 
                    v-for="lang in configStore.config.supportedLanguages" 
                    :value="lang.lang" 
                    :key="lang.region"
                  >
                    {{ lang.name }}
                  </option>
                </select>
                <i class="material-icons select-icon">arrow_drop_down</i>
              </div>
            </div>
            
            <div class="settings-actions">
              <BaseButton 
                @click="refreshLanguage"
                class="refresh-button"
              >
                <i class="material-icons">refresh</i>
                <span>{{ $t('action.refresh') }}</span>
              </BaseButton>
            </div>
          </div>
        </div>
  
        <!-- Future Settings Sections (commented but styled) -->
        <div class="settings-card disabled-card">
          <div class="settings-card-header">
            <div class="icon-container">
              <i class="material-icons">palette</i>
            </div>
            <h2>{{ $t('setting.appearance') || 'Appearance' }}</h2>
          </div>
          
          <div class="settings-card-content">
            <div class="coming-soon">
              <i class="material-icons">hourglass_empty</i>
              <span>Coming soon</span>
            </div>
          </div>
        </div>
        
        <div class="settings-card disabled-card">
          <div class="settings-card-header">
            <div class="icon-container">
              <i class="material-icons">notifications</i>
            </div>
            <h2>{{ $t('setting.notifications') || 'Notifications' }}</h2>
          </div>
          
          <div class="settings-card-content">
            <div class="coming-soon">
              <i class="material-icons">hourglass_empty</i>
              <span>Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import useSettingsStore from '@/stores/settings';
  import useConfigStore from '@/stores/config';
  import BaseButton from "@/components/bases/BaseButton.vue";
  
  const settingStore = useSettingsStore();
  const configStore = useConfigStore();
  
  const refreshing = ref(false);
  
  const refreshLanguage = async () => {
    refreshing.value = true;
    await settingStore.loadLanguage(true);
    
    setTimeout(() => {
      refreshing.value = false;
    }, 1000);
  };
  
  onMounted(() => {
    // Add entrance animations when component mounts
    const cards = document.querySelectorAll('.settings-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animated-in');
      }, 100 * index);
    });
  });
  </script>
  
  <style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  
  .settings-view {
    font-family: 'Inter', sans-serif;
    padding: 1.5rem;
    height: 100%;
    overflow-y: auto;
    background-color: #f8fafc;
    color: #334155;
    
    // Header styling
    .settings-header {
      margin-bottom: 2rem;
      position: relative;
      
      .title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
        transition: transform 0.3s ease;
        animation: fadeSlideIn 0.5s ease-out forwards;
      }
      
      .header-decoration {
        height: 3px;
        width: 60px;
        background: linear-gradient(90deg, #3b82f6, #60a5fa);
        margin-top: 0.5rem;
        border-radius: 2px;
        animation: growIn 0.7s ease-out forwards;
      }
    }
    
    // Settings container
    .settings-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    // Card styling
    .settings-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: all 0.3s ease;
      transform: translateY(20px);
      opacity: 0;
      
      &.animated-in {
        transform: translateY(0);
        opacity: 1;
      }
      
      &:hover {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        transform: translateY(-3px);
      }
      
      .settings-card-header {
        display: flex;
        align-items: center;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #e2e8f0;
        background-color: #f8fafc;
        
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          margin-right: 1rem;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
          
          i {
            color: white;
            font-size: 22px;
          }
        }
        
        h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
      }
      
      .settings-card-content {
        padding: 1.5rem;
      }
      
      &.disabled-card {
        opacity: 0.75;
        
        .coming-soon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          
          i {
            font-size: 2rem;
            color: #94a3b8;
            margin-bottom: 0.5rem;
            animation: pulse 2s infinite;
          }
          
          span {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }
    }
    
    // Form elements styling
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #475569;
      font-size: 0.9rem;
      
      &.uppercaseFirstLetter {
        text-transform: lowercase;
        
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
    
    .select-wrapper {
      position: relative;
      
      .form-select {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background-color: white;
        color: #334155;
        appearance: none;
        transition: all 0.2s ease;
        
        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        &:hover {
          border-color: #cbd5e1;
        }
        
        option {
          padding: 0.75rem;
        }
      }
      
      .select-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #64748b;
        pointer-events: none;
      }
    }
    
    // Button styling
    .settings-actions {
      display: flex;
      justify-content: flex-end;
      
      .refresh-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1.2rem;
        background: linear-gradient(135deg, #3b82f6, #60a5fa);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
        
        &:hover {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
        }
        
        &:active {
          transform: translateY(0);
        }
        
        i {
          font-size: 18px;
          transition: transform 0.5s ease;
        }
        
        &:hover i {
          animation: spin 1s ease;
        }
      }
    }
    
    // Animations
    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes growIn {
      from {
        width: 0;
        opacity: 0;
      }
      to {
        width: 60px;
        opacity: 1;
      }
    }
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  
  // Responsive styles
  @media (min-width: 768px) {
    .settings-view {
      padding: 2rem;
      
      .settings-container {
        max-width: 800px;
      }
    }
  }
  
  @media (max-width: 480px) {
    .settings-view {
      padding: 1rem;
      
      .settings-header .title {
        font-size: 1.5rem;
      }
      
      .settings-card {
        .settings-card-header {
          padding: 1rem;
          
          .icon-container {
            width: 36px;
            height: 36px;
            
            i {
              font-size: 20px;
            }
          }
          
          h2 {
            font-size: 1.1rem;
          }
        }
        
        .settings-card-content {
          padding: 1rem;
        }
      }
    }
  }
  </style>
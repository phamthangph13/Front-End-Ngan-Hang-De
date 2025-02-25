<template>
    <div class="view">
      <h1 class="title">Trang chủ</h1>
      
      
      

      
      <!-- Thông báo mới -->
      <div class="announcements">
        <h2 class="section-title">Thông báo mới</h2>
        <div class="announcement-list">
          <div v-for="(announcement, index) in announcements" :key="index" class="announcement-card">
            <div class="announcement-icon">
              <i :class="announcement.icon"></i>
            </div>
            <div class="announcement-content">
              <h4>{{ announcement.title }}</h4>
              <p>{{ announcement.content }}</p>
              <span class="announcement-date">{{ announcement.date }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Menu chức năng cũ nhưng được cải tiến -->
      <div class="features-section">
        <h2 class="section-title">Tính năng</h2>
        <ul class="menu">
          <template v-for="(item, index) in [...topLinks, ...bottomLinks].slice(1)" :key="index">
            <HomeItem @click="() => { router.push(item.path) }" class="menu-item">
              <component :is="item.component" />
              <template #text>
                {{ item.noTranslate ? item.name : translateMenuItems(item.name) }}
              </template>
            </HomeItem>
          </template>
        </ul>
      </div>
      
      <!-- Trạng thái kết nối server (chỉ hiển thị trong chế độ dev) -->
      <template v-if="isDev">
        <div class="server-status" :class="{ connected: test }">
          <div class="status-icon">
            <i class="fas" :class="test ? 'fa-check-circle' : 'fa-exclamation-circle'"></i>
          </div>
          <div class="status-content">
            <h3>{{ test ? 'Kết nối thành công' : 'Chưa kết nối' }}</h3>
            <template v-if="test">
              <p class="success-message">
                <i class="fas fa-server"></i>
                Bạn đã kết nối đến máy chủ thành công
              </p>
              <p class="server-response">
                <span>Phản hồi:</span> {{ test }}
              </p>
            </template>
            <p v-else class="error-message">
              <i class="fas fa-exclamation-triangle"></i>
              Vui lòng khởi động backend để kiểm tra API
            </p>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue';
  import getHome from '@/api/home.js';
  import { useRouter } from 'vue-router';
  import topLinks from '@/router/topLinks';
  import bottomLinks from '@/router/bottomLinks';
  
  const router = useRouter();
  const HomeItem = defineAsyncComponent(() => import('@/components/HomeItem.vue'));
  const test = ref<String | null>(null);
  const isDev = import.meta.env.DEV;
  
  // Quản lý slider
  const currentSlide = ref(0);
  const slideInterval = ref<number | null>(null);
  const carousel = ref<HTMLElement | null>(null);
  
  // Dữ liệu mẫu cho slides quảng cáo
  const promotionalSlides = ref([
    {
      title: 'Ưu đãi tháng 3',
      description: 'Khám phá các ưu đãi đặc biệt trong tháng này với nhiều phần quà hấp dẫn',
      image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-hoc-tap.jpg',
      link: '/promotions/march',
      buttonText: 'Xem ngay'
    },
    {
      title: 'Tính năng mới',
      description: 'Trải nghiệm các tính năng mới nhất đã được cập nhật trong phiên bản mới',
      image: 'https://tuyensinh.vya.edu.vn/upload/images/tbl_news_1698978808.jpg',
      link: '/features/new',
      buttonText: 'Khám phá'
    },
    {
      title: 'Hướng dẫn sử dụng',
      description: 'Tìm hiểu cách sử dụng hiệu quả các tính năng của hệ thống',
      image: 'https://giasutatdat.edu.vn/uploads/images/so-sanh-cac-phuong-phap-hoc-tap.jpg',
      link: '/guides',
      buttonText: 'Học ngay'
    }
  ]);
  
  // Dữ liệu mẫu cho thông báo
  const announcements = ref([
    {
      title: 'Bảo trì hệ thống',
      content: 'Hệ thống sẽ được bảo trì vào ngày 28/02/2025 từ 23:00 đến 02:00',
      date: '25/02/2025',
      icon: 'fas fa-tools'
    },
    {
      title: 'Cập nhật phiên bản mới',
      content: 'Phiên bản 2.5.0 đã được phát hành với nhiều cải tiến về hiệu suất',
      date: '20/02/2025',
      icon: 'fas fa-sync-alt'
    },
    {
      title: 'Chương trình khuyến mãi',
      content: 'Giảm 20% cho tất cả dịch vụ từ ngày 01/03 đến 15/03/2025',
      date: '18/02/2025',
      icon: 'fas fa-gift'
    }
  ]);
  
  // Hàm để thay thế $t cho các menu item
  const translateMenuItems = (key: string) => {
    const translations: Record<string, string> = {
      'menu.dashboard': 'Bảng điều khiển',
      'menu.settings': 'Cài đặt',
      'menu.profile': 'Trang cá nhân',
      'menu.reports': 'Báo cáo',
      'menu.users': 'Người dùng',
      'menu.help': 'Trợ giúp'
      // Thêm các mục dịch khác nếu cần
    };
    
    return translations[key] || key;
  };
  
  // Hàm điều khiển slider
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % promotionalSlides.value.length;
  };
  
  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + promotionalSlides.value.length) % promotionalSlides.value.length;
  };
  
  const setSlide = (index: number) => {
    currentSlide.value = index;
  };
  
  const startSlideInterval = () => {
    slideInterval.value = window.setInterval(() => {
      nextSlide();
    }, 5000);
  };
  
  const stopSlideInterval = () => {
    if (slideInterval.value !== null) {
      clearInterval(slideInterval.value);
      slideInterval.value = null;
    }
  };
  
  onMounted(() => {
    // Kết nối API
    getHome().then((res) => {
      test.value = res;
      console.log(res);
    });
    
    // Khởi động slider tự động
    startSlideInterval();
    
    // Tạm dừng slider khi hover
    if (carousel.value) {
      carousel.value.addEventListener('mouseenter', stopSlideInterval);
      carousel.value.addEventListener('mouseleave', startSlideInterval);
    }
  });
  
  onBeforeUnmount(() => {
    stopSlideInterval();
    
    // Xóa event listener
    if (carousel.value) {
      carousel.value.removeEventListener('mouseenter', stopSlideInterval);
      carousel.value.removeEventListener('mouseleave', startSlideInterval);
    }
  });
  </script>
  
  <style scoped lang="scss">
  .view {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 3rem);
    scrollbar-width: thin;
    gap: 2rem;
    background-color: #f9fafb;
  }
  
  .title {
    font-size: 2.5rem;
    margin: 0;
    margin-bottom: 1.5rem;
    text-transform: lowercase;
    font-weight: 700;
    color: #1e293b;
    
    &::first-letter {
      text-transform: uppercase;
    }
  }
  
  .section-title {
    font-size: 1.75rem;
    margin: 0 0 1.25rem 0;
    color: #334155;
    font-weight: 600;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 4rem;
      height: 0.25rem;
      background-color: #0ea5e9;
      border-radius: 4px;
    }
  }
  
  // Banner quảng cáo
  .promotional-banner {
    background: linear-gradient(to right, #0ea5e9, #2563eb);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 1rem;
    color: white;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 300px;
      height: 100%;
      background-image: url('/images/banner-decoration.svg');
      background-position: right center;
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0.2;
    }
    
    .banner-content {
      max-width: 60%;
      
      h2 {
        font-size: 2rem;
        margin: 0 0 1rem 0;
        font-weight: 700;
      }
      
      p {
        font-size: 1.1rem;
        margin: 0 0 1.5rem 0;
        opacity: 0.9;
      }
      
      .banner-button {
        background: white;
        color: #2563eb;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  
  // Carousel/Slider
  .carousel-container {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    height: 300px;
    margin-bottom: 2rem;
  }
  
  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
    
    &.active {
      opacity: 1;
      z-index: 1;
    }
    
    .slide-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    
    .slide-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 2rem;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
      color: white;
      z-index: 2;
      
      h3 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem 0;
        font-weight: 600;
      }
      
      p {
        font-size: 1rem;
        margin: 0 0 1rem 0;
        max-width: 70%;
      }
      
      .slide-button {
        background: #0ea5e9;
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          background: #0284c7;
        }
      }
    }
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
    
    .indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      padding: 0;
      cursor: pointer;
      
      &.active {
        background: white;
        transform: scale(1.2);
      }
    }
  }
  
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
    
    &.prev {
      left: 1rem;
    }
    
    &.next {
      right: 1rem;
    }
  }
  
  // Thông báo
  .announcements {
    margin-bottom: 2rem;
  }
  
  .announcement-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .announcement-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .announcement-icon {
      width: 48px;
      height: 48px;
      background: #f0f9ff;
      color: #0ea5e9;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }
    
    .announcement-content {
      flex: 1;
      
      h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        color: #1e293b;
      }
      
      p {
        margin: 0 0 0.75rem 0;
        color: #64748b;
        font-size: 0.95rem;
        line-height: 1.5;
      }
      
      .announcement-date {
        font-size: 0.85rem;
        color: #94a3b8;
        display: block;
      }
    }
  }
  
  // Menu chức năng
  .features-section {
    margin-bottom: 2rem;
  }
  
  .menu {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  
  // Server status (giữ lại từ code gốc nhưng làm hiện đại hơn)
  .server-status {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
    &.connected {
      background: #f0f9ff;
      border-left: 4px solid #0ea5e9;
    }
  
    .status-icon {
      font-size: 2rem;
      color: #dc2626;
  
      .connected & {
        color: #0ea5e9;
      }
    }
  
    .status-content {
      flex: 1;
  
      h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        color: #1f2937;
      }
  
      .success-message {
        color: #059669;
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
  
      .error-message {
        color: #dc2626;
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
  
      .server-response {
        margin: 0.5rem 0;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        
        span {
          font-weight: 600;
          color: #4b5563;
        }
      }
    }
  }
  
  // Thiết kế responsive
  @media (max-width: 768px) {
    .promotional-banner .banner-content {
      max-width: 100%;
    }
    
    .carousel-container {
      height: 250px;
    }
    
    .carousel-slide .slide-content {
      p {
        max-width: 100%;
      }
    }
    
    .announcement-list {
      grid-template-columns: 1fr;
    }
  }
  </style>
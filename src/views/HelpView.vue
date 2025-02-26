<template>
    <div class="help-container">
      <h1>Help Center</h1>
      <div class="help-content">
        <!-- Getting Started Section -->
        <section class="help-section">
          <h2>Getting Started</h2>
          <p>
            Chào mừng bạn đến với hệ thống Câu hỏi Trực tuyến. Bạn có thể tìm thấy hướng dẫn và hỗ trợ để bắt đầu.
          </p>
        </section>
  
        <!-- FAQ Section -->
        <section class="help-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-item">
            <h3>How do I change my password?</h3>
            <p>
              Bạn có thể thay đổi mật khẩu trong phần cài đặt tài khoản của mình.
            </p>
          </div>
          <!-- Các mục FAQ khác có thể thêm ở đây -->
        </section>
  
        <!-- Contact Support Section with Admin Info -->
        <section class="help-section">
          <h2>Contact Support</h2>
          <p>Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ:</p>
          <ul>
            <li><strong>Admin:</strong> Phạm Như Thắng</li>
            <li><strong>Zalo:</strong> 0915878677</li>
            <li><strong>Email:</strong> <a href="mailto:winnieph13@gmail.com">winnieph13@gmail.com</a></li>
          </ul>
        </section>
  
        <!-- Online Learning Help Cards -->
        <section class="help-section online-learning">
          <h2>Câu hỏi Trực tuyến</h2>
          <div class="card-container">
            <div class="card">
              <h3>Hướng dẫn tạo đề thi</h3>
              <p>
                Hướng dẫn chi tiết cách tạo và quản lý đề thi trực tuyến.
              </p>
            </div>
            <div class="card">
              <h3>Chia sẻ kết quả thi</h3>
              <p>
                Cách chia sẻ kết quả thi cho học viên hoặc quản lý.
              </p>
            </div>
            <div class="card">
              <h3>Câu hỏi Trắc nghiệm</h3>
              <p>
                Thông tin về cách tạo câu hỏi trắc nghiệm cho hệ thống.
              </p>
            </div>
            <!-- Thêm card khác nếu cần -->
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  .help-container {
    padding: 2rem;
    background: #f4f7fb;
    height: 100vh; /* Full màn hình */
    display: flex;
    flex-direction: column;
    align-items: center;
  
    h1 {
      margin-bottom: 2rem;
      color: #333;
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
    }
  
    .help-content {
      width: 100%;
      max-width: 1200px;
      display: grid;
      gap: 2rem;
  
      .help-section {
        background: #fff;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        border-left: 6px solid #0061f2; /* Thêm đường viền trái nổi bật */
  
        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }
  
        h2 {
          color: #2c3e50;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
  
        p, li {
          color: #555;
          font-size: 1rem;
          line-height: 1.8;
        }
  
        ul {
          list-style: none;
          padding-left: 0;
  
          li {
            margin-bottom: 0.5rem;
          }
  
          a {
            color: #0061f2;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }
  
        .faq-item {
          margin-bottom: 1.5rem;
  
          h3 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
          }
        }
      }
  
      .online-learning {
        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
  
        .card {
          background: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-left: 6px solid #0061f2;
  
          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
  
          h3 {
            color: #0061f2;
            margin-bottom: 1rem;
            font-size: 1.2rem;
          }
  
          p {
            color: #444;
            line-height: 1.6;
          }
        }
      }
    }
  }
  </style>
  
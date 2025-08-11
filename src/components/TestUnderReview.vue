<template>
  <div class="review-page-header">
    <AppHeader />
    <div class="review-page">
      <!-- Top Card -->
      <div class="top-card">
        <div class="icon-wrapper">
          <span class="hourglass">⌛</span>
        </div>
        <h2 class="title">Test Under Review</h2>
        <p class="description">
          Thank you for completing the screening test. Our team is currently reviewing your responses
          and will notify you of the results soon.
        </p>
        <div class="status-chip">
          <span class="status-icon">👁</span>
          <span class="status-text">Under Review</span>
          <span class="questions">10/10 questions completed</span>
        </div>
        <div class="pending-badge">
          PENDING REVIEW • Est. 2-3 business days
        </div>
      </div>

      <!-- Details Section -->
      <div class="details-section">
        <!-- Test Overview -->
        <div class="card">
          <h3 class="card-title"><span class="icon">📄</span> Test Overview</h3>
          <ul class="details-list">
            <li><strong>Submitted:</strong> <span>{{ submitted }}</span></li>
            <li><strong>Duration:</strong> <span>{{ duration }}</span></li>
            <li><strong>Questions:</strong> <span>10/10 completed</span></li>
            <li><strong>Status:</strong> <span class="pending-text">Pending Review</span></li>
          </ul>
        </div>

        <!-- Review Information -->
        <div class="card">
          <h3 class="card-title"><span class="icon">📅</span> Review Information</h3>
          <ul class="details-list">
            <li><strong>Review Type:</strong> <span>Manual Review</span></li>
            <li><strong>Estimated Time:</strong> <span>2-3 business days</span></li>
            <li><strong>Expected By:</strong> <span>{{ expectedBy }}</span></li>
          </ul>
          <div class="info-box">
            <p class="info-header"><strong>📢 What happens next?</strong></p>
            <p class="info-text">
              Our team will carefully review your responses and notify you via email once the evaluation is complete.
            </p>
          </div>
        </div>
      </div>

      <!-- Next Steps Section -->
      <div class="next-steps-card">
        <h3 class="next-title">Next Steps</h3>
        <div class="next-box">
          <p class="next-text">
            <span class="next-icon">⏳</span>
            Your test is under review
          </p>
          <p class="next-subtext">
            We received your test submission and our expert reviewers are currently evaluating your responses. 
            You’ll receive an email notification with your results within 2-3 business days.
          </p>
          <div class="expected-box">
            📅 Expected results by: <strong>{{ expectedBy }}</strong>
          </div>
          <div class="next-actions">
            <button class="track-btn" @click="trackApplication">🔗 Track Application Status</button>
            <button class="return-btn">🔒 Return to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/HeaderPart.vue';
import { useRouter } from 'vue-router';

export default {
  name: "TestUnderReview",
  components: {
    AppHeader,
  },
  setup() {
    const router = useRouter();

    const trackApplication = () => {
      router.push({ name: 'ApplicationStatus' }); 
    };

    return {
      trackApplication,
    };
  },
  data() {
    return {
      submitted: "8/11/2025, 4:48:39 PM",
      duration: "18 min 24 sec",
      expectedBy: "8/14/2025",
    };
  },
};
</script>

<style scoped>
.review-page-header {
  position: relative;
  z-index: 1;
}

.review-page {
  font-family: Arial, sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.top-card {
  background: linear-gradient(to bottom, #3498db, #2980b9);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.2);
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.15);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hourglass {
  font-size: 50px;
  color: #f39c12;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 20px;
}

.description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 750px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.status-chip {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 12px 20px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.status-icon {
  color: #f39c12;
}

.status-text {
  color: #fff;
}

.questions {
  font-weight: 400;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
}

.pending-badge {
  margin-top: 20px;
  background: rgba(243, 156, 18, 0.2);
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 14px;
  color: #f39c12;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.details-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.details-list {
  list-style: none;
  padding: 0;
}

.details-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  color: #34495e;
}

.details-list li:last-child {
  border-bottom: none;
}

.pending-text {
  color: #f39c12;
  font-weight: 600;
}

.info-box {
  background: #f9fafb;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
  font-size: 14px;
  color: #2c3e50;
}

.info-header {
  margin: 0 0 10px;
  font-weight: 600;
}

.info-text {
  margin: 0;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .review-page {
    padding: 20px;
  }

  .top-card {
    padding: 25px;
  }

  .title {
    font-size: 26px;
  }

  .description {
    font-size: 14px;
  }

  .details-section {
    grid-template-columns: 1fr;
  }
}

.next-steps-card {
  margin-top: 30px;
}

.next-title {
  font-size: 20px;
  font-weight: 700;
  color: #0b2948;
  margin-bottom: 10px;
}

.next-box {
  background: #fffbea;
  border: 1px solid #f9e1a8;
  border-radius: 8px;
  padding: 20px;
}

.next-text {
  font-size: 15px;
  font-weight: 600;
  color: #a05a00;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.next-subtext {
  font-size: 14px;
  color: #6a4d2c;
  margin-bottom: 15px;
}

.expected-box {
  background: #fff4d1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #a05a00;
  display: inline-block;
  margin-bottom: 15px;
}

.next-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.track-btn {
  background: #e67817;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.return-btn {
  background: #fff;
  border: 1px solid #e67817;
  color: #e67817;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.track-btn:hover {
  background: #cf5e0c;
}

.return-btn:hover {
  background: #fff7ed;
}
</style>
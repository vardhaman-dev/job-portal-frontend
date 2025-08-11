<template>
  <div class="appheader">
    <AppHeader />
    <div class="application-success-page">
      <div class="container">
        <!-- Success Icon -->
        <div class="success-icon fade-in">
          <q-icon name="check_circle" size="60px" color="green" />
        </div>

        <!-- Success Message -->
        <div class="success-message fade-in">
          <h1 class="page-title">Application Submitted Successfully!</h1>
          <p class="subtext">
            Thank you for applying to the <span class="highlight">{{ jobTitle }}</span> position at 
            <span class="highlight">TechCorp Inc.</span> The next step is to complete a screening test.
          </p>
        </div>

        <!-- Screening Test Card -->
        <div class="screening-card fade-in">
          <div class="card-header">
            <q-icon name="quiz" size="24px" color="primary" />
            <h2 class="job-title">{{ jobTitle }} Screening Test</h2>
          </div>
          <p class="description">
            This test will take approximately <strong>20 minutes</strong> and consists of <strong>10 multiple-choice questions</strong>.
          </p>
          
          <!-- Test Info Grid -->
          <div class="info-grid">
            <div class="info-section">
              <div class="info-header">
                <q-icon name="schedule" size="20px" color="primary" />
                <span class="info-title">Time Limit</span>
              </div>
              <span class="info-value">20 minutes</span>
            </div>
            <div class="info-section">
              <div class="info-header">
                <q-icon name="help_outline" size="20px" color="primary" />
                <span class="info-title">Questions</span>
              </div>
              <span class="info-value">10 multiple-choice</span>
            </div>
          </div>

          <!-- What to Expect Section -->
          <div class="expect-section">
            <div class="expect-header">
              <q-icon name="info_outline" size="20px" color="primary" />
              <span class="expect-title">What to Expect</span>
            </div>
            <ul class="expect-list">
              <li>Technical knowledge relevant to the {{ jobTitle }} role</li>
              <li>Problem-solving and analytical thinking questions</li>
              <li>Industry best practices and methodologies</li>
              <li>Situational judgment scenarios</li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="button-group">
            <q-btn
              label="Start Now"
              icon="play_arrow"
              color=#1565c0
              class="action-btn start-btn"
              @click="startTest"
              unelevated
              size="lg"
            />
            <q-btn
              label="Do Later"
              icon="schedule"
              color="grey-6"
              text-color="dark"
              class="action-btn later-btn"
              @click="goToDashboard"
              outline
              size="lg"
            />
          </div>

          <!-- Additional Info -->
          <div class="additional-info">
            <p class="info-text">You can complete this screening test anytime from your dashboard.</p>
            <p class="info-text">Results will be shared with TechCorp Inc. upon completion.</p>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="footer-actions fade-in">
          <q-btn
            label="View Job Details Again"
            color="grey-7"
            flat
            @click="viewJobDetails"
          />
          <q-btn
            label="Browse More Jobs"
            color="grey-7"
            flat
            @click="browseJobs"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import AppHeader from '../components/HeaderPart.vue';
import { useRouter } from 'vue-router';

const route = useRoute();
const jobTitle = route.query.jobTitle || 'Software Developer';
const router = useRouter();

const startTest = () => {
  router.push('/test-instructions');
};

const goToDashboard = () => {
  router.push('/dashboard');
};

const viewJobDetails = () => {
  router.push('/job-details');
};

const browseJobs = () => {
  router.push('/');
};
</script>

<style scoped>
.appheader {
  position: relative;
  width: 100%;
}

.application-success-page {
  background-color: #f8f9fa;
  padding: 40px 20px;
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
}

.container {
  max-width: 700px;
  width: 100%;
}

.success-icon {
  text-align: center;
  margin-bottom: 20px;
}

.success-message {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  color: #1a202c;
  font-weight: 700;
  margin: 0;
  margin-bottom: 12px;
}

.subtext {
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

.highlight {
  font-weight: 600;
  color: #1a202c;
}

.screening-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.job-title {
  font-size: 20px;
  color: #1a202c;
  margin: 0;
  font-weight: 600;
}

.description {
  font-size: 16px;
  color: #4a5568;
  margin-bottom: 24px;
  line-height: 1.5;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 28px;
  padding: 20px;
  background-color: #f7fafc;
  border-radius: 12px;
}

.info-section {
  text-align: left;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.info-title {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
}

.info-value {
  font-size: 14px;
  color: #4a5568;
}

.expect-section {
  margin-bottom: 28px;
}

.expect-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.expect-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
}

.expect-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.expect-list li {
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

.expect-list li:before {
  content: "•";
  color: #4299e1;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.button-group {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.action-btn {
  flex: 1;
  padding: 14px 24px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.start-btn {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
}

.start-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
}

.later-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.additional-info {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.info-text {
  font-size: 13px;
  color: #718096;
  margin: 4px 0;
}

.footer-actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-in forwards;
}

.fade-in:nth-child(1) { animation-delay: 0.1s; }
.fade-in:nth-child(2) { animation-delay: 0.3s; }
.fade-in:nth-child(3) { animation-delay: 0.5s; }
.fade-in:nth-child(4) { animation-delay: 0.7s; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .application-success-page {
    padding: 20px 16px;
    padding-top: 40px;
  }

  .container {
    max-width: 100%;
  }

  .page-title {
    font-size: 24px;
  }

  .subtext {
    font-size: 14px;
  }

  .screening-card {
    padding: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }

  .button-group {
    flex-direction: column;
    gap: 12px;
  }

  .footer-actions {
    flex-direction: column;
    gap: 8px;
  }

  .expect-list li {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .success-icon q-icon {
    font-size: 48px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .screening-card {
    padding: 20px;
  }
}

</style>
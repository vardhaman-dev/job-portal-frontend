<template>
  <div class="application-status-page-header">
    <AppHeader />
    <div class="application-status-page">
      <!-- Back to Dashboard -->
    <div class="back-nav">
      <span class="back-arrow" @click="goToDashboard">← Back to Dashboard</span>
    </div>

    <!-- Header -->
    <h1 class="page-title">Application Status</h1>

    <!-- Header Card -->
    <div class="status-card">
      <div class="job-info">
        <h2 class="job-title">{{ jobTitle }}</h2>
        <p class="company-name">{{ companyName }}</p>
        <p class="application-id">Application ID: {{ applicationId }}</p>
      </div>
      <div class="status-meta">
        <p class="submitted-date">Submitted<br />{{ submittedDate }}</p>
        <p class="last-updated">Last updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <!-- Progress Section -->
    <div class="progress-card">
      <h3 class="section-title">
        <span class="section-icon">👤</span>
        Application Progress
      </h3>

      <div v-for="(step, index) in steps" :key="index" class="progress-step">
        <div class="step-timeline">
          <div class="step-icon" :class="step.status">
            <span v-if="step.status === 'completed'">✓</span>
            <span v-else-if="step.status === 'in-progress'">📄</span>
            <span v-else-if="step.iconType === 'eye'">👁</span>
            <span v-else-if="step.iconType === 'calendar'">📅</span>
            <span v-else>⏸</span>
          </div>
          <div v-if="index < steps.length - 1" class="step-line" :class="step.status"></div>
        </div>
        
        <div class="step-content">
          <div class="step-header">
            <h4 class="step-title">{{ step.title }}</h4>
            <span class="step-date" v-if="step.date">{{ step.date }}</span>
          </div>
          <p class="step-description">{{ step.description }}</p>
          <div class="step-actions">
            <span v-if="step.status === 'completed'" class="badge completed">Completed</span>
            <span v-else-if="step.status === 'in-progress'" class="badge in-progress">In Progress</span>
            <span v-else class="badge pending">Pending</span>
            <button
              v-if="step.button"
              class="start-btn"
              @click="handleAction(step)"
            >
              {{ step.button }}
            </button>
          </div>
        </div>
      </div>

      <!-- Next Steps & Need Help Section -->
      <div class="next-help-section">
        <!-- Next Steps -->
        <div class="card next-steps">
          <h3 class="section-title">Next Steps</h3>
          <div class="action-box">
            <p class="action-title">Action Required</p>
            <p class="action-description">
              You need to complete the screening test to proceed with your application.
            </p>
            <button class="orange-btn" @click="goToTest">Start Screening Test</button>
          </div>
        </div>

        <!-- Need Help -->
        <div class="card need-help">
          <h3 class="section-title">Need Help?</h3>
          <div class="support-info">
            <p class="contact-title">Contact Support</p>
            <p class="contact-text">
              If you have questions about your application status or need technical assistance:
            </p>
            <p class="contact-item">📧 support@techcorp.com</p>
            <p class="contact-item">📞 +1 (555) 123-4567</p>
            <p class="contact-item">🕘 Mon–Fri, 9 AM – 6 PM EST</p>
            <hr />
            <p class="tips-title">Application Tips</p>
            <ul class="tips-list">
              <li>Complete all required steps promptly</li>
              <li>Check your email regularly for updates</li>
              <li>Prepare for the technical assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AppHeader from '../components/HeaderPart.vue';

export default {
  name: "ApplicationStatus",
  components: {
    AppHeader
  },
  data() {
    return {
      jobTitle: "Software Developer",
      companyName: "TechCorp Inc.",
      applicationId: "APP-2024-001234",
      submittedDate: "2024-01-15",
      lastUpdated: "2024-01-16",
      steps: [
        {
          title: "Application Submitted",
          description: "Your application has been successfully submitted and received by our team.",
          status: "completed",
          date: "Jan 15, 2024"
        },
        {
          title: "Screening Test",
          description: "Complete the technical screening assessment to proceed to the next stage.",
          status: "in-progress",
          button: "Start Test"
        },
        {
          title: "Recruiter Review",
          description: "Our recruitment team will review your application and test results.",
          status: "pending",
          iconType: "eye"
        },
        {
          title: "Interview Scheduled",
          description: "Technical and cultural fit interview with the hiring team.",
          status: "pending",
          iconType: "calendar"
        },
        {
          title: "Offer Decision",
          description: "Our team will communicate the final decision regarding your application.",
          status: "pending"
        }
      ]
    };
  },
  methods: {
    handleAction(step) {
      if (step.button === "Start Test") {
        this.$router.push("/test-instructions");
      }
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    goToTest() {
        this.$router.push("/test-instructions");
    },
  }
};
</script>

<style scoped>
.application-status-page {
  max-width: 900px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 24px;
  background-color: #f8fafc;
  min-height: 100vh;
}

.back-nav {
  margin-bottom: 24px;
}

.back-arrow {
  color: #64748b;
  cursor: pointer;
  font-size: 14px;
}

.back-arrow:hover {
  color: #334155;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
}

.status-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.job-info {
  flex: 1;
}

.job-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.company-name {
  color: #2563eb;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.application-id {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.status-meta {
  text-align: right;
  font-size: 14px;
}

.submitted-date {
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.last-updated {
  color: #64748b;
  margin: 0;
}

.progress-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  font-size: 16px;
}

.progress-step {
  display: flex;
  margin-bottom: 32px;
  position: relative;
}

.progress-step:last-child {
  margin-bottom: 0;
}

.step-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.step-icon.completed {
  background: #dcfce7;
  color: #16a34a;
  border: 2px solid #16a34a;
}

.step-icon.in-progress {
  background: #fef3c7;
  color: #d97706;
  border: 2px solid #d97706;
}

.step-icon.pending {
  background: #f1f5f9;
  color: #64748b;
  border: 2px solid #cbd5e1;
}

.step-line {
  width: 2px;
  height: 60px;
  margin-top: 4px;
}

.step-line.completed {
  background: #16a34a;
}

.step-line.in-progress {
  background: linear-gradient(to bottom, #d97706 50%, #cbd5e1 50%);
}

.step-line.pending {
  background: #cbd5e1;
}

.step-content {
  flex: 1;
  padding-top: 2px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.step-title {
  font-weight: 600;
  color: #1e293b;
  font-size: 16px;
  margin: 0;
}

.step-date {
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
}

.step-description {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.step-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.badge.completed {
  background: #dcfce7;
  color: #16a34a;
}

.badge.in-progress {
  background: #fef3c7;
  color: #d97706;
}

.badge.pending {
  background: #f1f5f9;
  color: #64748b;
}

.start-btn {
  background: #2563eb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.start-btn:hover {
  background: #1d4ed8;
}

.next-help-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.action-box {
  background: #fff7ed;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
}

.action-title {
  font-weight: 600;
  color: #b45309;
  margin-bottom: 4px;
}

.action-description {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.orange-btn {
  background: #f97316;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.orange-btn:hover {
  background: #ea580c;
}

.contact-title, .tips-title {
  font-weight: 600;
  color: #1e293b;
  margin-top: 8px;
  margin-bottom: 4px;
}

.contact-text {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.contact-item {
  font-size: 14px;
  color: #475569;
  margin-bottom: 4px;
}

.tips-list {
  list-style-type: disc;
  padding-left: 18px;
  font-size: 14px;
  color: #475569;
}

.tips-list li {
  margin-bottom: 4px;
}
</style>
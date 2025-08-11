<template>
  <AppHeader />
  <div class="test-instructions-page">
    <div class="instructions-container fade-in">
      <!-- Title Section -->
      <div class="header-section">
        <q-icon name="assignment" size="64px" color="primary" />
        <h1 class="page-title">{{ jobTitle }} Screening Test</h1>
        <p class="company-name">{{ companyName }}</p>
        <p class="subtitle">
          Please read through the test instructions carefully before beginning.
          Once you start, the timer will begin counting down.
        </p>
        <div class="timer-preview">
          <q-icon name="timer" color="primary" size="20px" />
          <span>Estimated Time: 20 minutes</span>
        </div>
      </div>

      <!-- Test Details -->
      <div class="details-card">
        <h2 class="section-title">
          <q-icon name="info" color="primary" /> Test Details
        </h2>
        <div class="details-grid">
          <div class="detail-item">
            <q-icon name="schedule" color="primary" size="24px" />
            <p class="label">Time Limit</p>
            <p class="value">20 minutes</p>
          </div>
          <div class="detail-item">
            <q-icon name="help" color="primary" size="24px" />
            <p class="label">Questions</p>
            <p class="value">10 questions</p>
          </div>
          <div class="detail-item">
            <q-icon name="assignment_turned_in" color="primary" size="24px" />
            <p class="label">Attempts</p>
            <p class="value">1 attempt</p>
          </div>
          <div class="detail-item">
            <q-icon name="check_circle" color="primary" size="24px" />
            <p class="label">Question Type</p>
            <p class="value">Multiple Choice</p>
          </div>
        </div>
      </div>

      <!-- Rules & Guidelines -->
      <div class="rules-card">
        <h2 class="section-title">
          <q-icon name="warning" color="negative" /> Important Rules & Guidelines
        </h2>
        <div class="rules-grid">
          <div class="rule-item">
            <q-icon name="desktop_windows" color="primary" size="20px" />
            <p><strong>No tab switching</strong> during the test</p>
            <small>Stay on the test page throughout the entire duration.</small>
          </div>
          <div class="rule-item">
            <q-icon name="timer" color="primary" size="20px" />
            <p><strong>Complete in one sitting</strong></p>
            <small>The timer will continue and cannot be paused.</small>
          </div>
          <div class="rule-item">
            <q-icon name="save" color="primary" size="20px" />
            <p><strong>Auto-save enabled</strong></p>
            <small>Your answers will be saved automatically.</small>
          </div>
          <div class="rule-item">
            <q-icon name="looks_one" color="primary" size="20px" />
            <p><strong>Single attempt only</strong></p>
            <small>You can take this test only once.</small>
          </div>
          <div class="rule-item">
            <q-icon name="block" color="primary" size="20px" />
            <p><strong>No external resources</strong></p>
            <small>Do not use websites, documents, or assistance.</small>
          </div>
          <div class="rule-item">
            <q-icon name="check" color="primary" size="20px" />
            <p><strong>Review before submitting</strong></p>
            <small>You may change answers before final submission.</small>
          </div>
        </div>
      </div>

      <!-- Job Description Snippet -->
      <div class="job-desc-card">
        <h2 class="section-title">
          <q-icon name="work" color="primary" /> About the Role
        </h2>
        <p class="desc-text">
          This test assesses your skills for the {{ jobTitle }} role at {{ companyName }}. Expect questions on coding,
          problem-solving, and industry best practices. Success here could lead to an interview!
        </p>
      </div>

      <!-- Test Tips -->
      <div class="tips-card">
        <h2 class="section-title">
          <q-icon name="lightbulb" color="primary" /> Test Tips
        </h2>
        <ul>
          <li>Read each question carefully before answering.</li>
          <li>Manage your time—spend about 2 minutes per question.</li>
          <li>Eliminate obviously wrong answers to narrow choices.</li>
          <li>Double-check your answers if time permits.</li>
        </ul>
      </div>

      <!-- Before You Begin -->
      <div class="before-card">
        <h2 class="section-title">
          <q-icon name="person" color="primary" /> Before You Begin
        </h2>
        <ul>
          <li>Ensure you have a stable internet connection</li>
          <li>Close all unnecessary browser tabs and applications</li>
          <li>Find a quiet place where you won’t be interrupted</li>
          <li>Have a notepad ready if needed for calculations</li>
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <q-btn
          label="Back to Application"
          color="grey-7"
          flat
          @click="goBack"
        />
        <q-btn
          class="start-test-btn"
          label="Start Test"
          color="primary"
          unelevated
          @click="confirmStartTest"
        />
      </div>

      <!-- Important Note -->
      <div class="important-note">
        <strong>Important:</strong> Once you click <strong>"Start Test"</strong>, the timer will begin immediately.
        Make sure you’re ready before proceeding.
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <q-dialog v-model="showConfirmDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Confirm Test Start</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Are you ready to begin the {{ jobTitle }} Screening Test? The timer will start immediately.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />
          <q-btn label="Start Test" color="primary" unelevated @click="beginTest" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import AppHeader from '../components/HeaderPart.vue';

const route = useRoute();
const router = useRouter();
const jobTitle = route.query.jobTitle || 'Software Developer';
const companyName = 'TechCorp Inc.';
const showConfirmDialog = ref(false);

const beginTest = () => {
  router.push({ path: '/test', query: { start: 'true', jobTitle } }); // Pass start signal and jobTitle
  showConfirmDialog.value = false;
};

const goBack = () => {
  router.push('/application-success');
};

const confirmStartTest = () => {
  showConfirmDialog.value = true;
};
</script>

<style scoped>
.test-instructions-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 40px 20px;
}

.instructions-container {
  max-width: 900px;
  width: 100%;
}

.header-section {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
  color: #1565c0;
}

.company-name {
  font-size: 14px;
  color: #7f8c8d;
}

.subtitle {
  margin-top: 10px;
  color: #555;
}

.timer-preview {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.details-card,
.rules-card,
.before-card,
.job-desc-card,
.tips-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1565c0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.label {
  font-size: 14px;
  color: #7f8c8d;
}

.value {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.rule-item {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
}

.rule-item p {
  margin: 0;
  color: #555;
}

.rule-item small {
  color: #7f8c8d;
}

.before-card ul,
.job-desc-card ul,
.tips-card ul {
  margin: 0;
  padding-left: 20px;
  color: #555;
}

.before-card li,
.job-desc-card li,
.tips-card li {
  margin-bottom: 6px;
}

.desc-text {
  color: #555;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.important-note {
  margin-top: 20px;
  background: #fff8e1;
  border: 1px solid #f0c36d;
  padding: 12px 16px;
  border-radius: 8px;
  color: #b36b00;
  font-size: 14px;
}

.fade-in {
  animation: fadeIn 0.6s ease-in forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.start-test-btn {
  color: #1565c0;
  padding: 10px 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.start-test-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.3);
}
</style>
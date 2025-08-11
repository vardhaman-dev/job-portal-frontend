<template>
  <div class="test-page">
    <!-- Header -->
    <header class="test-header">
      <div class="job-title">{{ jobTitle }} - Screening Test</div>
      <div class="progress">
        Question {{ currentIndex + 1 }} of {{ questions.length }}
      </div>
      <div class="timer" :class="{ warning: timeLeft <= 60 }">
        <q-icon name="schedule" size="18px" />
        {{ formattedTime }}
      </div>
    </header>

    <!-- Question Card -->
    <q-card flat bordered class="question-card">
      <q-card-section>
        <div class="question-type">
          <q-icon :name="questionIcon" size="18px" color="primary" />
          {{ currentQuestion.typeLabel }}
        </div>
        <div class="question-text">
          {{ currentQuestion.text }}
        </div>

        <!-- Multiple Choice -->
        <div v-if="currentQuestion.type === 'multiple'">
          <q-option-group
            v-model="answers[currentQuestion.id]"
            :options="currentQuestion.options"
            :type="currentQuestion.multiple ? 'checkbox' : 'radio'"
          />
        </div>

        <!-- Coding -->
        <div v-else-if="currentQuestion.type === 'coding'">
          <q-input
            v-model="answers[currentQuestion.id]"
            type="textarea"
            rows="10"
            placeholder="Write your code here..."
          />
        </div>

        <!-- Descriptive -->
        <div v-else-if="currentQuestion.type === 'descriptive'">
          <q-input
            v-model="answers[currentQuestion.id]"
            type="textarea"
            rows="5"
            placeholder="Write your answer here..."
            @input="updateWordCount"
          />
          <div class="word-count">{{ wordCount }} words</div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Footer Navigation -->
    <footer class="nav-footer">
      <q-btn
        label="Previous"
        flat
        :disable="currentIndex === 0 || oneWay"
        @click="prevQuestion"
      />
      <div class="progress-indicator">
        Progress: {{ currentIndex + 1 }}/{{ questions.length }}
      </div>
      <q-btn
        v-if="!isLastQuestion"
        label="Next"
        color="primary"
        @click="nextQuestion"
      />
      <q-btn
        v-else
        label="Submit Test"
        color="positive"
        @click="showSubmitModal = true"
      />
    </footer>

    <!-- Submit Test Modal -->
    <q-dialog v-model="showSubmitModal" persistent>
      <q-card style="width: 400px; max-width: 90vw;">
        <q-card-section class="row items-center q-pb-none">
          <q-icon name="warning" color="orange" size="32px" class="q-mr-sm" />
          <div class="text-h6">Submit Your Test?</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Are you sure you want to submit your screening test?
        </q-card-section>

        <q-card-section class="bg-orange-1 q-pa-sm rounded-borders">
          <div class="row items-center">
            <q-icon name="error_outline" color="orange" size="20px" class="q-mr-sm" />
            <strong>Important Notice</strong>
          </div>
          <div class="text-caption q-mt-xs">
            Once submitted, you won't be able to change your answers or retake this test.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            label="Yes, Submit"
            color="primary"
            @click="confirmSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const jobTitle = ref(route.query.jobTitle || 'Software Developer');
const oneWay = false;
const timeLimit = 20 * 60;

const questions = ref([
  {
    id: 1,
    type: 'multiple',
    typeLabel: 'Multiple Choice Question',
    text: 'Which of the following best describes responsive web design?',
    options: [
      { label: 'Design that responds to user clicks', value: 'a' },
      { label: 'Design that adapts to different screen sizes', value: 'b' },
      { label: 'Design that loads quickly', value: 'c' },
      { label: 'Design that uses animations', value: 'd' }
    ],
    multiple: false
  },
  {
    id: 2,
    type: 'coding',
    typeLabel: 'Coding Question',
    text: 'Write a function in JavaScript to reverse a string.'
  },
  {
    id: 3,
    type: 'descriptive',
    typeLabel: 'Descriptive Question',
    text: 'Explain the difference between client-side and server-side rendering.'
  }
]);

const currentIndex = ref(0);
const answers = ref({});
const timeLeft = ref(timeLimit);
const wordCount = ref(0);
const showSubmitModal = ref(false);
let timerInterval;
let autoSaveInterval;

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1);
const formattedTime = computed(() => {
  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0');
  const s = String(timeLeft.value % 60).padStart(2, '0');
  return `${m}:${s}`;
});
const questionIcon = computed(() => {
  switch (currentQuestion.value.type) {
    case 'multiple': return 'list';
    case 'coding': return 'code';
    case 'descriptive': return 'description';
    default: return 'help';
  }
});

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  }
};
const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
const updateWordCount = () => {
  wordCount.value = answers.value[currentQuestion.value.id]?.trim().split(/\s+/).length || 0;
};

const confirmSubmit = () => {
  showSubmitModal.value = false;
  submitTest();
};

const submitTest = () => {
  console.log('Submitting answers:', answers.value);
  clearInterval(timerInterval);
  clearInterval(autoSaveInterval);
  $q.notify({ type: 'positive', message: 'Test submitted successfully!' });
  router.push({ name: 'TestUnderReview' }); // Add navigation here
};

const autoSave = () => {
  console.log('Auto-saving answers:', answers.value);
};
const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value === 300 || timeLeft.value === 60) {
      $q.notify({
        type: 'warning',
        message: timeLeft.value === 300 ? '5 minutes remaining!' : '1 minute remaining!',
        position: 'top'
      });
    }
    if (timeLeft.value <= 0) {
      submitTest();
    }
  }, 1000);

  autoSaveInterval = setInterval(autoSave, 5000);
};

onMounted(() => {
  if (route.query.start === 'true') {
    startTimer();
  }
});

onUnmounted(() => {
  clearInterval(timerInterval);
  clearInterval(autoSaveInterval);
});
</script>

<style scoped>
.test-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9fafb;
  padding: 16px;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.job-title {
  font-weight: bold;
  font-size: 16px;
}

.progress {
  font-size: 14px;
  color: #555;
}

.timer {
  background: #e8f5e9;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.timer.warning {
  background: #fff3e0;
  color: #e65100;
}

.question-card {
  max-width: 800px;
  margin: 20px auto;
}

.question-type {
  font-size: 13px;
  color: #777;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.question-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}

.word-count {
  font-size: 12px;
  color: #777;
  margin-top: 4px;
}

.nav-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  position: sticky;
  bottom: 0;
}

.progress-indicator {
  font-size: 14px;
  color: #555;
}
</style>
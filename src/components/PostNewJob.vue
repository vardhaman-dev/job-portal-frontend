<template>
  <div class="q-pa-md q-pa-lg-xl post-job-bg">
    <div class="step-indicator-container q-mb-xl">
      <div class="text-center q-mb-md">
        <div class="text-overline text-primary">Step {{ step }} of 5</div>
        <div class="text-h5 text-weight-bold step-section-title">{{ stepSections[step - 1] }}</div>
      </div>
      <q-linear-progress :value="step / 5" color="primary" track-color="white" size="8px" rounded />
    </div>

    <q-card v-if="step === 1" class="step-card">
      <q-card-section class="q-pt-lg">
        <div class="text-h6">Job Details</div>
        <p>Provide the essential details for your job opening.</p>
      </q-card-section>
      <q-form @submit.prevent="nextStep">
        <q-card-section class="q-pa-md">
          <div class="q-gutter-y-lg">
            <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
              <div class="col-12 col-md-6">
                <q-input v-model="form.title" label="Job Title" filled stack-label required />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="form.location" label="Job Location (e.g., City, 'Remote')" filled stack-label required />
              </div>
              <div class="col-12 col-md-6">
                <q-select v-model="form.type" label="Job Type" :options="['Full Time', 'Remote', 'Hybrid']" filled stack-label required />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model.number="form.positions" type="number" label="Number of Positions" filled stack-label required />
              </div>
            </div>
          </div>
          <q-separator spaced="xl" />
          <div class="q-gutter-y-lg">
             <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
                <div class="col-12 col-md-6">
                   <q-input v-model="form.salary" label="Salary Range" filled stack-label required hint="e.g., $80,000 - $100,000 per year" />
                </div>
                <div class="col-12 col-md-6">
                   <q-input v-model="form.timeline" label="Recruitment Timeline" filled stack-label required hint="e.g., 'Immediate', 'Within 2 weeks'" />
                </div>
             </div>
             <q-input v-model="form.benefits" label="Bonus and Benefits (Optional)" filled stack-label />
          </div>
          <q-separator spaced="xl" />
          <div>
            <div class="text-subtitle1 q-mb-sm text-weight-medium">Job Description</div>
            <q-editor
              v-model="form.description"
              placeholder="Describe the responsibilities, requirements, and what makes this role exciting..."
              :min-height="150" :max-height="250"
              :toolbar="[['bold', 'italic', 'underline'], ['unordered', 'ordered']]"
              :rules="descriptionRules"
            >
             <template v-slot:after>
                <div class="text-caption text-right q-pa-sm" :class="plainDescription.length < 200 ? 'text-negative' : 'text-positive'">
                  {{ plainDescription.length }} / 200+ characters
                </div>
             </template>
            </q-editor>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn glossy label="next" color="primary" type="submit" padding="xs lg" />
        </q-card-actions>
      </q-form>
    </q-card>

    <q-card v-if="step === 2" class="step-card">
       <q-card-section class="q-pt-lg">
        <div class="text-h6">Candidate Requirements</div>
        <p>Specify the desired qualifications. These fields are optional but recommended.</p>
      </q-card-section>
      <q-card-section class="q-gutter-y-lg">
         <q-input v-model="form.experience" label="Experience Range" filled stack-label hint="e.g. 2-5 years" />
         <q-input v-model="form.skills" label="Key Skills" filled stack-label hint="Enter skills separated by commas" />
         <q-input v-model="form.education" label="Education Level" filled stack-label hint="e.g. Bachelor's Degree in Computer Science" />
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Back" color="black" @click="step--" />
        <q-btn glossy color="primary" label="next" @click="nextStep" padding="xs lg" />
      </q-card-actions>
    </q-card>

    <q-card v-if="step === 3" class="step-card">
      <q-card-section class="q-pt-lg">
        <div class="text-h6">Application Preferences</div>
        <p>Set how you want to receive and manage applications.</p>
      </q-card-section>
      <q-form @submit.prevent="nextStep">
        <q-card-section class="q-gutter-y-xl">
          <q-option-group
            v-model="form.communication"
            :options="[{ label: 'Email', value: 'email' }, { label: 'Mobile', value: 'mobile' }, { label: 'WhatsApp', value: 'whatsapp' }]"
            type="checkbox" label="Preferred Communication Methods" inline
          />
          <q-input v-model="form.deadline" label="Application Deadline" type="date" filled stack-label required />
          <q-toggle v-model="form.resumeRequired" label="Resume submission is required" left-label />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Back" color="black" @click="step--" />
          <q-btn glossy color="primary" label="next" type="submit" padding="xs lg" />
        </q-card-actions>
      </q-form>
    </q-card>

    <q-card v-if="step === 4" class="step-card">
      <q-card-section class="q-pt-lg">
        <div class="text-h6">Screening Questions (Optional)</div>
        <p>Add questions to automatically filter candidates. Mark deal-breakers to auto-reject.</p>
      </q-card-section>
      <q-card-section>
        <transition-group name="fade-list" tag="div">
          <div v-for="(q, index) in form.questions" :key="q.id" class="q-mb-md question-card q-pa-md">
            <div class="question-header q-mb-md">
               <div class="text-subtitle1 text-weight-medium">Question {{ index + 1 }}</div>
               <q-btn flat dense round icon="delete" color="negative" @click="removeQuestion(index)" />
            </div>
            <div class="q-gutter-y-md">
              <q-input v-model="q.text" label="Screening Question" filled stack-label />
              <q-select v-model="q.type" :options="['Short Answer', 'Yes/No', 'Multiple Choice']" label="Question Type" filled stack-label />
              <q-toggle v-model="q.mandatory" label="Mark as Deal-Breaker" left-label />
            </div>
          </div>
        </transition-group>
        <q-btn flat icon="add" label="Add Question" @click="addQuestion" color="primary" class="q-mt-sm" />
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Back" color="black" @click="step--" />
        <q-btn glossy color="primary" label="next" @click="nextStep" padding="xs lg" />
      </q-card-actions>
    </q-card>

    <q-card v-if="step === 5" class="step-card">
      <q-card-section class="q-pt-lg">
        <div class="text-h6">Review & Submit</div>
        <p>Please review all the information carefully before submitting.</p>
      </q-card-section>
      <q-card-section>
        <q-list bordered class="rounded-borders review-list">
          <q-item><q-item-section><q-item-label overline>Job Title</q-item-label><q-item-label>{{ form.title }}</q-item-label></q-item-section></q-item>
          <q-item><q-item-section><q-item-label overline>Location</q-item-label><q-item-label>{{ form.location }}</q-item-label></q-item-section></q-item>
          <q-item><q-item-section><q-item-label overline>Job Type</q-item-label><q-item-label>{{ form.type }}</q-item-label></q-item-section></q-item>
          <q-item><q-item-section><q-item-label overline>Salary</q-item-label><q-item-label>{{ form.salary }}</q-item-label></q-item-section></q-item>
          <q-item><q-item-section><q-item-label overline>Description</q-item-label><q-item-label caption class="q-pt-xs">{{ plainDescription }}</q-item-label></q-item-section></q-item>
          <q-item><q-item-section><q-item-label overline>Experience</q-item-label><q-item-label>{{ form.experience || 'Not specified' }}</q-item-label></q-item-section></q-item>
          <q-item v-if="form.questions.length">
            <q-item-section>
              <q-item-label overline>Screening Questions</q-item-label>
              <q-item-label>
                <ul class="q-pl-lg q-my-sm">
                  <li v-for="(q, idx) in form.questions" :key="idx">
                    {{ q.text }} ({{ q.type }}) <q-chip v-if="q.mandatory" dense square color="negative" text-color="white" size="sm">Deal-Breaker</q-chip>
                  </li>
                </ul>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-if="submitted" class="text-positive q-mt-md text-center text-subtitle1">
          <q-icon name="check_circle" /> Status: <strong>Pending Admin Approval</strong>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Back" color="black" @click="step--" :disable="submitted"/>
        <q-btn glossy label="submit profile" color="primary" @click="submitJob" :loading="submitted" padding="xs lg" icon-right="send" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter()
const $q = useQuasar()
const step = ref(1)
const submitted = ref(false)

const stepSections = [
  'Job Details', 'Candidate Requirements', 'Application Preferences', 'Screening Questions', 'Review & Submit'
]

const form = ref({
  title: '', location: '', type: null, positions: 1, timeline: '', salary: '', benefits: '', description: '',
  experience: '', skills: '', education: '', communication: ['email'], resumeRequired: true, deadline: '', questions: []
})

const plainDescription = computed(() => (form.value.description || '').replace(/<[^>]*>/g, '').trim())
const descriptionRules = [val => (val && plainDescription.value.length >= 200) || 'Minimum 200 characters required.'];

let questionId = 0;
const addQuestion = () => {
  form.value.questions.push({ id: questionId++, text: '', type: 'Short Answer', mandatory: false })
}
const removeQuestion = (index) => { form.value.questions.splice(index, 1) }
const nextStep = () => { if (step.value < 5) step.value++ }

const submitJob = () => {
  submitted.value = true
  $q.notify({
    type: 'positive', message: 'Job submitted successfully! Awaiting admin review.', position: 'top',
    icon: 'cloud_done', timeout: 2500
  })
  setTimeout(() => { router.push('/employer-portal') }, 2000)
}
</script>

<style scoped>
.post-job-bg {
  min-height: 100vh;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #eef5ff 100%);
}

.step-indicator-container {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.step-section-title {
  color: #0B2545; /* Deep, rich blue for main titles */
}

.step-card {
  max-width: 800px;
  margin: 0 auto 32px auto;
  border-radius: 16px;
  background: #fff;
  border: none;
  box-shadow: 0 10px 30px -15px rgba(45, 108, 255, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.step-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -15px rgba(45, 108, 255, 0.3);
}

.step-card .text-h6 {
  font-weight: 700;
  color: #10316B; /* Strong blue for card titles */
}

.step-card p {
  color: #4A6D8C; /* Muted, soft blue for descriptive text */
}

.step-card .text-subtitle1 {
  color: #10316B; /* Strong blue for section subtitles within cards */
}

/* Add a subtle glow to focused inputs */
:deep(.q-field--focused .q-field__control) {
  box-shadow: 0 0 0 3px rgba(45, 108, 255, 0.15);
}

.review-list.q-list--bordered {
  border: 1px solid #e2eefe;
}
.review-list .q-item--separator { border-color: #f5f7fa; }
.review-list .q-item__label--overline { font-weight: 600; color: var(--q-primary); }
.review-list .q-item__label { color: #0B2545; }
.review-list .q-item__label--caption { color: #4A6D8C; }
.review-list li { color: #0B2545; }

.question-card {
  border: 1px dashed #c9d9ff;
  border-radius: 12px;
  background-color: #fbfdff;
}

/* Transition for the list of questions */
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.4s ease;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

@media (max-width: 600px) {
  .post-job-bg { padding: 16px; }
  .text-h5 { font-size: 1.25rem; }
  .step-card { border-radius: 12px; }
}
</style>
<template>
  <div class="page-wrapper row no-wrap">
    <div class="sidebar">
       <div class="sidebar-section logo-section flex items-center q-gutter-sm q-pa-md">
         <q-avatar icon="business_center" color="white" text-color="primary" />
         <div>
           <div class="text-h6 text-white">JobHub</div>
           <div class="text-caption text-blue-grey-3">Employer Portal</div>
         </div>
       </div>
       <div class="sidebar-section q-pt-sm q-pb-none q-px-md">
         <div class="text-subtitle1 text-weight-medium text-white">{{ employer.name }}</div>
         <div class="text-caption text-blue-grey-4">{{ employer.email }}</div>
       </div>
       <div class="sidebar-section q-pt-md q-pb-none">
         <q-list class="nav-list">
           <q-item v-for="link in links" :key="link.label" :active="selected === link.label" active-class="active-link"
             clickable v-ripple @click="navigate(link)">
             <q-item-section avatar>
               <q-icon :name="link.icon" />
             </q-item-section>
             <q-item-section>
               {{ link.label }}
             </q-item-section>
           </q-item>
         </q-list>
       </div>
       <div class="sidebar-section q-mt-auto">
         <q-btn flat icon="logout" label="Logout" class="full-width logout-btn" @click="logout" />
       </div>
     </div>

    <div class="content-area post-job-bg q-pa-md q-pa-lg-xl">
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
                 <div class="col-12 col-md-6"><q-input v-model="form.title" label="Job Title" filled stack-label required /></div>
                 <div class="col-12 col-md-6"><q-input v-model="form.location" label="Job Location (e.g., City, 'Remote')" filled stack-label required /></div>
                 <div class="col-12 col-md-6"><q-select v-model="form.type" label="Job Type" :options="['Full Time', 'Remote', 'Hybrid']" filled stack-label required /></div>
                 <div class="col-12 col-md-6"><q-input v-model.number="form.positions" type="number" label="Number of Positions" filled stack-label required /></div>
               </div>
             </div>
             <q-separator spaced="xl" />
             <div class="q-gutter-y-lg">
               <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
                 <div class="col-12 col-md-6"><q-input v-model="form.salary" label="Salary Range (per annum)" filled stack-label required hint="e.g., ₹8,00,000 - ₹12,00,000" /></div>
                 
                 <div class="col-12 col-md-6"><q-input v-model="form.timeline" label="Recruitment Timeline" filled stack-label required hint="e.g., 'Immediate', 'Within 2 weeks'" /></div>
               </div>
               <q-input v-model="form.benefits" label="Bonus and Benefits (Optional)" filled stack-label />
             </div>
              <q-separator spaced="xl" />
             <!-- Tags input field -->
<div class="row">
  <div class="col-12">
  <q-input
  v-model="tagInput"
  label="Job Tags"
  filled
  stack-label
  hint="Type a tag and press Enter or comma"
  @keyup="onTagKeyup"
  @blur="addTag"
>
  <template v-slot:append>
    <q-chip
      v-for="(tag, index) in form.tags"
      :key="index"
      removable
      @remove="form.tags.splice(index, 1)"
      class="q-mr-xs"
      color="primary"
      text-color="white"
    >
      {{ tag }}
    </q-chip>
  </template>
</q-input>

  </div>
</div>

             <q-separator spaced="xl" />
             <div>
               <div class="text-subtitle1 q-mb-sm text-weight-medium">Job Description</div>
               <q-editor v-model="form.description" placeholder="Describe the responsibilities, requirements..." :min-height="150" :toolbar="[['bold', 'italic', 'underline'], ['unordered', 'ordered']]" :rules="descriptionRules">
                 <template v-slot:after>
                   <div class="text-caption text-right q-pa-sm" :class="plainDescription.length < 200 ? 'text-negative' : 'text-positive'">{{ plainDescription.length }} / 200+ characters</div>
                 </template>
               </q-editor>
             </div>
           </q-card-section>
           <q-card-actions align="right" class="q-pa-md"><q-btn glossy label="next" color="primary" type="submit" padding="xs lg" /></q-card-actions>
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
             <q-option-group v-model="form.communication" :options="[{ label: 'Email', value: 'email' }, { label: 'Mobile', value: 'mobile' }, { label: 'WhatsApp', value: 'whatsapp' }]" type="checkbox" label="Preferred Communication Methods" inline />
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
             <q-item><q-item-section><q-item-label overline>Salary</q-item-label><q-item-label>{{ form.salary }}</q-item-label></q-item-section></q-item>
             <q-item><q-item-section><q-item-label overline>Description</q-item-label><q-item-label caption class="q-pt-xs">{{ plainDescription }}</q-item-label></q-item-section></q-item>
           </q-list>
           <div v-if="submitted" class="text-positive q-mt-md text-center text-subtitle1"><q-icon name="check_circle" /> Status: <strong>Pending Admin Approval</strong></div>
         </q-card-section>
         <q-card-actions align="right" class="q-pa-md">
           <q-btn flat label="Back" color="black" @click="step--" :disable="submitted" />
           <q-btn glossy label="submit job" color="primary" @click="submitJob" :loading="submitted" padding="xs lg" icon-right="send" />
         </q-card-actions>
       </q-card>
     </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import jobService from '../services/jobpost.service'

const router = useRouter();
const $q = useQuasar();
const step = ref(1);
const submitted = ref(false);
const tagInput = ref(''); // Add ref for tag input

const employer = ref({ name: 'Innovate Inc.', email: 'hr@innovate.com' });
const selected = ref('Post New Job');

onMounted(() => {
  const stored = localStorage.getItem('employerData');
  if (stored) {
    employer.value = JSON.parse(stored);
  }
});

const links = [
  { label: 'Dashboard Overview', icon: 'dashboard', to: '/employer-portal' },
  { label: 'Posted Jobs', icon: 'work', to: '/posted-jobs' },
  { label: 'Post New Job', icon: 'add_box', to: '/post-job' },
  { label: 'Candidates', icon: 'groups', to: '/candidates' },
  { label: 'Messages', icon: 'mail', to: '/employer-messages' },
  { label: 'Company Profile', icon: 'domain', to: '/company-profile' },
  { label: 'Settings', icon: 'settings' }
];

const navigate = (link) => {
  selected.value = link.label;
  if (link.to) router.push(link.to);
};

const logout = () => {
  localStorage.removeItem('employerData');
  router.push('/employers');
};

const stepSections = [
  'Job Details', 'Candidate Requirements', 'Application Preferences', 'Screening Questions', 'Review & Submit'
];

const form = ref({
  title: '', location: '', type: null, positions: 1, timeline: '', salary: '', benefits: '', description: '',
  experience: '', skills: '', education: '', communication: ['email'], resumeRequired: true, deadline: '',
  questions: [], tags: []
});

const plainDescription = computed(() => (form.value.description || '').replace(/<[^>]*>/g, '').trim());
const descriptionRules = [val => (val && plainDescription.value.length >= 200) || 'Minimum 200 characters required.'];

let questionId = 0;
const addQuestion = () => form.value.questions.push({ id: questionId++, text: '', type: 'Short Answer', mandatory: false });
const removeQuestion = (index) => form.value.questions.splice(index, 1);
const nextStep = () => { if (step.value < 5) step.value++ };

// Add tag handling methods
const addTag = () => {
  if (tagInput.value.trim()) {
    form.value.tags.push(tagInput.value.trim());
    tagInput.value = ''; // Clear input after adding
  }
};

const onTagKeyup = (event) => {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault();
    addTag();
  }
};

const submitJob = async () => {
  submitted.value = true;

  const employerData = JSON.parse(localStorage.getItem('employerData') || '{}');
  const payload = {
    company_id: employerData.id,
    title: form.value.title,
    description: form.value.description,
    location: form.value.location,
    type: form.value.type,
    salary: form.value.salary,
    deadline: form.value.deadline,
    skills: form.value.skills.split(',').map(s => s.trim()).filter(Boolean),
    tags: form.value.tags,
    status: 'open'
  };

  console.log('Payload being sent:', payload); // Debug log to verify tags

  const result = await jobService.postJob(payload);

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: `Job posted successfully!`,
      icon: 'check_circle',
      position: 'top'
    });
    setTimeout(() => router.push('/employer-portal'), 1500);
  } else {
    $q.notify({
      type: 'negative',
      message: `Error: ${result.error}`,
      icon: 'error',
      position: 'top'
    });
    submitted.value = false;
  }
};
</script>

<style scoped>
/* Styles are unchanged */
.page-wrapper {
  height: 100vh;
}
.sidebar {
  width: 260px;
  background-color: #102A43;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
}
.sidebar-section {
  border-bottom: 1px solid #243B55;
}
.logo-section {
  border-bottom-color: transparent;
}
.nav-list .q-item {
  color: #BCCCDC;
  padding: 12px;
  margin: 4px 12px;
  border-radius: 8px;
}
.nav-list .q-item:hover {
  background-color: #243B55;
  color: #ffffff;
}
.active-link {
  background-color: #00529b !important;
  color: #ffffff !important;
  font-weight: 600;
}
.logout-btn {
  color: #FFB5B5;
  border-radius: 8px;
  margin: 16px;
}
.logout-btn:hover {
  background-color: #d32f2f;
  color: #ffffff;
}
.content-area {
  flex: 1;
  overflow-y: auto;
}
.post-job-bg {
  min-height: 100vh;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #eef5ff 100%);
}
.step-indicator-container {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
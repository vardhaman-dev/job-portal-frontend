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
          <q-item v-for="link in links" :key="link.label" :active="selected === link.label"
            active-class="active-link" clickable v-ripple @click="navigate(link)">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>{{ link.label }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="sidebar-section q-mt-auto">
        <q-btn flat icon="logout" label="Logout" class="full-width logout-btn" @click="logout" />
      </div>
    </div>

    <div class="content-area column q-pa-md">
      <div class="row justify-between items-center q-mb-md">
        <div>
          <div class="text-h5 text-weight-bold content-title">Candidate Pipeline</div>
          <div class="text-subtitle1 text-grey-7">Review and manage your applicants.</div>
        </div>
      </div>

      <q-card flat bordered class="q-mb-md control-bar">
        <div class="row items-center q-pa-sm q-gutter-md">
          <div class="col-12 col-md-4">
            <q-select outlined dense v-model="selectedJobId" :options="jobOptions" label="Filter by Job" emit-value
              map-options options-dense />
          </div>
          <div class="col-12 col-md-4">
            <q-input outlined dense v-model="searchQuery" placeholder="Search candidate name..." debounce="300"
              :disable="!selectedJobId">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card>

      <div v-if="selectedJobId" class="kanban-board-wrapper">
        <div class="kanban-board row no-wrap q-gutter-md">
          <div v-for="stage in stages" :key="stage" class="kanban-column">
            <div class="column-header text-subtitle1 text-weight-medium">
              {{ stage }}
              <q-badge rounded color="primary" class="q-ml-sm">{{ getStageCandidateCount(stage) }}</q-badge>
            </div>
            <div class="column-body">
              <transition-group name="fade-list">
                <q-card v-for="candidate in candidatesByStage[stage]" :key="candidate.id" class="candidate-card q-mb-sm"
                  @click="viewCandidate(candidate)">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar color="blue-grey-2" text-color="primary" class="text-weight-bold">
                        {{ candidate.name.charAt(0) }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">{{ candidate.name }}</q-item-label>
                      <q-item-label caption>Applied {{ formatTimeAgo(candidate.appliedDate) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
      <q-card v-else class="flex flex-center" style="height: 50vh;">
        <div class="text-center text-grey-6">
          <q-icon name="work_outline" size="4rem" />
          <div class="text-h6 q-mt-md">Please select a job to view candidates.</div>
        </div>
      </q-card>

      <q-dialog v-model="showCandidateDetail" position="right" full-height>
        <q-card v-if="selectedCandidate" style="width: 500px; max-width: 90vw;">
          <q-card-section class="q-pa-md">
            <div class="row items-center justify-between">
              <q-item class="q-pa-none">
               <q-item-section avatar>
                 <q-avatar size="52px" color="primary" text-color="white">{{ selectedCandidate.name.charAt(0) }}</q-avatar>
               </q-item-section>
               <q-item-section>
                 <q-item-label class="text-h6">{{ selectedCandidate.name }}</q-item-label>
                 <q-item-label caption>Applied for {{ getJobTitle(selectedCandidate.jobId) }}</q-item-label>
               </q-item-section>
              </q-item>
              <q-btn icon="close" flat round dense v-close-popup />
            </div>
          </q-card-section>
          <q-separator />

          <q-tabs v-model="detailTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
            <q-tab name="profile" label="Profile" />
            <q-tab name="application" label="Application" />
            <q-tab name="notes" label="Notes" />
          </q-tabs>
          <q-separator />
          
          <q-tab-panels v-model="detailTab" animated>
            <q-tab-panel name="profile" class="q-pa-md q-gutter-y-md">
              <div class="row items-center">
                <q-icon name="email" class="q-mr-sm text-grey-7" /> {{ selectedCandidate.email }}
              </div>
              <div class="row items-center">
                <q-icon name="phone" class="q-mr-sm text-grey-7" /> {{ selectedCandidate.phone }}
              </div>
              <q-btn icon="description" label="Download Resume" color="primary" outline :href="selectedCandidate.resumeUrl" target="_blank" />
              <div>
                <div class="text-weight-medium q-mb-sm">Skills</div>
                <q-chip v-for="skill in selectedCandidate.skills" :key="skill" outline color="primary" text-color="white">{{ skill }}</q-chip>
              </div>
            </q-tab-panel>
            
            <q-tab-panel name="application">
              <div class="text-weight-medium q-mb-md">Screening Answers</div>
              <q-list bordered separator>
                <q-item v-for="(answer, index) in selectedCandidate.answers" :key="index">
                  <q-item-section>
                    <q-item-label overline>{{ answer.question }}</q-item-label>
                    <q-item-label>{{ answer.answer }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="notes">
             <div class="text-weight-medium q-mb-sm">Internal Notes</div>
             <q-editor v-model="selectedCandidate.notes" min-height="10rem" />
            </q-tab-panel>
          </q-tab-panels>
          
          <q-card-actions align="right" class="q-pa-md">
             <q-btn flat label="Reject" color="negative" @click="changeCandidateStatus(selectedCandidate, 'Rejected')" v-close-popup/>
             <q-btn v-if="selectedCandidate.status !== 'Hired'" label="Next Stage" color="primary" @click="moveToNextStage(selectedCandidate)" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const employer = ref({ name: 'Innovate Inc.', email: 'hr@innovate.com' });
const selected = ref('Candidates');

// --- Mock Data ---
const jobs = ref([
  { id: 1, title: 'Senior Frontend Developer' },
  { id: 2, title: 'UI/UX Designer' },
  { id: 5, title: 'Backend Developer (Node.js)' },
  { id: 7, title: 'Data Scientist' },
]);
const allCandidates = ref([
  { id: 101, name: 'Aarav Sharma', jobId: 1, status: 'New Applicant', appliedDate: '2025-07-29T10:00:00Z', email:'aarav.s@example.com', phone:'+91-9876543210', resumeUrl:'#', skills: ['Vue.js', 'TypeScript', 'Quasar'], answers: [{question: 'Years of Vue experience?', answer:'5+ Years'}], notes: '' },
  { id: 102, name: 'Priya Patel', jobId: 1, status: 'Screening', appliedDate: '2025-07-30T11:30:00Z', email:'priya.p@example.com', phone:'+91-9876543211', resumeUrl:'#', skills: ['React', 'Vue.js', 'Testing'], answers: [{question: 'Years of Vue experience?', answer:'4 Years'}], notes: 'Strong portfolio. Good communication skills.' },
  { id: 103, name: 'Rohan Mehta', jobId: 2, status: 'New Applicant', appliedDate: '2025-07-28T09:00:00Z', email:'rohan.m@example.com', phone:'+91-9876543212', resumeUrl:'#', skills: ['Figma', 'User Research', 'Prototyping'], answers: [], notes: '' },
  { id: 104, name: 'Sneha Verma', jobId: 1, status: 'Interview', appliedDate: '2025-07-27T15:00:00Z', email:'sneha.v@example.com', phone:'+91-9876543213', resumeUrl:'#', skills: ['Vue.js', 'Nuxt.js', 'GraphQL'], answers: [{question: 'Years of Vue experience?', answer:'6 Years'}], notes: 'Scheduled for technical round on 4th Aug.' },
  { id: 105, name: 'Vikram Singh', jobId: 5, status: 'Screening', appliedDate: '2025-07-31T14:00:00Z', email:'vikram.s@example.com', phone:'+91-9876543214', resumeUrl:'#', skills: ['Node.js', 'PostgreSQL', 'AWS'], answers: [], notes: '' },
  { id: 106, name: 'Ananya Iyer', jobId: 1, status: 'Hired', appliedDate: '2025-07-20T18:00:00Z', email:'ananya.i@example.com', phone:'+91-9876543215', resumeUrl:'#', skills: ['Vue.js', 'Pinia', 'Animations'], answers: [{question: 'Years of Vue experience?', answer:'5 Years'}], notes: 'Offer accepted. Joining 1st Sept.' },
]);

// --- Page State ---
const selectedJobId = ref(null);
const searchQuery = ref('');
const showCandidateDetail = ref(false);
const selectedCandidate = ref(null);
const detailTab = ref('profile');
const stages = ['New Applicant', 'Screening', 'Interview', 'Offered', 'Hired', 'Rejected'];

// --- Computed Properties ---
const jobOptions = computed(() => jobs.value.map(job => ({ label: job.title, value: job.id })));

const filteredCandidates = computed(() => {
  if (!selectedJobId.value) return [];
  let candidates = allCandidates.value.filter(c => c.jobId === selectedJobId.value);
  if (searchQuery.value) {
    candidates = candidates.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  return candidates;
});

const candidatesByStage = computed(() => {
  const grouped = {};
  stages.forEach(stage => { grouped[stage] = []; });
  filteredCandidates.value.forEach(candidate => {
    if (grouped[candidate.status]) {
      grouped[candidate.status].push(candidate);
    }
  });
  return grouped;
});

// --- Lifecycle & Watchers ---
onMounted(() => {
  const stored = localStorage.getItem('employerData');
  if (stored) employer.value = JSON.parse(stored);
  // Check if a jobId is passed in the URL query
  const jobIdFromQuery = parseInt(route.query.jobId);
  if (jobIdFromQuery && jobs.value.some(j => j.id === jobIdFromQuery)) {
    selectedJobId.value = jobIdFromQuery;
  }
});

watch(selectedJobId, () => {
    searchQuery.value = ''; // Reset search when job changes
});

// --- Methods ---
const getStageCandidateCount = (stage) => candidatesByStage.value[stage]?.length || 0;
const getJobTitle = (jobId) => jobs.value.find(j => j.id === jobId)?.title || 'N/A';
const viewCandidate = (candidate) => {
  selectedCandidate.value = { ...candidate }; // Work with a copy
  detailTab.value = 'profile';
  showCandidateDetail.value = true;
};

const changeCandidateStatus = (candidate, newStatus) => {
  const originalCandidate = allCandidates.value.find(c => c.id === candidate.id);
  if (originalCandidate) {
    originalCandidate.status = newStatus;
  }
};

const moveToNextStage = (candidate) => {
    const currentIndex = stages.indexOf(candidate.status);
    if(currentIndex >= 0 && currentIndex < stages.indexOf('Hired')) { // Can't go past hired this way
        changeCandidateStatus(candidate, stages[currentIndex + 1]);
    }
}

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date(); // Using actual current time
  const seconds = Math.floor((now - date) / 1000);
  let interval = seconds / 86400;
  if (interval > 7) return date.toLocaleDateString('en-IN', {day:'numeric', month:'short'});
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
}

// --- Sidebar Navigation ---
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
</script>

<style scoped>
/* Sidebar and page styles */
.page-wrapper {
  height: 100vh;
  background-color: #f4f8fa;
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
  overflow: hidden; /* Prevent content-area from scrolling */
  display: flex;
  flex-direction: column;
}
.content-title {
  color: #102A43;
}
.control-bar {
  background-color: #ffffff;
  border-radius: 8px;
}
.kanban-board-wrapper {
    flex-grow: 1;
    overflow-x: auto; /* Enable horizontal scrolling for the board */
    padding-bottom: 16px;
}
.kanban-board {
    min-height: 100%;
}
.kanban-column {
  width: 300px;
  min-width: 300px;
  background-color: #eef2f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.column-header {
  padding: 12px 16px;
  border-bottom: 2px solid #dde4ea;
  color: #102A43;
}
.column-body {
  flex-grow: 1;
  padding: 8px;
  overflow-y: auto;
}
.candidate-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.candidate-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.4s ease;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
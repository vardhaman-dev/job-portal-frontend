<template>
  <div class="employer-portal">
     <AppHeader />
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
          <q-item
            v-for="link in links"
            :key="link.label"
            :active="selected === link.label"
            active-class="active-link"
            clickable
            v-ripple
            @click="navigate(link)"
          >
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
        <q-btn
          flat
          icon="logout"
          label="Logout"
          class="full-width logout-btn"
          @click="logout"
        />
      </div>
    </div>

    <div class="content-area column q-pa-lg">
      <div class="row justify-between items-center q-mb-lg">
        <div>
          <div class="text-h5 text-weight-bold content-title">Welcome back, {{ employer.name }}!</div>
          <div class="text-subtitle1 text-grey-7">Here's your hiring overview for today, July 29, 2025.</div>
        </div>
        <q-btn glossy color="primary" label="+ Post a New Job" @click="goToPostJob" />
      </div>

      <div class="row q-col-gutter-lg q-mb-lg">
        <div class="col-12 col-sm-6 col-md-3" v-for="stat in stats" :key="stat.label">
          <q-card class="stat-box">
            <q-card-section class="flex items-center no-wrap">
              <q-icon :name="stat.icon" color="primary" size="2.5em" class="q-mr-md" />
              <div>
                <div class="text-h5 text-weight-bolder stat-value">{{ stat.value }}</div>
                <div class="text-subtitle2 stat-label">{{ stat.label }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card class="jobs-table-card">
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="text-h6 content-title">Your Job Postings</div>
            <q-space />
            <q-input
              dense
              outlined
              placeholder="Search jobs..."
              class="q-mr-md"
              v-model="search"
              debounce="300"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-select
              dense
              outlined
              v-model="statusFilter"
              :options="['All Status', 'Approved', 'Pending', 'Rejected']"
              style="min-width: 150px;"
            />
          </div>

          <q-table
            :rows="filteredJobs"
            :columns="columns"
            row-key="id"
            flat
            class="jobs-table"
          >
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-badge
                  :class="`status-${props.row.status.toLowerCase()}`"
                >
                  {{ props.row.status }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <div class="action-buttons">
                  <q-btn flat round size="sm" icon="visibility" color="primary" @click="viewJob(props.row)" />
                  <q-btn flat round size="sm" icon="edit" color="orange-7" @click="editJob(props.row)" />
                  <q-btn flat round size="sm" icon="delete" color="red-7" @click="deleteJob(props.row)" />
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from 'src/components/HeaderPart.vue';

const router = useRouter();

const employer = ref({ name: 'Innovate Inc.', email: 'hr@innovate.com' });
const search = ref('');
const statusFilter = ref('All Status');
const selected = ref('Dashboard Overview');

onMounted(() => {
  const stored = localStorage.getItem('employerData');
  if (stored) {
    employer.value = JSON.parse(stored);
  }
});

const goToPostJob = () => router.push('/post-job');

const links = [
  { label: 'Dashboard Overview', icon: 'dashboard', to: '/employer-portal' },
  { label: 'Posted Jobs', icon: 'work' },
  { label: 'Post New Job', icon: 'add_box', to: '/post-job' },
  { label: 'Candidates', icon: 'groups' },
  { label: 'Messages', icon: 'mail' },
  { label: 'Company Profile', icon: 'domain' },
  { label: 'Settings', icon: 'settings' }
];

const navigate = (link) => {
  selected.value = link.label;
  if (link.to) {
    router.push(link.to);
  }
};

const stats = [
  { value: 10, label: 'Total Jobs', icon: 'summarize' },
  { value: 4, label: 'Active Jobs', icon: 'fact_check' },
  { value: 34, label: 'New Applicants', icon: 'person_add' },
  { value: 2, label: 'Pending Review', icon: 'pending_actions' }
];

const jobs = [
  { id: 1, title: 'Senior Frontend Developer', datePosted: '2025-07-01', deadline: '2025-08-01', status: 'Approved', applications: 12 },
  { id: 2, title: 'Lead Backend Engineer', datePosted: '2025-07-10', deadline: '2025-08-05', status: 'Pending', applications: 8 },
  { id: 3, title: 'Principal UI/UX Designer', datePosted: '2025-07-15', deadline: '2025-08-10', status: 'Rejected', applications: 5 },
  { id: 4, title: 'DevOps Specialist', datePosted: '2025-06-25', deadline: '2025-07-25', status: 'Approved', applications: 22 },
];

const columns = [
  { name: 'title', label: 'Job Title', align: 'left', field: 'title', sortable: true },
  { name: 'datePosted', label: 'Date Posted', align: 'left', field: 'datePosted', sortable: true },
  { name: 'deadline', label: 'Deadline', align: 'left', field: 'deadline', sortable: true },
  { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
  { name: 'applications', label: 'Applicants', field: 'applications', align: 'center', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
];

const filteredJobs = computed(() => {
  return jobs.filter(job => {
    const searchMatch = !search.value || job.title.toLowerCase().includes(search.value.toLowerCase());
    const statusMatch = statusFilter.value === 'All Status' || job.status === statusFilter.value;
    return searchMatch && statusMatch;
  });
});


const viewJob = (job) => console.log('Viewing job:', job.title);
const editJob = (job) => console.log('Editing job:', job.title);
const deleteJob = (job) => console.log('Deleting job:', job.title);

const logout = () => {
  localStorage.removeItem('employerData');
  router.push('/employers');
}
</script>

<style scoped>
/* Main Layout */
.page-wrapper {
  height: 100vh;
  background-color: #f4f8fa;
}

/* Sidebar */
.sidebar {
  width: 260px;
  min-width: 260px;
  background-color: #102A43; /* Deep, professional blue */
  display: flex;
  flex-direction: column;
  color: #f0f4f8;
}

.sidebar-section {
  border-bottom: 1px solid #243B55;
}

.logo-section {
  border-bottom-color: transparent;
}

.nav-list .q-item {
  color: #BCCCDC;
  padding-top: 12px;
  padding-bottom: 12px;
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

/* Content Area */
.content-area {
  flex: 1;
  overflow-y: auto;
}
.content-title {
  color: #102A43;
}

/* Stat Boxes */
.stat-box {
  border-radius: 12px;
  /* Enhanced shadow for more prominence */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  border: none;
}
.stat-box:hover {
  transform: translateY(-5px);
  /* Enhanced hover shadow */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
.stat-value { color: #102A43; }
.stat-label { color: #627D98; }

/* Table Card */
.jobs-table-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* Table Styles */
.jobs-table {
  border-radius: 10px;
}

:deep(.jobs-table thead tr) {
  background-color: #f8f9fa;
}

:deep(.jobs-table th) {
  color: #102A43;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e0e0e0;
}

:deep(.jobs-table tbody tr:hover) {
  background-color: #f5faff;
}

:deep(.jobs-table td) {
  font-size: 0.9rem;
  color: #334E68;
  padding: 16px;
  border-bottom: 1px solid #f0f4f8;
}

/* Status Badges */
.q-badge {
  padding: 4px 12px;
  font-weight: 600;
  border-radius: 12px;
  font-size: 0.75rem;
  text-transform: capitalize;
}

.status-approved { background: rgba(39, 174, 96, 0.1); color: #218838; }
.status-pending { background: rgba(242, 153, 74, 0.15); color: #e65100; }
.status-rejected { background: rgba(235, 87, 87, 0.1); color: #c82333; }

/* Action Buttons */
.action-buttons .q-btn {
  margin: 0 2px;
  transition: transform 0.2s, background-color 0.2s;
}

.action-buttons .q-btn:hover {
  transform: scale(1.15);
}
</style>
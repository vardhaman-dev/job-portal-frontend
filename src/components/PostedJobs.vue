<template>
  <div class="portal-layout">
    <AppHeader class="sticky-header" />
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

      <div class="content-area column q-pa-lg">
        <div class="text-h5 text-weight-bold q-mb-xs content-title">All Posted Jobs</div>
        <p class="text-grey-7 q-mb-lg">Manage, edit, and review your company's job listings.</p>
        <q-card flat bordered class="q-mb-md control-bar">
          <div class="row items-center q-pa-sm q-gutter-md">
            <div class="col-12 col-md-4">
              <q-input outlined dense v-model="searchQuery" placeholder="Search by job title..." debounce="300">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-3">
              <q-select outlined dense v-model="statusFilter" :options="statusOptions" label="Filter by Status" emit-value
                map-options />
            </div>
          </div>
        </q-card>
        <q-table :rows="filteredJobs" :columns="columns" row-key="id" flat class="jobs-table"
          v-model:pagination="pagination" :rows-per-page-options="[5, 10, 20]">
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :class="`status-${props.row.status.toLowerCase().replace(' ', '-')}`" class="status-badge">
                <q-icon :name="getStatusIcon(props.row.status)" class="q-mr-xs" size="14px" />
                {{ props.row.status }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="text-right">
              <q-btn flat round dense icon="groups" color="primary" @click="viewApplicants(props.row.id)">
                <q-tooltip>View Applicants</q-tooltip>
              </q-btn>
              <q-btn flat round dense icon="edit" color="grey-8" @click="editJob(props.row.id)" class="q-ml-sm">
                <q-tooltip>Edit Job</q-tooltip>
              </q-btn>
              <q-btn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)" class="q-ml-sm">
                <q-tooltip>Delete Job</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
        <q-dialog v-model="showDeleteConfirm">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm text-h6">Confirm Deletion</span>
            </q-card-section>
            <q-card-section>
              Are you sure you want to delete the job posting for
              <strong>"{{ jobToDelete?.title }}"</strong>? This action cannot be undone.
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn label="Confirm Delete" color="negative" @click="deleteJob" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import AppHeader from 'src/components/HeaderPart.vue';

const router = useRouter();
const $q = useQuasar();

const employer = ref({ name: '', email: '' });
const selected = ref('Posted Jobs');

const jobs = ref([]);
const initialJobs = []; 
const jobToDelete = ref(null);
const showDeleteConfirm = ref(false);
const searchQuery = ref('');
const statusFilter = ref('All');

const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Pending Review', value: 'Pending Review' },
  { label: 'Rejected', value: 'Rejected' }
];

const pagination = ref({
  sortBy: 'datePosted',
  descending: true,
  page: 1,
  rowsPerPage: 10
});

const links = [
    { label: 'Dashboard Overview', icon: 'dashboard', to: '/employer-portal' },
    { label: 'Posted Jobs', icon: 'work', to: '/posted-jobs' },
    { label: 'Post New Job', icon: 'add_box', to: '/post-job' },
    { label: 'Candidates', icon: 'groups', to: '/candidates' },
    { label: 'Messages', icon: 'mail', to: '/employer-messages' },
    { label: 'Company Profile', icon: 'domain', to: '/company-profile' },
    { label: 'Settings', icon: 'settings', to: '/employer-settings' }
];

const columns = [
  { name: 'title', label: 'Job Title', field: 'title', align: 'left', sortable: true },
  { name: 'datePosted', label: 'Date Posted', field: 'datePosted', format: val => new Date(val).toLocaleDateString('en-IN'), align: 'left', sortable: true },
  { name: 'deadline', label: 'Deadline', field: 'deadline', format: val => new Date(val).toLocaleDateString('en-IN'), align: 'left', sortable: true },
  { name: 'applicants', label: 'Applicants', field: 'applicants', align: 'center', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
];

const filteredJobs = computed(() => {
  let filtered = jobs.value;
  if (statusFilter.value && statusFilter.value !== 'All') {
    filtered = filtered.filter(job => job.status === statusFilter.value);
  }
  if (searchQuery.value) {
    const lower = searchQuery.value.toLowerCase();
    filtered = filtered.filter(job => job.title.toLowerCase().includes(lower));
  }
  return filtered;
});

const getStatusIcon = (status) => {
  switch (status) {
    case 'Approved': return 'check_circle';
    case 'Pending Review': return 'pending';
    case 'Rejected': return 'cancel';
    default: return 'help';
  }
};

const viewApplicants = (jobId) => router.push(`/candidates?jobId=${jobId}`);
const editJob = (jobId) => router.push(`/post-job?edit=${jobId}`);

const confirmDelete = (job) => {
  jobToDelete.value = job;
  showDeleteConfirm.value = true;
};

const deleteJob = () => {
  const index = jobs.value.findIndex(j => j.id === jobToDelete.value.id);
  if (index > -1) {
    jobs.value.splice(index, 1);
    localStorage.setItem('jobhubJobs', JSON.stringify(jobs.value));
    $q.notify({ type: 'positive', message: `Job "${jobToDelete.value.title}" deleted.`, icon: 'delete_sweep' });
  }
  showDeleteConfirm.value = false;
  jobToDelete.value = null;
};

const navigate = (link) => {
  selected.value = link.label;
  if (link.to) router.push(link.to);
};

const logout = () => {
  localStorage.removeItem('employerData');
  router.push('/employers');
};

onMounted(() => {
  const storedEmployer = localStorage.getItem('employerData');
  if (storedEmployer) employer.value = JSON.parse(storedEmployer);

  const storedJobs = localStorage.getItem('jobhubJobs');
  if (storedJobs) {
    jobs.value = JSON.parse(storedJobs);
  } else {
    jobs.value = initialJobs;
    localStorage.setItem('jobhubJobs', JSON.stringify(initialJobs));
  }
});
</script>

<style scoped>
.portal-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; 
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  
}

.page-wrapper {
  flex-grow: 1; 
  overflow: hidden; 
}

.sidebar, .content-area {
  height: 100%;
}

.content-area {
  flex: 1;
  overflow-y: auto;
}

.sidebar {
  width: 260px;
  background-color: #1565c0;
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
  padding: 12px;
  margin: 4px 12px;
  border-radius: 8px;
}

.nav-list .q-item:hover {
  background-color: #243B55;
  color: white;
}

.active-link {
  background-color: #00529b !important;
  color: #ffffff !important;
  font-weight: 600;
}

.logout-btn {
  color: #FFB5B5;
  margin: 16px;
  border-radius: 8px;
}

.logout-btn:hover {
  background-color: #d32f2f;
  color: #ffffff;
}

.content-title {
  color: #102A43;
}

.control-bar {
  background-color: #ffffff;
  border-radius: 8px;
}

.jobs-table {
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
}

.jobs-table :deep(th) {
  background-color: #f8f9fa;
  color: #343a40;
  font-weight: 600;
}

.jobs-table :deep(td) {
  padding: 10px 16px;
}

.status-badge {
  padding: 6px 14px;
  font-weight: 600;
  border-radius: 14px;
  font-size: 0.8rem;
  text-transform: capitalize;
  min-width: 120px;
  text-align: center;
}

.status-approved {
  background-color: #E6F7F0;
  color: #00875A;
}
.status-pending-review {
  background-color: #FFFBE6;
  color: #B78103;
}
.status-rejected {
  background-color: #FFEBE5;
  color: #BF2600;
}
</style>
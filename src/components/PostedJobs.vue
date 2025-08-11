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
              <q-badge 
                :class="`status-${getStatusClass(props.row.status)}`" 
                class="status-badge q-pa-sm"
                :title="props.row.rejectionReason ? `Rejection Reason: ${props.row.rejectionReason}` : ''"
              >
                <q-icon :name="getStatusIcon(props.row.status)" class="q-mr-xs" size="14px" />
                {{ formatStatus(props.row.status) }}
                <q-tooltip v-if="props.row.rejectionReason" anchor="top middle" self="bottom middle">
                  <div class="text-caption">
                    <div class="text-weight-bold">Rejection Reason:</div>
                    <div>{{ props.row.rejectionReason }}</div>
                    <div v-if="props.row.updatedAt" class="text-caption text-italic">
                      Updated: {{ formatDate(props.row.updatedAt) }}
                    </div>
                  </div>
                </q-tooltip>
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="text-right">
              <q-btn 
                v-if="props.row.status === 'approved'" 
                flat 
                round 
                dense 
                icon="groups" 
                color="primary" 
                @click="viewApplicants(props.row.id)"
              >
                <q-tooltip>View Applicants</q-tooltip>
              </q-btn>
              
              <q-btn 
                v-if="['draft', 'rejected'].includes(props.row.status)" 
                flat 
                round 
                dense 
                icon="edit" 
                color="grey-8" 
                @click="editJob(props.row)" 
                class="q-ml-sm"
              >
                <q-tooltip>Edit Job</q-tooltip>
              </q-btn>
              
              <q-btn 
                flat 
                round 
                dense 
                icon="delete" 
                color="negative" 
                @click="confirmDelete(props.row)" 
                class="q-ml-sm"
                :disable="props.row.status === 'approved'"
              >
                <q-tooltip>
                  {{ props.row.status === 'approved' ? 'Cannot delete approved jobs' : 'Delete Job' }}
                </q-tooltip>
              </q-btn>
              
              <q-btn 
                v-if="props.row.status === 'rejected'" 
                flat 
                round 
                dense 
                icon="info" 
                color="warning" 
                @click="showRejectionDetails(props.row)" 
                class="q-ml-sm"
              >
                <q-tooltip>View Rejection Details</q-tooltip>
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
import { useRouter, useRoute } from 'vue-router';
import { useQuasar, date } from 'quasar';
import AppHeader from 'src/components/HeaderPart.vue';
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

// State
const employer = ref({});
const selected = ref('Posted Jobs');
const jobs = ref([]);
const jobToDelete = ref(null);
const showDeleteConfirm = ref(false);
const searchQuery = ref('');
const statusFilter = ref('All');
const loading = ref(false);
const showStatusBanner = ref(false);
const statusBanner = ref({
  message: '',
  color: 'positive',
  icon: 'check_circle'
});

const statusOptions = [
  { label: 'All', value: 'All' },
  { label: 'Draft', value: 'draft' },
  { label: 'Pending Review', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Closed', value: 'closed' }
];

const pagination = ref({
  sortBy: 'updatedAt',
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

const fetchJobs = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Using the configured api instance with correct path
    const response = await api.get('/api/jobs/employer', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Map the response to match the expected frontend format if needed
    jobs.value = response.data.jobs || [];
    showStatusMessage('Jobs loaded successfully', 'positive', 'check_circle');
  } catch (error) {
    console.error('Error fetching jobs:', error);
    showStatusMessage('Failed to load jobs', 'negative', 'error');
  } finally {
    loading.value = false;
  }
};

const showStatusMessage = (message, color = 'positive', icon = 'check_circle') => {
  statusBanner.value = { message, color, icon };
  showStatusBanner.value = true;
  setTimeout(() => {
    showStatusBanner.value = false;
  }, 5000);
};

const viewApplicants = (jobId) => {
  router.push(`/employer/jobs/${jobId}/applicants`);
};

const editJob = (job) => {
  router.push(`/employer/jobs/${job.id}/edit`);
};

const showRejectionDetails = (job) => {
  $q.dialog({
    title: 'Rejection Details',
    message: `
      <div class="q-pa-md">
        <div class="text-subtitle2 q-mb-sm">Job: <strong>${job.title}</strong></div>
        <div class="text-caption q-mb-md">Rejected on: ${formatDate(job.updatedAt)}</div>
        <div class="q-mt-md">
          <div class="text-weight-medium">Rejection Reason:</div>
          <div class="q-pa-sm bg-grey-2 rounded-borders">${job.rejectionReason || 'No reason provided'}</div>
        </div>
      </div>
    `,
    html: true,
    ok: {
      label: 'Close',
      flat: true
    }
  });
};

const confirmDelete = (job) => {
  jobToDelete.value = job;
  $q.dialog({
    title: 'Confirm Delete',
    message: `Are you sure you want to delete the job "${job.title}"?\nThis action cannot be undone.`,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      flat: true
    },
    cancel: {
      label: 'Cancel',
      flat: true
    }
  }).onOk(() => deleteJob());
};

const deleteJob = async () => {
  if (!jobToDelete.value) return;
  
  try {
    await api.delete(`/employer/jobs/${jobToDelete.value.id}`);
    jobs.value = jobs.value.filter(job => job.id !== jobToDelete.value.id);
    showStatusMessage('Job deleted successfully', 'positive', 'delete');
  } catch (error) {
    console.error('Error deleting job:', error);
    showStatusMessage('Failed to delete job', 'negative', 'error');
  } finally {
    jobToDelete.value = null;
  }
};

const getStatusIcon = (status) => {
  const icons = {
    'draft': 'drafts',
    'pending': 'schedule',
    'approved': 'check_circle',
    'rejected': 'warning',
    'closed': 'lock_clock'
  };
  return icons[status] || 'help_outline';
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return date.formatDate(dateString, 'MMM D, YYYY [at] h:mm A');
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Invalid date';
  }
};

const formatStatus = (status) => {
  const statusMap = {
    'draft': 'Draft',
    'pending': 'Pending Review',
    'approved': 'Active',
    'rejected': 'Rejected',
    'closed': 'Closed',
    'expired': 'Expired',
    'pending_review': 'Pending Review'
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const classMap = {
    'draft': 'draft',
    'pending': 'pending',
    'pending_review': 'pending',
    'approved': 'active',
    'active': 'active',
    'rejected': 'rejected',
    'closed': 'closed',
    'expired': 'expired'
  };
  return classMap[status] || 'draft';
};

const navigate = (link) => {
  selected.value = link.label;
  if (link.to) router.push(link.to);
};


onMounted(async () => {
  const storedEmployer = localStorage.getItem('employerData');
  if (storedEmployer) employer.value = JSON.parse(storedEmployer);
  await fetchJobs();
  
  // Check for any job status changes in the URL query params
  if (route.query.jobStatus) {
    const jobId = route.query.jobId;
    const job = jobs.value.find(j => j.id === jobId);
    if (job) {
      showStatusMessage(
        `Job "${job.title}" has been ${job.status}`,
        job.status === 'approved' ? 'positive' : 'warning',
        job.status === 'approved' ? 'check_circle' : 'info'
      );
      // Remove query params after showing the message
      router.replace({ query: {} });
    }
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
}

/* Status Badge Styles */
.status-badge {
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  padding: 2px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
}

.status-draft {
  background-color: #e0e0e0;
  color: #424242;
}

.status-pending {
  background-color: #fff3e0;
  color: #e65100;
}

.status-active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-rejected {
  background-color: #ffebee;
  color: #c62828;
}

.status-closed {
  background-color: #f5f5f5;
  color: #616161;
}

.status-expired {
  background-color: #f3e5f5;
  color: #6a1b9a;
}

/* Hover effects for status badges */
.status-badge:hover {
  filter: brightness(95%);
  cursor: default;
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
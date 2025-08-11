<template>
  <div class="q-pa-md">
    <div class="row items-center q-mb-md">
      <q-btn 
        flat 
        round 
        icon="arrow_back" 
        class="q-mr-sm" 
        @click="$router.go(-1)" 
      />
      <h4 class="q-my-none">My Posted Jobs</h4>
      <q-space />
      <q-btn 
        color="primary" 
        icon="add" 
        label="Post New Job" 
        @click="$router.push('/post-job')" 
      />
    </div>

    <q-separator class="q-mb-md" />

    <div v-if="loading" class="text-center q-pa-lg">
      <q-spinner color="primary" size="3em" />
      <p>Loading your jobs...</p>
    </div>

    <div v-else-if="error" class="text-negative q-pa-md">
      {{ error }}
    </div>

    <div v-else-if="jobs.length === 0" class="text-center q-pa-lg">
      <q-icon name="work_off" size="4em" color="grey-5" />
      <p class="text-h6 q-mt-sm">No jobs posted yet</p>
      <q-btn 
        color="primary" 
        label="Post Your First Job" 
        @click="$router.push('/post-job')" 
        class="q-mt-md"
      />
    </div>

    <div v-else class="q-gutter-y-md">
      <template v-if="Array.isArray(jobs) && jobs.length > 0">
        <q-card v-for="job in jobs" :key="job.id" class="job-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-grow">
                <div class="text-h6">{{ job.title || 'Untitled Job' }}</div>
                <div class="text-subtitle2 text-grey-8 q-mt-xs">
                  <q-icon name="business" size="1.2em" class="q-mr-xs" />
                  {{ job.companyProfile?.companyName || 'N/A' }}
                  <q-icon name="location_on" size="1.2em" class="q-ml-sm q-mr-xs" />
                  {{ job.location || 'Remote' }}
                </div>
              </div>
              <div class="col-auto" v-if="job.status">
                <q-badge 
                  :color="getStatusColor(job.status)" 
                  class="q-px-sm q-py-xs"
                >
                  {{ formatStatus(job.status) }}
                </q-badge>
              </div>
            </div>

            <div class="q-mt-md">
              <div class="row items-center q-gutter-x-md">
                <div class="col-auto" v-if="job.type">
                  <q-icon name="work" size="1.2em" class="q-mr-xs" />
                  {{ formatJobType(job.type) }}
                </div>
                <div class="col-auto" v-if="job.salary_range">
                  <q-icon name="payments" size="1.2em" class="q-mr-xs" />
                  {{ formatSalary(job.salary_range) }}
                </div>
                <div class="col-auto" v-if="job.createdAt || job.posted_at">
                  <q-icon name="event" size="1.2em" class="q-mr-xs" />
                  Posted on {{ formatDate(job.createdAt || job.posted_at) }}
                </div>
              </div>
            </div>

            <div class="q-mt-md" v-if="Array.isArray(job.tags) && job.tags.length > 0">
              <q-chip 
                v-for="(tag, index) in job.tags" 
                v-bind:key="index"
                size="sm"
                color="primary"
                text-color="white"
                class="q-mr-xs q-mb-xs"
              >
                {{ tag }}
              </q-chip>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn 
              flat 
              color="primary" 
              label="View Details" 
              @click="viewJobDetails(job.id)" 
            />
            <q-btn 
              v-if="job.status === 'open'"
              flat 
              color="negative" 
              label="Close Job" 
              @click="confirmCloseJob(job)" 
            />
          </q-card-actions>
        </q-card>
      </template>
      <div v-else class="text-center q-pa-lg">
        <q-icon name="work_off" size="4em" color="grey-5" />
        <p class="text-h6 q-mt-sm">No jobs found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import jobService from 'src/services/jobpost.service';
import { authHelpers } from 'src/services/auth.service';

const $q = useQuasar();
const router = useRouter();

const jobs = ref([]);
const loading = ref(true);
const error = ref('');
const isAuthenticated = computed(() => {
  return authHelpers.isAuthenticated();
});

// Check authentication status when component is created
if (!isAuthenticated.value) {
  router.push('/employer/login');
  $q.notify({
    type: 'warning',
    message: 'Please log in to view your posted jobs',
    position: 'top'
  });
}

// Format job status for display
const formatStatus = (status) => {
  const statusMap = {
    'draft': 'Draft',
    'open': 'Open',
    'closed': 'Closed',
    'pending_review': 'Pending Review'
  };
  return statusMap[status] || status;
};

// Get color based on job status
const getStatusColor = (status) => {
  const colorMap = {
    'draft': 'grey',
    'open': 'positive',
    'closed': 'negative',
    'pending_review': 'warning'
  };
  return colorMap[status] || 'grey';
};

// Format job type for display
const formatJobType = (type) => {
  if (!type) return 'Full-time';
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Format salary for display
const formatSalary = (salary) => {
  if (!salary) return 'Salary not specified';
  return `$${parseInt(salary).toLocaleString()}/year`;
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// View job details
const viewJobDetails = (jobId) => {
  router.push(`/employer/jobs/${jobId}`);
};

// Confirm before closing a job
const confirmCloseJob = (job) => {
  $q.dialog({
    title: 'Confirm Close Job',
    message: `Are you sure you want to close "${job.title}"?`,
    cancel: true,
    persistent: true,
    ok: {
      label: 'Yes, Close Job',
      color: 'negative'
    }
  }).onOk(async () => {
    try {
      await jobService.closeJob(job.id);
      // Refresh the jobs list
      fetchEmployerJobs();
      $q.notify({
        type: 'positive',
        message: 'Job has been closed',
        position: 'top'
      });
    } catch (err) {
      console.error('Error closing job:', err);
      $q.notify({
        type: 'negative',
        message: 'Failed to close job. Please try again.',
        position: 'top'
      });
    }
  });
};

// Fetch jobs posted by the current employer
const fetchEmployerJobs = async () => {
  try {
    console.log('Starting to fetch employer jobs...');
    loading.value = true;
    error.value = '';
    
    // Get the auth token to verify it exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw { response: { status: 401 } }; // Simulate 401 if no token
    }
    
    const response = await jobService.getEmployerJobs();
    console.log('API Response:', response);
    
    if (response && typeof response === 'object') {
      if (response.success) {
        // Ensure jobs is an array before assignment
        jobs.value = Array.isArray(response.jobs) ? response.jobs : [];
        console.log('Jobs set:', jobs.value);
      } else {
        error.value = response.error || 'Failed to load jobs';
        console.error('API returned error:', error.value);
        
        // If the error indicates unauthorized access, redirect to login
        if (response.error?.includes('unauthorized') || response.error?.includes('token')) {
          throw { response: { status: 401 } };
        }
      }
    } else {
      throw new Error('Invalid response format from server');
    }
  } catch (err) {
    console.error('Error in fetchEmployerJobs:', err);
    
    if (err.response && err.response.status === 401) {
      // Handle unauthorized access
      error.value = 'Your session has expired. Please log in again.';
      authHelpers.clearAuthData();
      router.push('/employer/login');
      $q.notify({
        type: 'warning',
        message: 'Your session has expired. Please log in again.',
        position: 'top'
      });
      return;
    }
    
    error.value = 'An error occurred while fetching jobs. Please try again.';
    jobs.value = []; // Ensure jobs is always an array
  } finally {
    loading.value = false;
  }
};

// Fetch jobs when component is mounted
onMounted(async () => {
  if (!isAuthenticated.value) return;
  
  try {
    console.log('Component mounted, fetching jobs...');
    await fetchEmployerJobs();
    console.log('Jobs fetched successfully:', jobs.value);
  } catch (err) {
    console.error('Error in onMounted:', err);
    
    if (err.response && err.response.status === 401) {
      // Handle unauthorized access
      error.value = 'Your session has expired. Please log in again.';
      authHelpers.clearAuthData();
      router.push('/employer/login');
      return;
    }
    
    error.value = 'Failed to load jobs. Please try again later.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.job-card {
  transition: transform 0.2s;
  border-left: 4px solid var(--q-primary);
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>

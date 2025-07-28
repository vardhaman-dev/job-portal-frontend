<template>
  <div class="page-wrapper row no-wrap">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Section 1 -->
      <div class="sidebar-section flex items-center q-gutter-sm q-pb-sm">
        <q-avatar icon="business_center" color="primary" text-color="white" />
        <div>
          <div class="text-h6 text-primary">JobHub</div>
          <div class="text-caption text-blue-grey">Employer Portal</div>
        </div>
      </div>

      <!-- Section 2 (Employer Info) -->
      <div class="sidebar-section q-pt-sm q-pb-none">
        <div class="text-subtitle1 text-weight-medium text-blue-10">{{ employer.name }}</div>
        <div class="text-caption text-blue-grey">{{ employer.email }}</div>
      </div>

      <!-- Section 3 (Navigation Links) -->
      <div class="sidebar-section q-pt-sm q-pb-none">
        <q-list dense bordered separator class="q-mt-sm">
          <q-item
            v-for="(link, i) in links"
            :key="i"
            :active="selected === link.label"
            active-class="active-link"
            clickable
            v-ripple
            @click="selected = link.label"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" :color="selected === link.label ? 'primary' : 'grey-7'" />
            </q-item-section>
            <q-item-section :class="{ 'text-primary text-weight-bold': selected === link.label }">
              {{ link.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <!-- Logout Button -->
<div class="sidebar-section q-mt-auto">
  <q-btn
    flat
    icon="logout"
    label="Logout"
    color="red"
    class="full-width"
    @click="logout"
  />
</div>

    </div>

    <!-- Content Area -->
    <div class="content-area column q-pa-md">
      <!-- Top bar -->
      <div class="row justify-between items-center q-mb-md">
        <div>
          <div class="text-h6 text-blue-10">Welcome back, {{ employer.name }}!</div>
          <div class="text-subtitle2 text-blue-grey">Here's your hiring overview</div>
        </div>
        <q-btn color="primary" label="+ Post another job" />
      </div>

      <!-- Stats Boxes -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-6 col-md-3" v-for="(stat, i) in stats" :key="i">
          <q-card class="stat-box bordered hoverable">
            <q-card-section>
<div class="text-h6 text-primary">{{ stat.value }}</div>
<div class="text-caption text-blue">{{ stat.label }}</div>
<div class="text-caption text-grey">{{ stat.sub }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

<!-- Posted Jobs Table -->
<div class="q-pa-md bg-white bordered shadow-1">
  <div class="row items-center q-mb-md">
    <div class="text-h6 text-primary">Posted Jobs</div>
    <q-space />
    <q-input
  dense
  filled
  placeholder="Search jobs"
  class="q-mr-sm"
  v-model="search"
  debounce="300"
  clearable
/>

    <q-select dense filled :options="['All Status', 'Approved', 'Pending', 'Rejected']" />
  </div>

  <q-table
  title="Job Listings"
  :rows="filteredJobs"
  :columns="columns"
  row-key="id"
  flat
  bordered
  class="q-mt-md"
>
  <template v-slot:body-cell-status="props">
    <q-td align="center">
      <q-badge
        :color="props.row.status === 'Approved' ? 'green' : props.row.status === 'Pending' ? 'orange' : 'red'"
        outline
        rounded
      >
        {{ props.row.status }}
      </q-badge>
    </q-td>
  </template>

  <template v-slot:body-cell-actions="props">
  <q-td align="center">
    <div class="action-buttons">
      <q-btn flat round size="sm" icon="visibility" color="primary" @click="viewJob(props.row)" />
      <q-btn flat round size="sm" icon="edit" color="orange" @click="editJob(props.row)" />
      <q-btn flat round size="sm" icon="delete" color="red" @click="deleteJob(props.row)" />
    </div>
  </q-td>
</template>

</q-table>

</div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const employer = ref({ name: '', email: '' });

onMounted(() => {
  const stored = localStorage.getItem('employerData');
  if (!stored) {
    router.push('/employer-login'); // Redirect to login if not authenticated
  } else {
    employer.value = JSON.parse(stored);
  }
});

// Existing refs
const search = ref('');
const filteredJobs = computed(() => {
  if (!search.value) return jobs;
  return jobs.filter(job =>
    Object.values(job).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});

const selected = ref('Dashboard Overview');

const links = [
  { label: 'Dashboard Overview', icon: 'dashboard' },
  { label: 'Posted Jobs', icon: 'work' },
  { label: 'Post New Job', icon: 'add_box' },
  { label: 'Candidates', icon: 'groups' },
  { label: 'Messages', icon: 'mail' },
  { label: 'Company Profile', icon: 'domain' },
  { label: 'Settings', icon: 'settings' }
];

const stats = [
  { value: 10, label: 'Total Jobs Posted', sub: 'Last month' },
  { value: 4, label: 'Active Jobs', sub: 'Currently accepting applications' },
  { value: 34, label: 'Applications Received', sub: 'This week' },
  { value: 2, label: 'Pending Reviews', sub: 'Jobs awaiting approval' }
];

const jobs = [
  {
    title: 'Frontend Developer',
    datePosted: '2025-07-01',
    deadline: '2025-08-01',
    status: 'Approved',
    applications: 12,
  },
  {
    title: 'Backend Developer',
    datePosted: '2025-07-10',
    deadline: '2025-08-05',
    status: 'Pending',
    applications: 8,
  },
  {
    title: 'UI/UX Designer',
    datePosted: '2025-07-15',
    deadline: '2025-08-10',
    status: 'Rejected',
    applications: 5,
  },
];

const columns = [
  { name: 'title', label: 'Job Title', align: 'center', field: 'title' },
  { name: 'datePosted', label: 'Date Posted', align: 'center', field: 'datePosted' },
  { name: 'deadline', label: 'Application Deadline', align: 'center', field: 'deadline' },
  {
    name: 'status',
    label: 'Status',
    align: 'center', 
    field: 'status'
  },
  {
    name: 'applications',
    label: 'Applications',
    field: 'applications',
    align: 'center' 
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center' 
  }
];

const viewJob = (job) => {
  console.log('Viewing job:', job.title)
}

const editJob = (job) => {
  console.log('Editing job:', job.title)
}

const deleteJob = (job) => {
  console.log('Deleting job:', job.title)
}

const logout = () => {
  localStorage.removeItem('employerData')
  router.push('/employers') // Redirects to EmployerHomePage
}
</script>

<style scoped>
.page-wrapper {
  height: 100vh;
  display: flex;
  background-color: #f0f4f8;
}

.sidebar {
  width: 260px;
  min-height: 100vh;
  border-right: 1px solid #ccc;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.sidebar-section {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f9fafc;
}

.stat-box {
  transition: box-shadow 0.3s, transform 0.2s;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #dcdcdc;
}

.stat-box:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.bordered {
  border: 1px solid #e0e0e0;
}

.hoverable:hover {
  cursor: pointer;
}

.active-link {
  background-color: #e3f2fd !important;
  color: #1976d2 !important;
  font-weight: 600;
  border-left: 4px solid #1976d2;
}
.content-area {
  flex: 1;
  overflow-y: auto;
  background: linear-gradient(to bottom right, #f0f4ff, #ffffff);
  padding: 24px;
}

.stat-box {
  border: 2px solid #1976d2;
  background-color: #fff;
  border-radius: 12px;
  transition: box-shadow 0.3s, transform 0.2s;
}

.stat-box:hover {
  box-shadow: 0 6px 18px rgba(25, 118, 210, 0.2);
  transform: translateY(-3px);
}

.bordered {
  border: 1px solid #d0d7e5;
}

.q-pa-md.bg-white.bordered.shadow-1 {
  background-color: #ffffff;
  border-left: 4px solid #1976d2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 24px;
}

.text-h6,
.text-subtitle2,
.text-caption {
  color: #1a237e; /* deep blue tone */
}

.q-btn[color="primary"] {
  background-color: #1976d2;
  color: white;
}
.custom-table .q-table__container {
  border-radius: 10px;
  overflow: hidden;
  border: none;
}

.custom-table thead th {
  background-color: #f1f6fb;
  color: #0d47a1;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  border-bottom: 2px solid #d0d7e5;
}

.custom-table tbody td {
  background-color: #ffffff;
  font-size: 14px;
  color: #37474f;
  border-bottom: 1px solid #e3e8ee;
}

.custom-table tbody tr:hover td {
  background-color: #f5faff;
}

.action-buttons .q-btn {
  margin: 0 2px;
  transition: transform 0.2s;
}
.action-buttons .q-btn:hover {
  transform: scale(1.1);
}

</style>

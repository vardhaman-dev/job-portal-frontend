<template>
  <div class="employer-portal">
    <AppHeader class="sticky-header" />
    <div class="page-wrapper row no-wrap">
      <!-- Sidebar -->
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
              <q-item-section avatar> <q-icon :name="link.icon" /> </q-item-section>
              <q-item-section> {{ link.label }} </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="sidebar-section q-mt-auto">
          <q-btn flat icon="logout" label="Logout" class="full-width logout-btn" @click="logout" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="content-area column q-pa-md q-pa-lg-lg">
        <div class="row justify-between items-center q-mb-lg">
          <div>
            <div class="text-h5 text-weight-bold content-title">Welcome back, {{ employer.name }}!</div>
            <div class="text-subtitle1 subtitle-text">Here's your overview for {{ todaysDate }}.</div>
          </div>
        </div>

        <!-- Broadcast Banner -->
        <q-banner v-if="activeBroadcast" inline-actions rounded class="q-mb-lg broadcast-banner">
          <template v-slot:avatar> <q-icon name="campaign" color="white" /> </template>
          <div class="text-weight-medium text-white">
            {{ activeBroadcast.text }}
            <div class="text-caption q-mt-xs opacity-8">(Expires on {{ new Date(activeBroadcast.expiry).toLocaleString() }})</div>
          </div>
        </q-banner>

        <!-- Status Boxes -->
        <div class="row q-col-gutter-lg q-mb-lg">
          <div class="col-12 col-sm-6 col-md-3" v-for="stat in stats" :key="stat.label">
            <q-card class="stat-card full-height">
              <q-card-section class="flex items-center q-pa-md">
                <q-icon :name="stat.icon" :color="stat.iconColor" size="2.5em" class="q-mr-md" />
                <div>
                  <div class="text-h5 text-weight-bolder stat-value">{{ stat.value }}</div>
                  <div class="text-subtitle2 stat-label">{{ stat.label }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Application Trends -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 content-title">Application Trends (Last 7 Days)</div>
            <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
          </q-card-section>
        </q-card>

        <!-- Action Required -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 content-title">Action Required</div>
          </q-card-section>
          <q-list separator>
            <q-item v-for="item in actionItems" :key="item.title" clickable v-ripple @click="router.push(item.to)">
              <q-item-section avatar> <q-avatar :icon="item.icon" color="light-blue-1" text-color="primary" /> </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium list-item-title">{{ item.title }}</q-item-label>
                <q-item-label caption>{{ item.subtitle }}</q-item-label>
              </q-item-section>
              <q-item-section side> <q-icon name="chevron_right" class="subtitle-text" /> </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <!-- Upcoming Interviews -->
        <q-card flat bordered class="q-mb-lg interview-card">
          <q-card-section>
            <div class="text-h6 content-title">Upcoming Interviews</div>
          </q-card-section>
          <q-list separator class="interview-list">
            <q-item v-for="interview in upcomingInterviews" :key="interview.id">
              <q-item-section avatar><q-avatar color="cyan-1" text-color="cyan-8" icon="event" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium list-item-title">{{ interview.candidateName }}</q-item-label>
                <q-item-label caption>For: {{ interview.jobTitle }}</q-item-label>
              </q-item-section>
              <q-item-section side class="text-right">
                <q-item-label class="text-weight-medium text-cyan-9">{{ interview.date }}</q-item-label>
                <q-item-label caption>{{ interview.time }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import VueApexCharts from 'vue3-apexcharts';
import AppHeader from 'src/components/HeaderPart.vue';

const apexchart = VueApexCharts;
const router = useRouter();
const $q = useQuasar();

const stats = ref([
  { value: 10, label: 'Total Jobs', icon: 'summarize', iconColor: 'blue-4' },
  { value: 4, label: 'Active Jobs', icon: 'fact_check', iconColor: 'blue-5' },
  { value: 87, label: 'Total Applicants', icon: 'groups', iconColor: 'blue-6' },
  { value: 2, label: 'Pending Review', icon: 'pending_actions', iconColor: 'blue-7' }
]);

const actionItems = ref([
  { icon: 'person_add', title: '5 New Applicants', subtitle: 'For Senior Frontend Developer', to: '/candidates?jobId=1' },
  { icon: 'mark_email_unread', title: '3 Unread Messages', subtitle: 'From Priya, Vikram, and more', to: '/employer-messages' },
  { icon: 'pending', title: '2 Jobs Pending Review', subtitle: 'Awaiting admin approval', to: '/posted-jobs' },
]);

const upcomingInterviews = ref([
  { id: 1, candidateName: 'Priya Patel', jobTitle: 'UI/UX Designer', date: 'Aug 4, 2025', time: '11:00 AM' },
  { id: 2, candidateName: 'Rohan Mehta', jobTitle: 'UI/UX Designer', date: 'Aug 4, 2025', time: '02:30 PM' },
  { id: 3, candidateName: 'Sneha Verma', jobTitle: 'Senior Frontend Developer', date: 'Aug 5, 2025', time: '10:00 AM' },
]);

const chartSeries = ref([{ name: 'New Applications', data: [8, 12, 5, 15, 9, 22, 18] }]);
const chartOptions = computed(() => ({
  chart: { type: 'bar', height: 350, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: false } },
  dataLabels: { enabled: false },
  xaxis: { categories: ['Jul 26', 'Jul 27', 'Jul 28', 'Jul 29', 'Jul 30', 'Jul 31', 'Aug 01'] },
  colors: ['#00529b'],
  theme: { mode: $q.dark.isActive ? 'dark' : 'light' }
}));

const employer = ref({ name: 'Innovate Inc.', email: 'hr@innovate.com' });
const selected = ref('Dashboard Overview');
const activeBroadcast = ref(null);

onMounted(() => {
  const storedEmployer = localStorage.getItem('employerData');
  if (storedEmployer) employer.value = JSON.parse(storedEmployer);
  const storedBroadcast = localStorage.getItem('jobhubBroadcast');
  if (storedBroadcast) {
    const broadcast = JSON.parse(storedBroadcast);
    if (new Date(broadcast.expiry) > new Date()) {
      activeBroadcast.value = broadcast;
    } else {
      localStorage.removeItem('jobhubBroadcast');
    }
  }
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

const navigate = (link) => {
  selected.value = link.label;
  if (link.to) router.push(link.to);
};

const todaysDate = new Date('2025-08-01T08:10:47+05:30').toLocaleDateString('en-IN', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const logout = () => {
  localStorage.removeItem('employerData');
  router.push('/employers');
};
</script>

<style scoped>
.portal-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* Important to prevent double scrollbars */
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  /* The header component has its own background and shadow */
}

.page-wrapper {
  flex-grow: 1; /* Takes up the remaining vertical space */
  overflow: hidden; /* Important */
}

/* Sidebar and Content Area take full height of the wrapper */
.sidebar, .content-area {
  height: 100%;
}

.content-area {
  flex: 1;
  overflow-y: auto;
}


.page-wrapper {
  height: 100vh;
  background-color: #F0F7FF;
}
.sidebar {
  width: 260px;
  background-color: #102A43;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
}
.sidebar-section { border-bottom: 1px solid #243B55; }
.nav-list .q-item { padding: 12px; border-radius: 8px; margin: 4px 12px; color: #BCCCDC; }
.nav-list .q-item:hover { background-color: #243B55; color: #ffffff; }
.active-link { background-color: #00529b !important; color: #ffffff !important; font-weight: 600; }
.logout-btn { color: #FFB5B5; margin: 16px; border-radius: 8px; }
.logout-btn:hover { background-color: #d32f2f; color: #ffffff; }

.content-area {
  flex: 1;
  overflow-y: auto;
}
.content-title { color: #0D1B2A; }
.subtitle-text { color: #5A7184; }
.list-item-title { color: #0D1B2A; }
.broadcast-banner { background-color: #1D3557 !important; border: 1px solid #457B9D; }
.opacity-8 { opacity: 0.8; }

.stat-card {
  background: linear-gradient(145deg, #dfefff, #ffffff);
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #cde3f7;
  height: 100%;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 82, 155, 0.1);
}
.stat-value { color: #0D1B2A; }
.stat-label { color: #5A7184; }

.interview-card {
  background-color: #E0F7FA;
  border-color: #B2EBF2;
}
.interview-list .q-item { border-top: 1px solid #B2EBF2; }
.interview-list .q-item:first-child { border-top: none; }
.q-list--separator > .q-item-type + .q-item-type {
  border-top: 1px solid #EDF2F7;
}
</style>

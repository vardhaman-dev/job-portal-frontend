<template>
  <q-page class="q-pa-md">
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header row items-center justify-between q-pa-lg">
        <div>
          <h5 class="welcome-text handwritten">Welcome back, {{ userName }}!</h5>
          <p class="subtext">Ready to find your next opportunity? Let’s explore what’s available for you.</p>
        </div>
        <div class="action-buttons">
          <q-btn
            icon="person"
            label="Complete Profile"
            unelevated
            class="q-px-md primary-btn"
            @click="showProfileModal = true"
          />
     <q-btn icon="upload_file" label="Build your Resume"  class="q-px-md primary-btn"  @click="goToResume"/>
        </div>
      </div>

      <div class="dashboard-content row q-col-gutter-xl q-mt-md">
        <!-- Sidebar -->
        <div class="col-3">
          <job-seeker-sidebar />
        </div>

        <!-- Main Content -->
        <div class="col-9">
          <!-- Search Box -->
          <q-card flat bordered class="q-pa-md q-mb-md search-box">
            <div class="text-h6 q-mb-sm">Find Your Next Job</div>
            <q-input
              rounded
              dense
              outlined
              placeholder="Search by job title, company, or skills..."
              color="primary"
              class="q-mb-sm"
            />
            <div class="row q-col-gutter-md q-mb-sm">
              <q-select class="col" label="Location" outlined dense :options="[]" />
              <q-select class="col" label="Job Type" outlined dense :options="[]" />
              <q-select class="col" label="Industry" outlined dense :options="[]" />
            </div>
            <div class="row items-center justify-between">
              <span class="text-caption text-grey">Showing {{ paginatedJobs.length }} of {{ jobs.length }} jobs</span>
              <q-btn flat icon="tune" label="More Filters" />
            </div>
          </q-card>

          <!-- Job Cards -->
          <transition-group name="fade" tag="div">
            <q-card
              v-for="job in paginatedJobs"
              :key="job.id"
              flat
              bordered
              class="job-card q-mb-md q-pa-md"
            >
              <div class="row justify-between items-center">
                <div>
                  <div class="row items-center q-gutter-sm">
                    <q-icon name="work" size="24px" class="text-primary" />
                    <h6 class="q-mb-none text-weight-bold">{{ job.title }}</h6>
                  </div>
                  <div class="text-caption text-grey-7 q-mt-xs">
                    <q-icon name="business" size="16px" /> {{ job.company }} • {{ job.location }}
                    <q-icon name="attach_money" size="16px" class="q-ml-md" /> {{ job.salary }}
                  </div>
                  <div class="q-mt-sm">
                    <q-chip
                      v-for="skill in job.skills"
                      :key="skill"
                      dense
                      color="blue-1"
                      text-color="primary"
                      class="q-mr-xs"
                    >
                      {{ skill }}
                    </q-chip>
                  </div>
                  <div class="text-caption q-mt-xs text-grey-6">
                    🕒 {{ job.posted }} • {{ job.type }}
                  </div>
                </div>
                <div class="column items-end">
                  <q-btn label="Apply Now" class="q-mb-sm primary-btn" />
                  <q-btn flat round icon="bookmark_border" color="primary" />
                </div>
              </div>
            </q-card>
          </transition-group>

          <!-- Sleek Pagination -->
          <div class="custom-pagination q-mt-xl q-mb-lg">
            <q-pagination
              v-model="currentPage"
              :max="maxPage"
              color="primary"
              size="md"
              flat
              direction-links
              boundary-links
              class="styled-pagination"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Complete Profile Modal Component -->
    <CompleteProfileModal v-model="showProfileModal" />
  </q-page>
</template>

<script setup>
import JobSeekerSidebar from 'components/JobSeekerSidebar.vue';
import CompleteProfileModal from 'components/CompleteProfileModal.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const showProfileModal = ref(false)
const userName = 'John';
const router = useRouter();

const goToResume = () => {
  router.push('/resume-builder');
};
const jobs = ref([
  {
    id: 1,
    title: 'Marketing Intern',
    company: 'Growth Co.',
    location: 'Los Angeles, CA',
    salary: '$25/hour',
    skills: ['Social Media', 'Analytics', 'Content Creation'],
    posted: '5 days ago',
    type: 'Internship'
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'AI Solutions',
    location: 'Boston, MA',
    salary: '$110k - $140k',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    posted: '1 day ago',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    salary: '$115k - $145k',
    skills: ['Kubernetes', 'Jenkins', 'AWS', 'Terraform'],
    posted: '4 days ago',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Frontend Developer',
    company: 'PixelCrafters',
    location: 'Austin, TX',
    salary: '$90k - $120k',
    skills: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Quasar'],
    posted: '2 days ago',
    type: 'Full-time'
   },
  {
    id: 5,
    title: 'Data Analyst',
    company: 'InsightSphere',
    location: 'Chicago, IL',
    salary: '$80k - $100k',
    skills: ['SQL', 'Python', 'Power BI', 'Tableau'],
    posted: '1 day ago',
    type: 'Part-time'
  },
  {
    id: 6,
    title: 'Mobile App Developer',
    company: 'AppVantage',
    location: 'San Diego, CA',
    salary: '$100k - $130k',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    posted: '3 days ago',
    type: 'Remote'
  }
]);

const currentPage = ref(1);
const perPage = 3;

const maxPage = computed(() => Math.ceil(jobs.value.length / perPage));
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return jobs.value.slice(start, start + perPage);
});
</script>


<style scoped>
.dashboard-container {
  max-width: 1280px;
  margin: 0 auto;
}

.dashboard-header {
  background: linear-gradient(90deg, #bbdefb, #e3f2fd);
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.1);
  border: 1px solid #cfd8dc;
  padding: 30px;
  margin-bottom: 24px;
}

.welcome-text {
  font-size: 2rem;
  color: #0d47a1;
  font-weight: 700;
  margin-bottom: 6px;
}

.subtext {
  color: #455a64;
  font-size: 15px;
  margin-top: 4px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}

.search-box {
  border-radius: 12px;
  background: #fafafa;
  box-shadow: 0 2px 6px rgba(21, 101, 192, 0.04);
}

.job-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  transform: scale(1);
}

.job-card:hover {
  transform: scale(1.015);
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.15);
  border-color: #1565c0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.handwritten {
  font-family: 'Satisfy', cursive;
  font-size: 40px;
  color: #2d6cff;
  display: inline-block;
  margin-top: 10px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

/* Pagination Styles */
.custom-pagination {
  display: flex;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  background: #f9fcff;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 -4px 10px rgba(21, 101, 192, 0.05);
}

.styled-pagination .q-pagination__content {
  gap: 8px;
}

.styled-pagination .q-btn {
  border-radius: 12px !important;
  min-width: 38px;
  height: 38px;
  font-size: 14px;
  font-weight: 500;
  transition: 0.25s all ease-in-out;
}

.styled-pagination .q-btn:hover:not(.q-btn--disabled):not(.q-btn--active) {
  background: #e3f2fd;
  color: #1565c0;
  transform: scale(1.05);
}

.styled-pagination .q-btn--active {
  background: #1565c0 !important;
  color: #ffffff !important;
  box-shadow: 0 0 0 2px #bbdefb;
}

.primary-btn {
  background-color: #1565c0;
  border-radius: 25px;
  color: white;
  padding: 8px 20px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.primary-text-btn {
  color: #1565c0;
}

.primary-btn:hover {
  background-color: #0d47a1;
}

</style>

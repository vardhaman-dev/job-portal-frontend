<template>
  <div class="job-seeker-page">
    <AppHeader/>
  <q-page class="q-pa-md">
    <div class="dashboard-container">
      <!-- Header -->
      <JobSeekerHeader 
        :userName="userName"
        @open-profile="showProfileModal = true"
        @go-resume="goToResume"
      />

      <div class="dashboard-content row q-col-gutter-xl q-mt-md">
        <!-- Sidebar -->
        <div class="col-3">
          <JobSeekerSidebar :selectedSection="selectedSection" @navigate="selectedSection=$event" />
        </div>

        <!-- Main Content -->
        <div class="col-9">
          <!-- DASHBOARD SECTION -->
          <template v-if="selectedSection === 'dashboard'">
            <q-card flat bordered class="q-pa-md q-mb-md search-box">
              <div class="text-h6 q-mb-sm">Find Your Next Opportunity</div>
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

            <transition-group :key="currentPage" name="fade" tag="div">
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

            <div class="custom-pagination q-mt-xl q-mb-lg row items-center justify-center q-gutter-sm">
            <q-btn
              flat
              dense
              label="Prev"
              :disable="currentPage === 1"
              @click="currentPage--"
              class="nav-btn"
            />

            <q-pagination
              v-model="currentPage"
              :max="maxPage"
              color="primary"
              size="md"
              flat
              class="styled-pagination"
            />

            <q-btn
              flat
              dense
              label="Next"
              :disable="currentPage === maxPage"
              @click="currentPage++"
              class="nav-btn"
            />
          </div>

          </template>

          <!-- BOOKMARKED JOBS SECTION -->
          <template v-else-if="selectedSection === 'bookmarks'">
            <BookmarkedJobs :jobs="bookmarkedJobs" @remove="removeBookmark"/>
          </template>
        </div>
      </div>
    </div>

    <CompleteProfileModal v-model="showProfileModal" />
  </q-page>
  </div>
</template>

<script setup>
import AppHeader from '../components/HeaderPart.vue'
import JobSeekerSidebar from 'components/JobSeekerSidebar.vue';
import JobSeekerHeader from 'components/JobSeekerHeader.vue';
import CompleteProfileModal from 'components/CompleteProfileModal.vue';
import BookmarkedJobs from 'components/BookmarkedJobs.vue';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const showProfileModal = ref(false);
const userName = 'John';
const selectedSection = ref('dashboard');
const router = useRouter();

const goToResume = () => router.push('/resume-builder');

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
  }
]);

const bookmarkedJobs = ref([
  jobs.value[1],
  jobs.value[3],
  jobs.value[2]
]);

const removeBookmark = (id) => {
  bookmarkedJobs.value = bookmarkedJobs.value.filter(job => job.id !== id);
};

const currentPage = ref(1);
const perPage = 3;
const maxPage = computed(() => Math.ceil(jobs.value.length / perPage));
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return jobs.value.slice(start, start + perPage);
});
</script>

<style scoped>
/* (Same styles as before) */
.dashboard-container {
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 20px;
}
.search-box {
  border-radius: 16px;
  background: #f5faff;
  border: 1px solid #d6e4f5;
  box-shadow: 0 2px 8px rgba(21, 101, 192, 0.08);
}
.job-card {
  border-radius: 14px;
  transition: all 0.3s ease;
  border: 1px solid #e3f2fd;
  background: white;
}
.job-card:hover {
  transform: scale(1.015);
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.12);
  border-color: #1565c0;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.custom-pagination {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.styled-pagination .q-pagination__content {
  gap: 12px;
}

.styled-pagination .q-btn {
  border-radius: 999px !important; /* pill shape */
  min-width: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  background-color: #f1f5f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
  border: none;
}

.styled-pagination .q-btn:hover:not(.q-btn--disabled):not(.q-btn--active) {
  background-color: #e3f2fd;
  color: #1565c0;
  transform: translateY(-1px) scale(1.05);
}

.styled-pagination .q-btn--active {
  background-color: #1565c0 !important;
  color: white !important;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.15);
}

.primary-btn {
  background-color: #1565c0;
  border-radius: 25px;
  color: white;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s;
}
.primary-btn:hover {
  background-color: #0d47a1;
  transform: scale(1.03);
}

/* Bookmark Button */
.q-btn[icon="bookmark_border"] {
  transition: transform 0.2s ease;
}
.q-btn[icon="bookmark_border"]:hover {
  background: #e3f2fd;
  transform: scale(1.1);
}

/* Section Headings */
.text-h6 {
  font-size: 20px;
  font-weight: 700;
  color: #1565c0;
}

h6 {
  font-size: 17px;
  font-weight: 600;
}

.text-caption {
  font-size: 13px;
}

.nav-btn {
  font-weight: 500;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 20px;
  color: #1565c0;
  background-color: #e3f2fd;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.nav-btn:hover:not(:disabled) {
  background-color: #bbdefb;
  border-color: #90caf9;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>

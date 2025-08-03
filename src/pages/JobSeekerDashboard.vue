<template>
  <div class="job-seeker-page">
    <!-- Fixed Header -->
    <div class="fixed-header">
      <AppHeader />
      <JobSeekerHeader
        :userName="userName"
        @open-profile="showProfileModal = true"
        @go-resume="goToResume"
      />
    </div>

    <!-- Main Layout -->
    <div class="main-layout">
      <!-- Fixed Sidebar -->
      <div class="sidebar">
        <JobSeekerSidebar :selectedSection="selectedSection" @navigate="selectedSection = $event" />
      </div>

      <!-- Scrollable Content -->
      <div class="main-content">
        <!-- MY APPLICATIONS SECTION -->
        <template v-if="selectedSection === 'applications'">
          <MyApplications />
        </template>

        <!-- BOOKMARKED JOBS SECTION -->
        <template v-else-if="selectedSection === 'bookmarks'">
          <BookmarkedJobs :jobs="bookmarkedJobs" @remove="removeBookmark" />
        </template>

        <!-- PROFILE SECTION -->
        <template v-else-if="selectedSection === 'profile'">
          <UserProfile />
        </template>

        <template v-else-if="selectedSection === 'notifications'">
          <NotificationComponent />
        </template>

        <template v-else-if="selectedSection === 'settings'">
          <SettingsComponent />
        </template>
      </div>
    </div>

    <CompleteProfileModal v-model="showProfileModal" />
  </div>
</template>


<script setup>
import AppHeader from '../components/HeaderPart.vue'
import JobSeekerSidebar from 'components/JobSeekerSidebar.vue';
import JobSeekerHeader from 'components/JobSeekerHeader.vue';
import CompleteProfileModal from 'components/CompleteProfileModal.vue';
import BookmarkedJobs from 'components/BookmarkedJobs.vue';
import MyApplications from 'components/MyApplications.vue';
import UserProfile from 'src/components/UserProfile.vue';
import NotificationComponent from 'src/components/NotificationsPage.vue';
import SettingsComponent from 'src/components/SettingsPage.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showProfileModal = ref(false);
const userName = 'John';
const selectedSection = ref('applications');
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

</script>

<style scoped>
/* Root Layout */
.job-seeker-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
  color: #1f2937;
}

/* Fixed Header */
.fixed-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

/* Main layout */
.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 120px); /* adjust based on header height */
  background-color: #f8faff;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: white;
  border-right: 1px solid #e5e7eb;
  position: sticky;
  top: 120px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 16px;
}

/* Scrollable Main Content */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
  background-color: #f9fbfc;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.03);
}

/* Enhanced Scrollbar */
.main-content::-webkit-scrollbar,
.sidebar::-webkit-scrollbar {
  width: 8px;
}
.main-content::-webkit-scrollbar-thumb,
.sidebar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
.main-content::-webkit-scrollbar-track,
.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

/* Card styling */
.job-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
}
.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  border-color: #1565c0;
}

/* Pagination Buttons */
.styled-pagination .q-pagination__content {
  gap: 12px;
}
.styled-pagination .q-btn {
  border-radius: 999px !important;
  min-width: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  background-color: #e2e8f0;
  transition: all 0.25s ease;
  border: none;
}
.styled-pagination .q-btn:hover:not(.q-btn--disabled):not(.q-btn--active) {
  background-color: #dbeafe;
  color: #1565c0;
}
.styled-pagination .q-btn--active {
  background-color: #1565c0 !important;
  color: white !important;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.15);
}

/* Primary CTA Button */
.primary-btn {
  background-color: #1565c0;
  border-radius: 25px;
  color: white;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.3s ease, transform 0.2s;
}
.primary-btn:hover {
  background-color: #0d47a1;
  transform: scale(1.03);
}

/* Section Headings */
h6, .text-h6 {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
}

.text-caption {
  font-size: 13px;
  color: #64748b;
}

/* Navigation button */
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

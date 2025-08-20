<template>
  <div class="modern-dashboard">
    <!-- Modern Header -->
    <AppHeader />

    <!-- Dashboard Container -->
    <div class="dashboard-container">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="container-unstop">
          <div class="welcome-content">
            <div class="welcome-text">
              <h1 class="welcome-title">
                Welcome back, <span class="gradient-text">{{ userName }}</span>! 👋
              </h1>
              <p class="welcome-subtitle">
                Ready to take the next step in your career? Let's find your perfect opportunity.
              </p>
            </div>
            <div class="welcome-actions">
              <q-btn 
                class="btn-unstop btn-primary"
                icon="search"
                label="Browse Jobs"
                @click="$router.push('/jobs')"
                no-caps
              />
              <q-btn 
                class="btn-unstop btn-outline"
                icon="description"
                label="Build Resume"
                @click="goToResume"
                no-caps
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Stats -->
      <div class="stats-section">
        <div class="container-unstop">
          <div class="stats-grid">
            <div class="stat-card card-unstop">
              <div class="stat-icon applications">
                <q-icon name="work" />
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ applicationCount }}</div>
                <div class="stat-label">Applications</div>
              </div>
            </div>
            <div class="stat-card card-unstop">
              <div class="stat-icon bookmarks">
                <q-icon name="bookmark" />
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ bookmarkedJobs.length }}</div>
                <div class="stat-label">Saved Jobs</div>
              </div>
            </div>
            <div class="stat-card card-unstop">
              <div class="stat-icon interviews">
                <q-icon name="event" />
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ interviewCount }}</div>
                <div class="stat-label">Interviews</div>
              </div>
            </div>
            <div class="stat-card card-unstop">
              <div class="stat-icon profile">
                <q-icon name="person" />
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ profileCompletion }}%</div>
                <div class="stat-label">Profile Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-section">
        <div class="container-unstop">
          <div class="dashboard-layout">
            <!-- Navigation Tabs -->
            <div class="nav-tabs">
              <q-btn
                v-for="tab in dashboardTabs"
                :key="tab.key"
                :class="['tab-btn', { 'tab-active': selectedSection === tab.key }]"
                :icon="tab.icon"
                :label="tab.label"
                @click="selectedSection = tab.key"
                no-caps
                flat
              />
            </div>

            <!-- Content Area -->
            <div class="content-area">
              <div class="content-wrapper">
                <template v-if="selectedSection === 'overview'">
                  <DashboardOverview 
                    :applications="applicationCount"
                    :bookmarks="bookmarkedJobs.length"
                    :interviews="interviewCount"
                    @open-profile="showProfileModal = true"
                  />
                </template>
                <template v-else-if="selectedSection === 'applications'">
                  <MyApplications @applications-loaded="updateApplicationCount" />
                </template>
                <template v-else-if="selectedSection === 'bookmarks'">
                  <BookmarkedJobs :jobs="bookmarkedJobs" @remove="handleRemove" />
                </template>
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
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <CompleteProfileModal v-model="showProfileModal" />
  </div>
</template>

<script setup>
import AppHeader from '../components/HeaderPart.vue'
import CompleteProfileModal from 'components/CompleteProfileModal.vue';
import BookmarkedJobs from 'components/BookmarkedJobs.vue';
import MyApplications from 'components/MyApplications.vue';
import UserProfile from 'src/components/UserProfile.vue';
import NotificationComponent from 'src/components/NotificationsPage.vue';
import SettingsComponent from 'src/components/SettingsPage.vue';
import DashboardOverview from 'components/DashboardOverview.vue';

import { useRouter } from 'vue-router';

import { ref, onMounted, computed } from 'vue';
import { bookmarkService } from '../services/bookmarkService';
import { applicationService } from '../services/applicationService';
import { authHelpers } from '../services/auth.service';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
const bookmarkedJobs = ref([]);
const showProfileModal = ref(false);
const selectedSection = ref('overview');
const router = useRouter();

const userId = authHelpers.getCurrentUser()?.id;
const userName = computed(() => authStore.userData?.name || 'User');

// Dashboard data
const applicationCount = ref(0);
const interviewCount = ref(2);
const profileCompletion = ref(85);

const dashboardTabs = computed(() => [
  { key: 'overview', label: 'Overview', icon: 'dashboard' },
  { key: 'applications', label: `Applications (${applicationCount.value})`, icon: 'work' },
  { key: 'bookmarks', label: `Saved Jobs (${bookmarkedJobs.value.length})`, icon: 'bookmark' },
  { key: 'profile', label: 'Profile', icon: 'person' },
  { key: 'notifications', label: 'Notifications', icon: 'notifications' },
  { key: 'settings', label: 'Settings', icon: 'settings' }
]);

const goToResume = () => router.push('/resume-builder');


 
const fetchApplications = async () => {
  try {
    const response = await applicationService.getMyApplications();
    if (response.success) {
      applicationCount.value = response.applications.length;
    }
  } catch (error) {
    console.error('Error fetching applications:', error);
  }
};

const updateApplicationCount = (count) => {
  applicationCount.value = count;
};

const fetchBookmarks = async () => {
  try {
    if (!userId) return;
    const jobs = await bookmarkService.getBookmarkedJobs(userId);
    bookmarkedJobs.value = jobs.map(b => ({
      id: b.id,
      title: b.title,
      company: b.company,
      location: b.location,
      salary: b.salary,
      skills: Array.isArray(b.skills) ? b.skills : JSON.parse(b.skills),
      posted: b.posted,
    
      type: b.type
    }));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
  }
};

const handleRemove = async (jobId) => {
  const original = [...bookmarkedJobs.value];

  bookmarkedJobs.value = bookmarkedJobs.value.filter(job => job.id !== jobId);

  try {
    await bookmarkService.removeBookmark(userId, jobId);
    console.log('Bookmark removed');
  } catch (error) {
    console.error("Failed to remove bookmark:", error);
    bookmarkedJobs.value = original; // rollback
  }
};




onMounted(() => {
  fetchApplications();
  fetchBookmarks();
});
</script>

<style scoped>
.modern-dashboard {
  min-height: 100vh;
  background: var(--color-gray-50);
  font-family: var(--font-family-primary);
}

/* Welcome Section */
.welcome-section {
  background: linear-gradient(135deg, 
    rgba(14, 165, 233, 0.1) 0%, 
    rgba(139, 92, 246, 0.1) 50%, 
    rgba(236, 72, 153, 0.1) 100%);
  padding: var(--space-12) 0;
  margin-top: 80px; /* Account for fixed header */
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.welcome-text {
  flex: 1;
  min-width: 300px;
}

.welcome-title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  font-family: var(--font-family-display);
  color: var(--color-gray-900);
  margin: 0 0 var(--space-4) 0;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin: 0;
  line-height: 1.6;
}

.welcome-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Stats Section */
.stats-section {
  padding: var(--space-12) 0;
  background: var(--color-surface);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon.applications {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.bookmarks {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-icon.interviews {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.profile {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-icon .q-icon {
  font-size: 1.75rem;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--color-gray-800);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  font-weight: 500;
}

/* Main Section */
.main-section {
  padding: var(--space-12) 0;
}

.dashboard-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* Navigation Tabs */
.nav-tabs {
  display: flex;
  gap: var(--space-2);
  background: var(--color-surface);
  padding: var(--space-2);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  overflow-x: auto;
}

.tab-btn {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--border-radius-lg);
  color: var(--color-gray-600);
  font-weight: 500;
  transition: all var(--transition-base);
  white-space: nowrap;
  min-width: auto;
}

.tab-btn:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-800);
}

.tab-active {
  background: var(--color-primary-500) !important;
  color: white !important;
}

/* Content Area */
.content-area {
  background: var(--color-surface);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  overflow: hidden;
}

.content-wrapper {
  padding: var(--space-8);
}

/* Responsive Design */
@media (max-width: 768px) {
  .welcome-section {
    padding: var(--space-8) 0;
  }
  
  .welcome-content {
    flex-direction: column;
    text-align: center;
  }
  
  .welcome-title {
    font-size: var(--font-size-3xl);
  }
  
  .welcome-actions {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
  }
  
  .stat-card {
    padding: var(--space-4);
  }
  
  .nav-tabs {
    padding: var(--space-1);
  }
  
  .tab-btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
  }
  
  .content-wrapper {
    padding: var(--space-6);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .welcome-actions .btn-unstop {
    width: 100%;
  }
}

/* Scrollbar Styling */
.nav-tabs::-webkit-scrollbar {
  height: 4px;
}

.nav-tabs::-webkit-scrollbar-thumb {
  background-color: var(--color-gray-300);
  border-radius: var(--border-radius-full);
}

.nav-tabs::-webkit-scrollbar-track {
  background: transparent;
}
</style>

<template>
  <div class="joblistingpage">
    <AppHeader />

    <q-page class="row q-pa-md job-page-wrapper">
      <div class="col-9">

        <!-- Suggestion Title -->
        <div v-if="!searchQuery && authHelpers.getCurrentUser()" class="text-h6 q-mb-md">
          Suggested for You
        </div>

        <!-- Sort -->
        <div class="row justify-between items-center q-mb-md">
          <q-select
            filled
            dense
            v-model="sortBy"
            :options="['Relevance', 'Newest', 'Salary: High to Low', 'Salary: Low to High']"
            label="Sort by"
            class="col-3"
          />
        </div>

        <!-- Filters -->
        <JobFilters />

        <!-- Job Cards -->
        <transition-group name="fade-slide" tag="div">
          <router-link
            v-for="job in filteredJobs"
            :key="job.id"
            :to="`/job/${job.id}`"
            class="full-width no-underline"
          >
            <q-card class="q-mb-md job-card row items-center no-wrap">
              <q-card-section class="col row items-center no-wrap q-pa-md">
                <q-avatar size="48px" class="bg-grey-3 text-grey-8 q-mr-md">
                  <q-icon name="business" size="28px" />
                </q-avatar>

                <div class="col">
                  <div class="text-subtitle1 text-weight-medium">{{ job.title }}</div>
                  <div class="text-caption text-grey-7">{{ job.company }}</div>

                  <div class="row items-center text-caption text-grey-8 q-mt-xs q-gutter-sm">
                    <div class="row items-center">
                      <q-icon name="place" size="16px" class="q-mr-xs" />
                      {{ job.location }}
                    </div>
                    <div class="row items-center">
                      <q-icon name="attach_money" size="16px" class="q-mr-xs" />
                      {{ job.salary }}
                    </div>
                    <div class="row items-center">
                      <q-icon name="schedule" size="16px" class="q-mr-xs" />
                      {{ job.duration }}
                    </div>
                  </div>

                  <div class="q-mt-sm">
                    <q-badge v-if="job.mode === 'Remote'" color="green" label="Remote" class="q-mr-sm" />
                    <q-badge v-if="job.mode === 'Hybrid'" color="blue" label="Hybrid" class="q-mr-sm" />
                    <q-badge v-if="job.mode === 'Work from Office'" color="purple" label="Work from Office" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </router-link>
        </transition-group>

        <!-- Empty State -->
        <div v-if="filteredJobs.length === 0" class="empty-state-container">
          <div v-if="searchQuery">
            <q-icon name="search_off" size="30px" class="q-mb-sm" />
            No jobs found for "<strong>{{ searchQuery }}</strong>"
          </div>
          <div v-else-if="!authHelpers.getCurrentUser()">
            <q-icon name="lock" size="30px" class="q-mb-sm" />
            Please <router-link to="/login">log in</router-link> to get personalized job suggestions.
          </div>
          <div v-else>
            <q-icon name="info" size="30px" class="q-mb-sm" />
            No job suggestions available at the moment.
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import suggestService from '../services/suggest.service';
import searchService from '../services/search.service';
import { authHelpers } from '../services/auth.service';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

const route = useRoute();
const category = computed(() => route.params.category?.toLowerCase().trim() || '');
const sortBy = ref('Relevance');
const jobList = ref([]);

const filters = ref({
  workMode: [],
  salaryRange: [0, 200000],
  salaryMin: 0,
  salaryMax: 200000,
  roleCategory: [],
  duration: ''
});


const fetchJobs = async () => {
  const currentUser = authHelpers.getCurrentUser();
  const isLoggedIn = !!currentUser?.id;

  try {
    let result;

    if (searchTerm.value && searchTerm.value.length > 0) {
      console.log('🔍 Searching for:', searchTerm.value);
      result = await searchService.searchJobs(searchTerm.value);

      // 👇 Extract from result.data.jobs
      jobList.value = result.success && Array.isArray(result.data.jobs)
        ? result.data.jobs
        : [];
    } else if (isLoggedIn) {
      console.log('🤖 Getting suggestions for:', currentUser.id);
      result = await suggestService.getSuggestions(currentUser.id);

      // 👇 result.data is already an array
      jobList.value = result.success && Array.isArray(result.data)
        ? result.data.map(job => ({
            ...job,
            id: job.jobId // rename jobId to id so router-link works
          }))
        : [];
    } else {
      jobList.value = [];
    }

    console.log('✅ Final jobList:', jobList.value);
  } catch (err) {
    console.error('🔥 API Error:', err);
    jobList.value = [];
  }
};


onMounted(fetchJobs);
const searchTerm = ref('');

watch(() => props.searchQuery, (newQuery) => {
  searchTerm.value = newQuery?.toLowerCase().trim() || '';
  fetchJobs();
});
const filteredJobs = computed(() => {
  const jobs = Array.isArray(jobList.value) ? jobList.value : [];
  const cat = category.value;
  const isSearch = searchTerm.value !== '';

  return jobs.filter(job => {
    const jobSalary = parseInt(job.salary?.toString().replace(/\D/g, '')) || 0;
    const jobCat = job.category?.toLowerCase().trim() || '';

    if (isSearch) {
      return (
        (!cat || jobCat === cat) &&
        (filters.value.workMode.length === 0 || filters.value.workMode.includes(job.mode)) &&
        jobSalary >= filters.value.salaryMin &&
        jobSalary <= filters.value.salaryMax &&
        (filters.value.roleCategory.length === 0 || filters.value.roleCategory.includes(job.category)) &&
        (!filters.value.duration || filters.value.duration === job.duration)
      );
    } else {
      let tags = [];
      try {
        tags = Array.isArray(job.tags) ? job.tags : JSON.parse(job.tags || '[]');
      } catch {
        tags = [];
      }

      return (
        (!cat || jobCat === cat) &&
        (filters.value.workMode.length === 0 || filters.value.workMode.includes(job.mode)) &&
        jobSalary >= filters.value.salaryMin &&
        jobSalary <= filters.value.salaryMax &&
        (filters.value.roleCategory.length === 0 || filters.value.roleCategory.includes(job.category)) &&
        (!filters.value.duration || filters.value.duration === job.duration) &&
        (
          job.title.toLowerCase().includes(searchTerm.value) ||
          tags.some(tag => tag.toLowerCase().includes(searchTerm.value))
        )
      );
    }
  });
});

</script>

<style scoped>
.joblistingpage {
  font-family: 'Inter', sans-serif;
  background-color: #f9f9f9;
}

.job-page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.job-card {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.q-badge {
  font-size: 12px;
}

.no-underline {
  text-decoration: none;
  color: inherit;
}
/* Add this new class to your <style scoped> section */
.empty-state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 10vh; /* Ensures it occupies a substantial part of the view */
  color: #757575; /* A standard grey color */
  text-align: center;
}
</style>

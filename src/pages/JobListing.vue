<template>
  <div class="joblistingpage">
    <AppHeader />

    <q-page class="row q-pa-md job-page-wrapper">
      <div class="col-9">

        <!-- Search + Sort -->
        <div class="row justify-between items-center q-mb-md">
          <q-input
            filled
            dense
            v-model="search"
            placeholder="Search within results..."
            class="col-6"
          />
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

        <div v-if="filteredJobs.length === 0" class="q-mt-md text-grey text-center">
          No jobs found matching your filters.
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '../components/HeaderPart.vue';
import JobFilters from '../components/FilterBar.vue';

const route = useRoute();
const category = computed(() => route.params.category?.toLowerCase().trim() || '');

const search = ref('');
const sortBy = ref('Relevance');

const filters = ref({
  workMode: [],
  salaryRange: [0, 200000],
  salaryMin: 0,
  salaryMax: 200000,
  roleCategory: [],
  duration: ''
});

const jobList = ref([
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120k-150k',
    mode: 'Remote',
    duration: 'Full-time',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    salary: '$85k-110k',
    mode: 'Hybrid',
    duration: 'Full-time',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Marketing Coordinator',
    company: 'Growth Labs',
    location: 'Austin, TX',
    salary: '$55k-70k',
    mode: 'Work from Office',
    duration: 'Full-time',
    category: 'Marketing'
  },
  {
    id: 4,
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    location: 'Seattle, WA',
    salary: '$25-35/hr',
    mode: 'Remote',
    duration: 'Internship',
    category: 'Technology'
  }
]);

const filteredJobs = computed(() => {
  const cat = category.value;

  return jobList.value.filter(job => {
    const jobSalary = parseInt(job.salary.replace(/\D/g, '')) || 0;
    const jobCat = job.category?.toLowerCase().trim() || '';

    return (
      (!cat || jobCat === cat) &&
      (filters.value.workMode.length === 0 || filters.value.workMode.includes(job.mode)) &&
      jobSalary >= filters.value.salaryMin &&
      jobSalary <= filters.value.salaryMax &&
      (filters.value.roleCategory.length === 0 || filters.value.roleCategory.includes(job.category)) &&
      (!filters.value.duration || filters.value.duration === job.duration) &&
      (search.value === '' || job.title.toLowerCase().includes(search.value.toLowerCase()))
    );
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
</style>

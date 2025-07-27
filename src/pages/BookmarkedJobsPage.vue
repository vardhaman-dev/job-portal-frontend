<template>
  <q-page class="q-pa-md">
    <h5 class="text-primary q-mb-md">Bookmarked Jobs</h5>

    <q-card
      v-for="job in bookmarkedJobs"
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
        <q-btn label="Remove" color="negative" flat @click="removeBookmark(job.id)" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

// Simulated bookmarks (can replace with Pinia or Vuex in future)
const bookmarkedJobs = ref([
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
    id: 4,
    title: 'Frontend Developer',
    company: 'PixelCrafters',
    location: 'Austin, TX',
    salary: '$90k - $120k',
    skills: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Quasar'],
    posted: '2 days ago',
    type: 'Full-time'
  }
])

function removeBookmark(id) {
  bookmarkedJobs.value = bookmarkedJobs.value.filter(job => job.id !== id)
}
</script>

<style scoped>
.job-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}
.job-card:hover {
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.15);
  border-color: #1565c0;
}
</style>

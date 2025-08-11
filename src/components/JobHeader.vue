<template>
  <q-card
    class="q-pa-md q-mb-md transition-all cursor-pointer job-card"
    :class="{ 'shadow-4': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="row justify-between items-center q-col-gutter-md">
      <!-- Left: Job Info -->
      <div class="col">
        <div class="text-h5 text-bold job-title">{{ job.title }}</div>
        <div class="text-subtitle2 q-mt-xs">{{ job.company?.companyName || 'Unknown Company' }}</div>

        <div class="text-grey text-caption q-mt-xs">
          {{ job.location }} • Posted on {{ createddate }} • Apply by {{ formattedDeadline }}
        </div>

        <div class="q-mt-sm q-gutter-sm">
          <q-badge v-if="job.remote" color="green-3" text-color="black" label="Remote" />
          <q-badge color="blue" label="Full-time" />
          <q-badge color="teal" label="Technology" />
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="column items-end q-mt-sm q-mt-none-md">
        <q-btn
          label="Apply Now"
          :style="{ backgroundColor: '#1565c0', color: 'white' }"
          class="q-mb-sm"
          unelevated
          @click="goToApplicationForm"
        />
        <div class="q-gutter-sm">
          <!-- Bookmark Button -->
          <q-btn
            flat
            round
            dense
            :icon="isBookmarked ? 'bookmark' : 'bookmark_border'"
            :color="isBookmarked ? 'blue' : 'grey'"
            @click="toggleBookmark"
            :loading="loading"
          >
            <q-tooltip>{{ isBookmarked ? 'Remove Bookmark' : 'Bookmark' }}</q-tooltip>
          </q-btn>

          <!-- Share Button -->
          <q-btn flat>
            <template #default>
              <img :src="shareIcon" alt="Share" width="20" height="20" />
              <q-tooltip>Share</q-tooltip>
            </template>
          </q-btn>

          <!-- Settings Button -->
          <q-btn
            flat
            round
            dense
            icon="settings"
            color="grey"
            @click="openSettings"
          >
            <q-tooltip>Settings</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, toRef, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authHelpers } from '../services/auth.service'
import { bookmarkService } from '../services/bookmarkService'
import shareIcon from '../assets/share.png'

const props = defineProps({ job: Object })
const job = toRef(props, 'job')
const router = useRouter()
const isHovered = ref(false)
const isBookmarked = ref(false)
const loading = ref(false)

const userId = authHelpers.getCurrentUser()?.id

const formattedDeadline = computed(() => {
  if (!job.value?.deadline) return 'Not specified'
  return new Date(job.value.deadline).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
})

const createddate = computed(() => {
  if (!job.value?.posted_at) return 'Not specified'
  return new Date(job.value.posted_at).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
})

const goToApplicationForm = () => {
  if (job.value?.id) {
    router.push({ name: 'ApplicationForm', params: { jobId: job.value.id } })
  }
}

const checkBookmark = async () => {
  try {
    const res = await bookmarkService.checkBookmark(userId, job.value.id)
    console.log("Bookmark check response:", res)
    isBookmarked.value = res.bookmarked
  } catch (err) {
    console.error('Error checking bookmark:', err)
  }
}

const toggleBookmark = async () => {
  loading.value = true
  try {
    if (isBookmarked.value) {
      await bookmarkService.removeBookmark(userId, job.value.id)
      isBookmarked.value = false
    } else {
      await bookmarkService.addBookmark(userId, job.value.id)
      isBookmarked.value = true
    }
  } catch (err) {
    console.error('Error toggling bookmark:', err)
  } finally {
    loading.value = false
  }
}

const openSettings = () => {
  // Add logic for settings action (e.g., open a modal or navigate to settings page)
  console.log('Settings clicked for job:', job.value.id)
  // Example: router.push('/job-settings/' + job.value.id)
}

onMounted(() => {
  checkBookmark()
})
</script>

<style scoped>
.transition-all {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.job-card {
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(31, 101, 242, 0);
}

.job-title {
  color: #1565c0;
}
</style>
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
        <div class="text-subtitle2 q-mt-xs">{{ job.company }}</div>
        <div class="text-grey text-caption q-mt-xs">
          {{ job.location }} • Posted on {{ job.postedDate }} • Apply by {{ job.applyBy }}
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
        />
        <div class="q-gutter-sm">
          <q-btn flat icon="bookmark_border">
            <q-tooltip>Bookmark</q-tooltip>
          </q-btn>
          <q-btn flat>
              🔗
            <q-tooltip>Share</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ job: Object })

const isHovered = ref(false)
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
}

.job-title {
  color: #1565c0;
}
</style>

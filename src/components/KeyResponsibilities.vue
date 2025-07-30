<template>
  <q-card
    class="q-pa-md q-mb-lg transition-all cursor-pointer border"
    :class="{ 'shadow-4': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="text-h6 text-bold q-mb-md">Key Responsibilities</div>
    <q-list>
      <q-item
        v-for="(item, index) in job.responsibilities"
        :key="index"
        class="q-py-sm"
      >
        <q-item-section avatar>
          <q-icon
            :name="iconList[index % iconList.length]"
            :color="iconColor"
            size="24px"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body2 text-dark">
            {{ item }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ job: Object })

const isHovered = ref(false)

const iconList = [
  'lightbulb',       // Creative thinking
  'trending_up',     // Growth
  'groups',          // Teamwork
  'event',           // Planning
  'task_alt',        // Task completed
  'leaderboard',     // Metrics
  'tips_and_updates' // Innovation
]

const iconColor = '#1565c0'
</script>

<style scoped>
.transition-all {
  transition: box-shadow 0.3s ease;
}

.border {
  border-radius: 16px;
}
</style>

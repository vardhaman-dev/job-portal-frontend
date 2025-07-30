<template>
  <q-card
    class="q-pa-md q-mb-md transition-all cursor-pointer border"
    :class="{ 'shadow-4': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="text-h6 text-bold">Job Overview</div>
    <p class="q-mt-sm">{{ job.overview }}</p>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ job: Object })

const isHovered = ref(false)
</script>

<style scoped>
.transition-all {
  transition: box-shadow 0.3s ease;
}

.border {
  border-radius: 16px;
}
</style>

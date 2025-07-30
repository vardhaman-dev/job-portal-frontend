<template>
  <q-card
    class="q-pa-md q-mb-md shadow-2 hoverable-card rounded-border"
    style="max-width: 100%; background-color: #e8f5e9;"
  >
    <div class="text-h6 text-weight-bold text-green-10">Salary & Benefits</div>

    <!-- Salary Section -->
    <div class="q-mt-md">
      <div class="text-subtitle2 text-weight-medium">Salary Range</div>
      <q-badge
        color="green-7"
        text-color="white"
        class="q-mt-sm q-pa-sm text-subtitle2"
        align="middle"
      >
        <q-icon name="attach_money" class="q-mr-xs" />
        {{ job.salary }}
      </q-badge>
    </div>

    <!-- Benefits Section -->
    <div class="q-mt-md">
      <div class="text-subtitle2 text-weight-medium">Benefits & Perks</div>
      <q-list bordered separator class="q-mt-sm">
        <q-item v-for="(perk, index) in job.benefits" :key="index" class="q-py-sm">
          <q-item-section avatar>
            <q-icon name="check_circle" color="green-8" size="20px" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body2 text-green-9">{{ perk }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-card>
</template>

<script setup>
defineProps({ job: Object })
</script>

<style scoped>
.rounded-border {
  border-radius: 16px;
}

.hoverable-card {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.hoverable-card:hover {
  box-shadow: 0 6px 16px rgba(0, 128, 0, 0.25);
  transform: translateY(-2px);
}
</style>

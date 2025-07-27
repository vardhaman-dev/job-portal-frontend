<template>
  <div>
    <h5 class="text-primary q-mb-md">Bookmarked Jobs</h5>
    <q-card
      v-for="job in jobs"
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
        <q-btn label="Remove" color="negative" flat @click="$emit('remove', job.id)" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
defineProps(['jobs']);
defineEmits(['remove']);
</script>

<style scoped>
.job-card {
  border-radius: 14px;
  transition: all 0.3s ease;
  border: 1px solid #e3f2fd;
  background: white;
}
.job-card:hover {
  transform: scale(1.015);
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.12);
  border-color: #1565c0;
}
.q-chip {
  border-radius: 12px;
  background-color: #e3f2fd;
  font-size: 13px;
  font-weight: 500;
}
</style>

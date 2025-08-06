<!-- src/components/CompanyInfo.vue -->
<template>
  <div class="company-info q-pa-md">
    <h3>{{ job.company?.companyName || 'Unknown Company' }}</h3>

    <div class="q-mb-sm">
      <img
        v-if="job.company?.logo"
        :src="job.company.logo"
        alt="Company Logo"
        class="company-logo"
      />
      <q-icon v-else name="business" size="2em" color="grey" />
    </div>

    <p v-if="job.company?.description">{{ job.company.description }}</p>
    <p v-else class="text-grey">No company description available.</p>

    <div class="q-mt-sm">
      <p v-if="job.company?.website">
        <a :href="job.company.website" target="_blank" class="text-primary">
          Visit Website
        </a>
      </p>
      <p v-else class="text-grey">No website provided.</p>

      <p v-if="job.company?.industry">
        <strong>Industry:</strong> {{ job.company.industry }}
      </p>
      <p v-else class="text-grey">Industry not specified.</p>

      <p v-if="job.company?.location">
        <strong>Location:</strong> {{ job.company.location }}
      </p>
      <p v-else class="text-grey">Location not specified.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ job: Object })
</script>

<style scoped>
.company-info {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.company-logo {
  max-width: 150px;
  margin-bottom: 1rem;
}
</style>

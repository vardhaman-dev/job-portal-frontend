<template>
  <q-card class="q-pa-md sidebar-card">
    <!-- Header -->
    <div class="text-subtitle1 q-mb-sm row items-center justify-between">
      <span class="text-bold">Filters</span>
      <q-icon name="filter_list" class="text-grey-7" />
    </div>

    <!-- Work Mode -->
    <div class="section-label">Work Mode</div>
    <q-option-group
      v-model="localFilters.workMode"
      :options="workModeOptions"
      type="checkbox"
      color="primary"
    />

    <!-- Salary Range -->
    <div class="section-label q-mt-md">Salary Range</div>
    <q-slider
        v-model="localFilters.salaryRange"
        :min="0"
        :max="200000"
        label-always
        range
        color="primary"
        @update:model-value="syncSalaryInputs"
        style="--q-primary: #1565c0"
    />

    <div class="row q-gutter-sm q-my-sm">
      <q-input
        filled
        dense
        v-model.number="localFilters.salaryMin"
        label="Min"
        type="number"
        class="col"
        @update:model-value="updateSliderFromInputs"
      />
      <q-input
        filled
        dense
        v-model.number="localFilters.salaryMax"
        label="Max"
        type="number"
        class="col"
        @update:model-value="updateSliderFromInputs"
      />
    </div>

    <!-- Role Category -->
    <div class="section-label q-mt-md">Role Category</div>
    <q-option-group
      v-model="localFilters.roleCategory"
      :options="roleCategoryOptions"
      type="checkbox"
      color="primary"
    />

    <!-- Duration -->
    <div class="section-label q-mt-md">Duration</div>
    <q-option-group
      v-model="localFilters.duration"
      :options="durationOptions"
      type="radio"
      color="primary"
    />

    <!-- Action Buttons -->
    <div class="q-mt-lg">
      <q-btn
        label="Apply Filters"
        class="full-width apply-btn"
        @click="applyFilters"
      />
      <q-btn
        flat
        label="Clear All"
        class="full-width q-mt-sm clear-btn"
        @click="clearLocalFilters"
      />
    </div>
  </q-card>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  filters: Object
})
const emits = defineEmits(['update:filters'])

const localFilters = reactive({ ...props.filters })

watch(
  localFilters,
  () => {
    emits('update:filters', { ...localFilters })
  },
  { deep: true }
)

function applyFilters() {
  emits('update:filters', { ...localFilters })
}

function clearLocalFilters() {
  Object.assign(localFilters, {
    workMode: [],
    salaryRange: [0, 200000],
    salaryMin: 0,
    salaryMax: 200000,
    roleCategory: [],
    duration: ''
  })
}

function syncSalaryInputs([min, max]) {
  localFilters.salaryMin = min
  localFilters.salaryMax = max
}

function updateSliderFromInputs() {
  localFilters.salaryRange = [
    Math.min(localFilters.salaryMin, localFilters.salaryMax),
    Math.max(localFilters.salaryMin, localFilters.salaryMax)
  ]
}

const workModeOptions = [
  { label: 'Remote', value: 'Remote' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'Work from Office', value: 'Work from Office' }
]

const roleCategoryOptions = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Design', value: 'Design' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Product', value: 'Product' },
  { label: 'Content', value: 'Content' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Finance', value: 'Finance' }
]

const durationOptions = [
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Part-time', value: 'Part-time' },
  { label: 'Internship', value: 'Internship' },
  { label: 'Freelance', value: 'Freelance' }
]
</script>

<style scoped>
.sidebar-card {
  min-width: 260px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
}

.section-label {
  font-weight: 600;
  font-size: 14px;
  margin-top: 12px;
  color: #212121;
}

.apply-btn {
  background-color: #1565c0;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  transition: 0.3s ease;
  text-transform: none;
}

.apply-btn:hover {
  background-color: #0d47a1;
}

.clear-btn {
  color: #424242;
  font-weight: 500;
  text-transform: none;
}

.custom-slider >>> .q-slider__track-container,
.custom-slider >>> .q-slider__track,
.custom-slider >>> .q-slider__track--fill,
.custom-slider >>> .q-slider__thumb {
  background-color: #1565c0 !important;
}

.custom-slider >>> .q-slider__thumb:after {
  box-shadow: 0 0 0 2px #1565c0;
}

</style>

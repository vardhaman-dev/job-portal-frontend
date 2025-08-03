<template>
  <div class="filters-container row no-wrap items-center">
    <!-- Filter cards -->
    <div v-for="(dropdown, key) in dropdowns" :key="key" class="filter-card">
      <FilterDropdown
        :label="getLabel(key)"
        :options="getOptions(key)"
        v-model="filters[key]"
        v-model:dropdown="dropdowns[key]"
        :default-text="getDefaultText(key)"
      />
    </div>

    <!-- Apply / Clear Buttons -->
    <div class="filter-actions">
      <button class="apply-filters-btn" @click="applyFilters">Apply</button>
      <span class="clear-filters" @click="clearFilters">Clear</span>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const filters = reactive({
  workMode: '',
  jobType: '',
  experience: '',
  salaryRange: '',
  companyType: '',
  roleCategory: ''
})

const dropdowns = reactive({
  workMode: false,
  jobType: false,
  experience: false,
  salaryRange: false,
  companyType: false,
  roleCategory: false
})

function getLabel(key) {
  return {
    workMode: 'Mode',
    jobType: 'Type',
    experience: 'Level',
    salaryRange: 'Salary',
    companyType: 'Company',
    roleCategory: 'Role'
  }[key] || ''
}

function getOptions(key) {
  return {
    workMode: ['', 'Remote', 'On-site', 'Hybrid'],
    jobType: ['', 'Full-time', 'Part-time', 'Internship', 'Freelance'],
    experience: ['', 'Fresher', 'Mid', 'Senior', 'Manager'],
    salaryRange: ['', '0-20k', '20k-50k', '50k-100k', '100k+'],
    companyType: ['', 'Startup', 'MNC', 'Govt.', 'NGO'],
    roleCategory: ['', 'Tech', 'Design', 'Marketing', 'Ops']
  }[key] || []
}

function getDefaultText(key) {
  return {
    workMode: 'All',
    jobType: 'All',
    experience: 'All',
    salaryRange: 'All',
    companyType: 'All',
    roleCategory: 'All'
  }[key] || 'All'
}

function clearFilters() {
  Object.keys(filters).forEach(key => filters[key] = '')
}

function applyFilters() {
  console.log('Applying filters:', filters)
}
</script>

<style scoped>
.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #fff;
}

.filter-card {
  background-color: #e9e6e6;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  min-width: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
}

.filter-card:hover {
  background-color: #d6d3d3;
}

.filter-card.active {
  background-color: #444;
  color: #fff;
}

.filter-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.apply-filters-btn {
  background-color: #0a66c2;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.apply-filters-btn:hover {
  background-color: #004182;
}

.clear-filters {
  font-size: 13px;
  color: #666;
  cursor: pointer;
  user-select: none;
}

.clear-filters:hover {
  text-decoration: underline;
  color: #000;
}


</style>

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
import FilterDropdown from '../components/FilterDropdown.vue'

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
  gap: 0.6rem;
  background-color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: visible;
}

.filter-card {
  background: #f9fbfd;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  transition: all 0.15s ease-in-out;
  min-width: 140px;
  flex-shrink: 0;
  /* position: relative;
  overflow: visible; */
  position: static;
}

.filter-card:hover {
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transform: translateY(-1px);
}

.filter-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.8rem;
}

.apply-filters-btn {
  background-color: #0a66c2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: background-color 0.2s ease;
}

.apply-filters-btn:hover {
  background-color: #004182;
}

.clear-filters {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  user-select: none;
  opacity: 0.8;
}

.clear-filters:hover {
  text-decoration: underline;
  opacity: 1;
}
</style>

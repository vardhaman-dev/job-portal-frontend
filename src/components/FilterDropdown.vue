<template>
  <div class="dropdown-wrapper">
    <label class="filter-label" @click="toggleDropdown">
      {{ label }}
      <span class="dropdown-arrow">{{ dropdown ? '▲' : '▼' }}</span>
    </label>

    <!-- Dropdown menu -->
    <div v-if="dropdown" class="dropdown-menu">
      <div
        v-for="option in options"
        :key="option"
        class="dropdown-option"
        :class="{ selected: modelValue === option }"
        @click="selectOption(option)"
      >
        {{ option || defaultText }}
      </div>
    </div>

    <!-- Selected value shown below -->
    <div class="selected-value">
      {{ modelValue || defaultText }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  options: Array,
  defaultText: String,
  modelValue: String,
  dropdown: Boolean
})

const emit = defineEmits(['update:modelValue', 'update:dropdown'])

function toggleDropdown() {
  emit('update:dropdown', !props.dropdown)
}

function selectOption(option) {
  emit('update:modelValue', option)
  emit('update:dropdown', false)
}
</script>

<style scoped>
.dropdown-wrapper {
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  z-index: 100; /* Ensure it's above others */
}

.filter-label {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-arrow {
  margin-left: 4px;
  font-size: 10px;
  color: #777;
}

/* Dropdown menu overlaps other cards and is scrollable */
.dropdown-menu {
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  /* position: static; */
  /* margin-top: 6px; */
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-height: 180px;
  overflow-y: auto;
}

.dropdown-option {
  padding: 6px 10px;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
}

.dropdown-option:hover {
  background-color: #f0f4f8;
}

.dropdown-option.selected {
  font-weight: 600;
  background-color: #e3f2fd;
}

.selected-value {
  font-size: 13px;
  color: #333;
  margin-top: 4px;
  opacity: 0.85;
}
</style>

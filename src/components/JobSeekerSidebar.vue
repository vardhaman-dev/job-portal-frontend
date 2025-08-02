<template>
  <div class="dashboard-sidebar">
    <q-list padding>

      <q-item
        v-for="item in sidebarItems"
        :key="item.key"
        clickable
        v-ripple
        :active="selectedSection === item.key"
        active-class="active-link"
        @click="navigate(item.key)"
        class="sidebar-item"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" color="primary" />
        </q-item-section>
        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script setup>
const emit = defineEmits(['navigate'])

defineProps({
  selectedSection: String,
})

// Removed 'Browse Jobs' item
const sidebarItems = [
  { key: 'applications', label: 'My Applications', icon: 'assignment' },
  { key: 'bookmarks', label: 'Bookmarked Jobs', icon: 'bookmark' },
  { key: 'profile', label: 'My Profile', icon: 'person' },
  { key: 'notifications', label: 'Notifications', icon: 'notifications' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
]

function navigate(section) {
  emit('navigate', section)
}
</script>

<style scoped>
.dashboard-sidebar {
  width: 250px;
  min-height: 50vh;
  background: #f4f6fb;
  border-right: 1px solid #dfe3e8;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.03);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top: 20px;
}

.sidebar-item {
  font-size: 15px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 10px;
  transition: background-color 0.3s ease, border-left 0.3s ease;
  margin-bottom: 6px;
}

.sidebar-item:hover {
  background-color: #e8f0fe;
}

.active-link {
  background-color: #dbeafe;
  border-left: 4px solid #1e88e5;
  font-weight: bold;
}
</style>

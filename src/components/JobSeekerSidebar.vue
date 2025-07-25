<template>
  <div class="dashboard-sidebar q-pa-md bg-grey-1">
    <q-list>

      <router-link to="/dashboard" class="nav-link" exact>
        <q-item clickable v-ripple :active="$route.path === '/dashboard'" active-class="active-link">
          <q-item-section avatar><q-icon name="work" color="primary" /></q-item-section>
          <q-item-section>Browse Jobs</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/dashboard/applications" class="nav-link">
        <q-item clickable v-ripple :active="$route.path === '/dashboard/applications'" active-class="active-link">
          <q-item-section avatar><q-icon name="assignment" color="primary" /></q-item-section>
          <q-item-section>My Applications</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/dashboard/bookmarks" class="nav-link">
        <q-item clickable v-ripple :active="$route.path === '/dashboard/bookmarks'" active-class="active-link">
          <q-item-section avatar><q-icon name="bookmark" color="primary" /></q-item-section>
          <q-item-section>Bookmarked Jobs</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/dashboard/profile" class="nav-link">
        <q-item clickable v-ripple :active="$route.path === '/dashboard/profile'" active-class="active-link">
          <q-item-section avatar><q-icon name="person" color="primary" /></q-item-section>
          <q-item-section>My Profile</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/dashboard/notifications" class="nav-link">
        <q-item clickable v-ripple :active="$route.path === '/dashboard/notifications'" active-class="active-link">
          <q-item-section avatar><q-icon name="notifications" color="primary" /></q-item-section>
          <q-item-section>Notifications</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/dashboard/settings" class="nav-link">
        <q-item clickable v-ripple :active="$route.path === '/dashboard/settings'" active-class="active-link">
          <q-item-section avatar><q-icon name="settings" color="primary" /></q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </router-link>

    </q-list>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>

<style scoped>
.dashboard-sidebar {
  background-color: #f8f9fa;
  border-right: 2px solid #1565c0; /* blue border on the right */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  min-height: 100vh;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 6px;
}

.q-item {
  font-size: 16px;
  font-weight: 500;
  padding: 12px;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.q-item:hover {
  background-color: #e3f2fd;
  border-left: 4px solid #90caf9;
}

.active-link {
  background-color: #e3f2fd; /* light blue */
  border-left: 4px solid #1565c0;
}

</style>

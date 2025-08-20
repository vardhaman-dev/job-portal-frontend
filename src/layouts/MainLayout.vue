<template>
  <q-layout view="lHh Lpr lFf" class="modern-layout">
    <!-- Main Content -->
    <q-page-container class="main-content">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Simple layout for pages that handle their own headers
</script>

<style scoped>
.modern-layout {
  background: var(--color-gray-50);
}

.main-content {
  background: var(--color-gray-50);
  min-height: 100vh;
}
</style>
<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">

    <!-- Optional: Header for Auth Pages -->
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <q-btn flat dense icon="work" @click="$router.push('/')" />
        <q-toolbar-title>JobHub</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Main Auth Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
// No additional logic needed here
</script>

<style scoped>
/* Optional: Add soft background or styling if needed */
</style>

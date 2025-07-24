<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">

    <!-- Optional: Header for Auth Pages -->
    <HeaderPage layout="auth" />


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

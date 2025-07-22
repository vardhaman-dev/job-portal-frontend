<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Job Portal
        </q-toolbar-title>

        <q-space />

        <q-btn
          v-if="isLoggedIn"
          color="white"
          flat
          label="Logout"
          @click="logoutUser"
        />

        <div class="q-ml-md text-caption">
          Quasar v{{ $q.version }}
        </div>
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- Main Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'

const router = useRouter()

const leftDrawerOpen = ref(false)
const isLoggedIn = ref(true) // temporary: assume user is logged in

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logoutUser() {
  // TODO: remove auth info if using localStorage or cookies
  isLoggedIn.value = false
  router.push('/login')
}

const linksList = [
  {
    title: 'Home',
    caption: 'Back to homepage',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Jobs',
    caption: 'View job listings',
    icon: 'work',
    link: '/jobs'
  },
  {
    title: 'Companies',
    caption: 'Browse companies',
    icon: 'business',
    link: '/companies'
  },
  {
    title: 'Profile',
    caption: 'Your account',
    icon: 'person',
    link: '/profile'
  }
]
</script>

<style scoped>
.q-toolbar-title {
  font-weight: 600;
}
</style>

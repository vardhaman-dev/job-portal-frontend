<template>
  <div class="admin-dashboard">
    <q-layout view="hHh Lpr lFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            Admin Dashboard
          </q-toolbar-title>
          <q-space />
          <q-btn flat round dense icon="logout" @click="handleLogout" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <div class="q-pa-md">
            <div class="text-h4 q-mb-md">Welcome to Admin Dashboard</div>
            <q-separator class="q-mb-lg" />
            
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-card class="stat-card bg-blue-1">
                  <q-card-section>
                    <div class="text-h6">Total Users</div>
                    <div class="text-h3">{{ stats.totalUsers || 0 }}</div>
                  </q-card-section>
                </q-card>
              </div>
              
              <div class="col-12 col-md-4">
                <q-card class="stat-card bg-green-1">
                  <q-card-section>
                    <div class="text-h6">Active Jobs</div>
                    <div class="text-h3">{{ stats.activeJobs || 0 }}</div>
                  </q-card-section>
                </q-card>
              </div>
              
              <div class="col-12 col-md-4">
                <q-card class="stat-card bg-orange-1">
                  <q-card-section>
                    <div class="text-h6">Total Companies</div>
                    <div class="text-h3">{{ stats.totalCompanies || 0 }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import adminService from 'src/services/admin.service';

export default {
  name: 'AdminDashboard',
  
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    
    const stats = ref({
      totalUsers: 0,
      activeJobs: 0,
      totalCompanies: 0
    });
    const loading = ref(true);

    const fetchStats = async () => {
      loading.value = true;
      const result = await adminService.getDashboardStats();
      
      if (result.success) {
        stats.value = result.data;
      } else {
        $q.notify({
          type: 'negative',
          message: result.error || 'Failed to load dashboard stats',
          position: 'top'
        });
      }
      
      loading.value = false;
    };

    const handleLogout = () => {
      adminService.logout();
      router.push('/admin/login');
    };

    // Check if admin is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
      }
    };

    onMounted(() => {
      checkAuth();
      fetchStats();
    });

    return {
      stats,
      loading,
      handleLogout
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
}

.stat-card {
  height: 100%;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}
</style>

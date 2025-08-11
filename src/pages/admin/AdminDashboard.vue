<template>
  <div class="admin-dashboard">
    <q-layout view="hHh Lpr lFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
            class="q-mr-sm"
          />
          <q-toolbar-title>
            Admin Dashboard
          </q-toolbar-title>
          <q-space />
          <q-btn flat round dense icon="logout" @click="handleLogout" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :width="250"
        class="bg-grey-1"
      >
        <q-list>
          <q-item-label header class="text-grey-8">
            Admin Navigation
          </q-item-label>

          <q-item clickable v-ripple to="/admin/dashboard" exact>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/admin/companies">
            <q-item-section avatar>
              <q-icon name="business" />
            </q-item-section>
            <q-item-section>
              Companies
              <q-badge v-if="pendingApprovals > 0" color="red" floating>{{ pendingApprovals }}</q-badge>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item clickable v-ripple @click="handleLogout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <div class="q-pa-md">
            <div class="text-h4 q-mb-md">Welcome to Admin Dashboard</div>
            <q-separator class="q-mb-lg" />

            <!-- Stats Cards -->
            <div class="row q-col-gutter-md q-mb-lg">
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
                    <div class="text-h6">Pending Approvals</div>
                    <div class="text-h3">{{ pendingJobs.length }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Pending Jobs Section -->
            <div class="q-mt-xl">
              <div class="row items-center q-mb-md">
                <div class="text-h5">Pending Job Approvals</div>
                <q-space />
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="refresh"
                  @click="fetchPendingJobs"
                  :loading="loadingPendingJobs"
                >
                  <q-tooltip>Refresh</q-tooltip>
                </q-btn>
              </div>

              <q-separator class="q-mb-md" />

              <q-inner-loading :showing="loadingPendingJobs">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

              <div v-if="!loadingPendingJobs && pendingJobs.length === 0">
                <q-banner rounded class="bg-grey-3 q-mb-md">
                  <template v-slot:avatar>
                    <q-icon name="check_circle" color="positive" />
                  </template>
                  No pending jobs for approval. All caught up!
                </q-banner>
              </div>

              <div v-else class="q-gutter-y-md">
                <q-card v-for="job in pendingJobs" :key="job.id" class="job-card">
                  <q-card-section>
                    <div class="row items-center">
                      <div class="col-12 col-md-8">
                        <div class="text-h6">{{ job.title }}</div>
                        <div class="text-subtitle2 text-grey-8 q-mt-xs">
                          <q-icon name="business" size="16px" class="q-mr-xs" />
                          {{ job.employer?.name || 'N/A' }}
                        </div>
                        <div class="text-caption text-grey-7 q-mt-sm">
                          <q-icon name="schedule" size="14px" class="q-mr-xs" />
                          Submitted: {{ formatDate(job.submitted_at) }}
                        </div>
                      </div>
                      <div class="col-12 col-md-4 text-right q-mt-md q-mt-md-none">
                        <q-btn
                          color="positive"
                          label="Approve"
                          class="q-mr-sm"
                          @click="approveJob(job.id)"
                          :loading="approvingJobId === job.id"
                        />
                        <q-btn
                          color="negative"
                          label="Reject"
                          @click="showRejectDialog(job)"
                          :loading="rejectingJobId === job.id"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>

          <!-- Reject Job Dialog -->
          <q-dialog v-model="rejectDialog.show" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Reject Job Posting</div>
                <div class="text-subtitle2 q-mb-sm">
                  Please provide a reason for rejecting this job posting:
                </div>
                <q-input
                  v-model="rejectDialog.reason"
                  type="textarea"
                  outlined
                  autofocus
                  :rules="[val => !!val || 'Reason is required']"
                  label="Reason for rejection"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn
                  flat
                  label="Submit Rejection"
                  color="negative"
                  @click="rejectJob"
                  :disable="!rejectDialog.reason"
                  :loading="rejectingJobId === rejectDialog.jobId"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { date } from 'quasar';
import { useQuasar } from 'quasar';
import adminService from 'src/services/admin.service';

// Add icons to the Quasar icon set
import '@quasar/extras/material-icons/material-icons.css';

export default {
  name: 'AdminDashboard',

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const leftDrawerOpen = ref(false);
    const stats = ref({
      totalUsers: 0,
      activeJobs: 0,
      totalCompanies: 0,
      unverifiedCompanies: 0
    });

    const loading = ref(true);
    const loadingPendingJobs = ref(false);
    const pendingJobs = ref([]);
    const approvingJobId = ref(null);
    const rejectingJobId = ref(null);
    const pendingApprovals = ref(0);

    const rejectDialog = ref({
      show: false,
      jobId: null,
      reason: ''
    });

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'MMM D, YYYY [at] h:mm A');
    };

    const fetchStats = async () => {
      loading.value = true;
      try {
        const [statsResult, companiesResult] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getUnverifiedCompanies()
        ]);

        if (statsResult.success) {
          stats.value = statsResult.data;
        } else {
          throw new Error(statsResult.error || 'Failed to load dashboard stats');
        }

        if (companiesResult.success) {
          pendingApprovals.value = companiesResult.data.length;
          stats.value.unverifiedCompanies = companiesResult.data.length;
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.message,
          position: 'top'
        });
      } finally {
        loading.value = false;
      }
    };

    const fetchPendingJobs = async () => {
      loadingPendingJobs.value = true;
      try {
        const result = await adminService.getPendingJobs();
        if (result.success) {
          pendingJobs.value = result.data;
        } else {
          throw new Error(result.error || 'Failed to fetch pending jobs');
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.message,
          position: 'top'
        });
      } finally {
        loadingPendingJobs.value = false;
      }
    };

    const approveJob = async (jobId) => {
      approvingJobId.value = jobId;
      try {
        const result = await adminService.approveJob(jobId);
        if (result.success) {
          $q.notify({
            type: 'positive',
            message: 'Job approved successfully',
            position: 'top'
          });
          // Refresh the pending jobs list
          await Promise.all([fetchPendingJobs(), fetchStats()]);
        } else {
          throw new Error(result.error || 'Failed to approve job');
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.message,
          position: 'top'
        });
      } finally {
        approvingJobId.value = null;
      }
    };

    const showRejectDialog = (job) => {
      rejectDialog.value = {
        show: true,
        jobId: job.id,
        reason: ''
      };
    };

    const rejectJob = async () => {
      if (!rejectDialog.value.reason) return;

      rejectingJobId.value = rejectDialog.value.jobId;
      try {
        const result = await adminService.rejectJob(
          rejectDialog.value.jobId,
          rejectDialog.value.reason
        );

        if (result.success) {
          $q.notify({
            type: 'positive',
            message: 'Job rejected successfully',
            position: 'top'
          });
          // Close the dialog and refresh data
          rejectDialog.value.show = false;
          await Promise.all([fetchPendingJobs(), fetchStats()]);
        } else {
          throw new Error(result.error || 'Failed to reject job');
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.message,
          position: 'top'
        });
      } finally {
        rejectingJobId.value = null;
      }
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

    onMounted(async () => {
      checkAuth();
      await Promise.all([fetchStats(), fetchPendingJobs()]);
    });

    return {
      stats,
      loading,
      loadingPendingJobs,
      pendingJobs,
      approvingJobId,
      rejectingJobId,
      rejectDialog,
      leftDrawerOpen,
      pendingApprovals,
      formatDate,
      fetchPendingJobs,
      approveJob,
      showRejectDialog,
      rejectJob,
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

.job-card {
  transition: all 0.2s;
  border-left: 4px solid #ffc107;
}

.job-card:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>

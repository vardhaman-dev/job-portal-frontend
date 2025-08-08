<template>
  <div class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn
            flat
            round
            icon="arrow_back"
            class="q-mr-sm"
            @click="$router.push('/admin/dashboard')"
          />
          <div class="text-h4">Companies Management</div>
        </div>
        <div class="text-subtitle1 text-grey-7">Manage company verifications and admin assignments</div>
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          icon="refresh"
          label="Refresh"
          @click="fetchCompanies"
          :loading="refreshing"
          class="q-mr-sm"
        />
      </div>
    </div>
    <q-separator class="q-mb-lg" />

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <div v-if="!loading">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="unverified" label="Pending Verification" :badge="unverifiedCompanies.length || ''" />
        <q-tab name="verified" label="Verified Companies" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- Pending Verification Tab -->
        <q-tab-panel name="unverified">
          <div v-if="unverifiedCompanies.length === 0" class="text-center q-pa-lg">
            <q-icon name="check_circle" color="positive" size="48px" class="q-mb-sm" />
            <div class="text-h6">No companies pending verification</div>
            <div class="text-grey-7">All companies are verified</div>
          </div>

          <div v-else class="q-gutter-y-md">
            <q-card v-for="company in unverifiedCompanies" :key="company.user_id" class="company-card q-mb-md">
              <q-card-section>
                <div class="row items-start">
                  <div class="col-12 col-md-8">
                    <div class="text-h6">{{ company.company_name || 'Unnamed Company' }}</div>
                    <div class="row q-col-gutter-y-sm q-mt-sm">
                      <div class="col-12 col-sm-6">
                        <div class="text-subtitle2 text-grey-8">
                          <q-icon name="email" size="16px" class="q-mr-xs" />
                          {{ company.user?.email || 'No email' }}
                        </div>
                      </div>
                      <div class="col-12 col-sm-6">
                        <div class="text-subtitle2 text-grey-8">
                          <q-icon name="phone" size="16px" class="q-mr-xs" />
                          {{ company.contact_number || 'No contact number' }}
                        </div>
                        <div v-if="company.assignedAdminId" class="text-subtitle2 text-grey-8 q-mt-xs">
                          <q-icon name="admin_panel_settings" size="16px" class="q-mr-xs" />
                          Assigned to: {{ company.assignedAdminName || `Admin ${company.assignedAdminId}` }}
                        </div>
                        <div v-else class="text-subtitle2 text-warning q-mt-xs">
                          <q-icon name="warning" size="16px" class="q-mr-xs" />
                          No admin assigned
                        </div>
                      </div>
                      <div v-if="company.website" class="col-12 col-sm-6">
                        <div class="text-subtitle2 text-grey-8">
                          <q-icon name="public" size="16px" class="q-mr-xs" />
                          <a :href="company.website" target="_blank" class="text-primary">
                            {{ company.website }}
                          </a>
                        </div>
                      </div>
                      <div v-if="company.location" class="col-12 col-sm-6">
                        <div class="text-subtitle2 text-grey-8">
                          <q-icon name="location_on" size="16px" class="q-mr-xs" />
                          {{ company.location }}
                        </div>
                      </div>
                      <div class="col-12">
                        <q-chip v-if="company.industry" size="sm" color="blue-1" text-color="primary" class="q-mr-sm q-mb-xs">
                          {{ company.industry }}
                        </q-chip>
                        <q-chip v-if="company.linkedinUrl" size="sm" color="blue-1" text-color="primary" class="q-mr-sm q-mb-xs">
                          <a :href="company.linkedinUrl" target="_blank" class="text-primary">
                            <q-icon name="mdi-linkedin" size="16px" class="q-mr-xs" />
                            LinkedIn
                          </a>
                        </q-chip>
                      </div>
                      <div class="col-12">
                        <div class="text-body2 q-mt-sm">
                          {{ company.description || 'No description provided' }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-4 text-right q-mt-md q-mt-md-none">
                    <div class="text-caption text-grey-7 q-mb-sm">
                      <q-icon name="schedule" size="14px" class="q-mr-xs" />
                      Registered: {{ formatDate(company.createdAt) }}
                    </div>
                    <div class="q-gutter-sm">
                      <q-btn-dropdown
                        color="primary"
                        icon="check_circle"
                        label="Approve"
                        :loading="approvingId === company.id"
                        :disable="rejectingId === company.id"
                        class="q-mr-sm"
                      >
                        <q-list>
                          <q-item
                            v-for="admin in availableAdmins"
                            :key="admin.id"
                            clickable
                            v-close-popup
                            @click="approveCompany(company, admin.id)"
                          >
                            <q-item-section>
                              <q-item-label>{{ admin.name || `Admin ${admin.id}` }}</q-item-label>
                              <q-item-label caption>{{ admin.email }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-btn-dropdown>
                      <q-btn
                        color="negative"
                        icon="cancel"
                        label="Reject"
                        outline
                        @click="confirmReject(company)"
                        :loading="rejectingId === company.id"
                        :disable="approvingId === company.id"
                        class="full-width"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>

        <!-- Verified Companies Tab -->
        <q-tab-panel name="verified">
          <div v-if="verifiedCompanies.length === 0" class="text-center q-pa-lg">
            <q-icon name="info" color="info" size="48px" class="q-mb-sm" />
            <div class="text-h6">No verified companies yet</div>
            <div class="text-grey-7">Approved companies will appear here</div>
          </div>

          <q-list v-else bordered separator>
            <q-item v-for="company in verifiedCompanies" :key="company.id" class="q-pa-md">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ company.companyName ? company.companyName.charAt(0).toUpperCase() : 'C' }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ company.companyName || 'Unnamed Company' }}</q-item-label>
                <q-item-label caption>{{ company.email }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge color="positive" label="Verified" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Confirmation Dialogs -->
    <q-dialog v-model="showApproveDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="positive" text-color="white" class="q-mr-sm" />
          <span class="q-ml-sm">Approve {{ selectedCompany?.companyName || 'this company' }}?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup :disable="processingAction" />
          <q-btn 
            flat 
            label="Approve" 
            color="positive" 
            @click="approveCompany" 
            :loading="processingAction"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showRejectDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Reject Company</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input 
            v-model="rejectReason" 
            label="Reason for rejection" 
            type="textarea"
            autofocus 
            :rules="[val => !!val || 'Please provide a reason']"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup :disable="processingAction" />
          <q-btn 
            flat 
            label="Reject" 
            color="negative" 
            @click="rejectCompany" 
            :disable="!rejectReason"
            :loading="processingAction"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import adminService from 'src/services/admin.service';
import { useAdminStore } from 'src/stores/admin';

export default {
  name: 'CompaniesManagement',
  
  setup() {
    const $q = useQuasar();
    const adminStore = useAdminStore();
    const loading = ref(true);
    const refreshing = ref(false);
    const tab = ref('unverified');
    const unverifiedCompanies = ref([]);
    const verifiedCompanies = ref([]);
    const availableAdmins = ref([]);
    const showApproveDialog = ref(false);
    const showRejectDialog = ref(false);
    const currentCompany = ref(null);
    const rejectReason = ref('');
    const approvingId = ref(null);
    const rejectingId = ref(null);
    const rejectError = ref('');
    const currentAdminId = computed(() => adminStore.admin?.id);

    const fetchCompanies = async () => {
      try {
        loading.value = true;
        // Fetch unverified companies
        console.log('Fetching unverified companies...');
        const unverified = await adminService.getUnverifiedCompanies();
        console.log('Unverified companies response:', unverified);
        
        // Transform the data to match our expected format
        unverifiedCompanies.value = (unverified.data || []).map(company => ({
          ...company,
          // Map any necessary fields here if they have different names in the API response
        }));
        
        console.log('Unverified companies after setting:', unverifiedCompanies.value);
        
        // Try to fetch verified companies (but don't fail if this endpoint doesn't exist yet)
        try {
          console.log('Fetching verified companies...');
          const verified = await adminService.getVerifiedCompanies();
          console.log('Verified companies response:', verified);
          verifiedCompanies.value = verified.data || [];
        } catch (error) {
          console.warn('Could not fetch verified companies:', error);
          verifiedCompanies.value = [];
        }
        
        // Try to fetch available admins (but don't fail if this endpoint doesn't exist yet)
        try {
          console.log('Fetching available admins...');
          const admins = await adminService.getAvailableAdmins();
          console.log('Available admins response:', admins);
          availableAdmins.value = admins.data || [];
        } catch (error) {
          console.warn('Could not fetch available admins:', error);
          availableAdmins.value = [];
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        $q.notify({
          type: 'negative',
          message: 'Failed to load companies. Please try again.'
        });
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    const approveCompany = async (company) => {
      if (!company) return;
      
      try {
        const companyId = company.user_id; // This should be the company's user_id
        console.log('Attempting to approve company with ID:', companyId);
        
        approvingId.value = companyId;
        
        // Show confirmation dialog
        const confirm = await $q.dialog({
          title: 'Confirm Approval',
          message: `Are you sure you want to approve ${company.company_name || 'this company'}?`,
          persistent: true,
          ok: {
            label: 'Approve',
            color: 'positive',
            flat: true
          },
          cancel: {
            label: 'Cancel',
            color: 'grey',
            flat: true
          }
        });
        
        if (!confirm) {
          approvingId.value = null;
          return; // User cancelled
        }
        
        // Approve the company
        const approveResult = await adminService.approveCompany(companyId);
        console.log('Approve result:', approveResult);
        
        if (approveResult.success) {
          $q.notify({
            type: 'positive',
            message: approveResult.message || 'Company approved successfully',
            position: 'top',
            timeout: 3000
          });
          
          // Update the UI by removing the company from unverified list
          const index = unverifiedCompanies.value.findIndex(c => c.user_id === companyId);
          if (index !== -1) {
            const approvedCompany = unverifiedCompanies.value.splice(index, 1)[0];
            // Add to verified companies if needed
            verifiedCompanies.value.unshift({
              ...approvedCompany,
              status: 'approved',
              verified_at: new Date().toISOString()
            });
          }
        } else {
          // Handle specific error cases
          let errorMessage = approveResult.error || 'Failed to approve company';
          if (approveResult.status === 404) {
            errorMessage = 'Company not found or already processed';
          } else if (approveResult.status === 403) {
            errorMessage = 'You do not have permission to perform this action';
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error approving company:', error);
        $q.notify({
          type: 'negative',
          message: error.message || 'Failed to approve company',
          position: 'top'
        });
      } finally {
        approvingId.value = null;
      }
    };

    const confirmReject = (company) => {
      currentCompany.value = company;
      rejectReason.value = '';
      showRejectDialog.value = true;
    };

    const rejectCompany = async () => {
      if (!currentCompany.value || !rejectReason.value) return;
      
      try {
        const companyId = currentCompany.value.user_id; // This should be the company's user_id
        console.log('Attempting to reject company with ID:', companyId);
        
        rejectingId.value = companyId;
        
        // Reject the company
        const rejectResult = await adminService.rejectCompany(
          companyId, 
          rejectReason.value
        );
        
        console.log('Reject result:', rejectResult);
        
        if (rejectResult.success) {
          $q.notify({
            type: 'positive',
            message: rejectResult.message || 'Company rejected successfully',
            position: 'top',
            timeout: 3000
          });
          
          // Update the UI by removing the company from unverified list
          const index = unverifiedCompanies.value.findIndex(
            c => c.user_id === companyId
          );
          if (index !== -1) {
            unverifiedCompanies.value.splice(index, 1);
          }
          
          showRejectDialog.value = false;
          rejectReason.value = '';
        } else {
          // Handle specific error cases
          let errorMessage = rejectResult.error || 'Failed to reject company';
          if (rejectResult.status === 404) {
            errorMessage = 'Company not found or already processed';
          } else if (rejectResult.status === 403) {
            errorMessage = 'You do not have permission to perform this action';
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error rejecting company:', error);
        $q.notify({
          type: 'negative',
          message: error.message || 'Failed to reject company',
          position: 'top'
        });
      } finally {
        rejectingId.value = null;
        currentCompany.value = null;
      }
    };

    onMounted(() => {
      fetchCompanies();
    });

    return {
      loading,
      tab,
      unverifiedCompanies,
      verifiedCompanies,
      availableAdmins,
      showApproveDialog,
      showRejectDialog,
      currentCompany,
      rejectReason,
      approvingId,
      rejectingId,
      rejectError,
      currentAdminId,
      formatDate,
      approveCompany,
      confirmReject,
      rejectCompany,
      refreshing,
    };
  }
};
</script>

<style scoped>
.company-card {
  transition: all 0.3s ease;
}

.company-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.q-badge {
  padding: 4px 8px;
  border-radius: 4px;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}

.q-chip {
  cursor: default;
}
</style>
        if (result.success) {
          $q.notify({
            type: 'positive',
            message: 'Company verified successfully',
            position: 'top'
          });
          // Refresh the companies list
          await fetchCompanies();
        } else {
          throw new Error(result.error || 'Failed to verify company');
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.message,
          position: 'top'
        });
      } finally {
        verifyingCompanyId.value = null;
      }
    };

    const viewCompany = (companyId) => {
      // Navigate to company details page
      router.push(`/admin/companies/${companyId}`);
    };

    onMounted(() => {
      fetchCompanies();
    });

    return {
      loading,
      tab,
      verifyingCompanyId,
      unverifiedCompanies,
      verifiedCompanies,
      formatDate,

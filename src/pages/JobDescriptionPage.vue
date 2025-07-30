<template>
  <div class="job-description-page">
    <AppHeader />
    <q-page padding class="bg-grey-1">
      <div class="row justify-center">
        <div class="col-12 col-md-10">
          <div class="row q-col-gutter-xl">
            <!-- Main Content -->
            <div class="col-12 col-md-8">
              <JobHeader :job="job" />
              <JobOverview :job="job" />
              <KeyResponsibilities :job="job" />
              <RequiredSkills />
              <ApplicationProcess />
              <CompanyInfo />
            </div>

            <!-- Sidebar -->
            <div class="col-12 col-md-4">
              <SalaryBenefits :job="job" />
              <ReadyToApply />
            </div>
          </div>
        </div>
      </div>
    </q-page>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import JobHeader from '../components/JobHeader.vue'
import JobOverview from '../components/JobOverview.vue'
import KeyResponsibilities from '../components/KeyResponsibilities.vue'
import SalaryBenefits from '../components/SalaryBenefits.vue'
import ReadyToApply from '../components/ReadyToApply.vue'
import AppHeader from '../components/HeaderPart.vue'
import RequiredSkills from 'src/components/RequiredSkills.vue'
import ApplicationProcess from 'src/components/ApplicationProcess.vue'
import CompanyInfo from 'src/components/CompanyInfo.vue'
import AppFooter from 'src/components/FooterPart.vue'

const job = ref({
  title: 'Senior Frontend Developer',
  company: 'TechCorp Inc.',
  location: 'San Francisco, CA',
  postedDate: 'Jan 25, 2024',
  applyBy: 'Feb 25, 2024',
  remote: true,
  overview: 'We are looking for a Senior Frontend Developer to join our team and help build cutting-edge web applications that serve millions of users worldwide.',
  responsibilities: [
    'Develop and maintain web apps using React, TypeScript, CSS',
    'Collaborate with design and backend teams',
    'Optimize applications for speed and scalability',
    'Mentor junior devs and conduct code reviews',
    'Stay updated with frontend technologies and best practices'
  ],
  salary: '$120k - $150k annually',
  benefits: [
    'Health, dental, and vision insurance',
    'Unlimited PTO',
    '$3,000 annual learning budget',
    'Remote work flexibility',
    'Stock options',
    'Home office stipend'
  ]
})
</script>

<style scoped>
.job-description-page {
  font-family: 'Inter', sans-serif;
  background-color: #f5f7fa;
}

.q-page {
  min-height: 100vh;
}
</style>


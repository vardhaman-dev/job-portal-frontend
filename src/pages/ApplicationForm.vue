<template>
  <div class="application-form-page">
    <AppHeader />

    <q-page class="q-pa-md q-py-lg">
      <div class="q-gutter-lg container">

        <!-- Page Title -->
        <div class="page-header">
          <h5 class="text-h4 q-my-none">Apply for Senior Frontend Developer</h5>
          <p class="text-subtitle1 text-grey-7 q-mt-sm">Please complete all required fields to submit your application.</p>
        </div>

        <!-- Personal Information -->
        <q-card class="card-style">
          <q-card-section class="q-pa-lg">
            <div class="section-title q-mb-lg">
              <q-icon name="person" color="primary" size="24px" class="q-mr-sm" />
              Personal Information
            </div>
            <div class="q-gutter-md row">
              <q-input outlined dense label="First Name *" v-model="form.firstName" class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Last Name *" v-model="form.lastName" class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Email Address *" type="email" v-model="form.email" class="col-12 col-md-6 input-field">
                <template v-slot:prepend><q-icon name="email" color="grey-6" /></template>
              </q-input>
              <q-input outlined dense label="Phone Number *" type="tel" v-model="form.phone" class="col-12 col-md-6 input-field">
                <template v-slot:prepend><q-icon name="phone" color="grey-6" /></template>
              </q-input>
              <q-input outlined dense label="Current Location / City" v-model="form.location" class="col-12 input-field">
                <template v-slot:prepend><q-icon name="location_on" color="grey-6" /></template>
              </q-input>
              <q-input outlined dense label="LinkedIn Profile URL" v-model="form.linkedin" class="col-12 col-md-6 input-field">
                <template v-slot:prepend><q-icon name="link" color="grey-6" /></template>
              </q-input>
              <q-input outlined dense label="Portfolio or Website URL" v-model="form.portfolio" class="col-12 col-md-6 input-field">
                <template v-slot:prepend><q-icon name="language" color="grey-6" /></template>
              </q-input>
            </div>
          </q-card-section>
        </q-card>

        <!-- Education -->
        <q-card class="card-style">
          <q-card-section class="q-pa-lg">
            <div class="section-title q-mb-lg">
              <q-icon name="school" color="primary" size="24px" class="q-mr-sm" />
              Education
            </div>
            <div class="q-gutter-md row">
              <q-select outlined dense label="Highest Qualification *" v-model="form.education.qualification"
                        :options="qualifications" class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Year of Passing *" type="number" v-model="form.education.passingYear"
                       class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Institution Name *" v-model="form.education.institution" class="col-12 input-field" />
              <q-input outlined dense label="CGPA / Percentage" v-model="form.education.cgpa" class="col-12 input-field" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Work Experience -->
        <q-card class="card-style">
          <q-card-section class="q-pa-lg">
            <div class="section-title q-mb-lg">
              <q-icon name="work" color="primary" size="24px" class="q-mr-sm" />
              Work Experience
            </div>
            <div class="q-gutter-md row">
              <q-select outlined dense label="Total Years of Experience *" v-model="form.experience.totalYears"
                        :options="experienceYears" class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Last Job Title" v-model="form.experience.jobTitle" class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Last Company Name" v-model="form.experience.companyName" class="col-12 col-md-6 input-field" />
              <q-input outlined dense type="textarea" label="Responsibilities / Achievements"
                       v-model="form.experience.responsibilities" class="col-12 input-field" />
              <q-select outlined dense label="Notice Period" v-model="form.experience.noticePeriod"
                        :options="noticePeriods" class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Current Salary" type="number" prefix="$"
                       v-model="form.experience.currentSalary" class="col-12 col-md-3 input-field" />
              <q-input outlined dense label="Expected Salary" type="number" prefix="$"
                       v-model="form.experience.expectedSalary" class="col-12 col-md-3 input-field" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Skills & Certifications -->
        <q-card class="card-style">
          <q-card-section class="q-pa-lg">
            <div class="section-title q-mb-lg">
              <q-icon name="workspace_premium" color="primary" size="24px" class="q-mr-sm" />
              Skills & Certifications
            </div>
            <div class="q-gutter-md">
              <q-input outlined dense label="Key Skills (comma separated)" v-model="form.skills"
                       placeholder="E.g. JavaScript, Vue, Node.js" class="input-field" />
              <q-input outlined dense type="textarea" label="Certifications" v-model="form.certifications"
                       placeholder="List your certifications, courses, or qualifications..." class="input-field" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Availability -->
        <q-card class="card-style">
          <q-card-section class="q-pa-lg">
            <div class="section-title q-mb-lg">
              <q-icon name="event" color="primary" size="24px" class="q-mr-sm" />
              Availability
            </div>
            <div class="q-gutter-md row">
              <q-input outlined dense label="Preferred Interview Time Slot" type="datetime-local"
                       v-model="form.availability.interviewTime" class="col-12 col-md-6 input-field" />
              <q-input outlined dense label="Earliest Joining Date" type="date"
                       v-model="form.availability.joiningDate" class="col-12 col-md-6 input-field" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Additional Questions -->
        <q-card class="card-style">
          <q-card-section class="q-pa-lg">
            <div class="section-title q-mb-lg">
              <q-icon name="quiz" color="primary" size="24px" class="q-mr-sm" />
              Additional Questions
            </div>
            <div class="q-gutter-md column">
              <q-input outlined dense type="textarea" label="Why are you interested in this role? *"
                       v-model="form.additional.whyInterested" class="input-field" />
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <div class="text-subtitle1 q-mb-sm">Are you willing to relocate? *</div>
                  <q-option-group v-model="form.additional.relocate" :options="yesNoOptions" type="radio" inline />
                </div>
                <div class="col-12 col-md-6">
                  <div class="text-subtitle1 q-mb-sm">Do you have the legal right to work in this country? *</div>
                  <q-option-group v-model="form.additional.legalRight" :options="yesNoOptions" type="radio" inline />
                </div>
              </div>
              <q-select outlined dense label="How did you hear about this job?"
                        v-model="form.additional.source" :options="sources" class="input-field" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Resume Upload -->
        <q-card class="card-style">
          <q-card-section class="q-pa-lg">
            <div class="section-title q-mb-lg">
              <q-icon name="description" color="primary" size="24px" class="q-mr-sm" />
              Resume & Cover Letter
            </div>
            <div class="q-mb-md">
              <p class="q-mb-xs text-subtitle1">Upload Resume *</p>
              <q-uploader url="" label="Drag and drop your resume or click to browse"
                          accept=".pdf,.doc,.docx" :auto-upload="false" ref="resumeUploader"
                          max-file-size="5242880" :hide-upload-btn="true" class="uploader-style" />
              <small class="text-grey-7">PDF, DOC files only. Max 5MB.</small>
            </div>
            <div>
              <p class="q-mb-xs text-subtitle1">Upload Cover Letter (Optional)</p>
              <q-uploader url="" label="Drag and drop your cover letter or click to browse"
                          accept=".pdf,.doc,.docx" :auto-upload="false" ref="coverUploader"
                          max-file-size="5242880" :hide-upload-btn="true" class="uploader-style" />
            </div>
          </q-card-section>
        </q-card>

        <!-- Submit -->
        <q-btn label="Submit Application" color="primary" @click="submitForm" class="q-mt-lg full-width submit-btn" />
      </div>
    </q-page>
  </div>
</template>

<script>
import AppHeader from '../components/HeaderPart.vue';

export default {
  name: 'ApplicationForm',
  components: { AppHeader },
  props: ['jobId'],
  data() {
    return {
      form: {
        firstName: '', lastName: '', email: '', phone: '', location: '',
        linkedin: '', portfolio: '', skills: '', certifications: '',
        education: { qualification: '', passingYear: '', institution: '', cgpa: '' },
        experience: {
          totalYears: '', jobTitle: '', companyName: '',
          responsibilities: '', noticePeriod: '', currentSalary: '', expectedSalary: ''
        },
        availability: { interviewTime: '', joiningDate: '' },
        additional: { whyInterested: '', relocate: null, legalRight: null, source: '' }
      },
      qualifications: ['High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'Ph.D.'],
      experienceYears: ['Fresher', '1 Year', '2 Years', '3 Years', '4 Years', '5+ Years'],
      noticePeriods: ['Immediate', '15 Days', '1 Month', '2 Months', '3 Months'],
      yesNoOptions: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
      ],
      sources: ['LinkedIn', 'Company Website', 'Job Portal', 'Social Media', 'Referral', 'Other']
    };
  },
  mounted() {
    console.log('Applying for Job ID:', this.jobId);
  },
  methods: {
    submitForm() {
      if (!this.form.firstName || !this.form.lastName || !this.form.email || !this.form.phone) {
        this.$q.notify({ type: 'negative', message: 'Please fill out all required fields.' });
        return;
      }

      const resumeFiles = this.$refs.resumeUploader.getFiles();
      const coverFiles = this.$refs.coverUploader.getFiles();

      console.log('Form Submitted', {
        jobId: this.jobId,
        ...this.form,
        resume: resumeFiles,
        coverLetter: coverFiles
      });

      this.$q.notify({ type: 'positive', message: 'Application submitted successfully!' });
    }
  }
};
</script>

<style scoped>
.application-form-page {
  background-color: #f8fafc;
  min-height: 100vh;
}

.q-page {
  max-width: 1000px;
  margin: auto;
}

.container {
  padding: 24px;
}

.page-header {
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.card-style {
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  transition: all 0.3s ease-in-out;
}

.card-style:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1565c0;
  display: flex;
  align-items: center;
}

.input-field .q-field__control {
  border-radius: 8px;
  background-color: #f9fafb;
  transition: all 0.2s ease-in-out;
}

.input-field .q-field__control:focus-within {
  background-color: #ffffff;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.uploader-style {
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
}

.submit-btn {
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background-color: #1565c0;
  transition: all 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #1e40af;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.text-h4 {
  color: #1565c0;
  font-weight: 700;
}

.text-subtitle1 {
  color: #4b5563;
}

small {
  color: #6b7280;
}
</style>
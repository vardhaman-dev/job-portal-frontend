<template>
  <div class="q-pa-md bg-grey-1 full-height">
    <!-- Header -->
    <q-card class="q-pa-md header-card q-mb-lg">
      <div class="row justify-between items-center">
        <h4 class="q-mt-none q-mb-none text-primary">My Profile</h4>
        <q-btn
          flat
          icon="edit"
          label="Complete Profile"
          class="edit-btn"
          @click="editMode = !editMode"
          aria-label="Toggle edit profile mode"
        />
      </div>
    </q-card>

    <!-- Profile Top Section -->
    <div class="q-mb-lg">
      <!-- Avatar Card -->
      <div class="row justify-center">
        <q-card class="avatar-card q-pa-md" style="width: 420px;">
          <div class="column items-center q-gutter-sm">
            <q-avatar
              size="80px"
              class="bg-primary text-white cursor-pointer"
              @click="triggerFileUpload"
              aria-label="Upload profile photo"
            >
              <template v-if="profile.photo">
                <img :src="profile.photo" alt="Profile photo" />
              </template>
              <template v-else>
                {{ initials }}
              </template>
            </q-avatar>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handlePhotoUpload"
              hidden
              aria-label="Profile photo upload"
            />
            <div class="text-subtitle2 q-mt-sm">{{ fullName }}</div>
            <div class="text-caption text-grey-7">{{ profile.email }}</div>
          </div>

          <div class="q-mt-md full-width">
            <div class="text-caption text-grey-6">Profile Completeness</div>
            <q-linear-progress
              :value="0.85"
              color="primary"
              track-color="grey-3"
              size="10px"
              rounded
              class="q-mt-xs"
            />
            <div class="text-right text-caption q-mt-xs">85%</div>
          </div>
        </q-card>
      </div>

      <!-- Info Card -->
      <q-card class="info-card q-pa-md q-mt-lg">
        <div class="section-title">Profile Information</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div><span class="label">First Name:</span> {{ profile.firstName }}</div>
            <div><span class="label">Email:</span> {{ profile.email }}</div>
            <div><span class="label">Street Address:</span> {{ profile.streetAddress }}</div>
          </div>
          <div class="col-12 col-md-6">
            <div><span class="label">Last Name:</span> {{ profile.lastName }}</div>
            <div><span class="label">Phone Number:</span> {{ profile.phoneNumber }}</div>
            <div><span class="label">City:</span> {{ profile.city }}</div>
          </div>
          <div class="col-12 col-md-6 q-mt-md">
            <div><span class="label">State:</span> {{ profile.state }}</div>
          </div>
          <div class="col-12 col-md-6 q-mt-md">
            <div><span class="label">Zipcode:</span> {{ profile.zipcode }}</div>
          </div>
        </div>
      </q-card>
    </div>

    <!-- Professional Background -->
    <q-card class="info-card q-pa-md q-mb-lg">
      <div class="section-title">Professional Background</div>
      <div class="q-mb-md">
        <div class="label">Professional Summary</div>
        <div class="text-grey-7">{{ profile.summary }}</div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <div class="label">Education</div>
          <div class="text-grey-7">
            {{ profile.education.degree }} – {{ profile.education.institution }}
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="label">Work Experience</div>
          <div class="text-grey-7">
            {{ profile.experience.jobTitle }} at {{ profile.experience.company }}
          </div>
          <div class="text-grey-6 text-caption">
            {{ profile.experience.jobDescription }}
          </div>
        </div>
      </div>
    </q-card>

    <!-- Skills and Resume -->
    <q-card class="info-card q-pa-md q-mb-lg">
      <div class="section-title">Skills & Resume</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <div class="label">Skills</div>
          <q-chip
            v-for="skill in profile.skills"
            :key="skill"
            color="blue-1"
            text-color="primary"
            class="q-mr-sm q-mb-sm"
            dense
          >
            {{ skill }}
          </q-chip>
        </div>
        <div class="col-12 col-md-6">
          <div class="label q-mb-sm">Resume</div>
          <q-img
            v-if="profile.resumeType === 'image'"
            :src="profile.resume"
            contain
            style="max-height: 200px; border-radius: 8px;"
            alt="Resume preview"
          />
          <div v-else class="resume-link row items-center">
            <q-icon name="picture_as_pdf" color="red" size="40px" />
            <a
              :href="profile.resume"
              target="_blank"
              class="text-primary q-ml-sm"
              aria-label="View resume PDF"
            >
              View Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@gmail.com',
  phoneNumber: '123-456-7890',
  streetAddress: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipcode: '10001',
  summary: 'Experienced software developer with expertise in web technologies.',
  education: {
    degree: 'B.Sc. in Computer Science',
    institution: 'XYZ University'
  },
  experience: {
    jobTitle: 'Senior Developer',
    company: 'TechCorp',
    jobDescription: 'Developed and maintained web applications using Vue.js.'
  },
  skills: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Python'],
  resume: 'https://example.com/resume.pdf',
  resumeType: 'pdf',
  photo: null
})

const fullName = computed(() => `${profile.value.firstName} ${profile.value.lastName}`)
const editMode = ref(false)
const fileInput = ref(null)
const initials = computed(() => profile.value.firstName.charAt(0) + profile.value.lastName.charAt(0))

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      profile.value.photo = reader.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.full-height {
  min-height: 100vh;
  padding-bottom: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.label {
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 8px;
  font-size: 14px;
}

.edit-btn {
  border: 1px solid #1976d2;
  color: #1976d2;
  font-weight: 500;
  padding: 6px 20px;
  border-radius: 4px;
  background-color: white;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background-color: #e3f2fd;
  transform: translateY(-2px);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #171b1f;
  margin-bottom: 20px;
  border-bottom: 2px solid #e3f2fd;
  padding-bottom: 8px;
}

.avatar-card,
.info-card,
.header-card {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  transition: transform 0.3s ease;
}

.avatar-card:hover,
.info-card:hover,
.header-card:hover {
  transform: translateY(-4px);
}

.q-card {
  margin-bottom: 24px;
  padding: 20px;
}

.avatar-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  max-width: 600px; /* Increased width from 500px to 600px */
}

.info-card {
  padding: 24px;
  max-width: 100%;
}

.text-grey-7,
.text-grey-6 {
  line-height: 1.6;
}

.q-chip {
  margin: 4px;
  padding: 6px 12px;
  font-size: 13px;
}

.q-col-gutter-md {
  --q-gutter-md: 20px;
}

@media (max-width: 768px) {
  .q-card {
    padding: 12px;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 18px;
    margin-bottom: 16px;
  }

  .label {
    font-size: 13px;
  }

  .edit-btn {
    padding: 4px 16px;
  }

  .avatar-card {
    max-width: 100%; /* Full width on mobile */
  }

  .q-col-gutter-md {
    --q-gutter-md: 10px;
  }
}
</style>
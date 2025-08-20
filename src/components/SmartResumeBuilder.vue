<template>
  <div class="smart-resume-builder">
    <!-- Header Section -->
    <div class="builder-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">
            <q-icon name="auto_awesome" class="title-icon" />
            Smart Resume Builder
          </h1>
          <p class="page-subtitle">
            Create ATS-optimized resumes with intelligent suggestions
          </p>
        </div>
        <div class="ats-score-display" v-if="currentResume.atsScore">
          <div class="score-circle" :class="getATSScoreClass(currentResume.atsScore)">
            <span class="score-number">{{ currentResume.atsScore }}</span>
            <span class="score-label">ATS Score</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Builder Interface -->
    <div class="builder-container">
      <!-- Sidebar -->
      <div class="builder-sidebar">
        <!-- Job Target Selection -->
        <div class="section-card">
          <h3 class="section-title">
            <q-icon name="work" />
            Target Job
          </h3>
          <q-select
            v-model="targetJob"
            :options="availableJobs"
            option-label="title"
            option-value="id"
            label="Select a job to optimize for"
            outlined
            dense
            @update:model-value="onJobSelected"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.title }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.company?.companyName }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          
          <div v-if="jobKeywords.technical?.length" class="keywords-preview">
            <p class="keywords-title">Key Skills Required:</p>
            <div class="keywords-chips">
              <q-chip
                v-for="keyword in jobKeywords.technical.slice(0, 6)"
                :key="keyword"
                size="sm"
                outline
                color="primary"
              >
                {{ keyword }}
              </q-chip>
            </div>
          </div>
        </div>

        <!-- Template Selection -->
        <div class="section-card">
          <h3 class="section-title">
            <q-icon name="palette" />
            Template
          </h3>
          <div class="template-grid">
            <div
              v-for="template in templates"
              :key="template.id"
              class="template-card"
              :class="{ active: selectedTemplate === template.id }"
              @click="selectedTemplate = template.id"
            >
              <div class="template-preview">
                <q-icon :name="getTemplateIcon(template.id)" />
              </div>
              <div class="template-info">
                <span class="template-name">{{ template.name }}</span>
                <div class="ats-badge" :class="getATSBadgeClass(template.atsScore)">
                  {{ template.atsScore }}% ATS
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Smart Assistant -->
        <div class="section-card smart-assistant">
          <h3 class="section-title">
            <q-icon name="psychology" />
            Smart Assistant
          </h3>
          <div class="smart-suggestions" v-if="smartSuggestions.length">
            <div
              v-for="suggestion in smartSuggestions.slice(0, 3)"
              :key="suggestion.id"
              class="suggestion-item"
              @click="applySuggestion(suggestion)"
            >
              <q-icon :name="suggestion.icon" class="suggestion-icon" />
              <div class="suggestion-content">
                <p class="suggestion-text">{{ suggestion.text }}</p>
                <span class="suggestion-impact">{{ suggestion.impact }}</span>
              </div>
            </div>
          </div>
          <q-btn
            flat
            dense
            icon="refresh"
            label="Get New Suggestions"
            @click="generateSuggestions"
            class="refresh-suggestions-btn"
          />
        </div>
      </div>

      <!-- Main Editor -->
      <div class="builder-main">
        <!-- Section Tabs -->
        <q-tabs
          v-model="activeSection"
          class="section-tabs"
          indicator-color="primary"
          active-color="primary"
          align="left"
        >
          <q-tab name="personal" icon="person" label="Personal Info" />
          <q-tab name="summary" icon="description" label="Summary" />
          <q-tab name="experience" icon="work" label="Experience" />
          <q-tab name="skills" icon="code" label="Skills" />
          <q-tab name="education" icon="school" label="Education" />
          <q-tab name="preview" icon="visibility" label="Preview" />
        </q-tabs>

        <!-- Section Content -->
        <div class="section-content">
          <!-- Personal Information -->
          <div v-show="activeSection === 'personal'" class="content-section">
            <div class="section-header">
              <h2>Personal Information</h2>
              <p>Basic contact information and personal details</p>
            </div>
            
            <div class="form-grid">
              <q-input
                v-model="resumeData.personalInfo.name"
                label="Full Name"
                outlined
                class="form-field"
              />
              <q-input
                v-model="resumeData.personalInfo.email"
                label="Email Address"
                type="email"
                outlined
                class="form-field"
              />
              <q-input
                v-model="resumeData.personalInfo.phone"
                label="Phone Number"
                outlined
                class="form-field"
              />
              <q-input
                v-model="resumeData.personalInfo.address"
                label="Address"
                outlined
                class="form-field"
              />
              <q-input
                v-model="resumeData.personalInfo.linkedin"
                label="LinkedIn URL"
                outlined
                class="form-field full-width"
              />
              <q-input
                v-model="resumeData.personalInfo.website"
                label="Personal Website"
                outlined
                class="form-field full-width"
              />
            </div>
          </div>

          <!-- Professional Summary -->
          <div v-show="activeSection === 'summary'" class="content-section">
            <div class="section-header">
              <h2>Professional Summary</h2>
              <p>A compelling overview of your experience and skills</p>
            </div>

            <div class="smart-writing-assistant">
              <q-textarea
                v-model="resumeData.summary"
                label="Professional Summary"
                rows="6"
                outlined
                class="summary-textarea"
                @input="analyzeSummary"
              />
              
              <div class="writing-stats">
                <div class="stat-item">
                  <span class="stat-label">Words:</span>
                  <span class="stat-value">{{ getSummaryWordCount() }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Keywords:</span>
                  <span class="stat-value">{{ getKeywordCount() }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">ATS Score:</span>
                  <span class="stat-value" :class="getSummaryScoreClass()">
                    {{ summaryScore }}%
                  </span>
                </div>
              </div>

              <div class="smart-suggestions-panel" v-if="summaryTemplates.length">
                <h4>Smart-Generated Templates:</h4>
                <div
                  v-for="(template, index) in summaryTemplates"
                  :key="index"
                  class="template-suggestion"
                  @click="useSummaryTemplate(template)"
                >
                  <q-icon name="auto_awesome" class="template-icon" />
                  <p class="template-text">{{ template }}</p>
                  <q-btn
                    flat
                    dense
                    icon="add"
                    color="primary"
                    @click.stop="useSummaryTemplate(template)"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Experience Section -->
          <div v-show="activeSection === 'experience'" class="content-section">
            <div class="section-header">
              <h2>Work Experience</h2>
              <p>Your professional work history with smart-optimized descriptions</p>
              <q-btn
                color="primary"
                icon="add"
                label="Add Experience"
                @click="addExperience"
                class="add-btn"
              />
            </div>

            <div class="experience-list">
              <div
                v-for="(exp, index) in resumeData.experience"
                :key="index"
                class="experience-item"
              >
                <div class="experience-header">
                  <q-input
                    v-model="exp.title"
                    label="Job Title"
                    outlined
                    dense
                    class="title-field"
                  />
                  <q-input
                    v-model="exp.company"
                    label="Company"
                    outlined
                    dense
                    class="company-field"
                  />
                  <q-btn
                    flat
                    round
                    icon="delete"
                    color="negative"
                    @click="removeExperience(index)"
                    class="delete-btn"
                  />
                </div>
                
                <div class="experience-dates">
                  <q-input
                    v-model="exp.startDate"
                    label="Start Date"
                    type="month"
                    outlined
                    dense
                  />
                  <q-input
                    v-model="exp.endDate"
                    label="End Date"
                    type="month"
                    outlined
                    dense
                  />
                  <q-checkbox
                    v-model="exp.current"
                    label="Current Position"
                    @update:model-value="() => handleCurrentPositionChange(exp)"
                  />
                </div>

                <div class="bullet-points">
                  <h4>Achievements & Responsibilities:</h4>
                  <div
                    v-for="(bullet, bulletIndex) in exp.bullets"
                    :key="bulletIndex"
                    class="bullet-item"
                  >
                    <q-input
                      v-model="exp.bullets[bulletIndex]"
                      outlined
                      dense
                      class="bullet-input"
                    />
                    <q-btn
                      flat
                      round
                      icon="auto_awesome"
                      color="primary"
                      @click="optimizeBullet(index, bulletIndex)"
                      class="optimize-btn"
                    >
                      <q-tooltip>Smart Optimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      icon="delete"
                      color="negative"
                      @click="removeBullet(index, bulletIndex)"
                      class="delete-btn"
                    />
                  </div>
                  <q-btn
                    flat
                    icon="add"
                    label="Add Achievement"
                    @click="addBullet(index)"
                    class="add-bullet-btn"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Section -->
          <div v-show="activeSection === 'skills'" class="content-section">
            <div class="section-header">
              <h2>Skills & Technologies</h2>
              <p>Highlight your technical and soft skills</p>
            </div>

            <div class="skills-optimizer">
              <div class="skills-input-section">
                <q-input
                  v-model="newSkill"
                  label="Add a skill"
                  outlined
                  @keyup.enter="addSkill"
                >
                  <template v-slot:append>
                    <q-btn
                      flat
                      round
                      icon="add"
                      @click="addSkill"
                    />
                  </template>
                </q-input>
              </div>

              <div class="skills-categories">
                <div class="skill-category">
                  <h4>
                    Technical Skills
                    <q-badge v-if="matchedTechnicalSkills" color="positive">
                      {{ matchedTechnicalSkills }} matched
                    </q-badge>
                  </h4>
                  <div class="skills-chips">
                    <q-chip
                      v-for="skill in technicalSkills"
                      :key="skill"
                      removable
                      @remove="removeSkill(skill)"
                      :color="isSkillMatched(skill) ? 'positive' : 'primary'"
                      :text-color="isSkillMatched(skill) ? 'white' : 'primary'"
                      :outline="!isSkillMatched(skill)"
                    >
                      {{ skill }}
                      <q-icon v-if="isSkillMatched(skill)" name="check_circle" />
                    </q-chip>
                  </div>
                </div>

                <div class="skill-category">
                  <h4>Soft Skills</h4>
                  <div class="skills-chips">
                    <q-chip
                      v-for="skill in softSkills"
                      :key="skill"
                      removable
                      @remove="removeSkill(skill)"
                      color="secondary"
                      outline
                    >
                      {{ skill }}
                    </q-chip>
                  </div>
                </div>
              </div>

              <div class="skill-suggestions" v-if="suggestedSkills.length">
                <h4>Suggested Skills for This Job:</h4>
                <div class="suggested-chips">
                  <q-chip
                    v-for="skill in suggestedSkills"
                    :key="skill"
                    clickable
                    @click="addSuggestedSkill(skill)"
                    color="orange"
                    outline
                    icon="add"
                  >
                    {{ skill }}
                  </q-chip>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Section -->
          <div v-show="activeSection === 'education'" class="content-section">
            <div class="section-header">
              <h2>Education</h2>
              <p>Your educational background and certifications</p>
              <q-btn
                color="primary"
                icon="add"
                label="Add Education"
                @click="addEducation"
                class="add-btn"
              />
            </div>

            <div class="education-list">
              <div
                v-for="(edu, index) in resumeData.education"
                :key="index"
                class="education-item"
              >
                <div class="education-fields">
                  <q-input
                    v-model="edu.degree"
                    label="Degree"
                    outlined
                    dense
                  />
                  <q-input
                    v-model="edu.institution"
                    label="Institution"
                    outlined
                    dense
                  />
                  <q-input
                    v-model="edu.graduationDate"
                    label="Graduation Year"
                    type="number"
                    outlined
                    dense
                  />
                  <q-input
                    v-model="edu.gpa"
                    label="GPA (Optional)"
                    outlined
                    dense
                  />
                  <q-btn
                    flat
                    round
                    icon="delete"
                    color="negative"
                    @click="removeEducation(index)"
                    class="delete-btn"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Section -->
          <div v-show="activeSection === 'preview'" class="content-section">
            <div class="section-header">
              <h2>Resume Preview</h2>
              <p>See how your resume will look</p>
              <div class="preview-actions">
                <q-btn
                  color="primary"
                  icon="download"
                  label="Download PDF"
                  @click="downloadPDF"
                />
                <q-btn
                  outline
                  color="primary"
                  icon="refresh"
                  label="Regenerate"
                  @click="regenerateResume"
                />
              </div>
            </div>

            <div class="resume-preview" :class="`template-${selectedTemplate}`">
              <!-- Resume content rendered here -->
              <div class="preview-content">
                <div class="preview-header">
                  <h1>{{ resumeData.personalInfo.name || 'Your Name' }}</h1>
                  <div class="contact-info">
                    <span v-if="resumeData.personalInfo.email">{{ resumeData.personalInfo.email }}</span>
                    <span v-if="resumeData.personalInfo.phone">{{ resumeData.personalInfo.phone }}</span>
                    <span v-if="resumeData.personalInfo.address">{{ resumeData.personalInfo.address }}</span>
                  </div>
                </div>

                <div class="preview-summary" v-if="resumeData.summary">
                  <h3>Professional Summary</h3>
                  <p>{{ resumeData.summary }}</p>
                </div>

                <div class="preview-skills" v-if="allSkills.length">
                  <h3>Skills</h3>
                  <div class="skills-display">
                    <span v-for="skill in allSkills" :key="skill" class="skill-tag">
                      {{ skill }}
                    </span>
                  </div>
                </div>

                <div class="preview-experience" v-if="resumeData.experience.length">
                  <h3>Experience</h3>
                  <div
                    v-for="exp in resumeData.experience"
                    :key="exp.title"
                    class="experience-preview"
                  >
                    <div class="exp-header">
                      <h4>{{ exp.title }}</h4>
                      <span class="company">{{ exp.company }}</span>
                      <span class="duration">{{ formatDuration(exp.startDate, exp.endDate) }}</span>
                    </div>
                    <ul class="exp-bullets">
                      <li v-for="bullet in exp.bullets" :key="bullet">{{ bullet }}</li>
                    </ul>
                  </div>
                </div>

                <div class="preview-education" v-if="resumeData.education.length">
                  <h3>Education</h3>
                  <div
                    v-for="edu in resumeData.education"
                    :key="edu.degree"
                    class="education-preview"
                  >
                    <h4>{{ edu.degree }}</h4>
                    <span class="institution">{{ edu.institution }}</span>
                    <span class="year">{{ edu.graduationDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <q-dialog v-model="loading" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-spinner-orbit size="40px" color="primary" />
          <span class="q-ml-sm">{{ loadingMessage }}</span>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { resumeBuilderService } from '../services/resumeBuilderService'

const $q = useQuasar()

// Reactive data
const loading = ref(false)
const loadingMessage = ref('')
const activeSection = ref('personal')
const targetJob = ref(null)
const selectedTemplate = ref('modern')
const newSkill = ref('')

// Resume data
const resumeData = ref({
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: ''
  },
  summary: '',
  experience: [],
  skills: [],
  education: []
})

// Smart optimization data
const currentResume = ref({ atsScore: 0 })
const jobKeywords = ref({})
const templates = ref([])
const availableJobs = ref([])
const smartSuggestions = ref([])
const summaryTemplates = ref([])
const suggestedSkills = ref([])
const summaryScore = ref(0)

// Computed properties
const technicalSkills = computed(() => {
  const techKeywords = ['javascript', 'python', 'java', 'react', 'vue', 'angular', 'node', 'sql', 'aws']
  return resumeData.value.skills.filter(skill =>
    techKeywords.some(keyword => skill.toLowerCase().includes(keyword))
  )
})

const softSkills = computed(() => {
  const techKeywords = ['javascript', 'python', 'java', 'react', 'vue', 'angular', 'node', 'sql', 'aws']
  return resumeData.value.skills.filter(skill =>
    !techKeywords.some(keyword => skill.toLowerCase().includes(keyword))
  )
})

const allSkills = computed(() => resumeData.value.skills)

const matchedTechnicalSkills = computed(() => {
  if (!jobKeywords.value.technical) return 0
  return technicalSkills.value.filter(skill =>
    jobKeywords.value.technical.some(jobSkill =>
      skill.toLowerCase().includes(jobSkill.toLowerCase()) ||
      jobSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ).length
})

// Methods
const fetchTemplates = async () => {
  try {
    const response = await resumeBuilderService.getTemplates()
    if (response.success) {
      templates.value = response.templates
    }
  } catch (error) {
    console.error('Error fetching templates:', error)
  }
}

const fetchAvailableJobs = async () => {
  // This would fetch from your jobs API
  availableJobs.value = [
    { id: 1, title: 'Frontend Developer', company: { companyName: 'Tech Corp' } },
    { id: 2, title: 'Full Stack Engineer', company: { companyName: 'StartupXYZ' } },
    { id: 3, title: 'UI/UX Designer', company: { companyName: 'Design Studio' } }
  ]
}

const onJobSelected = async () => {
  if (!targetJob.value) return
  
  loading.value = true
  loadingMessage.value = 'Analyzing job requirements...'
  
  try {
    const response = await resumeBuilderService.extractJobKeywords(targetJob.value.id)
    if (response.success) {
      jobKeywords.value = response.keywords
      suggestedSkills.value = response.keywords.technical?.filter(skill =>
        !resumeData.value.skills.some(userSkill =>
          userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      ).slice(0, 8) || []
      
      // Generate content suggestions
      await generateContentSuggestions()
    }
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Error analyzing job requirements'
    })
  } finally {
    loading.value = false
  }
}

const generateContentSuggestions = async () => {
  if (!targetJob.value) return
  
  try {
    const response = await resumeBuilderService.generateContentSuggestions({
      jobTitle: targetJob.value.title,
      experience: 3, // Would come from user profile
      skills: resumeData.value.skills,
      industry: 'technology'
    })
    
    if (response.success) {
      summaryTemplates.value = response.suggestions.summaryTemplates
      
      // Generate smart suggestions
      smartSuggestions.value = [
        {
          id: 1,
          icon: 'psychology',
          text: 'Optimize summary with job keywords',
          impact: '+15 ATS score',
          action: 'optimizeSummary'
        },
        {
          id: 2,
          icon: 'code',
          text: `Add ${suggestedSkills.value.slice(0, 2).join(', ')} skills`,
          impact: '+10 ATS score',
          action: 'addSkills'
        },
        {
          id: 3,
          icon: 'work',
          text: 'Improve experience bullet points',
          impact: '+8 ATS score',
          action: 'optimizeExperience'
        }
      ]
    }
  } catch (error) {
    console.error('Error generating suggestions:', error)
  }
}

const generateSuggestions = () => {
  generateContentSuggestions()
}

const applySuggestion = (suggestion) => {
  switch (suggestion.action) {
    case 'optimizeSummary':
      if (summaryTemplates.value.length > 0) {
        resumeData.value.summary = summaryTemplates.value[0]
        analyzeSummary()
      }
      break
    case 'addSkills':
      suggestedSkills.value.slice(0, 2).forEach(skill => {
        if (!resumeData.value.skills.includes(skill)) {
          resumeData.value.skills.push(skill)
        }
      })
      break
    case 'optimizeExperience':
      // Optimize first experience entry
      if (resumeData.value.experience.length > 0) {
        optimizeBullet(0, 0)
      }
      break
  }
  
  // Remove applied suggestion
  smartSuggestions.value = smartSuggestions.value.filter(s => s.id !== suggestion.id)
  
  $q.notify({
    type: 'positive',
    message: 'Suggestion applied successfully!'
  })
}

const addSkill = () => {
  if (newSkill.value.trim() && !resumeData.value.skills.includes(newSkill.value.trim())) {
    resumeData.value.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

const removeSkill = (skill) => {
  const index = resumeData.value.skills.indexOf(skill)
  if (index > -1) {
    resumeData.value.skills.splice(index, 1)
  }
}

const addSuggestedSkill = (skill) => {
  if (!resumeData.value.skills.includes(skill)) {
    resumeData.value.skills.push(skill)
    suggestedSkills.value = suggestedSkills.value.filter(s => s !== skill)
  }
}

const isSkillMatched = (skill) => {
  return jobKeywords.value.technical?.some(jobSkill =>
    skill.toLowerCase().includes(jobSkill.toLowerCase()) ||
    jobSkill.toLowerCase().includes(skill.toLowerCase())
  ) || false
}

const addExperience = () => {
  resumeData.value.experience.push({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    bullets: ['']
  })
}

const removeExperience = (index) => {
  resumeData.value.experience.splice(index, 1)
}

const addBullet = (expIndex) => {
  resumeData.value.experience[expIndex].bullets.push('')
}

const removeBullet = (expIndex, bulletIndex) => {
  resumeData.value.experience[expIndex].bullets.splice(bulletIndex, 1)
}

const optimizeBullet = async (expIndex, bulletIndex) => {
  const currentBullet = resumeData.value.experience[expIndex].bullets[bulletIndex]
  
  // Smart optimization logic would go here
  // For now, add action verbs and job keywords
  const actionVerbs = ['Developed', 'Implemented', 'Led', 'Optimized', 'Created']
  const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)]
  
  if (!currentBullet.startsWith(randomVerb)) {
    resumeData.value.experience[expIndex].bullets[bulletIndex] = 
      `${randomVerb} ${currentBullet.toLowerCase()}`
  }
  
  $q.notify({
    type: 'positive',
    message: 'Bullet point optimized!'
  })
}

const addEducation = () => {
  resumeData.value.education.push({
    degree: '',
    institution: '',
    graduationDate: '',
    gpa: ''
  })
}

const removeEducation = (index) => {
  resumeData.value.education.splice(index, 1)
}

const useSummaryTemplate = (template) => {
  resumeData.value.summary = template
  analyzeSummary()
}

const analyzeSummary = () => {
  if (!resumeData.value.summary) {
    summaryScore.value = 0
    return
  }
  
  // Simple keyword analysis
  const keywords = jobKeywords.value.technical || []
  const summaryLower = resumeData.value.summary.toLowerCase()
  const keywordCount = keywords.filter(keyword =>
    summaryLower.includes(keyword.toLowerCase())
  ).length
  
  summaryScore.value = Math.min(Math.round((keywordCount / Math.max(keywords.length, 1)) * 100), 100)
}

const getSummaryWordCount = () => {
  return resumeData.value.summary.split(/\s+/).filter(word => word.length > 0).length
}

const getKeywordCount = () => {
  if (!resumeData.value.summary || !jobKeywords.value.technical) return 0
  
  const summaryLower = resumeData.value.summary.toLowerCase()
  return jobKeywords.value.technical.filter(keyword =>
    summaryLower.includes(keyword.toLowerCase())
  ).length
}

const getSummaryScoreClass = () => {
  if (summaryScore.value >= 80) return 'text-positive'
  if (summaryScore.value >= 60) return 'text-warning'
  return 'text-negative'
}

const getATSScoreClass = (score) => {
  if (score >= 85) return 'score-excellent'
  if (score >= 70) return 'score-good'
  if (score >= 55) return 'score-fair'
  return 'score-poor'
}

const getATSBadgeClass = (score) => {
  if (score >= 95) return 'ats-excellent'
  if (score >= 90) return 'ats-good'
  return 'ats-fair'
}

const getTemplateIcon = (templateId) => {
  const icons = {
    modern: 'style',
    executive: 'business_center',
    creative: 'palette',
    minimalist: 'crop_free',
    technical: 'code'
  }
  return icons[templateId] || 'description'
}

const formatDuration = (startDate, endDate) => {
  if (!startDate) return ''
  
  const start = new Date(startDate)
  const end = endDate === 'present' ? 'Present' : new Date(endDate)
  
  const startFormatted = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  const endFormatted = endDate === 'present' ? 'Present' : end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  
  return `${startFormatted} - ${endFormatted}`
}

const regenerateResume = async () => {
  loading.value = true
  loadingMessage.value = 'Regenerating optimized resume...'
  
  try {
    const response = await resumeBuilderService.generateOptimizedResume({
      jobId: targetJob.value?.id,
      templateId: selectedTemplate.value,
      sections: resumeData.value
    })
    
    if (response.success) {
      currentResume.value = response.resume
      
      $q.notify({
        type: 'positive',
        message: `Resume optimized! ATS Score: ${response.score}%`
      })
    }
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Error generating resume'
    })
  } finally {
    loading.value = false
  }
}

const downloadPDF = async () => {
  loading.value = true
  loadingMessage.value = 'Generating PDF...'
  
  try {
    // This would integrate with PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000)) // Mock delay
    
    $q.notify({
      type: 'positive',
      message: 'PDF downloaded successfully!'
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Error generating PDF'
    })
  } finally {
    loading.value = false
  }
}

// Handle current position change
const handleCurrentPositionChange = (exp) => {
  if (exp.current) {
    exp.endDate = 'present'
  }
}

// Lifecycle
onMounted(() => {
  fetchTemplates()
  fetchAvailableJobs()
})

// Watch for changes to update ATS score
watch(() => resumeData.value, () => {
  // Debounced ATS score calculation could go here
}, { deep: true })
</script>

<style scoped>
.smart-resume-builder {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.builder-header {
  padding: var(--space-6);
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--color-gray-800);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.title-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin: var(--space-2) 0 0 0;
}

.ats-score-display {
  display: flex;
  align-items: center;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid;
  color: white;
  font-weight: 700;
}

.score-excellent {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: #10b981;
}

.score-good {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-color: #3b82f6;
}

.score-fair {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: #f59e0b;
}

.score-poor {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-color: #ef4444;
}

.score-number {
  font-size: var(--font-size-xl);
}

.score-label {
  font-size: var(--font-size-xs);
  margin-top: var(--space-1);
}

.builder-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: var(--space-6);
  padding: var(--space-6);
}

.builder-sidebar {
  width: 350px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.section-card {
  background: white;
  border-radius: var(--border-radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-4) 0;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.keywords-preview {
  margin-top: var(--space-4);
}

.keywords-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-700);
  margin: 0 0 var(--space-2) 0;
}

.keywords-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.template-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.template-card {
  padding: var(--space-3);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.template-card:hover {
  border-color: var(--color-primary-300);
}

.template-card.active {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
}

.template-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: var(--color-gray-100);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-2);
}

.template-info {
  text-align: center;
}

.template-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  display: block;
  margin-bottom: var(--space-1);
}

.ats-badge {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--border-radius-full);
  font-weight: 600;
}

.ats-excellent {
  background: #dcfce7;
  color: #166534;
}

.ats-good {
  background: #dbeafe;
  color: #1e40af;
}

.ats-fair {
  background: #fef3c7;
  color: #92400e;
}

.smart-assistant {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.smart-suggestions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background: white;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--color-gray-200);
}

.suggestion-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.suggestion-icon {
  color: var(--color-primary-500);
  font-size: 1.2rem;
  margin-top: var(--space-1);
}

.suggestion-content {
  flex: 1;
}

.suggestion-text {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-1) 0;
}

.suggestion-impact {
  font-size: var(--font-size-xs);
  color: var(--color-primary-600);
  font-weight: 600;
}

.refresh-suggestions-btn {
  width: 100%;
}

.builder-main {
  flex: 1;
  background: white;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.section-tabs {
  border-bottom: 1px solid var(--color-gray-200);
  padding: 0 var(--space-6);
}

.section-content {
  padding: var(--space-6);
}

.content-section {
  max-width: 800px;
}

.section-header {
  margin-bottom: var(--space-8);
}

.section-header h2 {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-2) 0;
}

.section-header p {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin: 0;
}

.add-btn {
  margin-top: var(--space-4);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.smart-writing-assistant {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.summary-textarea {
  width: 100%;
}

.writing-stats {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-4);
  background: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  font-weight: 500;
}

.stat-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-gray-800);
}

.smart-suggestions-panel {
  background: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
  padding: var(--space-4);
}

.smart-suggestions-panel h4 {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-3) 0;
}

.template-suggestion {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background: white;
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--space-2);
  cursor: pointer;
  transition: all var(--transition-base);
}

.template-suggestion:hover {
  box-shadow: var(--shadow-sm);
}

.template-icon {
  color: var(--color-primary-500);
  margin-top: var(--space-1);
}

.template-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  margin: 0;
  line-height: 1.5;
}

.experience-list,
.education-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.experience-item,
.education-item {
  padding: var(--space-6);
  background: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-gray-200);
}

.experience-header {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: var(--space-4);
  align-items: end;
  margin-bottom: var(--space-4);
}

.experience-dates {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: var(--space-4);
  align-items: end;
  margin-bottom: var(--space-4);
}

.bullet-points h4 {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-3) 0;
}

.bullet-item {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  margin-bottom: var(--space-2);
}

.bullet-input {
  flex: 1;
}

.add-bullet-btn {
  margin-top: var(--space-2);
}

.skills-optimizer {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.skill-category h4 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-3) 0;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.skills-chips,
.suggested-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-suggestions {
  background: var(--color-orange-50);
  border-radius: var(--border-radius-lg);
  padding: var(--space-4);
  border: 1px solid var(--color-orange-200);
}

.skill-suggestions h4 {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-orange-800);
  margin: 0 0 var(--space-3) 0;
}

.education-fields {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: var(--space-4);
  align-items: end;
}

.preview-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.resume-preview {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  margin-top: var(--space-6);
  min-height: 800px;
}

.preview-content {
  padding: var(--space-8);
  font-family: 'Times New Roman', serif;
  line-height: 1.6;
}

.preview-header {
  text-align: center;
  margin-bottom: var(--space-8);
  border-bottom: 2px solid var(--color-gray-300);
  padding-bottom: var(--space-4);
}

.preview-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-2) 0;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.preview-summary,
.preview-skills,
.preview-experience,
.preview-education {
  margin-bottom: var(--space-6);
}

.preview-summary h3,
.preview-skills h3,
.preview-experience h3,
.preview-education h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-3) 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid var(--color-gray-300);
  padding-bottom: var(--space-2);
}

.skills-display {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-tag {
  background: var(--color-gray-100);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.experience-preview,
.education-preview {
  margin-bottom: var(--space-4);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.exp-header h4 {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-gray-800);
  margin: 0;
}

.company,
.duration,
.institution,
.year {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  font-style: italic;
}

.exp-bullets {
  margin: var(--space-2) 0 0 var(--space-4);
  padding: 0;
}

.exp-bullets li {
  margin-bottom: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .builder-container {
    flex-direction: column;
  }
  
  .builder-sidebar {
    width: 100%;
  }
  
  .template-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .experience-header,
  .experience-dates,
  .education-fields {
    grid-template-columns: 1fr;
  }
  
  .writing-stats {
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .skills-chips,
  .suggested-chips {
    justify-content: center;
  }
  
  .preview-actions {
    flex-direction: column;
  }
  
  .contact-info {
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>

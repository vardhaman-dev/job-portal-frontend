import axios from 'axios'

class ResumeBuilderService {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/resume-builder'
  }

  /**
   * Generate ATS-optimized resume
   * @param {Object} params - Resume generation parameters
   * @param {number} params.jobId - Target job ID for optimization
   * @param {string} params.templateId - Resume template to use
   * @param {Object} params.sections - Custom sections data
   * @returns {Promise<Object>} API response with optimized resume
   */
  async generateOptimizedResume({ jobId, templateId = 'modern', sections = {} } = {}) {
    try {
      const response = await axios.post(`${this.baseURL}/generate`, {
        jobId,
        templateId,
        sections
      })
      return response.data
    } catch (error) {
      console.error('Error generating optimized resume:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Analyze resume for ATS compatibility
   * @param {string} resumeText - Resume content to analyze
   * @param {number} jobId - Optional job ID for targeted analysis
   * @returns {Promise<Object>} API response with analysis results
   */
  async analyzeResumeATS(resumeText, jobId = null) {
    try {
      const response = await axios.post(`${this.baseURL}/analyze`, {
        resumeText,
        jobId
      })
      return response.data
    } catch (error) {
      console.error('Error analyzing resume:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Extract keywords from job posting
   * @param {number} jobId - Job ID to extract keywords from
   * @returns {Promise<Object>} API response with extracted keywords
   */
  async extractJobKeywords(jobId) {
    try {
      const response = await axios.get(`${this.baseURL}/keywords/${jobId}`)
      return response.data
    } catch (error) {
      console.error('Error extracting job keywords:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Generate intelligent content suggestions
   * @param {Object} params - Content generation parameters
   * @param {string} params.jobTitle - Target job title
   * @param {number} params.experience - Years of experience
   * @param {Array<string>} params.skills - User's skills
   * @param {string} params.industry - Target industry
   * @returns {Promise<Object>} API response with content suggestions
   */
  async generateContentSuggestions({ jobTitle, experience, skills = [], industry } = {}) {
    try {
      const response = await axios.post(`${this.baseURL}/suggestions`, {
        jobTitle,
        experience,
        skills,
        industry
      })
      return response.data
    } catch (error) {
      console.error('Error generating content suggestions:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Get available resume templates
   * @returns {Promise<Object>} API response with template list
   */
  async getTemplates() {
    try {
      const response = await axios.get(`${this.baseURL}/templates`)
      return response.data
    } catch (error) {
      console.error('Error fetching templates:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Generate resume PDF
   * @param {Object} resumeData - Resume data to convert to PDF
   * @param {string} templateId - Template to use for PDF generation
   * @returns {Promise<Blob>} PDF blob
   */
  async generateResumePDF(resumeData, templateId = 'modern') {
    try {
      // This would integrate with a PDF generation service
      // For now, return a mock implementation
      const response = await axios.post(`${this.baseURL}/generate-pdf`, {
        resumeData,
        templateId
      }, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Save resume draft
   * @param {Object} resumeData - Resume data to save
   * @returns {Promise<Object>} API response
   */
  async saveResumeDraft(resumeData) {
    try {
      // This would save to user's drafts
      const response = await axios.post(`${this.baseURL}/save-draft`, resumeData)
      return response.data
    } catch (error) {
      console.error('Error saving resume draft:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Get user's resume drafts
   * @returns {Promise<Object>} API response with user's saved resumes
   */
  async getResumeDrafts() {
    try {
      const response = await axios.get(`${this.baseURL}/drafts`)
      return response.data
    } catch (error) {
      console.error('Error fetching resume drafts:', error)
      throw this.handleError(error)
    }
  }

  /**
   * AI-powered bullet point optimization
   * @param {string} bulletPoint - Original bullet point
   * @param {string} jobTitle - Target job title
   * @returns {Promise<Object>} API response with optimized bullet point
   */
  async optimizeBulletPoint(bulletPoint, jobTitle) {
    try {
      const response = await axios.post(`${this.baseURL}/optimize/bullet`, {
        bulletPoint,
        jobTitle
      })
      return response.data
    } catch (error) {
      console.error('Error optimizing bullet point:', error)
      throw this.handleError(error)
    }
  }

  /**
   * AI-powered summary optimization
   * @param {string} currentSummary - Original summary
   * @param {string} jobTitle - Target job title
   * @param {Array<string>} skills - User skills
   * @param {number} experience - Years of experience
   * @param {Object} jobDetails - Specific job details for targeting
   * @returns {Promise<Object>} API response with optimized summary
   */
  async optimizeSummary(currentSummary, jobTitle, skills = [], experience = 0, jobDetails = null) {
    try {
      console.log('Optimizing summary with AI:', { currentSummary, jobTitle, skills, experience, jobDetails })
      const response = await axios.post(`${this.baseURL}/optimize/summary`, {
        currentSummary,
        jobTitle,
        skills,
        experience,
        jobDetails
      })
      return response.data
    } catch (error) {
      console.error('Error optimizing summary:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Get AI skill suggestions
   * @param {string} jobTitle - Target job title
   * @param {Array<string>} currentSkills - Current user skills
   * @returns {Promise<Object>} API response with skill suggestions
   */
  async getSkillSuggestions(jobTitle, currentSkills = []) {
    try {
      const response = await axios.post(`${this.baseURL}/ai/skills`, {
        jobTitle,
        currentSkills
      })
      return response.data
    } catch (error) {
      console.error('Error getting skill suggestions:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Generate AI cover letter
   * @param {Object} params - Cover letter parameters
   * @param {string} params.jobTitle - Target job title
   * @param {string} params.company - Target company
   * @param {Object} params.resumeData - User's resume data
   * @returns {Promise<Object>} API response with cover letter
   */
  async generateCoverLetter({ jobTitle, company, resumeData }) {
    try {
      const response = await axios.post(`${this.baseURL}/generate/cover-letter`, {
        jobTitle,
        company,
        resumeData
      })
      return response.data
    } catch (error) {
      console.error('Error generating cover letter:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Search jobs with intelligent matching
   * @param {Object} params - Search parameters
   * @param {string} params.query - Search query
   * @param {number} params.limit - Number of results
   * @returns {Promise<Object>} API response with job search results
   */
  async searchJobs({ query, limit = 20 }) {
    try {
      const response = await axios.post(`${this.baseURL}/jobs/search`, {
        query,
        limit
      })
      return response.data
    } catch (error) {
      console.error('Error searching jobs:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Get available jobs for optimization
   * @param {Object} params - Parameters
   * @param {number} params.limit - Number of jobs to fetch
   * @returns {Promise<Object>} API response with available jobs
   */
  async getAvailableJobs({ limit = 100 } = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/jobs/available?limit=${limit}`)
      return response.data
    } catch (error) {
      console.error('Error fetching available jobs:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Calculate ATS score for resume content
   * @param {Object} resumeContent - Resume content to score
   * @param {number} jobId - Optional job ID for targeted scoring
   * @returns {Promise<Object>} API response with ATS score
   */
  async calculateATSScore(resumeContent, jobId = null) {
    try {
      const response = await axios.post(`${this.baseURL}/ats-score`, {
        resumeContent,
        jobId
      })
      return response.data
    } catch (error) {
      console.error('Error calculating ATS score:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Get resume optimization suggestions
   * @param {Object} resumeData - Current resume data
   * @param {number} jobId - Target job ID
   * @returns {Promise<Object>} API response with optimization suggestions
   */
  async getOptimizationSuggestions(resumeData, jobId) {
    try {
      const response = await axios.post(`${this.baseURL}/optimize`, {
        resumeData,
        jobId
      })
      return response.data
    } catch (error) {
      console.error('Error getting optimization suggestions:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Handle API errors consistently
   * @param {Error} error - The error object from axios
   * @returns {Object} Formatted error object
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      }
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        status: 0
      }
    } else {
      // Something else happened
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        status: 0
      }
    }
  }

  /**
   * Utility method to format resume for display
   * @param {Object} resumeData - Raw resume data
   * @returns {Object} Formatted resume data
   */
  formatResumeForDisplay(resumeData) {
    return {
      ...resumeData,
      formattedExperience: resumeData.experience?.map(exp => ({
        ...exp,
        duration: this.formatDuration(exp.startDate, exp.endDate),
        bullets: Array.isArray(exp.bullets) ? exp.bullets : []
      })) || [],
      formattedEducation: resumeData.education?.map(edu => ({
        ...edu,
        year: this.formatEducationYear(edu.graduationDate)
      })) || [],
      formattedSkills: this.categorizeSkills(resumeData.skills || [])
    }
  }

  /**
   * Format date duration
   * @param {string} startDate - Start date
   * @param {string} endDate - End date (or 'present')
   * @returns {string} Formatted duration
   */
  formatDuration(startDate, endDate) {
    if (!startDate) return ''
    
    const start = new Date(startDate)
    const end = endDate === 'present' ? 'Present' : new Date(endDate)
    
    const startFormatted = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    const endFormatted = endDate === 'present' ? 'Present' : end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    return `${startFormatted} - ${endFormatted}`
  }

  /**
   * Format education year
   * @param {string} graduationDate - Graduation date
   * @returns {string} Formatted year
   */
  formatEducationYear(graduationDate) {
    if (!graduationDate) return ''
    return new Date(graduationDate).getFullYear().toString()
  }

  /**
   * Categorize skills into technical and soft skills
   * @param {Array<string>} skills - Array of skills
   * @returns {Object} Categorized skills
   */
  categorizeSkills(skills) {
    const technicalKeywords = [
      'javascript', 'python', 'java', 'react', 'vue', 'angular', 'node',
      'sql', 'mongodb', 'aws', 'docker', 'git', 'html', 'css', 'typescript'
    ]
    
    const technical = []
    const soft = []
    
    skills.forEach(skill => {
      const skillLower = skill.toLowerCase()
      if (technicalKeywords.some(keyword => skillLower.includes(keyword))) {
        technical.push(skill)
      } else {
        soft.push(skill)
      }
    })
    
    return { technical, soft }
  }
}

export const resumeBuilderService = new ResumeBuilderService()
export default resumeBuilderService

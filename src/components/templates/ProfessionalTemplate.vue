<template>
  <div class="resume">
    <!-- Header -->
    <div class="header">
      <h1 class="name">{{ resumeData.name }}</h1>
      <h2 class="title">{{ resumeData.title }}</h2>
      <p class="contact">
        {{ resumeData.phone }} | {{ resumeData.email }} |
        <a v-if="resumeData.website" :href="resumeData.website" target="_blank" class="website">{{ resumeData.website }}</a>
      </p>
    </div>

    <!-- Summary -->
    <section v-if="resumeData.profile" class="section">
      <h3 class="section-title">SUMMARY</h3>
      <p class="summary">{{ resumeData.profile }}</p>
    </section>

    <!-- Technical Skills -->
    <section v-if="resumeData.skills?.length" class="section">
      <h3 class="section-title">TECHNICAL SKILLS</h3>
      <div class="skills-grid">
        <span v-for="(skill, i) in resumeData.skills" :key="i" class="skill">{{ skill.name }}</span>
      </div>
    </section>

    <!-- Experience -->
    <section v-if="resumeData.experience?.length" class="section">
      <h3 class="section-title">PROFESSIONAL EXPERIENCE</h3>
      <div v-for="(exp, i) in resumeData.experience" :key="'exp-' + i" class="entry">
        <div class="entry-header">
          <strong class="entry-title">{{ exp.company }}</strong>
          <span class="entry-dates">{{ exp.years }}</span>
        </div>
        <ul v-if="exp.description" class="description">
          <li v-for="(point, j) in exp.description.split('\n')" :key="j">{{ point }}</li>
        </ul>
      </div>
    </section>

    <!-- Education -->
    <section v-if="resumeData.education?.length" class="section">
      <h3 class="section-title">EDUCATION</h3>
      <div v-for="(edu, i) in resumeData.education" :key="'edu-' + i" class="entry">
        <div class="entry-header">
          <strong class="entry-title">{{ edu.degree }}</strong>
          <span class="entry-dates">{{ edu.year }}</span>
        </div>
        <p class="institution">{{ edu.institution }}</p>
        <p v-if="edu.description" class="description">{{ edu.description }}</p>
      </div>
    </section>

    <!-- Additional Info -->
    <section class="section">
      <h3 class="section-title">ADDITIONAL INFORMATION</h3>
      <p v-if="resumeData.languages?.length" class="info-item">
        <strong>Languages:</strong> {{ resumeData.languages.map(lang => lang.name).join(', ') }}
      </p>
      <p v-if="resumeData.certifications?.length" class="info-item">
        <strong>Certifications:</strong> {{ resumeData.certifications.join(', ') }}
      </p>
      <p v-if="resumeData.awards?.length" class="info-item">
        <strong>Awards/Activities:</strong> {{ resumeData.awards.join(', ') }}
      </p>
    </section>
  </div>
</template>

<script setup>
defineProps({ resumeData: Object });
</script>

<style scoped>
.resume {
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  padding: 40px 20px;
  background: #fff;
  font-size: 14px;
  line-height: 1.5;
}

.header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.name {
  color: #1f4e8c;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 0 8px;
}

.contact {
  font-size: 13px;
  color: #444;
  margin: 0;
}

.website {
  color: #1f4e8c;
  text-decoration: none;
}

.website:hover {
  text-decoration: underline;
}

.section {
  margin-bottom: 24px;
}

.section-title {
  color: #1f4e8c;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  border-top: 2px solid #1f4e8c;
  padding-top: 8px;
  margin: 0 0 12px;
}

.summary {
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px 16px;
  padding: 8px 0;
}

.skill {
  font-size: 13px;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.entry {
  margin-bottom: 16px;
}

.entry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.entry-title {
  font-size: 14px;
  font-weight: 600;
}

.entry-dates {
  font-size: 13px;
  color: #666;
  font-weight: normal;
}

.institution {
  font-size: 13px;
  font-weight: 500;
  margin: 0;
}

.description {
  font-size: 13px;
  margin: 4px 0 0;
  padding-left: 16px;
}

.description li {
  margin-bottom: 4px;
  list-style-type: disc;
}

.info-item {
  font-size: 13px;
  margin: 4px 0;
}

@media (max-width: 600px) {
  .resume {
    padding: 20px;
    font-size: 13px;
  }

  .name {
    font-size: 24px;
  }

  .title {
    font-size: 14px;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media print {
  .resume {
    padding: 0;
    font-size: 12pt;
  }

  .section-title {
    border-top: 1px solid #000;
  }

  .website {
    text-decoration: none;
  }
}
</style>
<template>
  <div class="modern-template">
    <header class="header">
      <h1 class="name">{{ resumeData.name }}</h1>
      <p class="contact">
        {{ resumeData.email }} | {{ resumeData.phone }} | {{ resumeData.address }}
      </p>
    </header>

    <hr class="divider" />

    <section class="section">
      <h2 class="section-title">Education</h2>
      <div v-for="(edu, index) in resumeData.education" :key="'edu-' + index" class="entry">
        <p class="entry-title">
          <strong>{{ edu.institution }}</strong> — {{ edu.degree }} ({{ edu.year }})
        </p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Experience</h2>
      <div v-for="(exp, index) in resumeData.experience" :key="'exp-' + index" class="entry">
        <p class="entry-title">
          <strong>{{ exp.company }}</strong> — {{ exp.role }} ({{ exp.years }})
        </p>
        <p class="entry-description">{{ exp.description }}</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Skills</h2>
      <ul class="skill-list">
        <li v-for="(skill, index) in resumeData.skills" :key="'skill-' + index">{{ skill.name }}</li>
      </ul>
    </section>

    <section class="section">
      <h2 class="section-title">Projects</h2>
      <div v-for="(project, index) in resumeData.projects" :key="'project-' + index" class="entry">
        <p class="entry-title">
          <strong>{{ project.name }}</strong> ({{ project.year }})
        </p>
        <p class="entry-description">{{ project.description }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  resumeData: Object,
});
</script>

<style scoped>
.modern-template {
  font-family: 'Arial', sans-serif;
  color: #2c3e50;
  background-color: #fff;
  max-width: 850px;
  margin: 0 auto;
  padding: 30px;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.name {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align:left;
}

.contact {
  font-size: 14px;
  color: #555;
}

.divider {
  border: none;
  border-top: 2px solid #2980b9;
  margin: 20px 0;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  color: #2980b9;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.entry {
  margin-bottom: 15px;
}

.entry-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.entry-description {
  margin-left: 10px;
  font-size: 14px;
  color: #444;
}

.skill-list {
  list-style-type: disc;
  margin-left: 20px;
  padding-left: 0;
}

.skill-list li {
  margin-bottom: 6px;
}
</style>

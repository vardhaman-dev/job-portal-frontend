<template>
  <q-card class="skill-card q-pa-md q-mt-md q-mb-lg" flat>
    <div class="section-heading text-h6 text-weight-bold q-mb-md">
      Required Skills & Qualifications
    </div>

    <!-- Education -->
    <div class="section-block q-mb-md">
      <div class="section-title text-purple">
        <span>🎓 Education</span>
      </div>
      <ul class="section-list">
        <li>Bachelor's degree in Computer Science, Engineering, or related field</li>
      </ul>
    </div>

    <!-- Experience -->
    <div class="section-block q-mb-md">
      <div class="section-title text-primary">
        <span>💼 Experience</span>
      </div>
      <ul class="section-list">
        <li>5+ years of experience in frontend development</li>
        <li>Strong experience with React and TypeScript</li>
      </ul>
    </div>

    <!-- Technical Skills -->
    <div class="section-block q-mb-md">
      <div class="section-title text-green-8">
        <span>🛠️ Technical Skills</span>
      </div>
      <ul class="section-list">
        <li>React</li>
        <li>TypeScript</li>
        <li>JavaScript</li>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Git</li>
        <li>Webpack</li>
        <li>REST APIs</li>
      </ul>
    </div>

    <!-- Soft Skills -->
    <div class="section-block">
      <div class="section-title text-deep-orange-8">
        <span>🧠 Soft Skills</span>
      </div>
      <ul class="section-list">
        <li>Strong problem-solving abilities</li>
        <li>Excellent communication skills</li>
        <li>Team collaboration</li>
        <li>Attention to detail</li>
      </ul>
    </div>
  </q-card>
</template>

<script setup>
defineProps({ job: Object })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.skill-card {
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.skill-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.section-heading {
  color: #2c2c2c;
}

.section-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
  line-height: 1.4;
}

.section-list {
  padding-left: 1.5rem;
  margin-top: 4px;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.6;
}

.section-list li {
  margin-bottom: 4px;
  list-style: disc;
}

.skill-card {
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.skill-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

</style>

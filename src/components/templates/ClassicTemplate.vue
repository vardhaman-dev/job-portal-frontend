<template>
  <div class="classic-template">
    <header class="header">
      <h1 class="name">{{ resumeData.name }}</h1>
      <p class="contact">
        {{ resumeData.email }} | {{ resumeData.phone }} | {{ resumeData.address }}
      </p>
    </header>

    <hr class="divider" />

    <section class="section">
      <h2 class="section-title">Education</h2>
      <ul class="list">
        <li v-for="(edu, index) in resumeData.education" :key="'edu-' + index">
          <strong>{{ edu.institution }}</strong> — {{ edu.degree }} ({{ edu.year }})
        </li>
      </ul>
    </section>

    <section class="section">
      <h2 class="section-title">Experience</h2>
      <ul class="list">
        <li v-for="(exp, index) in resumeData.experience" :key="'exp-' + index">
          <strong>{{ exp.company }}</strong> — {{ exp.role }} ({{ exp.years }})<br />
          <span class="description">{{ exp.description }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
defineProps({
  resumeData: Object,
});
</script>

<style scoped>
.classic-template {
  font-family: 'Times New Roman', serif;
  color: #000;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.name {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.contact {
  font-size: 14px;
  color: #333;
}

.divider {
  border: none;
  border-top: 2px solid #000;
  margin: 20px 0;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 20px;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.list {
  list-style-type: disc;
  margin-left: 20px;
  padding-left: 0;
}

.list li {
  margin-bottom: 12px;
  line-height: 1.5;
}

.description {
  display: block;
  margin-top: 5px;
}
</style>

<template>
  <div class="creative-template q-pa-md">
    <h1 class="text-h4 text-primary">{{ resumeData.name }}</h1>
    <p class="text-grey">{{ resumeData.email }} | {{ resumeData.phone }}</p>

    <h2 class="text-h6 text-primary q-mt-md">About Me</h2>
    <p>{{ resumeData.summary }}</p>

    <h2 class="text-h6 text-primary q-mt-md">Education</h2>
    <div v-for="(edu, index) in resumeData.education" :key="'edu-' + index">
      <p class="text-bold">{{ edu.institution }}: {{ edu.degree }} ({{ edu.year }})</p>
    </div>

    <h2 class="text-h6 text-primary q-mt-md">Experience</h2>
    <div v-for="(exp, index) in resumeData.experience" :key="'exp-' + index">
      <p class="text-bold">{{ exp.role }} - {{ exp.company }} ({{ exp.duration }})</p>
    </div>

    <h2 class="text-h6 text-primary q-mt-md">Skills</h2>
    <ul class="q-pl-md">
      <li v-for="(skill, index) in resumeData.skills" :key="'skill-' + index">{{ skill }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  resumeData: Object
});
</script>

<style scoped>
.creative-template {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to right, #e3f2fd, #bbdefb);
  padding: 20px;
  border-radius: 10px;
  line-height: 1.5;
}
ul {
  list-style-type: disc;
  margin-left: 20px;
}
</style>

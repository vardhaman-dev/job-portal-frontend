<template>
  <div class="professional-template q-pa-md">
    <header class="text-center q-mb-md">
      <h1 class="text-h4 text-uppercase q-mb-xs">{{ resumeData.name }}</h1>
      <p class="text-subtitle2 text-grey-7">
        {{ resumeData.email }} | {{ resumeData.phone }} | {{ resumeData.address }}
      </p>
    </header>

    <section class="q-mb-md">
      <h2 class="text-h6 text-primary q-mb-xs">Professional Profile</h2>
      <p class="text-body1">{{ resumeData.summary }}</p>
    </section>

    <section class="q-mb-md">
      <h2 class="text-h6 text-primary q-mb-xs">Education</h2>
      <div
        v-for="(edu, index) in resumeData.education"
        :key="'edu-' + index"
        class="q-mb-sm"
      >
        <p class="text-body1">
          <strong>{{ edu.degree }}</strong>, {{ edu.institution }}
          <span class="text-caption text-grey-7">({{ edu.year }})</span>
        </p>
      </div>
    </section>

    <section class="q-mb-md">
      <h2 class="text-h6 text-primary q-mb-xs">Professional Experience</h2>
      <div
        v-for="(exp, index) in resumeData.experience"
        :key="'exp-' + index"
        class="q-mb-sm"
      >
        <p class="text-body1">
          <strong>{{ exp.role }}</strong>, {{ exp.company }}
          <span class="text-caption text-grey-7">({{ exp.duration }})</span>
        </p>
        <p v-if="exp.description" class="text-caption">{{ exp.description }}</p>
      </div>
    </section>

    <section>
      <h2 class="text-h6 text-primary q-mb-xs">Skills</h2>
      <ul class="q-pl-md">
        <li
          v-for="(skill, index) in resumeData.skills"
          :key="'skill-' + index"
          class="text-body2"
        >
          {{ skill }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
defineProps({
  resumeData: Object
});
</script>

<style scoped>
.professional-template {
  font-family: 'Open Sans', sans-serif;
  background: #fff;
  border-top: 4px solid #3f51b5;
  max-width: 850px;
  margin: 0 auto;
  line-height: 1.6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
</style>

<template>
  <div class="resume-container">
    <!-- Sidebar -->
    <aside class="sidebar">
    <img
  v-if="resumeData.photo"
  :src="resumeData.photo"
  class="profile-pic"
  alt="Profile"
/>


      <section class="contact-info">
        <h3>CONTACT</h3>
        <p><strong>Phone:</strong> {{ resumeData.phone }}</p>
        <p><strong>Email:</strong> {{ resumeData.email }}</p>
        <p><strong>Address:</strong> {{ resumeData.address }}</p>
        <p v-if="resumeData.website"><strong>Website:</strong> {{ resumeData.website }}</p>
      </section>

      <section v-if="resumeData.education?.length" class="education">
        <h3>EDUCATION</h3>
        <div v-for="(edu, index) in resumeData.education" :key="'edu-' + index">
          <p class="edu-period">{{ edu.year }}</p>
          <p><strong>{{ edu.institution }}</strong></p>
          <p>{{ edu.degree }}</p>
          <p v-if="edu.gpa">GPA: {{ edu.gpa }}</p>
        </div>
      </section>

      <section v-if="resumeData.skills?.length" class="skills">
        <h3>SKILLS</h3>
        <ul>
          <li v-for="(skill, index) in resumeData.skills" :key="'skill-' + index">{{ skill.name }}</li>
        </ul>
      </section>

      <section v-if="resumeData.languages?.length" class="languages">
        <h3>LANGUAGES</h3>
        <ul>
          <li v-for="(lang, index) in resumeData.languages" :key="'lang-' + index">
            {{ lang.name }} ({{ lang.level }})
          </li>
        </ul>
      </section>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
     <header class="header">
  <h1>
    <span class="first-name">{{ resumeData.name?.split(' ')[0] || '' }}</span>
    <span class="last-name">{{ resumeData.name?.split(' ')[1] || '' }}</span>
  </h1>
  <p v-if="resumeData.title" class="title">{{ resumeData.title }}</p>
  <p v-if="resumeData.position" class="position">{{ resumeData.position }}</p>
</header>


      <section v-if="resumeData.profile" class="section">
        <h2 class="section-title">PROFILE</h2>
        <p class="entry-description">{{ resumeData.profile }}</p>
      </section>

      <section v-if="resumeData.experience?.length" class="section">
        <h2 class="section-title">WORK EXPERIENCE</h2>
        <div
          v-for="(exp, index) in resumeData.experience"
          :key="'exp-' + index"
          class="entry"
        >
          <div class="entry-header">
            <strong>{{ exp.company }}</strong> — {{ exp.role }}
            <span class="year">{{ exp.years }}</span>
          </div>
          <ul v-if="exp.description">
            <li
              v-for="(point, i) in exp.description.split('\n')"
              :key="'exp-desc-' + index + '-' + i"
            >
              {{ point }}
            </li>
          </ul>
        </div>
      </section>
          <section v-if="resumeData.projects?.length" class="main-section">
  <h3 class="section-title"> PROJECTS</h3>
  <div v-for="(proj, i) in resumeData.projects" :key="'proj-' + i" class="entry">
    <div class="entry-top">
      <strong>{{ proj.name }}</strong>
      (<span v-if="proj.year">{{ proj.year }}</span>)
    </div>
     <ul v-if="proj.description ">
            <li
              v-for="(point, i) in proj.description.split('\n')"
              :key="'exp-desc-' + index + '-' + i"
            >
              {{ point }}
            </li>
          </ul>
   
  </div>
</section>

      <section v-if="resumeData.references?.length" class="section">
        <h2 class="section-title">REFERENCE</h2>
        <div v-for="(ref, index) in resumeData.references" :key="'ref-' + index" class="entry">
          <p>
            <strong>{{ ref.name }}</strong><br />
            {{ ref.position }}<br />
            Phone: {{ ref.phone }}<br />
            Email: {{ ref.email }}
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
defineProps({
  resumeData: Object,
});
</script>

<style scoped>
.resume-container {
  display: flex;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  max-width: 950px;
  margin: auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Sidebar */
.sidebar {
  width: 30%;
  background-color: #1c355e;
  color: white;
  padding: 20px;
  box-sizing: border-box;
}

.profile-pic {
  width: 100%;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
}

.sidebar h3 {
  font-size: 14px;
  margin-bottom: 10px;
  color: #89a7d9;
}

.sidebar p,
.sidebar li {
  font-size: 13px;
  margin-bottom: 6px;
}

.sidebar ul {
  list-style: none;
  padding-left: 0;
}

.sidebar section {
  margin-bottom: 25px;
}

/* Main Content */
.main-content {
  width: 70%;
  padding: 30px;
  box-sizing: border-box;
  color: #2c3e50;
}

.header {
  border-bottom: 2px solid #2980b9;
  margin-bottom: 20px;
  padding-bottom: 10px;
  line-height: 1.2;
}
h1 {
  font-size: 32px;
  margin: 0; /* Remove auto margin */
  line-height: 1.2; /* Tight line spacing */
}

.title {
  font-size: 16px;
  color: #555;
  font-weight: 600;
  margin: 2px 0 0 0; /* Top: 2px, Bottom: 0 */
}

.position {
  font-size: 14px;
  color: #777;
  margin: 0; /* Remove all extra margin */
}
.first-name {
  font-weight: bold;
  font-size: 28px;
}




.last-name {
  font-weight: 300;
  font-size: 28px;
  color: #2980b9;
}


.section-title {
  color: #2980b9;
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.entry {
  margin-bottom: 15px;
}

.entry-header {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  margin-bottom: 6px;
}

.entry-header .year {
  font-size: 13px;
  color: #666;
}

.entry-description,
.entry ul {
  font-size: 14px;
  margin-left: 10px;
}

.entry ul {
  padding-left: 20px;
}
</style>

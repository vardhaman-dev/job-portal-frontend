<template>
  <div class="resume-wrapper">
    <!-- Left Sidebar -->
    <aside class="sidebar">
      <div class="avatar-wrapper" v-if="resumeData.photo">
        <img :src="resumeData.photo" class="avatar" alt="Profile" />
      </div>

      <section class="side-section">
        <h3>CONTACT</h3>
        <p><q-icon name="phone" size="16px" /> {{ resumeData.phone }}</p>
        <p><q-icon name="email" size="16px" /> {{ resumeData.email }}</p>
        <p><q-icon name="place" size="16px" /> {{ resumeData.address }}</p>
        <p v-if="resumeData.website"><q-icon name="language" size="16px" /> {{ resumeData.website }}</p>
      </section>

      <section class="side-section">
        <h3>SKILLS</h3>
        <ul>
          <li v-for="(skill, i) in resumeData.skills" :key="'skill-' + i">{{ skill.name }}</li>
        </ul>
      </section>

      <section class="side-section">
        <h3>LANGUAGES</h3>
        <ul>
          <li v-for="(lang, i) in resumeData.languages" :key="'lang-' + i">
            {{ lang.name }} ({{ lang.level }})
          </li>
        </ul>
      </section>

      <section class="side-section" v-if="resumeData.references?.length">
        <h3>REFERENCE</h3>
        <div v-for="(ref, i) in resumeData.references" :key="'ref-' + i">
          <p><strong>{{ ref.name }}</strong><br />{{ ref.position }}</p>
          <p>Phone: {{ ref.phone }}</p>
          <p>Email: {{ ref.email }}</p>
        </div>
      </section>
    </aside>

    <!-- Right Main -->
    <main class="main">
      <div class="header">
        <h1>{{ resumeData.name }}</h1>
        <h2>{{ resumeData.title }}</h2>
        <h4>{{ resumeData.position }}</h4>
      </div>

      <section v-if="resumeData.profile" class="main-section">
        <h3><q-icon name="person" class="icon" /> PROFILE</h3>
        <p>{{ resumeData.profile }}</p>
      </section>

      <section v-if="resumeData.experience?.length" class="main-section">
        <h3><q-icon name="work" class="icon" /> WORK EXPERIENCE</h3>
        <div v-for="(exp, i) in resumeData.experience" :key="'exp-' + i" class="entry">
          <div class="entry-top">
            <strong>{{ exp.company }}</strong>
            <span>{{ exp.years }}</span>
          </div>
          <p class="entry-role">{{ exp.role }}</p>
          <ul>
            <li v-for="(point, j) in exp.description.split('\n')" :key="'exp-point-' + j">{{ point }}</li>
          </ul>
        </div>
      </section>
 <section v-if="resumeData.projects?.length" class="main-section">
  <h3><q-icon name="code" class="icon" /> PROJECTS</h3>
  <div v-for="(project, i) in resumeData.projects" :key="'project-' + i" class="entry">
    <div class="entry-top">
      <strong>{{ project.name }}</strong>
      <span>{{ project.year }}</span>
    </div>
    <p class="entry-role">{{ project.description }}</p>
  </div>
</section>


      <section v-if="resumeData.education?.length" class="main-section">
        <h3><q-icon name="school" class="icon" /> EDUCATION</h3>
        <div v-for="(edu, i) in resumeData.education" :key="'edu-' + i" class="entry">
          <div class="entry-top">
            <strong>{{ edu.degree }}</strong>
            <span>{{ edu.year }}</span>
          </div>
          <p class="entry-role">{{ edu.institution }}</p>
          <p v-if="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</p>
        </div>
      </section>
      <section class="side-section">
  <h3>LANGUAGES</h3>
  <ul>
    <li v-for="(lang, i) in resumeData.languages" :key="'lang-' + i">
      {{ lang.name }} ({{ lang.level }})
    </li>
  </ul>
</section>

    </main>
  </div>
</template>

<script setup>
defineProps({ resumeData: Object });
</script>

<style scoped>
.resume-wrapper {
  display: flex;
  max-width: 1000px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background: #fff;
}

.sidebar {
  width: 32%;
  background: #2c3e50;
  color: white;
  padding: 30px 20px;
  box-sizing: border-box;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
}

.side-section {
  margin-bottom: 24px;
}
.side-section h3 {
  font-size: 14px;
  color: #fff;
  border-bottom: 1px solid #888;
  margin-bottom: 8px;
  padding-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.side-section p, .side-section li {
  font-size: 13px;
  margin-bottom: 6px;
}
.side-section ul {
  padding-left: 16px;
  list-style: disc;
}

.main {
  width: 68%;
  padding: 30px;
  box-sizing: border-box;
  color: #2c3e50;
}

.header {
  border-bottom: 3px solid #2c3e50;
  margin-bottom: 24px;
  padding-bottom: 10px;
}
.header h1 {
  font-size: 32px;
  margin: 0;
  line-height: 1.2;
  font-weight: bold;
}
.header h2 {
 font-size: 16px;
  color: #121317ff;
  font-weight: 600;
  margin-top: 0px;
  margin-bottom: 0;
}
h4{
    font-size: 14px;
  color: #000000ff;
  margin-top: 0px;
  margin-bottom: 0;
}
.main-section {
  margin-bottom: 24px;
}
.main-section h3 {
  font-size: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
  color: #2c3e50;
  text-transform: uppercase;
}
.entry {
  margin-bottom: 16px;
}
.entry-top {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}
.entry-role {
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
  margin-bottom: 6px;
}
.gpa {
  font-size: 13px;
  color: #444;
  margin-top: -6px;
}
ul {
  margin: 0;
  padding-left: 18px;
}
li {
  font-size: 13px;
  margin-bottom: 4px;
}
</style>

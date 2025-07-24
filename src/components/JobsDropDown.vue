<template>
  <div class="jobs-dropdown" @mouseenter="show = true" @mouseleave="show = false">
    <div class="dropdown-trigger">Jobs</div>
    <div class="dropdown-content" v-show="show">
      <div class="dropdown-columns">
        <div class="column">
          <h4>🧠 Technology</h4>
          <ul>
            <li>Software Developer</li>
            <li>Data Scientist</li>
            <li>DevOps Engineer</li>
            <li>Product Manager</li>
            <li>UX/UI Designer</li>
            <li>Cybersecurity Specialist</li>
          </ul>

          <h4>👥 Human Resources</h4>
          <ul>
            <li>HR Manager</li>
            <li>Talent Acquisition</li>
            <li>HR Business Partner</li>
            <li>Compensation Analyst</li>
            <li>Training Specialist</li>
            <li>Employee Relations</li>
          </ul>

          <h4>⚕️ Healthcare</h4>
          <ul>
            <li>Registered Nurse</li>
            <li>Medical Assistant</li>
            <li>Healthcare Administrator</li>
            <li>Physical Therapist</li>
            <li>Pharmacist</li>
            <li>Medical Technician</li>
          </ul>
        </div>

        <div class="column">
          <h4>📈 Marketing & Sales</h4>
          <ul>
            <li>Digital Marketing Manager</li>
            <li>Sales Representative</li>
            <li>Content Creator</li>
            <li>SEO Specialist</li>
            <li>Brand Manager</li>
            <li>Social Media Manager</li>
          </ul>

          <h4>🎨 Design & Creative</h4>
          <ul>
            <li>Graphic Designer</li>
            <li>Creative Director</li>
            <li>Video Editor</li>
            <li>Art Director</li>
            <li>Motion Graphics</li>
            <li>Web Designer</li>
          </ul>

          <h4>📚 Education</h4>
          <ul>
            <li>Teacher</li>
            <li>School Administrator</li>
            <li>Curriculum Developer</li>
            <li>Educational Consultant</li>
            <li>Academic Advisor</li>
            <li>Training Coordinator</li>
          </ul>
        </div>

        <div class="column">
          <h4>💰 Finance</h4>
          <ul>
            <li>Financial Analyst</li>
            <li>Investment Banking</li>
            <li>Accountant</li>
            <li>Risk Manager</li>
            <li>Financial Advisor</li>
            <li>Budget Analyst</li>
          </ul>

          <h4>📦 Operations & Logistics</h4>
          <ul>
            <li>Operations Manager</li>
            <li>Supply Chain Analyst</li>
            <li>Logistics Coordinator</li>
            <li>Project Manager</li>
            <li>Process Improvement</li>
            <li>Quality Assurance</li>
          </ul>

          <h4>⚖️ Legal</h4>
          <ul>
            <li>Attorney</li>
            <li>Paralegal</li>
            <li>Legal Assistant</li>
            <li>Compliance Officer</li>
            <li>Contract Manager</li>
            <li>Legal Counsel</li>
          </ul>
        </div>

        <div class="column">
          <h4>🏗️ Construction & Engineering</h4>
          <ul>
            <li>Civil Engineer</li>
            <li>Project Manager</li>
            <li>Construction Worker</li>
            <li>Architect</li>
            <li>Electrical Engineer</li>
          </ul>

          <h4>🏠 Real Estate</h4>
          <ul>
            <li>Real Estate Agent</li>
            <li>Property Manager</li>
            <li>Real Estate Analyst</li>
            <li>Leasing Consultant</li>
            <li>Real Estate Developer</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobsDropdown',
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped>
.jobs-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 95vw;
  width: 1000px;
  max-height: 400px;            /* ⬅️ Limit height */
  overflow-y: auto;             /* ⬅️ Allow vertical scroll */
  background: white;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  z-index: 1000;
  border-radius: 12px;
  padding: 30px;
}

.dropdown-columns {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.column {
  flex: 1 1 180px;
  min-width: 180px;
}

.column h4 {
  font-size: 16px;
  font-weight: 600;
  color: #2d6cff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.column ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.column li {
  font-size: 14px;
  color: #333;
  padding: 4px 0;
  cursor: pointer;
  transition: color 0.2s;
}

.column li:hover {
  color: #2d6cff;
}
</style>

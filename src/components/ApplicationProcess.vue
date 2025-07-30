<template>
  <q-card class="process-card q-pa-md q-mt-md q-mb-lg" flat>
    <div class="section-heading text-h6 text-weight-bold q-mb-md text-primary">
      <q-icon class="q-mr-sm" />Application Process
    </div>

    <div class="section-subtitle text-blue-9 flex items-center q-mb-md">
      <q-icon class="q-mr-xs" /> Expected timeframe: {{ timeframe }}
    </div>

    <ol class="process-list">
      <li v-for="(step, idx) in steps" :key="idx">
        <div class="step-number">{{ idx + 1 }}</div>
        <div class="step-content">
          <div class="step-text">{{ step.title }}</div>
          <div v-if="step.duration" class="step-duration">{{ step.duration }}</div>
        </div>
      </li>
      <li class="final-step">
        <div class="step-number">{{ steps.length + 1 }}</div>
        <div class="step-content">
          <div class="step-text"><strong>Reference check and offer</strong></div>
        </div>
      </li>
    </ol>
  </q-card>
</template>

<script setup>
const timeframe = '2‑3 weeks'
const steps = [
  { title: 'Submit your application with resume and portfolio', duration: '' },
  { title: 'Initial phone screening with HR', duration: '(30 minutes)' },
  { title: 'Technical interview with engineering team', duration: '(1 hour)' },
  { title: 'Final interview with hiring manager', duration: '(45 minutes)' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.process-card {
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
}

.section-heading,
.section-subtitle {
  display: flex;
  align-items: center;
}

.process-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.process-list li {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
}

.step-number {
  width: 24px;
  height: 24px;
  min-width: 24px;
  background-color: #d0e6ff;
  color: #1c3faa;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  font-weight: 600;
  margin-right: 12px;
}

.step-content {
  flex: 1;
}

.step-text {
  font-size: 0.95rem;
  color: #2c2c2c;
}

.step-duration {
  font-size: 0.85rem;
  color: #666;
  margin-top: 2px;
}

.final-step .step-number {
  background-color: #b3d7ff;
  font-weight: 700;
}

.process-card {
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.process-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

</style>

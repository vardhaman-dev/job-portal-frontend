<!-- src/pages/HomePage.vue -->
<template>
  <div class="landing-page">
    <AppHeader />
    
    <section class="hero">
      <h1 class="tagline">Your Dream Job is Just a Click Away <br/><span class="handwritten">Explore. Apply. Succeed.</span></h1>
      <p>
        Unlock your next big opportunity - thousands of jobs, zero stress. Start your career adventure with JobHub today!
      </p>

      <div class="search-box">
    <input type="text" placeholder="🔍 Job title or keyword" v-model="searchInput" />
        <input type="text" placeholder="📍 City, state, or remote" />
        <button @click="performSearch">Search Jobs</button>
      </div>

      <div class="stats">
        <div><strong>50,000+</strong><br />Active Jobs</div>
        <div><strong>15,000+</strong><br />Companies</div>
        <div><strong>2M+</strong><br />Job Seekers</div>
      </div>
    </section>
    
<JobListingPage :searchQuery="searchInput" />

    <section class="categories">
      <h2>Browse Jobs by <span>Category</span></h2>
      <p>
        Explore opportunities across various industries and find the perfect role that
        matches your skills and interests.
      </p>

      <div class="category-grid">
        <q-card class="category-card cursor-pointer" @click="gotoCategory('Technology')">
          <div class="icon">💻</div>
          <h3>Information Technology</h3>
          <p class="count">12,500+ jobs</p>
          <small>Software, Web Development, Data Science</small>
        </q-card>
        <div class="category-card">
          <div class="icon">📈</div>
          <h3>Marketing & Sales</h3>
          <p class="count">8,300+ jobs</p>
          <small>Digital Marketing, Sales, Business Development</small>
        </div>
        <div class="category-card">
          <div class="icon">💰</div>
          <h3>Finance & Accounting</h3>
          <p class="count">6,700+ jobs</p>
          <small>Accounting, Financial Analysis, Investment</small>
        </div>
        <div class="category-card">
          <div class="icon">👥</div>
          <h3>Human Resources</h3>
          <p class="count">4,200+ jobs</p>
          <small>HR Management, Recruitment, Training</small>
        </div>
        <div class="category-card">
          <div class="icon">📦</div>
          <h3>Business & Consulting</h3>
          <p class="count">3,800+ jobs</p>
          <small>Strategy, Operations, Management</small>
        </div>
        <div class="category-card">
          <div class="icon">🎨</div>
          <h3>Design & Creative</h3>
          <p class="count">2,900+ jobs</p>
          <small>UI/UX, Graphics, Content Creation</small>
        </div>
        <div class="category-card">
          <div class="icon">🛡️</div>
          <h3>Legal & Compliance</h3>
          <p class="count">1,500+ jobs</p>
          <small>Legal Affairs, Compliance, Risk</small>
        </div>
        <div class="category-card">
          <div class="icon">⚕️</div>
          <h3>Healthcare & Medical</h3>
          <p class="count">5,200+ jobs</p>
          <small>Medical, Nursing, Healthcare Admin</small>
        </div>
      </div>
    </section>
        <section class="how-it-works">
      <h2>How It Works</h2>
      <p class="subtitle">
        Get started with your job search in three simple steps. Our streamlined process<br />
        makes finding your next opportunity easier than ever.
      </p>

      <div class="steps">
        <div class="step">
          <div class="step-icon blue">👤➕</div>
          <div class="step-number">1</div>
          <h3>Create Profile</h3>
          <p>Sign up and build your professional profile with your skills, experience, and preferences.</p>
        </div>

        <div class="step">
          <div class="step-icon green">🔍</div>
          <div class="step-number">2</div>
          <h3>Search & Apply</h3>
          <p>Browse through thousands of jobs, filter by your preferences, and apply with one click.</p>
        </div>

        <div class="step">
          <div class="step-icon purple">✅</div>
          <div class="step-number">3</div>
          <h3>Get Hired</h3>
          <p>Connect with employers, attend interviews, and land your dream job with our support.</p>
        </div>
      </div>

      <div class="features">
        <div class="feature-item">
          <strong>Quick Setup</strong>
          <small>Create your profile in under 5 minutes</small>
        </div>
        <div class="feature-item">
          <strong>Smart Matching</strong>
          <small>AI-powered job recommendations</small>
        </div>
        <div class="feature-item">
          <strong>24/7 Support</strong>
          <small>Get help whenever you need it</small>
        </div>
      </div>
    </section>

    <!-- Add other homepage sections here -->
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/HeaderPart.vue';
import AppFooter from '../components/FooterPart.vue';
import JobListingPage from './JobListing.vue';
import { useRouter } from 'vue-router';
import {ref,  onMounted } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';

export default {
  name: 'HomePage',
  components: {
    AppHeader,
    AppFooter,
    JobListingPage
  },
  setup() {
    const router = useRouter();
    const searchInput = ref('');
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore); // ✅ make reactivity work

    function gotoCategory(category) {
      router.push({ name: 'JobListing', params: { category } });
    }
function performSearch() {
  searchInput.value = searchInput.value.trim(); // this will trigger watch in JobListingPage
}

    onMounted(() => {
      authStore.initialize(); // ✅ ensure user data is loaded from localStorage
    });

    return {
  gotoCategory,
  isAuthenticated,
  searchInput,
  performSearch  // ✅ this was missing
};
  }
};

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.landing-page {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: var(--color-gray-800);
  background: linear-gradient(to bottom, var(--color-gray-50), var(--color-surface));
  line-height: 1.6;
}

/* Hero */
.hero {
  text-align: center;
  padding: var(--space-20) var(--space-5) var(--space-16);
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-primary-50) 100%);
}

.hero h1 {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-6);
  color: var(--color-gray-900);
  letter-spacing: -0.025em;
}

.hero h1 span {
  color: var(--color-primary-600);
}

.hero p {
  margin-top: var(--space-5);
  color: var(--color-gray-600);
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Search */
.search-box {
  margin-top: var(--space-10);
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.search-box input {
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  width: 260px;
  font-size: var(--font-size-base);
  font-family: var(--font-family-primary);
  background: var(--color-surface);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.search-box input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), var(--shadow-md);
}

.search-box button {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  color: white;
  padding: var(--space-4) var(--space-6);
  border: none;
  border-radius: var(--border-radius-lg);
  font-weight: 500;
  font-size: var(--font-size-base);
  font-family: var(--font-family-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.search-box button:hover {
  background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-800));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Stats */
.stats {
  display: flex;
  justify-content: center;
  gap: var(--space-16);
  margin-top: var(--space-12);
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
}

.stats strong {
  font-size: var(--font-size-2xl);
  color: var(--color-primary-600);
  font-weight: 700;
  display: block;
  margin-bottom: var(--space-1);
}

/* Categories */
.categories {
  text-align: center;
  padding: var(--space-20) var(--space-8);
  background: var(--color-surface-secondary);
}

.categories h2 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--space-3);
  color: var(--color-gray-900);
  letter-spacing: -0.025em;
}

.categories h2 span {
  color: var(--color-primary-600);
}

.categories p {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto var(--space-12);
  line-height: 1.6;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-8);
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--space-8) var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-base);
  text-align: center;
  min-width: 260px;
  max-width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-200);
}

.category-card .icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-4);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.category-card h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--space-2);
  line-height: 1.4;
}

.category-card .count {
  color: var(--color-primary-600);
  font-weight: 700;
  font-size: var(--font-size-base);
  margin-bottom: var(--space-2);
}

.category-card small {
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  line-height: 1.4;
}

/* How it works */
.how-it-works {
  padding: var(--space-20) var(--space-8);
  text-align: center;
  background: var(--color-surface);
}

.how-it-works h2 {
  font-size: var(--font-size-3xl);
  color: var(--color-gray-900);
  font-weight: 700;
  margin-bottom: var(--space-3);
  letter-spacing: -0.025em;
}

.how-it-works .subtitle {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin-bottom: var(--space-12);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.steps {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-10);
  margin-bottom: var(--space-12);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.step {
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--space-8) var(--space-6);
  max-width: 300px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  text-align: center;
  transition: all var(--transition-base);
}

.step:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-200);
}

.step-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-3);
  display: inline-block;
  padding: var(--space-5);
  border-radius: 50%;
  color: white;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  box-shadow: var(--shadow-sm);
}

.step-number {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: 700;
  line-height: 32px;
  margin: var(--space-3) auto;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.step:hover .step-number {
  transform: scale(1.1);
  box-shadow: var(--shadow-md);
}

.step h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: var(--space-3) 0;
  color: var(--color-gray-900);
}

.step p {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
}

.tagline {
  opacity: 0;
  transform: scale(0.8);
  animation: zoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.2s;
}

@keyframes zoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.features {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  gap: var(--space-20);
  margin-top: var(--space-10);
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
}

.feature-item strong {
  color: var(--color-primary-600);
  font-weight: 600;
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-2);
}

.feature-item small {
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  line-height: 1.3;
}

.handwritten {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-3xl);
  color: var(--color-primary-600);
  display: inline-block;
  margin-top: var(--space-3);
  font-weight: 600;
  font-style: italic;
  letter-spacing: -0.025em;
}

.footer {
  background: #1565c0;
  color: white;
  padding: 60px 40px 20px;
  margin-top: 80px;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 40px;
}

.footer-brand {
  max-width: 300px;
}
.footer-logo {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.footer-brand p {
  font-size: 14px;
  line-height: 1.6;
  color: #e0e0e0;
}
.social-icons {
  margin-top: 15px;
}
.social-icons a {
  margin-right: 10px;
  color: white;
  font-size: 16px;
  transition: color 0.2s ease;
}
.social-icons a:hover {
  color: #cfd8ff;
}

.footer-links {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
}
.footer-links h4 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}
.footer-links a {
  display: block;
  margin-bottom: 8px;
  color: #e0e0e0;
  font-size: 14px;
  text-decoration: none;
}
.footer-links a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  font-size: 13px;
  padding-top: 20px;
  color: #cbdfff;
}

.nav-links .active-link {
  position: relative;
  color: #1565c0;
  font-weight: 700;
  transition: color 0.3s ease;
}

.nav-links .active-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1565c0;
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}

.nav-link {
  position: relative;
  font-weight: 500;
  color: white;
  text-transform: none;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s ease-in-out;
}

.nav-link:hover::after,
.nav-link.router-link-exact-active::after {
  width: 100%;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .hero {
    padding: var(--space-16) var(--space-4) var(--space-12);
  }
  
  .hero h1 {
    font-size: var(--font-size-3xl);
  }
  
  .search-box {
    flex-direction: column;
    align-items: center;
  }
  
  .search-box input {
    width: 100%;
    max-width: 300px;
  }
  
  .stats {
    gap: var(--space-8);
    flex-wrap: wrap;
  }
  
  .categories {
    padding: var(--space-16) var(--space-4);
  }
  
  .category-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .how-it-works {
    padding: var(--space-16) var(--space-4);
  }
  
  .steps {
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);
  }
  
  .features {
    gap: var(--space-10);
  }
}

</style>
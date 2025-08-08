<template>
  <div class="privacy-policy-page">
      <header class="navbar">
      <div class="logo">💼 JobHub</div>
      <nav class="nav-links">
        <router-link to="/" exact-active-class="active-link">Home</router-link>
        <JobsDropdown />
        <router-link to="/employers" exact-active-class="active-link">Employers</router-link>
      </nav>
    </header>
    <section class="policy-hero">
      <div class="hero-content">
        <h1>Privacy Policy</h1>
        <p class="subtitle">Your trust is important to us. Here’s how we protect your data.</p>
        <p class="last-updated">Last Updated: August 5, 2025</p>
      </div>
    </section>

    <div class="policy-container glass-section">
      <div class="disclaimer-box">
        <p><strong>Please Note:</strong> Our Privacy Policy is compliant with all applicable laws, including the Digital Personal Data Protection Act (DPDPA) in India.</p>
      </div>

      <div class="policy-content">
        <h2>1. Introduction</h2>
        <p>Welcome to JobHub. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. We are committed to protecting your personal data and your right to privacy. If you have any questions or concerns about this policy, or our practices with regards to your personal information, please <router-link to="/contact">contact us</router-link>.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us, as well as information that is automatically collected when you use our services.</p>
        <h3>a. Information You Provide to Us</h3>
        <ul>
          <li><strong>For Job Seekers:</strong> We collect personal data such as your name, email address, phone number, work experience, educational background, skills, and resume/CV content when you create a profile or apply for a job.</li>
          <li><strong>For Employers:</strong> We collect information such as company name, contact person's name and email, job posting details, and billing information.</li>
        </ul>
        <h3>b. Information We Collect Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> We automatically collect information about how you interact with our services, such as your IP address, browser type, pages viewed, and time spent on pages.</li>
          <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service and hold certain information.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li>To provide, operate, and maintain our services.</li>
          <li>To manage your account and facilitate the job application process.</li>
          <li>To enable communication between Job Seekers and Employers.</li>
          <li>To personalize your experience by recommending relevant jobs or candidates.</li>
          <li>To process transactions and send you related information, including purchase confirmations and invoices.</li>
          <li>To detect and prevent fraudulent activity.</li>
          <li>For compliance purposes, including enforcing our Terms of Service, or other legal rights.</li>
        </ul>

        <h2>4. How We Share Your Information</h2>
        <p>We do not sell your personal data. We may share your information in the following situations:</p>
        <ul>
          <li><strong>With Employers:</strong> When you, as a Job Seeker, apply for a job, your profile and resume information will be shared with that specific Employer.</li>
          <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who perform services for us, such as payment processing, data analysis, and cloud hosting.</li>
          <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency) in the jurisdiction of India.</li>
        </ul>

        <h2>5. Data Security and Retention</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information. However, no electronic transmission or storage is 100% secure. We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy and to comply with our legal obligations.</p>

        <h2>6. Your Data Protection Rights</h2>
        <p>As a user based in India, you have rights under applicable data protection laws. These include the right to:</p>
        <ul>
          <li>Access, update, or delete the information we have on you.</li>
          <li>Withdraw your consent at any time where JobHub relied on your consent to process your personal information.</li>
          <li>Lodge a complaint with a data protection authority.</li>
        </ul>
        <p>You can manage your information from your account dashboard or by contacting us directly.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please visit our <router-link to="/contact">Contact Page</router-link> or email us at privacy@jobhub.com.</p>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/FooterPart.vue';
export default {
  name: 'PrivacyPolicy',
    components: {
    AppFooter
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Basic Page & Background Setup */
.privacy-policy-page {
  font-family: 'Inter', sans-serif;
  color: #2a2a2a;
  background: linear-gradient(-45deg, #f0f8ff, #f3eaff, #e0f0ff, #d1e3ff);
  background-size: 400% 400%;
  animation: animatedGradient 20s ease infinite;
  padding-bottom: 60px;
}
@keyframes animatedGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo{font-weight:700;color:#2d6cff;font-size:24px}.nav-links a{margin:0 20px;color:#333;font-weight:500;text-decoration:none;transition:color .2s}.nav-links a:hover,.nav-links .active-link{color:#2d6cff}



/* Hero Section */
.policy-hero {
  padding: 80px 40px 40px;
  text-align: center;
}
.policy-hero h1 {
  font-size: 52px;
  font-weight: 700;
  margin-bottom: 10px;
}
.policy-hero .subtitle {
  font-size: 18px;
  color: #333;
}
.last-updated {
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

/* Glass Section Container */
.policy-container {
  margin: 0 60px 40px;
  border-radius: 24px;
  padding: 40px 50px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

/* Disclaimer Box */
.disclaimer-box {
  background-color: rgba(255, 235, 238, 0.8);
  border-left: 5px solid #f56565;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center; 
  align-items: center;
}
.disclaimer-box p {
  margin: 0;
  color: #c53030;
}
.disclaimer-box strong {
  color: #9b2c2c;
}

/* Policy Content Styling */
.policy-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}
.policy-content h2 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.policy-content h2:first-of-type {
  margin-top: 0;
}
.policy-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-top: 25px;
  margin-bottom: 10px;
  color: #333;
}
.policy-content p {
  margin-bottom: 15px;
}
.policy-content ul {
  padding-left: 25px;
  margin-bottom: 15px;
}
.policy-content li {
  margin-bottom: 10px;
}
.policy-content a {
  color: #2d6cff;
  font-weight: 500;
  text-decoration: none;
  transition: text-decoration 0.2s;
}
.policy-content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .policy-container {
    margin: 0 20px 20px;
    padding: 30px 25px;
  }
  .policy-hero {
    padding: 60px 20px 30px;
  }
}
</style>
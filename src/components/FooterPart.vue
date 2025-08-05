<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo">💼 <strong>JobHub</strong></div>
        <p>Connecting talented professionals with amazing opportunities worldwide.</p>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>

      <div class="footer-links">
        <div>
          <h4>For Job Seekers</h4>
          <a href="#">Browse Jobs</a>
          <a href="#">Career Advice</a>
          <a href="#">Resume Builder</a>
          <a href="#">Salary Guide</a>
        </div>
        <div>
          <h4>For Employers</h4>
          <a href="#">Post a Job</a>
          <a href="#">Find Candidates</a>
          <a href="#">Employer Branding</a>
          <a href="#">Pricing</a>
        </div>
        <div>
          <h4>Company</h4>
          <router-link to="/about">About Us</router-link>
          <router-link to="/contact">Contact</router-link>
          <router-link to="/privacy-policy">Privacy Policy</router-link>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      © 2025 JobHub. All rights reserved.
    </div>
  </footer>
</template>

<style scoped>
.footer { background: #1565c0; color: white; padding: 60px 40px 20px; margin-top: 80px; }
.footer-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 40px; }
.footer-brand { max-width: 300px; }
.footer-logo { font-size: 20px; font-weight: bold; margin-bottom: 10px; }
.footer-brand p { font-size: 14px; line-height: 1.6; color: #e0e0e0; }
.social-icons { margin-top: 15px; }
.social-icons a { margin-right: 10px; color: white; font-size: 16px; transition: color 0.2s ease; }
.social-icons a:hover { color: #cfd8ff; }
.footer-links { display: flex; gap: 50px; flex-wrap: wrap; }
.footer-links h4 { margin-bottom: 10px; font-size: 16px; font-weight: 600; }
.footer-links a { display: block; margin-bottom: 8px; color: #e0e0e0; font-size: 14px; text-decoration: none; }
.footer-links a:hover { color: white; }
.footer-bottom { text-align: center; font-size: 13px; padding-top: 20px; color: #cbdfff; }
</style>

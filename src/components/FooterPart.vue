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
.footer {
  background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-800));
  color: white;
  padding: var(--space-16) var(--space-10) var(--space-5);
  margin-top: var(--space-20);
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-10);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding-bottom: var(--space-10);
  max-width: 1200px;
  margin: 0 auto;
}

.footer-brand {
  max-width: 320px;
}

.footer-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.footer-brand p {
  font-size: var(--font-size-sm);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--space-4);
}

.social-icons {
  display: flex;
  gap: var(--space-3);
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  color: white;
  font-size: var(--font-size-base);
  text-decoration: none;
  transition: all var(--transition-base);
  backdrop-filter: blur(8px);
}

.social-icons a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.footer-links {
  display: flex;
  gap: var(--space-12);
  flex-wrap: wrap;
}

.footer-links > div {
  min-width: 160px;
}

.footer-links h4 {
  margin-bottom: var(--space-3);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: white;
}

.footer-links a {
  display: block;
  margin-bottom: var(--space-2);
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: all var(--transition-base);
  padding: var(--space-1) 0;
  border-radius: var(--border-radius-sm);
}

.footer-links a:hover {
  color: white;
  padding-left: var(--space-2);
}

.footer-bottom {
  text-align: center;
  font-size: var(--font-size-xs);
  padding-top: var(--space-5);
  color: rgba(255, 255, 255, 0.7);
  max-width: 1200px;
  margin: 0 auto;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .footer {
    padding: var(--space-12) var(--space-4) var(--space-4);
  }
  
  .footer-top {
    flex-direction: column;
    gap: var(--space-8);
  }
  
  .footer-links {
    gap: var(--space-8);
  }
  
  .footer-links > div {
    min-width: auto;
    flex: 1;
  }
}
</style>

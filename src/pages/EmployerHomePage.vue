<template>
  <div class="landing-page">
    <header class="navbar">
      <div class="logo">💼 JobHub</div>
      <nav class="nav-links">
        <router-link to="/" exact-active-class="active-link">Home</router-link>
        <JobsDropdown />
        <router-link to="/employers" exact-active-class="active-link">Employers</router-link>
      </nav>
      <div class="auth-buttons">
        <router-link to="/login" class="sign-in">Sign In</router-link>
        <router-link to="/create-account" class="sign-up">Sign Up</router-link>
      </div>
    </header>

    <section class="employer-hero">
      <div class="hero-text">
        <h1 class="tagline">Hire the Best Talent <span class="handwritten">Faster</span></h1>
        <p>Connect with over <strong>500,000</strong> pre‑screened professionals. Use AI-powered matching to find your perfect candidate in days, not months.</p>
        <div class="hero-buttons">
          <button class="btn primary">Post a Job Now</button>
          <button class="btn outline">Explore Talent Pool</button>
        </div>
        <div class="hero-stats">
          <div><strong>10K+</strong> Active Employers</div>
          <div><strong>500K+</strong> Quality Candidates</div>
          <div><strong>95%</strong> Successful Hires</div>
          <div><strong>60%</strong> Faster Hiring</div>
        </div>
      </div>
      <div class="hero-image">
        <!-- Replace with actual image -->
        <img src="../assets/employee.jpg" alt="Employer happy direct hire">
      </div>
    </section>

    <section class="why-choose">
      <h2>Why Choose JobHub for Hiring?</h2>
      <p>Join thousands of companies that have transformed their hiring process with our platform.</p>
      <ul class="features-list">
        <li><strong>AI‑Driven Matching</strong><br>Advanced algorithms that surface top-fit candidates.</li>
        <li><strong>Fast Turnaround</strong><br>Cut time-to-hire by up to 60%.</li>
        <li><strong>Trusted Professionals</strong><br>All profiles pre-screened for skills and experience.</li>
        <li><strong>24/7 Support</strong><br>We're here whenever you need us.</li>
      </ul>
    </section>

    <section class="how-it-works">
      <h2>How It Works</h2>
      <p>Get started with hiring in three simple steps. It's that easy.</p>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Post Your Job</h3>
          <p>Create detailed job postings with our easy-to-use builder in under 5 minutes.</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Find Candidates</h3>
          <p>Browse our talent pool or let our AI recommend the best matches for your role.</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Hire with Confidence</h3>
          <p>Use our analytics and interview tools to make informed hiring decisions.</p>
        </div>
      </div>
    </section>

    <section class="employer-features">
      <h2>Powerful Features for Employers</h2>
      <p>Everything you need to streamline your hiring process and find the right talent.</p>
      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">🏢</div>
          <h4>Company Branding</h4>
          <p>Customize your company profile to attract top talent with your brand story.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">⚡</div>
          <h4>Instant Notifications</h4>
          <p>Get real-time alerts when qualified candidates apply to your positions.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🛡️</div>
          <h4>Verified Profiles</h4>
          <p>All candidates go through identity verification and skill assessments.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🌐</div>
          <h4>Global Reach</h4>
          <p>Access talent from around the world with our international job board.</p>
        </div>
      </div>
    </section>

    <section class="testimonials">
      <h2>Trusted by Leading Companies</h2>
      <p>See what our clients say about their hiring success with JobHub.</p>
      <div class="testimonial-cards">
        <div class="testimonial-card">
          <div class="stars">⭐⭐⭐⭐⭐</div>
          <p><em>"JobHub helped us fill 15 positions in just 2 months. The quality of candidates exceeded our expectations."</em></p>
          <div class="person">
            <img src="https://img.icons8.com/color/48/company.png" alt="avatar" />
            <div>
              <strong>Sarah Johnson</strong><br />
              <small>Head of Talent Acquisition<br /><a href="#">TechCorp Inc.</a></small>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="stars">⭐⭐⭐⭐⭐</div>
          <p><em>"The AI matching system is incredibly accurate. We’ve seen a 40% improvement in candidate fit."</em></p>
          <div class="person">
            <img src="https://img.icons8.com/color/48/rocket.png" alt="avatar" />
            <div>
              <strong>Michael Chen</strong><br />
              <small>CTO<br /><a href="#">InnovateLabs</a></small>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="stars">⭐⭐⭐⭐⭐</div>
          <p><em>"From posting to hiring, JobHub streamlined our entire recruitment process. Highly recommended!"</em></p>
          <div class="person">
            <img src="https://img.icons8.com/color/48/businesswoman.png" alt="avatar" />
            <div>
              <strong>Emma Davis</strong><br />
              <small>HR Director<br /><a href="#">GrowthStart</a></small>
            </div>
          </div>
        </div>
      </div>
    </section>


    <footer class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">💼 <strong>JobHub</strong></div>
          <p>Empowering employers to connect with top-tier professionals globally.</p>
        </div>

        <div class="footer-links">
          <div>
            <h4>For Employers</h4>
            <a href="#">Post a Job</a>
            <a href="#">Find Candidates</a>
            <a href="#">Employer Branding</a>
            <a href="#">Pricing</a>
          </div>
          <div>
            <h4>For Job Seekers</h4>
            <a href="#">Browse Jobs</a>
            <a href="#">Career Advice</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        © 2025 JobHub. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
import JobsDropdown from '../components/JobsDropDown.vue';

export default {
  name: 'EmployerHomePage',
  components: {
    JobsDropdown
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.landing-page {
  font-family: 'Inter', sans-serif;
  color: #2a2a2a;
  background: linear-gradient(to bottom, #f9fbfd, #fff);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: #fff;
  border-bottom: 1px solid #eaecef;
}

.logo { font-weight: 700; color: #2d6cff; font-size: 24px; }

.nav-links a {
  margin: 0 20px;
  color: #333;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links .active-link { color: #2d6cff; }

.auth-buttons .sign-in { margin-right: 15px; font-weight: 600; color: #333; }
.auth-buttons .sign-in:hover { color: #2d6cff; }

.auth-buttons .sign-up {
  background: #2d6cff;
  color: #fff;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
}

.auth-buttons .sign-up:hover { background: #1c4fcf; }

.hero-text {
  max-width: 600px;
}

.employer-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 60px;
}

.employer-hero h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
}

.employer-hero h1 span { color: #2d6cff; }

.employer-hero p {
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
}

.hero-buttons .btn {
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-right: 15px;
  margin-bottom: 20px;
}

.btn.primary {
  background: #2d6cff;
  color: #fff;
}

.btn.primary:hover {
  background: #1c4fcf;
}

.btn.outline {
  background: white;
  color: #2d6cff;
  border: 2px solid #2d6cff;
}

.btn.outline:hover {
  background: #f0f4ff;
}

.hero-stats {
  display: flex;
  gap: 40px;
  font-size: 16px;
  margin-top: 30px;
}

.hero-stats strong {
  display: block;
  font-size: 22px;
  color: #2d6cff;
}

.hero-image img {
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.why-choose {
  text-align: center;
  padding: 40px 60px;
}

.why-choose h2 {
  font-size: 32px;
  margin-bottom: 15px;
}

.why-choose p {
  color: #666;
  margin-bottom: 40px;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  text-align: left;
}

.features-list li strong {
  color: #2d6cff;
  display: block;
  margin-bottom: 10px;
}

.footer {
  background: #2d6cff;
  color: #fff;
  padding: 60px 40px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 40px;
}

.footer-logo { font-size: 20px; font-weight: bold; margin-bottom: 10px; }

.footer-links h4 { margin-bottom: 10px; }
.footer-links a {
  display: block;
  color: #e0e0e0;
  text-decoration: none;
  margin-bottom: 6px;
}

.footer-links a:hover {
  color: #fff;
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  font-size: 13px;
}

.footer-brand {
  max-width: 300px;
  flex-shrink: 0;
}

.footer-links {
  display: flex;
  justify-content: flex-end;
  gap: 60px;
}

.footer-links > div {
  min-width: 150px;
}

.handwritten {
  font-family: 'Satisfy', cursive;
  font-size: 30px;
  color: #2d6cff; /* Keep the same blue or adjust */
  display: inline-block;
  margin-top: 10px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
  font-size: larger;
}

.tagline {
  opacity: 0;
  transform: scale(0.8);
  animation: zoomIn 0.6s ease-out forwards;
  animation-delay: 0.2s;
}

@keyframes zoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.how-it-works {
  text-align: center;
  padding: 40px 60px;
}

.how-it-works h2 {
  font-size: 30px;
  margin-bottom: 10px;
}

.how-it-works p {
  color: #666;
  margin-bottom: 40px;
}

.steps {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.step {
  max-width: 250px;
  text-align: center;
}

.step-number {
  background: #2d6cff;
  color: #fff;
  width: 50px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  border-radius: 50%;
  margin: 0 auto 15px;
}

.step h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.step p {
  color: #555;
  font-size: 15px;
}

.employer-features {
  background: #f8f9fc;
  text-align: center;
  padding: 40px 60px;
}

.employer-features h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.employer-features p {
  color: #666;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
}

.feature {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  text-align: center;
}

.feature-icon {
  font-size: 30px;
  color: #2d6cff;
  margin-bottom: 15px;
}

.testimonials {
  text-align: center;
  padding: 40px 60px;
  background: #fff;
}

.testimonials h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.testimonials p {
  color: #555;
  margin-bottom: 40px;
}

.testimonial-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  text-align: left;
  position: relative;
}

.testimonial-card .stars {
  color: #f4c150;
  font-size: 18px;
  margin-bottom: 12px;
}

.testimonial-card em {
  color: #444;
  font-style: italic;
}

.person {
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
}

.person img {
  width: 40px;
  height: 40px;
}

.person strong {
  color: #111;
  font-weight: 700;
}

.person small {
  color: #555;
  line-height: 1.2;
}

.person a {
  color: #2d6cff;
  text-decoration: none;
}

.person a:hover {
  text-decoration: underline;
}

</style>

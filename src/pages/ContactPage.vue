<template>
  <div class="contact-page">
    <header class="navbar">
      <div class="logo">💼 JobHub</div>
      <nav class="nav-links">
        <router-link to="/" exact-active-class="active-link">Home</router-link>
        <JobsDropdown />
        <router-link to="/employers" exact-active-class="active-link">Employers</router-link>
      </nav>
    </header>

    <section class="contact-hero">
      <div class="hero-content">
        <h1>Get In Touch</h1>
        <p class="subtitle">We're here to help. Whether you have a question about our features, pricing, or anything else, our team is ready to answer all your questions.</p>
      </div>
    </section>

    <div class="contact-main-grid glass-section">
      <div class="contact-form-container">
        <h3>Send us a Message</h3>
        <form @submit.prevent="handleFormSubmit">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" v-model="formData.name" required placeholder="Priya Sharma">
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="formData.email" required placeholder="priya.sharma@example.com">
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <select id="subject" v-model="formData.subject" required>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="feedback">Feedback & Suggestions</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model="formData.message" required placeholder="Write your message here..."></textarea>
          </div>
          <button type="submit" class="btn primary">Send Message</button>
        </form>
      </div>

      <div class="contact-details-container">
        <h3>Contact Information</h3>
        <div class="contact-info-item">
          <span class="icon">📍</span>
          <div>
            <strong>Address</strong>
            <p>JobHub HQ, 5th Floor, WeWork Futura, Magarpatta Road, Hadapsar, Pune, Maharashtra 411028, India</p>
          </div>
        </div>
        <div class="contact-info-item">
          <span class="icon">✉️</span>
          <div>
            <strong>Email Us</strong>
            <p>support@jobhub.com</p>
          </div>
        </div>
        <div class="contact-info-item">
          <span class="icon">📞</span>
          <div>
            <strong>Call Us</strong>
            <p>+91 20 4856 7890</p>
          </div>
        </div>

        <div class="office-hours">
          <h4>Office Hours <span class="live-dot">●</span><span class="live-text">We're available now</span></h4>
          <p>Monday - Friday: 10:00 AM - 6:00 PM (IST)</p>
          <p>Saturday & Sunday: Closed</p>
        </div>
      </div>
    </div>

    <section class="faq-section glass-section">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-container">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
          <div class="faq-question" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="chevron" :class="{ 'rotated': faq.open }"></span>
          </div>
          <transition name="expand">
            <div v-if="faq.open" class="faq-answer-container">
              <div class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

<section class="map-section glass-section">
  <h2>Our Location</h2>
  <div class="map-container">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.028260456249!2d73.91617941540194!3d18.5275116874315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1e8d8de181d%3A0x83e2f3997619488d!2sWeWork%20-%20Futura!5e0!3m2!1sen!2sin!4v1691122155123!5m2!1sen!2sin"
      width="600"
      height="450"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</section>

  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: 'general',
        message: ''
      },
      faqs: [
        {
          question: 'How do I post a job listing?',
          answer: 'Employers can post a job by navigating to the "Post a Job" page after signing up for an employer account. Our easy-to-use form will guide you through the process in minutes.',
          open: false
        },
        {
          question: 'What are the subscription costs?',
          answer: 'We offer various plans, including a Basic free plan, a Pro plan with advanced features, and custom Enterprise solutions. You can view all details on our Employers page under the "Pricing" section.',
          open: false
        },
        {
          question: 'How do I apply for a job?',
          answer: 'To apply for a job, simply click on the job listing you are interested in and hit the "Apply Now" button. You will be prompted to submit your resume and a cover letter if required.',
          open: false
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Absolutely. We use industry-standard encryption and security protocols to protect all user data. Your privacy is our top priority. Please refer to our Privacy Policy for more details.',
          open: false
        }
      ]
    };
  },
  methods: {
    handleFormSubmit() {
      // In a real application, you would send this data to a backend server.
      console.log('Form Submitted:', this.formData);
      alert(`Thank you for your message, ${this.formData.name}! We will get back to you shortly.`);
      // Reset form
      this.formData = { name: '', email: '', subject: 'general', message: '' };
    },
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Basic Page & Background Setup */
.contact-page {
  font-family: 'Inter', sans-serif;
  color: #2a2a2a;
  background: linear-gradient(-45deg, #e0f0ff, #f3eaff, #d1e3ff, #f0f8ff);
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
.contact-hero {
  padding: 80px 60px;
  text-align: center;
}
.contact-hero h1 {
  font-size: 52px;
  font-weight: 700;
  margin-bottom: 15px;
}
.contact-hero .subtitle {
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
  color: #333;
  line-height: 1.6;
}

/* Glass Section Base Style */
.glass-section {
  margin: 0 60px 40px;
  border-radius: 24px;
  padding: 50px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}
.glass-section h2 {
  font-size: 32px;
  margin-bottom: 40px;
  text-align: center;
}

/* Main Contact Grid */
.contact-main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
}

/* Contact Form */
.contact-form-container h3, .contact-details-container h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
}
.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none;
  border-color: #2d6cff;
  box-shadow: 0 0 0 3px rgba(45, 108, 255, 0.2);
}

/* Contact Details */
.contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 25px;
}
.contact-info-item .icon {
  font-size: 24px;
  margin-top: 4px;
  color: #2d6cff;
}
.contact-info-item strong {
  display: block;
  font-size: 16px;
  font-weight: 600;
}
.contact-info-item p {
  margin: 4px 0 0;
  color: #555;
  line-height: 1.5;
}

.office-hours {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.office-hours h4 { font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; }
.office-hours p { margin: 5px 0 0; color: #555; }
.live-dot { color: #28a745; font-size: 24px; margin: 0 5px; animation: pulse 1.5s infinite; }
.live-text { font-size: 12px; font-weight: 600; color: #28a745; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }


/* FAQ Section */
.faq-container { max-width: 800px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid rgba(0,0,0,0.1); }
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
}
.chevron {
  display: inline-block;
  width: 20px; height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232d6cff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: contain;
  transition: transform 0.4s ease;
}
.chevron.rotated { transform: rotate(180deg); }
.faq-answer-container { overflow: hidden; }
.faq-answer { padding-bottom: 20px; }
.faq-answer p { color: #555; line-height: 1.7; margin: 0; }

/* Map Section */
/* NEW MAP STYLE */
.map-container {
    width: 100%;
    height: 450px; /* You can adjust the height */
    border-radius: 16px;
    overflow: hidden; /* This is important to make the border-radius work on the iframe */
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.map-container iframe {
    width: 100%;
    height: 100%;
    border: 0;
}

/* General Button Style */
.btn.primary {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: #2d6cff;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn.primary:hover {
  background: #1c4fcf;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(45, 108, 255, 0.3);
}

/* Responsive Grid */
@media (max-width: 992px) {
  .contact-main-grid {
    grid-template-columns: 1fr;
  }
}

/* Expansion Transition for FAQ */
.expand-enter-active, .expand-leave-active {
  transition: grid-template-rows 0.5s ease, opacity 0.3s ease-out;
}
.expand-enter-from, .expand-leave-to {
  grid-template-rows: 0fr; opacity: 0;
}
.expand-enter-to, .expand-leave-from {
  grid-template-rows: 1fr; opacity: 1;
}
.faq-answer-container {
  display: grid;
  grid-template-rows: 1fr;
}
</style>
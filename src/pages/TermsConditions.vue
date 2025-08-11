<template>
  <div class="terms-page">
    <AppHeader />

    <main class="content-container q-pa-md">
      <div class="text-center q-mb-xl">
        <h1 class="page-title">Terms and Conditions</h1>
        <p class="text-grey-7">Last Updated: August 6, 2025</p>
      </div>

      <div class="terms-content">
        <p class="intro">
          Welcome to JobHub! These terms and conditions outline the rules and regulations for the use of JobHub's Website, located at jobhub.com. By accessing this website, we assume you accept these terms and conditions. Do not continue to use JobHub if you do not agree to all of the terms and conditions stated on this page.
        </p>

        <section>
          <h3>1. Acceptance of Terms</h3>
          <p>By creating an account or by using the JobHub platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you are using our Services on behalf of a company or other entity, you represent that you have the authority to bind such entity to these Terms.</p>
        </section>

        <section>
          <h3>2. User Accounts</h3>
          <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
        </section>

        <section>
          <h3>3. User Conduct and Responsibilities</h3>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Post any content that is unlawful, fraudulent, defamatory, or obscene.</li>
            <li>Post any job listings that are not for legitimate, bona fide employment opportunities.</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Distribute spam, unsolicited communications, or any other content that violates our policies.</li>
          </ul>
        </section>

        <section>
          <h3>4. Intellectual Property</h3>
          <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of JobHub and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of JobHub.</p>
        </section>

        <section>
          <h3>5. Disclaimers and Limitation of Liability</h3>
          <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. JobHub makes no warranties, expressed or implied, regarding the operation of the service or the information, content, or materials included therein. We do not warrant that job listings are accurate or that you will receive any employment or job offers through the Service. In no event shall JobHub be liable for any damages arising from the use of this website.</p>
        </section>

        <section>
          <h3>6. Termination</h3>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>
        </section>

        <section>
          <h3>7. Governing Law</h3>
          <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
        </section>
        
        <section>
          <h3>8. Changes to Terms</h3>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
        </section>

        <section>
          <h3>9. Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@jobhub.com">support@jobhub.com</a>.</p>
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/HeaderPart.vue';
import AppFooter from '../components/FooterPart.vue';

export default {
  name: 'TermsConditions',
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style scoped>
.terms-page {
  background-color: #f9fbfd;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #333;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
}

.page-title {
  font-size: 40px;
  font-weight: 700;
  color: #1565c0;
}

.terms-content {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  line-height: 1.7;
}

.terms-content section {
  margin-bottom: 30px;
}

.terms-content h3 {
  font-size: 22px;
  font-weight: 600;
  color: #1d2b53;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eaecef;
}

.terms-content p, .terms-content li {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

.terms-content ul {
  padding-left: 20px;
}

.terms-content a {
  color: #1565c0;
  text-decoration: none;
  font-weight: 600;
}

.terms-content a:hover {
  text-decoration: underline;
}

.intro {
  font-size: 1.1rem;
  font-style: italic;
  color: #444;
  margin-bottom: 30px;
}
</style>
<template>
  <header class="navbar">
    <div class="logo">💼 JobHub</div>
    <nav class="nav-links">
      <router-link to="/" exact-active-class="active-link">Home</router-link>
      <JobsDropDown />
      <router-link to="/employers" exact-active-class="active-link">Employers</router-link>
    </nav>
    <div class="auth-buttons">
      <router-link to="/login" class="sign-in">Sign In</router-link>
      <router-link to="/create-account" class="sign-up">Sign Up</router-link>
    </div>
  </header>
</template>

<script>
import JobsDropDown from './JobsDropDown.vue';

export default {
  components: { JobsDropDown }
};
</script>

<style scoped>
/* Your navbar styles copied from original file */
.navbar { display: flex; justify-content: space-between; padding: 20px 60px; align-items: center; background-color: #fff; border-bottom: 1px solid #eaecef; }
.logo { font-weight: 700; color: #2d6cff; font-size: 24px; }
.nav-links a { margin: 0 20px; color: #333; font-weight: 500; text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: #2d6cff; }
.auth-buttons .sign-in { margin-right: 15px; font-weight: 600; color: #333; text-decoration: none; }
.auth-buttons .sign-in:hover { color: #2d6cff; }
.auth-buttons .sign-up { background-color: #2d6cff; color: white; padding: 8px 20px; border-radius: 6px; font-weight: 600; text-decoration: none; transition: background 0.3s; }
.auth-buttons .sign-up:hover { background-color: #1c4fcf; }
.nav-links .active-link { position: relative; color: #2d6cff; font-weight: 700; transition: color 0.3s ease; }
.nav-links .active-link::after { content: ''; position: absolute; bottom: -6px; left: 0; width: 100%; height: 2px; background-color: #2d6cff; animation: slideIn 0.3s ease-out forwards; }
@keyframes slideIn { 0% { width: 0; opacity: 0; } 100% { width: 100%; opacity: 1; } }
</style>

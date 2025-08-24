<script setup>
import { ref } from 'vue'
import logo from '../assets/logo.png'
import ForgotPassword from './ForgotPassword.vue'

const showForgotPassword = ref(false)

const email = ref('')
const password = ref('')

const submitLogin = () => {
  if (!email.value || !password.value) {
    alert('Please enter both email/username and password.')
    return
  }

  const isEmail = email.value.includes('@')
  const loginType = isEmail ? 'email' : 'username'
  alert(`Logging in with ${loginType}: ${email.value}`)
}
</script>

<template>
  <div class="page">
    <div class="logo-container">
      <img :src="logo" alt="READiculous Logo" class="logo" />
    </div>

    <div class="auth-box" v-if="!showForgotPassword">
      <h2>Login</h2>
      <form @submit.prevent="submitLogin">
        <div class="input-group">
          <input v-model="email" type="text" placeholder="Email or Username" required />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn">Login</button>
      </form>

      <p class="forgot-link">
        <a href="#" @click.prevent="showForgotPassword = true">Forgot Password?</a>
      </p>
    </div>

    <ForgotPassword v-else @back="showForgotPassword = false" />
  </div>
</template>


<style scoped>
.page {
  font-family: 'Segoe UI', sans-serif;
  background: #ffffff;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo {
  height: 120px;
}

.auth-box {
  background-color: #f9f9f9;
  padding: 3rem 4rem;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  width: 500px;
  max-width: 95%;
  text-align: center;
}

.auth-box h2 {
  color: #111;
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  color: #333;
  display: block;
}

input {
  width: 100%;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f0f0f0;
  font-size: 1rem;
  color: #000000;
}

small.error {
  color: #cc0000;
  font-size: 0.8rem;
  display: block;
  margin-top: 0.3rem;
}

.submit-btn {
  margin-top: 1.5rem;
  padding: 0.8rem;
  background-color: #000000;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
}

.submit-btn:hover {
  background-color: #333333;
}

.toggle-text {
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
}

.forgot-password {
  margin-top: 1rem;
}

.forgot-password a {
  font-size: 0.85rem;
  color: #666;
  cursor: pointer;
}
</style>
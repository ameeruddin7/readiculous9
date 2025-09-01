<script setup>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import ForgotPassword from "@/views/ForgotPassword.vue";   //  import router

const router = useRouter()               //  create router instance

const isLogin = ref(true)
const showForgotPassword = ref(false)

const name = ref('')
const surname = ref('')
const username = ref('')
const contact = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Password strength: at least 8 characters, one number, one uppercase, one lowercase
const isPasswordStrong = computed(() =>
    /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/.test(password.value)
)

const doPasswordsMatch = computed(() =>
    password.value === confirmPassword.value
)

const toggleForm = () => {
  isLogin.value = !isLogin.value
  showForgotPassword.value = false
  name.value = ''
  surname.value = ''
  username.value = ''
  contact.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}

const submitForm = () => {
  if (!email.value || !password.value || (!isLogin.value && (!name.value || !surname.value || !username.value || !contact.value || !confirmPassword.value))) {
    alert('Please fill in all required fields.')
    return
  }

  if (!isLogin.value) {
    // Signup
    if (!isPasswordStrong.value) {
      alert('Password must be at least 8 characters long and include a number, an uppercase, and a lowercase letter.')
      return
    }

    if (!doPasswordsMatch.value) {
      alert('Passwords do not match.')
      return
    }

    alert('Signing up as ${username.value} with email ${email.value}')
  } else {
    // Login
    const isEmail = email.value.includes('@')
    const loginType = isEmail ? 'email' : 'username'

    //  You can remove the alert if you don’t want it
    alert('Logging in with ${loginType}: ${email.value}')

    //  after successful login, go to Library page
    router.push('/library')
  }
}
</script>

<template>
  <div class="page">
    <div class="logo-container">
      <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />
    </div>

    <div class="auth-box" v-if="!showForgotPassword">
      <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>

      <form @submit.prevent="submitForm">
        <template v-if="!isLogin">
          <div class="form-group">
            <label>Name</label>
            <input v-model="name" type="text" required/>
          </div>

          <div class="form-group">
            <label>Surname</label>
            <input v-model="surname" type="text" required/>
          </div>

          <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" required/>
          </div>

          <div class="form-group">
            <label>Contact Number</label>
            <input v-model="contact" type="tel" required/>
          </div>
        </template>

        <div class="form-group">
          <label>{{ isLogin ? 'Username or Email' : 'Email' }}</label>
          <input v-model="email" :type="isLogin ? 'text' : 'email'" required/>
        </div>

        <div class="form-group">
          <label>{{ isLogin ? 'Password' : 'Create Password' }}</label>
          <input v-model="password" type="password" required/>
          <small v-if="!isLogin && password && !isPasswordStrong" class="error">
            Password must be at least 8 characters long, include a number, an uppercase and a lowercase letter.
          </small>
        </div>

        <div class="form-group" v-if="!isLogin">
          <label>Confirm Password</label>
          <input v-model="confirmPassword" type="password" required/>
          <small v-if="confirmPassword && !doPasswordsMatch" class="error">
            Passwords do not match.
          </small>
        </div>

        <button type="submit" class="submit-btn">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      </form>

      <p class="toggle-text" @click="toggleForm">
        {{ isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login" }}
      </p>

      <p v-if="isLogin" class="forgot-password">
        <a @click.prevent="showForgotPassword = true" href="#">Forgot password?</a>
      </p>
    </div>

    <ForgotPassword v-else @back="showForgotPassword = false"/>
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
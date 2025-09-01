<template>
  <div class="signup-page">
    // Background image (books theme)
    <div class="background"></div>

    <div class="signup-container">
      <h1>Join READiculous</h1>
      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" v-model="fullName" placeholder="Enter your full name" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm your password" required />
        </div>

        <button type="submit" class="signup-btn">Sign Up</button>
      </form>

      <p class="login-link">
        Already a reader? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const router = useRouter();

const handleSubmit = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  const userData = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  };

  console.log("User signed up:", userData);

  router.push('/login');
};
</script>

<style scoped>
.signup-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

/* Background books image (replace with your own) */
./* Background books image (replace with your own) */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/READiculous-background.jpeg') no-repeat center center/cover;
  filter: blur(8px) brightness(0.6);
  z-index: -1;
}

.signup-container {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.signup-form input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #ffffff;
  color: #333;
}

.signup-form input::placeholder {
  color: #999;
  opacity: 1;  /* ensure placeholder is visible */
}

</style>
<template>
  <div class="page">
    <div class="logo-container">
      <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />
    </div>

    <div class="auth-box" v-if="!showForgotPassword">
      <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>

      <form @submit.prevent="submitForm">
        <!-- Extra fields for signup -->
        <template v-if="!isLogin">
          <div class="form-group">
            <label>First Name</label>
            <input v-model="name" type="text" placeholder="Enter your first name" required />
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input v-model="lastName" type="text" placeholder="Enter your last name" required />
          </div>

          <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" placeholder="Choose a username" required />
          </div>

          <div class="form-group">
            <label>Contact Number</label>
            <input v-model="contact" type="tel" placeholder="Enter your contact number" required />
          </div>
        </template>

        <div class="form-group">
          <label>{{ isLogin ? 'Username or Email' : 'Email' }}</label>
          <input v-model="email" :type="isLogin ? 'text' : 'email'" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label>{{ isLogin ? 'Password' : 'Create Password' }}</label>
          <input v-model="password" type="password" placeholder="Enter password" required />
          <small v-if="!isLogin && password && !isPasswordStrong" class="error">
            Password must be at least 8 characters, include a number, uppercase & lowercase.
          </small>
        </div>

        <div class="form-group" v-if="!isLogin">
          <label>Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="Confirm password" required />
          <small v-if="confirmPassword && !doPasswordsMatch" class="error">
            Passwords do not match.
          </small>
        </div>

        <button type="submit" class="submit-btn">
          {{ isLogin ? 'Login' : 'Sign Up' }}
        </button>
      </form>

      <p class="toggle-text" @click="toggleForm">
        {{ isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login" }}
      </p>

      <p v-if="isLogin" class="forgot-password">
        <a @click.prevent="showForgotPassword = true" href="#">Forgot password?</a>
      </p>
    </div>

    <ForgotPassword v-else @back="showForgotPassword = false" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import ForgotPassword from "@/views/ForgotPassword.vue";
import axios from "axios";

const router = useRouter();

const isLogin = ref(true);
const showForgotPassword = ref(false);

const name = ref("");
const lastName = ref("");
const username = ref("");
const contact = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isPasswordStrong = computed(() =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.value)
);

const doPasswordsMatch = computed(() => password.value === confirmPassword.value);

const toggleForm = () => {
  isLogin.value = !isLogin.value;
  showForgotPassword.value = false;
  name.value = "";
  lastName.value = "";
  username.value = "";
  contact.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};

const submitForm = async () => {
  if (
      !email.value ||
      !password.value ||
      (!isLogin.value && (!name.value || !lastName.value || !username.value || !contact.value || !confirmPassword.value))
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    if (!isLogin.value) {
      if (!isPasswordStrong.value) {
        alert("Password must be strong.");
        return;
      }
      if (!doPasswordsMatch.value) {
        alert("Passwords do not match.");
        return;
      }

      await axios.post("http://localhost:8080/api/User/create", {
        name: name.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        password: password.value,
        contact: contact.value,
      });

      alert("Signup successful!");
      isLogin.value = true;
    } else {
      const response = await axios.post("http://localhost:8080/api/User/login", {
        email: email.value,
        password: password.value,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Login successful!");
      router.push("/library");
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Something went wrong.");
  }
};
</script>

<style scoped>
.page {
  font-family: "Segoe UI", sans-serif;
  background: #f0f2f5;
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
  height: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.auth-box {
  background-color: #ffffff;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

.auth-box h2 {
  color: #111;
  font-size: 2rem;
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
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  font-size: 1rem;
  color: #000;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #42b883;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

small.error {
  color: #cc0000;
  font-size: 0.8rem;
  display: block;
  margin-top: 0.3rem;
}

.submit-btn {
  margin-top: 1.5rem;
  padding: 0.9rem;
  background-color: #42b883;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #369d6b;
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
  color: #42b883;
  cursor: pointer;
  text-decoration: underline;
}
</style>

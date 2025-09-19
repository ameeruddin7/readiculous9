<template>
  <div class="profile-page">
    <h1>👤 My Profile</h1>

    <!-- User Account Info -->
    <section class="profile-card">
      <div class="avatar-container">
        <img :src="user.avatar" alt="Profile Picture" class="avatar" />
      </div>
      <div class="info">
        <h2>{{ user.name }} {{ user.surname }}</h2>
        <p class="email">{{ user.email }}</p>
      </div>
    </section>

    <!-- Preferences -->
    <section class="preferences-card">
      <h2>📚 My Reading Preferences</h2>
      <ul>
        <li><strong>Favorite Genre:</strong> {{ preferences.genre }}</li>
        <li><strong>Reading Frequency:</strong> {{ preferences.frequency }}</li>
        <li><strong>Preferred Format:</strong> {{ preferences.format }}</li>
      </ul>
    </section>

    <!-- Only Edit Profile Button -->
    <div class="actions">
      <button @click="goToPreferencepage">Edit Profile</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// Hardcoded user info
const user = reactive({
  name: "Ameeruddin",
  surname: "Arai",
  email: "ameeruddin.arai@example.com",
  avatar: "https://i.pravatar.cc/150?img=12"
})

// Hardcoded preferences
const preferences = reactive({
  genre: "Science Fiction",
  frequency: "Weekly",
  format: "E-Books"
})

// redirect to preferences page
function goToPreferences() {
  router.push("/preferences") // make sure this route exists
}
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.profile-card, .preferences-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.preferences-card h2 {
  margin-bottom: 0.5rem;
  color: #4a2c2a;
}

.preferences-card ul {
  list-style: none;
  padding: 0;
}

.actions button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background: #42b883;
  color: white;
  font-weight: bold;
  transition: background 0.3s;
}

.actions button:hover {
  background: #2c8a68;
}
</style>

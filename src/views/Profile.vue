<template>
  <div class="profile-page" v-if="user">
    <!-- User Account Info -->
    <section class="profile-card">
      <div class="avatar-container">
        <img
            v-if="previewImage || user.avatar"
            :src="previewImage || user.avatar"
            alt="Profile Picture"
            class="avatar"
        />
        <input type="file" accept="image/*" @change="handleFileUpload" />
      </div>

      <div class="info">
        <input v-model="user.name" placeholder="First Name" />
        <input v-model="user.surname" placeholder="Last Name" />
        <input v-model="user.email" placeholder="Email" />
      </div>
    </section>

    <!-- Preferences -->
    <section class="preferences-card">
      <h2>📚 My Reading Preferences</h2>
      <label>
        Favorite Genre:
        <select v-model="preferences.genre">
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Romance</option>
          <option>Science Fiction</option>
          <option>Fantasy</option>
          <option>Mystery</option>
          <option>Biography</option>
        </select>
      </label>
      <label>
        Reading Frequency:
        <select v-model="preferences.frequency">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </label>
      <label>
        Preferred Format:
        <select v-model="preferences.format">
          <option>E-Books</option>
          <option>Print Books</option>
          <option>Audiobooks</option>
        </select>
      </label>
    </section>

    <!-- Actions -->
    <div class="actions">
      <button @click="savePreferences">💾 Save Preferences</button>
      <button @click="goToPreferences">✏️ Edit Preferences Page</button>
    </div>
  </div>

  <div v-else class="loading">
    <p>Loading profile...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

const router = useRouter()
const user = ref(null)
const preferences = ref({ genre: "", frequency: "", format: "" })
const previewImage = ref(null)
const userId = 1 // replace with logged-in user ID from your auth flow

// Load user profile and preferences
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/User/read/${userId}`)
    user.value = response.data

    // Load preferences from backend if available
    preferences.value = response.data.preferences || {
      genre: "Fiction",
      frequency: "Weekly",
      format: "Print Books"
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
  }
})

// Handle avatar upload and preview
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    previewImage.value = URL.createObjectURL(file)
    const reader = new FileReader()
    reader.onload = () => {
      user.value.avatar = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// Save only preferences to backend
async function savePreferences() {
  try {
    const payload = {
      userId,
      genre: preferences.value.genre,
      frequency: preferences.value.frequency,
      format: preferences.value.format
    }

    await axios.put("http://localhost:8080/api/UserPreference/update", payload)
    localStorage.setItem("preferences", JSON.stringify(preferences.value)) // update local storage too
    alert("✅ Preferences updated successfully!")
  } catch (error) {
    console.error("Error updating preferences:", error)
    alert("❌ Failed to update preferences.")
  }
}

// Navigate to preference page
function goToPreferences() {
  router.push({ name: "preference" })
}
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

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

input, select {
  display: block;
  margin: 0.5rem auto;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  width: 90%;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
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

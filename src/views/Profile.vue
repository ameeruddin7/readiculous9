<template>
  <div class="profile-page" v-if="user">


    <!-- User Account Info -->
    <section class="profile-card">
      <div class="avatar-container">
        <!-- Show preview or saved avatar -->
        <img
            v-if="previewImage || user.avatar"
            :src="previewImage || user.avatar"
            alt="Profile Picture"
            class="avatar"
        />

        <!-- Upload new picture -->
        <input type="file" accept="image/*" @change="handleFileUpload" />
      </div>

      <div class="info">
        <input v-model="user.name" placeholder="First Name" />
        <input v-model="user.surname" placeholder="Last Name" />
        <input v-model="user.email" placeholder="Email" />
      </div>
    </section>

    <!-- Preferences -->
    <section class="preferences-card" v-if="preferences">
      <h2>📚 My Reading Preferences</h2>
      <label>
        Favorite Genre:
        <input v-model="preferences.genre" />
      </label>
      <label>
        Reading Frequency:
        <input v-model="preferences.frequency" />
      </label>
      <label>
        Preferred Format:
        <input v-model="preferences.format" />
      </label>
    </section>

    <!-- Actions -->
    <div class="actions">
      <button @click="saveProfile">💾 Save Profile</button>
      <button @click="goToPreferences">Edit Preferences Page</button>
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
const preferences = ref(null)
const previewImage = ref(null) // <-- NEW for preview

const userId = 1 // Hardcoded for now

// Fetch user profile on load
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/User/read/${userId}`)
    user.value = response.data
    preferences.value = response.data.preferences || {}
  } catch (error) {
    console.error("Error fetching user profile:", error)
  }
})

// Handle file upload and preview
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    // Show preview
    previewImage.value = URL.createObjectURL(file)

    // Convert to Base64 (to save in backend if needed)
    const reader = new FileReader()
    reader.onload = () => {
      user.value.avatar = reader.result // store base64 in user object
    }
    reader.readAsDataURL(file)
  }
}

// Save updated profile
async function saveProfile() {
  try {
    const payload = {
      ...user.value,
      preferences: preferences.value
    }

    const response = await axios.put(`http://localhost:8080/api/User/update`, payload)
    user.value = response.data
    previewImage.value = null // clear preview (since it’s saved now)

    alert("✅ Profile updated successfully!")
  } catch (error) {
    console.error("Error updating profile:", error)
    alert("❌ Failed to update profile.")
  }
}

function goToPreferences() {
  router.push("/preferences")
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

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

input {
  display: block;
  margin: 0.5rem auto;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  width: 90%;
}

.preferences-card h2 {
  margin-bottom: 0.5rem;
  color: #4a2c2a;
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

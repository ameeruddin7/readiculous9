<template>
  <div class="page">
    <div class="background"></div>

    <!-- Club Creation Form -->
    <div v-if="!clubCreated" class="form-box">
      <h1>Create Book Club</h1>
      <form @submit.prevent="createClub">
        <label>Club Name:</label>
        <input v-model="clubName" type="text" required />

        <label>Description:</label>
        <textarea v-model="clubDescription" required></textarea>

        <button type="submit">Create Club</button>
      </form>
    </div>

    <!-- Success Popup -->
    <div v-else class="popup">
      <h2>🎉 Club Created Successfully!</h2>
      <p><strong>{{ clubName }}</strong> has been created.</p>
      <p>Your invite link:</p>
      <input type="text" readonly :value="inviteLink" />
      <br />
      <button @click="goToAdmin">Go to Admin Page</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const clubName = ref("");
const clubDescription = ref("");
const clubCreated = ref(false);
const inviteLink = ref("");

// Backend endpoint
const API_URL = "http://localhost:8080/book-club/create";

async function createClub() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.userId) {
    alert("You must be logged in to create a book club.");
    return;
  }

  // Build DTO matching backend
  const dto = {
    clubName: clubName.value.trim(),
    clubDescription: clubDescription.value.trim(),
    ownerId: Number(user.userId), // ✅ ensure Long type
  };

  console.log("📤 Sending DTO to backend:", dto);

  try {
    const response = await axios.post(API_URL, dto, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Club created:", response.data);

    inviteLink.value = `http://localhost:8080/join/${response.data.clubId}`;
    clubCreated.value = true;
  } catch (error) {
    console.error("❌ Error creating club:", error);

    if (error.response) {
      alert(`Backend Error: ${error.response.status} — Check backend logs`);
    } else if (error.request) {
      alert("Cannot reach backend. Make sure Spring Boot is running.");
    } else {
      alert("Unexpected error: " + error.message);
    }
  }
}

function goToAdmin() {
  router.push("/admin");
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f') no-repeat center center/cover;
  filter: blur(6px) brightness(0.6);
  z-index: -1;
}

.form-box {
  background: rgba(28, 26, 26, 0.85);
  border: 2px solid green;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
}

.form-box h1 {
  margin-bottom: 1rem;
  text-align: center;
}

textarea,
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.4rem;
  border: 1px solid green;
  border-radius: 10px;
  background: black;
  color: white;
}

button {
  margin: 1rem auto 0;
  display: block;
  width: 50%;
  background: black;
  border: 2px solid green;
  border-radius: 10px;
  color: green;
  padding: 0.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: green;
  color: black;
}

.popup {
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid green;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
}

.popup input {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid green;
  background: black;
  color: white;
}
</style>

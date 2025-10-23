
<template>
  <div class="page">
    <div class="background"></div>

    <div v-if="!clubCreated" class="form-box">
      <h1>Create Book Club</h1>
      <form @submit.prevent="createClub">
        <label>Club Name:</label>
        <input v-model="clubName" type="text" required />

        <label>Description:</label>
        <textarea v-model="clubDescription" required></textarea>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create Club' }}
        </button>
        <p v-if="message" :style="{ color: message.startsWith('❌') ? 'red' : 'green' }">{{ message }}</p>
      </form>
    </div>

    <div v-else class="popup">
      <h2>🎉 Club Created Successfully!</h2>
      <p><strong>{{ createdClubName }}</strong> has been created.</p>
      <p>Your invite link:</p>
      <input type="text" readonly :value="inviteLink" />
      <br />
      <button @click="goToAdmin">Go to Admin Page</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const clubName = ref("");
const clubDescription = ref("");
const clubCreated = ref(false);

// NEW: Variables to store club details after successful creation
const createdClubName = ref("");
const createdClubId = ref(null);

const inviteLink = ref("");
const message = ref("");
const loading = ref(false);

const router = useRouter();

async function createClub() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("You must be logged in");
    return;
  }

  // Use a fallback for ownerId if both 'id' and 'userId' might be used
  const ownerId = user.id || user.userId;

  if (!ownerId) {
    alert("Could not determine user ID.");
    return;
  }

  const payload = {
    clubName: clubName.value,
    clubDescription: clubDescription.value,
    ownerId: ownerId,
  };

  loading.value = true;
  message.value = ""; // Clear previous messages

  try {
    const res = await fetch("http://localhost:8080/api/book-club/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());
    const created = await res.json();

    // FIX 2: Store the created club details
    createdClubName.value = created.clubName;
    createdClubId.value = created.clubId;

    inviteLink.value = `http://localhost:8080/join/${created.clubId}`;
    message.value = `✅ Book club created successfully (ID: ${created.clubId})`;
    clubCreated.value = true;

    // Reset only the INPUT fields (clubName.value, clubDescription.value)
    // The details are now saved in createdClubName and createdClubId
    resetFormInputs();

  } catch (err) {
    console.error("Creation error:", err);
    // Attempt to parse error text if available, otherwise use a generic message
    let errorText = err.message;
    try {
      const errorData = JSON.parse(err.message);
      errorText = errorData.message || errorText;
    } catch (e) {
      // Not a JSON error message, use raw message
    }
    message.value = `❌ Error: ${errorText}`;
    clubCreated.value = false;
  } finally {
    loading.value = false;
  }
}

// Function to only reset the input fields after successful submission
function resetFormInputs() {
  clubName.value = "";
  clubDescription.value = "";
}

// FIX 3: Use the stored club ID for navigation
function goToAdmin() {
  if (createdClubId.value) {
    router.push(`/club/${createdClubId.value}/admin`);
  } else {
    alert("Club ID not found for redirection.");
  }
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

/* Background blurred image */
.background {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f') no-repeat center center/cover;
  filter: blur(6px) brightness(0.6);
  z-index: -1;
}

/* Form box */
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

label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

textarea, input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.4rem;
  border: 1px solid green;
  border-radius: 10px;
  background: black;
  color: white;
}
textarea {
  resize: vertical;
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

button:hover:not(:disabled) {
  background: green;
  color: black;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Popup modal */
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
  text-align: center;
}
</style>
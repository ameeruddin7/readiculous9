<template>
  <div class="page">
    <!-- Background overlay -->
    <div class="background"></div>

    <!-- Form (only shows before club is created) -->
    <div v-if="!clubCreated" class="form-box">
      <h1>Create Book Club</h1>
      <form @submit.prevent="createClub">
        <label>Club Name:</label>
        <input v-model="clubName" type="text" required />

        <label>Description:</label>
        <textarea v-model="description" required></textarea>

        <button type="submit">Create Club</button>
      </form>
    </div>

    <!-- Popup Modal (shows after club is created) -->
    <div v-else class="popup">
      <h2>🎉 Club Created Successfully!</h2>
      <p><strong>{{ clubName }}</strong> has been created.</p>
      <p>Your invite link:</p>
      <input type="text" readonly :value="inviteLink" />
      <br />
      <button @click="goHome">Go to Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateClub",
  data() {
    return {
      clubName: "",
      description: "",
      clubCreated: false,
      inviteLink: ""
    }
  },
  methods: {
    createClub() {
      // Normally you'd get the link from backend.
      this.clubCreated = true
      this.inviteLink = "https://bookclubapp.com/join/ABC123"
    },
    goHome() {
      this.$router.push("/") // go back home
    }
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

textarea, input {
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
}
</style>

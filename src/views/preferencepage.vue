<template>
  <div class="preferences-container">
    <div class="overlay">
      <h1>📚 Readiculous Book Club Preferences</h1>

      <form class="preferences-form">
        <label>Favorite Genre:</label>
        <select v-model="preferences.genre">
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Romance</option>
          <option>Science Fiction</option>
          <option>Fantasy</option>
          <option>Mystery</option>
          <option>Biography</option>
        </select>

        <label>Reading Frequency:</label>
        <select v-model="preferences.frequency">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>

        <label>Preferred Format:</label>
        <select v-model="preferences.format">
          <option>E-Books</option>
          <option>Print Books</option>
          <option>Audiobooks</option>
        </select>

        <button type="button" @click="savePreferences">Save Preferences</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PreferencesPage",
  data() {
    return {
      preferences: {
        genre: "Fiction",
        frequency: "Weekly",
        format: "Print Books"
      },
      userId: null
    };
  },
  methods: {
    async savePreferences() {
      if (!this.userId) {
        alert("User not logged in.");
        return;
      }

      try {
        const response = await axios.post(
            `http://localhost:8080/api/UserPreference/create`,
            {
              userId: this.userId,
              genre: this.preferences.genre,
              frequency: this.preferences.frequency,
              format: this.preferences.format
            }
        );
        alert("Preferences saved successfully!");
        console.log(response.data);
      } catch (error) {
        console.error(error);
        alert("Error saving preferences.");
      }
    },

    async loadPreferences() {
      if (!this.userId) return;
      try {
        const response = await axios.get(
            `http://localhost:8080/api/UserPreference/user/${this.userId}`
        );
        if (response.data) {
          this.preferences = {
            genre: response.data.genre,
            frequency: response.data.frequency,
            format: response.data.format
          };
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
  },
  mounted() {
    // Get userId from localStorage or your login flow
    this.userId = localStorage.getItem("userId");
    this.loadPreferences();
  }
};
</script>

<style scoped>
.preferences-container {
  background: linear-gradient(135deg, #000000, #1a1a1a, #333333);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Georgia', serif;
  color: #ffffff;
}

.overlay {
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  color: #000000;
  text-align: center;
  width: 450px;
  box-shadow: 0px 6px 15px rgba(255,255,255,0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 25px;
  color: #000000;
  text-shadow: 1px 1px 2px #cccccc;
}

.preferences-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  color: #333333;
  text-align: left;
}

select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #555555;
  outline: none;
  font-size: 15px;
  background: #f9f9f9;
  color: #000000;
}

button {
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #333333;
}
</style>

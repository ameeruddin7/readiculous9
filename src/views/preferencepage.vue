//Ameeruddin Arai 230190839
// 30 -08-2025
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
export default {
  name: "PreferencesPage",
  data() {
    return {
      preferences: {
        genre: "Fiction",
        frequency: "Weekly",
        format: "Print Books"
      }
    };
  },
  methods: {
    savePreferences() {
      alert(`Preferences Saved:
      Genre: ${this.preferences.genre}
      Frequency: ${this.preferences.frequency}
      Format: ${this.preferences.format}`);
    }
  }
};
</script>

<style scoped>
/* Solid gradient background (warm, book-club themed) */
.preferences-container {
  background: linear-gradient(135deg, #4a2c2a, #8b5e3c, #d2b48c);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Georgia', serif;
}

/* Content box */
.overlay {
  background: #fdf6ec;
  padding: 40px;
  border-radius: 15px;
  color: #333;
  text-align: center;
  width: 450px;
  box-shadow: 0px 6px 15px rgba(0,0,0,0.3);
}

h1 {
  font-size: 28px;
  margin-bottom: 25px;
  color: #4a2c2a;
  text-shadow: 1px 1px 2px #e0c9a6;
}

/* Form styling */
.preferences-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  color: #6a4e42;
  text-align: left;
}

select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #c9a66b;
  outline: none;
  font-size: 15px;
}

button {
  background: #8b5e3c;
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #6a4e42;
}
</style>

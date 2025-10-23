<template>
  <div class="preferences-container">
    <div class="overlay">
      <h1>📚 Readiculous Book Club Preferences</h1>

      <form class="preferences-form">
        <label>User ID:</label>
        <input type="number" v-model="userId" placeholder="Enter your user ID" />

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

        <button type="button" @click="saveOrUpdatePreferences" :disabled="saving">
          {{ saving ? 'Saving...' : (hasExistingPreferences ? 'Update Preferences' : 'Save Preferences') }}
        </button>
      </form>

      <!-- Success/Error Messages -->
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>

      <!-- Show Current Preferences Only After Saving/Updating -->
      <div v-if="currentPreferences" class="current-preferences">
        <h3>Your Current Preferences:</h3>
        <div class="preference-item">
          <p><strong>Genre:</strong> {{ currentPreferences.genre }}</p>
          <p><strong>Frequency:</strong> {{ currentPreferences.frequency }}</p>
          <p><strong>Format:</strong> {{ currentPreferences.format }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreferencesPage",
  data() {
    return {
      userId: null,
      preferences: {
        genre: "Fiction",
        frequency: "Weekly",
        format: "Print Books"
      },
      currentPreferences: null, // Only store the current preferences
      saving: false,
      message: '',
      messageType: 'success'
    };
  },
  computed: {
    hasExistingPreferences() {
      return this.currentPreferences !== null;
    }
  },
  methods: {
    async saveOrUpdatePreferences() {
      if (!this.userId) {
        this.showMessage('Please enter a User ID', 'error');
        return;
      }

      this.saving = true;

      try {
        const preferenceData = {
          userId: this.userId,
          genre: this.preferences.genre,
          frequency: this.preferences.frequency,
          format: this.preferences.format
        };

        let savedOrUpdatedPreference;

        // If user already has preferences, update them instead of creating new ones
        if (this.hasExistingPreferences) {
          // Use the current preference's ID to update
          preferenceData.id = this.currentPreferences.id;

          const response = await fetch('http://localhost:8080/api/UserPreference/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferenceData)
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          savedOrUpdatedPreference = await response.json();
          this.showMessage('Preferences updated successfully!', 'success');
        } else {
          // Create new preferences if none exist
          const response = await fetch('http://localhost:8080/api/UserPreference/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferenceData)
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          savedOrUpdatedPreference = await response.json();
          this.showMessage('Preferences saved successfully!', 'success');
        }

        // Set the current preferences to the newly saved/updated ones
        this.currentPreferences = savedOrUpdatedPreference;

      } catch (error) {
        console.error('Error saving/updating preferences:', error);
        this.showMessage('Failed to save preferences. Please try again.', 'error');
      } finally {
        this.saving = false;
      }
    },

    async loadUserPreferences() {
      if (!this.userId) {
        this.currentPreferences = null;
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/UserPreference/user/${this.userId}`);

        if (response.ok) {
          const preferences = await response.json();
          // Only take the first preference (most recent one)
          if (preferences.length > 0) {
            this.currentPreferences = preferences[0];
            // Pre-fill the form with current values
            this.preferences.genre = this.currentPreferences.genre;
            this.preferences.frequency = this.currentPreferences.frequency;
            this.preferences.format = this.currentPreferences.format;
          } else {
            this.currentPreferences = null;
            // Reset to defaults if no preferences exist
            this.preferences = {
              genre: "Fiction",
              frequency: "Weekly",
              format: "Print Books"
            };
          }
        } else if (response.status === 404) {
          this.currentPreferences = null;
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        this.showMessage('Failed to load preferences', 'error');
        this.currentPreferences = null;
      }
    },

    showMessage(text, type) {
      this.message = text;
      this.messageType = type;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  },
  watch: {
    userId(newUserId) {
      if (newUserId) {
        this.loadUserPreferences();
      } else {
        this.currentPreferences = null;
        // Reset form to defaults when no user ID is entered
        this.preferences = {
          genre: "Fiction",
          frequency: "Weekly",
          format: "Print Books"
        };
      }
    }
  },
  mounted() {
    // Load from localStorage as fallback
    const savedPrefs = localStorage.getItem("preferences");
    if (savedPrefs) {
      const localPrefs = JSON.parse(savedPrefs);
      this.preferences = { ...this.preferences, ...localPrefs };
    }
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
  padding: 20px;
}

.overlay {
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  color: #000000;
  text-align: center;
  width: 500px;
  max-width: 90%;
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
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #333333;
  text-align: left;
}

input, select {
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

button:hover:not(:disabled) {
  background: #333333;
}

button:disabled {
  background: #666666;
  cursor: not-allowed;
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-weight: bold;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.current-preferences {
  margin-top: 30px;
  text-align: left;
}

.current-preferences h3 {
  color: #333;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
}

.preference-item {
  background: #f5f5f5;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 4px solid #000;
}

.preference-item p {
  margin: 5px 0;
  color: #333;
}
</style>
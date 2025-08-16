<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">📚 Readiculous - Preferences</h1>

      <!-- Name -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Your Name</label>
        <input
            v-model="preferences.name"
            type="text"
            class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
        />
      </div>

      <!-- Favorite Genres -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Favorite Genres</label>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="genre in genres" :key="genre">
            <input
                type="checkbox"
                :id="genre"
                :value="genre"
                v-model="preferences.genres"
            />
            <label :for="genre" class="ml-2">{{ genre }}</label>
          </div>
        </div>
      </div>

      <!-- Favorite Authors -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Favorite Authors</label>
        <input
            v-model="preferences.authors"
            type="text"
            class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter authors (comma separated)"
        />
      </div>

      <!-- Reading Frequency -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">How often do you read?</label>
        <select
            v-model="preferences.frequency"
            class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Select one</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      <!-- Submit -->
      <button
          @click="savePreferences"
          class="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Save Preferences
      </button>

      <!-- Saved Output -->
      <div v-if="saved" class="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl">
        <p class="font-semibold text-green-800">✅ Preferences Saved!</p>
        <pre class="text-sm mt-2 text-gray-700">{{ preferences }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreferencesPage",
  data() {
    return {
      saved: false,
      genres: ["Fiction", "Non-Fiction", "Mystery", "Fantasy", "Romance", "Sci-Fi"],
      preferences: {
        name: "",
        genres: [],
        authors: "",
        frequency: ""
      }
    };
  },
  methods: {
    savePreferences() {
      this.saved = true;
      console.log("User Preferences:", this.preferences);
    }
  }
};
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>

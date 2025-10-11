<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-10 text-gray-800">📚 Our Library</h1>

      <!-- Loading and Error States -->
      <div v-if="loading" class="text-center text-gray-600 text-lg">Loading books...</div>
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>

      <!-- No Books -->
      <div v-if="books.length === 0 && !loading && !error" class="text-center text-gray-500">
        No books available yet.
      </div>

      <!-- Books Grid -->
      <div
          v-if="books.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <div
            v-for="book in books"
            :key="book.bookId"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col items-center text-center"
        >
          <!-- Book Cover -->
          <img
              v-if="book.image"
              :src="`data:image/jpeg;base64,${book.image}`"
              alt="Book Cover"
              class="w-32 h-44 object-cover rounded-lg mb-4 shadow-sm"
          />
          <div
              v-else
              class="w-32 h-44 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400"
          >
            No Image
          </div>

          <!-- Title -->
          <h2 class="text-lg font-semibold text-gray-800 mb-3">{{ book.title }}</h2>

          <!-- Book Info -->
          <div class="text-left text-sm text-gray-700 space-y-1">
            <p><span class="font-semibold">Author:</span> {{ book.author || "Unknown" }}</p>
            <p><span class="font-semibold">Genre:</span> {{ book.genre || "N/A" }}</p>
            <p>
              <span class="font-semibold">Description:</span>
              {{ book.description || "No description available." }}
            </p>
            <p><span class="font-semibold">Published:</span> {{ book.yearPublished || "—" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const books = ref([]);
const loading = ref(false);
const error = ref("");

async function fetchBooks() {
  loading.value = true;
  error.value = "";

  try {
    const res = await fetch("http://localhost:8080/api/books/getAll");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    books.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = "Failed to load books. Please try again later.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchBooks);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-10 text-gray-800">📚 Our Library</h1>

      <!-- Loading and Error States -->
      <div v-if="loading" class="text-center text-gray-600 text-lg">Loading books...</div>
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>

      <!-- No Books -->
      <div
          v-if="books.length === 0 && !loading && !error"
          class="text-center text-gray-500"
      >
        No books available yet.
      </div>

      <!-- ✅ Books Grid -->
      <div
          v-if="books.length > 0"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <div
            v-for="book in books"
            :key="book.bookId"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col items-center text-center"
        >
          <!-- Book Cover -->
          <div class="w-full flex justify-center mb-3">
            <img
                v-if="book.image"
                :src="`data:image/jpeg;base64,${book.image}`"
                alt="Book Cover"
                class="book-cover rounded-lg shadow-sm"
            />
            <div
                v-else
                class="book-cover bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
            >
              No Image
            </div>
          </div>

          <!-- Book Title -->
          <h2 class="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
            {{ book.title }}
          </h2>

          <!-- Book Info -->
          <div class="text-xs text-gray-700 space-y-1 text-left w-full px-2">
            <p><span class="font-semibold">Author:</span> {{ book.author || "Unknown" }}</p>
            <p><span class="font-semibold">Genre:</span> {{ book.genre || "N/A" }}</p>
            <p><span class="font-semibold">Year:</span> {{ book.yearPublished || "—" }}</p>
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ✅ Smaller, consistent book covers */
.book-cover {
  width: 100px;
  height: 150px;
  object-fit: cover;
}

/* ✅ Card hover and spacing */
.book-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>

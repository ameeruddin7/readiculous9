<template>
  <div class="page">
    <div class="auth-box">
      <h2>Admin — Create Book</h2>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Title</label>
          <input v-model.trim="form.title" type="text" placeholder="Enter book title" required />
        </div>

        <div class="form-group">
          <label>Author</label>
          <input v-model.trim="form.author" type="text" placeholder="Enter author name" required />
        </div>

        <div class="form-group">
          <label>Year Published</label>
          <input v-model.number="form.yearPublished" type="number" placeholder="Enter year published" min="0"/>
        </div>

        <div class="form-group">
          <label>Genre</label>
          <input v-model.trim="form.genre" type="text" placeholder="Enter genre (optional)" />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model.trim="form.description" rows="5" placeholder="Write a brief description..."></textarea>
        </div>

        <div class="form-group">
          <label>Cover Image (optional)</label>
          <input type="file" accept="image/*" @change="handleImageChange" />
          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Preview" />
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Saving...' : 'Create Book' }}
        </button>
        <button type="button" class="reset-btn" @click="resetForm">Reset</button>

        <p v-if="message" :class="success ? 'success-msg' : 'error-msg'">{{ message }}</p>
      </form>
    </div>

    <div class="books-list mt-10 max-w-4xl mx-auto">
      <h3 class="text-xl font-semibold mb-4">Existing Books</h3>
      <div v-if="books.length === 0" class="text-gray-500 text-center">No books posted yet.</div>
      <ul v-else class="space-y-4">
        <li v-for="book in books" :key="book.bookId" class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p><strong>{{ book.title }}</strong> by {{ book.author }}</p>
            <p class="text-sm text-gray-600">
              Genre: {{ book.genre || 'N/A' }} | Published: {{ book.yearPublished || '—' }}
            </p>
          </div>
          <button @click="deleteBook(book.bookId)" class="delete-btn">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

const form = reactive({
  title: "",
  author: "",
  description: "",
  genre: "",
  yearPublished: new Date().getFullYear(),
  image: null,
});

const imagePreview = ref(null);
const loading = ref(false);
const message = ref("");
const success = ref(false);
const books = ref([]);

// Handle image upload
function handleImageChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result;
    const commaIndex = base64.indexOf(",");
    form.image = commaIndex >= 0 ? base64.slice(commaIndex + 1) : base64;
    imagePreview.value = base64;
  };
  reader.readAsDataURL(file);
}

// Reset form
function resetForm() {
  Object.assign(form, {
    title: "",
    author: "",
    description: "",
    genre: "",
    yearPublished: new Date().getFullYear(),
    image: null,
  });
  imagePreview.value = null;
  message.value = "";
  success.value = false;
}

// Submit new book
async function submitForm() {
  loading.value = true;
  message.value = "";
  success.value = false;

  if (!form.title || !form.author) {
    message.value = "Title and Author are required.";
    loading.value = false;
    return;
  }

  const payload = {
    title: form.title,
    author: form.author,
    description: form.description,
    genre: form.genre,
    yearPublished: form.yearPublished,
    image: form.image || null,
  };

  try {
    const res = await fetch("http://localhost:8080/api/books/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());
    const created = await res.json();
    message.value = `✅ Book created successfully (ID: ${created.bookId})`;
    success.value = true;
    resetForm();
    await fetchBooks();
  } catch (err) {
    console.error(err);
    message.value = `❌ Error: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

// Fetch books
async function fetchBooks() {
  try {
    const res = await fetch("http://localhost:8080/api/books/getAll");
    if (!res.ok) throw new Error("Failed to fetch books");
    books.value = await res.json();
  } catch (err) {
    console.error(err);
  }
}

// Delete book
async function deleteBook(bookId) {
  if (!confirm("Are you sure you want to delete this book?")) return;

  try {
    const res = await fetch(`http://localhost:8080/api/books/delete/${bookId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete book");
    books.value = books.value.filter(b => b.bookId !== bookId);
  } catch (err) {
    console.error(err);
    alert("Error deleting book: " + err.message);
  }
}

onMounted(fetchBooks);
</script>

<style scoped>
.page {
  font-family: "Segoe UI", sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-box {
  background-color: #ffffff;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  width: 420px;
  max-width: 90%;
  text-align: center;
}

.auth-box h2 {
  color: #111;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1.4rem;
}

.form-group label {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  color: #333;
  display: block;
}

input,
textarea {
  width: 100%;
  padding: 0.9rem;
  border-radius: 6px;
  border: none;
  background: #f2f2f2;
  font-size: 1rem;
  color: #000;
  transition: background 0.2s;
  resize: none;
}

input:focus,
textarea:focus {
  outline: none;
  background: #e9e9e9;
}

.image-preview {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
}

.image-preview img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.submit-btn {
  margin-top: 1.5rem;
  padding: 0.9rem;
  background-color: #000;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #333;
}

.reset-btn {
  margin-top: 0.8rem;
  padding: 0.8rem;
  background: #f2f2f2;
  border: none;
  border-radius: 8px;
  color: #000;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease-in-out;
}

.reset-btn:hover {
  background: #e0e0e0;
}

.success-msg {
  color: #0a8f00;
  margin-top: 1rem;
  font-weight: 500;
}

.error-msg {
  color: #cc0000;
  margin-top: 1rem;
  font-weight: 500;
}

.delete-btn {
  background-color: #e53e3e;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.delete-btn:hover {
  background-color: #c53030;
}
</style>

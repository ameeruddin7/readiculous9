<template>
  <div class="book-page">
    <h1>📚 Book Club</h1>

    <div class="book-list">
      <div v-for="book in books" :key="book.bookId" class="book-card">
        <h2>{{ book.title }}</h2>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Genre:</strong> {{ book.genre }}</p>
        <p><strong>Year Published:</strong> {{ book.yearPublished }}</p>
        <p><strong>Description:</strong> {{ book.description }}</p>

        <!-- Like button -->
        <button @click="likeBook(book)">
          👍 Like ({{ book.likes }})
        </button>

        <!-- Comment section -->
        <div class="comments-section">
          <h3>Comments</h3>
          <ul>
            <li v-for="(comment, index) in book.comments" :key="index">
              {{ comment }}
            </li>
          </ul>

          <input v-model="newComments[book.bookId]" placeholder="Write a comment..." />
          <button @click="addComment(book)">Comment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Hard-coded books
const books = ref([
  {
    bookId: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    yearPublished: 1925,
    description: "A novel about the American dream and the roaring twenties.",
    likes: 0,
    comments: []
  },
  {
    bookId: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    yearPublished: 1949,
    description: "A chilling depiction of totalitarian society and surveillance.",
    likes: 0,
    comments: []
  },
  {
    bookId: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    yearPublished: 1960,
    description: "A story about racial injustice and moral growth in the Deep South.",
    likes: 0,
    comments: []
  }
]);

// Reactive object to hold new comments per book
const newComments = ref({});

// Functions
function likeBook(book) {
  book.likes++;
}

function addComment(book) {
  const comment = newComments.value[book.bookId];
  if (comment && comment.trim() !== "") {
    book.comments.push(comment.trim());
    newComments.value[book.bookId] = ""; // clear input
  }
}
</script>

<style scoped>
.book-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.book-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.book-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fefefe;
}

.book-card h2 {
  margin-bottom: 0.5rem;
}

.book-card p {
  margin: 0.25rem 0;
}

button {
  margin-top: 0.5rem;
  cursor: pointer;
}

.comments-section {
  margin-top: 1rem;
  border-top: 1px solid #ddd;
  padding-top: 0.5rem;
}

.comments-section input {
  width: 70%;
  margin-right: 0.5rem;
  padding: 0.25rem;
}
</style>

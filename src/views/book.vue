<script setup>
import { ref } from "vue";
import axios from "axios";

const title = ref("Our Readiculous Books for Readaholics");

// Import all images
import breathe from "@/assets/breathe.jpg";
import door from "@/assets/door.jpg";
import star from "@/assets/star.jpg";
import moon from "@/assets/the moon.jpg";
import karin from "@/assets/karin.jpg";
import wicked from "@/assets/wicked.jpg";
import vintage from "@/assets/vintage book.jpg";
import alone from "@/assets/alone.jpg";
import green from "@/assets/green.jpg";
import revenge from "@/assets/revenge.jpg";
import watching from "@/assets/watching.jpg";
import shadow from "@/assets/shadow.jpg";
import serpent from "@/assets/serpent.jpg";
import rule from "@/assets/rule.png";
import night from "@/assets/night caller.jpg";
import ice from "@/assets/ice.jpg";
import house from "@/assets/house.jpg";
import clap from "@/assets/clap.jpg";
import swallows from "@/assets/swallows.jpg";
import really from "@/assets/really.jpg";
import past from "@/assets/past.jpg";
import orange from "@/assets/orange.jpg";
import norse from "@/assets/norse.jpg";
import man from "@/assets/man's.jpg";

// Books array using backend-friendly naming
const books = ref([
  { bookId: 1, title: "Breathe", cover: breathe, liked: false, message: "", showActions: false, likes: 0 },
  { bookId: 2, title: "Beyond The Ocean Door", cover: door, liked: false, message: "", showActions: false, likes: 0 },
  { bookId: 3, title: "Star Daughter", cover: star, liked: false, message: "", showActions: false, likes: 0 },
  { bookId: 4, title: "The Moon And Stars", cover: moon, liked: false, message: "", showActions: false, likes: 0 },
  // ... add the rest
]);

function selectBook(book) {
  book.showActions = !book.showActions;
}

async function likeBook(book) {
  if (!book.liked) {
    book.liked = true;
    book.likes += 1;

    try {
      await axios.put("http://localhost:8080/api/Book/update", {
        bookId: book.bookId,
        title: book.title,
        message: book.message
      });
    } catch (error) {
      console.error("Error updating book like:", error);
    }
  }
}

async function submitComment(book) {
  if (book.message.trim() !== "") {
    try {
      await axios.put("http://localhost:8080/api/Book/update", {
        bookId: book.bookId,
        title: book.title,
        message: book.message
      });
      book.message = ""; // clear input after submission
      alert(`Thanks for your feedback on "${book.title}"!`);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to save comment.");
    }
  } else {
    alert("Please write a comment before submitting.");
  }
}
</script>

<template>
  <div class="app">
    <div class="content">
      <h1>{{ title }}</h1>
      <section class="library">
        <h2>Library</h2>
        <div class="book-grid">
          <div v-for="book in books" :key="book.bookId" class="book-card">
            <img
                :src="book.cover"
                :alt="book.title"
                class="book-cover"
                @click="selectBook(book)"
            />
            <p>{{ book.title }}</p>
            <p>❤️ Likes: {{ book.likes }}</p>

            <div v-if="book.showActions" class="actions-section">
              <button @click="likeBook(book)">Like</button>
              <div class="comment-section">
                <textarea v-model="book.message" placeholder="Leave your feedback..."></textarea>
                <button @click="submitComment(book)">Submit Comment</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.book-card {
  background: transparent;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s;
  text-align: center;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.book-cover {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
}

.actions-section {
  margin-top: 10px;
}

.comment-section textarea {
  width: 100%;
  min-height: 60px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>

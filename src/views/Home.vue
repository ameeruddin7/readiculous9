<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Welcome to READiculous 📚</h1>
      <p>
        Discover new books, join meaningful discussions, and connect with fellow readers
        from around the world. Let’s make every page unforgettable!
      </p>

      <button @click="goToLogin" class="join-btn">
        Join the Club Today
      </button>
    </section>

    <!-- Why Join -->
    <section class="why-join">
      <h2>Why Join READiculous?</h2>
      <ul>
        <li>✨ Get personalized book recommendations</li>
        <li>💬 Join vibrant discussions with book lovers</li>
        <li>⭐ Share reviews and discover hidden gems</li>
        <li>🎁 Participate in giveaways & reading challenges</li>
      </ul>
    </section>

    <!-- Preferences -->
    <section class="preferences">
      <h3>📌 Your Top Genres</h3>
      <ul>
        <li>Thriller</li>
        <li>Self-help</li>
        <li>Sci-fi</li>
      </ul>
    </section>

    <!-- Trending Books -->
    <section class="trending-books">
      <h3>📈 Trending Books</h3>
      <div class="book-cards">
        <div v-for="book in books" :key="book.id" class="book-card">
          <img :src="book.cover" :alt="book.title" />
          <p>{{ book.title }}</p>
        </div>
      </div>
    </section>

    <!-- Discussions -->
    <section class="discussions">
      <h3>💬 Hot Discussions</h3>
      <ul>
        <li>📖 Which thriller kept you awake all night?</li>
        <li>🚀 Is “City of Orange” the next big dystopian hit?</li>
        <li>🧙 Favorite magical worlds: Norse Mythology vs Witching Places?</li>
      </ul>
    </section>

    <!-- Liked Books -->
    <section class="liked-books">
      <h3>❤️ Recently Liked Books</h3>
      <div class="book-icons">
        <span>📗 The Green Soldier</span>
        <span>📘 Night Caller</span>
        <span>📕 Norse Mythology</span>
      </div>
    </section>


    <section class="quote">
      <blockquote>
        “A reader lives a thousand lives before he dies. The man who never reads lives only one.”
        – George R.R. Martin
      </blockquote>
    </section>


    <section class="activity">
      <h3>👥 Community Activity</h3>
      <ul>
        <li>Philasande reviewed <strong>The Shadow Cell</strong> ⭐⭐⭐⭐</li>
        <li>Lebo liked <strong>Clap When You Land</strong></li>
        <li>Anele started a discussion on <strong>Breaking The Ice</strong></li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";


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

const router = useRouter();
function goToLogin() {
  router.push({ name: "Login" });
}

const books = ref([
  { id: 1, title: "Breathe", cover: breathe },
  { id: 2, title: "Beyond The Ocean Door", cover: door },
  { id: 3, title: "Star Daughter", cover: star },
  { id: 4, title: "The Moon And Stars", cover: moon },
  { id: 5, title: "The Silent Wife", cover: karin },
  { id: 6, title: "Wicked", cover: wicked },
  { id: 7, title: "The Vintage Book", cover: vintage },
  { id: 8, title: "Alone", cover: alone },
  { id: 9, title: "The Green Soldier", cover: green },
  { id: 10, title: "In Mind Of Revenge", cover: revenge },
  { id: 11, title: "Witching Places", cover: watching },
  { id: 12, title: "The Shadow Cell", cover: shadow },
  { id: 13, title: "The Serpent", cover: serpent },
  { id: 14, title: "The Three Month Rule", cover: rule },
  { id: 15, title: "Night Caller", cover: night },
  { id: 16, title: "Breaking The Ice", cover: ice },
  { id: 17, title: "House Of Hollow", cover: house },
  { id: 18, title: "Clap When You Land", cover: clap },
  { id: 19, title: "The Swallows", cover: swallows },
  { id: 20, title: "Really Good Actually", cover: really },
  { id: 21, title: "The Past Is Rising", cover: past },
  { id: 22, title: "City Of Orange", cover: orange },
  { id: 23, title: "Norse Mythology", cover: norse },
  { id: 24, title: "A Man's Man", cover: man },
]);
</script>

<style scoped>
.home-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  line-height: 1.6;
  background: #fdfdfd;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 50px 20px;
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  color: white;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
.hero h1 { font-size: 3em; margin-bottom: 15px; }
.hero p { font-size: 1.2em; }
.join-btn {
  margin-top: 20px;
  background-color: #ff7675;
  color: white;
  border: none;
  padding: 14px 25px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1em;
  transition: 0.3s;
}
.join-btn:hover { background-color: #d63031; transform: scale(1.05); }

/* Why Join */
.why-join {
  margin: 40px 0; padding: 20px; background: #fff3e0; border-radius: 12px;
}
.why-join h2 { margin-bottom: 15px; }
.why-join ul { list-style: none; padding: 0; }
.why-join li { margin: 10px 0; font-size: 1.1em; }

/* Trending Books */
.trending-books { margin-top: 40px; }
.book-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
  margin-top: 15px;
}
.book-card {
  background: #fff;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.book-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

/* Discussions */
.discussions { margin-top: 40px; }
.discussions ul { list-style: none; padding: 0; }
.discussions li { margin: 10px 0; padding: 12px; background: #e0f7fa; border-radius: 8px; }

/* Quote */
.quote { margin: 50px 0; font-style: italic; text-align: center; background: #ffeaa7; padding: 25px; border-radius: 12px; font-size: 1.2em; }

/* Activity */
.activity { margin-top: 40px; }
.activity li { background: #dfe6e9; margin: 8px 0; padding: 12px; border-radius: 8px; }
</style>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Welcome to READiculous 📚</h1>
      <p>Where book lovers unite to read, collaborate, and speak about books.</p>
      <button @click="$router.push('/signup')" class="join-btn">Join the Club</button>
    </section>

    <!-- Preferences Section -->
    <section class="preferences">
      <h3>Your Preferences</h3>
      <ul>
        <li>Thriller</li>
        <li>Self-help</li>
        <li>Sci-fi</li>
      </ul>
    </section>

    <!-- Trending Books Section -->
    <section class="trending-books">
      <h3>📈 Trending Books</h3>
      <div class="book-cards">
        <div class="book-card">
          <img src="https://via.placeholder.com/100x140" alt="Book 1" />
          <p>Dune</p>
        </div>
        <div class="book-card">
          <img src="https://via.placeholder.com/100x140" alt="Book 2" />
          <p>Atomic Habits</p>
        </div>
        <div class="book-card">
          <img src="https://via.placeholder.com/100x140" alt="Book 3" />
          <p>The Silent Patient</p>
        </div>
      </div>
    </section>

    <!-- Top Discussions -->
    <section class="discussions">
      <h3>💬 Top Discussions</h3>
      <ul>
        <li>Is "Dune" the greatest sci-fi ever written?</li>
        <li>Best self-help book for 2025?</li>
        <li>Batman vs Superman: Who reads more?</li>
      </ul>
    </section>

    <!-- Recently Liked Books Section -->
    <section class="liked-books">
      <h3>Recently Liked Books</h3>
      <div class="book-icons">
        <span>📘 Spider Man</span>
        <span>📙 Super Man</span>
        <span>📗 Batman</span>
      </div>
    </section>

    <!-- Motivational Quote -->
    <section class="quote">
      <blockquote>
        “A reader lives a thousand lives before he dies. The man who never reads lives only one.”
        – George R.R. Martin
      </blockquote>
    </section>

    <!-- Recent Activity -->
    <section class="activity">
      <h3>👥 Community Activity</h3>
      <ul>
        <li>Philasande reviewed <strong>Spider Man</strong> ⭐⭐⭐⭐</li>
        <li>Lebo liked <strong>Atomic Habits</strong></li>
        <li>Anele started a discussion on <strong>The Silent Patient</strong></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  line-height: 1.6;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(to right, #6c5ce7, #00cec9);
  color: white;
  border-radius: 12px;
  margin-bottom: 30px;
}
.hero h1 {
  font-size: 2.5em;
}
.join-btn {
  margin-top: 15px;
  background-color: #ff7675;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
}
.join-btn:hover {
  background-color: #d63031;
}

/* Preferences */
.preferences {
  margin-top: 20px;
}

/* Trending Books */
.trending-books {
  margin-top: 30px;
}
.book-cards {
  display: flex;
  gap: 20px;
}
.book-card {
  background: #f9f9f9;
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.book-card img {
  border-radius: 5px;
}

/* Discussions */
.discussions {
  margin-top: 30px;
}
.discussions ul {
  list-style: none;
  padding: 0;
}
.discussions li {
  margin: 8px 0;
  padding: 10px;
  background: #f1f2f6;
  border-radius: 6px;
}

/* Liked Books */
.liked-books {
  margin-top: 30px;
}
.book-icons span {
  display: inline-block;
  margin: 10px;
  font-size: 1.2em;
}

/* Quote */
.quote {
  margin-top: 40px;
  font-style: italic;
  text-align: center;
  background: #ffeaa7;
  padding: 20px;
  border-radius: 10px;
}

/* Activity */
.activity {
  margin-top: 30px;
}
.activity ul {
  list-style: none;
  padding: 0;
}
.activity li {
  background: #dfe6e9;
  margin: 8px 0;
  padding: 10px;
  border-radius: 6px;
}
</style>




<template>
  <div class="about-page">
    <header class="about-header">
      <h1>About READiculous</h1>
      <router-link to="/" class="back-link">← Back to Home</router-link>
    </header>

    <!-- Introduction Section -->
    <section class="about-section">
      <p>
        Welcome to <strong>READiculous</strong> — a vibrant space where book enthusiasts come together to explore,
        discuss, and share the joy of reading. Whether you’re discovering new favorites or revisiting timeless classics,
        READiculous makes reading more social, inspiring, and fun!
      </p>

      <p>
        Our platform allows you to browse a growing digital library filled with diverse titles, ranging from fiction and
        self-help to fantasy and biographies. Users can freely share their thoughts, reviews, and opinions about the
        books they read, creating an open and supportive reading community.
      </p>

      <p>
        Got a book you love? Bring it to READiculous! Start conversations, exchange perspectives, and connect with readers
        who share your curiosity and passion for stories. Every book opens a door — and we invite you to step through it.
      </p>
    </section>

    <!-- Mission and Values -->
    <section class="features-section">
      <h2>Our Mission</h2>
      <p>
        At READiculous, our mission is to turn reading into a shared adventure. We believe books are more than just words —
        they’re experiences that connect people, spark ideas, and inspire growth. We aim to build a community where every
        reader has a voice and every story finds its audience.
      </p>
    </section>

    <!-- What Users Can Do -->
    <section class="features-section">
      <h2>What You Can Do on READiculous</h2>
      <ul>
        <li>📚 Browse and explore books in our digital library</li>
        <li>💬 Leave reviews and share your thoughts with others</li>
        <li>📝 Upload and discuss your own books or reading experiences</li>
        <li>🤝 Connect with readers who share your love for storytelling</li>
        <li>🌍 Join a global community of passionate book lovers</li>
      </ul>
    </section>

    <!-- Footer -->
    <footer class="about-footer">
      <p>© 2025 READiculous | Built with ❤ for readers everywhere</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about-page {
  padding: 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f8f8;
  color: #333;
  min-height: 100vh;
}

.about-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.about-header h1 {
  font-size: 2rem;
  color: #2c3e50;
}

.back-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.about-section {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.about-section p {
  margin-bottom: 15px;
  line-height: 1.6;
}

.features-section {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.features-section h2 {
  margin-bottom: 10px;
  color: #34495e;
}

.features-section ul {
  list-style: none;
  padding: 0;
}

.features-section li {
  margin: 10px 0;
  font-size: 1.1rem;
}

.about-footer {
  text-align: center;
  margin-top: 30px;
  font-size: 0.9rem;
  color: #666;
}
</style>
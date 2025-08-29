<template>
  <div class="home-page">
    <!-- Preferences Section -->
    <section class="preferences">
      <h3>Preferences</h3>
      <ul>
        <li>Thriller</li>
        <li>Self-help</li>
        <li>Sci-fi</li>
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
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.preferences,
.liked-books {
  margin-top: 20px;
}

.book-icons span {
  display: inline-block;
  margin: 10px;
  font-size: 1.2em;
}
</style>

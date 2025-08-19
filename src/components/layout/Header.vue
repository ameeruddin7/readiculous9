<template>
  <div class="profile-page">
    <!-- Header with Dropdown + Logo -->
    <header class="profile-header">
      <!-- Dropdown Menu -->
      <div class="dropdown">
        <button class="dropbtn">☰ Account</button>
        <div class="dropdown-content">
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      </div>

      <!-- Logo on the Right -->
      <div class="logo-container">
        <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />
      </div>
    </header>

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

<style scoped>
.profile-page {
  font-family: sans-serif;
  color: black; /* text color switched to black */
  background-color: #ffffff; /* white background */
  padding: 20px;
  min-height: 100vh;
}

.profile-header {
  display: flex;
  justify-content: space-between; /* space between dropdown and logo */
  align-items: center;
  background-color: #f9f9f9; /* light background for header */
  padding: 20px;
  border-bottom: 1px solid #00ff88;
  border-radius: 8px;
}

.logo-container .logo {
  max-width: 180px;
  height: 60px;
  display: block;
}

/* Dropdown Menu */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #00ff88;
  color: black;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #ffffff; /* white dropdown */
  min-width: 160px;
  border-radius: 6px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.3);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1; /* light hover */
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #00cc66;
}

/* Preferences + Liked Books */
.preferences,
.liked-books {
  margin-top: 30px;
}

.preferences h3,
.liked-books h3 {
  color: #00cc66; /* green headings */
  margin-bottom: 10px;
}

.preferences ul {
  list-style: none;
  padding: 0;
}

.preferences li {
  background-color: #f9f9f9; /* light cards */
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
}

.book-icons span {
  display: inline-block;
  margin-right: 15px;
  padding: 10px 15px;
  background-color: #f9f9f9; /* light cards */
  border-radius: 4px;
  font-size: 1rem;
}
</style>
<script setup lang="ts">
</script>
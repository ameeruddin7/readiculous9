<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2025 Prodemy. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/privacy">Privacy</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script logic needed
</script>

<style scoped>
.footer {
  background-color: #fff; /* White background */
  color: #111; /* Black text */
  border-top: 3px solid #00ff88; /* Green accent */
  padding: 15px 20px;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #111;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}

.footer-links a:hover {
  color: #00cc66; /* Darker green on hover */
}
</style>

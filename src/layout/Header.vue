<template>
  <header class="custom-header">
    <!-- Left: Dropdown Button -->
    <div class="dropdown">
      <button class="dropbtn">☰ Account</button>
      <div class="dropdown-content">
        <ul> <router-link to="/book">Book</router-link>
          <li><router-link to="/login">login</router-link></li>
          <li><router-link to="/Home">Home</router-link></li>
          <li><router-link to="/signup">signup</router-link></li>
          <li><RouterLink to="preference">preference</RouterLink></li>
          <li><router-link to="/library">Library</router-link></li>
          <li><router-link to="/join">Join</router-link></li>
          <li><router-link to="/account">Account</router-link></li>
          <li><router-link to="/invite">Invite</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
          <li><router-link to="/logout">Logout</router-link></li>
        </ul>

      </div>
    </div>

    <!-- Right: Logo -->
    <div class="logo-container">
      <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />
    </div>
  </header>
</template>

<style scoped>
/* Header container */
.custom-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* light background */
  padding: 16px 24px;
  border-bottom: 3px solid #00cc66; /* green accent */
  z-index: 1000;
}

/* Logo styles */
.logo-container .logo {
  max-width: 160px;
  height: auto;
  display: block;
  border: 2px solid #00cc66;
  border-radius: 8px;
  background-color: white;
}

/* Dropdown Menu */
.dropdown {
  position: relative;
}

.dropbtn {
  background-color: white; /* white button */
  color: black;
  padding: 10px 16px;
  font-size: 16px;
  border: 2px solid #00cc66;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.dropbtn:hover {
  background-color: #00cc66;
  color: white;
}

/* Dropdown content hidden by default */
.dropdown-content {
  display: none;
  position: absolute;
  top: 45px;
  left: 0;
  background-color: white;
  min-width: 180px;
  border-radius: 6px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.3);
  z-index: 1;
}

/* Dropdown links */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-weight: 500;
}

.dropdown-content a:hover {
  background-color: #00cc66;
  color: white;
  font-weight: bold;
}

/* Show dropdown on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
<script setup lang="ts">
import Signup from "@/views/signup.vue";
</script>
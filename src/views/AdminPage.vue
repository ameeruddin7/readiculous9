

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const clubs = ref([]);

onMounted(() => {
  axios.get("http://localhost:8080/club/all")
      .then(res => clubs.value = res.data)
      .catch(err => console.error("Error loading clubs", err));
});
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Here you can manage your clubs.</p>

    <ul>
      <li v-for="club in clubs" :key="club.clubId">
        {{ club.clubName }} - {{ club.clubDescription }}
      </li>
    </ul>
  </div>
</template>


<style scoped>
/* Make Admin Page cover full window */
.admin-container {
  min-height: 100vh;
  padding: 20px;
  background-color: #2c2c2c;
  color: #f0f0f0;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.section {
  border: 2px solid #004d00;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #004d00;
  border-radius: 5px;
  background-color: #3a3a3a;
  color: #f0f0f0;
}

textarea {
  min-height: 60px;
}

.save-btn {
  padding: 10px 20px;
  background-color: #004d00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto 20px auto;
}

.books-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.book-card {
  width: 120px;
  text-align: center;
  padding: 5px;
  border: 1px solid #004d00;
  border-radius: 5px;
  background-color: #3a3a3a;
}

.book-card img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.tab-buttons button {
  padding: 10px 20px;
  border: 1px solid #004d00;
  border-radius: 5px;
  background-color: #3a3a3a;
  color: #f0f0f0;
  cursor: pointer;
}

.tab-buttons button.active {
  background-color: #004d00;
  color: #f0f0f0;
}
</style>

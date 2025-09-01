<template>
  <div class="admin-container">
    <h1 class="title">Admin Page</h1>

    <!-- About Us Tab -->
    <div v-if="currentTab === 'about'" class="tab-content">
      <div class="section">
        <label>Club Name:</label>
        <input v-model="club.name" type="text" />
      </div>

      <div class="section">
        <label>Club Description:</label>
        <textarea v-model="club.description"></textarea>
      </div>

      <div class="section">
        <h2>Members</h2>
        <ul>
          <li v-for="member in members" :key="member.id">{{ member.name }}</li>
        </ul>
      </div>

      <button @click="saveClubInfo" class="save-btn">Save Changes</button>
    </div>

    <!-- Books Tab -->
    <div v-if="currentTab === 'books'" class="tab-content">
      <div class="section">
        <h2>Current Book</h2>
        <div v-if="currentBook" class="book-card">
          <img :src="currentBook.cover" alt="cover" />
          <p>{{ currentBook.title }}</p>
          <p>{{ currentBook.author }}</p>
        </div>
        <p v-else>No book is currently being read.</p>
      </div>

      <div class="section">
        <h2>Previously Read</h2>
        <div class="books-grid">
          <div v-for="book in previousBooks" :key="book.id" class="book-card">
            <img :src="book.cover" alt="cover" />
            <p>{{ book.title }}</p>
            <p>{{ book.author }}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Suggested Books</h2>
        <div class="books-grid">
          <div v-for="book in suggestedBooks" :key="book.id" class="book-card">
            <img :src="book.cover" alt="cover" />
            <p>{{ book.title }}</p>
            <p>{{ book.author }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Buttons for Tab Switching -->
    <div class="tab-buttons">
      <button @click="currentTab = 'about'" :class="{ active: currentTab === 'about' }">About Us</button>
      <button @click="currentTab = 'books'" :class="{ active: currentTab === 'books' }">Books</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      currentTab: "about",
      club: {
        name: "My Book Club",
        description: "Write something about your club..."
      },
      members: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
      ],
      currentBook: {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover: "https://via.placeholder.com/100x150"
      },
      previousBooks: [
        { id: 1, title: "1984", author: "George Orwell", cover: "https://via.placeholder.com/100x150" },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://via.placeholder.com/100x150" }
      ],
      suggestedBooks: [
        { id: 1, title: "Pride and Prejudice", author: "Jane Austen", cover: "https://via.placeholder.com/100x150" },
        { id: 2, title: "Moby Dick", author: "Herman Melville", cover: "https://via.placeholder.com/100x150" },
        { id: 3, title: "Hamlet", author: "William Shakespeare", cover: "https://via.placeholder.com/100x150" }
      ]
    };
  },
  methods: {
    saveClubInfo() {
      alert("Changes saved!");
    }
  }
};
</script>

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

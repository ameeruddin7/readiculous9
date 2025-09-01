<template>
  <div class="book-page">

    <header class="book-header">
      <h2>Available Books</h2>
      <router-link to="/" class="back-link">← Back to Profile</router-link>
    </header>


    <section class="book-list">
      <div class="book-card" v-for="book in books" :key="book.id">
        <h3>{{ book.title }}</h3>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p>{{ book.description }}</p>


        <button @click="likeBook(book)"> Like</button>


        <div v-if="book.liked" class="comment-section">
          <textarea v-model="book.comment" placeholder="Leave your feedback..."></textarea>
          <button @click="submitComment(book)">Submit Comment</button>


          <p v-if="book.submittedComment">
            <strong>Your Feedback:</strong> {{ book.submittedComment }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BookPage',
  data() {
    return {
      books: [
        { id: 1, title: "Spider Man", author: "Stan Lee", description: "A thrilling superhero story.", liked: false, comment: "", submittedComment: "" },
        { id: 2, title: "Super Man", author: "Jerry Siegel", description: "A classic hero adventure.", liked: false, comment: "", submittedComment: "" },
        { id: 3, title: "Batman", author: "Bob Kane", description: "A dark and mysterious tale.", liked: false, comment: "", submittedComment: "" }
      ]
    };
  },
  methods: {
    likeBook(book) {
      book.liked = true;
      alert(`You liked "${book.title}"! Now you can leave feedback.`);
    },
    submitComment(book) {
      if (book.comment.trim() !== "") {
        book.submittedComment = book.comment;
        book.comment = ""; // clear input
        alert(`Thanks for your feedback on "${book.title}"!`);
      } else {
        alert("Please write a comment before submitting.");
      }
    }
  }
};
</script>

<style scoped>
.book-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-link {
  text-decoration: none;
  color: #007bff;
}

.book-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.book-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
}

.book-card button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.comment-section {
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
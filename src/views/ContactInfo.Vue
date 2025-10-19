<template>
  <div>

    <div
        class="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
        @click="toggleContact"
    >
      <i class="fas fa-address-book text-2xl"></i>
    </div>


    <transition name="fade">
      <div
          v-if="showContact"
          class="fixed bottom-20 right-6 bg-white shadow-2xl rounded-xl w-72 p-5 border border-gray-200"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">📚 Readiculous Book Club</h2>
          <button @click="toggleContact" class="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        <p class="text-sm text-gray-700 mb-2">
          <strong>Email:</strong> contact@readiculousclub.com
        </p>
        <p class="text-sm text-gray-700 mb-2">
          <strong>Phone:</strong> +27 21 555 1234
        </p>
        <p class="text-sm text-gray-700 mb-2">
          <strong>Address:</strong> 15 District Six Rd, Cape Town, South Africa
        </p>

        <div class="flex justify-start mt-3 space-x-3">
          <a href="https://facebook.com/readiculous" target="_blank" class="text-blue-600 hover:text-blue-800">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com/readiculous" target="_blank" class="text-pink-500 hover:text-pink-700">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/readiculous" target="_blank" class="text-blue-400 hover:text-blue-600">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ContactInfo",
  data() {
    return {
      showContact: false,
    };
  },
  methods: {
    toggleContact() {
      this.showContact = !this.showContact;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

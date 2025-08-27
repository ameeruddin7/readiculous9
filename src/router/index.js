import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../views/book.vue'
import Library from '../views/Library.vue'
import Signup from '../views/signup.vue'
import Login from "@/views/login.vue";
import Preference from "@/views/preference.vue";

const routes = [
    { path: '/', name: 'Signup', component: Signup }, // 👈 changed from Home to Signup
    { path: '/book', name: 'book', component: Book },
    { path: '/library', name: 'Library', component: Library },
    { path: '/signup', name: 'SignupPage', component: Signup }, // kept signup route
    { path: '/login', name: 'Login', component: Login },
    {path: '/preference', name: 'Preference', component: Preference },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

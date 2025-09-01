import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import LoginPage from "@/views/LoginPage.vue";
import book from "@/views/book.vue";
import signup from "@/views/signup.vue";
import CreateClub from "@/views/CreateClub.vue";
import AdminPage from "@/views/AdminPage.vue";

const routes = [
    {path: '/Home',name: 'Home', component: Home},
    {path: '/ForgotPassword',name: 'ForgotPassword', component: ForgotPassword},
    {path: '/Login', name: 'Login', component: LoginPage},
    {path: '/book',name: 'book',component: book},
    {path: '/signup',name: 'signup',component: signup},
    {path: '/CreateClub', name: 'CreateClub', component: CreateClub},
    {path: '/club/:id/admin', name: 'AdminPage', component: AdminPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

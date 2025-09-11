import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import LoginPage from "@/views/LoginPage.vue";
import book from "@/views/book.vue";
import signup from "@/views/signup.vue";
import CreateClub from "@/views/CreateClub.vue";
import AdminPage from "@/views/AdminPage.vue";
import preferencepage from "@/views/preferencepage.vue";
import Library from "@/views/Library.vue";



const routes = [
    {path: '/',name: 'Home', component: Home},
    {path: '/ForgotPassword',name: 'ForgotPassword', component: ForgotPassword},
    {path: '/Login', name: 'Login', component: LoginPage},
    {path: '/book',name: 'book',component: book},
    {path: '/signup',name: 'signup',component: signup},
    {path: '/CreateClub', name: 'CreateClub', component: CreateClub},
    {path: '/club/:id/admin', name: 'AdminPage', component: AdminPage},
    {path: '/preferencepage',name: 'preferencepage',component: preferencepage},
    {path: '/Library',name: 'Library',component: Library},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

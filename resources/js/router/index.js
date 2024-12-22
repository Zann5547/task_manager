import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../views/layouts/AppLayout.vue'
import Login from '../views/pages/auth/Login.vue'
import Register from '../views/pages/auth/Register.vue'
import NotFound from '../views/pages/NotFound.vue'

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
    },
    { path: '/', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path:'/:pathMatch(.*)', name: 'notFound', component:NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

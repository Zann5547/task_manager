import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../views/layouts/AppLayout.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import Login from '../views/pages/auth/Login.vue'
import Register from '../views/pages/auth/Register.vue'
import NotFound from '../views/pages/NotFound.vue'

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            { path: 'dashboard', name: 'app.dashboard', component: Dashboard },
        ]
    },
    { path: '/', name: 'login', component: Login, meta: { requiresGuest: true } },
    { path: '/register', name: 'register', component: Register, meta: { requiresGuest: true } },

    { path:'/:pathMatch(.*)', name: 'notFound', component:NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token');

    if(to.meta.requiresAuth && !token) {
        next({ name: 'login' })
    } else if(to.meta.requiresGuest && token) {
        next({ name: 'app.dashboard' })
    } else {
        next()
    }
})

export default router

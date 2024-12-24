import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../views/layouts/AppLayout.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import TaskIndex from '../views/pages/task/Index.vue'
import TaskCreate from '../views/pages/task/Create.vue'
import TaskShow from '../views/pages/task/Show.vue'
import TaskEdit from '../views/pages/task/Edit.vue'
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
            { path: 'dashboard', name: 'app.dashboard', component: Dashboard, meta:{ title: 'Dashboard' } },
            { path: 'task', name: 'app.task', component: TaskIndex, meta:{ title: 'All Tasks' } },
            { path: 'task/create', name: 'app.task.create', component: TaskCreate, meta:{ title: 'Create a new task' } },
            { path: 'task/show/:id', name: 'app.task.show', component: TaskShow, meta:{ title: 'Task Detail' } },
            { path: 'task/edit/:id', name: 'app.task.edit', component: TaskEdit, meta:{ title: 'Edit Task' } },
        ]
    },
    { path: '/', name: 'login', component: Login, meta: { requiresGuest: true } },
    { path: '/register', name: 'register', component: Register, meta: { requiresGuest: true } },

    { path:'/:pathMatch(.*)*', name: 'notFound', component:NotFound },
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

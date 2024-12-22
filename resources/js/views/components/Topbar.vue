<template>
    <header class="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <h1 class="text-lg font-bold">Task Manager</h1>
        <div class="flex items-center space-x-4">
            <span v-if="authStore?.user">Welcome - {{ authStore.user.name }}</span>
            <button @click="logoutUser" class="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">Logout</button>
        </div>
    </header>
</template>

<script setup>
import { useAuthStore } from "../../store/auth"

const authStore = useAuthStore()
const logoutUser = (() => {
    authStore.logout()
})
</script>

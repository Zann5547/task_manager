<template>
    <div v-if="authStore?.user" class="flex flex-col min-h-screen">
        <Topbar />

        <div class="flex flex-grow">
            <Sidebar />

            <!-- Main Content -->
            <main class="flex-grow bg-gray-100 p-6">
                <router-view />
            </main>
        </div>
        <Bottombar />
    </div>
    <div v-else class="flex items-center justify-center min-h-screen bg-gray-200">
        <Spinner />
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../store/auth'
import Spinner from '../components/core/Spinner.vue'
import Topbar from '../components/Topbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Bottombar from '../components/Bottombar.vue'

const authStore = useAuthStore()

onMounted(() => {
    authStore.getUser()
})
</script>

<style>

</style>

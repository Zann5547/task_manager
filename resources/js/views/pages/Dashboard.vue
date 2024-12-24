<template>
    <Breadcrumber />
    <div class="max-w-9xl mx-auto p-6">
        <div class="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 class="text-xl font-semibold text-gray-800">User Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <p class="text-gray-600"><strong>Name:</strong> {{ currentUser.name }}</p>
                    <p class="text-gray-600"><strong>Email:</strong> {{ currentUser.email }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../store/auth'
import Breadcrumber from '../components/Breadcrumber.vue'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

onMounted(() => {
    authStore.getUser()
})
</script>

<style>

</style>

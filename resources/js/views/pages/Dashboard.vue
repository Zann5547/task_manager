<template>
    <h1>This is from Dashboard</h1>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../../store/auth'
import Topbar from '../components/Topbar.vue'

const authStore = useAuthStore()

onMounted(() => {
    authStore.getUser()
})
</script>

<style>

</style>

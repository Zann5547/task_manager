<template>
    <div class="max-w-9xl mx-auto p-4">
        <div class="bg-white shadow-lg rounded-lg p-4">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = ref(route.meta.title)
</script>

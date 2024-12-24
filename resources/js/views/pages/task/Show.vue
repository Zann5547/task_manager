<template>
    <div v-if="!currentTask">
        <Spinner v-if="loading" />
    </div>
    <div v-else>
        <div class="max-w-9xl mx-auto p-4">
            <div class="bg-white shadow-lg rounded-lg p-4">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-semibold text-gray-800">Task Title: {{ currentTask.title }}</h1>
                </div>
            </div>
        </div>
        <div class="max-w-9xl mx-auto p-4">
            <div class="bg-white shadow-md rounded-lg p-4">
                <div class="flex justify-self-auto items-center">
                    <p class="w-16 text-xl font-semibold text-gray-800">Description: </p>
                    <span class="text-xl ml-8 pl-6">{{ currentTask.description }}</span>
                </div>
                <br>
                <div class="flex justify-self-auto items-center">
                    <p class="w-16 text-xl font-semibold text-gray-800">Deadline: </p>
                    <span class="text-xl ml-8 pl-6">{{ formattedDueDate }}</span>
                </div>
                <div class="flex justify-self-auto items-center">
                    <p class="w-16 text-xl font-semibold text-gray-800">Status: </p>
                    <span class="text-xl ml-8 pl-6">{{ currentTask.status }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "../../../store/task";
import Spinner from '../../components/core/Spinner.vue'

const route = useRoute()
const taskStore = useTaskStore()
const currentTask = computed(() => taskStore.task || null)
const loading = computed(() => taskStore.loading)
const formattedDueDate = computed(() => {
    if (!currentTask.value || !currentTask.value.due_date) return 'N/A';
    const date = new Date(currentTask.value.due_date);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
});
onMounted(() => {
    taskStore.showTask(route.params.id)
})
</script>

<style>
</style>

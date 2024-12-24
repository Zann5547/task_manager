<template>
    <Breadcrumber />
    <div class="max-w-6xl mx-auto p-6 bg-white rounded-md shadow-md">
        <div v-if="loading" class="text-center"><Spinner /></div>
        <div v-else>
        <form @submit.prevent="updateTask">
            <div class="mb-4">
            <label for="title" class="block text-gray-700">Title</label>
            <input v-model="task.title" id="title" class="w-full border rounded px-3 py-2" />
            <span class="text-xs text-red-500" v-if="errors?.title">{{ errors.title[0] }}</span>
            </div>
            <div class="mb-4">
            <label for="description" class="block text-gray-700">Description</label>
            <textarea v-model="task.description" id="description" class="w-full border rounded px-3 py-2"></textarea>
            <span class="text-xs text-red-500" v-if="errors?.description">{{ errors.description[0] }}</span>
            </div>
            <div class="mb-4">
            <label for="due_date" class="block text-gray-700">Due Date</label>
            <input type="date" v-model="task.due_date" id="due_date" class="w-full border rounded px-3 py-2" />
            <span class="text-xs text-red-500" v-if="errors?.due_date">{{ errors.due_date[0] }}</span>
            </div>
            <div class="mb-4">
            <label for="status" class="block text-gray-700">Status</label>
            <select v-model="task.status" id="status" class="w-full border rounded px-3 py-2">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <span class="text-xs text-red-500" v-if="errors?.status">{{ errors.status[0] }}</span>
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update Task</button>
        </form>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useTaskStore } from '../../../store/task'
import { useRoute } from 'vue-router'
import Breadcrumber from '../../components/Breadcrumber.vue'
import Spinner from '../../components/core/Spinner.vue';


const route = useRoute()
const taskStore = useTaskStore()
const task = computed(() => taskStore.task)
const errors = computed(() => taskStore.errors)
const loading = computed(() => taskStore.loading)
const updateTask = (() => {
    taskStore.updateTask(task.value)
})
onMounted(() => {
    taskStore.showTask(route.params.id)
    taskStore.errors = {}
})
</script>

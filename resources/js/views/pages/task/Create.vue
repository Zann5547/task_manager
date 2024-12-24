<template>
    <Breadcrumber />
    <div class="max-w-6xl mx-auto p-6 bg-white rounded-md shadow-md">
        <form @submit.prevent="submitTask">
            <div class="mb-4">
                <label for="title" class="block text-gray-700">Title <span class="text-red-500">*</span></label>
                <input v-model="formData.title" id="title" class="w-full border rounded px-3 py-2" />
                <span class="text-xs text-red-500" v-if="errors?.title">{{ errors.title[0] }}</span>
            </div>
            <div class="mb-4">
                <label for="description" class="block text-gray-700">Description</label>
                <textarea v-model="formData.description" id="description" class="w-full border rounded px-3 py-2"></textarea>
                <span class="text-xs text-red-500" v-if="errors?.description">{{ errors.description[0] }}</span>
            </div>
            <div class="mb-4">
                <label for="due_date" class="block text-gray-700">Due Date <span class="text-red-500">*</span></label>
                <input type="date" v-model="formData.due_date" id="due_date" class="w-full border rounded px-3 py-2" />
                <span class="text-xs text-red-500" v-if="errors?.due_date">{{ errors.due_date[0] }}</span>
            </div>
            <div class="mb-4">
                <label for="status" class="block text-gray-700">Status</label>
                <select v-model="formData.status" id="status" class="w-full border rounded px-3 py-2">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <span class="text-xs text-red-500" v-if="errors?.status">{{ errors.status[0] }}</span>
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
        </form>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useTaskStore } from '../../../store/task'
import Breadcrumber from '../../components/Breadcrumber.vue'

const formData = reactive({
    title: '',
    description: '',
    due_date: '',
    status: '',
})

const taskStore = useTaskStore()

const errors = computed(() => taskStore.errors)
const submitTask = (() => {
    taskStore.createNewTask(formData)
})
onMounted(() => {
    taskStore.errors = {}
})
</script>

<style>

</style>

<template>
    <Breadcrumber />
    <div class="max-w-9xl mx-auto p-6">
        <div class="bg-white shadow-lg rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
                <div class="flex items-center space-x-4">
                    <label for="status-filter" class="text-lg text-gray-700">Filter by Status:</label>
                    <select
                        v-model="status"
                        id="status-filter"
                        class="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                        <option selected value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="flex items-center space-x-4">
                    <label for="sort-due-date" class="text-lg text-gray-700">Sort by Due Date:</label>
                    <select
                        v-model="sortOrder"
                        id="sort-due-date"
                        class="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <div class="flex items-center">
                    <router-link
                        :to="{ name: 'app.task.create' }"
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Create Task
                    </router-link>
                </div>
            </div>

            <table class="min-w-full table-auto border-collapse">
                <thead>
                    <tr class="bg-gray-100 text-left">
                        <th class="px-4 py-2 font-medium text-gray-700">ID</th>
                        <th class="px-4 py-2 font-medium text-gray-700">Title</th>
                        <th class="px-4 py-2 font-medium text-gray-700">Description</th>
                        <th class="px-4 py-2 font-medium text-gray-700">Due Date</th>
                        <th class="px-4 py-2 font-medium text-gray-700">Status</th>
                        <th class="px-4 py-2 font-medium text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody v-if="loading">
                    <tr>
                        <td colspan="6" class="text-center px-4 py-2 text-gray-500">
                            <Spinner v-if="loading" />
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-if="tasks.length === 0">
                        <td colspan="6" class="text-center px-4 py-2 text-gray-500">
                            No tasks available
                        </td>
                    </tr>
                    <tr v-for="(task, index) in tasks" :key="task.id" class="border-b">
                        <td class="px-4 py-2">{{ index + 1 }}</td>
                        <td class="px-4 py-2">{{ task.title }}</td>
                        <td class="px-4 py-2">{{ task.description }}</td>
                        <td class="px-4 py-2">{{ task.due_date }}</td>
                        <td class="px-4 py-2">
                            <span
                                v-if="task.status === 'Completed'"
                                class="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs"
                            >
                                Completed
                            </span>
                            <span
                                v-if="task.status === 'In Progress'"
                                class="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs"
                            >
                                In Progress
                            </span>
                            <span
                                v-if="task.status === 'Pending'"
                                class="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs"
                            >
                                Pending
                            </span>
                        </td>
                        <td class="px-4 py-2">
                            <router-link :to="{ name: 'app.task.show', params: { id: task.id } }" class="text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md inline-block">View</router-link>
                            <router-link :to="{ name: 'app.task.edit', params: { id:task.id } }" class="text-yellow-600 hover:bg-yellow-100 px-4 py-2 rounded-md inline-block mx-2">Edit</router-link>
                            <button :disabled="loading" @click="deleteTask(task.id)" class="text-red-600 hover:bg-red-100 px-4 py-2 rounded-md inline-block">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useTaskStore } from '../../../store/task'
import Breadcrumber from '../../components/Breadcrumber.vue'
import Spinner from '../../components/core/Spinner.vue'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)
const loading = computed(() => taskStore.loading)

const status = ref('all')
const sortOrder = ref('asc')

watch([status, sortOrder], ([newStatus, newSortOrder]) => {
  taskStore.getAllTasks(newStatus, newSortOrder)
})
const deleteTask = (id => taskStore.deleteTask(id))
onMounted(() => {
    taskStore.getAllTasks(status.value, sortOrder.value)
})
</script>

<style>

</style>

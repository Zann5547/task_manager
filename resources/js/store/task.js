import { defineStore } from "pinia";
import axiosClient from "../bootstrap";
import Swal from 'sweetalert2';

export const useTaskStore = defineStore('taskStore', {
    state: () => {
        return {
            loading: false,
            errors: {},
            task: [],
            tasks: {},
            links: [],
            from: null,
            to: null,
            page: 1,
            limit: null,
            total: null

        }
    },

    actions: {
        async getAllTasks(status = 'all', sort = 'asc', page = 1)
        {
            this.loading = true,
            this.errors = {}
            try{
                const params = { sort, page }
                if (status !== 'all') {
                    params.status = status
                }
                const response = await axiosClient.get('tasks', { params })
                this.tasks = response.data
                this.links = response.meta.links
                this.from = response.meta.from
                this.to = response.meta.to
                this.limit = response.meta.per_page
                this.page = response.meta.current_page
                this.total = response.meta.total
            } catch(error) {
                console.error('Error fetching tasks:', error)
            } finally {
                this.loading = false
            }
        },

        async createNewTask(formData)
        {
            Swal.close()
            this.loading = true,
            this.errors = {}
            try{
                await axiosClient.post('tasks', formData)
                this.router.push({ name: 'app.task' })
                Swal.fire('Success!', 'Task created successfully.', 'success');
            } catch(error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response?.data?.errors
                }
            } finally {
                this.loading = false
            }
        },

        async showTask(id)
        {
            this.loading = true
            this.errors = {}
            this.task = null
            try{
                const response = await axiosClient.get(`tasks/${id}`)
                this.task = response.data
            } catch(error) {
                console.error('Error fetching task details:', error)
                this.errors = error.response?.data?.errors || {}
            } finally {
                this.loading = false
            }
        },

        async updateTask(updatedTask)
        {
            Swal.close()
            this.loading = true,
            this.errors = {}
            try{
                await axiosClient.put(`tasks/${updatedTask.id}`, updatedTask);
                this.router.push({ name: 'app.task' })
                Swal.fire('Success!', 'Task updated successfully.', 'success');
            } catch(error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors
                }
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async deleteTask(id)
        {
            Swal.close()
            this.loading = true,
            this.errors = {}
            try{
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'You won’t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                });

                if (result.isConfirmed) {
                    await axiosClient.delete(`tasks/${id}`);
                    this.tasks = this.tasks.filter(task => task.id !== id);
                    Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                }
            } catch(error) {
                Swal.fire('Error!', 'Something went wrong!', 'error');
                console.error(error)
            } finally {
                this.loading = false
            }
        }
    }
})

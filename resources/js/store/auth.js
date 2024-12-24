import { defineStore } from "pinia";
import axiosClient from "../bootstrap";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            loading: false,
            user: null,
            token: localStorage.getItem('auth_token') || null,
            errors: {},
        }
    },
    actions: {
        async getUser(){
            this.loading = true
            this.errors = {}
            try{
                const response = await axiosClient.get('/user', {
                    headers: { Authorization: `Bearer ${this.token}` }
                })
                this.user = response.data
            } catch(error) {
                if (error.response && error.response.data.message) {
                    this.errors.general = error.response?.data?.message
                }
            } finally {
                this.loading = false;
            }
        },

        async register(formData){
            this.loading = true
            this.errors = {}
            try {
                const response = await axiosClient.post('/register', formData)
                this.user = response.user
                this.token = response.token
                localStorage.setItem('auth_token', this.token)
                this.router.push({ name: 'app.dashboard' })
            } catch(error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response?.data?.errors
                }
                throw error
            } finally {
                this.loading = false
            }
        },

        async login(formData){
            this.loading = true
            this.errors = {}
            try {
                const response = await axiosClient.post('/login', formData)
                this.user = response.user
                this.token = response.token
                localStorage.setItem('auth_token', this.token)
                this.router.push({ name: 'app.dashboard' })
            } catch(error) {
                if (error.response) {
                    if (error.response.data.message) {
                        this.errors.general = error.response?.data?.message;
                    }
                    if (error.response.data.errors) {
                        this.errors = error.response?.data?.errors;
                    }
                } else {
                    this.errors.general = 'An unexpected error occurred.';
                }
            } finally {
                this.loading = false
            }
        },

        async logout(){
            this.loading = true
            try{
                await axiosClient.post('/logout')
                this.user = null;
                this.token = null;
                localStorage.removeItem('auth_token');
                this.router.push({ name: 'login' })
            } catch(error) {
                console.error('Logout failed:', error);
            } finally {
                this.loading = false
            }

        }
    }
})

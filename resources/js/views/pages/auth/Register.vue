<template>
    <GuestLayout title="Register your account">
        <form class="space-y-6" method="POST" @submit.prevent="registerUser">
            <div>
                <label for="name" class="block text-sm/6 font-medium text-gray-900">Enter Name</label>
                <div class="mt-2">
                    <input
                        v-model="formData.name"
                        type="text"
                        id="name"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <span class="text-xs text-red-500" v-if="errors?.name">{{ errors.name[0] }}</span>
                </div>
            </div>
            <div>
                <label for="email" class="block text-sm/6 font-medium text-gray-900">Enter Email address</label>
                <div class="mt-2">
                    <input
                        v-model="formData.email"
                        type="email"
                        id="email"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <span class="text-xs text-red-500" v-if="errors?.email">{{ errors.email[0] }}</span>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Enter Password</label>
                </div>
                <div class="mt-2">
                    <input
                        v-model="formData.password"
                        type="password"
                        id="password"
                        autocomplete="password"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <span class="text-xs text-red-500" v-if="errors?.password">{{ errors.password[0] }}</span>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password_confirmation" class="block text-sm/6 font-medium text-gray-900">Confirm Your Password</label>
                </div>
                <div class="mt-2">
                    <input
                        v-model="formData.password_confirmation"
                        type="password"
                        id="password_confirmation"
                        autocomplete="password_confirmation"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <button
                    :disabled="authStore.loading"
                    type="submit"
                    :class="{ 'cursor-not-allowed': authStore.loading }"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Register
                </button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
            <router-link :to="{ name: 'login' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Already have an account?</router-link>
        </p>
    </GuestLayout>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useAuthStore } from '../../../store/auth'
import GuestLayout from '../../layouts/GuestLayout.vue'

const authStore = useAuthStore()

const errors = computed(() => authStore.errors)
const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const registerUser = (() => {
    authStore.register(formData)
})

onMounted(() => {
    authStore.errors = {}
})
</script>

<style>

</style>

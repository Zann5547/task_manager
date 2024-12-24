<template>
    <aside class="w-64 bg-gray-800 text-white min-h-full">
        <nav class="py-6">
            <ul class="space-y-2 px-4">
                <li>
                    <router-link :to="{ name: 'app.dashboard' }" active-class="bg-gray-500 text-white" class="block py-2 px-4 rounded hover:bg-gray-700">
                        <div class="flex items-center">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </span>
                            <span class="pl-2">Dashboard</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'app.task' }" active-class="bg-gray-500 text-white" class="block py-2 px-4 rounded hover:bg-gray-700">
                        <div class="flex items-center">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </span>
                            <span class="pl-2">Tasks</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>

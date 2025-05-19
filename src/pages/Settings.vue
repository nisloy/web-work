<template>
    <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 space-y-6">
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance</h2>

                    <div class="space-y-4">
                        <div>
                            <label class="flex items-center">
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">Theme</span>
                                <div class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" :checked="isDarkMode" @change="toggleDarkMode"
                                        class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">
                                    </div>
                                    <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Management</h2>

                    <div class="space-y-4">
                        <div>
                            <button
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                Export Data
                            </button>
                        </div>

                        <div>
                            <button
                                class="w-full px-4 py-2 border border-red-300 dark:border-red-900 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                Reset All Data
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications</h2>

                    <div class="space-y-4">
                        <div>
                            <label class="flex items-center">
                                <input type="checkbox" v-model="settings.emailReminders"
                                    class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700">
                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Send monthly reminder emails
                                </span>
                            </label>
                        </div>

                        <div v-if="settings.emailReminders">
                            <label for="reminderDay"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Reminder Day
                            </label>
                            <select id="reminderDay" v-model="settings.reminderDay"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                                <option v-for="day in 28" :key="day" :value="day">
                                    {{ day }}{{ getDaySuffix(day) }} of each month
                                </option>
                            </select>
                        </div>

                        <div class="pt-2 text-sm text-gray-500 dark:text-gray-400">
                            <p>
                                You'll receive a summary of your financial goals and transactions on the
                                {{ settings.reminderDay }}{{ getDaySuffix(settings.reminderDay) }} of each month.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow px-6 pt-6 pb-12 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile</h2>

                    <div class="flex flex-col items-center mb-6">
                        <div
                            class="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl font-bold mb-3">
                            {{ getInitials('AMUZA MUGISHA') }}
                        </div>
                        <h3 class="text-md font-medium text-gray-900 dark:text-white">AMUZA MUGISHA</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">amuza@nis.com</p>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input id="name" type="text" value="User Name"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input id="email" type="email" value="user@example.com"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                        </div>

                        <div>
                            <label for="password"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input id="password" type="password" value="********"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                        </div>

                        <div class="pt-2">
                            <button
                                class="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="mt-6 flex justify-end">
            <button @click="saveSettings"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                Save Settings
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useFinanceStore } from '../stores/financeStore';

const store = useFinanceStore();
const isDarkMode = ref(false);

// Clone settings from store
const settings = reactive({ ...store.settings });

// Format currency based on settings
const formatCurrency = (value) => {
    return new Intl.NumberFormat(settings.locale, {
        style: 'currency',
        currency: settings.currency
    }).format(value);
};

// Format date
const formatDate = (date) => {
    return date.toLocaleDateString(settings.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th';

    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

const getInitials = (name) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase();
};

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;

    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('darkMode', isDarkMode.value);
};

// Save settings
const saveSettings = () => {
    store.updateSettings(settings);
    alert('Settings saved successfully!');
};
onMounted(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        isDarkMode.value = savedTheme === 'true';
    } else {
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
</script>
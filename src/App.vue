<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Navigation Bar -->
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-emerald-600 dark:text-emerald-400">FinanceGoals</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[$route.path === item.href ? 'border-emerald-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600']">
                <component :is="item.icon" class="h-5 w-5 mr-1" />
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <button @click="toggleDarkMode"
              class="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <sun-icon v-if="isDarkMode" class="h-6 w-6" />
              <moon-icon v-else class="h-6 w-6" />
            </button>
          </div>
          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <menu-icon v-if="!mobileMenuOpen" class="h-6 w-6" />
              <x-icon v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link v-for="item in navigation" :key="item.name" :to="item.href"
            class="flex items-center px-3 py-2 text-base font-medium"
            :class="[$route.path === item.href ? 'bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800']"
            @click="mobileMenuOpen = false">
            <component :is="item.icon" class="h-5 w-5 mr-2" />
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  HomeIcon, ChartBarIcon, CreditCardIcon, 
  CogIcon, SunIcon, MoonIcon, MenuIcon, XIcon
} from 'lucide-vue-next';

const $route = useRoute();
const mobileMenuOpen = ref(false);
const isDarkMode = ref(false);

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Goals', href: '/goals', icon: ChartBarIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Reports', href: '/reports', icon: CreditCardIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value);
  updateTheme();
};

const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

onMounted(() => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme !== null) {
    isDarkMode.value = savedTheme === 'true';
  } else {
    // Check for system preference
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  updateTheme();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
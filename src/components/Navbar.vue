<template>
    <header class="bg-white shadow-md sticky top-0 z-50">
        <!-- Desktop Navigation -->
        <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
            <router-link to="/" class="flex items-center">
                <div
                    class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    EventHub
                </div>
            </router-link>

            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-6">
                <router-link v-for="item in menuItems" :key="item.path" :to="item.path"
                    class="text-gray-700 hover:text-primary transition-colors duration-200 font-medium relative group">
                    {{ item.name }}
                    <span
                        class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </router-link>
            </div>

            <!-- Desktop Action Buttons -->
            <div class="hidden md:flex items-center space-x-4">
                <button
                    class="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                    Sign In
                </button>
                <button
                    class="px-4 py-2 rounded-md gradient-primary text-white hover:opacity-90 transition-opacity duration-200 shadow-md hover:shadow-lg">
                    Sign Up
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <button @click="toggleMobileMenu" class="md:hidden text-gray-700">
                <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </nav>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg py-4 px-6 absolute w-full z-50"
            v-click-outside="closeMobileMenu">
            <div class="flex flex-col space-y-4">
                <router-link v-for="item in menuItems" :key="item.path" :to="item.path" @click="mobileMenuOpen = false"
                    class="text-gray-700 hover:text-primary py-2 transition-colors duration-200 font-medium">
                    {{ item.name }}
                </router-link>
                <div class="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                    <button
                        class="w-full px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                        Sign In
                    </button>
                    <button
                        class="w-full px-4 py-2 rounded-md gradient-primary text-white hover:opacity-90 transition-opacity duration-200 shadow-md">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
];

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
};

// Click outside directive
const vClickOutside = {
    mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
    }
};
</script>
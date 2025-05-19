<template>
    <footer class="bg-gray-900 text-white">
        <!-- Wave Divider -->
        <div class="w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" class="w-full h-auto fill-gray-50">
                <path
                    d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                </path>
            </svg>
        </div>

        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Company Info -->
                <div>
                    <h3
                        class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                        EventHub</h3>
                    <p class="text-gray-300 mb-4">Discover and book the best events happening around you.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-300 hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </a>
                        <a href="#" class="text-gray-300 hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </a>
                        <a href="#" class="text-gray-300 hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li v-for="(link, index) in quickLinks" :key="index">
                            <router-link :to="link.path"
                                class="text-gray-300 hover:text-primary transition-colors flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                                {{ link.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Categories -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Event Categories</h3>
                    <ul class="space-y-2">
                        <li v-for="(category, index) in categories" :key="index">
                            <a href="#" class="text-gray-300 hover:text-primary transition-colors flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                {{ category }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Subscribe</h3>
                    <p class="text-gray-300 mb-4">Stay updated with our latest events and offers.</p>
                    <form @submit.prevent="subscribeNewsletter" class="flex flex-col space-y-3">
                        <input type="email" v-model="email" placeholder="Your email address" required
                            class="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
                        <button type="submit"
                            class="px-4 py-2 rounded-md gradient-primary hover:opacity-90 transition-opacity text-white font-medium shadow-md">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>&copy; 2023 EventHub. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
];

const categories = [
    'Music',
    'Technology',
    'Food',
    'Art',
    'Sports',
    'Entertainment'
];

const subscribeNewsletter = () => {
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email.value}!`);
    email.value = '';
};
</script>
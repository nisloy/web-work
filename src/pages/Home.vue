<template>
    <div>
        <section id="home">
            <Hero />
        </section>
        <section id="partners">
            <Partners />
        </section>
        <section id="process">
            <Process />
        </section>
        <section id="features">
            <Features />
        </section>
        <section id="faq">
            <Faq />
        </section>
        <section id="contact">
            <Contact />
        </section>
        <ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up"
            :buttonProps="{ severity: 'contrast', raised: true, rounded: true }" />
    </div>
</template>

<script setup>
import ScrollTop from 'primevue/scrolltop';
import Hero from '@/components/Hero.vue'
import Partners from '@/components/Partners.vue'
import Process from '@/components/Process.vue'
import Features from '@/components/Features.vue'
import Faq from '@/components/Faq.vue'
import Contact from '@/components/Contact.vue'
</script>

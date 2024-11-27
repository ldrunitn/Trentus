<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue';
import ServicesCards from './components/ServicesCards.vue';
import SidebarLeft from './components/SidebarLeft.vue';

const sidebarSections = [ //prova sidebar
  {
    title: 'Sezione 1',
    items: [
      {
        label: 'Item 1',
        details: ['Dettaglio 1', 'Dettaglio 2'],
      },
      {
        label: 'Item 2',
        details: ['Dettaglio 1', 'Dettaglio 2'],
      },
    ],
  },
  {
    title: 'Sezione 2',
    items: [
      {
        label: 'Item 1',
        details: ['Dettaglio 1', 'Dettaglio 2'],
      },
      {
        label: 'Item 2',
        details: ['Dettaglio 1', 'Dettaglio 2'],
      },
    ],
  },
]
</script>

<template>
  <Navbar />
  <div class="flex flex-row">
    <div class="basis-1/4"><SidebarLeft :sections="sidebarSections"/></div>
    <div class="basis-1/2"><ServicesCards /></div>
  </div>
  
  
  <RouterView />
  

</template>

<style scoped>

</style>

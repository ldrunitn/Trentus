<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ServicesCards from './components/ServicesCards.vue';
import SidebarLeft from './components/SidebarLeft.vue';
import SidebarRight from './components/SidebarRight.vue';
import AdminHomeView from './views/AdminHomeView.vue';

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
  
  <AdminHomeView></AdminHomeView>
  <RouterView />
  

</template>

<style scoped>

</style>

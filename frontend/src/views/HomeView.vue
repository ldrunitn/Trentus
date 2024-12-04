<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Navbar from '../components/Navbar.vue';
import SidebarLeft from '@/components/SidebarLeft.vue';
import SidebarRight from '@/components/SidebarRight.vue';
import ServicesCard from '@/components/ServicesCard.vue';
import { ref, onMounted, onBeforeMount, computed} from 'vue';
import { useStore } from 'vuex';
// const sidebarSections = [ //prova sidebar
//   {
//     title: 'Sezione 1',
//     items: [
//       {
//         label: 'Item 1',
//         details: ['Dettaglio 1', 'Dettaglio 2'],
//       },
//       {
//         label: 'Item 2',
//         details: ['Dettaglio 1', 'Dettaglio 2'],
//       },
//     ],
//   },
//   {
//     title: 'Sezione 2',
//     items: [
//       {
//         label: 'Item 1',
//         details: ['Dettaglio 1', 'Dettaglio 2'],
//       },
//       {
//         label: 'Item 2',
//         details: ['Dettaglio 1', 'Dettaglio 2'],
//       },
//     ],
//   },
// ]


const loading = ref(true);
const store = useStore();
const services = computed(() => {
  console.log("computed services");
  return store.getters['user/getServices'];
});
onMounted( async () => {
  console.log("Creata");
  try {
    await store.dispatch('user/fetchServices')
    loading.value = false;
    console.log("loading finito");
    const servizi = store.getters['user/getServices'];
    console.log(servizi[0].titolo);
  } catch (error) {
    console.error(error)
  }
})

// onBeforeMount(async () => {
  
// })
</script>

<template>
<!-- scheletro homepage: -->
  <!-- homecards (servizi) (v-for con tutte le api dei servizi) -->
  <!-- navbar superiore  (abbastanza statico, basta che reindirizzi dove deve)-->
  <!-- sidebars (a destra bisogna fare un v-for con dellle mini schede api, a sinistra dei paragrafi che si possano collassare )  -->
   <!-- vabbé in teoria è fatta basta copiaincollare il template di App.vue -->
  <Navbar />
  <div class="flex flex-row h-screen" >
    <div class="basis-1/4 h-full"><SidebarLeft :sections="sidebarSections"/></div>
    <div class="flex-grow" v-if="!loading"> <ServicesCard v-for="service in services" :service="service"/> </div>
    <div class="basis-1/4 flex justify-end h-full"><SidebarRight/> </div>
  </div>
  <!-- like this -->
</template>

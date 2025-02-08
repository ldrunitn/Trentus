<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Navbar from '../components/Navbar.vue';
import SidebarLeft from '@/components/SidebarLeft.vue';
import SidebarRight from '@/components/SidebarRight.vue';
import AdminSidebarLeft from '../components/admin/sidebarLeft/AdminSidebarLeft.vue';
import { ref, onMounted, onBeforeMount, computed, reactive} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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

const sidebarSections = reactive([
]); //per le sezioni della sidebar sinistra

const loading = ref(true);
const store = useStore();
const route = useRoute();
const router = useRouter();
const services = computed(() => {
  return store.getters['user/getServices'];
});
const alerts = computed(()=>{
  return store.getters['user/getAlerts'];
})
const SidebarSections = computed(()=>{
  return sidebarSections;
});

const avvisi = ref({});
async function initSideBarLeftUser() {
  try {
    //fetch dei servizi
    await store.dispatch('user/fetchServices')    
    
    loading.value = false;
    const servizi = store.getters['user/getServices'];

    //fetch alerts dei preferiti
    await store.dispatch('user/fetchAlerts');

    //formatto gli alerts per la sidebar
    let alertSection = {
      title: "Notifiche",
    };
    //guardo tutti i servizi che hanno mandato notifiche
    let itemsArray = [];
    for(const id in alerts.value){
      let item = {};
      item["label"] = id;
      //scorro gli alerts
      let details = [];
      for(const al of alerts.value[id]){
        //trovo l'id del servizio corrispondente all'alert
        const service_id = servizi.find(servizio => servizio['titolo'] === id)['_id'];
        const o = {
          id: al._id,
          service_id: service_id,
          titolo: al.titolo,
        }
        details.push(o);
      }
      item["details"] = details;
      itemsArray.push(item);
    }
    alertSection["items"] = itemsArray;

    sidebarSections.push(alertSection);

    
  } catch (error) {
    console.error("Errore nell'inizializzazione della sidebar");
  } 
}
async function initSideBarLeftGdS() {
  try {
    let titoloServizio;
    const service_id = route.params.service_id;
    await axios.get(BACKEND_URL + `/servizi/${service_id}`)
    .then(response => {
      titoloServizio = response.data.titolo
    })
    await axios.get(BACKEND_URL + `/servizi/${service_id}/avvisi`)
    .then(response => {
    avvisi.value = response.data;
    })
    //formatto gli alerts per la sidebar
    let alertSection = {
      title: "Avvisi mandati",
    };
    //guardo tutti i servizi che hanno mandato notifiche
    let itemsArray = [];
    let details = [];
    let item = {};
    item["label"] = ''; //item contenitore di tutti gli alerts
    
    for(const alert of avvisi.value){
      const o = {
        id: alert._id,
        service_id: service_id,
        titolo: alert.titolo,
      }
      details.push(o);
      //scorro gli alerts 
    }
    itemsArray.push(item);
    item["details"] = details;



    alertSection["items"] = itemsArray;

    sidebarSections.push(alertSection);
  }
  catch (error) {
    console.error("Errore nell'inizializzazione della sidebar");
  }
}


async function initSideBarLeft() {
  let role = store.getters['getRole'];
  if(role === 'user') {
    await initSideBarLeftUser();
  } else if(role === 'gds') {
    await initSideBarLeftGdS();
  }
}
onMounted(async() => {
  await initSideBarLeft();
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
   <div class="grid grid-cols-7 h-screen" >
    <div class=" col-start-1 col-span-1 h-full">
      <SidebarLeft :sections="SidebarSections" v-if="sidebarSections.length >= 1 && store.getters['getRole'] !=='admin'"/>
      <AdminSidebarLeft v-else></AdminSidebarLeft>
    </div>
      <router-view class="col-start-3 col-span-3 overflow-y-scroll" :key="route.fullPath"></router-view>
    <div class="flex h-full col-start-7 col-span-1"><SidebarRight/> </div>
  </div>
</template>

<style>

</style>

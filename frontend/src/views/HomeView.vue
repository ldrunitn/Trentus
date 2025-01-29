<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Navbar from '../components/Navbar.vue';
import SidebarLeft from '@/components/SidebarLeft.vue';
import SidebarRight from '@/components/SidebarRight.vue';
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
  console.log("computed services");
  return store.getters['user/getServices'];
});
const alerts = computed(() => {
  console.log("computed alerts");
  return store.getters['user/getAlerts'];
});
const SidebarSections = computed(()=>{
  return sidebarSections;
});
onMounted( async () => {
  console.log("Creata");
  await initSideBarLeft();
  
})

const avvisi = ref({});
async function initSideBarLeftUser() {
  console.log('sono iuser')
  try {
    //fetch dei servizi
    await store.dispatch('user/fetchServices')    
    
    loading.value = false;
    const servizi = store.getters['user/getServices'];

    //fetch alerts dei preferiti
    await store.dispatch('user/fetchAlerts');
    const alerts = store.getters['user/getAlerts'];

    //formatto gli alerts per la sidebar
    let alertSection = {
      title: "Notifiche",
    };
    //guardo tutti i servizi che hanno mandato notifiche
    let itemsArray = [];
    for(const id in alerts){
      let item = {};
      item["label"] = id;
      //scorro gli alerts
      let details = [];
      for(const al of alerts[id]){
        details.push(al.titolo);
      }
      item["details"] = details;
      itemsArray.push(item);
    }
    alertSection["items"] = itemsArray;

    sidebarSections.push(alertSection);

    console.log(sidebarSections);
    
  } catch (error) {
    console.error(error)
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
    console.log('avvisis:')
    console.log(avvisi.value);
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
      console.log(alert);
      details.push(alert.titolo);
      //scorro gli alerts 
    }
    itemsArray.push(item);
    item["details"] = details;



    alertSection["items"] = itemsArray;

    sidebarSections.push(alertSection);

    console.log('poppa::')
    console.log(sidebarSections);
  }
  catch (error) {
    console.error(error);
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
    <div class=" col-start-1 col-span-1 h-full"><SidebarLeft :sections="SidebarSections" v-if="sidebarSections.length >= 1"/></div>
      <router-view class="col-start-3 col-span-3" :key="route.fullPath"></router-view>
    <div class="flex h-full col-start-7 col-span-1"><SidebarRight/> </div>
  </div>
</template>

<style>

</style>

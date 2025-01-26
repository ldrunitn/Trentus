<script setup>
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js'
import { data } from 'autoprefixer';
import PopupReport from '@/components/PopupReport.vue';
import axios from 'axios';
import { onMounted, ref, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import Comment from '@/components/services/Comment.vue';
import { comment } from 'postcss';
import { useStore } from 'vuex';
import EditForm from './gds/EditForm.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const route = useRoute();
const store = useStore();

const role = store.getters['getRole'];
const service_id = route.params.service_id;

ChartJS.register(Title, ArcElement, Tooltip, /*Legend,*/ BarElement, CategoryScale, LinearScale);

const service = ref({});
const comments = ref({});
//fetcha il servizio con id == service_id (prop)
async function fetchService(){
  console.log("fetch del servizio");
    try{
        await axios.get(BACKEND_URL + `/servizi/${service_id}`,)
        .then(response => {
            service.value = response.data;
            store.commit("gds/setService",response.data);
        })  
    }
    catch(e){
        console.error(e);
    }
    console.log(service.value);
}
//stessa cosa per i commenti
async function fetchComments(){
  try{
    await axios.get(BACKEND_URL + `/servizi/${service_id}/segnalazioni/commenti`,)
    .then(response => {
        comments.value = response.data;
        console.log("Commenti fetchati");
        console.log(comments.value);
    })  
  }
  catch(e){
      console.error(e);
  }

}
//le chiamo subito
onMounted(async()=> {
  await fetchService();
  await fetchComments();

});
const chartData = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: [ '#7f79f8' ],
            data: [40, 20, 30, 50, 60, 70, 80, 90, 100, 110]
        }
    ]
}

const chartOptionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            grid: {
                display: true
            },
        },
        x: {
            grid: {
                display: false
            },
        }
    }
}

const chartOptionsDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
    // scales: {
    //     y: {
    //         grid: {
    //             display: false
    //         },
    //     },
    //     x: {
    //         grid: {
    //             display: false
    //         },
    //     }
    // }
}
</script>

<template>
    <div class="flex h-screen bg-gray-100 service">
     
      <!-- Area principale -->
      <main class="flex-1 p-6">
        <!-- Informazioni Servizio -->
        <div class="bg-white p-4 rounded shadow flex items-center justify-between">
            <div class="flex-shrink-0 flex flex-col space-y-5">
                <p>{{ service["foto"] }}</p>
                <p class="text-3xl">
                  <span>{{ service["titolo"] }}</span><br>
                  <span class="text-lg text-gray-400">Azienda: {{ service["azienda"] }}</span>
                </p>
                <p class="text-xs text-gray-700">Descrizione: {{ service["descrizione"] }}</p>
            
              </div>

            <div class="ml-4 flex-row space-x-4">
                <h2 class="text-red-500 mr-4" v-if="service['stato'] == 'off'">Servizio Offline <i class="pi pi-circle-fill text-red-500 text-sm ml-1 align-middle"></i></h2>
                <h2 class="text-green-500 mr-4" v-else >Servizio Online <i class="pi pi-circle-fill text-green-500 text-sm ml-1 align-middle"></i></h2>

                <router-link class="btn bg-red-500 text-white rounded-lg text-center" v-if="role==='user'" :to="`/service/${service_id}/report`">Segnala</router-link>
                <router-link class="btn bg-blue-500 text-white rounded-lg text-center" v-if="role === 'admin' || role === 'gds'" :to="`/gds/${service_id}/modify`">Modifica</router-link> <!-- viene mostrato solamente se il ruolo è admin o gds -->
                <!-- <PopupReport/> -->
            </div>
        </div>

        <!-- Grafico e commenti -->
        <div class="grid grid-cols-3 gap-4 pt-4">
          <!-- Grafico a barre -->
          <div class="col-span-3 bg-white p-4 rounded shadow">
            <h3 class="font-semibold mb-4">Segnalazioni negli ultimi 10 giorni</h3>
            <div class="h-40 bg-white rounded"><Bar id="my-chart-id" :options="chartOptionsBar" :data="chartData"/></div>
          </div>
  
          <!-- Commenti -->
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold mb-4">Commenti</h3>
            <ul class="space-y-3">
              <comment
                v-for="c in comments"
                :text="c['commento']"
                :email = "c['utente_id']['email']"
              ></comment>
            </ul>
          </div>

        

          <!-- Grafico a ciambella -->
          <div class="bg-white p-4 rounded shadow col-span-2">
            <h3 class="font-semibold mb-2">Motivo delle segnalazioni</h3>
            <div class="h-40 bg-white rounded"><Doughnut id="my-chart-id" :options="chartOptionsDoughnut" :data="chartData"/></div>
          </div>
          <!-- Form di segnalazione -->
          <edit-form v-if="role === 'admin' || role === 'gds'" :service="service" @update-form="fetchService"></edit-form>
        </div>

        
      </main>  
    </div>
  </template>
  
  <style scoped>
  .service::-webkit-scrollbar{
    display: none;
  }
  .service{
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-bottom: 30px;
  }
  </style>
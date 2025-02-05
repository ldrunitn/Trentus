<script setup>
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js'
import { data } from 'autoprefixer';
import PopupReport from '@/components/PopupReport.vue';
import axios from 'axios';
import { onMounted, ref, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Comment from '@/components/services/Comment.vue';
import { comment } from 'postcss';
import { useStore } from 'vuex';
import GoBackButton from '../components/GoBackButton.vue';
import EditForm from './gds/EditForm.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const route = useRoute();
const router = useRouter();
const store = useStore();

const role = store.getters['getRole'];
const service_id = route.params.service_id;

ChartJS.register(Title, ArcElement, Tooltip, /*Legend,*/ BarElement, CategoryScale, LinearScale, PieController);

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
  console.log('protazzo')
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

const chartDataIstogramma = ref({
    labels: [],
    datasets: [
        {
            label: '',
            backgroundColor: [ '#7e22ce' ],
            data: []
        }
    ]
})
const chartDataAreogramma = ref({
    labels: [],
    datasets: [
        {
            label: '',
            backgroundColor: [ '#7e22ce' ],
            data: []
        }
    ]
})

const chartOptionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,  // Aggiungi questa riga
            min: 0,             // Aggiungi questa riga
            grid: {
                display: true
            },
            ticks: {
                precision: 0,    // Aggiungi questa riga per mostrare solo numeri interi
                stepSize: 1      // Aggiungi questa riga per avere step di 1
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
}

const chartOptionsDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
}

const istogrammaData = ref([]);
const areogrammaData = ref([]);

async function fetchGraphs() {
  try {
    // Fetch istogramma
    const istogrammaResponse = await axios.get(BACKEND_URL + `/servizi/${service_id}/segnalazioni/istogramma`);
    istogrammaData.value = istogrammaResponse.data;
    console.log('Istogramma fetchato:', istogrammaData.value);

    // Fetch areogramma
    const areogrammaResponse = await axios.get(BACKEND_URL + `/servizi/${service_id}/segnalazioni/areogramma`);
    areogrammaData.value = areogrammaResponse.data;
    console.log('Areogramma fetchato:', areogrammaData.value);

    // Aggiorna dati per il grafico a barre (istogramma)
    if (typeof istogrammaData.value === "object" && !Array.isArray(istogrammaData.value)) {
      chartDataIstogramma.value.labels = Object.keys(istogrammaData.value);
      chartDataIstogramma.value.datasets[0].data = Object.values(istogrammaData.value);
    } else if (Array.isArray(istogrammaData.value)) {
      chartDataIstogramma.value.labels = istogrammaData.value.map((_, i) => `Giorno ${i + 1}`);
      chartDataIstogramma.value.datasets[0].data = istogrammaData.value;
    } else {
      console.error("Formato dati istogramma non valido:", istogrammaData.value);
    }

    // Aggiorna dati per il grafico a ciambella (areogramma)
    // Aggiorna dati per il grafico a ciambella (areogramma)

  // chartDataAreogramma.value.labels = areogrammaData.value.map(item => item.risposta.risposta);
  // chartDataAreogramma.value.datasets[0].data = areogrammaData.value.map(item => item.count);
  // console.log("Dati per il grafico a ciambella:", chartDataAreogramma.value);
  // chartDataAreogramma.value = { ...chartDataAreogramma.value };
  chartDataAreogramma.value = {
    labels: areogrammaData.value.map(item => item.risposta.risposta),
    datasets: [{
      label: '',
      backgroundColor: ['#7e22ce'],
      data: areogrammaData.value.map(item => item.count)
    }]
  };

  // Aggiorna dati per il grafico a barre (istogramma)
// Aggiorna dati per il grafico a barre (istogramma)
if (istogrammaData.value) {
  chartDataIstogramma.value = {
    labels: istogrammaData.value.map(item => item.date),  // Usa le date come labels
    datasets: [{
      label: 'Segnalazioni',
      backgroundColor: '#7e22ce',
      data: istogrammaData.value.map(item => item.count)  // Usa i count come valori
    }]
  };
}





  } catch (error) {
    console.error("Errore nel fetch dei grafici:", error);
  }
}

//le chiamo subito
onMounted(async()=> {
  await fetchService();
  await fetchComments();
  comments.value.reverse();
  await fetchGraphs();

});

</script>

<template>
  <div class="flex h-screen bg-gray-100 service overflow-hidden">
    <!-- Area principale -->
    <main class="flex-1 p-6 overflow-y-auto">
      <!-- Informazioni Servizio -->
      <div class="bg-white p-4 rounded shadow flex items-center justify-between">
        <div class="flex-shrink-0 flex flex-col space-y-5">
          <img :src="BACKEND_URL + service['foto']" alt="Logo" class="max-w-40 max-h-40">
          <p class="text-3xl">
            <span>{{ service["titolo"] }}</span><br>
            <span class="text-lg text-gray-400">Azienda: {{ service["azienda"] }}</span>
          </p>
          <p class="text-xs text-gray-700">Descrizione: {{ service["descrizione"] }}</p>
        </div>
        <div class="ml-4 flex-row space-x-4">
          <h2 class="text-red-500 mr-4" v-if="service['stato'] == 'off'">Servizio Offline <i class="pi pi-circle-fill text-sm/8"></i></h2>
          <h2 class="text-green-500 mr-4" v-else>Servizio Online <i class="pi pi-circle-fill text-sm/8"></i></h2>
          <router-link
            class="btn bg-red-500 text-white rounded-lg text-center mt-2"
            v-if="role === 'user'"
            :to="`/service/${service_id}/report`"
          >Segnala</router-link>
          <router-link
            class="btn bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center"
            v-if="role === 'admin' || role === 'gds'"
            :to="`/gds/${service_id}/modify`"
          >Modifica</router-link>
          <router-link
            class="btn bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center"
            v-if="role === 'admin' || role === 'gds'"
            :to="`/gds/${service_id}/sendalert`"
          >Invia un avviso</router-link>
        </div>
      </div>

      <!-- Grafico e commenti -->
      <div class="grid grid-cols-3 gap-4 pt-4">
        <!-- Grafico a barre -->
        <div class="col-span-3 bg-white p-4 rounded shadow">
          <h3 class="font-semibold mb-4">Segnalazioni negli ultimi 10 giorni</h3>
          <div class="h-40"><Bar :options="chartOptionsBar" :data="chartDataIstogramma" /></div>
        </div>

        <!-- Commenti -->
        <div class="bg-white p-4 rounded shadow comments-container max-h-72 overflow-y-scroll col-span-2">
          <h3 class="font-semibold mb-4">Commenti</h3>
          <ul class="space-y-3">
            <comment
              v-for="c in comments"
              :key="c.id"
              :text="c.commento"
              :email="c.utente_id.email"
            />
          </ul>
        </div>

        <!-- Grafico a ciambella -->
        <div class="bg-white p-4 rounded shadow col-span-1">
          <h3 class="font-semibold mb-2">Motivo delle segnalazioni</h3>
          <div class="h-40"><Doughnut :options="chartOptionsDoughnut" :data="chartDataAreogramma" /></div>
        </div>

        <!-- Form di segnalazione -->
        <edit-form
          class="col-start-1 col-span-3"
          v-if="role === 'admin' || role === 'gds'"
          :service="service"
          @update-form="fetchService"
        ></edit-form>
        <GoBackButton class="col-end-4" v-if="role === 'user' || role === 'admin'"></GoBackButton>
      </div>
    </main>
  </div>
</template>

  
  <style scoped>
  main::-webkit-scrollbar{
    display: none;
  }
  main{
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin-bottom: 50px;
  }
  </style>
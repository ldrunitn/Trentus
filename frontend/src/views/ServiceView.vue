<script setup>
import Navbar from '@/components/Navbar.vue'
import SidebarLeft from '@/components/SidebarLeft.vue'
import SidebarRight from '@/components/SidebarRight.vue'
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js'
import { data } from 'autoprefixer';
import PopupReport from '@/components/PopupReport.vue';

ChartJS.register(Title, ArcElement, Tooltip, /*Legend,*/ BarElement, CategoryScale, LinearScale)


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
    <Navbar/>
    <div class="flex h-screen bg-gray-100">
    
      <SidebarLeft :sections="sidebarSections"/>
  
      <!-- Area principale -->
      <main class="flex-1 p-6">
        <!-- Informazioni Servizio -->
        <div class="bg-white p-4 rounded shadow flex items-center justify-between">
            <div class="flex-shrink-0"><img src="@/assets/logo.svg" alt="Logo"></div>
            <div class="ml-4">
                <h2 class="text-red-500 mr-4">Servizio Offline <i class="pi pi-circle-fill text-red-500 text-sm ml-1 align-middle"></i></h2>
                <!-- <button class="bg-red-500 text-white rounded-lg border-slate-950 shadow mt-1 w-20 h-8 text-center">Segnala</button> -->
                <PopupReport/>
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
            <ul>
              <li class="mb-4">
                <strong>@MarcoUser01</strong>
                <p>Ottimo servizio!</p>
              </li>
              <li>
                <strong>@LuigiUser02</strong>
                <p>Alcuni aspetti migliorabili.</p>
              </li>
            </ul>
          </div>

        

          <!-- Grafico a ciambella -->
          <div class="bg-white p-4 rounded shadow col-span-2">
            <h3 class="font-semibold mb-2">Motivo delle segnalazioni</h3>
            <div class="h-40 bg-white rounded"><Doughnut id="my-chart-id" :options="chartOptionsDoughnut" :data="chartData"/></div>
          </div>
        </div>
      </main>  
      <SidebarRight/> 
    </div>
  </template>
  

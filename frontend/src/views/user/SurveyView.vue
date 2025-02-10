<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import MakeSurvery from '../gds/MakeSurvery.vue';
import GoBackButton from '@/components/GoBackButton.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const props = defineProps({
  survey_id:{
    type: String,
    required : true
  },
  service_id:{
    type: String,
    required: true
  }
})
const store = useStore();
const service = ref({});
const survey = ref({});
const singoleRisposte = ref([]);  // Risposte per le domande singole
const raccolteRisposte = ref({});  // Risposte per le domande di tipo "raccolta"
const aperteRisposte = ref({});
const singole = computed(() => {
  return corpo.value.filter(opzione => opzione.type === 'singola');
});

const raccolte = computed(() => {
  return corpo.value.filter(opzione => opzione.type === 'raccolta');
});

const aperte = computed(()=>{
  return corpo.value.filter(opzione => opzione.type === 'aperta');
})

const corpo = ref([]);

function getService(){
  let services = store.getters['user/getServices'];
  service.value = services.find(s => s._id === props.service_id);
}

async function fetchSurvey() {
  try {
    const url = BACKEND_URL + `/servizi/${props.service_id}/sondaggi/${props.survey_id}`;
    const response = await axios.get(url, {
      headers: {
        authorization: store.getters['getToken']
      }
    });
    survey.value = response.data;
    corpo.value = response.data.corpo || [];
  } catch (err) {
    console.error(err);
  }
}

async function submit() {
  let formData = {risposte: []};
  //risposte singole
  for(let item of singoleRisposte.value){
    formData.risposte.push({type: 'singola', risposta: item})
  }
  //risposte alle raccolte
  for(const key in raccolteRisposte.value){
    const o = {
      type: 'raccolta',
      domanda: key,
      risposte: []
    }
    for(let item of raccolteRisposte.value[key])
      o.risposte.push({risposta: item});
    formData.risposte.push(o);
  }
  //risposte aperte
  for(const key in aperteRisposte.value){
    formData.risposte.push({
      type: 'aperta',
      domanda: key,
      risposta: aperteRisposte.value[key]
    })
  }

  const config = {
    headers: {
      'Content-Type' : 'application/json',
      'authorization': store.getters['getToken']
    }
  }
  try{
    await axios.post(BACKEND_URL + `/servizi/${props.service_id}/sondaggi/${props.survey_id}`,formData,config)
    window.alert("Sondaggio compilato con successo");
  }catch(err){
    window.alert("Errore nella compilazione del sondaggio, potresti averlo gia' compilato");
  } 
}

onMounted(async () => {
  getService();
  await fetchSurvey();

  // Inizializza le risposte per le raccolte
  for (let rac of raccolte.value) {
    raccolteRisposte.value[rac.domanda] = [];  // Ogni domanda di tipo "raccolta" ha una lista di risposte
  }
  //risposte per le domande aperte
  for(let aperta of aperte.value){
    aperteRisposte.value[aperta.domanda] = ""
  }
});
</script>

<template>
  <div class="flex h-screen bg-gray-100 service overflow-hidden">
    <main class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg">
      <!-- Area principale -->
      <h2 class="text-black text-3xl" >{{ survey['titolo'] }}</h2>
      <h1  class="text-gray-600 text-xl">{{ service['titolo'] }}</h1>
      <!-- Mostra il corpo -->
      <div class="space-y-4">
        <!-- Singole -->
        <div>
          <ul class="space-y-4">
            <li class="shadow rounded-lg p-4 bg-gray-50" v-for="opt in singole" :key="opt._id">
              {{ opt.opzione }}
              <input class="ml-4" type="checkbox" v-model="singoleRisposte" :value="opt.opzione">
            </li>
          </ul>
        </div>
        
        <!-- Raccolte -->
        <div>
          <ul>
            <li v-for="rac in raccolte" :key="rac._id" class="shadow rounded-lg p-4 bg-gray-50">
              {{ rac.domanda }}
              <div class="ml-4" v-for="opt in rac.opzioni" :key="opt[0].opzione">
                {{ opt[0].opzione }}
                <input :type="rac.tipo || 'checkbox'" class="ml-4" :value="opt[0].opzione" v-model="raccolteRisposte[rac.domanda]">
              </div>
            </li>
          </ul>
        </div>
        <!-- Aperte -->
         <div>
          <ul class="space-y-4">
            <li class="shadow rounded-lg p-4 bg-gray-50" v-for="aperta in aperte" :key="aperta.domanda">
              {{ aperta.domanda }}
              <input type="text" class="w-full p-2 rounded-lg input-primary bg-white mt-2" placeholder="Risposta" v-model="aperteRisposte[aperta.domanda]">
            </li>
          </ul>
         </div>
      </div>
      <GoBackButton></GoBackButton>
      <button class="p-2 rounded-lg ml-2 bg-purple-500 hover:bg-purple-700 text-white mt-4" @click="submit">Compila</button>
    </main>
  </div>
</template>

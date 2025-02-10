<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import GoBackButton from '@/components/GoBackButton.vue';
import { useRoute } from 'vue-router';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const props = defineProps({
  service_id:{
    type:String,
    required: true
  },
  survey_id:{
    type: String,
    required : true
  }
  
})

const store = useStore();
const route = useRoute();
const survey = ref({});
const results = ref({});
const risposteAperte = ref({});
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
async function fetchResults(){
  try {
    const url = BACKEND_URL + `/servizi/${props.service_id}/sondaggi/${props.survey_id}/risultati`;
    const response = await axios.get(url, {
      headers: {
        authorization: store.getters['getToken']
      }
    });
    results.value = response.data;
  } catch (err) {
    console.error(err);
  }
}
onMounted(async () => {
  await fetchSurvey();
  await fetchResults();

  //carico i risultati
  // per ogni opzione del corpo del sondaggio, scorro tutti i feedback, e  scorro le risposte
  let cont = 0;
  for(let item of singole.value){
    const opz = item.opzione;
    //scorro feedback
    for(let res of results.value){
      //scorro le risposte
      for(let risp of res.risposte){
        if(opz === risp.risposta)
          cont++;
      }
    }
    item['cont'] = cont;
    cont = 0;
  }
  //raccolte:
  for(let item of raccolte.value){
    for(let opz of item.opzioni){
      let opzione = opz[0].opzione;
      for(let res of results.value){
        for(let risp of res.risposte){
          if(risp.risposte){
            for(let r of risp.risposte){
              let risposta = r[0].risposta;
              if(risposta === opzione)
              cont++;
            }
          }
        }
      }
      opz['cont'] = cont;
      cont = 0;
    }
  }
  //aperte
  for(let item of corpo.value){
    if(item.type === 'aperta'){
      risposteAperte.value[item.domanda] = []
    }
  }
  for(let obj of results.value){
    for(let risp of obj.risposte){
      if(risp.type === 'aperta')
        risposteAperte.value[risp.domanda].push(risp.risposta)
    }
  }
});
</script>

<template>
  <div class="flex h-screen bg-gray-100 service overflow-hidden">
    <main class="flex-1 p-6 overflow-y-auto bg-white m-4 rounded-lg">
      <!-- Area principale -->
      <h2 class="text-black text-3xl" >{{ survey['titolo'] }}</h2>
      <h3 class="text-gray-600 mb-4">Numero risposte: {{ results.length }} </h3>
      <!-- Mostra il corpo -->
      <div class="space-y-4">
        <!-- Singole -->
        <div>
          <ul class="space-y-4">
            <li class="shadow rounded-lg p-4 bg-gray-50" v-for="opt in singole" :key="opt._id">
              {{ opt.opzione }} | {{ opt.cont }}
            </li>
          </ul>
        </div>
        
        <!-- Raccolte -->
        <div>
          <ul>
            <li v-for="rac in raccolte" :key="rac._id" class="shadow rounded-lg p-4 bg-gray-50">
              {{ rac.domanda }}
              <div class="ml-4" v-for="opt in rac.opzioni" :key="opt[0].opzione">
                {{ opt[0].opzione }} | {{ opt.cont }}
              </div>
            </li>
          </ul>
        </div>
        <!-- Aperte -->
         <div>
          <h1 class="text-xl text-gray-500">Domande aperte</h1>
          <ul class="space-y-4">
            <li class="shadow rounded-lg p-4 bg-gray-50" v-for="aperta in aperte" :key="aperta.domanda">
              <strong>{{ aperta.domanda }}</strong>
              <ul>
                <li class="ml-4" v-for="risposta in risposteAperte[aperta.domanda]">{{ risposta }}</li>
              </ul>
            </li>
          </ul>
         </div>
      </div>
      <GoBackButton class="mt-4 "></GoBackButton>
    </main>
  </div>
</template>
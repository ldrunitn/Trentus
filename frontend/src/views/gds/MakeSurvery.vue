<script setup>
import { BaseTransitionPropsValidators, computed, ref } from 'vue';
import AlertView from '../user/AlertView.vue';
import { useStore } from 'vuex';
import GoBackButton from '@/components/GoBackButton.vue';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const store = useStore();
const props = defineProps({
  service_id: {
    type: String,
    required: true
  }
})
const surveyForm = ref({
  titolo: "",
  opzioni: []
});
const currentSingle = ref("");
const currentOption = ref("");
const currentOptions = ref([]);
const currentDomanda = ref("");
const currentAperta = ref("");
const singole = computed(()=>{
  return surveyForm.value.opzioni.filter(opzione => opzione['type'] === 'singola');
})
const raccolte = computed(()=>{
  return surveyForm.value.opzioni.filter(opzione => opzione['type'] === 'raccolta');
})

const aperte = computed(()=>{
  return surveyForm.value.opzioni.filter(opzione => opzione['type'] === 'aperta');
})
function addSingola(){
  if(currentSingle.value.trim() !== ""){
    surveyForm.value.opzioni.push({
      type: "singola",
      opzione: currentSingle.value.trim()
    })
  }
  currentSingle.value = "";
}
function addOptionToCurrent(){
  if(currentOption.value !== '')
    currentOptions.value.push({opzione: currentOption.value});
  currentOption.value = ""
}
function addRaccolta(){
  if(currentDomanda.value.trim() === "" || currentOptions.value.length === 0){
    return;
  }
  surveyForm.value.opzioni.push({
    type: "raccolta",
    domanda: currentDomanda.value.trim(),
    opzioni: currentOptions.value
  })
  currentDomanda.value = "";
  currentOptions.value = [];
}
function addAperta(){
  if(currentAperta.value.trim() === "")
    return;
  surveyForm.value.opzioni.push({
    type: "aperta",
    domanda: currentAperta.value
  })
  currentAperta.value = ""
}
function submit(){
  if(surveyForm.value.titolo.trim() === '' || surveyForm.value.opzioni.length === 0){
    window.alert("Errore nella compilazione del sondaggio")
    return;
  }
  try {
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'authorization': store.getters['getToken']
      }
    }
    axios.post(BACKEND_URL + `/servizi/${props.service_id}/sondaggi`,surveyForm.value,config)
    .then(response => {
      window.alert("Sondaggio mandato con successo");
      surveyForm.value.opzioni = [];
      surveyForm.value.titolo = "";
    })

  } catch (error) {
    console.error(error);
    window.alert("Non e' stato possibile mandare il sondaggio")
  }
}
</script>
<template>
<div class="h-screen bg-gray-100 overflow-hidden">
<main class="bg-white m-10 p-8 max-h-fit rounded-lg flex flex-col space-y-8 overflow-y-autio overscroll-y-auto">
  <!-- Sondaggio corrente -->
  <h1 class="font-bold">Sondaggio attuale:</h1>
  <input type="text" class="p-2 rounded-lg input-primary bg-gray-200 mt-2" placeholder="Inserici qui il nome del sondaggio" v-model="surveyForm.titolo">
  <h2>Singole: </h2>
  <div v-for="item in singole" class="ml-6">
    {{ item.opzione }}
  </div>
  <h2>Raccolte: </h2>
  <div v-for="item in raccolte">
    <h3 class="ml-6"><strong> {{item.domanda}}</strong> </h3>
    <h4 class="ml-9" v-for="option in item.opzioni">{{ option.opzione }}</h4>
  </div>
  <h3>Domande aperte</h3>
  <div v-for="item in aperte">
    <h3 class="ml-6">{{ item.domanda }}</h3>
  </div>

  <!-- Aggiunta opzione singola -->
  <div class="shadow-lg rounded-lg bg-gray-200 p-6 flex flex-col space-y-6">
    <h1>Aggiungi un opzione singola</h1>
    <input type="text" class="p-2 rounded-lg input-primary bg-white mt-2" placeholder="Opzione" v-model="currentSingle">
    <button class="input bg-purple-500 hover:bg-purple-700 text-white" @click="addSingola">Aggiungi</button>
  </div>
  <!-- Aggiungi raccolta -->
  <div class="shadow-lg rounded-lg bg-gray-200 p-6 flex flex-col space-y-6">
    <h1>Aggiungi una raccolta</h1>
    <input type="text" class="p-2 rounded-lg input-primary bg-white mt-2" placeholder="Domanda" v-model="currentDomanda">
    <div class="space-y-2 p-4">
      <h1>Opzioni: </h1>
      <div class="ml-6" v-for="item in currentOptions">
        {{ item.opzione }}
      </div>
    </div>
    <div class="flex flex-nowrap">
      <input type="text" class="w-full p-2 rounded-lg input-primary bg-white mt-2" placeholder="Opzione" v-model="currentOption">
      <button class="btn-primary bg-purple-300 hover:bg-purple-400 rounded-lg p-2 ml-4 mt-2 text-white" @click="addOptionToCurrent">Aggiungi</button>
    </div>
    <button class="input bg-purple-500 hover:bg-purple-700 text-white" @click="addRaccolta">Aggiungi</button> 
  </div>
  <!-- Aggiungi una domanda aperta -->
  <div class="shadow-lg rounded-lg bg-gray-200 p-6 flex flex-col space-y-6">
    <h1>Aggiungi una domanda aperta</h1>
    <div class="flex flex-nowrap">
      <input type="text" class="w-full p-2 rounded-lg input-primary bg-white mt-2" placeholder="Domanda" v-model="currentAperta">
      <button class="btn-primary bg-purple-300 rounded-lg p-2 ml-4 mt-2 text-white hover:bg-purple-400" @click="addAperta()">Aggiungi</button>
    </div>
  </div>
  <div class="w-full flex justify-end space-x-2">
    <GoBackButton class="max-w-40 p-2"></GoBackButton>
    <button class="max-w-40 p-2 rounded-lg bg-purple-500 hover:bg-purple-700 text-white" @click="submit">Manda sondaggio</button>
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
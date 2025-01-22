<script setup>
import { ref } from 'vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';
import { useStore } from 'vuex';

const props = defineProps({
  service:{
    type: Object,
    required: true
  }
})

//evento per rifetchare il servizio quando si aggiorna la form
const emit = defineEmits(['updateForm']);
const option = ref("");
const errore = ref("");
const store = useStore();

//chiama l'api per creare la form
function submitForm(){
  if(option.value.trim() === ""){
    errore.value == "Opzione non presente"
    return;
  }
  try {
    let options = [];
    for(let item of props.service['form']){
      options.push(item['opzione']);
    }
    options.push(option.value);
    const data = {
      opzioni: options,
    }
    console.log(data);
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'authorization': store.getters['gds/getToken']
      }
    }
    axios.post(BACKEND_URL + `/servizi/${props.service['_id']}/segnalazioni/form`,data,config)
      .then(response => {
        console.log(response.data);
        emit('updateForm'); //aggiorna la UI della  form
        console.log("Evento emesso");
      })

  } catch (error) {
    console.error(error);
  }


}
</script>
<template>
<div class="bg-white p-4 rounded shadow col-span-2">
  <!-- Lista di possibili opzioni -->
  <h1 class="text-2xl">Form di segnalazione</h1>
  lista di possibili opzioni: 
  <ul>
    <li v-for="item in service['form']">- {{ item['opzione'] }}</li>
  </ul>

  <!-- Possbilità di aggiungere un'opzione -->
  <input class="input-custom" v-model="option" type="text" placeholder="Scrivi qui l'opzione da aggiungere">
  <button class="btn m-4 bg-blue-500 text-white" @click="submitForm">Aggiungi</button>
  <error-message v-if="errore" :message="errore"></error-message>
</div>
</template>
<style scoped>
.input-custom{
  border: 1px solid black;
  padding: 4px;
  width: 100%;
}
</style>
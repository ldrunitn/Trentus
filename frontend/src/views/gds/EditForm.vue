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
    errore.value = "Opzione non presente"
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
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'authorization': store.getters['getToken']
      }
    }
    axios.post(BACKEND_URL + `/servizi/${props.service['_id']}/segnalazioni/form`,data,config)
      .then(response => {
        emit('updateForm'); //aggiorna la UI della  form
        option.value = "";
      })

  } catch (error) {
    errore.value = "Errore nell'aggiunta di un opzione";
  }
}
//per rimuovere un opzione
function removeOption(op){
  let form = props.service['form'];
  form = form.filter(item => item['opzione'] !== op);

  try {
    let options = [];
    for(let item of form){
      options.push(item['opzione']);
    }
    const data = {
      opzioni: options,
    }
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'authorization': store.getters['getToken']
      }
    }
    axios.post(BACKEND_URL + `/servizi/${props.service['_id']}/segnalazioni/form`,data,config)
      .then(response => {
        emit('updateForm'); //aggiorna la UI della  form
      })

  } catch (error) {
    errore.value = "Errore nell'eliminazione dell'opzione"
  }
}
</script>
<template>
<div class="bg-white p-4 rounded shadow col-span-2">
  <!-- Lista di possibili opzioni -->
  <h1 class="text-2xl">Form di segnalazione</h1>
  lista di possibili opzioni: 
  <ul class="space-y-4">
    <li v-for="item in service['form']" key="item">- {{ item['opzione'] }} <button class="btn-elimina rounded-lg" @click="removeOption(item['opzione'])">Elimina</button></li>
  </ul>

  <!-- Possbilità di aggiungere un'opzione -->
  <input class="input-custom mb-4 mt-2 rounded-lg" v-model="option" type="text" placeholder="Scrivi qui l'opzione da aggiungere">
  <error-message v-if="errore" :message="errore"></error-message>
  <button class="btn m-4 bg-purple-600 hover:bg-purple-700 text-white mb-16" @click="submitForm">Aggiungi</button>
</div>
</template>
<style scoped>
.input-custom{
  border: 1px solid black;
  padding: 4px;
  width: 100%;
}
.btn-elimina{
  background-color: rgb(255, 130, 130);
  color: white;
  padding: 3px;
}
</style>
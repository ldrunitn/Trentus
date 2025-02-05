<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import ErrorMessage from '@/components/ErrorMessage.vue';
import SuccessMessage from '@/components/SuccessMessage.vue';
import GoBackButton from '../../components/GoBackButton.vue';
import axios from 'axios'
import { useStore } from 'vuex';
const titolo = ref("");
const corpo = ref("");
const tipo = ref("");
const inizio = ref("");
const fine = ref("");
const router = useRouter();
const store = useStore();

const errore = ref("");
const successo = ref("");
const props = defineProps({
  service_id:{
    type: String,
    required: true,
  }
})
function submit(){
  if(titolo.value !== "" && corpo.value !== '' && tipo.value !== '' && inizio.value !== '' && fine.value !== ''){
    const data = {
      "titolo" : titolo.value,
      "corpo" : corpo.value,
      "tipo" : tipo.value,
      "inizio" : inizio.value,
      "fine" : fine.value 
    }
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'authorization' : store.getters['gds/getToken'],
      }
    }
    try{
      axios.post(BACKEND_URL + `/servizi/${props.service_id}/avvisi`,data,config)
      .then(response => {
        console.log(response.data);
        console.log("Avviso mandata")
        successo.value = "Avviso mandato con successo";
        errore.value = "";
      })
    }
    catch(error){
      console.log(error);
      errore.value = "Errore: Non è stato possibile inviare l'avviso"
    }
  }
  else {
    errore.value = "Errore: parametri errati";
    successo.value = "";
  }
}
</script>
<template>
<div class="flex flex-col p-16 space-y-4">
  <label for="titolo" class="font-medium">Titolo</label>
  <input v-model="titolo" type="text" id="titolo" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <label>Messaggio</label>
  <input v-model="corpo" type="text" id="messaggio" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <label>Tipo</label>
  <select class="bg-white px-4 py-2 rounded-lg shadow max-w-fit " v-model="tipo">
    <option value="manutenzione">Manutenzione</option>
    <option value="problemi">Problemi</option>  
    <option value="down">Down</option>  
  </select>
  
  <label for="inizio">Inizio</label>
  <input v-model="inizio" type="date" id="inizio" name="data">
  <label for="fine">Fine</label>
  <input v-model="fine" type="date" id="fine" name="data">
  <success-message :message="successo" v-if="successo"></success-message>
  <error-message :message="errore" v-if="errore"></error-message>
  <div class="flex flex-row mt-4">
    <go-back-button></go-back-button>
    <button @click="submit" class=" btn ml-3 bg-purple-600 hover:bg-purple-700 text-white max-w-40">Invia</button>
  </div>

</div>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue';
import SidebarLeft from '@/components/SidebarLeft.vue';
import SidebarRight from '@/components/SidebarRight.vue';
import { onMounted, ref } from 'vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();
const service = ref({});
const commento = ref("");
const selectedOptions = ref([]);
const props = defineProps({
  service_id: {
    type: String,
    required: true
  }
})
async function fetchService(){
  console.log("fetch del servizio");
    try{
        await axios.get(BACKEND_URL + `/servizi/${props.service_id}`,)
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
function submitForm(){
  console.log(selectedOptions.value);
}
onMounted(async()=>{
  await fetchService();
})
</script>


<template>
  <div class="flex bg-gray-100">
    <!-- Contenuto principale -->
    <main class="flex-1 flex justify-center">
      <section class="w-full max-w-3xl bg-white rounded-lg shadow p-8 space-y-6 m-4"> 
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Segnala un problema</h2> <!-- Titolo -->
          <h2 class="text-red-500 mr-4" v-if="service['stato'] == 'off'">Servizio Offline <i class="pi pi-circle-fill text-red-500 text-sm ml-1 align-middle"></i></h2>
          <h2 class="text-green-500 mr-4" v-else >Servizio Online <i class="pi pi-circle-fill text-green-500 text-sm ml-1 align-middle"></i></h2>

        </div>
        <ul class="space-y-4"> 
          <li v-for="item in service['form']" :key="item['opzione']">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-purple-600" :value="item['opzione']" v-model="selectedOptions"/> <!-- Opzioni ( i guess? ) -->
              <span class="ml-3">{{item['opzione']}}</span>
            </label>
          </li>
        </ul>
        <textarea
          v-model="commento"
          class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300"
          placeholder="Descrivi qui il tuo problema (opzionale)"
        ></textarea> <!-- Commento -->
        <div class="flex justify-end space-x-4">
          <router-link to="/" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Annulla</router-link>
          <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700" @click="submitForm">Conferma</button> <!-- Pop-up di riuscita segnalazione o pagina? -->
        </div>
      </section>
    </main>>
  </div>
</template>


<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: gray-100;
}
</style>
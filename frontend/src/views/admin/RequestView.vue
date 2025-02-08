<script>
import axios from "axios"
import store from "../../store";
import GoBackButton from "../../components/GoBackButton.vue";
import { mapGetters } from "vuex";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default{
  props:{
    request_id:{
      type: String,
      required: true
    }
  },
  computed:{
    request(){
      return store.getters['admin/getRequests'].find(request => request._id === this.request_id);
    }
  },
  async created(){
    const request = store.getters['admin/getRequests'].find(request => request._id === this.request_id);
  },
  data(){
    return{
      BACKEND_URL: import.meta.env.VITE_BACKEND_URL
    }
  },
  methods:{
    submit(){
      try {
        const config = {
          headers: {
            'authorization': store.getters['getToken']
          }
        }
        axios.post(this.BACKEND_URL + `/controlpanel/confermagds/${this.request_id}`,{},config)
          .then(response => {
            this.$store.dispatch('admin/fetchRequests');
            window.alert("Richiesta accettata!");
          })

      } catch (error) {
        console.error(error);
        window.alert("Errore, non è stato possibile accettare la richiesta")
      }
    }
  }
}
</script>
<template>
<div class="bg-white rounded-lg shadow-md p-16 max-w-100 mx-8 mt-4 w-full">
  <h1 class="text-5xl text-gray-600 mb-10">Richiesta di aggiunta servizio</h1>
  <ul class="space-y-10 ml-5">
    <li><span>Id: </span><span class="text-gray-600">{{ request_id }}</span></li>
    <li><span>Immagine: </span><img :src="BACKEND_URL + request.foto" alt="logo"></li>
    <li><span>Nome: </span><span class="text-gray-600">{{ request.titolo }}</span></li>
    <li><span>Link: </span><span class="text-gray-600">{{ request.url }}</span></li>
    <li><span>Azienda: </span><span class="text-gray-600">{{ request.azienda }}</span></li>
    <li>
      <p>Descrizione: </p>
      <p class="text-gray-600 ml-4">{{ request.descrizione }}</p>
    </li>
  </ul>
  <!-- pulsanti di conferma o annulla -->
  <div class="flex flex-row flex-nowrap w-full justify-end space-x-4 mt-10">
    <button class="px-4 text-gray-700 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 max-w-42" @click.prevent="this.$router.go(-1)">Indietro</button>
    <button class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded" @click="submit">Conferma</button>
  </div>
</div>
</template>
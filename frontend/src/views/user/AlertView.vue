<script>
import store from '@/store';
import GoBackButton from '../../components/GoBackButton.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';
export default{  
  components:{
    GoBackButton
  },
  data(){
    return{
      alert: {}
    }
  },  
  props:{
    alert_id: {
      type:String,
      required: true
    },
    service_id:{
      type:String,
      required: true
    }
  },
  methods:{
    async fetchAlert(){
      try{
        await axios.get(BACKEND_URL + `/servizi/${this.service_id}/avvisi/${this.alert_id}`)
        .then(response => {
          this.alert = response.data;
        })
      }catch(err){
        window.alert("Errore nel caricamento dell'avviso")
      }
    }
  },
  async created(){
    await this.fetchAlert();
  }
}
</script>
<template>
  <div class="flex-row space-y-10 p-10">
    <h1 class="text-4xl">{{ alert.titolo }}</h1>
    <h2 class="text-xl text-gray-700">Motivazione: {{ alert.tipo }}</h2>
    <p>{{ alert.corpo }}</p>
    <p class="text-xs">Periodo: {{ alert.inizio }}-{{ alert.fine }}</p>
    <GoBackButton></GoBackButton>
  </div>
</template>
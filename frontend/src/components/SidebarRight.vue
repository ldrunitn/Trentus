<script>
import ClassificationItem from './classification/ClassificationItem.vue';
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default{
  components: {ClassificationItem},
  data(){
    return{
      services: [],
    }
  },
  methods:{
    async getClassifica(){
      try{
        await axios.get(BACKEND_URL + '/servizi/classifica')
        .then(response => {
          console.log("DATI CLASSIFICA");
          console.log(response.data);
          this.services = response.data;
        })
      }
      catch(err){
        console.log(err);
      }
    }
  },
  async mounted(){
    console.log("SIDEBAR")
    await this.getClassifica();
  }
}
</script>


<template>
  <div class="w-64 flex flex-col bg-gray-100 shadow-md p-4 h-full" id="navbar-right">
    <div class="p-4">
      <h2 class="text-xl font-bold">Classifica</h2>
    </div>
    <p v-for="service in services">{{service.servizio_id}} - {{ service.segnalazioni }}</p>
    <ClassificationItem  />
  </div>
</template>



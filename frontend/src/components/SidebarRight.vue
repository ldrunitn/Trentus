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
        let classifica;
        await axios.get(BACKEND_URL + '/servizi/classifica')
        .then(response => {
          console.log("DATI CLASSIFICA");
          console.log(response.data);
          classifica = response.data;
        })
        console.log("Classifica")
        console.log(classifica);
        for(let item of classifica){
          await axios.get(BACKEND_URL + '/servizi/' + item['servizio_id'])
          .then(response =>{
            this.services.push({
              nome: response.data['titolo'],
              segnalazioni: item['segnalazioni'],
              logo: response.data['foto']
            })
          })
        }
      }
      catch(err){
        console.log(err);
      }
    }
  },
  async mounted(){
    await this.getClassifica();
    // setInterval(this.getClassifica(), 30000)
  }
}
</script>


<template>
  <div class="w-64 flex flex-col flex-w-grow bg-gray-100 shadow-md p-4 h-full" id="navbar-right">
    <div class="p-4">
      <h2 class="text-xl font-bold">Classifica</h2>
    </div>
    <ClassificationItem class="mt-4" v-for="item in services" :nome="item['nome']" :report-number="item['segnalazioni']" :logo="item['logo']"/>
  </div>
</template>



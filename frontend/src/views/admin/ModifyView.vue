<script>
import GoBackButton from '../../components/GoBackButton.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios'

export default{
  components:{
    GoBackButton
  },
  props:{
    service_id:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      service: {},
      selectedFile: null,
      formData: {
        titolo: "",
        azienda: "",
        url: "",
        descrizione: "",
      },
      imgPath: "",
      message: ""
    }
  },
  methods:{
    async fetchService(){
      try{
        await axios.get(BACKEND_URL + `/servizi/${this.service_id}`)
        .then(response => {
          const service = response.data;
          this.formData.azienda = service['azienda'];
          this.formData.titolo = service['titolo'];
          this.formData.url = service['url'];
          this.formData.descrizione = service['descrizione'];
          this.imgPath = BACKEND_URL + service['foto'];
        })  
      }
      catch(e){
          console.error(e);
      }
    },
    async submitForm() {
      this.loading = true;

      const formData = new FormData();
      formData.append("foto", this.selectedFile);
      formData.append("data", JSON.stringify(this.formData));

      try {
        const response = await axios.post(BACKEND_URL + `/servizi/${this.service_id}/modifica`, formData, {
          headers: { "Content-Type": "multipart/form-data", "authorization": this.$store.getters['gds/getToken']}
        });

        this.message = response.data.message || "File caricato con successo!";
      } catch (error) {
        this.message = "Errore durante il caricamento.";
      } finally {
        this.loading = false;
        window.alert(this.message);
        this.fetchService();
        this.selectedFile = null;
      }
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
  },
  async created(){
    await this.fetchService();
  }
}
</script>
<template>
<div class="overflox-hidden h-screen">
<form @submit.prevent="submitForm" class="bg-white rounded-lg shadow-md p-16 max-w-100 mx-8 mt-4 w-full h-auto overflow-y-auto">
  <h1 class="text-5xl text-gray-600 mb-10">Modifica servizio</h1>
  <ul class="space-y-10 ml-5">
    <li><span>Immagine: </span><img :src="imgPath" alt="logo" class="max-w-32 max-h-32"><input type="file" @change="handleFileChange"></li>
    <li><span>Nome: </span><input class="text-gray-600 bg-white border rounded p-1" v-model="formData.titolo"></input></li>
    <li><span>Link: </span><span class="text-gray-600"><input class="text-gray-600 bg-white border rounded p-1" v-model="formData.url"></input></span></li>
    <li><span>Azienda: </span><span class="text-gray-600"><input class="text-gray-600 bg-white border rounded p-1" v-model="formData.azienda"></input></span></li>
    <li>
      <p>Descrizione: </p>
      <p class="text-gray-600 mx-4 mt-5"><textarea class="text-gray-600 bg-white border rounded p-1 w-full" v-model="formData.descrizione"></textarea></p>
    </li>
  </ul>
  <!-- pulsanti di conferma o annulla -->
  <div class="flex flex-row flex-nowrap w-full justify-end space-x-4 mt-10">
    <GoBackButton></GoBackButton>
    <button type="submit" class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">Conferma</button>
  </div>
</form>
</div>
</template>

<style scoped>
</style>
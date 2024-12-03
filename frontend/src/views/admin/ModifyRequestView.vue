<script>
export default{
  props:{
    service_id:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      immagine: "",
      title: "",
      link: "",
      company: "",
      description: ""
    }
  },
  async created(){
    const request = await this.fetchRequest();
    this.immagine = request.immagine;
    this.title = request.title;
    this.link = request.link;
    this.company = request.company;
    this.description = request.description;
  },
  methods:{
    async fetchRequest(){
      //metodo per recuperare la richiesta con l'id specificato dallo store vuex
    }
  }
}
</script>
<template>
<div class="bg-white rounded-lg shadow-md p-16 max-w-100 mx-8 mt-4 w-full">
  <h1 class="text-5xl text-gray-600 mb-10">Modifica servizio</h1>
  <ul class="space-y-10 ml-5">
    <li><span>Id: </span><span class="text-gray-600">{{ service_id }}</span></li>
    <li><span>Immagine: </span><input class="text-gray-600 bg-white border rounded p-1" :value="immagine"></li>
    <li><span>Nome: </span><input class="text-gray-600 bg-white border rounded p-1" :value="title"></input></li>
    <li><span>Link: </span><span class="text-gray-600"><input class="text-gray-600 bg-white border rounded p-1" :value="link"></input></span></li>
    <li><span>Azienda: </span><span class="text-gray-600"><input class="text-gray-600 bg-white border rounded p-1" :value="company"></input></span></li>
    <li>
      <p>Descrizione: </p>
      <p class="text-gray-600 mx-4 mt-5"><textarea class="text-gray-600 bg-white border rounded p-1 w-full" :value="description"></textarea></p>
    </li>
  </ul>
  <!-- pulsanti di conferma o annulla -->
  <div class="flex flex-row flex-nowrap w-full justify-end space-x-4 mt-10">
    <button class="hover:text-gray-600">Annulla</button>
    <button class="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-700">Conferma</button>
  </div>
</div>
</template>
<template>
  <div class="flex flex-col items-center">
        <h1 class="text-3xl text-black font-bold mt-4">Register to</h1>
        <img
            src="/src/assets/trentus-text-logo.svg"
            alt="logo_trentus"
            class=""
        />
    </div>
  
  <div class="mt-12 place-self-center items-center justify-center min-h-screen bg-gray-100 ">
    <div
      class="inline-flex flex-col items-center justify-center w-[400px] max-w-md p-4 bg-white rounded-lg shadow-md"
    >
    <form class="flex flex-col grid-flow-col grid-cols-1 gap-2 mt-8" @submit.prevent="submitForm">
      <label class="text-black">Email</label>
      <input type="email" class="input bg-gray-200 shadow-md rounded-lg text-black max-w-72" v-model="formData.email">
      <label class="text-black">Password</label>
      <input type="password" class="input bg-gray-200 shadow-md rounded-lg text-black max-w-72" v-model="formData.password">
      <label class="text-black">Nome</label>
      <input type="text" class="input bg-gray-200 shadow-md rounded-lg text-black max-w-72" v-model="formData.titolo">
      <label class="text-black">Azienda</label>
      <input type="text" class="input bg-gray-200 shadow-md rounded-lg text-black max-w-72" v-model="formData.azienda">
      <label class="text-black">Sito web</label>
      <input type="text" class="input bg-gray-200 shadow-md rounded-lg text-black max-w-72" v-model="formData.url">
      <label class="text-black">Descrizione</label>
      <textarea v-model="formData.descrizione" class="input bg-gray-200 shadow-md rounded-lg text-black max-w-72"></textarea>
      <label class="text-black">Logo</label>
      <input type="file" @change="handleFileChange">
      <button type="submit" class="btn m-4 bg-purple-600 text-white mb-16 max-w-60 hover:bg-purple-700">Aggiungi</button>
    </form>

    <div class="relative flex items-center w-full my-6">
        <hr class="w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
        <span
          class="absolute px-2 font-medium text-gray-900 text-sm bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4"
          >or</span
        >
      </div>
    </div>
  </div>
</template>
<script>
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';
export default {
  data() {
    return {
      selectedFile: null,
      formData: {
        email: "",
        password: "",
        titolo: "",
        azienda: "",
        url: "",
        descrizione: "",
      },
      loading: false,
      message: "",
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async submitForm() {
      if (!this.selectedFile) {
        this.message = "Seleziona un file prima di inviare.";
        window.alert(this.message);
        return;
      }

      this.loading = true;

      const formData = new FormData();
      formData.append("foto", this.selectedFile);
      formData.append("data", JSON.stringify(this.formData));

      try {
        const response = await axios.post(BACKEND_URL + "/gds/registrazione", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        this.message = response.data.message || "File caricato con successo!";
      } catch (error) {
        this.message = "Errore durante il caricamento.";
      } finally {
        this.loading = false;
        window.alert(this.message);
      }
    }
  }
};
</script>
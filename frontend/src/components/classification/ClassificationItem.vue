<script>
export default{
  props: {
    nome: String,
    reportNumber: Number,
    logo: String,
  },
  data(){
    return{
      BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    }
  },
}
</script>


<template>
<div class="flex flex-nowrap flex-w-grow items-center bg-pink-200 text-pink-800 rounded-lg px-4 py-2 shadow w-full">
  <!-- Testo --> 
  <span class="ml-3 font-medium text-lg w-full"><img :src="BACKEND_URL + logo" alt="logo" class="max-w-20 max-h-20">{{reportNumber}} segnalazioni</span>
</div>
</template>


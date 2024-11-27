<template>
<div class="flex items-center bg-pink-200 text-pink-800 rounded-lg px-4 py-2 shadow">
  <!-- Immagine/Logo -->
  <div class="flex-shrink-0 w-10 h-10 bg-white rounded-full overflow-hidden">
    <img src="https://via.placeholder.com/40" alt="Logo" class="w-full h-full object-cover">
  </div>
  <!-- Testo -->
  <span class="ml-3 font-medium text-lg">{{reportNumber}} segnalazioni</span>
</div>
</template>
<script>
export default{
  props: [
    logo,
    reportNumber
  ],
  data(){
    return{
      logo: File,
      reportNumber: 0
    }
  }
}
</script>
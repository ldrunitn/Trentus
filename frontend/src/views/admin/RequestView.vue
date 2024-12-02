<script>
export default{
  props:{
    immagine:String,
    title:String,
    name:String,
    link:String,
    company: String,
    description:String,
  }
}
</script>
<template>
<div class="bg-white rounded-lg shadow-md p-16 max-w-100 mx-8 mt-4 w-full">
  <h1 class="text-5xl text-gray-600 mb-10">Richiesta di aggiunta servizio</h1>
  <ul class="space-y-10 ml-5">
    <li><span>Immagine: </span><span class="text-gray-600">{{ immagine }}</span></li>
    <li><span>Nome: </span><span class="text-gray-600">{{ title }}</span></li>
    <li><span>Link: </span><span class="text-gray-600">{{ link }}</span></li>
    <li><span>Azienda: </span><span class="text-gray-600">{{ company }}</span></li>
    <li>
      <p>Descrizione: </p>
      <p class="text-gray-600 ml-4">{{ description }}</p>
    </li>
  </ul>
  <!-- pulsanti di conferma o annulla -->
  <div class="flex flex-row flex-nowrap w-full justify-end space-x-4 mt-10">
    <button class="hover:text-gray-600">Annulla</button>
    <button class="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-700">Conferma</button>
  </div>
</div>
</template>
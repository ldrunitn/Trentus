<script setup>
import Navbar from '@/components/Navbar.vue';
import SidebarLeft from '@/components/SidebarLeft.vue';
import SidebarRight from '@/components/SidebarRight.vue';
</script>


<template>
  <div class="flex h-full bg-gray-100">
    <!-- Contenuto principale -->
    <main class="flex-1 flex items-center justify-center">
      <section class="w-full max-w-3xl bg-white rounded-lg shadow p-8 space-y-6 m-4"> 
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Segnala un problema</h2> <!-- Titolo -->
          <img src="@/assets/logo.svg" alt="Logo" class="">
          <span class="text-red-500 font-bold">Servizio Offline <i class="pi pi-circle-fill text-red-500 text-sm ml-1 align-middle"></i></span>
        </div>
        <ul class="space-y-4"> 
          <li>
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-purple-600" /> <!-- Opzioni ( i guess? ) -->
              <span class="ml-3">Lorem ipsum dolor sit amet consectetur.</span>
            </label>
          </li>
          <li>
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-purple-600" checked /> <!-- Opzioni ( di nuovo, qua mi sa che va un bel v-for e si gode? ) -->
              <span class="ml-3">Lorem ipsum dolor sit amet consectetur.</span>
            </label>
          </li>
        </ul>
        <textarea
          class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300"
          placeholder="Descrivi qui il tuo problema (opzionale)"
        ></textarea> <!-- Commento -->
        <div class="flex justify-end space-x-4">
          <button class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Annulla</button>
          <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Conferma</button>
        </div>
      </section>
    </main>
  </div>
</template>


<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: gray-100;
}
</style>
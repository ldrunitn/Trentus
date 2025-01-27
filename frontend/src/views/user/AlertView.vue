<script>
import store from '@/store';

export default{  
  computed:{
    alert(){
      //recupero l'alert dallo store dopo averlo impostato su sidebarleft
      let al = store.getters['user/getCurrentAlert'];
      return al;
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>
<template>
  <div class="flex-row space-y-10 p-10">
    <h1 class="text-4xl">{{ alert.titolo }}</h1>
    <p>{{ alert.corpo }}</p>
    <p class="text-xs">Periodo: {{ alert.inizio }}-{{ alert.fine }}</p>
    <button class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 col-end-4" @click="goBack()">Indietro</button>
  </div>
</template>
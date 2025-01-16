<script>
import store from '@/store';

export default{  
  computed:{
    alert(){
      //recupero l'alert dallo store dopo averlo impostato su sidebarleft
      let al = store.getters['user/getCurrentAlert'];
      return al;
    }
  }
}
</script>
<template>
  <div class="flex-row space-y-10 p-10">
    <h1 class="text-4xl">{{ alert.titolo }}</h1>
    <p>{{ alert.corpo }}</p>
    <p class="text-xs">Periodo: {{ alert.inizio }}-{{ alert.fine }}</p>
  </div>
</template>
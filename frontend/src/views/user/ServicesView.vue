1<script setup>
import { ref, onMounted, computed} from 'vue';
import { useStore } from 'vuex';
import ServicesCard from '@/components/ServicesCard.vue';
const loading = ref(true);
const store = useStore();
const services = computed(() => {
  if(store.getters['user/getShowFavourites'])
      return store.getters['user/getFavouritesServices'];
  else return store.getters['user/getServices'];
});
onMounted( async () => {
  try {
    //fetch dei servizi
    await store.dispatch('user/fetchServices')    
    
    loading.value = false;
    const servizi = store.getters['user/getServices'];
    
  } catch (error) {
    console.error(error)
  }
})
</script>
<template>
  <div class="pb-36">
    <div class="services flex flex-col justify-start px-12 m-0" v-if="!loading"> <ServicesCard v-for="service in services" :service="service" :key="service['_id']"/> </div>
  </div>
</template>

<style scoped>
.services::-webkit-scrollbar{
  display: none;
}
.services{
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
1<script setup>
import { ref, onMounted, computed} from 'vue';
import { useStore } from 'vuex';
import ServicesCard from '@/components/ServicesCard.vue';
const loading = ref(true);
const store = useStore();
const services = computed(() => {
  console.log("computed services");
  return store.getters['user/getServices'];
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
    <div class="services" v-if="!loading"> <ServicesCard v-for="service in services" :service="service"/> </div>
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
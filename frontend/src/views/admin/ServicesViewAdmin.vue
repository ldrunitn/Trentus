1<script setup>
import { ref, onMounted, computed} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ServicesCard from '@/components/ServicesCard.vue';
const router = useRouter();
const loading = ref(true);
const store = useStore();
const services = computed(() => {
  console.log("computed services");
  return store.getters['user/getServices'];
});
const redirect = (service_id)=>{
  router.push(`/admin/${service_id}/modify`);
};
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
    <div v-if="!loading"> <ServicesCard v-for="service in services" :service="service" @click.prevent="redirect(service._id)"/> </div>
</template>
<script>
import RequestItem from './RequestItem.vue';
export default{
  components:{
    RequestItem
  },
  computed:{
    requests(){
      return this.$store.getters['admin/getRequests'];
    }
  },
  mounted(){
    this.$store.dispatch('admin/fetchRequests') //per aggiornare le richieste
  }
}
</script>
<template>
  <div class="flex flex-row text-gray-400">
    <ul class="">
      <RequestItem v-for="request in requests" :key="request._id" :id="request._id" :title="request.titolo"></RequestItem>
    </ul>
  </div>
</template>
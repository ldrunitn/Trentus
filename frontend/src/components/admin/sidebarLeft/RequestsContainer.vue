<script>
import RequestItem from './RequestItem.vue';
export default{
  components:{
    RequestItem
  },
  data(){
    return {
      services: [
        {
        _id: 1,
        titolo: "La mia trento",
        show: true
        },
        {
        _id: 2,
        titolo: "Trec+ cartella clinica",
        show: true
        },
        {
        _id:3,
        titolo: "OnOff",
        show: true
        },
        {
        _id:4,
        titolo: "Muoversi in Trentino",
        show: true
        },
      ]
    }
  }
}
</script>
<template>
  <div class="flex flex-row text-gray-400">
    <ul class="">
      <RequestItem v-for="service in services" :key="service._id" :title="service.titolo"></RequestItem>
    </ul>
  </div>
</template>
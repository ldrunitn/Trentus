<script setup>
import { computed } from 'vue';

const props = defineProps({
  stato: String
})
const textColor = computed(()=>{
  switch(props.stato){
    case "down":
      return "text-red-500";
    case "manutenzione":
    case "problemi":
      return "text-yellow-500";
    case "on":
      return "text-green-500";
  }
})
  
</script>
<template>
  <h2 :class="textColor + ' mr-4 text-right mb-4'"><span class="mr-3">{{ props.stato }}</span> <i class="pi pi-circle-fill text-sm/8"></i></h2>
</template>
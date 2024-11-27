<template>
  <div class="w-64 flex flex-col bg-gray-300 rounded-lg shadow-sm p-4 max-w-prose" id="navbar-right">
    <div class="p-4">
      <h2 class="text-xl font-bold">Classifica</h2>
      <p class="text-gray-600">Qui trovi tutti i servizi disponibili</p>
    </div>
    <ClassificationItem />
  </div>
</template>
<script>
import ClassificationItem from './classification/ClassificationItem.vue';
export default{
  components: {ClassificationItem},

}
</script>
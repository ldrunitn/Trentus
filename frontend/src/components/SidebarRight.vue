<script>
import ClassificationItem from './classification/ClassificationItem.vue';
export default{
  components: {ClassificationItem},

}
</script>


<template>
  <div class="w-64 flex flex-col bg-gray-100 shadow-sm p-4 h-full" id="navbar-right">
    <div class="p-4">
      <h2 class="text-xl font-bold">Classifica</h2>
    </div>
    <ClassificationItem  />
  </div>
</template>



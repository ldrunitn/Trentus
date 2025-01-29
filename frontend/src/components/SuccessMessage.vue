<script>
export default{
  props:{
    message: String
  }
}
</script>

<template>
  <div id="success" class="rounded-lg">
    <p id="msg">{{ message }}</p>
  </div>
</template>

<style>
#success{
  background-color: rgb(187, 255, 174);
  color: green;
  padding: 10px;  
}
</style>
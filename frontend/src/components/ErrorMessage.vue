<script>
export default{
  props:{
    message: String
  }
}
</script>

<template>
  <div id="error">
    <p id="msg">{{ message }}</p>
  </div>
</template>

<style>
#error{
  background-color: rgb(243, 197, 197);
  color: red;
  padding: 10px;  
}
</style>
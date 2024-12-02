<script>
export default{
  props:{
    title: String,
    id: String
  }
}
</script>
<template>
  <li class="hover:text-gray-500">
    <router-link>{{ title }}</router-link>  
  </li>
</template>
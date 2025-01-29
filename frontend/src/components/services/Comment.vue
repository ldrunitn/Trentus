<script>
export default{
  props:{
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    Username(){
      return this.email.split('@')[0];
    }
  }
}
</script>
<template>

<li class="bg-gray-50 p-3 shadow rounded-lg">
  <p>@<strong>{{Username}}</strong></p>
  <p>{{ text }}</p>
</li>
</template>
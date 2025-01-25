<script>
export default{
  props:{
    username: {
      type: String,
      required: false,
      default: ""
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
<template>
<li>
  <strong v-if="username != ''">{{ username }}</strong>
  <p>{{ text }}</p>
</li>
</template>
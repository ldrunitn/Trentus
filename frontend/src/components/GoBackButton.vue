
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function goBack(){
  router.go(-1);
}

</script>
<template>
<button class="px-4 text-gray-700 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 max-w-42" @click.prevent="goBack()">Indietro</button>
</template>
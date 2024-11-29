<script setup>
import RegistrationField from '@/components/login/RegistrationField.vue';
</script>

<template> 
<div class="flex flex-col items-center">
        <h1 class="text-3xl text-black font-bold mt-4">Register to</h1>
        <img
            src="/src/assets/trentus-text-logo.svg"
            alt="logo_trentus"
            class=""
        />
    </div>
  
  <div class="mt-12 place-self-center items-center justify-center min-h-screen bg-gray-100 ">
    <div
      class="inline-flex flex-col items-center justify-center w-[400px] max-w-md p-4 bg-white rounded-lg shadow-md"
    >
    <RegistrationField/>
    </div>
    <p class="place-self-center pt-4">Do you manage a service?</p>
    <p class="place-self-center"><a href="" class="underline text-gray-800" >Register your service to Trentus</a></p>
    <p class="place-self-center pt-2">Already have an account? <a href="" class="underline text-gray-800">Login</a></p>
  </div>
    
</template>
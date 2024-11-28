<script setup>
import LoginWGoogle from "@/components/login/LoginWGoogle.vue";
import LoginField from "@/components/login/LoginField.vue";
</script>

<template>

    <div class="flex flex-col items-center">
        <h1 class="text-3xl text-black font-bold mt-4">Login to</h1>
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
      <LoginField />
      <div class="relative flex items-center w-full my-6">
        <hr class="w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
        <span
          class="absolute px-2 font-medium text-gray-900 text-sm bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4"
          >or</span
        >
      </div>
      <LoginWGoogle />
    </div>
  </div>
</template>

<!-- <template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100">

      <div class="flex flex-col items-center mt-6">
        <h1 class="text-2xl text-black font-bold">Login to</h1>
        <img
          src="/src/assets/trentus-text-logo.svg"
          alt="logo_trentus"
          class="mt-2"
        />
      </div>
  

      <div
        class="flex flex-col items-center w-full max-w-md p-6 mt-8 bg-white rounded-lg shadow-md"
      >
        <LoginField />
        <div class="relative flex items-center w-full my-6">
          <hr class="w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
          <span
            class="absolute px-2 font-medium text-gray-900 text-sm bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >or</span
          >
        </div>
        <LoginWGoogle />
      </div>
    </div>
  </template> -->
  

<style>

</style>

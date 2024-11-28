<script setup>
import LoginWGoogle from '@/components/login/LoginWGoogle.vue';
import LoginField from '@/components/login/LoginField.vue';
</script>



<template>

    <div>
        <LoginWGoogle/>
        <!-- <hr class="w-20 mt-4 bg-black"/>-->
        <hr class="w-20 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
        <p>or</p>
        <hr class="w-20 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
        <LoginField/>
    </div>
    
    <!-- bottone login con google -->
     <!-- text field email e password -->
      <!-- tasto login -->
       <!-- link a registrazione e pass dimenticata -->
        <!-- tutto questo su metà pagina, l'altra metà magari mettiamo una foto -->
</template>
<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'

const props = defineProps({
    service: {
        titolo: String,
        descrizione: String,
        logo: File,
        status: String
    }
})
</script>

<template>


<router-link to="/service">
    <div class="bg-white rounded-lg shadow-md p-16 max-w-100 mx-8 mt-4 w-full">
    <div class="flex justify-between">
        <div class="basis-1/2">
            <h3 class="text-lg font-bold">{{ titolo }}</h3>
            <p class="text-gray-600">{{ descrizione }}</p>
    </div>
    <div class="flex flex-col justify-end items-center max-w-12 max-h-12 basis-1/2 ">
            <img :src="logo" alt="Service Logo" class="w-full h-full">
            <p class="text-green-500 text-right ">{{ status }}</p>
        </div>
    </div>  
</div>
</router-link>



</template>
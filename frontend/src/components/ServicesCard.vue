<script setup>
import { defineProps } from 'vue'
import { ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
    service: {
        type: Object,
        required: true
    }
})

const isFavourite = ref(false)
const toggleFavourite = () => {
    isFavourite.value = !isFavourite.value
}
onMounted(() => {
    console.log(props.service)
})

</script>

<template>

<!-- `/service/${props.service['_id']}` -->
<!-- {name: 'service-details'} -->
<router-link :to="`/service/${props.service['_id']}`">
    <div class="bg-white rounded-lg shadow-md p-16 max-w-100 mt-4 w-full">
        <div class="flex justify-between">
            <div class="basis-1/2">
                <h3 class="text-lg font-bold justify-start">{{ service.titolo }}</h3>
                <img :src="logo" alt="Service Logo" class="w-full h-full">
            </div>
            <div class="justify-end items-center max-w-12 max-h-12 basis-1/2 ">
                <img v-if="isFavourite" src="@/assets/favourite-toggled.svg" alt="Favourite Toggled" class="top-2 right-2 w-6 h-6 mb-8">
                <img v-else src="@/assets/favorite.svg" alt="Favourite" class="top-2 right-2 w-6 h-6 mb-8">
                <p class="text-green-500 text-right mt-4">{{ service.status }}<i class="pi pi-circle-fill text-sm ml-1"></i>
                </p>
            </div>
        </div>  
    </div>
</router-link>



</template>
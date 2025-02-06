<script setup>
import { defineProps } from 'vue'
import { ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
import StateIndicator from './StateIndicator.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const store = useStore();
const props = defineProps({
    service: {
        type: Object,
        required: true
    }
})

const isFavourite = ref(store.getters['user/getFavourites'].includes(props.service['_id']));
const toggleFavourite = () => {
    isFavourite.value = !isFavourite.value
    store.dispatch('user/toggleFavourite',props.service['_id']);
}

</script>

<template>

<!-- `/service/${props.service['_id']}` -->
<!-- {name: 'service-details'} -->
<router-link :to="`/service/${props.service['_id']}`">
    <div class="bg-white rounded-lg shadow-md p-16 max-w-100 mt-4 w-full">
        {{ store.getters['getRole'] }}
        <div class="flex justify-between">
            <div class="basis-1/2">
                <h3 class="text-lg font-bold justify-start">{{ service.titolo }}</h3>
                <img :src="BACKEND_URL + props.service.foto" alt="Service Logo" class="max-w-20 max-h-20">
            </div>
            <div class="justify-end flex flex-col items-center max-w-12 max-h-12 basis-1/2 mt-12">
                <img v-if="isFavourite" @click.prevent="toggleFavourite" src="@/assets/favourite-toggled.svg" alt="Favourite Toggled" class="top-2 right-2 w-6 h-6 mb-8">
                <img v-else @click.prevent="toggleFavourite" src="@/assets/favorite.svg" alt="Favourite" class="top-2 right-2 w-6 h-6 mb-8">
                <StateIndicator class="flex flex-row" :stato="service['stato']"></StateIndicator>
            </div>
        </div>  
    </div>
</router-link>



</template>
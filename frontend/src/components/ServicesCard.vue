<script setup>
import { computed, defineProps } from 'vue'
import { ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
import StateIndicator from './StateIndicator.vue';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const store = useStore();
const ruolo = ref(store.getters['getRole']);
const props = defineProps({
    service: {
        type: Object,
        required: true
    }
})
const routePrefix = computed(()=>{
    if(store.getters['getRole'] === 'admin'){
        return 'admin'
    }
    else return ''
});

const isFavourite = computed(()=>{
    return store.getters['user/getFavourites'].includes(props.service['_id']);
})
const toggleFavourite = () => {
    store.dispatch('user/toggleFavourite',props.service['_id']);
}

</script>

<template>

<!-- `/service/${props.service['_id']}` -->
<!-- {name: 'service-details'} -->
<router-link :to="`${routePrefix}/service/${props.service['_id']}`">
    <div class="hover:shadow-2xl bg-white rounded-lg shadow-md p-16 max-w-100 mt-4 w-full">
        <div class="flex justify-between">
            <div class="basis-1/2">
                <h3 class="text-2xl font-bold justify-start mb-6">{{ service.titolo }}</h3>
                <img :src="BACKEND_URL + props.service.foto" alt="Service Logo" class="max-w-24 max-h-24">
            </div>
            <div class="justify-end flex flex-col items-center max-w-12 max-h-12 basis-1/2 mt-12">
                <div class="" v-if="ruolo === 'user'">
                    <img v-if="isFavourite" @click.prevent="toggleFavourite" src="@/assets/favourite-toggled.svg" alt="Favourite Toggled" class="top-2 right-2 w-8 h-8 mb-8">
                    <img v-else @click.prevent="toggleFavourite" src="@/assets/favorite.svg" alt="Favourite" class="top-2 right-2 w-8 h-8 mb-8">
                </div>
                <StateIndicator class="flex flex-row" :stato="service['stato']"></StateIndicator>
            </div>
        </div>  
    </div>
</router-link>

</template>
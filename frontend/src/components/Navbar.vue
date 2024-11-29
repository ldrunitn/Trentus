<script>
import navButton from './navbar/navButton.vue';
import SearchButton from './navbar/searchButton.vue';
export default{
    components:{
        navButton,
        SearchButton
    },
    data(){
    return{
        logoUrl: "/src/assets/logo.svg",
        favUrl: "/src/assets/favorite.svg",
        darkTheme: false,
        favorites: [1,3],
        services: [
                {
                _id: 1,
                titolo: "La mia trento",
                show: true
                },
                {
                _id: 2,
                titolo: "Trec+ cartella clinica",
                show: true
                },
                {
                _id:3,
                titolo: "OnOff",
                show: true
                },
                {
                _id:4,
                titolo: "Muoversi in Trentino",
                show: true
                },
            ]
        }
    },
    methods: {
        toggleDarkTheme(){
            this.darkTheme = !this.darkTheme;
        },
        toggleFavorites(){
            this.services.forEach((service) => {
                service.show = this.favorites.include(service.id);
            });
        }
    }   
}

</script>

<template> 
    <nav class="border-b border-gray-500 w-full p-2 flex items-center" id="navbar">
        <router-link to="/" class="ml-2" id="logo"><img class="w-28" src="/src/assets/logo.svg" alt="logo_trentus"></router-link>
        <search-button></search-button>
        <div class="flex flex-nowrap ml-auto" id="buttons">
            <ul class="flex space-x-4 flex-nowrap items-center mr-4">
                <li><nav-button to="favorites" @click="toggleFavorites"><img class="size-9" src="/src/assets/favorite.svg" alt="Preferiti"></nav-button></li>
                <li><nav-button to="/darkTheme"><img class="size-9" src="/src/assets/settings.svg" alt=""></nav-button></li>
                <li><nav-button to="/settings" @click="toggleDarkTheme"><img class="size-9" src="/src/assets/theme.svg" alt=""></nav-button></li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
#navbar{
    background-color: #F6F8FA;
}
</style>
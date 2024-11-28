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
            favUrl: "/src/assets/favorite.svg"
        }
    }
}
</script>

<template> 
    <nav class="border-b border-gray-500 w-full p-2 flex items-center place-content-evenly" id="navbar">
        <router-link to="/" class="ml-2" id="logo"><img src="/src/assets/logo.svg" alt="logo_trentus"></router-link>
        <search-button></search-button>
        <div class="flex flex-nowrap ml-auto place-content-evenly" id="buttons">
            <ul class="flex space-x-4 flex-nowrap items-center mr-4">
                <li><nav-button to="/preferiti"><img src="/src/assets/favorite.svg" alt="Preferiti"></nav-button></li>
                <li><nav-button><img src="/src/assets/settings.svg" alt=""></nav-button></li>
                <li><nav-button><img src="/src/assets/theme.svg" alt=""></nav-button></li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
#navbar{
    background-color: #F6F8FA;
}
</style>
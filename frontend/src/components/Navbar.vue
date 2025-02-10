<script>
import store from '@/store';
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
            dropdown: false,
        }
    },
    methods: {
        toggleFavorites(){
            this.$store.commit('user/toggleShowFavourites')
        },
        toggleDropdown() {
            this.dropdown = !this.dropdown;
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        },
        settingsAction(){
            if(this.actionValue === 'Logout')
                this.logout();
            else this.$router.push('/login')
        }
    },   
    computed: {
        homeLink(){
            let role = this.$store.getters['getRole'];
            switch(role){
                case 'user':
                    return '/';
                case 'gds':
                    return `/gds/${this.$store.getters['gds/getServiceId']}`;
                case 'admin': 
                    return '/admin';
            }
        },
        getShowFavourites(){
            return this.$store.getters['user/getShowFavourites'];
        },
        showFavouritesFilter(){
            if(this.$store.getters['getRole'] === 'user')
                return true;
            else return false;
        },
        actionValue(){
            if(this.$store.getters['getRole'] === '')
                return "Login"
            else return "Logout"
        }   
    }
}

</script>

<template> 
    <nav class="border-b border-gray-500 w-full p-2 flex items-center" id="navbar">
        <router-link :to="homeLink" class="ml-2" id="logo"><img class="w-28" src="/src/assets/trentusextlogo.svg" alt="logo_trentus"></router-link>
        <search-button></search-button>
        <div class="flex flex-nowrap ml-auto place-content-evenly" id="buttons">
            <ul class="flex space-x-4 flex-nowrap items-center mr-4">
                <li>
                    <nav-button v-if="showFavouritesFilter && !getShowFavourites" @click="toggleFavorites"><img class="size-9" src="/src/assets/favorite.svg" alt="Preferiti"></nav-button>
                    <nav-button v-else-if="showFavouritesFilter" @click="toggleFavorites"><img class="size-9 hover:rounded-full" src="/src/assets/favourite-toggled.svg" alt="Preferiti"></nav-button>
                </li>
                
                <li>
                    <nav-button @click.prevent="toggleDropdown"><img class="size-9 hover:bg-purple-400 hover:rounded-full" src="/src/assets/settings.svg" alt="settings"></nav-button>
                    
                </li>                
                <button v-if="dropdown" @click="settingsAction" class="bg-gray-100 absolute mt-15 w-20 mx-auto mr-10 border border-black font-normal text-black text-center">{{ actionValue }}</button>
            </ul>

        </div>
    </nav>
</template>
<style scoped>
#navbar{
    background-color: #F6F8FA;
}
</style>
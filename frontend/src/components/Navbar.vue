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
        dropdown: false,
        // role: this.$store.getters['getRole'],
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
        },
        toggleDropdown() {
            this.dropdown = !this.dropdown;
        },
        logout() {
            console.log('autismo')
            console.log(this.$store.getters['getRole']);
           if(this.$store.getters['getRole'] === 'user') {
                this.$store.commit('user/logout');
                this.$router.push('/login');
           } else if(this.$store.getters['getRole'] === 'gds') {
                this.$store.commit('gds/logout');
                this.$router.push('/gds/login');
           }
           this.$store.commit('setRole',""); // resetto anche il ruolo
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
        }
    }
}

</script>

<template> 
    <nav class="border-b border-gray-500 w-full p-2 flex items-center" id="navbar">
        <router-link :to="homeLink" class="ml-2" id="logo"><img class="w-28" src="/src/assets/logo.svg" alt="logo_trentus"></router-link>
        <search-button></search-button>
        <div class="flex flex-nowrap ml-auto place-content-evenly" id="buttons">
            <ul class="flex space-x-4 flex-nowrap items-center mr-4">
                <li><nav-button to="favorites" @click="toggleFavorites"><img class="size-9" src="/src/assets/favorite.svg" alt="Preferiti"></nav-button></li>
                <li><nav-button to="/settings" @click.prevent="toggleDropdown"><img class="size-9 hover:bg-purple-400 hover:rounded-full" src="/src/assets/settings.svg" alt=""></nav-button></li>
                <button v-if="dropdown" @click="logout" class="bg-gray-100 absolute mt-15 w-20 ml-9 border border-black font-normal text-black text-center">logout</button>
                <li><nav-button to="/darkTheme" @click="toggleDarkTheme"><img class="size-9" src="/src/assets/theme.svg" alt=""></nav-button></li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
#navbar{
    background-color: #F6F8FA;
}
</style>
<template>
<div class="flex items-center border border-gray-500 rounded-3xl px-4 h-16 w-96 mr-4" id="search-div">
    <input v-model="searchQuery" type="text" placeholder="Cerca" id="search-input" class="flex-grow text-gray-600 outline-none rounded-l-lg font-medium" />
    <button class="rounded-r-lg">
        <img src="/src/assets/search.svg" class="w-7 h-7" alt="search" id="search-icon">
    </button>
</div>
<div id="dropdown" class="top-16 absolute w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
      <!-- Active: "bg-gray-100 text-gray-900 outline-none", Not Active: "text-gray-700" -->
      <button @click="updateSearchQuery(service.titolo)" v-for="service in filteredServices" v-if="searchQuery" :key="service._id" href="#" class="block px-4 py-2 text-sm text-gray-600" role="menuitem" tabindex="-1" id="menu-item-0">{{ service.titolo }}</button>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      searchQuery: "", //input nella searchbar
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
  computed: {
    filteredServices(){
      return this.services.filter(service => service.show)
    }
  },
  watch: {
    // Osserva le modifiche a searchQuery e aggiorna i servizi
    searchQuery() {
      this.updateShow();
    },
  },
  methods: {
  // Aggiorna la proprietà `show` in base alla ricerca
    updateShow() {
      const query = this.searchQuery.toLowerCase();
      this.services.forEach((service) => {
        service.show = service.titolo.toLowerCase() === this.searchQuery.toLowerCase() ? false : service.titolo.toLowerCase().includes(query);
      });
      console.log(this.services);
    },
    updateSearchQuery(text){
      this.searchQuery = text;
    }
  }
}
</script>
<style scoped>
#search-icon, #search-div, #search-input, #dropdown{
  background-color: #F0F0F0;
}
#search-div{
  margin-left: 25%;
}
#dropdown{
  left: 39%;
}

</style>
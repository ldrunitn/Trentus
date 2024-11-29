<template>
<div class="flex items-center border border-gray-500 rounded-3xl px-4 h-9 w-72 ml-auto" id="search-div">
    <input v-model="searchQuery" type="text" placeholder="Cerca" id="search-input" class="flex-grow text-gray-600 outline-none rounded-l-lg font-medium" />
    <button class="rounded-r-lg">
        <img src="/src/assets/search.svg" class="w-7 h-7" alt="search" id="search-icon">
    </button>
</div>
</template>
<script>
export default{
  data(){
    return{
      searchQuery: "", //input nella searchbar
      darkTheme: false,
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
  // Aggiorna la proprietà "show" in base alla ricerca
    updateShow() {
      const query = this.searchQuery.toLowerCase();
      this.services.forEach((service) => {
        service.show = service.titolo.toLowerCase().includes(query);
      });
    },
    updateSearchQuery(text){
      this.searchQuery = text;
    },
    toggleDarkTheme(){
      this.darkTheme = !this.darkTheme;
    }
  }
}
</script>
<style scoped>
#search-icon, #search-div, #search-input, #dropdown{
  background-color: #F0F0F0;
}
</style>
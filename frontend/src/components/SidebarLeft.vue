<template>
  <div class="w-64 flex-col bg-gray-100 p-4 shadow-md mr-4 max-w-prose h-full">
    <!-- Ciclo sulle sezioni -->
    <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="mb-6">
      <!-- Titolo sezione -->
      <button class="text-lg font-semibold mb-2 hover:text-purple-600 " @click="toggleSection(sectionIndex)">{{ section.title }}</button>
      <!-- Ciclo sui contenuti della sezione -->
      <div v-for="(item, itemIndex) of section.items" :key="itemIndex" class="mb-4" v-if="section.showItems">
        <button
          @click="toggleDetails(sectionIndex, itemIndex)"
          class="w-full text-left font-medium hover:text-purple-600 hover:font-bold"
        >
          {{ item.label }}
        </button>
        <!-- Mostra i dettagli se la sezione è aperta -->
        <div
          class="ml-4 mt-2 text-sm text-gray-600 space-y-1 flex flex-col"
          v-if="item.showDetails"
        >
          <router-link 
            to="/alert"
            v-for="(detail, detailIndex) in item.details" 
            :key="detailIndex"
            class="hover:text-purple-600 hover:font-bold"
            @click.native = "getAlert(sectionIndex, itemIndex, detailIndex)"
          >
            {{ detail }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  props: {
    sections: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  created(){
    // faccio vedere gli elementi della prima sezione
    this.sections[0].showItems = true; 
    this.sections[0].items[0].showDetails = true;
  },
  data() {
    return {
      openSections: [], // Tiene traccia delle sezioni aperte
      openedItems: []
    };
  },
  methods: {
    toggleSection(sectionIndex) {
      this.sections[sectionIndex].showItems = !this.sections[sectionIndex].showItems;
    },
    toggleDetails(sectionIndex, itemIndex){
      let item = this.sections[sectionIndex].items[itemIndex];
      item.showDetails = !item.showDetails;
    },
    //imposta il current aler per farlo leggere alla view
    getAlert(sectionIndex, itemIndex, detailIndex){
      const service_id = this.sections[sectionIndex].items[itemIndex].label;
      console.log("Service_id: " + service_id);

      let alert = store.getters['user/getAlerts'][service_id][detailIndex];
      console.log("Alert trovato: ")
      console.log(alert);
      
      store.commit('user/setCurrentAlert',alert);

    }
  },
};
</script>

<style>
</style>

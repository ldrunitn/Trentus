<template>
  <div class="w-64 flex-col bg-gray-100 p-4 max-w-prose h-full overflow-auto">
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
          class="mt-2 text-sm text-gray-600 space-y-1 flex flex-col items-left max-h-40 overflow-auto"
          v-if="item.showDetails"
        >
          <router-link
            v-for="(detail, detailIndex) in item.details" 
            :to="section.title === 'Notifiche' || section.title === 'Avvisi' ? `${alertPath}${detail['service_id']}/${detail['id']}` : `${surveryPath}${detail['service_id']}/survey/${detail['id']}`"
            :key="detailIndex"
            class="hover:text-purple-600 hover:font-bold"
          >
            {{ detail['titolo'] }}
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
  async mounted(){
    await this.$store.dispatch('user/fetchFavourites');
    await this.$store.dispatch('user/fetchAlerts');
  },
  created(){
    // faccio vedere gli elementi della prima sezione
    try{
      this.sections[0].showItems = true; 
      this.sections[0].items[0].showDetails = true;
    }
    catch(err){
      //easy
    }
  },
  data() {
    return {
      openSections: [], // Tiene traccia delle sezioni aperte
      openedItems: []
    };
  },
  computed: {
    alertPath() {
      const role = this.$store.getters['getRole'];
      if(role === 'user') {
        return '/alert/';
      } else if(role === 'gds') {
        return '/gds/alert/';
      }
    },
    surveryPath(){
      const role = this.$store.getters['getRole'];
      if(role === 'user') {
        return '/service/';
      } else if(role === 'gds') {
        return '/gds/service/';
      }
    }
  },
  methods: {
    toggleSection(sectionIndex) {
      this.sections[sectionIndex].showItems = !this.sections[sectionIndex].showItems;
    },
    toggleDetails(sectionIndex, itemIndex){
      let item = this.sections[sectionIndex].items[itemIndex];
      item.showDetails = !item.showDetails;
    },
  },
};
</script>

<style>
.scroll{
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>

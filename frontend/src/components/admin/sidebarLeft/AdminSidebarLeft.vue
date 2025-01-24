<!-- <script setup>

</script>

<template> 
    <div>
        <div class="bg-gray-300 rounded-lg shadow-md mr-4 max-w-prose">
            <div class="p-8">
                <h2 class="text-xl font-bold">Notfiche</h2>
                <p class="text-gray-600 bg">notifichenotifichenotifiche</p>
            </div>
        </div>
    </div>
</template> -->

<template>
  <div class="w-64 flex-col bg-gray-100 p-4 shadow-md mr-4 max-w-prose h-full">
    <h2 class="text-lg font-semibold mb-2">Richieste</h2>
    <RequestsContainer></RequestsContainer>
  </div>
</template>

<script>
import RequestsContainer from './RequestsContainer.vue';
export default {
  components:{
    RequestsContainer
  }, 
  props: {
    sections: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      openSections: {}, // Tiene traccia delle sezioni aperte
    };
  },
  methods: {
    toggleSection(sectionIndex, itemIndex) {
      const key = `${sectionIndex}-${itemIndex}`;
      this.$set(this.openSections, key, !this.openSections[key]);
    },
    isSectionOpen(sectionIndex, itemIndex) {
      return this.openSections[`${sectionIndex}-${itemIndex}`] || false;
    },
  },
};
</script>

<style>
</style>

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
    <!-- Ciclo sulle sezioni -->
    <div v-for="(section, index) in sections" :key="index" class="mb-6">
      <!-- Titolo sezione -->
      <h2 class="text-lg font-semibold mb-2">{{ section.title }}</h2>
      <!-- Ciclo sui contenuti della sezione -->
      <div v-for="(item, subIndex) in section.items" :key="subIndex" class="mb-4">
        <button
          @click="toggleSection(index, subIndex)"
          class="w-full text-left font-medium text-gray-700"
        >
          {{ item.label }}
        </button>
        <!-- Mostra i dettagli se la sezione è aperta -->
        <div
          v-if="isSectionOpen(index, subIndex)"
          class="ml-4 mt-2 text-sm text-gray-600 space-y-1"
        >
          <p v-for="(detail, detailIndex) in item.details" :key="detailIndex">
            {{ detail }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

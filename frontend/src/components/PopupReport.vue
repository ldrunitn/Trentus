<script setup>
import { ref } from 'vue'

const open = ref(false)

const toggleModal = () => {
    open.value = !open.value
}
</script>

<template> 
    <button 
        @click="toggleModal; console.log(open.value)" 
        class="bg-red-500 text-white rounded-lg border-slate-950 shadow mt-1 w-20 h-8 text-center"
    >
        Segnala
    </button>
        
  <Teleport to="#modal">
    <div v-if="open" class="modal-overlay">
      <div class="modal">
        <p>Hello!!</p>
        <button 
          @click="toggleModal" 
          class="bg-gray-300 rounded-lg px-4 py-2 mt-2"
        >
          Close
        </button>
      </div>
    </div>
  </Teleport>
      
</template>

<style scoped>
body {
    z-index: 0;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
</style>

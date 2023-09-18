<script setup lang="ts">
import { ref } from 'vue';
import GameOfLife from './components/GameOfLife.vue';

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div id="gol-component">
    <div class="actions">
      <button id="gol-button" type="button" @click="toggle">
        juego de la vida
      </button>
    </div>
  </div>
  <Teleport to="body">
    <GameOfLife v-if="isOpen" />
  </Teleport>
</template>

<style lang="scss">
#gol-component {
  position: relative;
  z-index: 1000;
}
</style>

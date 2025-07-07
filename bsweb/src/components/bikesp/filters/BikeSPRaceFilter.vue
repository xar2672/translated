<template>
  <label for="race-select">Raça:</label>
  <div class="select-button-wrapper">
    <select id="race-select" v-model="g" @change="changeRace">
      <option value="Amarela">Amarela</option>
      <option value="Branca">Branca</option>
      <option value="Parda">Parda</option>
    </select>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const g = ref('');

const changeRace = () => {
  store.commit('bikesp/updateFilters', { race: g });
};

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { race: undefined });
});
</script>

<template>
  <div class="data-type-selector">
    <label for="data-type-select">Selecione o tipo de visualização:</label>
    <select
      id="data-type-select"
      v-model="selected"
      @change="onChange"
    >
      <option value="MAP">Mapa</option>
      <option value="CHART">Gráfico</option>
    </select>
    <p class="helper-text">
      Escolha a forma como deseja visualizar os dados.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selected = ref('CHART');

const onChange = (e) => {
  store.commit('bikesp/changeView', selected.value);
  store.dispatch('bikesp/updateData');
};

onMounted(() => {
  store.commit('bikesp/changeView', selected.value);
});
</script>


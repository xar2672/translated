<template>
  <div class="data-type-selector">
    <label for="data-type-select">$t(bikesp.changeViewType):</label>
    <select
      id="data-type-select"
      v-model="selected"
      @change="onChange"
    >
      <option value="MAP">$t(bikesp.map)</option>
      <option value="CHART">$t(bikesp.chart)</option>
    </select>
    <p class="helper-text">
      $t(bikesp.viewtype_helper)
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


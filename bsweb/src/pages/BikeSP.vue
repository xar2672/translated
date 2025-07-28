<template>
  <div class="layout-container">
    <BikeSPForm class="form-panel" />
    <div class="chart-panel">
      <BikeSPChart v-if="!isMapView"/>
      <BikeSPMap mapkey="main" v-if="isMapView"/>
    </div>
  </div>
</template>

<script setup>
import BikeSPChart from '../components/charts/BikeSPChart.vue';
import BikeSPForm from '../components/bikesp/BikeSPForm.vue';
import BikeSPMap from '../components/map/BikeSPMap.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

const store = useStore();
const isMapView = computed(() => store.getters['bikesp/isMapViewOn']);

onMounted(() => {
  if (!localStorage.ut) {
    localStorage.ut = uuidv4();
  }
  
  const actions = [
    'fetchCategories',
    'fetchCPTM_lines',
    'fetchSubway_lines',
    'fetchCPTM_stations',
    'fetchSubway_stations',
    'fetchBikelane',
    'fetchAccidents'
  ];

  actions.forEach(action => store.dispatch(action));
  store.dispatch('user_shapefiles/loadSavedLayers');
});
</script>

<style scoped>
.layout-container {
  display: flex;
  gap: 4px;
  align-items: flex-start;
  padding: 16px;
  height: 80vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.form-panel {
  flex: 0 0 320px;
  max-width: 320px;
  overflow-y: auto;
  height: 80vh;
}

.chart-panel {
  flex: 1;
  min-width: 0;
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.chart-panel > * {
  flex-grow: 1;
  width: 100%;
}
</style>

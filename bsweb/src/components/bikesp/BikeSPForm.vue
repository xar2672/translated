<template>
  <div class="controls-container">
    <BikeSPVisualizationInput />
    <BikeSPDataTypeInput />
    <BikeSPAggregationInput v-if="!isMapViewOn"/>
    <BikeSPFilter />
    <div class="button-wrapper">
      <button @click="apply" class="apply-button">Aplicar</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import BikeSPAggregationInput from './BikeSPAggregationInput.vue';
import BikeSPDataTypeInput from './BikeSPDataTypeInput.vue';
import BikeSPFilter from './BikeSPFilter.vue';
import BikeSPVisualizationInput from './BikeSPVisualizationInput.vue';

const store = useStore();
const isMapViewOn = computed(() => store.getters['bikesp/isMapViewOn'])
const hasNewDataConfig = computed(() => store.getters['bikesp/hasNewDataConfig'])

const apply = () => {
  store.dispatch('bikesp/updateData');
};

onMounted(() => {
    store.dispatch('bikesp/updateData');
})
</script>

<style>
.controls-container {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 420px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: sans-serif;
}

.button-wrapper {
  text-align: center;
}

.apply-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.apply-button:hover {
  background-color: #0056b3;
}

.controls-container select {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: border 0.2s ease;
}

.controls-container select:focus {
  outline: none;
  border-color: #007bff;
  background-color: #fff;
}

.helper-text {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
}

.controls-container label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}
</style>

<template>
  <div class="controls-container">
    <BikeSPVisualizationInput />
    <BikeSPDataTypeInput />
    <BikeSPAggregationInput v-if="!isMapViewOn"/>
    <BikeSPLayerInput mapkey="main" v-if="isMapViewOn"/>
    <BikeSPFilter />
    <div class="button-wrapper">
      <button @click="apply" class="apply-button" :disabled="!hasNewDataConfig">{{$t('BIKESP.apply')}}</button>
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
import BikeSPLayerInput from './BikeSPLayerInput.vue';

const store = useStore();
const isMapViewOn = computed(() => store.getters['bikesp/isMapViewOn'])
const hasNewDataConfig = computed(() => store.getters['bikesp/hasNewDataConfig'])

const apply = () => {
  store.dispatch('bikesp/updateData');
};

onMounted(() => {
  store.dispatch('bikesp/updateData');
});
</script>

<style>
.arrow {
  transition: all ease-in-out 0.2s;
  transform: rotate(-90deg);
  width: 12px;
  margin-right: 4px;
  margin-top: auto;
  margin-bottom: auto;
}
.category-toggle {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
}
.arrow.active {
  transform: none
}
.controls-container {
  border-radius: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: sans-serif;

  border-width: 1px 1px 0 0;
  padding: 16px 26px 16px 16px;
}

.button-wrapper {
  text-align: center;
}

.apply-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 24px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.apply-button:disabled {
  background-color: rgb(173, 207, 243);
}

.apply-button:not(:disabled):hover {
  background-color: #0056b3;
}

.controls-container select {
  width: 100%;
  padding: 8px 12px;
  font-size: .9rem;
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
  font-size: .8rem;
  color: #666;
}

.controls-container label:not(.category-wrapper label *) {
  display: block;
  font-weight: bold;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: 0.2rem;
  color: #333;
  text-align: left;
}

.filter-box {
  position: relative;
  padding: 12px;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease;
  width: 100%;
}

.filter-box:hover {
  background-color: #d3d3d3;
}

.remove-btn-top {
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: transparent;
  border: none;
  color: #aaa;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  line-height: 1;
}

.remove-btn-top:hover {
  color: #e74c3c;
}

.active-fields > * {
  margin-top: 12px;
}

.active-fields:has(label) {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.filter-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fixed-width-multiselect {
  width: 100%;
}

.multiselect__content-wrapper {
  width: 100% !important;
  min-width: 100% !important;
  box-sizing: border-box;
}

.active-filters > * {
  margin-top: 12px;
}

.active-filters:has(label) {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.filter-wrapper {
  display: flex;
  align-items: right;
  gap: 8px;
  margin-top: 6px;
}

.filter-wrapper select {
  font-size: .9rem;
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
}

.filter-wrapper label {
  font-size: .8rem;
}
</style>

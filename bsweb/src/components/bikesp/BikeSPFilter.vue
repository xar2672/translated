<template>
  <div class="filter-container">
    <div>
      <label for="filter-select">Adicionar filtro:</label>
      <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
                 :preserve-search="true" placeholder="Escolha um filtro" label="name" track-by="name" :preselect-first="false"
                 :taggable="true">
      </multiselect>
    </div>
    <div class="active-filters">
      <div v-for="filter in value" :key="filter.name" class="filter-wrapper">
        <div class="filter-box">
          <button class="remove-btn-top" @click="removeFilter(filter)" title="Remover filtro">×</button>
          <component :is="filter.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BikeSPGenderFilter from './filters/BikeSPGenderFilter.vue';
import BikeSPRaceFilter from './filters/BikeSPRaceFilter.vue';
import Multiselect from 'vue-multiselect';
import BikeSPDateFilter from './filters/BikeSPDateFilter.vue';
import BikeSPWeekDayFilter from './filters/BikeSPWeekDayFilter.vue';
import BikeSPPayoutFilter from './filters/BikeSPPayoutFilter.vue';
import BikeSPHourFilter from './filters/BikeSPHourFilter.vue';

const value = ref([])

const options = [
  {name: 'Gênero', value: BikeSPGenderFilter},
  {name: 'Raça', value: BikeSPRaceFilter},
  {name: 'Data', value: BikeSPDateFilter},
  {name: 'Dia da semana', value: BikeSPWeekDayFilter},
  {name: 'Recompensa', value: BikeSPPayoutFilter},
  {name: 'Hora do dia', value: BikeSPHourFilter}
]

const removeFilter = (filter) => {
  value.value = value.value.filter(f => f !== filter)
}
</script>

<style>
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
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  line-height: 1;
}

.remove-btn-top:hover {
  color: #e74c3c;
}

.filter-wrapper {
  display: flex;
  align-items: right;
  gap: 8px;
  margin-top: 6px;
}

.filter-wrapper select {
  font-size: 13px;
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
}

.filter-wrapper label {
  font-size: 13px;
}
</style>

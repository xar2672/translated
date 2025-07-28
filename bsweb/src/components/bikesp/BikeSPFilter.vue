<template>
  <div>
    <div class="category-toggle" @click="toggleCategory">
      <img :src="iconArrow" :class="['arrow', { active: isVisible }]">
      <label>Filtros</label>
    </div>
    <div v-show="isVisible" class="filter-container">
      <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
                 :preserve-search="true" placeholder="Escolha um filtro" label="name" track-by="name" :preselect-first="false"
                 :taggable="true" deselectLabel="" selectLabel="" selectedLabel="Selecionado">
      </multiselect>
      <div class="active-fields">
        <div v-for="filter in value" :key="filter.name" class="filter-wrapper">
          <div class="filter-box">
            <button class="remove-btn-top" @click="removeFilter(filter)" title="Remover filtro">×</button>
            <component :is="filter.value" />
          </div>
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
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';

const value = ref([])
const isVisible = ref(false);

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

const toggleCategory = () => {
  isVisible.value = !isVisible.value;
};
</script>

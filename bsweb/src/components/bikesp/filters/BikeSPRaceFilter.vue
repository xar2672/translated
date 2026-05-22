<template>
  <label for="race-select">t$(bikesp.aggregation.RACE):</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" placeholder=$t(bikesp.chooseRace) label="name" track-by="name" :preselect-first="false"
        :taggable="true" deselectLabel="" selectLabel="" selectedLabel=$t(bikesp.selected)>
    </multiselect>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import Multiselect from 'vue-multiselect';
import { getValueList } from './commons';

const store = useStore();

const value = ref([]);

const getTranslationForValue = (value) => {
  return t(`bikesp.race.${value}`)
}

const options = [
  {name: getTranslationForValue('asian'), value: 'Amarela'},
  {name: getTranslationForValue('white'), value: 'Branca'},
  {name: getTranslationForValue('brown'), value: 'Parda'},
  {name: getTranslationForValue('indigenous'), value: 'Indígena'},
  {name: getTranslationForValue('black'), value: 'Preta'},
  {name: getTranslationForValue('na'), value: 'Prefiro nã'},
]

watch(value, () => {
  store.commit('bikesp/updateFilters', { races: getValueList(value) })
}, {deep: true})

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { races: undefined });
});
</script>

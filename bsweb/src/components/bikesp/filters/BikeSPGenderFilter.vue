<template>
  <label>t$(bikesp.aggregation.GENDER):</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" placeholder=$t(bikesp.genderSelect) label="name" track-by="name" :preselect-first="false"
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
  return t(`bikesp.gender.${value}`)
}

const options = [
  {name: getTranslationForValue('feminine'), value: 'F'},
  {name: getTranslationForValue('masculine'), value: 'M'},
  {name: getTranslationForValue('nonBinary'), value: 'NB'},
  {name: getTranslationForValue('na'), value: 'NA'}
]

watch(value, () => {
  store.commit('bikesp/updateFilters', { genders: getValueList(value) });
}, {deep: true})

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { genders: undefined });
});
</script>

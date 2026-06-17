<template>
  <label for="race-select">{{$t('BIKESP.filters.aggregation.RACE')}}:</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :custom-label="translateLabels"
        :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" :placeholder="$t('BIKESP.filters.race.chooseRace')" label="name" track-by="key" :preselect-first="false"
        :taggable="true" deselectLabel="" selectLabel="" :selectedLabel="$t('BIKESP.selected')">
    </multiselect>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import Multiselect from 'vue-multiselect';
import { getValueList } from './commons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useStore();

const value = ref([]);

const getTranslationForValue = (value) => {
  return t(`BIKESP.filters.race.raceList.${value}`);
};
const translateLabels = (option) => getTranslationForValue(option.key);

const options = computed(() => {
  const baseOptions = [
    {key: 'asian', value: 'Amarela'},
    {key: 'white', value: 'Branca'},
    {key: 'brown', value: 'Parda'},
    {key: 'indigenous', value: 'Indígena'},
    {key: 'black', value: 'Preta'},
    {key: 'na', value: 'Prefiro nã'}
  ];

  return baseOptions.map(entry => ({
    ...entry,
    name: getTranslationForValue(entry.key)
  }));
});

watch(value, () => {
  store.commit('bikesp/updateFilters', { races: getValueList(value) })
}, {deep: true});

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { races: undefined });
});
</script>

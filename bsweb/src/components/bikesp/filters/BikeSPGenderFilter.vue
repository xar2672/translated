<template>
  <label>{{$t('BIKESP.filters.aggregation.GENDER')}}:</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :custom-label="translateLabels"
        :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" :placeholder="$t('BIKESP.filters.gender.chooseGender')" label="name" track-by="key" :preselect-first="false"
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
  return t(`BIKESP.filters.gender.genderList.${value}`);
};
const translateLabels = (option) => getTranslationForValue(option.key);

const options = computed(() => {
  const baseOptions = [
    {key: 'feminine', value: 'F'},
    {key: 'masculine', value: 'M'},
    {key: 'nonBinary', value: 'NB'},
    {key: 'na', value: 'NA'}
  ];

  return baseOptions.map(entry => ({
    ...entry,
    name: getTranslationForValue(entry.key)
  }));
});

watch(value, () => {
  store.commit('bikesp/updateFilters', { genders: getValueList(value) });
}, {deep: true});

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { genders: undefined });
});
</script>

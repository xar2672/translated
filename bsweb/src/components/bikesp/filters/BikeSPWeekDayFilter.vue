<template>
  <label for="race-select">{{$t('BIKESP.filters.aggregation.DAY_OF_WEEK')}}:</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :custom-label="translateLabels"
        :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" :placeholder="$t('BIKESP.filters.day_week.chooseDateofWeek')" label="name" track-by="key" :preselect-first="false"
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

const value = ref([])

const getTranslationForValue = (value) => t(`BIKESP.filters.day_week.weekDays.${value}`);
const translateLabels = (option) => {
  return getTranslationForValue(option.key);
};

const options = computed(() => {
  const baseOptions = [
    { key: 'sun', value: 0 },
    { key: 'mon', value: 1 },
    { key: 'tue', value: 2 },
    { key: 'wed', value: 3 },
    { key: 'thu', value: 4 },
    { key: 'fri', value: 5 },
    { key: 'sat', value: 6 }
  ];

  return baseOptions.map(entry => ({
    ...entry,
    name: getTranslationForValue(entry.key)
  }));
});

watch(value, () => store.commit('bikesp/updateFilters', { week_days: getValueList(value) }), {deep: true});

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { week_days: undefined });
});
</script>

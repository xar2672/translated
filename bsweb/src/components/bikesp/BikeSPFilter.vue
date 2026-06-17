<template>
  <div>
    <div class="category-toggle" @click="toggleCategory">
      <img :src="iconArrow" :class="['arrow', { active: isVisible }]">
      <label>{{$t('COMMONS.filters', 2)}}</label>
    </div>
    <div v-show="isVisible" class="filter-container">
      <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :custom-label="translateLabels"
                 :multiple="true" :close-on-select="true" :clear-on-select="false"
                 :preserve-search="true" :placeholder="$t('BIKESP.filters.chooseFilter')" label="name" track-by="key" :preselect-first="false"
                 :taggable="true" deselectLabel="" selectLabel="" :selectedLabel="$t('BIKESP.selected')">
      </multiselect>
      <div class="active-fields">
        <div v-for="filter in value" :key="filter.name" class="filter-wrapper">
          <div class="filter-box">
            <button class="remove-btn-top" @click="removeFilter(filter)" :title="$t('BIKESP.filters.removeFilter')">×</button>
            <component :is="filter.value" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import BikeSPGenderFilter from './filters/BikeSPGenderFilter.vue';
import BikeSPRaceFilter from './filters/BikeSPRaceFilter.vue';
import Multiselect from 'vue-multiselect';
import BikeSPDateFilter from './filters/BikeSPDateFilter.vue';
import BikeSPWeekDayFilter from './filters/BikeSPWeekDayFilter.vue';
import BikeSPPayoutFilter from './filters/BikeSPPayoutFilter.vue';
import BikeSPHourFilter from './filters/BikeSPHourFilter.vue';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const value = ref([]);
const isVisible = ref(false);

const getTranslationForValue = (value) => {
  if (value == 'DATE') return t('BIKESP.filters.day_week.date');
  else return t(`BIKESP.filters.aggregation.${value}`);
};
const translateLabels = (option) => getTranslationForValue(option.key);

const options = computed(() => {
  const baseOptions = [
    {key: 'GENDER', value: BikeSPGenderFilter},
    {key: 'RACE', value: BikeSPRaceFilter},
    {key: 'DATE', value: BikeSPDateFilter},
    {key: 'DAY_OF_WEEK', value: BikeSPWeekDayFilter},
    {key: 'PAYOUT_LEVEL', value: BikeSPPayoutFilter},
    {key: 'HOUR', value: BikeSPHourFilter}
  ];

  return baseOptions.map(entry => ({
    ...entry,
    name: getTranslationForValue(entry.key)
  }));
});

const removeFilter = (filter) => {
  value.value = value.value.filter(f => f !== filter);
};

const toggleCategory = () => {
  isVisible.value = !isVisible.value;
};
</script>

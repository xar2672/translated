<template>
  <div>
    <div class="category-toggle" @click="toggleCategory">
      <img :src="iconArrow" :class="['arrow', { active: isVisible }]">
      <label>{{$t('bikesp.filters')}}</label>
    </div>
    <div v-show="isVisible" class="filter-container">
      <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
                 :preserve-search="true" :placeholder="$t('bikesp.chooseFiler')" label="name" track-by="name" :preselect-first="false"
                 :taggable="true" deselectLabel="" selectLabel="" :selectedLabel="$t('bikesp.selected')">
      </multiselect>
      <div class="active-fields">
        <div v-for="filter in value" :key="filter.name" class="filter-wrapper">
          <div class="filter-box">
            <button class="remove-btn-top" @click="removeFilter(filter)" :title="$t('bikesp.removeFilter')">×</button>
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

const value = ref([])
const isVisible = ref(false);

const getTranslationForValue = (value) => {
  return t(`bikesp.aggregation.${value}`)
}

const options = computed(() => [
  {name: getTranslationForValue('GENDER'), value: BikeSPGenderFilter},
  {name: getTranslationForValue('RACE'), value: BikeSPRaceFilter},
  {name: t(bikesp.date), value: BikeSPDateFilter},
  {name: getTranslationForValue('DAY_OF_WEEK'), value: BikeSPWeekDayFilter},
  {name: getTranslationForValue('PAYOUT_LEVEL'), value: BikeSPPayoutFilter},
  {name: getTranslationForValue('HOUR'), value: BikeSPHourFilter}
]);

const removeFilter = (filter) => {
  value.value = value.value.filter(f => f !== filter)
}

const toggleCategory = () => {
  isVisible.value = !isVisible.value;
};
</script>

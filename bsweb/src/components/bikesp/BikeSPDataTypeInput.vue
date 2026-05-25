<template>
  <div class="data-type-selector">
    <label for="data-type-select">{{$t('bikesp.changeDataType')}}:</label>
    <select
      id="data-type-select"
      v-model="selected"
      @change="onChange"
    >
      <option
        v-for="option in currentOptions"
        :key="option"
        :value="option"
      >
        {{ getTranslationForValue(option) }}
      </option>
    </select>
    <p class="helper-text">
      {{$t('bikesp.datatype_helper')}}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useStore();

const selected = ref('TRIP_COUNT');

const isMapViewOn = computed(() => store.getters['bikesp/isMapViewOn'])

const chartOptions = [
  'TRIP_COUNT', 
  'TRIP_DURATION',
  'TRIP_DISTANCE',
  'MEAN_SPEED',
];

const mapOptions = [
  'TOTAL_SAMPLES',
  'SAMPLE_MEAN_SPEED',
  'TOTAL_TRIPS'
];

const currentOptions = computed(() =>
  isMapViewOn.value ? mapOptions : chartOptions
);

const getTranslationForValue = (value) => {
  return t(`bikesp.dataType.${value}`)
}

const onChange = (e) => {
  store.commit('bikesp/updateDataType', selected.value);
};

// This is necessary to change the default select option when the visualization changes
watch(currentOptions, (options) => {
  if (options.length && !options.some(opt => opt === selected.value)) {
    selected.value = options[0];
    store.commit('bikesp/updateDataType', selected.value);
    store.dispatch('bikesp/updateData');
  }
}, { immediate: true });

onMounted(() => {
  store.commit('bikesp/updateDataType', selected.value);
});

onBeforeUnmount(() => {
  store.commit('bikesp/updateDataType', undefined);
});
</script>


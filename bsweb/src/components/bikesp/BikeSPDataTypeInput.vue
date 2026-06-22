<template>
  <div class="data-type-selector">
    <label for="data-type-select">{{$t('BIKESP.dataType.changeDataType')}}:</label>
    <select
      id="data-type-select" v-model="selected" @change="onChange"
    >
      <option
        v-for="option in currentOptions" :key="option" :value="option"
      >
        {{ getTranslationForValue(option) }}
      </option>
    </select>
    <p class="helper-text">
      {{$t('BIKESP.dataType.datatype_helper')}}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useStore();

const selected = ref('TOTAL_TRIPS');

const isMapViewOn = computed(() => store.getters['bikesp/isMapViewOn'])

const chartOptions = [
  'TOTAL_TRIPS', 
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
  return t(`BIKESP.dataType.typeList.${value}`);
};

const onChange = () => {
  store.commit('bikesp/updateDataType', selected.value);
};

// This is necessary to change the default select option when the visualization changes
watch(currentOptions, async (options) => {
  if (options.length && !options.some(opt => opt === selected.value)) {
    selected.value = options[0];
    store.commit('bikesp/updateDataType', selected.value);
    await nextTick();
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


<template>
  <div class="data-type-selector">
    <label for="data-type-select">{{$t('BIKESP.mapView.changeViewType')}}:</label>
    <select
      id="data-type-select" v-model="selected" @change="onChange"
    >
      <option value="MAP">{{$t('COMMONS.maps', 1)}}</option>
      <option value="CHART">{{$t('COMMONS.charts', 1)}}</option>
    </select>
    <p class="helper-text">
      {{$t('BIKESP.mapView.viewtype_helper')}}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selected = ref('CHART');

const onChange = async (e) => {
  store.dispatch('bikesp/changeView', selected.value);
  await nextTick();
  store.dispatch('bikesp/applyFilters');
};

onMounted(() => {
  store.dispatch('bikesp/changeView', selected.value);
});
</script>


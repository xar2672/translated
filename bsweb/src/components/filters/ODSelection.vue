<template>
  <div v-show="mapkey === 'main' || secondMapIsActive">
    <div>
      <span v-if="secondMapIsActive" class="label">{{ $t(`BIKESCIENCEWEB.tabs.maps.tripsSource`) }} ({{ $t(`BIKESCIENCEWEB.tabs.filters.baseLayerMap.${mapkey}`) }}):</span>
      <span v-else class="label">{{ $t(`BIKESCIENCEWEB.tabs.maps.tripsSource`) }}:</span>
      <b-radio
        v-model="year" :name="`od-year-${mapkey}`" :native-value="2017" type="is-info"
      >
        <span class="view-option">OD 2017</span>
      </b-radio>
      <b-radio
        v-model="year" :name="`od-year-${mapkey}`" :native-value="2007" type="is-info"
      >
        <span class="view-option">OD 2007</span>
      </b-radio>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  mapkey: { type: String, required: true },
});

const store = useStore();

const secondMapIsActive = computed(() => store.getters.secondMapIsActive);
const odYear = computed(() => store.getters['flows/odYear']);

const year = computed({
  get() {
    return odYear.value[props.mapkey];
  },
  set(value) {
    store.dispatch('flows/setOdYear', { year: value, mapkey: props.mapkey });
  }
});

watch(year, () => {
  store.dispatch('resetMapResource', {
    mapkey: props.mapkey,
    category: 'flows',
    type: 'polyline',
  });
  store.dispatch('flows/resetFlows', props.mapkey);
  store.dispatch('filterData', props.mapkey);
});
</script>

<style scoped>
.label {
  font-size: .85rem;
}
.view-option {
  font-size: .85rem;
}
</style>
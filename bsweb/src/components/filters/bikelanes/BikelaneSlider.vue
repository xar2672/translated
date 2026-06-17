<template>
  <div id="tmp">
    <b-field>
      {{ $t('BIKESCIENCEWEB.tabs.filters.bikelane.slider.field', bikelaneRange[1] - bikelaneRange[0] + 1) }}:
      ({{ $t('BIKESCIENCEWEB.tabs.filters.bikelane.slider.form', {start: bikelaneRange[0], end: bikelaneRange[1]}, bikelaneRange[1] - bikelaneRange[0] + 1) }})
    </b-field>
    <b-slider
      v-model="bikelaneRange" type="is-info"
      :min="Math.min(...bikelaneYears)"
      :max="Math.max(...bikelaneYears)"
      :tooltip="true"
      :custom-formatter="val => `${val}`"
    >
      <b-slider-tick :value="Math.min(...bikelaneYears)">
        {{ Math.min(...bikelaneYears) }}
      </b-slider-tick>
      <b-slider-tick :value="Math.max(...bikelaneYears)">
        {{ Math.max(...bikelaneYears) }}
      </b-slider-tick>
    </b-slider>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  mapkey: { type: String, required: true },
});

const store = useStore();

const bikelaneYears = computed(() => store.getters.bikelaneYears);

const bikelaneRange = computed({
  get() {
    return store.state.layers[props.mapkey].bikelaneRange;
  },
  set(range) {
    store.dispatch('setBikelaneRange', { range, mapkey: props.mapkey });
  }
});

const gridSize = computed({
  get() {
    return store.state.filters[props.mapkbikelaneYearsey].filters.gridSize;
  },
  set(gridSize) {
    store.dispatch('updateGridSize', { gridSize, mapkey: props.mapkey });
    store.dispatch('reloadGrid'); 
  }
});
</script>
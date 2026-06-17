<template>
  <div>
    <input v-model="isActive" type="checkbox">
    <label class="filter-name">{{ $t(`COMMONS.layers_filter.${filter.filter_key}`) }}</label>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  filter: { type: Object, required: true },
  type: { type: String, required: true },
  mapkey: { type: String, required: true },
});

const store = useStore();

const isActive = computed({
  get() {
    return store.getters.activeLayers[props.filter.filter_key][props.mapkey];
  },
  set(value) {
    store.dispatch('setActiveLayer', {
      layer_key: props.filter.filter_key,
      mapkey: props.mapkey,
      value
    });
  }
});
</script>

<style scoped>
.filter-name {
  margin: 0 5px;
  font-size: .8rem;
}

input {
  cursor: pointer;
}
</style>
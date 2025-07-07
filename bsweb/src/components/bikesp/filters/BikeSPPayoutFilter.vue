<template>
  <label>Recompensa:</label>
  <div>
    <b-slider
      v-model="value"
      type="is-info"
      :min="0"
      :step="0.01"
      :max="1"
      :tooltip="true"
    >
      <b-slider-tick :value="0">
        {{ 0 }}
      </b-slider-tick>
      <b-slider-tick :value="1">
        {{ 1 }}
      </b-slider-tick>
    </b-slider>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const value = ref([0.0, 1.0])

const commitValue = (min, max) => {
  store.commit('bikesp/updateFilters', { 
    min_payout: min,
    max_payout: max
  });
}

watch(value, () => {
  commitValue(value.value[0], value.value[1]);
}, { deep: true });

onMounted(() => {
  commitValue(0, 1);
});

onBeforeUnmount(() => {
  commitValue(undefined, undefined)
});
</script>

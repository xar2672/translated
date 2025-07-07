<template>
  <label>Hora do dia:</label>
  <div>
    <b-slider
      v-model="value"
      type="is-info"
      :min="0"
      :max="23.99"
      :step="0.25"
      :tooltip="true"
      :custom-formatter="formatHour"
    >
      <b-slider-tick v-for="h in [0, 12, 23]" :key="h" :value="h">
        {{ formatHour(h) }}
      </b-slider-tick>
    </b-slider>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const value = ref([0, 23.99]);

const formatHour = (val) => {
  const hours = Math.floor(val);
  const minutes = Math.round((val - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const commitValue = (min, max) => {
  store.commit('bikesp/updateFilters', { 
    from_hour: formatHour(min),
    to_hour: formatHour(max)
  });
};

watch(value, () => {
  commitValue(value.value[0], value.value[1]);
}, { deep: true });

onMounted(() => {
  commitValue(0, 23.99);
});

onBeforeUnmount(() => {
  commitValue(undefined, undefined);
});
</script>

<style scoped>
.b-slider .b-slider-tick-label {
  left: 200% !important
}
</style>
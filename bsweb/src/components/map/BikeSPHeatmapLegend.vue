<template>
  <div class="heatmap-legend leaflet-control leaflet-control-custom">
    <div class="legend-title">{{ $t(title) }}</div>
    <div class="gradient-bar" :style="barStyle"></div>
    <div class="legend-labels">
      <span>{{ compact(Math.round(min)) }}</span>
      <span>{{ compact(Math.round(max/3)) }}</span>
      <span>{{ compact(Math.round(2*max/3)) }}</span>
      <span>{{ compact(Math.round(max)) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getHeatmapConfig } from './BikeSPHeatmapConfig';
import { useStore } from 'vuex';

const store = useStore();

const gradient = computed(() => getHeatmapConfig(store.state.bikesp.activeDataConfig.data_type).gradient);
const title =  computed(() => getHeatmapConfig(store.state.bikesp.activeDataConfig.data_type).label);

const props = defineProps({
  min: { type: Number, required: true },
  max: { type: Number, required: true }
});

const barStyle = computed(() => {return {
  background: `linear-gradient(to right, ${Object.entries(gradient.value)
    .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
    .map(([percent, color]) => `${color} ${parseFloat(percent) * 100}%`)
    .join(', ')})`,
}});

const compact = (number) => {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
};
</script>

<style scoped>
.heatmap-legend {
  background: white;
  padding: 10px 20px;
  font-size: .85rem;
  color: #333;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 10px;
  width: max-content;
  min-width: 200px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 999;
}

.legend-title {
  text-align: center;
  margin-bottom: 4px;
  font-weight: bold;
}

.gradient-bar {
  height: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.legend-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: .8rem;
}
</style>

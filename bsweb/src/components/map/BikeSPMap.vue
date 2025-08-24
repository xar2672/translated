<template>
  <div>
    <l-map
    :ref="mapkey"
    :zoom="8"
    :center="center"
    :inertia-deceleration="10000"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @ready="onMapReady"
    @move="onMapMove"
  >
    <l-control-layers position="topright" />
    <l-tile-layer
        v-for="tile in properties.tile_layers"
        :key="`tile-${tile.id}`"
        :name="tile.name"
        :url="tile.url"
        :visible="tile.visible"
        :attribution="tile.attribution"
        layer-type="base"
      />

    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <BikeSPHeatmapLegend
      v-if="legendMin !== null && legendMax !== null"
      :min="legendMin"
      :max="legendMax"
    />
    <BikeLayer :mapkey="props.mapkey"/>
    <BaseLayers :mapkey="props.mapkey"/>
  </l-map>
  </div>
</template>

<script setup>
import L from 'leaflet';
import { onMounted, ref, watch, computed } from 'vue'
import {
  LMap,
  LTileLayer,
  LControlLayers
} from '@vue-leaflet/vue-leaflet';
import { useStore } from 'vuex';
import throttle from 'lodash/throttle';
import BikeSPHeatmapLegend from './BikeSPHeatmapLegend.vue';
import { HeatmapLayer } from './HeatmapLayer';
import { getHeatmapConfig } from './BikeSPHeatmapConfig';
import BikeLayer from './layers/BikeLayer.vue';
import BaseLayers from './layers/BaseLayers.vue';

const props = defineProps({
  mapkey: { type: String, required: true }
});

const store = useStore();
const center = ref(store.state.bikesp.mapCenter);
const zoom = ref(store.state.bikesp.zoomLevel);
const mapRef = ref(null);
const heatmapLayer = ref(null);
const legendMin = ref(0);
const legendMax = ref(1);
const properties = computed(() => store.state.map.maps[props.mapkey].properties);

const throttledUpdateData = throttle(() => {
  store.commit('bikesp/updateMapCenter', center.value);
  store.commit('bikesp/updateMaxDistance', getMaxVisibleDistance(center.value));
  store.commit('bikesp/updateZoomLevel', zoom.value);
  store.dispatch('bikesp/updateData');
}, 500, { trailing: true, leading: false });

const zoomUpdated = (newZoom) => {
  zoom.value = newZoom
  throttledUpdateData();
};

const onMapReady = (map) => {
  mapRef.value = map;
  addHeatLayer()
  throttledUpdateData();
};

const onMapMove = () => {
  heatmapLayer.value.redraw();
}

const centerUpdated = (newCenter) => {
  center.value = newCenter
  throttledUpdateData();
}

const getMaxVisibleDistance = (center) => {
  const bounds = mapRef.value.getBounds();
  const corner = bounds.getNorthEast();
  const centerCast = L.latLng(center.lat, center.lng);
  return centerCast.distanceTo(corner)*1.5; // Multiplying by 1.5 to smooth out movements in the map 
}

const updateMap = (data) => {
  if (mapRef.value && data) {
    heatmapLayer.value.setData(data, legendMax.value)
  }
}

const updateValueRange = (data) => {
  const maxValue = Math.max(...data.map(arr => arr[2]));
  const minValue = Math.min(...data.map(arr => arr[2]))-1;

  legendMin.value = Math.max(1, minValue);
  legendMax.value = Math.max(1, maxValue);
};

const addHeatLayer = () => {
  heatmapLayer.value = new HeatmapLayer([], {
    radius: 25,
    opacity: 0.7,
    maxIntensity: legendMax.value,
  });

  heatmapLayer.value.addTo(mapRef.value);
}

watch(() => store.state.bikesp.data, () => {
  // sorting is needed to ensure that the data is drawed in correct order, with higher values on top
  const data = structuredClone(store.state.bikesp.data)
  data.sort(function(a, b){
    return a[2] - b[2];
  });
  updateValueRange(data);
  updateMap(data);
}, { deep: true })

watch(() => store.state.bikesp.activeDataConfig.data_type, () => {
  heatmapLayer.value.setGradient(getHeatmapConfig(store.state.bikesp.activeDataConfig.data_type).gradient);
});


onMounted(() => {
    store.dispatch('bikesp/updateData');
});
</script>

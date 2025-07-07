<template>
  <div>
    <l-map
    :ref="mapkey"
    :zoom="zoom"
    :center="center"
    :inertia-deceleration="10000"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @ready="onMapReady"
    @move="onMapMove"
  >
    <l-control-layers position="topright" />
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <BikeSPHeatmapLegend
      v-if="legendMin !== null && legendMax !== null"
      :gradient="gradient"
      :min="legendMin"
      :max="legendMax"
    />
  </l-map>
  </div>
</template>

<script setup>
import 'leaflet.heat';
import L from 'leaflet';
import { ref, computed, watch, onMounted } from 'vue'
import {
  LMap,
  LTileLayer,
  LControlLayers,
} from '@vue-leaflet/vue-leaflet';
import { useStore } from 'vuex';
import throttle from 'lodash/throttle';
import BikeSPHeatmapLegend from './BikeSPHeatmapLegend.vue';

const store = useStore();
const zoom = ref(store.state.bikesp.zoom_level)
const center = computed(() => store.state.bikesp.map_center);
const mapRef = ref(null)
const heatmapLayer = ref(null)
const legendMin = ref(0);
const legendMax = ref(1);

const gradient = {
  0.0: '#2c7bb6',  // dark blue
  0.2: '#00a6ca',  // strong cyan
  0.4: '#00ccbc',  // aqua
  0.6: '#90eb9d',  // light green
  0.75: '#ffff8c', // yellow
  0.9: '#f9d057',  // warm orange
  1.0: '#d7191c'   // red
};

const throttledUpdateData = throttle(() => {
    store.dispatch('bikesp/updateData');
}, 1000);

const zoomUpdated = (newZoom) => {
    store.commit('bikesp/updateZoomLevel', newZoom);
    store.commit('bikesp/updateMaxDistance', getMaxVisibleDistance(center.value));
    throttledUpdateData();
};

const onMapReady = (map) => {
    mapRef.value = map;
    addHeatLayer();
};

const centerUpdated = (newCenter) => {
    store.commit('bikesp/updateMapCenter', newCenter);
    store.commit('bikesp/updateMaxDistance', getMaxVisibleDistance(newCenter));
    throttledUpdateData();
}

const getMaxVisibleDistance = (center) => {
  const bounds = mapRef.value.getBounds();
  const corner = bounds.getNorthEast();
  const centerCast = L.latLng(center.lat, center.lng);
  return centerCast.distanceTo(corner)*1.5; // Multiplying by 1.5 to smooth out movements in the map 
}

const onMapMove = () => {
  if (!mapRef.value) return;

  const currentCenter = mapRef.value.getCenter();
  store.commit('bikesp/updateMapCenter', {
    lat: currentCenter.lat,
    lng: currentCenter.lng
  });

  store.commit('bikesp/updateMaxDistance', getMaxVisibleDistance(currentCenter));

  removeHeatLayer();
  addHeatLayer();
  updateMap(store.state.bikesp.data);
};

const updateMap = (data) => {
    if (mapRef.value && data) {
        heatmapLayer.value.setLatLngs(data)
        heatmapLayer.value.setOptions({
            minOpacity: 0.7,
            radius: 25,
            max: legendMax.value,
            gradient: gradient,
        });
    }
}

const updateValueRange = (data) => {
  const maxValue = Math.max(...data.map(arr => arr[2]));
  const minValue = Math.min(...data.map(arr => arr[2]))-1;

  legendMin.value = Math.max(0, minValue);
  legendMax.value = Math.max(1, maxValue);
};

const addHeatLayer = () => {
    if (!heatmapLayer.value) {
        heatmapLayer.value = L.heatLayer([], {}).addTo(mapRef.value);
    }
}

const removeHeatLayer = () => {
  if (heatmapLayer.value) {
    mapRef.value.removeLayer(heatmapLayer.value);
    heatmapLayer.value = null;
  }
}

watch(() => store.state.bikesp.data, () => {
  updateValueRange(store.state.bikesp.data);
  updateMap(store.state.bikesp.data);
}, { deep: true })

onMounted(() => {
  store.commit('bikesp/updateZoomLevel', zoom.value);
  store.commit('bikesp/updateMapCenter', center.value);
  store.commit('bikesp/updateMaxDistance', getMaxVisibleDistance(center.value));
  store.dispatch('bikesp/updateData');
});
</script>

<template>
  <div>
    <l-map
    :ref="mapkey"
    :zoom="8"
    :center="center"
    :inertia-deceleration="10000"
    
    @ready="onMapReady"
    @moveend="onMoveEnd"
  >
    <l-control-layers position="topright" />
    <l-tile-layer
        v-for="tile in properties.tile_layers"
        :key="`tile-${tile.id}`"
        :name="$t(tile.name)"
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
      :min="legendMin" :max="legendMax"
    />
    <BikeLayer :mapkey="props.mapkey"/>
    <BaseLayers :mapkey="props.mapkey"/>
  </l-map>
  </div>
</template>

<script setup>
import L from 'leaflet';
import { ref, shallowRef, watch, computed, markRaw, onBeforeUnmount } from 'vue'
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

const nativeGeoJsonGroup = shallowRef(markRaw(L.layerGroup()));
const nativeFlowsGroup = shallowRef(markRaw(L.layerGroup()));

const props = defineProps({
  mapkey: { type: String, required: true }
});

const store = useStore();
const center = ref(store.state.bikesp.mapCenter);
const zoom = ref(store.state.bikesp.zoomLevel);
const mapRef = shallowRef(null);
const heatmapLayer = shallowRef(null);
const legendMin = ref(0);
const legendMax = ref(1);
const properties = computed(() => store.state.map.maps[props.mapkey].properties);


const fetchNewData = () => {
  if (!mapRef.value) return;
  
  const currentCenter = mapRef.value.getCenter();
  const currentZoom = mapRef.value.getZoom();
  
  store.commit('bikesp/updateMapCenter', { lat: currentCenter.lat, lng: currentCenter.lng });
  store.commit('bikesp/updateMaxDistance', getMaxVisibleDistance(currentCenter));
  store.commit('bikesp/updateZoomLevel', currentZoom);
  store.dispatch('bikesp/updateData');
};

const throttledUpdateData = throttle(() => {
  store.commit('bikesp/updateMapCenter', center.value);
  store.commit('bikesp/updateMaxDistance', getMaxVisibleDistance(center.value));
  store.commit('bikesp/updateZoomLevel', zoom.value);
  store.dispatch('bikesp/updateData');
}, 500, { trailing: true, leading: false });

const onMapReady = (map) => {
  mapRef.value = markRaw(map);

  nativeGeoJsonGroup.value.addTo(mapRef.value);
  nativeFlowsGroup.value.addTo(mapRef.value);
  
  renderGeoJsonLayers();
  renderFlows();

  addHeatLayer();
  setTimeout(() => {
    throttledUpdateData();
  }, 100);
};

const onMoveEnd = () => {
  fetchNewData();
};

const getMaxVisibleDistance = (center) => {
  if (!mapRef.value) return 20000;
  try {
    const bounds = mapRef.value.getBounds();
    const corner = bounds.getNorthEast();
    const centerCast = L.latLng(center.lat, center.lng);
    return centerCast.distanceTo(corner) * 1.5;
  } catch (e) {
    return 20000;
  }
}

const updateMap = (data) => {
  if (mapRef.value && data && heatmapLayer.value) {
    const pureData = data.map(pt => [Number(pt[0]), Number(pt[1]), Number(pt[2])]);
    heatmapLayer.value.setData(pureData, legendMax.value);
  }
}

const updateValueRange = (data) => {
  if (!data || data.length === 0) return;

  let maxValue = -Infinity;
  let minValue = Infinity;

  for (let i = 0; i < data.length; i++) {
    const val = Number(data[i][2]);
    if (val > maxValue) maxValue = val;
    if (val < minValue) minValue = val;
  }

  minValue = minValue - 1;

  legendMin.value = Math.max(1, minValue - 1);
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

const renderGeoJsonLayers = () => {
  if (!mapRef.value) return;
  nativeGeoJsonGroup.value.clearLayers();

  const layers = store.getters.layers || [];
  const activeLayers = store.getters.activeLayers || {};

  layers.forEach((layer) => {
    if (activeLayers[layer.key]?.[props.mapkey] && layer.geometry) {
      const geoLayer = L.geoJSON(layer.geometry, {
        style: layer.style,
        renderer: L.canvas()
      });
      nativeGeoJsonGroup.value.addLayer(geoLayer);
    }
  });
};

const renderFlows = () => {
  if (!mapRef.value) return;
  nativeFlowsGroup.value.clearLayers();

  const flows = store.getters.flows || [];
  const activeFlows = store.getters.activeFlows || {};

  flows.forEach((flow) => {
    if (activeFlows[flow.key]?.[props.mapkey] && flow.coordinates) {
      const flowLine = L.polyline(flow.coordinates, {
        color: flow.color || '#ff3388',
        weight: flow.weight || 2,
        opacity: flow.opacity || 0.7,
        smoothFactor: 1,
        renderer: L.canvas()
      });

      if (flow.popupContent) {
        flowLine.bindPopup(flow.popupContent);
      }

      nativeFlowsGroup.value.addLayer(flowLine);
    }
  });
};

onBeforeUnmount(() => {
  if (mapRef.value) {
    nativeGeoJsonGroup.value.clearLayers();
    nativeFlowsGroup.value.clearLayers();
  }
});



watch(() => store.getters.activeLayers, renderGeoJsonLayers, { deep: true });
watch(() => store.getters.activeFlows, renderFlows, { deep: true });

watch(() => store.state.bikesp.data, (newData) => {
  if (!newData || newData.length === 0) {
    if (heatmapLayer.value) {
      heatmapLayer.value.setData([], 1);
    }
    return;
  }
  
  updateValueRange(newData);
  updateMap(newData);
});

watch(() => store.state.bikesp.activeDataConfig.data_type, () => {
  try {
    heatmapLayer.value.setGradient(getHeatmapConfig(store.state.bikesp.activeDataConfig.data_type).gradient);
  } catch (e) {}
});
</script>

<template>
  <div id="map">
    <l-map
      :ref="mapkey"
      :zoom="zoom"
      :center="center"
      :inertia-deceleration="10000"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @ready="onMapReady"
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

      <template v-if="renderZones">
        <l-geo-json
          :geojson="zones.geometry"
          :options-style="zones.style"
          :visible="showZones"
          :options="zonesOptions()"
        />
      </template>

      <template v-if="renderGrid && grid.geometry">
        <l-geo-json
          :geojson="grid.geometry"
          :options-style="grid.style"
          :visible="showGrid"
          :options="gridOptions()"
        />
      </template>

      <template v-for="layer in layers" :key="`layers-${layer.key}`">
        <l-geo-json
          v-if="activeLayers[layer.key][mapkey]"
          :geojson="layer.geometry"
          :options-style="layer.style"
          :options="layer.options"
        />
      </template>

      <template v-for="bikelaneLayer in bikelaneLayers" :key="`bikelaneLayers-${bikelaneLayer.key}`">
        <template v-for="layer in bikelaneLayer.data" :key="`bikelaneLayers-${bikelaneLayer.key}-${layer.year}`">
          <l-geo-json
            v-if="activeLayers[bikelaneLayer.key][mapkey] && layer.year >= bikelaneRange[0] && layer.year <= bikelaneRange[1]"
            :geojson="layer.geometry"
            :options-style="bikelaneLayer.style"
            :options="bikelaneLayer.options"
          />
        </template>
      </template>

      <template v-for="(layer, index) in uploadedLayers" :key="`custom-layers-${index}`">
        <template v-if="layer.isActive[mapkey]">
          <l-geo-json
            :geojson="layer.geometry"
            :options="markerOptions(layer.style)"
            :options-style="layer.style"
          />
        </template>
      </template>

      <l-feature-group v-for="tier in Object.keys(arrowTiers)" :key="tier">
        <l-polyline
          v-for="(arrow, index) in flows[tier]"
          :key="`${tier}-${index}`"
          :lat-lngs="arrow.coords"
          :color="'blue'"
          :weight="0.4 * arrow.weight"
          @ready=initDecorator
        >
          <l-tooltip :options="{ sticky: true }">
            {{ arrow.total_trips }} {{ $t('trips') }}
            <br>
            <span v-if="developer_mode">
              {{ arrow.origin }} -> {{ arrow.destination }}
              <br>
              ids: {{ arrow.trips_ids }}
            </span>
          </l-tooltip>
        </l-polyline>
      </l-feature-group>
    </l-map>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import L from 'leaflet';
import 'leaflet-polylinedecorator';
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LPolyline,
  LFeatureGroup,
  LTooltip,
  LControlLayers,
} from '@vue-leaflet/vue-leaflet';

const props = defineProps({
  mapkey: { type: String, required: true }
});

const store = useStore();
const zoom = ref(12);
const center = ref({ lat: -23.550164466, lng: -46.633664132 });
const renderZones = ref(false);
const renderGrid = ref(false);

const developer_mode = computed(() => store.getters.developer_mode);
const sharedControls = computed(() => store.getters.sharedControls);
const centerMain = computed(() => store.getters.centerMain);
const centerSecond = computed(() => store.getters.centerSecond);
const zoomMain = computed(() => store.getters.zoomMain);
const zoomSecond = computed(() => store.getters.zoomSecond);
const mapControl = computed(() => store.getters.mapControl);
const layers = computed(() => store.getters.layers);
const activeLayers = computed(() => store.getters.activeLayers);
const bikelaneLayers = computed(() => store.getters.bikelaneLayers);
const uploadedLayers = computed(() => store.getters['user_shapefiles/uploadedLayers']);
const activeLayersKeys = computed(() => store.state.layers[props.mapkey].activeLayersKeys);
const grid = computed(() => store.state.layers[props.mapkey].grid);
const bikelaneRange = computed(() => store.state.layers[props.mapkey].bikelaneRange);
const properties = computed(() => store.state.map.maps[props.mapkey].properties);
const layersPolylines = computed(() => store.state.map.maps[props.mapkey].show.layers.polyline);
const layersDecorators = computed(() => store.state.map.maps[props.mapkey].show.layers.decorators);
const arrowTiers = computed(() => store.state.map.maps[props.mapkey].show.flows.polyline);
const flows = computed(() => store.state.flows.flows[props.mapkey]);
const zones = computed(() => store.state.layers.zones);
const showZones = computed(() => store.state.map.maps[props.mapkey].show.zones);
const showGrid = computed(() => store.state.map.maps[props.mapkey].show.grid);
const secondMapIsActive = computed(() => store.state.map.secondMapIsActive);
const mapRef = ref(null);

watch(centerMain, (newValue) => {
  if (props.mapkey === 'main' && newValue.lat !== centerSecond.value.lat && newValue.lng !== centerSecond.value.lng) {
    center.value = newValue;
  }
});

watch(centerSecond, (newValue) => {
  if (props.mapkey === 'second' && newValue.lat !== centerMain.value.lat && newValue.lng !== centerMain.value.lng) {
    center.value = newValue;
  }
});

watch(zoomMain, (newValue) => {
  if (props.mapkey === 'main') zoom.value = newValue;
});

watch(zoomSecond, (newValue) => {
  if (props.mapkey === 'second') zoom.value = newValue;
});

watch(secondMapIsActive, (newValue) => {
  if (props.mapkey === 'main') {
    const mapElement = document.querySelector(`#${props.mapkey}`);
    if (mapElement && mapElement._mapObject) {
      mapElement._mapObject.invalidateSize();
    }
  }
});

watch(mapControl, (newValue, oldValue) => {
  if (oldValue === 'both' && props.mapkey === 'second') {
    loadBaseLayers();
  }
});

const initDecorator = (polyline) => {
  const latLngs = polyline.getLatLngs();
  const lastSegment = latLngs[latLngs.length - 1];
  const arrowHead = L.polylineDecorator(lastSegment, {
    patterns: [
      {
        offset: '100%',
        repeat: 0,
        symbol: L.Symbol.arrowHead({
          pixelSize: 10,
          polygon: false,
          pathOptions: {
            stroke: true,
            color: 'blue',
            weight: polyline.options.weight,
          },
        })
      }
    ]
  }).addTo(mapRef.value);

  polyline.on('remove', () => {
    if (mapRef.value.hasLayer(arrowHead)) {
      mapRef.value.removeLayer(arrowHead);
    }
  });
};

const onMapReady = (map) => {
  mapRef.value = map;
};

const zoomUpdated = (newZoom) => {
  if (mapControl.value === 'same') {
    store.dispatch('updateZoom', { mapkey: props.mapkey, zoom: newZoom });
  }
};

const centerUpdated = (newCenter) => {
  if (mapControl.value === 'same') {
    store.dispatch('updateCenter', { mapkey: props.mapkey, center: newCenter });
  }
};

const gridOptions = () => ({});
const zonesOptions = () => ({
  onEachFeature(feature, layer) {
    let tooltipMsg = '';
    tooltipMsg += `NumeroZona: ${feature.properties.NumeroZona}<br>`;
    tooltipMsg += `NomeZona: ${feature.properties.NomeZona}<br>`;
    tooltipMsg += `NomeMunici: ${feature.properties.NomeMunici}<br>`;
    layer.bindTooltip(tooltipMsg, { permanent: false, sticky: true });
  },
});

const markerOptions = (style) => ({
  pointToLayer(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: style.weight / 2,
      opacity: style.opacity,
      fillOpacity: style.opacity,
      fillColor: style.color,
      color: style.color,
    });
  },
  onEachFeature(feature, layer) {
    const properties = Object.entries(feature.properties)
      .map(([key, value]) => `${key}: ${value}`)
      .join('<br>');
    layer.bindTooltip(properties, { permanent: false, sticky: true });
  },
});

onMounted(async () => {
  if (props.mapkey === 'second') {
    await store.dispatch('updateCenter', { mapkey: 'second', center: centerMain.value });
  }
  await loadBaseLayers();
  await store.dispatch('user_shapefiles/loadSavedLayers');
});

const loadBaseLayers = async () => {
  store.dispatch('loading/setLoading');
  await store.dispatch('fetchGrid', props.mapkey);
  renderGrid.value = true;
  await store.dispatch('filterData', props.mapkey);
  store.dispatch('loading/unsetLoading');
  
  await store.dispatch('fetchZones', store.state.http);
  renderZones.value = true;
};

</script>

<style scoped>
#map {
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
}
</style>
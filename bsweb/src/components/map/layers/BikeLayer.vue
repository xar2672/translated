<template>
    <template v-for="bikelaneLayer in bikelaneLayers" :key="`bikelaneLayers-${bikelaneLayer.key}`">
        <template v-for="layer in bikelaneLayer.data" :key="`bikelaneLayers-${bikelaneLayer.key}-${layer.year}`">
            <l-geo-json
              v-if="bikespActiveLayers[bikelaneLayer.key][props.mapkey] && layer.year >= bikelaneRange[0] && layer.year <= bikelaneRange[1]"
              :geojson="layer.geometry"
              :options-style="bikelaneLayer.style"
              :options="bikelaneLayer.options"
            />
        </template>
    </template>
</template>

<script setup>
import { LGeoJson } from '@vue-leaflet/vue-leaflet';
import { useStore } from 'vuex';
import { computed } from 'vue';

const props = defineProps({
  mapkey: { type: String, required: true }
});

const store = useStore();

const bikespActiveLayers = computed(() => store.getters.activeLayers);
const bikelaneLayers = computed(() => store.getters.bikelaneLayers);
const bikelaneRange = computed(() => store.state.layers[props.mapkey].bikelaneRange);
</script>
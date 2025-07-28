<template>
    <template v-for="layer in layers" :key="`layers-${layer.key}`">
        <l-geo-json
          v-if="activeLayers[layer.key][mapkey]"
          :geojson="layer.geometry"
          :options-style="layer.style"
          :options="layer.options"
        />
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

const activeLayers = computed(() => store.getters.activeLayers);
const layers = computed(() => store.getters.layers);
</script>
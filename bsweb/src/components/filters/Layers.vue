<template>
  <div>
    <LayerCategory
      v-for="category in allBikelineLayers"
      :key="category.id"
      :category="category"
      :mapkey="mapkey"
    />
    <LayerCategory
      v-for="category in allLayers"
      :key="category.id"
      :category="category"
      :mapkey="mapkey"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import LayerCategory from './LayerCategory.vue';

const props = defineProps({
  mapkey: { type: String, required: true },
});

const store = useStore();

const allLayers = computed(() => store.getters.allLayers);
const allBikelineLayers = computed(() => store.getters.allBikelineLayers);
</script>

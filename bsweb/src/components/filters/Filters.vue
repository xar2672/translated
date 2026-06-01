<template>
  <div>
    <FilterCategory
      v-for="category in computedAllFilters" :key="category.id" :category="category" :mapkey="mapkey"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import FilterCategory from './FilterCategory.vue';

const store = useStore();

const props = defineProps({
  mapkey: { type: String, required: true },
});

const computedAllFilters = computed(() => {
  return store.getters.allFilters;
});
</script>

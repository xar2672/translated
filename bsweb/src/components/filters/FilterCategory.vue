<template>
  <div class="category-wrapper">
    <div class="category-toggle" @click="toggleCategory">
      <img :src="iconArrow" :class="['arrow', { active: isActive }]">
      <h3 class="category-name">
        {{ $t(`BIKESCIENCEWEB.tabs.filters.forms.aggregation.category.${category.category_name}`) }}
      </h3>
    </div>
    <div v-show="isActive" class="category-options">
      <div v-for="filter in category.filters" :key="filter.id">
        <FilterController :filter="filter" :mapkey="mapkey"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import FilterController from './FilterController.vue';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';

const store = useStore();

const props = defineProps({
  category: { type: Object, required: true },
  mapkey: { type: String, required: true },
});

const isActive = ref(false);
const allFilters = computed(() => store.getters.allFilters);

const toggleCategory = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped>
.category-name {
  font-size: .9rem;
  font-weight: bold;
}
.category-wrapper {
  margin-bottom: 10px;
}
.category-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.category-options {
  margin-left: 8px;
}
.arrow {
  transition: all ease-in-out 0.2s;
  transform: rotate(-90deg);
  width: 12px;
  margin-right: 4px;
}
.arrow.active {
  transform: rotate(0deg);
}
</style>
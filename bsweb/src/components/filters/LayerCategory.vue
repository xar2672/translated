<template>
  <div class="category-wrapper">
    <div class="category-toggle" @click="toggleCategory">
      <img :src="iconArrow" :class="['arrow', { active: isActive }]">
      <h3 class="category-name">
        {{ $t('category.category_name') }}
      </h3>
    </div>
    <div v-show="isActive" class="category-options">
      <div v-for="filter in category.filters" :key="filter.id">
        <LayerController
          :filter="filter"
          :type="'layer'"
          :mapkey="mapkey"
        />
      </div>
      <div v-if="category.category_name == 'layers_bikelanes'">
        <BikelaneSlider :mapkey="mapkey" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';
import LayerController from './LayerController.vue';
import BikelaneSlider from './bikelanes/BikelaneSlider.vue';

const props = defineProps({
  category: { type: Object, required: true },
  mapkey: { type: String, required: true },
});

const store = useStore();
const isActive = ref(false);
const checkboxes = ref([]);

const allFilters = computed(() => store.getters.allFilters);

const toggleCategory = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped>
.category-name {
  font-size: 12px;
  font-weight: bold;
}
.category-wrapper{
  margin-bottom: 10px;
}
.category-toggle {
  cursor: pointer;
  display: flex;
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
  transform: none
}
</style>
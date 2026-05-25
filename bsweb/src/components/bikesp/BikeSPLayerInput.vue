<template>
  <div>
    <div class="category-toggle" @click="toggleCategory">
      <img :src="iconArrow" :class="['arrow', { active: isVisible }]">
      <label>{{$t('bikesp.layers')}}</label>
    </div>
    <div v-show="isVisible" class="filter-container">
      <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" :placeholder="$t('bikesp.selectMapLayer')" label="name" track-by="name" :preselect-first="false"
        :taggable="true" deselectLabel="" selectLabel="" :selectedLabel="$t('bikesp.selected')">
      </multiselect>
      <div class="active-fields">
        <div v-for="category in value" :key="category.category_name" class="filter-wrapper">
          <div class="filter-box">
            <button class="remove-btn-top" @click="removeLayerCategory(category)" :title="$t('bikesp.removeCategory')">×</button>
            <LayerSelector :category="category.value"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Multiselect from 'vue-multiselect';
import LayerSelector from './layers/LayerSelector.vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';

const { t } = useI18n()

const store = useStore();

const value = ref([])
const isVisible = ref(false);

const removeLayerCategory = (category) => {
  value.value = value.value.filter(f => f !== category)
}

const allCombinedLayers = computed(() => {
  const allLayers = store.getters.allLayers;
  const allBikelineLayers = store.getters.allBikelineLayers;
  return [...allLayers, ...allBikelineLayers];
});

const options = allCombinedLayers.value.map(
  (category) => { return {name: t(category.category_name), value: category} }
)

const toggleCategory = () => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <label for="filter-select">t$(bikesp.layers)</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" placeholder=$t(bikesp.chooseLayer) label="label" track-by="name" :preselect-first="false"
        :taggable="true" deselectLabel="" selectLabel="" selectedLabel=$t(bikesp.selected)>
    </multiselect>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import Multiselect from 'vue-multiselect';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = useStore();

const props = defineProps({
  category: { type: Object, required: true }
});

const value = ref([])

const options = props.category.filters.map(
  (filter) => { return {name: filter.filter_key, value: false, label: t(filter.filter_key)} }
)

watch(value, (newValue) => {
  const selectedNames = new Set(newValue.map(item => item.name));
  const updatedLayers = options.map(option => ({
    name: option.name,
    value: selectedNames.has(option.name)
  }));
  store.commit('bikesp/updateActiveLayers', updatedLayers)
}, {deep: true})

onBeforeUnmount(() => {
  store.commit('bikesp/updateActiveLayers', options);
});
</script>

<template>
  <label for="filter-select">{{$t('COMMONS.layers')}}</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :custom-label="translateLabels"
        :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" :placeholder="$t('BIKESP.layers.chooseMapLayer')" label="name" track-by="key" :preselect-first="false"
        :taggable="true" deselectLabel="" selectLabel="" :selectedLabel="$t('BIKESP.selected')">
    </multiselect>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import Multiselect from 'vue-multiselect';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useStore();

const props = defineProps({
  category: { type: Object, required: true }
});

const value = ref([]);

const translateLabels = (option) => t(`COMMONS.layers_filter.${option.key}`);
const options = props.category.filters.map(
  (filter) => { return {key: filter.filter_key, name: translateLabels(filter.filter_key), value: false} }
);

watch(value, (newValue) => {
  const selectedNames = new Set(newValue.map(item => item.key));
  const updatedLayers = options.map(option => ({
    key: option.key,
    value: selectedNames.has(option.key)
  }));
  store.commit('bikesp/updateActiveLayers', updatedLayers)
}, {deep: true});

onBeforeUnmount(() => {
  store.commit('bikesp/updateActiveLayers', options);
});
</script>

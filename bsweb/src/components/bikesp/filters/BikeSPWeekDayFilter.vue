<template>
  <label for="race-select">{{$t('bikesp.aggregation.DAY_OF_WEEK')}}:</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" :placeholder="$t('bikesp.chooseDateofWeek')" label="name" track-by="name" :preselect-first="false"
        :taggable="true" deselectLabel="" selectLabel="" :selectedLabel="$t('bikesp.selected')">
    </multiselect>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import Multiselect from 'vue-multiselect';
import { getValueList } from './commons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useStore();

const value = ref([])

const options = computed(() => [
  { name: t('sun'), value: 0 },
  { name: t('mon'), value: 1 },
  { name: t('tue'), value: 2 },
  { name: t('wed'), value: 3 },
  { name: t('thu'), value: 4 },
  { name: t('fri'), value: 5 },
  { name: t('sat'), value: 6 }
]);

watch(value, ()=> store.commit('bikesp/updateFilters', { week_days: getValueList(value) }), {deep: true})

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { week_days: undefined });
});
</script>

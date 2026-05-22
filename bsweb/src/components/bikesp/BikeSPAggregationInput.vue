<template>
  <div class="aggregation-selector">
    <label for="aggregation-select">$t(bikesp.changeAggregation):</label>
    <select
      id="aggregation-select"
      v-model="selected"
      @change="onChange"
    >
      <option value="GENDER">{{ getTranslatedLabel('GENDER') }}</option>
      <option value="RACE">{{ getTranslatedLabel('RACE') }}</option>
      <option value="WEEK">{{ getTranslatedLabel('WEEK') }}</option>
      <option value="HOUR">{{ getTranslatedLabel('HOUR') }}</option>
      <option value="DAY_OF_WEEK">{{ getTranslatedLabel('DAY_OF_WEEK') }}</option>
      <option value="PAYOUT_LEVEL">{{ getTranslatedLabel('PAYOUT_LEVEL') }}</option>
      <option value="REMUNERATION">{{ getTranslatedLabel('REMUNERATION') }}</option>
    </select>
    <p class="helper-text">
      $t(bikesp.aggregation_helper)
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = useStore();

const selected = ref('HOUR');

const onChange = (e) => {
  store.commit('bikesp/updateAggregation', selected.value);
};

const getTranslatedLabel = (value) => {
  return t(`bikesp.aggregation.${value}`)
} 

onMounted(() => {
  store.commit('bikesp/updateAggregation', selected.value);
  store.dispatch('bikesp/updateData');
});

onBeforeUnmount(() => {
  store.commit('bikesp/updateAggregation', undefined);
});
</script>

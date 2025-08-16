<template>
    <div class="chart-wrapper">
        <VueUiXy
            :config="computedConfig"
            :dataset="dataset"
        />
    </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { VueUiXy } from "vue-data-ui";
import "vue-data-ui/style.css";
import { useStore } from 'vuex';
import { config, aggregationConfig, dataTypeConfig } from './BikeSPChartConfig';
import merge from 'lodash/merge';
import { useI18n } from 'vue-i18n'
import { getDataset } from "./BikeSPChartDataset";

const { t } = useI18n()

const store = useStore()

const buildTitle = () => {
    return t('bikesp.chartTitle', {
        dataType: t(`bikesp.dataType.${store.state.bikesp.activeDataConfig.data_type}`),
        aggregation: t(`bikesp.aggregation.${store.state.bikesp.activeDataConfig.aggregation}`),
    });
}

const computedConfig = computed(() => {
    let newConfig = structuredClone(config);
    newConfig.chart.grid.labels.xAxisLabels.values = store.getters['bikesp/getBikespLabels'];
    newConfig.chart.title.text = buildTitle();
    newConfig = merge(newConfig, aggregationConfig[store.state.bikesp.activeDataConfig.aggregation]);
    newConfig = merge(newConfig, dataTypeConfig[store.state.bikesp.activeDataConfig.data_type])
    return newConfig;
});

const dataset = computed(() => getDataset(store.state.bikesp));

onMounted(() => {
    store.dispatch('bikesp/updateData');
});
</script>

<style scoped>
.chart-wrapper {
  height: 700px;
}
</style>
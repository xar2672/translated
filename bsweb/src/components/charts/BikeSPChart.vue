<template>
    <div class="chart-wrapper">
        <VueUiXy
            :config="computedConfig"
            :dataset="dataset"
        />
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { VueUiXy } from "vue-data-ui";
import "vue-data-ui/style.css";
import { useStore } from 'vuex';
import { config, aggregationConfig } from './BikeSPChartConfig';
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
    const newConfig = structuredClone(config);
    newConfig.chart.grid.labels.xAxisLabels.values = store.getters['bikesp/getBikespLabels'];
    newConfig.chart.title.text = buildTitle();
    const chartConfig = aggregationConfig[store.state.bikesp.activeDataConfig.aggregation];
    return merge(newConfig, chartConfig);
});

const dataset = computed(() => getDataset(store.state.bikesp));
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  justify-content: center;
}
</style>
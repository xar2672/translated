<template>
  <div v-show="mapkey === 'main' || (secondMapIsActive && !hideSecondMapFlowsControl)">
    <div>
      <span v-if="secondMapIsActive" class="label">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayer') }} ({{ $t(`BIKESCIENCEWEB.tabs.filters.baseLayerMap.${mapkey}`) }}):</span>
      <span v-else class="label">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayer') }}:</span>
      <b-radio
        v-model="od" :name="mapkey" native-value="grid" type="is-info"
      >
        <span class="view-option">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.grid') }}</span>
      </b-radio>
      <b-radio
        v-model="od" :name="mapkey" native-value="zones" type="is-info"
      >
        <span class="view-option">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.zones') }}</span>
      </b-radio>
    </div>
    <div v-if="od === 'grid'">
      <div v-if="!gridEditMode">
        <Button
          :text="$t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.gridEditMode')" :title="$t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.onHover.gridEditMode')"
          :handle-click="() => setGridEditModeOn(mapkey)"
        />
      </div>
      <div v-if="gridEditMode">
        <GridForm :mapkey="mapkey" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import GridForm from '@/components/filters/forms/GridForm.vue';
import Button from '@/components/buttons/Button.vue';

const props = defineProps({
  mapkey: { type: String, required: true },
});

const store = useStore();
const od = ref('grid');

const secondMapIsActive = computed(() => store.getters.secondMapIsActive);
const hideSecondMapFlowsControl = computed(() => store.getters['flows/hideSecondMapFlowsControl']);
const gridEditMode = computed(() => store.state.filters[props.mapkey].gridEditMode);

watch(od, (value) => {
  store.dispatch('updateOD', { value, mapkey: props.mapkey });
  store.dispatch('resetMapResource', {
    mapkey: props.mapkey,
    category: 'flows',
    type: 'polyline',
  });
  store.dispatch('flows/resetFlows', props.mapkey);
  
  if (value === 'zones') {
    store.commit('showZones', props.mapkey);
    store.commit('hideZones', props.mapkey);
  } else if (value === 'grid') {
    store.commit('showGrid', props.mapkey);
    store.commit('hideGrid', props.mapkey);
  }
  
  store.dispatch('filterData', props.mapkey);
});

const setGridEditModeOn = (mapkey) => {
  store.dispatch('setGridEditModeOn', mapkey);
};
</script>

<style scoped>
.label {
  font-size: .85rem;
}
.view-option {
  font-size: .85rem;
}
</style>

<template>
  <div class="wrapper">
    <div v-if="secondMapIsActive" class="map-title">
      {{ $t('BIKESCIENCEWEB.twoMaps.leftMap') }}
    </div>
    <Layers mapkey="main" />
    <UserLayers mapkey="main" />
    <div v-show="secondMapIsActive && !hideSecondMapControl">
      <hr>
      <div class="map-title">
        {{ $t('BIKESCIENCEWEB.twoMaps.rightMap') }}
      </div>
      <Layers mapkey="second" />
      <UserLayers mapkey="second" />
    </div>
    <div v-if="secondMapIsActive" class="options">
      <b-checkbox
        v-model="mirrorControl"
        type="is-info"
        size="is-small"
      >
        <span>{{ $t('BIKESCIENCEWEB.twoMaps.mirroredChanges') }}</span>
      </b-checkbox>
      <b-checkbox
        v-model="hideSecondMapControl"
        type="is-info"
        size="is-small"
      >
        <span>{{ $t('BIKESCIENCEWEB.twoMaps.hideRightControls') }}</span>
      </b-checkbox>
    </div>
    <CopyLayers />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Layers from '../filters/Layers.vue';
import UserLayers from '@/components/user-layers/UserLayers.vue';
import CopyLayers from '@/components/buttons/copy-settings/CopyLayers.vue';

const store = useStore();

const secondMapIsActive = computed(() => store.getters.secondMapIsActive);

const mirrorControl = computed({
  get() {
    return store.state.layers.mirrorControl;
  },
  set(value) {
    store.dispatch('toggleMirrorLayerControl');
  }
});

const hideSecondMapControl = computed({
  get() {
    return store.state.layers.hideSecondMapControl;
  },
  set(value) {
    store.dispatch('setHideSecondMapLayerControl', value);
  }
});
</script>

<style scoped>
.map-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.options {
  margin: 20px;
}
.options span {
  font-size: .9rem;
}
</style>
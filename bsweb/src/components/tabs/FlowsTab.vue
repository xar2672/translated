<template>
  <div class="wrapper">
    <div v-if="secondMapIsActive" class="map-title">
      {{ $t('BIKESCIENCEWEB.twoMaps.leftMap') }}
    </div>
    <Tiers v-show="!gridEditMode" mapkey="main" />
    <div v-show="secondMapIsActive && !hideSecondMapControl">
      <hr>
      <div class="map-title">
        {{ $t('BIKESCIENCEWEB.twoMaps.rightMap') }}
      </div>
      <Tiers v-show="!gridEditMode" mapkey="second" />
    </div>
    <div v-if="secondMapIsActive" class="options">
      <b-checkbox
        v-model="mirrorControl"
        :native-value="mirrorControl"
        type="is-info"
        size="is-small"
      >
        <span>{{ $t('BIKESCIENCEWEB.twoMaps.mirroredChanges') }}</span>
      </b-checkbox>
      <b-checkbox
        v-model="hideSecondMapControl"
        :native-value="hideSecondMapControl"
        type="is-info"
        size="is-small"
      >
        <span>{{ $t('BIKESCIENCEWEB.twoMaps.hideRightControls') }}</span>
      </b-checkbox>
      <CopyFlows />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Tiers from '../filters/Tiers.vue';
import CopyFlows from '@/components/buttons/copy-settings/CopyFlows.vue';

export default {
  components: {
    Tiers,
    CopyFlows,
  },
  computed: {
    ...mapGetters(['gridEditMode', 'secondMapIsActive']),
    mirrorControl: {
      get() {
        return this.$store.state.flows.mirrorControl;
      },
      set(value) {
        this.toggleMirrorFlowsControl();
      },
    },
    hideSecondMapControl: {
      get() {
        return this.$store.state.flows.hideSecondMapControl;
      },
      set(value) {
        this.setHideSecondMapFlowsControl(value);
      },
    },
  },
  methods: {
    ...mapActions('flows', [
      'toggleMirrorFlowsControl',
      'setHideSecondMapFlowsControl',
    ]),
  },
};
</script>

<style scoped>
.map-title {
  font-size: 16px;
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
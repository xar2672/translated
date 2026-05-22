<template>
  <div v-if="secondMapIsActive" class="wrapper">
    <div class="content">
      <div class="field">
        <b-radio
          v-model="mapControl"
          native-value="independent"
          type="is-info"
          name="twomaps"
          size="is-small"
        >
          <span class="label">$t(twoMaps.independentControl)</span>
        </b-radio>
      </div>
      <div class="field">
        <b-radio
          v-model="mapControl"
          native-value="same"
          type="is-info"
          name="twomaps"
          size="is-small"
        >
          <span class="label">$t(twoMaps.sameControl)</span>
        </b-radio>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['secondMapIsActive']),
    mapControl: {
      get() {
        return this.$store.state.map.mapControl;
      },
      set(value) {
        this.changeMapControl(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'changeMapControl',
    ]),
  },
};
</script>

<style scoped>
  .wrapper {
    z-index: 2000;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .content {
    margin: 10px;
  }

  .label {
    font-size: 12px;
    font-weight: normal;
  }
</style>
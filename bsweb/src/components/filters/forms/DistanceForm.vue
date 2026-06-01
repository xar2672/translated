<template>
  <div>
    <b-field>
      {{ $t('distanceForm', {start: distanceRange[0], end: distanceRange[1]}) }}
    </b-field>
    <b-slider
      v-model="distanceRange"
      lazy
      :min="0" :max="51" :step="0.5" :custom-formatter="value => `${value} km`" type="is-info"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    fid: { type: Number, required: true },
    mapkey: { type: String, required: true },
  },
  data() {
    return {
      distanceRange: [0, 51],
    };
  },
  computed: {
    ageLabel() {
      return `${$t(ageField)} ${this.distanceRange[0]} - ${this.distanceRange[1]}`;
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          distanceRange: this.distanceRange,
        },
      };
    },
  },
  watch: {
    setFilterParams: function(filter) {
      this.updateFilterParams({ filter, mapkey: this.mapkey });
    },
  },
  methods: {
    ...mapActions([
      'updateFilterParams',
    ]),
  },
};
</script>
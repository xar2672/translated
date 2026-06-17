<template>
  <div>
    <b-field>
      {{ $t('BIKESCIENCEWEB.tabs.filters.forms.speed.form', {start: speedRange[0], end: speedRange[1]}, speedRange[1] - speedRange[0] + 1) }}
    </b-field>
    <b-slider
      v-model="speedRange"
      lazy
      :min="0"
      :max="25"
      :step="0.5"
      :custom-formatter="value => `${value} km/h`"
      type="is-info"
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
      speedRange: [0, 25],
    };
  },
  computed: {
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          speedRange: this.speedRange,
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
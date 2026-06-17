<template>
  <div>
    <b-field>
      {{ $t('BIKESCIENCEWEB.tabs.filters.forms.duration.field') }}
      ({{ $t('BIKESCIENCEWEB.tabs.filters.forms.duration.form', {start: durationRange[0], end: durationRange[1]}, durationRange[1] - durationRange[0] + (durationRange[0] > 1 ? 1 : 0)) }})
    </b-field>
    <b-slider
      v-model="durationRange"
      lazy
      :min="1"
      :max="180"
      :custom-formatter="value => $t('BIKESCIENCEWEB.tabs.filters.forms.duration.minutes', {value: value}, value)"
      type="is-info"
    >
    <b-slider-tick :value="1">
      1
    </b-slider-tick>
    <b-slider-tick :value="180">
      180
    </b-slider-tick>
    </b-slider>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    fid: { type: Number, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters(['selectors']),
    durationRange: {
      get() {
        return this.selectors[this.mapkey][this.fid].durationRange;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].durationRange = value;
      },
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          durationRange: this.durationRange,
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
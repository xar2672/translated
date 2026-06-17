<template>
  <div>
    <b-field>
      {{ $t('BIKESCIENCEWEB.tabs.filters.forms.age.field') }}
      ({{ $t('BIKESCIENCEWEB.tabs.filters.forms.age.form', {start: ageRange[0], end: ageRange[1]}, ageRange[1] - ageRange[0] + (ageRange[0] > 1 ? 1 : 0)) }})
    </b-field>
    <b-slider
      v-model="ageRange"
      lazy
      :min="1" :max="71" :step="1" type="is-info"
      :custom-formatter="(val) => `${val}`"
    >
      <b-slider-tick :value="1">
        1
      </b-slider-tick>
      <b-slider-tick :value="71">
        71
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
    ageRange: {
      get() {
        return this.selectors[this.mapkey][this.fid].ageRange;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].ageRange = value;
      },
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          ageRange: this.ageRange,
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
<template>
  <div>
    <b-field>
      {{ $t('ageField') }}
      ({{ $t('ageForm', {start: ageRange[0], end: ageRange[1]}) }})
    </b-field>
    <b-slider
      v-model="ageRange"
      lazy
      :min="1" :max="71" :step="1" type="is-info"
    />
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
    ageLabel() {
      return `${$t(ageField)} ${this.ageRange[0]} - ${this.ageRange[1]}`;
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
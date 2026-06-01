<template>
  <div>
    <b-field>
      {{ $t('durationField') }}
      ({{ $t('durationForm', {start: durationRange[0], end: durationRange[1]}) }})
    </b-field>
    <b-slider
      v-model="durationRange"
      lazy
      :min="1"
      :max="180"
      :custom-formatter="value => `${value} min`"
      type="is-info"
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
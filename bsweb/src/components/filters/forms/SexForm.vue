<template>
  <div>
    <div v-for="(sex, index) in sexes" :key="index">
      <input v-model="selectedSexes" type="checkbox" :value="index+1">
      <label>{{ $t(`BIKESCIENCEWEB.tabs.filters.forms.sex.${sex}`) }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    fid: { type: Number, required: true },
    filter: { type: Object, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters(['selectors']),
    sexes: {
      get() {
        return this.selectors[this.mapkey][this.fid].sexes;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].sexes = value;
      },
    },
    selectedSexes: {
      get() {
        return this.selectors[this.mapkey][this.fid].selectedSexes;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].selectedSexes = value;
      },
    },
    paramsCount() {
      return this.selectedSexes.length;
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          sexes: this.selectedSexes,
        },
      };
    },
  },
  watch: {
    paramsCount: function(count, prevCount) {
      if (count === 0) {
        this.removeActiveFilter({ filter: this.filter, mapkey: this.mapkey });
      } else {
        if (prevCount === 0) {
          this.addActiveFilter({ filter: this.filter, mapkey: this.mapkey });
        }
        this.updateFilterParams({ filter: this.setFilterParams, mapkey: this.mapkey });
      }
    },
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
      'removeActiveFilter',
      'updateFilterParams',
    ]),
  },
};
</script>

<style scoped>
  label {
    margin: 0 5px;
  }

  input {
    cursor: pointer;
  }
</style>
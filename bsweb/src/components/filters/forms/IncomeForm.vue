<template>
  <div>
    <b-radio
      v-model="mode"
      :name="`income-radio-${mapkey}`"
      native-value="brackets"
      type="is-info"
    >
      {{ $t('BIKESCIENCEWEB.tabs.filters.forms.income.brackets') }}
    </b-radio>
    <b-radio
      v-model="mode"
      :name="`income-radio-${mapkey}`"
      native-value="interval"
      type="is-info"
    >
      {{ $t('BIKESCIENCEWEB.tabs.filters.forms.income.intervals') }}
    </b-radio>
    <b-field v-if="mode == 'interval'">
      {{ $t('BIKESCIENCEWEB.tabs.filters.forms.income.field') }}<br>
      ({{ $t('BIKESCIENCEWEB.tabs.filters.forms.income.form', {start: formatNumber(incomeInterval[0]), end: formatNumber(incomeInterval[1])}, incomeInterval[1] - incomeInterval[0] + 1) }})
    </b-field>
    <b-slider
      v-if="mode == 'interval'"
      v-model="incomeInterval"
      lazy
      :min="0"
      :max="42916"
      :step="1000"
      :custom-formatter="val => `R$ ${formatNumber(val)}`"
      type="is-info"
    >
      <b-slider-tick :value="0">
        0
      </b-slider-tick>
      <b-slider-tick :value="42916">
        {{formatNumber(42916)}}
      </b-slider-tick>
    </b-slider>
    <div v-if="mode == 'brackets'">
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="1"
        >
        <label>1 {{ $t('COMMONS.income_base.max', {value: 1908}) }}</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="2"
        >
        <label>2 {{ $t('COMMONS.income_base.range', {min: 1908, max: 3816})}}</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="3"
        >
        <label>3 {{ $t('COMMONS.income_base.range', {min: 3816, max: 7632})}}</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="4"
        >
        <label>4 {{ $t('COMMONS.income_base.range', {min: 7632, max: 11448})}}</label>
      </div>
      <div>
        <input
          v-model="incomeBracket"
          type="checkbox"
          value="5"
        >
        <label>5 {{ $t('COMMONS.income_base.more_than', {value: 11448} )}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    fid: { type: Number, required: true },
    filter: { type: Object, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters(['selectors']),
    incomeBracket: {
      get() {
        return this.selectors[this.mapkey][this.fid].incomeBracket;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].incomeBracket = value;
      },
    },
    incomeInterval: {
      get() {
        return this.selectors[this.mapkey][this.fid].incomeInterval;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].incomeInterval = value;
      },
    },
    mode: {
      get() {
        return this.selectors[this.mapkey][this.fid].mode;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].mode = value;
      },
    },
    incomeBracketBounds: {
      get() {
        return this.selectors[this.mapkey][this.fid].incomeBracketBounds;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].incomeBracketBounds = value;
      },
    },

    interval() {
      return this.mode === 'interval';
    },
    checkCount() {
      return this.incomeBracket.length;
    },
    changedSlider() {
      return this.incomeInterval;
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          incomeBracket: this.incomeBracket,
          incomeInterval: this.incomeInterval,
          interval: this.interval,
          mode: this.mode,
          incomeBracketBounds: this.incomeBracketBounds,
        },
      };
    },
  },
  watch: {
    checkCount: function(count, prevCount) {
      if (count === 0) {
        this.removeActiveFilter({ filter: this.filter, mapkey: this.mapkey });
      } else {
        if (prevCount === 0) {
          this.addActiveFilter({ filter: this.filter, mapkey: this.mapkey });
        }
        this.updateFilterParams({ filter: this.setFilterParams, mapkey: this.mapkey });
      }
    },
    changedSlider: function() {
      this.updateFilterParams({ filter: this.setFilterParams, mapkey: this.mapkey });
    },
    interval: function() {
      this.updateFilterParams({ filter: this.setFilterParams, mapkey: this.mapkey });
    },
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
      'removeActiveFilter',
      'updateFilterParams',
    ]),
    formatNumber(num) {
      if (num === undefined || num === null || isNaN(num)) return '';
      return new Intl.NumberFormat(this.$i18n.locale).format(num);
    },
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
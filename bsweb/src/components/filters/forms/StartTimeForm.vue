<template>
  <div>
    <div>
      <input v-model="periods" type="checkbox" value="morning">
      <label>{{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.morning') }}</label>
    </div>
    <div>
      <input v-model="periods" type="checkbox" value="afternoon">
      <label>{{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.afternoon') }}</label>
    </div>
    <div>
      <input v-model="periods" type="checkbox" value="evening">
      <label>{{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.evening') }}</label>
    </div>
    <div>
      <input v-model="specific" type="checkbox">
      <label>{{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.specificTime') }}</label>
    </div>
    <div v-if="specific">
      <div class="flex">
        <span class="timepicker-label center">{{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.from') }}</span>
        <b-timepicker
          v-model="minTime"
          :increment-minutes="60"
          icon="clock"
          size="is-small"
          class="timepicker"
          locale="pt-BR"
          hour-format="24"
        />
      </div>
      <div class="flex">
        <span class="timepicker-label center">{{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.to') }}</span>
        <b-timepicker
          v-model="maxTime"
          :default-minutes="0"
          icon="clock"
          size="is-small"
          class="timepicker"
          locale="pt-BR"
          hour-format="24"
        />
      </div>
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
    periods: {
      get() {
        return this.selectors[this.mapkey][this.fid].periods;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].periods = value;
      },
    },
    specific: {
      get() {
        return this.selectors[this.mapkey][this.fid].specific;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].specific = value;
      },
    },
    minTime: {
      get() {
        return this.selectors[this.mapkey][this.fid].minTime;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].minTime = value;
      },
    },
    maxTime: {
      get() {
        return this.selectors[this.mapkey][this.fid].maxTime;
      },
      set(value) {
        this.selectors[this.mapkey][this.fid].maxTime = value;
      },
    },
    paramsCount() {
      return this.periods.length + this.specific;
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          periods: this.periods,
          specific: this.specific,
          minHours: this.minTime.getHours(),
          maxHours: this.maxTime.getHours(),
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

  .timepicker-label {
    min-width: 20px;
    margin: 5px 10px 12px;
  }

  .timepicker {
    width: 110px;
  }
</style>
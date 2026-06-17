<template>
  <div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="morning" type="is-info">
        {{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.morning') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="afternoon" type="is-info">
        {{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.afternoon') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="evening" type="is-info">
        {{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.evening') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="specific" type="is-info">
        {{ $t('BIKESCIENCEWEB.tabs.filters.forms.time.specificTime') }}
      </b-checkbox>
    </div>
    <div v-if="specific">
      <b-field :label="$t('BIKESCIENCEWEB.tabs.filters.forms.time.from')">
        <b-timepicker v-model="minTime" :increment-minutes="60" icon="clock" />
      </b-field>
      <b-field :label="$t('BIKESCIENCEWEB.tabs.filters.forms.time.to')">
        <b-timepicker v-model="maxTime" :default-minutes="0" icon="clock" />
      </b-field>
    </div>
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
      periods: [],
      specific: false,
      minTime: new Date(2020, 1, 1, 4, 0, 0),
      maxTime: new Date(2020, 1, 1, 13, 0, 0),
    };
  },
  computed: {
    filterData() {
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
    filterData: function() {
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

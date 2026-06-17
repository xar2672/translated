<template>
  <div>
    <div class="block">
      <b-checkbox
        v-for="(day, index) in weekdays"
        :key="index"
        v-model="days"
        :native-value="index"
        type="is-info"
      >
        {{ $t(`BIKESP.filters.day_week.weekDays.${day}`) }}
      </b-checkbox>
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
      weekdays: [
        'mon',
        'tue',
        'wed',
        'thu',
        'fri',
        'sat',
        'sun',
      ],
      days: [],
    };
  },
  computed: {
    filterData() {
      return {
        id: this.fid,
        params: {
          days: this.days,
        },
      };
    },
  },
  watch: {
    filterData: function(value) {
      this.updateFilterParams({ value, mapkey: this.mapkey });
    },
  },
  methods: {
    ...mapActions([
      'updateFilterParams',
    ]),
  },
};
</script>

<style scoped>

</style>
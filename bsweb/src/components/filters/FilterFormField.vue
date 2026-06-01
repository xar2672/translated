<template>
  <div>
    <AgeForm
      v-if="filter.filter_key === 'age'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <TimeForm
      v-if="filter.filter_key === 'horary'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <StartTimeForm
      v-if="filter.filter_key === 'start_time'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <FinishTimeForm
      v-if="filter.filter_key === 'finish_time'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <WeekdayForm
      v-if="filter.filter_key === 'weekday'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <MonthForm
      v-if="filter.filter_key === 'months'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <DurationForm
      v-if="filter.filter_key === 'duration'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <SexForm
      v-if="filter.filter_key === 'sex'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <IncomeForm
      v-if="filter.filter_key === 'income'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <DistanceForm
      v-if="filter.filter_key === 'distance'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <AttractorForm
      v-if="filter.filter_key === 'attractors_emitters'" :mapkey="mapkey"
    />
    <SpeedForm
      v-if="filter.filter_key === 'speed'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
    <ReasonForm
      v-if="filter.filter_key === 'reason'" :fid="filter.id" :filter="filter" :mapkey="mapkey"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import AgeForm from './forms/AgeForm.vue';
import TimeForm from './forms/TimeForm.vue';
import StartTimeForm from './forms/StartTimeForm.vue';
import FinishTimeForm from './forms/FinishTimeForm.vue';
import WeekdayForm from './forms/WeekdayForm.vue';
import MonthForm from './forms/MonthForm.vue';
import DurationForm from './forms/DurationForm.vue';
import SexForm from './forms/SexForm.vue';
import IncomeForm from './forms/IncomeForm.vue';
import DistanceForm from './forms/DistanceForm.vue';
import AttractorForm from './forms/AttractorForm.vue';
import SpeedForm from './forms/SpeedForm.vue';
import ReasonForm from './forms/ReasonForm.vue';

defineProps({
  filter: {
    type: Object,
    required: true
  },
  mapkey: {
    type: String,
    required: true
  }
});
</script>
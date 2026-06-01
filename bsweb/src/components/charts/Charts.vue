<template>
  <div>
    <img 
      v-for="chart in charts" :key="chart" :src="`${api_url}/chart?ut=${ut}&chart=${chart}`"
    >
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const ut = ref(localStorage.ut || '');
const store = useStore();

const api_url = process.env.VUE_APP_API_URL;

const charts = computed(() => store.state.filters.charts);
</script>

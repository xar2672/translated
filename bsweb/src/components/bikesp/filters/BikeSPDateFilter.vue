<template>
  <label>{{$t('bikesp.date')}}:</label>
  <div class="date-input-row">
    <input type="date" v-model="from" @change="updateFilter" />
    <span class="separator">–</span>
    <input type="date" v-model="to" @change="updateFilter" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const from = ref('');
const to = ref('');

const updateFilter = () => {
  store.commit('bikesp/updateFilters', {
    date_from: from.value || undefined,
    date_to: to.value || undefined
  });
};

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', {
    date_from: undefined,
    date_to: undefined
  });
});
</script>

<style scoped>
.date-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

input[type="date"] {
  padding: 4px 6px;
  font-size: 13px;
  border: 1px solid #ccc;
  width: 45%;
  border-radius: 4px;
}

.separator {
  font-size: 16px;
  color: #666;
}
</style>

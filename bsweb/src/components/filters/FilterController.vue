<template>
  <div>
    <div v-if="filter.has_checkbox">
      <input
        v-model="isActive"
        type="checkbox"
        :value="filter.id"
      >
      <label class="filter-name">{{ $t('filter.filter_name') }}</label>
      <div v-if="isActive">
        <div class="options">
          <FilterFormField :filter="filter" :mapkey="mapkey" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="filter-toggle" @click="toggleFilter">
        <img :src="iconArrow" :class="['arrow', { active: isActive }]">
      </div>
      <label class="filter-name">{{ $t('filter.filter_name') }}</label>
      <div v-show="isActive">
        <div class="options">
          <FilterFormField :filter="filter" :mapkey="mapkey" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import FilterFormField from './FilterFormField.vue';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';

const store = useStore();

const props = defineProps({
  filter: { type: Object, required: true },
  mapkey: { type: String, required: true },
});

const isActive = ref(false);

watch(isActive, (newVal) => {
  if (props.filter.has_checkbox) {
    const action = newVal ? 'addActiveFilter' : 'removeActiveFilter';
    store.dispatch(action, { 
      filter: props.filter, 
      mapkey: props.mapkey 
    });
  }
});

const toggleFilter = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped>
.filter-name {
  margin: 0 5px;
  font-size: 12px;
}
.filter-toggle {
  cursor: pointer;
  display: inline;
}
input {
  cursor: pointer;
}
.options {
  margin: 0 0 10px 20px;
  font-size: 12px;
}
.arrow {
  transition: all ease-in-out 0.2s;
  transform: rotate(-90deg);
  width: 12px;
  margin-right: 4px;
}
.arrow.active {
  transform: rotate(0deg);
}
</style>
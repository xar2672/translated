<template>
  <div v-show="count > 0">
    <b-checkbox v-model="isActive" :native-value="tier" type="is-info">
      <span class="tier-option" :title="hover">
        {{ $t('BIKESCIENCEWEB.tabs.flows.tierOptions', {tier_prop : tier + 1, tier_count: count}, count) }}
      </span>
    </b-checkbox>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  tier: { type: Number, required: true },
  count: { type: Number, required: true },
  mapkey: { type: String, required: true },
});

const store = useStore();

const flows = computed(() => store.getters['flows/flows']);
const selectors = computed(() => store.getters['flows/selectors']);
const flowsLimits = computed(() => store.getters['flows/flowsLimits']);

const flow = computed(() => flows.value[props.mapkey][props.tier]);

const isActive = computed({
  get() {
    return selectors.value[props.mapkey][props.tier];
  },
  set() {
    store.dispatch('flows/toggleSelector', { mapkey: props.mapkey, tier: props.tier });
  },
});

const hover = computed(() => {
  const limit = flowsLimits.value[props.mapkey][props.tier];
  if (limit) {
    const min = Math.round(limit.min);
    const max = Math.round(limit.max);
    return t('BIKESCIENCEWEB.tabs.flows.hoverText', {min: min, max: max});
  }
  return null;
});

watch(isActive, (value) => {
  const data = {
    mapkey: props.mapkey,
    category: 'flows',
    type: 'polyline',
    key: props.tier,
  };
  if (value) {
    store.dispatch('addToMap', data);
  } else {
    store.dispatch('removeFromMap', data);
  }
});

watch(flow, () => {
  if (isActive.value) {
    store.dispatch('addToMap', {
      mapkey: props.mapkey,
      category: 'flows',
      type: 'polyline',
      key: props.tier,
    });
  }
});
</script>

<style scoped>
.tier-option {
  font-size: .85rem;
}
</style>

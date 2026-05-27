<template>
  <div>
    <p class="label">
      {{ $t('selectTiers') }}:
    </p>
    <div v-for="(count, index) in tierList" v-show="!flowsNotFound" :key="index">
      <TierController
        :tier="index"
        :count="count"
        :mapkey="mapkey"
      />
    </div>
    <span v-if="flowsNotFound" class="not-found">{{ $t('notFoundTiers') }}</span>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';
import TierController from './TierController.vue';

const props = defineProps({
  mapkey: { type: String, required: true },
});

const store = useStore();
const toast = useToast();

const flowsNotFound = computed(() => store.getters.flowsNotFound);
const tripsPerTier = computed(() => store.getters['flows/tripsPerTier']);
const tierList = computed(() => tripsPerTier.value[props.mapkey]);

watch(flowsNotFound, (val) => {
  if (val) {
    toast.warning(props.$t('toastr.emptyFlows'));
  } else {
    toast.clear();
  }
});
</script>

<style scoped>
.label {
  font-size: 12px;
}
.not-found {
  font-size: 12px;
}
</style>
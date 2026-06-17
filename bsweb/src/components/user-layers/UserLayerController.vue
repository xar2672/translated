<template>
  <div style="display: flex; align-items: center; justify-content: space-between">
    <div>
      <input v-model="isActive" type="checkbox">
      <label class="filter-name">{{ layerName }}</label>
    </div>
    <div>
      <div class="icon" :title="$t('BIKESCIENCEWEB.tabs.layers.editModal.editLayer')" @click="openEditModal">
        <img :src="iconEdit">
      </div>
      <div class="icon" :title="$t('BIKESCIENCEWEB.tabs.layers.editModal.removeLayer')" @click="() => removeCustomLayer(index)">
        <img :src="iconDelete">
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import iconDelete from '@/assets/svg/delete.svg';
import iconEdit from '@/assets/svg/edit.svg';

const props = defineProps({
  layerName: { type: String, required: true },
  index: { type: Number, required: true },
  mapkey: { type: String, required: true },
});

const store = useStore();

const isActive = computed({
  get() {
    return store.getters['user_shapefiles/uploadedLayers'][props.index]?.isActive[props.mapkey] || false;
  },
  set(value) {
    store.dispatch('user_shapefiles/toggleCustomLayer', {
      index: props.index,
      mapkey: props.mapkey,
      value
    });
  }
});

const openEditModal = () => {
  store.dispatch('modals/setEditLayerIndex', props.index);
  store.dispatch('modals/open', 'editCustomLayer');
};

const removeCustomLayer = (index) => {
  store.dispatch('user_shapefiles/removeCustomLayer', index);
};
</script>

<style scoped>
.filter-name {
  margin: 0 5px;
  font-size: .8rem;
}

input {
  cursor: pointer;
}

.icon {
  width: 17px;
  cursor: pointer;
  margin: 0 10px;
}
</style>
<template>
  <Modal name="editCustomLayer">
    <div v-if="editLayerIndex !== null" class="modal-container">
      <h1 class="modal-title">
        {{ $t('editModal.title') }} {{ layer.name }}
      </h1>
      <form @submit.prevent="submit">
        <!-- Keep form fields same as before -->
      </form>
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import Modal from '../../Modal.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useStore();
const error = ref(null);

// Form fields
const name = ref('');
const color = ref('');
const opacity = ref('');
const weight = ref(null);

// Computed properties
const editLayerIndex = computed(() => store.getters['modals/editLayerIndex']);
const uploadedLayers = computed(() => store.getters['user_shapefiles/uploadedLayers']);
const layer = computed(() => uploadedLayers.value[editLayerIndex.value]);

const getTranslationForValue = (value) => {
  return t(`editModal.validadeModal.${value}`)
}

// Initialize form when layer changes
watch(() => editLayerIndex.value, (newVal) => {
  if (newVal !== null) {
    name.value = layer.value.name;
    color.value = layer.value.style.color;
    opacity.value = layer.value.style.opacity;
    weight.value = layer.value.style.weight;
    error.value = null;
  }
});

const validateFields = () => {
  if (!name.value.length) {
    error.value = getTranslationForValue("name");
    return false;
  }
  if (!weight.value?.toString().length) {
    error.value = getTranslationForValue("width");
    return false;
  }
  if (!opacity.value?.toString().length) {
    error.value = getTranslationForValue("opacity");
    return false;
  }
  if (!color.value.length) {
    error.value = getTranslationForValue("emptyColor");
    return false;
  }
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/gi.test(color.value)) {
    error.value = getTranslationForValue("invalidColor");
    return false;
  }
  return true;
};

const submit = () => {
  if (!validateFields()) return;
  
  const style = {
    color: color.value,
    opacity: opacity.value,
    weight: weight.value,
  };
  
  store.dispatch('user_shapefiles/editCustomLayer', {
    index: editLayerIndex.value,
    name: name.value,
    style
  });
  
  close();
};

const close = () => {
  store.dispatch('modals/close', 'editCustomLayer');
};
</script>

<style scoped>
/* Keep styles the same */
</style>
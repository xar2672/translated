<template>
  <div>
    <TwoMapsManager />
    <div id="main-content">
      <div id="columns-content" class="columns is-mobile">
        <div class="column rest-column left manage">
          <Manage id="filter-container" />
        </div>
        <div id="main-column" class="column is-full is-flex">
          <div id="main-map" :class="['main-map column', { 'is-half': secondMapIsActive }]">
            <Map mapkey="main" />
          </div>
          <div
            v-if="secondMapIsActive"
            id="second-map"
            class="second-map column is-half"
            style="border-left: 2px solid #167CF0;"
          >
            <Map mapkey="second" />
          </div>
        </div>
      </div>
    </div>
    <AboutModal />
    <EditCustomLayerModal v-if="activeModal === 'editCustomLayer'" />
    <Loading :is-active="active || loading_filters" />
    <o-modal v-model:active="isImageModalActive">
      <p style="text-align: center">
        <img src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4">
      </p>
    </o-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import Manage from '../components/Manage.vue';
import Map from '../components/map/Map.vue';
import Loading from '../components/Loading.vue';
import AboutModal from '../components/modals/about/index.vue';
import EditCustomLayerModal from '../components/modals/editCustomLayer/index.vue';
import TwoMapsManager from '../components/twomapsmanager/TwoMapsManager.vue';

const store = useStore();
const isImageModalActive = ref(false);

const opened = computed(() => store.getters['modals/open']);
const active = computed(() => store.getters['loading/active']);
const activeModal = computed(() => store.getters['modals/activeModal']);
const loading_filters = computed(() => store.getters.loading_filters);
const secondMapIsActive = computed(() => store.getters.secondMapIsActive);
const mapControl = computed(() => store.getters.mapControl);

onMounted(() => {
  if (!localStorage.ut) {
    localStorage.ut = uuidv4();
  }
  
  const actions = [
    'fetchCategories',
    'fetchCPTM_lines',
    'fetchSubway_lines',
    'fetchCPTM_stations',
    'fetchSubway_stations',
    'fetchBikelane',
    'fetchAccidents'
  ];

  actions.forEach(action => store.dispatch(action));
  store.dispatch('user_shapefiles/loadSavedLayers');
});
</script>

<style scoped>
.rest-column {
  max-width: 20%;
}
.main-map.is-half, .second-map {
  padding-bottom: 0;
  padding-right: 10px;
}
</style>
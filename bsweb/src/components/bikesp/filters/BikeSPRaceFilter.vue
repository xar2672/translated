<template>
  <label for="race-select">Raça:</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" placeholder="Escolha uma raça" label="name" track-by="name" :preselect-first="false"
        :taggable="true" deselectLabel="" selectLabel="" selectedLabel="Selecionado">
    </multiselect>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import Multiselect from 'vue-multiselect';
import { getValueList } from './commons';

const store = useStore();

const value = ref([]);

const options = [
  {name: 'Amarela', value: 'Amarela'},
  {name: 'Branca', value: 'Branca'},
  {name: 'Parda', value: 'Parda'},
  {name: 'Indígena', value: 'Indígena'},
  {name: 'Preta', value: 'Preta'},
  {name: 'Não informado', value: 'Prefiro nã'},
]

watch(value, () => {
  store.commit('bikesp/updateFilters', { races: getValueList(value) })
}, {deep: true})

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { races: undefined });
});
</script>

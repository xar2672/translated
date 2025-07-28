<template>
  <label for="race-select">Dias da semana:</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" placeholder="Escolha um dia da semana" label="name" track-by="name" :preselect-first="false"
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

const value = ref([])

const options = [
  {name: 'Domingo', value: 0},
  {name: 'Segunda', value: 1},
  {name: 'Terça', value: 2},
  {name: 'Quarta', value: 3},
  {name: 'Quinta', value: 4},
  {name: 'Sexta', value: 5},
  {name: 'Sábado', value: 6}
]

watch(value, ()=> store.commit('bikesp/updateFilters', { week_days: getValueList(value) }), {deep: true})

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { week_days: undefined });
});
</script>

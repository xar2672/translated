<template>
  <label>Gênero:</label>
  <div class="select-button-wrapper">
    <multiselect class="fixed-width-multiselect" id="multiselect" v-model="value" :options="options" :multiple="true" :close-on-select="true" :clear-on-select="false"
        :preserve-search="true" placeholder="Escolha um gênero" label="name" track-by="name" :preselect-first="false"
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
  {name: 'Feminino', value: 'F'},
  {name: 'Masculino', value: 'M'},
  {name: 'Não binários', value: 'NB'},
  {name: 'Não informado', value: 'NA'}
]

watch(value, () => {
  store.commit('bikesp/updateFilters', { genders: getValueList(value) });
}, {deep: true})

onBeforeUnmount(() => {
  store.commit('bikesp/updateFilters', { genders: undefined });
});
</script>

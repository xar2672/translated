<template>
  <div>
    <div v-if="$i18n.locale == 'pt'">
      <h2>Funcionalidades</h2>
      <p>As funcionalidades da ferramenta estão organizadas em três grupos:</p>
      <ol>
        <li>
          <strong>Fluxos:</strong> contém as opções para definir e ajustar a
          grade na qual os fluxos serão computados. Os fluxos são organizados em
          4 quartis, cada um deles responsável por 25% do total de viagens. O
          primeiro quartil contém os fluxos mais intensos, ou seja, poucos
          fluxos mas cada um contendo muitas viagens, e assim por diante até o
          último quartil, que tem muitos fluxos, mas cada um com poucas viagens.
        </li>
        <li>
          <strong>Filtros:</strong> contém opções de filtros temporais, de
          condições de viagens e demográficos a serem aplicados nos fluxos. Ao
          selecionar uma categoria de filtros aparecem suas opções, que quando
          ativadas, filtram automaticamente os fluxos.
        </li>
        <li>
          <strong>Camadas:</strong> contém opções de visualização de camadas de
          infraestrutura de transporte, cicloviária e de ocorrências de
          trânsito.
        </li>
      </ol>
    </div>
    <div v-else-if="$i18n.locale == 'en'">
      <h2>Features</h2>
      <p>The tool features are organized into three groups:</p>
      <ol>
        <li>
          <strong>Flows:</strong> options for setting the map grid where the
          flows are shown. Each flow represents all trips that go from a cell to
          another. The flows are split into quartiles (tiers), each containing
          25% of the total trips. The first tier has a few flows, each of them
          with many trips. Conversely, the fourth tier has many flows, each one
          with few trips.
        </li>
        <li>
          <strong>Filters:</strong> options to filter the trip flows by time,
          trip conditions, and demographics. The flows are automatically
          recalculated after selecting a filter option.
        </li>
        <li>
          <strong>Layers:</strong> visual layers options include cycling and
          public transport infrastructure, and also traffic accidents involving
          bicycles.
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 40px;
  text-align: left;
}
p {
  text-align: justify;
  margin-bottom: 20px;
}
li {
  text-align: justify;
}
</style>
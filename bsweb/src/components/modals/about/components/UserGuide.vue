<template>
  <div>
    <div v-if="$i18n.locale == 'pt-br'">
      <h2>Guia do usuário</h2>
      <article>
        <h3>Fluxos</h3>
        <div class="content-wrapper">
          <div>
            <p>
              Os fluxos são arcos que representam conjuntos de viagens de
              bicicleta saindo de uma área de origem e apontando para uma área
              de destino. Quanto maior a quantidade de viagens que um fluxo
              representa, maior é a sua espessura.
            </p>
            <p>
              Os fluxos de viagens circulares, com origem e destino na mesma
              área, não são exibidos no mapa. Por isso, a quantidade de fluxos
              gerados depende da forma que dividimos o mapa. Quanto menores as
              áreas, mais fluxos são gerados, o que permite análises mais
              detalhadas, mas que eventualmente pode dificultar a visualização.
            </p>
            <div class="img-container center">
              <div class="img">
                <img :src="flowImg">
                <span class="img-title">Exemplo de um fluxo</span>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article>
        <h3>Camada de visualização</h3>
        <span>Define a forma geométrica das áreas de divisão do mapa:</span>
        <ul>
          <li>
            <strong>Grid: </strong>área retangular personalizável com <i>n</i> x
            <i>n</i> células.
          </li>
          <li>
            <strong>Zonas OD17: </strong>áreas geográficas utilizadas na
            pesquisa Origem Destino 2017 do Metrô de São Paulo.
          </li>
        </ul>
        <div class="img-container center">
          <div class="img">
            <img :src="gridImg">
            <span class="img-title">Grid</span>
          </div>

          <div class="img">
            <img :src="zonesImg">
            <span class="img-title">Zonas OD</span>
          </div>
        </div>
      </article>
      <article>
        <h3>Edição do grid</h3>
        <p>
          Altera as configurações do grid. A opção Tamanho define em quantos
          retângulos (células) vamos dividir o grid. Por exemplo, o tamanho 10
          divide o grid em 10x10 células. Os demais parâmetros definem os
          limites do grid para as direções oeste, leste, norte e sul. Os valores
          padrão cobrem toda área da cidade de São Paulo.
        </p>
        <p>Após alterar o grid é necessário recalcular os fluxos.</p>
        <div class="img-container center">
          <div class="img">
            <img :src="gridEditionImg">
            <span class="img-title">Edição do grid</span>
          </div>
        </div>
      </article>
      <article>
        <h3>Filtros</h3>
        <p>
          Opções para filtrar os fluxos de viagens por tempo, condições de
          viagem e por dados demográficos. Podemos usar esses filtros para
          analisar os fluxos de viagens de acrdo com cenários específicos.
        </p>
        <ol>
          <li>Selecione a aba <strong>Filtros</strong>.</li>
          <li>Selecione uma categoria de filtros</li>
          <li>Selecione um tipo de filtro</li>
          <li>Finalmente, selecione uma opção para ativar o filtro</li>
          <li>Para ativar um filtro basta selecioná-lo.</li>
          <li>
            Pronto, agora os fluxos são automaticamente atualizados. Note que a
            contagem de filtros aumentou.
          </li>
        </ol>
        <div class="img-container center">
          <div class="img">
            <img :src="filterImg">
          </div>
          <div class="img">
            <img :src="filterImg02">
          </div>
        </div>
        <div class="img-container center">
          <div class="img">
            <img :src="filterImg03">
          </div>
          <div class="img">
            <img :src="filterImg04">
          </div>
        </div>
      </article>
      <article>
        <h3>Camadas</h3>
        <p>
          As camadas permitem visualizar linhas e estações de metrô e trem, a
          infraestrutura cicloviária e outros itens, como os acidentes
          envolvendo bicicletas.
        </p>
        <ol>
          <li>Selecione a aba <strong>Camadas</strong></li>
          <li>Seleciona uma categoria</li>
          <li>Selecione uma camada para ativá-la</li>
        </ol>
        <div class="img-container center">
          <div class="img">
            <img :src="layersImg">
          </div>
        </div>
      </article>
    </div>
    <div v-else-if="$i18n.locale == 'en'">
      <h2>User guide</h2>
      <article>
        <h3>Flows</h3>
        <div class="content-wrapper">
          <div>
            <p>
              Flows are directed archs that represent sets of bycicle trips
              leaving an origin area to a destination area. The flow width is
              proportional to how many trips a flow is representing.
            </p>
            <p>
              Flows of circular trips, with origin and destination in the same
              area, are not shown on the map. That is the reason why the
              quantity of flows generated depends on how we divide the map. With
              smaller areas more flows are generated, allowing mode detailed
              analysis, but with a more cluttered view.
            </p>
            <div class="img-container center">
              <div class="img">
                <img :src="flowImg">
                <span class="img-title">Flow example</span>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article>
        <h3>Base layer</h3>
        <span>Defines the geometric shape of the areas in the map:</span>
        <ul>////
          <li><strong>Grid: </strong> customizable rectangular area;</li>
          <li>
            <strong>OD Zones: </strong>geographic areas that were used in the
            2017 Origin and Destination survey by the São Paulo Subway
          </li>
        </ul>
        <div class="img-container center">
          <div class="img">
            <img :src="gridImg">
            <span class="img-title">Grid</span>
          </div>

          <div class="img">
            <img :src="zonesImg">
            <span class="img-title">OD Zones</span>
          </div>
        </div>
      </article>
      <article>
        <h3>Editing the grid</h3>
        <p>
          Changes the grid paramaters. The Size defines in how many rectangles
          the grid is going to be divided, for instance, setting the size as 10
          divides the grid in 10x10 rectangles. The other parameters defines the
          grid limits in the west, east, north and south direction. The default
          values cover all the area os the city of São Paulo.
        </p>
        <p>After editing the grid is necessary to recalculate the flows.</p>
        <div class="img-container center">
          <div class="img">
            <img :src="enGridEditionImg">
            <span class="img-title">Grid edit</span>
          </div>
        </div>
      </article>
      <article>
        <h3>Filters</h3>
        <p>
          By using a filter we can select generate flows using a subset of the
          trips to analyze their behaviour.
        </p>
        <ol>
          <li>Select the <strong>Filters</strong> guide.</li>
          <li>Select a filter category</li>
          <li>Select a filter type</li>
          <li>To activate a filter select it</li>
          <li>
            After selecting a filter the flow are automatically updated. Notice
            that the filter count increased.
          </li>
        </ol>
        <div class="img-container center">
          <div class="img">
            <img :src="enFilterImg">
          </div>
          <div class="img">
            <img :src="enFilterImg02">
          </div>
        </div>
        <div class="img-container center">
          <div class="img">
            <img :src="enFilterImg03">
          </div>
          <div class="img">
            <img :src="enFilterImg04">
          </div>
        </div>
      </article>
      <article>
        <h3>Layers</h3>
        <p>
          By using layers, you can show subway/rails lines and stations, the
          cycling infrasctructure and other itens, like cycling accidents.
        </p>
        <ol>
          <li>Select the <strong>Layers</strong> guide</li>
          <li>Select a category</li>
          <li>Select a layer to be activated</li>
        </ol>
        <div class="img-container center">
          <div class="img">
            <img :src="enLayersImg">
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import flowImg from '@/assets/user-guide/flow.png';
import gridImg from '@/assets/user-guide/grid.png';
import zonesImg from '@/assets/user-guide/zones.png';
import gridEditionImg from '@/assets/user-guide/grid-edition.png';
import enGridEditionImg from '@/assets/user-guide/en_grid-edition.png';
import filterImg from '@/assets/user-guide/filter01.png';
import filterImg02 from '@/assets/user-guide/filter02.png';
import filterImg03 from '@/assets/user-guide/filter03.png';
import filterImg04 from '@/assets/user-guide/filter04.png';
import enFilterImg from '@/assets/user-guide/en_filter01.png';
import enFilterImg02 from '@/assets/user-guide/en_filter02.png';
import enFilterImg03 from '@/assets/user-guide/en_filter03.png';
import enFilterImg04 from '@/assets/user-guide/en_filter04.png';
import layersImg from '@/assets/user-guide/layers.png';
import enLayersImg from '@/assets/user-guide/en_layers.png';

export default {
  data() {
    return {
      flowImg,
      gridImg,
      zonesImg,
      gridEditionImg,
      enGridEditionImg,
      filterImg,
      filterImg02,
      filterImg03,
      filterImg04,
      enFilterImg,
      enFilterImg02,
      enFilterImg03,
      enFilterImg04,
      layersImg,
      enLayersImg,
    };
  },
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 40px;
  text-align: left;
}
h3 {
  font-size: 18px;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  text-align: left;
  margin-bottom: 10px;
}
p {
  text-align: justify;
  margin-bottom: 20px;
}
article {
  margin-bottom: 20px;
}
ul {
  list-style-type: disc;
  list-style-position: inside;
}
ol {
  margin-left: 20px;
}

.content-wrapper {
  display: flex;
}

.content-wrapper > img {
  margin-left: 20px;
}

.img-container {
  justify-content: space-evenly;
  margin: 10px 0;
}

.img {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img > img {
  border: 1px solid #bbb;
  margin-bottom: 5px;
}

.img-title {
  font-size: 12px;
  color: #000;
}
</style>
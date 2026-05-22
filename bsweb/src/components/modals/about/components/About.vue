<template>
  <div>
    <div v-if="$i18n.locale === 'pt-br'">
      <h2>Sobre</h2>
      <p>
        A BikeScienceWeb é uma ferramenta desenvolvida pelo INCT da Internet do
        Futuro para Cidades Inteligentes, sediado no IME-USP. Seu objetivo é
        facilitar o acesso a informações analíticas visuais sobre dados de
        mobilidade de bicicleta. A ideia é que as pessoas interessadas em tais
        informações possam acessá-las através de um navegador sem precisar de
        conhecimentos específicos sobre linguagens de programação.
      </p>
      <p>
        Em sua versão atual, estamos disponibilizando um mapa com os fluxos de
        viagens de bicicleta da pesquisa Origem-Destino 2017 de São Paulo,
        realizada pelo Metrô. Há vários opções de filtragem para visualizar como
        as viagens ocorrem em situações distintas. Em versões futuras, iremos
        adicionar novas fontes de dados e tipos diferentes de análises.
      </p>
    </div>
    <div v-else-if="$i18n.locale === 'en'">
      <h2>About</h2>
      <p>
        BikeScienceWeb is a tool developed by
        <a href="https://interscity.org">InterSCity</a>
        , the Future Internet for Smart Cities Project hosted at IME-USP. Its main
        goal is to ease access to visual analysis of bicycle mobility data. Thus,
        people interested in such information can use the tool through a Web browser
        without the need for specific knowledge about programming languages.
      </p>
      <p>
        In the current version, we're providing a map with bicycle trip flows from
        São Paulo's 2017 Origin-Destination survey. There are several filter
        options to visualize how bike trips occur in different situations. In
        future versions, we will add new data sources and different kinds of
        analyses.
      </p>
    </div>
    <div class="logos-wrapper">
      <img :src="logoCapes" class="logo_capes">
      <img :src="logoCnpq" class="logo_cnpq">
      <img :src="logoFapesp" class="logo_fapesp">
    </div>
  </div>
</template>

<script setup>
//Mudanças ABOUT
import logoCapes from '@/assets/logos/capes.jpg';
import logoCnpq from '@/assets/logos/cnpq.png';
import logoFapesp from '@/assets/logos/fapesp.png';
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
p {
  text-align: justify;
  margin-bottom: 20px;
}

.logo_capes {
  height: 120px;
}
.logo_fapesp {
  height: 65px;
}
.logo_cnpq {
  height: 77px;
}
.logos-wrapper > * {
  margin: 20px 0;
}
.logos-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logos-wrapper > * {
  display: flex;
  justify-content: center;
}
</style>
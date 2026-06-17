<template>
  <div id="app">
    <nav>
      <router-link to="/">{{ $t('BIKESCIENCEWEB.appName') }}</router-link> |
      <router-link to="/bikesp">
        <img src="https://ecosustain.cc/assets/img/logo-ecosustain.svg" alt="icon" style="width:20px; height:20px; vertical-align: text-bottom;" />
        {{ $t('BIKESP.appName') }}
      </router-link>
      <LanguageSelector />
    </nav>
    <router-view />
  </div>
</template>

<script>
import LanguageSelector from './components/Language.vue'
export default {
  components: { LanguageSelector }
}
</script>

<style>
nav {
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin: 1px 20px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<template>
  <div id="app">
    <nav>
      <router-link to="/">BikescienceWeb</router-link> |
      <router-link to="/bikesp">
        <img src="https://ecosustain.cc/assets/img/logo-ecosustain.svg" alt="icon" style="width:20px; height:20px; vertical-align:middle;" />
        Piloto Bike SP - Painel Analítico
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  margin-bottom: 5px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
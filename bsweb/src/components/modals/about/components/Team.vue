<template>
  <div>
    <h2 v-if="$i18n.locale == 'pt'">
      Equipe BikeScience
    </h2>
    <h2 v-else-if="$i18n.locale == 'en'">
      BikeScience Team
    </h2>
    <div class="members">
      <div class="team-member">
        <span>Prof. Fabio Kon</span>
        <span class="from">IME/USP</span>
      </div>
      <div class="team-member">
        <span>Dr. Higor Amario de Souza</span>
        <span class="from">IME/USP</span>
      </div>
      <div class="team-member">
        <span>Dra. Letícia Lindenberg Lemos</span>
        <span class="from">IME/USP</span>
      </div>
    </div>
    <div class="members">
      <div class="team-member">
        <span>Thiago Jose Benitez Peña</span>
        <span class="from">IME/USP</span>
      </div>
      <div class="team-member">
        <span>Pedro Gigeck Freire</span>
        <span class="from">IME/USP</span>
      </div>
    </div>
    <h2 v-if="$i18n.locale == 'pt-br'">
      Membros Antigos
    </h2>
    <h2 v-else-if="$i18n.locale == 'en'">
      Past members
    </h2>
    <div class="team-member">
      <span>Éderson Cássio</span>
      <span class="from">BCC-IME-USP, 2019</span>
    </div>
    <h2 v-if="$i18n.locale == 'pt-br'">
      Colaboração
    </h2>
    <h2 v-else-if="$i18n.locale == 'en'">
      Research Partners
    </h2>
    <div class="team-member-large">
      <span>Fabio Duarte, Paolo Santi, Carlo Ratti</span>
      <span class="from">MIT Senseable City Lab, Massachusetts, USA</span>
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
  margin-bottom: 20px;
  text-align: left;
}
.team-member {
  display: flex;
  flex-direction: column;
  margin: 0 40px 20px 0;
}
.team-member > span {
  display: block;
  width: 220px;
}
.members {
  display: flex;
}
.team-member-large {
  display: flex;
  flex-direction: column;
}
.from {
  color: #8b8b8b;
}
</style>
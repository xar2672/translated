<template>
  <Teleport name="about" to="body" v-if="store.state.modals.open?.includes('about')" >
    <div class="background-container" @click.self="closeModal('about')" >
      <div class="about-container">
        <h1 class="bsw">
          {{ $t('BIKESCIENCEWEB.appName') }}
        </h1>
        <div class="about-selector center">
          <ButtonAbout
            :text="$t('BIKESCIENCEWEB.aboutPage.buttons.about')"
            :is-active="activeSection[0]"
            @click="select(0)"
          />
          <ButtonAbout
            :text="$t('BIKESCIENCEWEB.aboutPage.buttons.features')"
            :is-active="activeSection[1]"
            @click="select(1)"
          />
          <ButtonAbout
            :text="$t('BIKESCIENCEWEB.aboutPage.buttons.team')"
            :is-active="activeSection[2]"
            @click="select(2)"
          />
          <ButtonAbout
            :text="$t('BIKESCIENCEWEB.aboutPage.buttons.guide')"
            :is-active="activeSection[3]"
            @click="select(3)"
          />
        </div>
        <div class="about-content">
          <About v-if="activeSection[0]" />
          <Features v-if="activeSection[1]" />
          <Team v-if="activeSection[2]" />
          <UserGuide v-if="activeSection[3]" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import Modal from '../../Modal.vue';
import About from './components/About.vue';
import Features from './components/Features.vue';
import Team from './components/Team.vue';
import UserGuide from './components/UserGuide.vue';
import ButtonAbout from '@/components/buttons/ButtonAbout.vue';

import { useStore } from 'vuex';
const store = useStore();

const activeSection = ref([true, false, false, false]);

const select = (clickedIndex) => {
  if (activeSection.value[clickedIndex]) return;
  activeSection.value = activeSection.value.map((_, index) => index === clickedIndex);
};
const closeModal = (modalName) => {
  select(0);
  store.dispatch('modals/close', modalName);
};
</script>

<style scoped>
.background-container {
  z-index: 1000;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 3% 5%;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
}
.about-container {
  position: relative;
  overflow: hidden auto;
  padding: 35px 70px;
  margin: 0;
  width: 70em;
  height: max-content;
  max-width: 100%;
  max-height: 100%;
  background-color: white;
}
.bsw {
  font-size: 2rem;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 40px;
  text-align: center;
}
.about-selector {
  display: flex;
  justify-content: center;
}
.about-content {
  margin: 50px 0;
}

@media only screen and (max-width: 768px) {
  .about-selector {
    flex-direction: column;
  }
}
</style>
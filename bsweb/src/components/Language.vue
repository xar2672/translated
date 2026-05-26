<template>
  <div>
    <button class="btn-lang center" @click="changeLanguage()">   
      <span>{{ next_lang }}</span>
    </button>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { i18n } from '../main.js';
import { messages } from '../plugins/i18n.js';

const supported_langs = Object.keys(messages).sort((a, b) => a.localeCompare(b));

const next_lang = computed(() => {
  index = supported_langs.indexOf(i18n.locale.value);
  return supported_langs[(currentIndex + 1) % supported_langs.length];
});

const changeLanguage = (lang) => {
  const new_lang = lang || next_lang.value;
  i18n.locale.value = new_lang;
  localStorage.setItem('preferred-language', new_lang);
}

onMounted(() => window.addEventListener('languagechange', () => changeLanguage(navigator.language)));
onUnmounted(() => window.removeEventListener('languagechange', () => changeLanguage(navigator.language)));
</script>

<style>
  .dropdown.is-mobile-modal > .dropdown-menu {
    z-index: 500 !important;
  }

  .dropdown-menu {
    z-index: 500 !important;
  }

  .btn-lang {
    height: 20px;
    cursor: pointer;
    background-color: #fff;
    font-size: 10px;
    border: 1px solid #167df0;
    color: #167df0;
    border-radius: 12px;
  }
  .btn-lang:hover {
    background-color: #eee;
  }
  .btn-lang:active {
    border-color: red;
  }
</style>
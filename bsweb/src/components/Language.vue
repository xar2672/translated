<template>
  <div>
    <button class="btn-lang center" @click="changeLanguage()">   
      <span>{{ next_lang }}</span>
    </button>
  </div>
</template>

<script>
import { i18n } from '../main.js';
import { messages } from '../plugins/i18n.js';

const supported_langs = Object.keys(messages).sort((a, b) => a.localeCompare(b));

export default {
  data() {
    return {
      next_lang: i18n.locale
    };
  },
  mounted() {
    this.changeLanguage(this.$i18n.locale);
    window.addEventListener('languagechange', () => this.changeLanguage(navigator.language));
  },
  unmounted() {
    window.removeEventListener('languagechange', () => this.changeLanguage(navigator.language));
  },
  methods: {
    changeLanguage(lang = this.next_lang) {
      console.log(`Changed language to: ${lang}`);

      this.$i18n.locale = lang;
      localStorage.setItem('preferred-language', lang);
      
      const index = supported_langs.findIndex(slng => lang.startsWith(slng));
      this.next_lang = supported_langs[(index + 1) % supported_langs.length];
    }
  }
}
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
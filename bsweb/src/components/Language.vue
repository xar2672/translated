<template>
  <div class="language-selector">
    <multiselect
      v-model="currentLanguage"
      :options="languages"
      :show-labels="false"
      :allow-empty="false"
      :searchable="false"
      label="label"
      track-by="value"
      open-direction="bottom"
      class="language-multiselect"
      @select="selectedLanguage"
    >
      <template #singleLabel="{ option }">
        <img :src="option.flag" class="flag-icon" style="margin-right: 10px;"/> 
        <span class="lang-text">{{ option.label }}</span>
      </template>

      <template #option="{ option }">
        <div class="dropdown-item-content">
          <img :src="option.flag" class="flag-icon"/>
          <span class="lang-text">{{ option.label }}</span>
        </div>
      </template>
    </multiselect>
  </div>
</template>

<script>
import { toRaw, nextTick } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { supportedLanguages } from '../plugins/i18n/manifest.js';
import { createI18n } from 'vue-i18n';
import { i18n } from '../main.js';

const i18n_newLang = createI18n({
  allowComposition: false,
  legacy: false,
  fallbackLocale: 'en', 
  returnObjects: true,
  useScope: 'global',
  isGlobal: true,
  messages: supportedLanguages
});

export default {
  name: 'LanguageSelector',
  components: { Multiselect },
  data() {
    return {
      currentLanguage: null,
      languages: Object.keys(supportedLanguages).sort((a, b) => a.localeCompare(b)).map(key => 
({value: key, label: supportedLanguages[key].LANGUAGE_NAME, flag: supportedLanguages[key].FLAG_LINK}))
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
    async changeLanguage(lang) {
      if (typeof(lang) !== 'string') lang = "";
      lang = Object.entries(supportedLanguages).find(([_, value]) => value.LANGUAGE_NAME == i18n_newLang.global.t('LANGUAGE_NAME', '', {locale: lang}))[0];

      console.log(`Changed language to: ${lang}`);
      
      if (!this.$i18n.availableLocales.includes(lang)) {
        const messages = await import(`../plugins/i18n/locales/${lang}.json`, {with: { type: 'json' }});
        i18n.global.mergeLocaleMessage(lang, messages.default);
      }

      await nextTick();
      this.$i18n.locale = lang;

      document.querySelector('html').setAttribute('lang', lang);
      this.currentLanguage = this.languages.find(obje => obje.value === lang);
      localStorage.setItem('preferred-language', lang);
    },
    selectedLanguage(newLang) {
      if (typeof(newLang) == 'object') {
        this.changeLanguage(toRaw(newLang)["value"]);
      }
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
  width: max-content;
}

.language-selector {
  display: inline-block;
  margin: 0 2% 0 auto;
  position: relative;
}
.language-multiselect {
  display: inline-block;
  float: none;
  border: none;
  width: max-content;
}
.language-multiselect .multiselect__tags {
  align-items: center;
  border: none;
  display: flex;
  padding: 0 40px 0 0;
}

.language-multiselect .multiselect__single {
  display: inline-flex;
  column-gap: 5px;
  margin-bottom: 0;
}
.language-multiselect .multiselect__singleLabel {
  display: flex;
  align-items: center;
  margin: 0;
}
.language-multiselect .multiselect__select {
  aspect-ratio: 1 / 1;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
}

.language-multiselect .multiselect__content-wrapper {
  overflow: hidden auto;
  border: 1px solid #e5e5e5;
  border-top: none;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: #fff;
}
.language-multiselect .multiselect__content {
  padding: 8px 0;
}

.language-multiselect .multiselect__option {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  font-size: 1rem;
  background: transparent;
  min-height: 40px;
}
.language-multiselect .multiselect__option--highlight {
  background: #f5f7fa;
  color: #2b303a;
}
.language-multiselect .multiselect__option--selected {
  background: #fff;
  color: #000;
  font-weight: 600;
}
.language-multiselect .multiselect__option--selected.multiselect__option--highlight {
  background: #f5f7fa;
  color: #000;
  font-weight: 600;
}

.flag-icon {
  width: 24px;
  height: auto;
  display: inline-block;
  flex-shrink: 0;
}
.dropdown-item-content {
  display: flex;
  column-gap: 10px;
  align-items: center;
  width: 100%;
}
</style>